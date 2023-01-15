from flask import Flask, render_template, url_for, redirect, request, session, flash
from datetime import timedelta
from flask_sqlalchemy import SQLAlchemy
import psycopg2

import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

# images, css, and js all need to be in the static folder, specifically.  
# must be accessed using the {{url_for('static', filename='file_path')}} wherever href and src are used

app = Flask(__name__)
app.secret_key = "secret"
#=======================================================================

# adding connection to database. file name is name of the table
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost/jeoparty'
# this code removes a warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# creating a database
db = SQLAlchemy(app)

class Categories(db.Model):
    __tablename__ = 'categories'
    index = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(1000))
    clue_count = db.Column(db.Integer)

#=======================================================================

# creating the home page
@app.route("/")
def home():
    
    return render_template("index.html")


@app.route("/stats", methods=['GET'])
def stats():
    categories = Categories.query.all()
    return render_template("stats.html", categories=categories)


@app.route("/game")
def game():
    return render_template("game.html")

@app.route("/map")
def map():
    return render_template("map.html")


if __name__ == "__main__":
    with app.app_context():
        db.create_all() 
    app.run(debug=True)