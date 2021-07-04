from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS, cross_origin
from db import create_app, Kayttaja, Tehtava, Suoritus, Jarjesto
 
app = create_app()
cors = CORS(app)

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