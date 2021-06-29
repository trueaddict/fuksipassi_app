from flask import Flask

app = Flask(__name__, static_folder='build', static_url_path='/')


@app.route('/')
def index():
  return app.send_static_file('index.html')
  # return send_from_directory('build','index.html')

if __name__ == '__name__':
  app.debug = True
  app.run()