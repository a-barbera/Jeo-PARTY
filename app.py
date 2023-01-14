from flask import Flask, render_template, url_for, redirect, request, session, flash
from datetime import timedelta
from flask_sqlalchemy import SQLAlchemy
import psycopg2
import plotly.express as px
import plotly.graph_objects as go
from dash import Dash, dcc, html, Input, Output
import plotly
import json
import pandas as pd


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
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Daddy1995!@localhost/jeoparty'
# this code removes a warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# creating a database
db = SQLAlchemy(app)


class Categories(db.Model):
    __tablename__ = 'categories'
    index = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(1000))
    clue_count = db.Column(db.Integer)

class Contestants(db.Model):
    __tablename__ = 'contestants'
    contestant_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1000))
    notes = db.Column(db.String(1000))
    games_played = db.Column(db.Integer)
    total_winnings = db.Column(db.Integer)
    

#=======================================================================

# creating the home page
@app.route("/")
def home():
    
    return render_template("index.html")


@app.route("/stats", methods=['GET'])
def stats():
#Graph One Categories
    categories = Categories.query.all()
    result_dict = [u.__dict__ for u in Categories.query.all()]
    df = pd.DataFrame(result_dict).head(10)
    #print(df)

    fig1 =px.bar(df, x = "clue_count", y = "category", orientation='h',color= "category", text_auto='.2s')
    fig1.update_traces(textfont_size=12, textangle=0, textposition="outside", cliponaxis=False, )
    fig1.update_layout(  yaxis={'categoryorder':'total ascending'}, title_text='Jeopardy! Top 10 Most Common Categories', title_x=0.5, xaxis_title=" Category Count", yaxis_title="Categories")
   
    graph1JSON = json.dumps(fig1, cls =plotly.utils.PlotlyJSONEncoder)



#Graph Two  Contestant
    contestants = Contestants.query.all()
    contestants_dict = [u.__dict__ for u in Contestants.query.all()]
    contestants_dict_df = pd.DataFrame(contestants_dict).head(10)
    print(contestants_dict_df)

   

    trace_high = go.Bar( x=contestants_dict_df.name,
                         y=contestants_dict_df.games_played,
                         name='Games Played',
                         
                         
                         
                         )
          

    trace_low = go.Bar( x=contestants_dict_df.name,
                        y=contestants_dict_df.total_winnings,
                        name='Total Winnings',

                       
                        )

    data = [trace_high,trace_low]


    layout = list([
        dict(active=0,
            buttons=list([   
                dict(label = 'Games Played',
                    method = 'restyle',
                    args = [{'visible': [True, False]},
                            {'title': 'Jeopardy! Top 10 Leaderboard of Legends'}]),

                dict(label = 'Total Winnings',
                    method = 'restyle',
                    args = [{'visible': [False, True]},
                            {'title': 'Jeopardy! Top 10 Leaderboard of Legends'}]),

            ]),
        )
    ])

    layout = go.Layout( xaxis={'title': 'Contestants' },yaxis={'title': 'Leaderboard Count' },
                        title_text='Jeopardy! Top 10 Leaderboard of Legends', title_x=0.5, barmode = 'stack', height= 600
                         )
    
   
    my_fig = dict(data = data , layout=layout)
    fig = go.Figure(my_fig)
    fig.update_xaxes(categoryorder="total descending")
    
    fig5 = json.dumps(fig, cls =plotly.utils.PlotlyJSONEncoder)
    return render_template("stats.html", graph1JSON = graph1JSON, fig5=fig5)



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
