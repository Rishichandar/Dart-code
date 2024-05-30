
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import mysql.connector
app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:rishi123@localhost:3306/dart'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define the User model
class User(db.Model):
    __tablename__='dart_users'
    userid = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    username = db.Column(db.String(120), nullable=False)

    def __init__(self, email, password,username):
        self.email = email
        self.password = password
        self.username = username

# Create the database tables
with app.app_context():
    db.create_all()

import bcrypt

@app.route('/user/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    username=data.get('username')

    if not email or not password or not username:
        return jsonify({'error': 'Email,password,username are required'}), 400

    # Check if the user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'User already exists'}), 400

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    new_user = User(email=email, password=hashed_password ,username=username)
    db.session.add(new_user)
    db.session.commit()

    # Generate a token (you can replace this with actual JWT generation)
    token = 'some_generated_token'  # Replace with real token generation logic

    return jsonify({'token': token}), 200
@app.route('/user/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    # Check if the user exists
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'Invalid email or password'}), 401

    # Verify the password
    if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({'error': 'Invalid email or password'}), 401
    else:
        return jsonify({'message': 'success'}), 200
    # Generate a token
    # token = jwt.encode({'email': email, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)}, SECRET_KEY)

    # return jsonify({'token': token}), 200

@app.route('/user/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    email = data.get('email')
    new_password = data.get('newPassword')

    if not email or not new_password:
        return jsonify({'error': 'Email and new password are required'}), 400

    # Find the user by email
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Hash the new password
    hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    # Update the user's password
    user.password = hashed_password
    db.session.commit()

    return jsonify({'message': 'Password reset successful'}), 200


if __name__ == '__main__':
    app.run(debug=True)


