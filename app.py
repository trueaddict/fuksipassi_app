from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

@app.route('/')
def index():
  return render_template('syrinx/index.html', msg="")

@app.route('/login')
def login():
  return render_template('syrinx/index.htlm', msg="Logged in")

if __name__ == '__name__':
  app.debug = True
  app.run()