from flask import Flask, jsonify, render_template, request, redirect, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json
import os

ainejarjesto = 'hallinta'
idjarj = None
jarj = ''

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY')

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('HEROKU_POSTGRESQL_PINK_URL')
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
      jarj = 'Syrinx'
    if password == os.environ.get('PASS_ABAKUS'):
      ajPass = os.environ.get('PASS_ABAKUS')
      idjarj = 1985
      jarj = 'Abakus'
    if password == os.environ.get('PASS_VARKAAT'):
      ajPass = os.environ.get('PASS_VARKAAT')
      idjarj = 1961
      jarj = 'Varkaat'

    if ajPass == password:
      session['loggedin'] = True
      session['hallinta'] = True
      session['id'] = idjarj
      session['useremail'] = username
      session['aj'] = jarj
      data = generateDataHallinta()
      return render_template('/' + ainejarjesto + '/index.html', data=json.dumps(data))
    return render_template('/index.html', data='Väärä sähköposti tai salasana!')

@app.route('/kuittaa', methods=["GET","POST"])
def kuittaa():
  if request.method == 'POST' and 'loggedin' in session and 'hallinta' in session:
    # Kuittauksen tekeminen databaseen
    req = request.form
    inputs = list()
    for k, v in req.items():
        if v != "":
            inputs.append(k)
            i = k.split('_')
            suor = Suoritus.query.filter_by(id_user=i[0], id_teht=i[1]).first()
            suor.checked = True
            suor.checked_date = datetime.today()

            info_short = session['useremail'] + ':' + suor.info_text
            suor.info_text = info_short[:100]
            db.session.commit()
    data = generateDataHallinta()
    return render_template('/' + ainejarjesto + '/index.html', data=json.dumps(data))
  if request.method == 'GET' and 'loggedin' in session and 'hallinta' in session:
    data = generateDataHallinta()
    return render_template('/' + ainejarjesto + '/index.html', data=json.dumps(data))
  return render_template('/index.html', data='Kirjaudu sisään!')


@app.route('/hylkaa', methods=['GET','POST'])
def hylkaa():
  if request.method == 'POST' and 'loggedin' in session and 'hallinta' in session:
    suorId = request.form['suorId']
    
    suor = Suoritus.query.filter_by(id=suorId).first()
    db.session.delete(suor)
    db.session.commit()
    data = generateDataHallinta()
    return render_template('/' + ainejarjesto + '/index.html', data=json.dumps(data))
  if request.method == 'GET' and 'loggedin' in session and 'hallinta' in session:
    data = generateDataHallinta()
    return render_template('/' + ainejarjesto + '/index.html', data=json.dumps(data))
  return render_template('/index.html', data='Kirjaudu sisään!')

@app.route('/tallenna', methods=['GET', 'POST'])
def tallenna():
  if request.method == 'POST' and 'loggedin' in session and 'hallinta' in session and 'kuvaus' in request.form:
    tehtId = request.form['id_teht']
    tehtkuvaus = request.form['kuvaus']

    teht = Tehtava.query.filter_by(id=tehtId).first()
    teht.kuvaus = tehtkuvaus
    db.session.commit()

    data = generateDataHallinta()
    return redirect('/#teht')
  if request.method == 'GET' and 'loggedin' in session and 'hallinta' in session:
    data = generateDataHallinta()
    return render_template('/' + ainejarjesto + '/index.html', data=json.dumps(data))
  return render_template('/index.html', data='Kirjaudu sisään!')

@app.route('/logout')
def logouthallinta():
  session.pop('loggedin', None)
  session.pop('hallinta', None)
  session.pop('id', None)
  session.pop('useremail', None)
  session.pop('aj', None)
  return redirect('/')

# HALLINTA END

def generateDataHallinta():
  jarj = session['id']
  suoritukset = Suoritus.query.filter_by(id_jarj=jarj).all()
  teht = Tehtava.query.filter_by(id_jarj=jarj).all()
  kayttajat = Kayttaja.query.filter_by(id_jarj=jarj).all()

  kayt_list = dict()
  teht_list = dict()
  suor_list = []
  tehtavat_list = []
  kayttajat_list = []

  for t in teht:
    teht_list[t.id] = t.kuvaus.strip()
    tehtavat_list.append({"id_teht":t.id, "kuvaus":t.kuvaus.strip(), "id_jarj":t.id_jarj, "num":t.num, "tyyppi":t.tyyppi.strip()})

  for k in kayttajat:
    kayt_list[k.id] = k.useremail
    kayttajat_list.append({"id":k.id, "useremail":k.useremail})

  for s in suoritukset:
    if not s.checked:
      suor_list.append({"id_suor":s.id, "id_user":s.id_user, "id_teht":s.id_teht, "useremail":kayt_list.get(s.id_user), "kuvaus":teht_list.get(s.id_teht), "message":s.info_text.replace('"', "'")})

  return {
          "useremail": session['useremail'],
          "aj": session['aj'],
          "kuitattavat": suor_list,
          "tehtavat" : tehtavat_list,
          "kayttajat" : kayttajat_list,
        }


if __name__ == '__name__':
  app.debug = True
  app.run()