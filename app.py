from flask import Flask, json, request, send_from_directory, jsonify
from flask_cors import CORS, cross_origin
from db import create_app, create_new_user, get_data, query_jarj, query_kayttaja, delete_user, query_tasks, update_task, create_new_task, delete_task, create_request, query_request, approve_request, delete_request, query_users
 
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

  norm_useremail = data['useremail'].lower()
  print(data)

  jarj = query_jarj(data['id_jarj']) #Jarjesto.query.filter_by(id=data['id_jarj']).first()
  user = query_kayttaja(norm_useremail) #Kayttaja.query.filter_by(useremail = data['useremail']).first()

  ret_data = {}
  ret_data['user_id'] = ''
  ret_data['is_admin'] = False
  ret_data['isnewuser'] = False
  ret_data['id_jarj'] = data['id_jarj']
  ret_data['useremail'] = norm_useremail
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
    new_user = create_new_user(norm_useremail, jarj, False)
    ret_data['user_id'] = new_user.id
    ret_data['is_admin'] = new_user.is_admin
    ret_data['isnewuser'] = True
  if user == None and jarj.admin_password == data['password']:
    """
      Creates new admin user
    """
    new_user = create_new_user(norm_useremail, jarj, True)
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

@app.route('/tasks', methods=['GET'])
@cross_origin()
def tasks():
  jarj_id = request.args.get('jarj_id')
  return jsonify(query_tasks(jarj_id))

@app.route('/update_tasks', methods=['POST'])
@cross_origin()
def task():
  data = request.get_json()
  for task in data:
    temp = update_task(task['id'], task['num'], task['desc'], task['type'], task['type_order'])
  return jsonify(data)

@app.route('/create_task', methods=['POST'])
@cross_origin()
def create_task():
  data = request.get_json()
  task = create_new_task(data['jarj_id'], data['num'], data['desc'], data['type'], data['typeOrder'])
  return jsonify(task)

@app.route('/delete_task', methods=['POST'])
@cross_origin()
def app_delete_task():
  data = request.get_json()
  print(data)
  delete_task(data['id'])
  return jsonify({})

@app.route('/create_request', methods=['POST'])
@cross_origin()
def app_create_request():
  data = request.get_json()
  create_request(data['task'], data['user'], data['jarj'], data['message'])
  return jsonify({})

@app.route('/approve_requests', methods=['POST'])
@cross_origin()
def app_approve_request():
  data = request.get_json()
  for req in data['requests']:
    approve_request(req['request_id'], data['user_id'])
  return jsonify({})

@app.route('/delete_request', methods=['POST'])
@cross_origin()
def app_delete_request():
  data = request.get_json()
  delete_request(data['request_id'])
  return jsonify({})

@app.route('/setup_users', methods=['POST'])
@cross_origin()
def app_setup_users():
  data = request.get_json()
  return jsonify(query_users(data['jarj_id']))

@app.route('/data_setup', methods=['POST'])
@cross_origin()
def app_data_setup():
  data = request.get_json()
  return jsonify(query_request(data['id_jarj']))

if __name__ == '__name__':
  app.run()