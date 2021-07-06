from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS, cross_origin
from db import create_app, create_new_user, get_data, query_jarj, query_kayttaja, delete_user
 
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
  ret_data['user_id'] = ''
  ret_data['is_admin'] = False
  ret_data['isnewuser'] = False
  if user != None and jarj.password == data['password']:
    """
      user login
    """
    ret_data['user_id'] = user.id
  elif user != None and jarj.admin_password == data['password']:
    """
      admin login
    """
    ret_data['user_id'] = user.id
    ret_data['is_admin'] = user.is_admin
  
  if user == None and jarj.password == data['password']:
    """
      Creates new standard user
    """
    new_user = create_new_user(data['useremail'], jarj, False)
    ret_data['user_id'] = new_user.id
    ret_data['is_admin'] = new_user.is_admin
    ret_data['isnewuser'] = True
  if user == None and jarj.admin_password == data['password']:
    """
      Creates new admin user
    """
    new_user = create_new_user(data['useremail'], jarj, True)
    ret_data['user_id'] = new_user.id
    ret_data['is_admin'] = new_user.is_admin
    ret_data['isnewuser'] = True

  return jsonify(ret_data)

@app.route('/signout', methods=['POST'])
@cross_origin()
def signout():
  data = request.get_json()
  delete_user(data['user_id'])
  return jsonify({})


@app.route('/data', methods=['GET'])
@cross_origin()
def data():
  user_id = request.args.get('token')
  print(user_id)
  return jsonify(get_data(user_id))


if __name__ == '__name__':
  app.debug = True
  app.run()