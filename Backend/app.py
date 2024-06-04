
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import pandas as pd
import docx
import json
import os
import io
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

@app.route('/user/username', methods=['POST'])
def get_username():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({'error': 'Email is required'}), 400

    # Find the user by email
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify({'username': user.username}), 200

class preprocess:
    @staticmethod
    def poz_read_file(file_path_or_uploaded_file):
        try:
            # Check if the input is a file path or an uploaded file object
            if isinstance(file_path_or_uploaded_file, str):
                # It's a file path
                file_extension = os.path.splitext(file_path_or_uploaded_file)[-1].lower()
                with open(file_path_or_uploaded_file, 'rb') as f:
                    file_content = f.read()
            else:
                # It's an uploaded file object
                file_extension = file_path_or_uploaded_file.filename.split('.')[-1].lower()
                file_content = file_path_or_uploaded_file.read()

            # Debug: Print file extension and size
            print(f"File extension: {file_extension}")
            print(f"File content size: {len(file_content)} bytes")

            # Read the file content based on its extension
            if file_extension == 'csv':
                return pd.read_csv(io.BytesIO(file_content))
            elif file_extension in ['xls', 'xlsx']:
                return pd.read_excel(io.BytesIO(file_content))
            elif file_extension == 'txt':
                data = file_content.decode("utf-8")
                return pd.DataFrame({'text_data': [data]})
            elif file_extension in ['doc', 'docx']:
                doc = docx.Document(io.BytesIO(file_content))
                text = ' '.join([para.text for para in doc.paragraphs])
                return pd.DataFrame({'text_data': [text]})
            elif file_extension == 'json':
                json_data = json.loads(file_content)
                text = ' '.join(str(value) for value in json_data.values())
                return pd.DataFrame({'text_data': [text]})
            else:
                print("Unsupported file type.")
                return None
        except Exception as e:
            # Debug: Print exception message
            print(f"Exception in poz_read_file: {e}")
            return None
       
@app.route('/upload-csv', methods=['POST'])
def upload_csv():
    if 'file' not in request.files:
        return jsonify({'error': 'No file selected'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file:
        try:
            # Read CSV file using pandas
            df = pd.read_csv(file)

            # Convert DataFrame to JSON
            json_data = df.to_json(orient='split')

            # Return JSON response
            return jsonify({'data': json_data})
        except Exception as e:
            return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)


