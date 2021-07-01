from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder='build', static_url_path='/')
app.secret_key = 'salainenavain'

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://root:root@localhost:5432/fuksipassi_db'
db = SQLAlchemy(app)

@app.route('/')
def index():
  return app.send_static_file('index.html')
  # return send_from_directory('build','index.html')

if __name__ == '__name__':
  app.debug = True
  app.run()