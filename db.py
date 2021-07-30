from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__, static_folder='client/build', static_url_path='')
#app.secret_key = os.environ.get('SECRET_KEY')

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://otto:@localhost:5432/otto' # os.environ.get('DATABASE_URI')
# postgresql://otto:@localhost:5432/otto      

db = SQLAlchemy(app)

def create_app():
    return app

def create_new_column(engine, table_name, column):
    column_name = column.compile(dialect=engine.dialect)
    column_type = column.type.compile(engine.dialect)
    engine.execute('ALTER TABLE %s ADD COLUMN %s %s' % (table_name, column_name, column_type))

def create_new_jarjesto(name, password, admin_password):
    jarj = Jarjesto(name=name, password=password, admin_password=admin_password)
    db.session.add(jarj)
    db.session.commit()
    return jarj

def create_new_user(useremail, jarj, is_admin):
    if is_admin:
        newUser = Kayttaja(useremail = useremail, password = jarj.admin_password, id_jarj=jarj.id, is_admin=is_admin)
    else:
        newUser = Kayttaja(useremail = useremail, password = jarj.password, id_jarj=jarj.id, is_admin=is_admin)
    db.session.add(newUser)
    db.session.commit()
    return newUser

def query_tasks(jarj_id):
    tasks = Tehtava.query.filter_by(id_jarj=jarj_id).filter_by(deleted=False).order_by(Tehtava.num).all()
    tehtavat = []
    for task in tasks:
        tehtavat.append(task.toJson())
    return tehtavat

def create_new_task(jarj_id, num, desc, type):
    task = Tehtava(kuvaus=desc, tyyppi=type, id_jarj=jarj_id, num=num)
    db.session.add(task)
    db.session.commit()
    return task.toJson()

def update_task(task_id, num, desc, type):
    task = Tehtava.query.filter_by(id=task_id).filter_by(deleted=False).first()
    task.num = num
    task.kuvaus = desc
    task.tyyppi = type
    db.session.commit()
    return task.toJson()

def delete_task(task_id):
    task = Tehtava.query.filter_by(id=task_id).first()
    task.deleted = True
    db.session.commit()

def delete_user(user_id):
    userToDel = Kayttaja.query.filter_by(id = user_id).first()
    db.session.delete(userToDel)
    db.session.commit()

def create_request(task_id, user_id, jarj_id, message):
    req = Suoritus(id_user=user_id, id_teht=task_id, id_jarj=jarj_id, info_text=message)
    db.session.add(req)
    db.session.commit()

def approve_request(request_id, approver_id):
    req = Suoritus.query.filter_by(id=request_id).first()
    req.approved = True
    req.approver_id = approver_id
    db.session.commit()

def delete_request(request_id):
    req = Suoritus.query.filter_by(id=request_id).first()
    db.session.delete(req)
    db.session.commit()

def query_request(jarj_id):
    suoritukset = Suoritus.query.filter_by(id_jarj=jarj_id).filter_by(approved=False).all()
    teht = Tehtava.query.filter_by(id_jarj=jarj_id).all()
    kayttajat = Kayttaja.query.filter_by(id_jarj=jarj_id).all()

    set_teht = {}
    for i in teht:
        set_teht[i.id] = i

    temp_data = []

    for user in kayttajat:
        temp = {}
        temp['useremail'] = user.useremail
        temp['user_id'] = user.id
        temp['requests'] = []
        for suor in suoritukset:
            if user.id == suor.id_user:
                temp['requests'].append({'request_id':suor.id, 'task_desc':set_teht[suor.id_teht].kuvaus, 'req_text':suor.info_text, 'checked':True})
        temp_data.append(temp)

    return temp_data

def query_users(jarj_id):
    suoritukset = Suoritus.query.filter_by(id_jarj=jarj_id).filter_by(approved=True).all()
    teht = Tehtava.query.filter_by(id_jarj=jarj_id).filter_by(deleted=False).all()
    kayttajat = Kayttaja.query.filter_by(id_jarj=jarj_id).filter_by(is_admin=False).all()

    set_teht = {}
    for i in teht:
        set_teht[i.id] = i

    temp_data = []

    for user in kayttajat:
        temp = {}
        temp['useremail'] = user.useremail
        temp['user_id'] = user.id
        temp['task_count'] = len(teht)
        temp['approved_task_count'] = 0
        temp['categories'] = {}
        
        set_suor = {}
        for i in suoritukset:
            if user.id == i.id_user:
                set_suor[i.id_teht] = True

        print(set_suor)

        for i in teht:
            temp['categories'][i.tyyppi] = {}
            temp['categories'][i.tyyppi]['list'] = []
        
        for i in teht:
            approved = False
            
            if i.id in set_suor.keys():
                approved = set_suor[i.id]
                temp['approved_task_count'] = temp['approved_task_count'] + 1

            temp['categories'][i.tyyppi]['list'].append({'task_id':i.id, 'approved':approved})

            temp['categories'][i.tyyppi]['type_count'] = len(temp['categories'][i.tyyppi]['list'])
            temp['categories'][i.tyyppi]['approved_type_count'] = 0
            for task in temp['categories'][i.tyyppi]['list']:
                if task['approved']:
                    temp['categories'][i.tyyppi]['approved_type_count'] = temp['categories'][i.tyyppi]['approved_type_count'] + 1
            temp['categories'][i.tyyppi]['approved_type_percent'] = (temp['categories'][i.tyyppi]['approved_type_count'] / temp['categories'][i.tyyppi]['type_count']) * 100
        temp_data.append(temp)
        print(temp)
    return temp_data

def query_jarj(id_jarj):
    return Jarjesto.query.filter_by(id=id_jarj).first()

def query_kayttaja(useremail):
    return Kayttaja.query.filter_by(useremail = useremail).first()

def get_data(user_id):
    user = Kayttaja.query.filter_by(id = user_id).first()

    teht = Tehtava.query.filter_by(id_jarj=user.id_jarj).filter_by(deleted=False).all()
    suoritukset = db.session.query(Suoritus).join(Kayttaja).filter(Kayttaja.id==user.id).all()
    tehtavat = {}

    for t in teht:
        tehtavat[t.tyyppi.strip()] = {}
        tehtavat[t.tyyppi.strip()]['tehtavat'] = []
        tehtavat[t.tyyppi.strip()]['kpl'] = 0
        tehtavat[t.tyyppi.strip()]['suoritettu'] = 0

    i = 1
    for t in teht:
        suoritettu = False
        lahetetty = False
        tehtavat[t.tyyppi.strip()]['kpl'] = tehtavat[t.tyyppi.strip()]['kpl'] + 1
        for s in suoritukset:
            if (t.id == s.id_teht and s.approved):
                suoritettu = True
                tehtavat[t.tyyppi]['suoritettu'] = tehtavat[t.tyyppi]['suoritettu'] + 1
            if (t.id == s.id_teht):
                lahetetty = True
        tehtavat[t.tyyppi]['tehtavat'].append({"num":i, "kuvaus":t.kuvaus.strip().replace('"', '/').replace("'", '/'), "suoritettu":suoritettu, "lahetetty":lahetetty, "tyyppi":t.tyyppi.strip(), "id":t.id})
        i = i + 1
    return {"useremail" : user.useremail, "tehtavat" : tehtavat}


class Kayttaja(db.Model):
  __tablename__ = 'kayttaja'
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  useremail = db.Column(db.String(50), nullable=False, unique=True)
  password = db.Column(db.String(50), nullable=False)
  id_jarj = db.Column(db.Integer, db.ForeignKey('jarjesto.id'), nullable=False)
  is_admin = db.Column(db.Boolean, default=False)

  suoritukset = db.relationship('Suoritus', backref='kayttaja')

  def __init__(self, useremail, password, id_jarj, is_admin=False):
    self.id = None
    self.useremail = useremail
    self.password = password
    self.id_jarj = id_jarj
    self.is_admin = is_admin

class Tehtava(db.Model):
  __tablename__ = 'tehtava'
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  kuvaus = db.Column(db.String(255), nullable=False)
  id_jarj = db.Column(db.Integer, db.ForeignKey('jarjesto.id'), nullable=False)
  num = db.Column(db.Integer)
  tyyppi = db.Column(db.String(255))
  deleted = db.Column(db.Boolean, default=False)

  def toJson(self):
    return {'id':self.id, 'jarj_id':self.id_jarj, 'num':self.num, 'desc':self.kuvaus, 'type':self.tyyppi}

  def __init__(self, kuvaus, id_jarj, tyyppi, num):
    self.kuvaus = kuvaus
    self.id_jarj = id_jarj
    self.num = num
    self.tyyppi = tyyppi

class Suoritus(db.Model):
  __tablename__ = 'suoritus'
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  id_user = db.Column(db.Integer, db.ForeignKey('kayttaja.id'), nullable=False)
  id_teht = db.Column(db.Integer)
  id_jarj = db.Column(db.Integer, db.ForeignKey('jarjesto.id'), nullable=False)
  add_date = db.Column(db.DateTime, nullable=False)
  info_text = db.Column(db.String(255))
  approved = db.Column(db.Boolean, nullable=False)
  approved_date = db.Column(db.DateTime)
  approver_id = db.Column(db.Integer, nullable=True)

  def __init__(self, id_user, id_teht, id_jarj, info_text):
    self.id_user = id_user
    self.id_teht = id_teht
    self.id_jarj = id_jarj
    self.approved = False
    self.add_date = datetime.now()
    self.approved_date = None
    self.approver_id = None
    self.info_text = info_text

class Jarjesto(db.Model):
  __tablename__ = 'jarjesto'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), nullable=False)
  password = db.Column(db.String(255), nullable=False)
  admin_password = db.Column(db.String(255))
  tehtavat = db.relationship('Tehtava', backref='jarjesto')

  def __init__(self, name, password, admin_password):
    self.name = name
    self.password = password
    self.admin_password = admin_password


'''
    Initial
'''


#print('Jarjesto',Jarjesto.query.all())

#print(app.config['SQLALCHEMY_DATABASE_URI'])
#db.create_all()
#create_new_jarjesto('syrinx', 'syrinx20', 'syrinxadmin')
#create_new_task(1,1,'Ensimmäinen tehtävä', 'Tyyppi1')
#print('Tehtävät',Tehtava.query.all())
#print('Suoritus',Suoritus.query.all())

print(query_users(1))

'''
    END 
'''
