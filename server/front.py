from flask import Flask
from flask import jsonify
from flask import render_template

from api import api

app = Flask(__name__)

@app.route("/")
def main():
  return render_template("app.html")

if __name__ == "__main__":
  app.register_blueprint(api)
  app.run(debug=True)
