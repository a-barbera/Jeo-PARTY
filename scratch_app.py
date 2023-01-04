from flask import Flask, render_template, url_for, redirect, request, session, flash
from datetime import timedelta
from flask_sqlalchemy import SQLAlchemy

# images, css, and js all need to be in the static folder, specifically.  
# must be accessed using the {{url_for('static', filename='file_path')}} wherever href and src are used

app = Flask(__name__)
app.secret_key = "secret"

# adding connection to database. file name is name of the table
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///table_name.sqlite3'
# this code removes a warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# this code is for sites with login/logout/session information
app.permanent_session_lifetime = timedelta(days=1)

# creating a database
db = SQLAlchemy(app)

# creating the home page
@app.route("/")
def home():
    return render_template("index.html")


@app.route("/stats")
def stats():
    return render_template("stats.html")

@app.route("/game")
def game():
    return render_template("game.html")
    

@app.route("/login", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        session.permanent = True
        user = request.form["nm"]
        session["user"] = user
        return redirect(url_for("user"))
    else:
        if "user" in session:
            return redirect(url_for("user"))
        
        return render_template("login.html")

@app.route("/user")
def user():
    if "user" in session:
        user = session["user"]
        return f"<h1>{user}</h1>"
    else:
        return redirect(url_for("login")) 
    
@app.route("/logout")
def logout():
    if "user" in session:
        user = session["user"]
        flash(f"You have been logged out, {user}.", "info")
    session.pop("user", None)
    return redirect(url_for("login"))  

if __name__ == "__main__":
    app.run(debug=True)