from flask import Flask, render_template, request, redirect, session
from flask_sqlalchemy import SQLAlchemy

user = 'test'
sala = 'test'
userid = '123456'

app = Flask(__name__)
app.secret_key = b'@T$6bs3x2cm2F9X/rm47%8'

@app.route('/')
def index():
  return render_template('index.html', msg="")

@app.route('/etusivu', methods=['GET', 'POST'])
def login():
  msg = ''
  if request.method == 'POST' and 'useremail' in request.form and 'password' in request.form:
    username = request.form['useremail']
    password = request.form['password']

    # SQL kysely

    if username == user and password == sala:
      session['loggedin'] = True
      session['id'] = userid
      session['useremail'] = user
      return render_template('/syrinx/index.html', msg=session['useremail'])
  elif request.method == 'GET' and 'loggedin' in session:
    return render_template('/syrinx/index.html', msg=session['useremail'])
  else:
    msg = 'Väärä sähköposti tai salasana!'
  return render_template('index.html', msg=msg)

@app.route('/syrinx/index.html')
def syrinx():
  if 'loggedin' in session:
    return render_template('/syrinx/index.html', msg=session['username'])
  else:
    return render_template('index.html', msg='Kirjaudu sisään!')

@app.route('/logout')
def logout():
  session.pop('loggedin', None)
  session.pop('id', None)
  session.pop('useremail', None)
  return redirect('/')

if __name__ == '__name__':
  #app.debug = True
  app.run()