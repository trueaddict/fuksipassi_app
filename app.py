from flask import Flask, jsonify, render_template, request, redirect, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json
import os

ainejarjesto = 'abakus'
idjarj = 1985

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY')

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('HEROKU_POSTGRESQL_TEAL_URL')
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


@app.route('/')
def index():
  if 'loggedin' in session:
    data = generateData()
    return render_template('/' + ainejarjesto + '/index.html', data=json.dumps(data))
  return render_template('index.html', data="")

@app.route('/etusivu', methods=['GET', 'POST'])
def login():
  msg = ''
  if request.method == 'POST' and 'useremail' in request.form and 'password' in request.form:
    username = request.form['useremail']
    password = request.form['password']

    # SQL kysely
    users = Kayttaja.query.filter(Kayttaja.useremail == username).all()

    if len(users) == 1:
      if users[0].useremail == username and users[0].password == password and os.environ.get('PASSWORD') == password:
        session['loggedin'] = True
        session['id'] = users[0].id
        session['useremail'] = users[0].useremail
        session['id_jarj'] = users[0].id_jarj
        data = generateData()
        return render_template('/' + ainejarjesto + '/index.html', data=json.dumps(data))
      else:
        msg = 'Väärä sähköposti tai salasana!'
    elif len(users) == 0 and os.environ.get('PASSWORD') == password:
      # Luo uusi käyttäjä
      users = Kayttaja.query.all()
      newId = users[len(users)-1].id + 1
      newUser = Kayttaja(id=newId, useremail = username, password = password, id_jarj=idjarj)
      db.session.add(newUser)
      db.session.commit()
      session['loggedin'] = True
      session['id'] = newUser.id
      session['useremail'] = newUser.useremail
      session['id_jarj'] = newUser.id_jarj
      data = generateData('true')
      return render_template('/' + ainejarjesto + '/index.html', data=json.dumps(data))
    else:
      # Muu virhe
      msg = 'Väärä sähköposti tai salasana!'
      
  elif request.method == 'GET' and 'loggedin' in session:
    data = generateData()
    return render_template('/' + ainejarjesto + '/index.html', data=json.dumps(data))
  else:
    return render_template('index.html', data=msg)
  return render_template('index.html', data=msg)

@app.route('/' + ainejarjesto + '/index.html')
def ainejarjestofunc():
  if 'loggedin' in session:
    data = generateData()
    return render_template('/' + ainejarjesto + '/index.html', data=json.dumps(data))
  else:
    return render_template('index.html', data='Kirjaudu sisään!')

@app.route('/tarkista', methods=['POST'])
def tarkista():
  if 'loggedin' in session:
    if 'id' in request.form and 'message' in request.form:
      id_teht = request.form['id']
      id_user = session['id']
      id_jarj = session['id_jarj']
      message = request.form['message']
      pyynto = Suoritus(id=int(str(id_teht)+str(id_user)+str(id_jarj)), id_teht=id_teht, id_user=id_user, id_jarj=id_jarj, info_text=message)
      db.session.add(pyynto)
      db.session.commit()
    return redirect('/etusivu?id='+request.form['id']+'#'+request.form['id'])
  else:
    return render_template('index.html', data='Kirjaudu sisään!')

@app.route('/signout')
def signout():
  #Käyttäjän poistaminen
  userToDel = Kayttaja.query.filter_by(id = session['id']).first()
  db.session.delete(userToDel)
  db.session.commit()
  session.pop('loggedin', None)
  session.pop('id', None)
  session.pop('useremail', None)
  session.pop('id_jarj', None)
  return redirect('/')

@app.route('/logout')
def logout():
  session.pop('loggedin', None)
  session.pop('id', None)
  session.pop('useremail', None)
  session.pop('id_jarj', None)
  return redirect('/')

def generateData(user_new = 'false'):
  teht = Tehtava.query.filter_by(id_jarj=idjarj).all()
  suoritukset = db.session.query(Suoritus).join(Kayttaja).filter(Kayttaja.id==session['id']).all()
  tehtavat = []
  for t in teht:
    suoritettu = "false"
    lahetetty = "false"
    for s in suoritukset:
      if (t.id == s.id_teht and s.checked):
        suoritettu = "true"
      if (t.id == s.id_teht):
        lahetetty = "true"
    tehtavat.append({"nro":t.num, "kuvaus":t.kuvaus.strip(), "suoritettu":suoritettu, "lahetetty":lahetetty, "tyyppi":t.tyyppi, "id":t.id})
  return {"user" : session['useremail'], "newUser" : user_new, "tehtavat" : tehtavat}

if __name__ == '__name__':
  app.debug = True
  app.run()


#def luoTehtavat():
#  jarj = Jarjesto(id=1985, name='Abakus')
#  db.session.add(jarj)
#  db.session.commit()
#  f = open('teht.txt', 'r')
#  for i in range(25):
#    line = f.readline().split(',')
#    teht = Tehtava(id=int(str(1985) + line[0]), kuvaus=line[1], id_jarj=1985, tyyppi='perusopinnot', num=line[0])
#    db.session.add(teht)
#    db.session.commit()
#  for i in range(30):
#    line = f.readline().split(',')
#    teht = Tehtava(id=int(str(1985) + line[0]), kuvaus=line[1], id_jarj=1985, tyyppi='syventavat_opinnot', num=line[0])
#    db.session.add(teht)
#    db.session.commit()
#  for i in range(10):
#    line = f.readline().split(',')
#    teht = Tehtava(id=int(str(1985) + line[0]), kuvaus=line[1], id_jarj=1985, tyyppi='valinnaiset_opinnot', num=line[0])
#    db.session.add(teht)
#    db.session.commit()