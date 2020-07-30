from flask import Flask, render_template, request, url_for, session
from flask_sqlalchemy import SQLAlchemy

user = 'test'
sala = 'test'
userid = '123456'

app = Flask(__name__)

@app.route('/')
def index():
  return render_template('index.html', msg="")

@app.route('/login', methods=['POST'])
def login():
  msg = ''
  if request.method == 'POST' and 'useremail' in request.form and 'password' in request.form:
    username = request.form['useremail']
    password = request.form['password']

    # SQL kysely

    if username == user and password == sala:
      session['loggedin'] = True
      session['id'] = userid
      session['username'] = user
      return 'Sisäänkirjautuminen onnistui'
  else:
    msg = 'Väärä sähköposti tai salasana!'
  return render_template('index.html', msg=msg)

if __name__ == '__name__':
  app.debug = True
  app.run()