from flask import Flask, url_for, render_template, request, redirect, session, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password


@app.route('/user/signup/', methods=['POST'])
def register():
    try:
        u = request.form['name']
        e = request.form['email']
        p = request.form['password']
        db.session.add(User(name=u, email=e, password=p))
        db.session.commit()
        return jsonify (
            message="User created successfully",
        ), 201
    except Exception as e:
        print(e)
        return jsonify(
            message="Error occurred"
        ), 404


@app.route('/user/signin/', methods=['POST'])
def login():
    e = request.form['email']
    p = request.form['password']
    data = User.query.filter_by(email=e, password=p).first()
    if data is not None:
        session['logged_in'] = True
        return jsonify(
            message="Logged in successfully!"
        ), 200
    return jsonify(
        message="Incorrect details!"
    ), 404

@app.route('/user/signout/', methods=['GET'])
def logout():
    if session['logged_in'] == True:
        session['logged_in'] = False
        return jsonify(
            message="Logged out successfully!"
        ), 200
    return jsonify(
        message="You are not logged in"
    ), 404

if (__name__ == '__main__'):
    app.secret_key = "ABFSFKJ"
    db.create_all()
    app.run(host="127.0.0.1", port="5000", debug=True)