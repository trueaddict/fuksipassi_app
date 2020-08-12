from flask import Flask, render_template, request, redirect, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

app = Flask(__name__)
app.secret_key = b'@T$6bs3x2cm2F9X/rm47%8'

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://obspdelclwxyxp:177b2be19e3d8c08420fc054532d03bd126017706e3985ec6652a5195a8357fd@ec2-52-20-248-222.compute-1.amazonaws.com:5432/d3adjtir0n8o3m'
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
  checked = db.Column(db.Boolean, nullable=False)
  add_date = db.Column(db.DateTime, nullable=False)
  checked_date = db.Column(db.DateTime)
  info_text = db.Column(db.String(100))

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
    users = Kayttaja.query.filter(Kayttaja.useremail == username).all()

    if len(users) == 1:
      if users[0].useremail == username and users[0].password == password:
        session['loggedin'] = True
        session['id'] = users[0].id
        session['useremail'] = users[0].useremail
        data = generateData()
        return render_template('/syrinx/index.html', data=json.dumps(data))
      else:
        msg = 'Väärä sähköposti tai salasana!'
    elif len(users) == 0:
      # Luo uusi käyttäjä
      msg = 'Väärä sähköposti tai salasana!'
    else:
      # Muu virhe
      msg = 'Virhe'
      
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
    return redirect('/etusivu?id='+request.form['id']+'#'+request.form['id'])
  else:
    return render_template('index.html', data='Kirjaudu sisään!')

@app.route('/logout')
def logout():
  session.pop('loggedin', None)
  session.pop('id', None)
  session.pop('useremail', None)
  return redirect('/')

# HALLINTA

@app.route('/hallinta', methods=["POST", "GET"])
def hallinta():
  if request.method == "GET":
    return render_template('/hallinta/index.html', data='')
  if request.method == "POST" and 'useremail' in request.form and 'password' in request.form:
    username = request.form['useremail']
    password = request.form['password']
    #Validate Login
    if 'test' == username and 'test' == password:
      data = generateDataHallinta()
      return render_template('/hallinta/syrinx/index.html', data=json.dumps(data))
    return render_template('/hallinta/index.html', data='Väärä sähköposti tai salasana!')
@app.route('/logout/hallinta')
def logouthallinta():
  return redirect('/hallinta')

# HALLINTA END

def generateDataHallinta():
  return {
          "kuitattavat": [
            {
              "id_teht": 1255355, 
              "id_user": 1,
              "useremail": "test",
              "kuvaus": "Käy syömässä Maijassa",
              "message":"kävin syömässä maijassa"
            },
            {
              "id_teht": 1255354, 
              "id_user": 1,
              "useremail": "test",
              "kuvaus": "Liity Syrinx Ry:n jäseneksi",
              "message":"selitys"
            }
          ],
          "tehtavat" : [{"nro":1, "kuvaus":"Liity Syrinx Ry:n jäseneksi", "suoritettu":"true", "id":1255353}, {"nro":2, "kuvaus":"Osallistu tapahtumaan", "suoritettu":"false", "id":1255354}, {"nro":3, "kuvaus":"Osallistu tapahtumaan", "suoritettu":"false", "id":1255355}],
          "kayttajat" : [
            {
              "id" : 1,
              "useremail" : "test",
              "id_jarj": 99999 
            }
          ]
        }

def generateData():
  teht = Tehtava.query.all()
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
    tehtavat.append({"nro":t.num, "kuvaus":t.kuvaus, "suoritettu":suoritettu, "lahetetty":lahetetty, "tyyppi":t.tyyppi, "id":t.id})
  return {"user" : session['useremail'], "tehtavat" : tehtavat}

if __name__ == '__name__':
  app.debug = True
  app.run()