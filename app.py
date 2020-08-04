from flask import Flask, render_template, request, redirect, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

user = 'test'
sala = 'test'
userid = '123456'

app = Flask(__name__)
app.secret_key = b'@T$6bs3x2cm2F9X/rm47%8'

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://abcixaukzjuknx:544543e60d6a6f12c48396bae98788ef1171d271782d4b8694ca8cc3627017e5@ec2-54-197-254-117.compute-1.amazonaws.com:5432/d42tvvjjla6t5f'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Kayttaja(db.Model):
  __tablename__ = 'kayttaja'
  id = db.Column(db.Integer, primary_key=True)
  useremail = db.Column(db.String(50), nullable=False, unique=True)
  password = db.Column(db.String(50), nullable=False)
  id_jarj = db.Column(db.Integer, db.ForeignKey('jarjesto.id'), nullable=False)

  suoritukset = db.relationship('Suoritus', backref='kayttaja')

  def __init__(self, useremail, password, id_jarj):
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

  def __init__(self, kuvaus, tyyppi, num):
    self.kuvaus = kuvaus
    self.num = num
    self.tyyppi = tyyppi

class Suoritus(db.Model):
  __tablename__ = 'suoritus'
  id = db.Column(db.Integer, primary_key=True)
  id_user = db.Column(db.Integer, db.ForeignKey('kayttaja.id'), nullable=False)
  id_jarj = db.Column(db.Integer, db.ForeignKey('jarjesto.id'), nullable=False)
  checked = db.Column(db.Boolean, nullable=False)
  add_date = db.Column(db.DateTime, nullable=False)
  checked_date = db.Column(db.DateTime)
  info_text = db.Column(db.String(100))

  def __init__(self, id_user, id_jarj):
    self.id_user = id_user
    self.id_jarj = id_jarj
    self.checked = False
    self.add_date = datetime.today()

class Jarjesto(db.Model):
  __tablename__ = 'jarjesto'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), nullable=False)

  tehtavat = db.relationship('Tehtava', backref='jarjesto')

  def __init__(self, name):
    self.name = name

@app.route('/info')
def info():
  return render_template('/etusivu/index.html')

@app.route('/')
def index():
  if 'loggedin' in session:
    data = generateData()
    return render_template('/syrinx/index.html', data=json.dumps(data))
  return render_template('index.html', data="")

@app.route('/etusivu', methods=['GET', 'POST'])
def login():
  msg = ''
  if request.method == 'POST' and 'useremail' in request.form and 'password' in request.form:
    username = request.form['useremail']
    password = request.form['password']

    # SQL kysely

    if username == user and password == sala:
      session['loggedin'] = True
      session['id'] = userid
      session['useremail'] = user
      data = generateData()
      return render_template('/syrinx/index.html', data=json.dumps(data))
    else:
      msg = 'Väärä sähköposti tai salasana!'
  elif request.method == 'GET' and 'loggedin' in session:
    data = generateData()
    return render_template('/syrinx/index.html', data=json.dumps(data))
  else:
    return render_template('index.html', data=msg)
  return render_template('index.html', data=msg)

@app.route('/syrinx/index.html')
def syrinx():
  if 'loggedin' in session:
    data = generateData()
    return render_template('/syrinx/index.html', data=json.dumps(data))
  else:
    return render_template('index.html', data='Kirjaudu sisään!')

@app.route('/tarkista', methods=['POST'])
def tarkista():
  if 'loggedin' in session:
    #data = generateData()
    #return render_template('/syrinx/index.html', data=json.dumps(data))
    return redirect('/etusivu?id='+request.form['message'].id)
  else:
    return render_template('index.html', data='Kirjaudu sisään!')

@app.route('/logout')
def logout():
  session.pop('loggedin', None)
  session.pop('id', None)
  session.pop('useremail', None)
  return redirect('/')

def generateData():
  return {"user" : "TEst Username", "tehtavat" : [{"nro":1, "kuvaus":"Liity Syrinx Ry:n jäseneksi", "suoritettu":"true", "id":1255353}, {"nro":2, "kuvaus":"Osallistu tapahtumaan", "suoritettu":"false", "id":1255354}, {"nro":3, "kuvaus":"Osallistu tapahtumaan", "suoritettu":"false", "id":1255355}]}

if __name__ == '__name__':
  app.debug = True
  app.run()