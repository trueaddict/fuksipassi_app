from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS, cross_origin
from db import create_app, create_new_user, get_data, query_jarj, query_kayttaja
 
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

  jarj = query_jarj(data['id_jarj']) #Jarjesto.query.filter_by(id=data['id_jarj']).first()
  user = query_kayttaja(data['useremail']) #Kayttaja.query.filter_by(useremail = data['useremail']).first()

  ret_data = {}
  if user != None and jarj.password == data['password']:
    ret_data = get_data(user, jarj)
    ret_data['status'] = 'loggedin'
    ret_data['isnewuser'] = 'false'
    return jsonify(ret_data)
  elif user != None and user.password != data['password']:
    return jsonify('{status:wrongpassword}')
  
  if user == None and jarj.password == data['password']:
    new_user = create_new_user(data['useremail'], jarj)
    ret_data = get_data(new_user, jarj)
    ret_data['status'] = 'loggedin'
    ret_data['isnewuser'] = 'true'
    return jsonify(ret_data)

  return jsonify('{status:none}')
  #return jsonify(data)


if __name__ == '__name__':
  app.debug = True
  app.run()