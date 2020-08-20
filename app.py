from flask import Flask, jsonify, render_template, request, redirect, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json
import os

ainejarjesto = 'hallinta'
idjarj = None

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY')

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Kayttaja(db.Model):
  __tablename__ = 'kayttaja'
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  useremail = db.Column(db.String(50), nullable=False, unique=True)
  password = db.Column(db.String(50), nullable=False)
  id_jarj = db.Column(db.Integer, db.ForeignKey('jarjesto.id'), nullable=False)

  suoritukset = db.relationship('Suoritus', backref='kayttaja')

  def __init__(self, id, useremail, password, id_jarj):
    self.id = id
    self.useremail = useremail
    self.password = password
    self.id_jarj = id_jarj

class Tehtava(db.Model):
  __tablename__ = 'tehtava'
  id = db.Column(db.Integer, primary_key=True)
  kuvaus = db.Column(db.String(255), nullable=False)
  id_jarj = db.Column(db.Integer, db.ForeignKey('jarjesto.id'), nullable=False)
  num = db.Column(db.Integer)
  tyyppi = db.Column(db.String(100))

  def __init__(self, id, kuvaus, id_jarj, tyyppi, num):
    self.id = id
    self.kuvaus = kuvaus
    self.id_jarj = id_jarj
    self.num = num
    self.tyyppi = tyyppi

class Suoritus(db.Model):
  __tablename__ = 'suoritus'
  id = db.Column(db.Integer, primary_key=True)
  id_user = db.Column(db.Integer, db.ForeignKey('kayttaja.id'), nullable=False)
  id_teht = db.Column(db.Integer)
  id_jarj = db.Column(db.Integer, db.ForeignKey('jarjesto.id'), nullable=False)
  add_date = db.Column(db.DateTime, nullable=False)
  info_text = db.Column(db.String(100))
  checked = db.Column(db.Boolean, nullable=False)
  checked_date = db.Column(db.DateTime)

  def __init__(self, id, id_user, id_teht, id_jarj, info_text):
    self.id = id
    self.id_user = id_user
    self.id_teht = id_teht
    self.id_jarj = id_jarj
    self.checked = False
    self.add_date = datetime.today()
    self.checked_date = None
    self.info_text = info_text

class Jarjesto(db.Model):
  __tablename__ = 'jarjesto'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), nullable=False)
  tehtavat = db.relationship('Tehtava', backref='jarjesto')

  def __init__(self, id, name):
    self.id = id
    self.name = name

# HALLINTA

@app.route('/', methods=["GET", "POST"])
def hallinta():
  if request.method == 'GET':
    if 'loggedin' in session and 'hallinta' in session:
      data = generateDataHallinta()
      return render_template('/' + ainejarjesto + '/index.html', data=json.dumps(data))
    return render_template('/index.html', data='')
  if request.method == "POST" and 'useremail' in request.form and 'password' in request.form:
    username = request.form['useremail']
    password = request.form['password']

    ajPass = None

    #Validate Login
    if password == os.environ.get('PASS_SYRINX'):
      ajPass = os.environ.get('PASS_SYRINX')
      idjarj = 1971
    if password == os.environ.get('PASS_ABAKUS'):
      ajPass = os.environ.get('PASS_ABAKUS')
      idjarj = 1985

    users = Kayttaja.query.filter_by(id_jarj=idjarj).filter(Kayttaja.useremail == username).first()

    if 'test' == username and ajPass == password:
      session['loggedin'] = True
      session['hallinta'] = True
      session['id'] = idjarj
      session['useremail'] = username
      data = generateDataHallinta()
      return render_template('/' + ainejarjesto + '/index.html', data=json.dumps(data))
    return render_template('/index.html', data='Väärä sähköposti tai salasana!')

@app.route('/kuittaa', methods=["GET","POST"])
def kuittaa():
  if request.method == 'POST' and 'loggedin' in session and 'hallinta' in session:
    # TODO kuittauksen tekeminen databaseen
    req = request.form
    inputs = list()
    for k, v in req.items():
        if v != "":
            inputs.append(k)
            i = k.split('_')
            suor = Suoritus.query.filter_by(id_user=i[0], id_teht=i[1]).first()
            suor.checked = True
            suor.checked_date = datetime.today()
            db.session.commit()
    data = generateDataHallinta()
    return render_template('/' + ainejarjesto + '/index.html', data=json.dumps(data))
  if request.method == 'GET' and 'loggedin' in session and 'hallinta' in session:
    data = generateDataHallinta()
    return render_template('/' + ainejarjesto + '/index.html', data=json.dumps(data))
  return render_template('/index.html', data='Kirjaudu sisään!')

@app.route('/logout')
def logouthallinta():
  session.pop('loggedin', None)
  session.pop('id', None)
  session.pop('useremail', None)
  return redirect('/')

# HALLINTA END

def generateDataHallinta():
  suoritukset = Suoritus.query.filter_by(id_jarj=idjarj).all()
  teht = Tehtava.query.filter_by(id_jarj=idjarj).all()
  kayttajat = Kayttaja.query.filter_by(id_jarj=idjarj).all()
  kayt_list = dict()
  teht_list = dict()
  suor_list = []

  for t in teht:
    teht_list[t.id] = t.kuvaus

  for k in kayttajat:
    kayt_list[k.id] = k.useremail

  for s in suoritukset:
    if not s.checked:
      suor_list.append({"id_user":s.id_user, "id_teht":s.id_teht, "useremail":kayt_list.get(s.id_user), "kuvaus":teht_list.get(s.id_teht).rstrip(), "message":s.info_text})
  return {
          "kuitattavat": suor_list,
          "tehtavat" : [{"nro":1, "kuvaus":"Liity Syrinx Ry:n jäseneksi", "suoritettu":"true", "id":1255353}, {"nro":2, "kuvaus":"Osallistu tapahtumaan", "suoritettu":"false", "id":1255354}, {"nro":3, "kuvaus":"Osallistu tapahtumaan", "suoritettu":"false", "id":1255355}],
          "kayttajat" : [
            {
              "id" : 1,
              "useremail" : "test",
              "id_jarj": 99999 
            }
          ]
        }