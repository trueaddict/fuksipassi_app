from .app import db

class Kayttaja(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  useremail = db.Column(db.String(50), nullable=False, unique=True)
  password = db.Column(db.String(50), nullable=False)
  id_jarj = db.Column(db.Integer, db.ForeignKey('jarjesto.id'), nullable=False)

  suoritukset = db.relationship('Suoritus', backref='kayttaja')

class Tehtava(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  kuvaus = db.Column(db.String(255), nullable=False)
  id_jarj = db.Column(db.Integer, db.ForeignKey('jarjesto.id'), nullable=False)
  num = db.Column(db.Integer)

class Suoritus(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  id_user = db.Column(db.Integer, db.ForeignKey('kayttaja.id'), nullable=False)
  id_jarj = db.Column(db.Integer, db.ForeignKey('jarjesto.id'), nullable=False)
  checked = db.Column(db.Boolean, nullable=False)
  add_date = db.Column(db.DateTime, nullable=False)
  checked_date = db.Column(db.DateTime)

class Jarjesto(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), nullable=False)

  tehtavat = db.relationship('Tehtava', backref='jarjesto')
