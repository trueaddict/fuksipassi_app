from flask import Flask, jsonify, render_template, request, redirect, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json
import os

ainejarjesto = 'abakus'
idjarj = 1985

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





def luoTehtavat():
  jarj = Jarjesto(id=1985, name='Abakus')
  db.session.add(jarj)
  db.session.commit()
  f = open('teht.txt', 'r')
  for i in range(25):
    line = f.readline().split(',')
    teht = Tehtava(id=int(str(1985) + line[0]), kuvaus=line[1], id_jarj=1985, tyyppi='perusopinnot', num=line[0])
    db.session.add(teht)
    db.session.commit()
  for i in range(30):
    line = f.readline().split(',')
    teht = Tehtava(id=int(str(1985) + line[0]), kuvaus=line[1], id_jarj=1985, tyyppi='syventavat_opinnot', num=line[0])
    db.session.add(teht)
    db.session.commit()
  for i in range(10):
    line = f.readline().split(',')
    teht = Tehtava(id=int(str(1985) + line[0]), kuvaus=line[1], id_jarj=1985, tyyppi='valinnaiset_opinnot', num=line[0])
    db.session.add(teht)
    db.session.commit()