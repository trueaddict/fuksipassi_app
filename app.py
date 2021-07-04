from flask import Flask, request, send_from_directory, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
import datetime
import os

app = Flask(__name__, static_folder='client/build', static_url_path='')
app.secret_key = os.environ.get('SECRET_KEY')

cors = CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL') 
db = SQLAlchemy(app)

class Kayttaja(db.Model):
  __tablename__ = 'kayttaja'
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  useremail = db.Column(db.String(50), nullable=False, unique=True)
  password = db.Column(db.String(50), nullable=False)
  id_jarj = db.Column(db.Integer, db.ForeignKey('jarjesto.id'), nullable=False)

  suoritukset = db.relationship('Suoritus', backref='kayttaja')

  def __init__(self, useremail, password, id_jarj):
    self.id = None
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
  password = db.Column(db.String(50), nullable=False)
  tehtavat = db.relationship('Tehtava', backref='jarjesto')

  def __init__(self, id, name):
    self.id = id
    self.name = name


@app.route('/')
def index():
  return send_from_directory(app.static_folder, 'index.html')

@app.route('/syrinx')
def syrinx():
  return send_from_directory(app.static_folder, 'index.html')


@app.route('/login', methods=['POST'])
@cross_origin()
def login():
  data = request.get_json()

  print(data)

  jarj = Jarjesto.query.filter_by(id=data['id_jarj']).first()
  user = Kayttaja.query.filter_by(useremail = data['useremail']).first()

  ret_data = {}
  if user != None and jarj.password == data['password']:
    ret_data = getData(user, jarj)
    ret_data['status'] = 'loggedin'
    return jsonify(ret_data)
  elif user != None and user.password != data['password']:
    return '{status:wrongpassword}'
  
  if user == None and jarj.password == data['password']:
    new_user = createNewUser(data['useremail'], jarj)
    ret_data = getData(new_user, jarj)
    ret_data['status'] = 'isnewuser'
    return jsonify(ret_data)

  return '{status:none}'
  #return jsonify(data)


def getData(user, jarj):
  teht = Tehtava.query.filter_by(id_jarj=jarj.id).all()
  suoritukset = db.session.query(Suoritus).join(Kayttaja).filter(Kayttaja.id==user.id).all()
  tehtavat = []
  for t in teht:
    suoritettu = "false"
    lahetetty = "false"
    for s in suoritukset:
      if (t.id == s.id_teht and s.checked):
        suoritettu = "true"
      if (t.id == s.id_teht):
        lahetetty = "true"
    tehtavat.append({"num":t.num, "kuvaus":t.kuvaus.strip().replace('"', '/').replace("'", '/'), "suoritettu":suoritettu, "lahetetty":lahetetty, "tyyppi":t.tyyppi.strip(), "id":t.id})
  return {"useremail" : user.useremail, "tehtavat" : tehtavat}

def createNewUser(useremail, jarj):
  newUser = Kayttaja(useremail = useremail, password = jarj.password, id_jarj=jarj.id)
  db.session.add(newUser)
  db.session.commit()
  return newUser

if __name__ == '__name__':
  app.debug = True
  app.run()