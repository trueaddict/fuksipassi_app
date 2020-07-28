from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
  return render_template('etusivu/index.html')

if __name__ == '__name__':
  app.debug = True
  app.run()