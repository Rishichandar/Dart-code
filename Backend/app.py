
# from flask import Flask, request, jsonify, render_template
# from flask_sqlalchemy import SQLAlchemy
# from flask_cors import CORS
# import pandas as pd
# import docx
# import json
# import os
# import io
# import numpy as np
# from sklearn.impute import SimpleImputer
# from sklearn.linear_model import LinearRegression
# from sklearn.ensemble import RandomForestRegressor
# from sklearn.preprocessing import PowerTransformer, StandardScaler, MinMaxScaler
# from scipy.stats import boxcox
# import bcrypt

# app = Flask(__name__)
# CORS(app)

# # Database configuration
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:rishi123@localhost:3306/dart'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = SQLAlchemy(app)

# # Define the User model
# class User(db.Model):
#     __tablename__ = 'dart_users'
#     userid = db.Column(db.Integer, primary_key=True)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     password = db.Column(db.String(120), nullable=False)
#     username = db.Column(db.String(120), nullable=False)

#     def __init__(self, email, password, username):
#         self.email = email
#         self.password = password
#         self.username = username

# # Create the database tables
# with app.app_context():
#     db.create_all()

# # User signup endpoint
# @app.route('/user/signup', methods=['POST'])
# def signup():
#     data = request.get_json()
#     email = data.get('email')
#     password = data.get('password')
#     username = data.get('username')

#     if not email or not password or not username:
#         return jsonify({'error': 'Email, password, and username are required'}), 400

#     # Check if the user already exists
#     existing_user = User.query.filter_by(email=email).first()
#     if existing_user:
#         return jsonify({'error': 'User already exists'}), 400

#     # Hash the password
#     hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

#     new_user = User(email=email, password=hashed_password, username=username)
#     db.session.add(new_user)
#     db.session.commit()

#     # Generate a token (you can replace this with actual JWT generation)
#     token = 'some_generated_token'  # Replace with real token generation logic

#     return jsonify({'token': token}), 200

# # User login endpoint
# @app.route('/user/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     email = data.get('email')
#     password = data.get('password')

#     if not email or not password:
#         return jsonify({'error': 'Email and password are required'}), 400

#     # Check if the user exists
#     user = User.query.filter_by(email=email).first()
#     if not user:
#         return jsonify({'error': 'Invalid email or password'}), 401

#     # Verify the password
#     if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
#         return jsonify({'error': 'Invalid email or password'}), 401

#     return jsonify({'message': 'success'}), 200

# # User password reset endpoint
# @app.route('/user/reset-password', methods=['POST'])
# def reset_password():
#     data = request.get_json()
#     email = data.get('email')
#     new_password = data.get('newPassword')

#     if not email or not new_password:
#         return jsonify({'error': 'Email and new password are required'}), 400

#     # Find the user by email
#     user = User.query.filter_by(email=email).first()
#     if not user:
#         return jsonify({'error': 'User not found'}), 404

#     # Hash the new password
#     hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
#     # Update the user's password
#     user.password = hashed_password
#     db.session.commit()

#     return jsonify({'message': 'Password reset successful'}), 200

# # Get username endpoint
# @app.route('/user/username', methods=['POST'])
# def get_username():
#     data = request.get_json()
#     email = data.get('email')

#     if not email:
#         return jsonify({'error': 'Email is required'}), 400

#     # Find the user by email
#     user = User.query.filter_by(email=email).first()
#     if not user:
#         return jsonify({'error': 'User not found'}), 404

#     return jsonify({'username': user.username}), 200

# class preprocess:
#     @staticmethod
#     def poz_read_file(file_path_or_uploaded_file):
#         try:
#             # Check if the input is a file path or an uploaded file object
#             if isinstance(file_path_or_uploaded_file, str):
#                 # It's a file path
#                 file_extension = os.path.splitext(file_path_or_uploaded_file)[-1].lower()
#                 with open(file_path_or_uploaded_file, 'rb') as f:
#                     file_content = f.read()
#             else:
#                 # It's an uploaded file object
#                 file_extension = file_path_or_uploaded_file.filename.split('.')[-1].lower()
#                 file_content = file_path_or_uploaded_file.read()

#             # Debug: Print file extension and size
#             print(f"File extension: {file_extension}")
#             print(f"File content size: {len(file_content)} bytes")

#             # Read the file content based on its extension
#             if file_extension == 'csv':
#                 return pd.read_csv(io.BytesIO(file_content))
#             elif file_extension in ['xls', 'xlsx']:
#                 return pd.read_excel(io.BytesIO(file_content))
#             elif file_extension == 'txt':
#                 data = file_content.decode("utf-8")
#                 return pd.DataFrame({'text_data': [data]})
#             elif file_extension in ['doc', 'docx']:
#                 doc = docx.Document(io.BytesIO(file_content))
#                 text = ' '.join([para.text for para in doc.paragraphs])
#                 return pd.DataFrame({'text_data': [text]})
#             elif file_extension == 'json':
#                 json_data = json.loads(file_content)
#                 text = ' '.join(str(value) for value in json_data.values())
#                 return pd.DataFrame({'text_data': [text]})
#             else:
#                 print("Unsupported file type.")
#                 return None
#         except Exception as e:
#             # Debug: Print exception message
#             print(f"Exception in poz_read_file: {e}")
#             return None

#     @staticmethod
#     def poz_handle_missing_values(df, fill_method='mean', constant=0):
#         try:
#             if fill_method == 'mean':
#                 fill_value = df.mean()
#                 df_filled = df.fillna(fill_value)
#             elif fill_method == 'median':
#                 fill_value = df.median()    
#                 df_filled = df.fillna(fill_value)
#             elif fill_method == 'mode':
#                 fill_value = df.mode().iloc[0]
#                 df_filled = df.fillna(fill_value)
#             elif fill_method == 'constant':
#                 df_filled = df.fillna(constant)
#             elif fill_method == 'linear':
#                 df_filled = preprocess.fill_missing_values_linear(df)
#             elif fill_method == 'random_forest':
#                 df_filled = preprocess.fill_missing_values_rf(df)
#             else:
#                 raise ValueError("Invalid fill_method. Options: 'mean', 'median', 'mode', 'constant', 'linear', 'random_forest'.")
#         except Exception as e:
#             print(f"An error occurred: {e}")
#             df_filled = pd.DataFrame()  # Return an empty DataFrame in case of error

#         return df_filled  

#     @staticmethod
#     def fill_missing_values_linear(df):
#         df_filled = df.copy()
#         initial_imputer = SimpleImputer(strategy='mean')
#         df_initial_imputed = pd.DataFrame(initial_imputer.fit_transform(df_filled), columns=df.columns)
#         for column in df.columns:
#             missing_values_mask = df[column].isnull()
#             if not missing_values_mask.any():
#                 continue
#             X_train = df_initial_imputed.loc[~missing_values_mask].drop(columns=[column])
#             y_train = df_initial_imputed.loc[~missing_values_mask, column]
#             X_test = df_initial_imputed.loc[missing_values_mask].drop(columns=[column])
#             model = LinearRegression()
#             model.fit(X_train, y_train)
#             predicted_values = model.predict(X_test)
#             df_filled.loc[missing_values_mask, column] = predicted_values
#         return df_filled

#     @staticmethod
#     def fill_missing_values_rf(df):
#         df_filled = df.copy()
#         initial_imputer = SimpleImputer(strategy='mean')
#         df_initial_imputed = pd.DataFrame(initial_imputer.fit_transform(df_filled), columns=df.columns)
#         for column in df.columns:
#             missing_values_mask = df[column].isnull()
#             if not missing_values_mask.any():
#                 continue
#             X_train = df_initial_imputed.loc[~missing_values_mask].drop(columns=[column])
#             y_train = df_initial_imputed.loc[~missing_values_mask, column]
#             X_test = df_initial_imputed.loc[missing_values_mask].drop(columns=[column])
#             model = RandomForestRegressor()
#             model.fit(X_train, y_train)
#             predicted_values = model.predict(X_test)
#             df_filled.loc[missing_values_mask, column] = predicted_values
#         return df_filled

#     @staticmethod
#     def poz_transform(df, method='standardize'):
#         try:
#             numerical_columns = df.select_dtypes(include='number')
#             if method == 'standardize':
#                 transformed_df = (numerical_columns - numerical_columns.mean()) / numerical_columns.std()
#             elif method == 'boxcox':
#                 transformed_df = numerical_columns.apply(lambda x: pd.Series(boxcox(x + 1)[0], index=x.index))
#             elif method == 'yeojohnson':
#                 pt = PowerTransformer(method='yeo-johnson')
#                 transformed_data = pt.fit_transform(numerical_columns)
#                 transformed_df = pd.DataFrame(transformed_data, columns=numerical_columns.columns, index=numerical_columns.index)
#             elif method == 'normalize':
#                 transformed_df = numerical_columns.apply(lambda x: (x - x.min()) / (x.max() - x.min()))
#             elif method == 'scaler':
#                 scaler = StandardScaler()
#                 transformed_data = scaler.fit_transform(numerical_columns)
#                 transformed_df = pd.DataFrame(transformed_data, columns=numerical_columns.columns, index=numerical_columns.index)
#             elif method == 'minmax':
#                 scaler = MinMaxScaler()
#                 transformed_data = scaler.fit_transform(numerical_columns)
#                 transformed_df = pd.DataFrame(transformed_data, columns=numerical_columns.columns, index=numerical_columns.index)
#             elif method == 'log2':
#                 transformed_df = np.log2(numerical_columns)
#             else:
#                 raise ValueError(
#                     "Invalid method. Options: 'standardize', 'boxcox', 'yeojohnson', 'normalize', 'scaler', 'minmax', 'log2'.")

#             # Combine transformed numerical columns with non-numeric columns
#             for column in df.columns:
#                 if column in numerical_columns.columns:
#                     df[column] = transformed_df[column]
#         except Exception as e:
#             print(f"An error occurred: {e}")
#             df = pd.DataFrame()  # Return an empty DataFrame in case of error
#         return df

# # Endpoint to handle missing values
# @app.route('/handle_missing_values', methods=['POST'])
# def handle_missing_values():
#     try:
#         file = request.files['file']
#         fill_method = request.form.get('method', 'mean')
#         constant = request.form.get('constant', 0)
#         df = preprocess.poz_read_file(file)

#         if df is None:
#             raise ValueError("Error reading the file. Unsupported file type or corrupt file.")

#         df_filled = preprocess.poz_handle_missing_values(df, fill_method, constant)
#         result = df_filled.to_json(orient="split")
#         print(json.loads(result))
#         return jsonify({'processed_data': json.loads(result)}), 200
        
#     except Exception as e:
#         print(f"Error processing the DataFrame: {e}")
#         return jsonify({'error': f"Error processing the DataFrame: {e}"}), 500

# # Endpoint to handle data transformation
# @app.route('/transform_data', methods=['POST'])
# def transform_data():
#     try:
#         file = request.files['file']
#         method = request.form.get('method', 'standardize')
#         df = preprocess.poz_read_file(file)

#         if df is None:
#             raise ValueError("Error reading the file. Unsupported file type or corrupt file.")

#         df_transformed = preprocess.poz_transform(df, method)
#         result = df_transformed.to_json(orient="split")
#         print(json.loads(result))
#         return jsonify({'transformed_data': json.loads(result)}), 200
        
#     except Exception as e:
#         print(f"Error transforming the DataFrame: {e}")
#         return jsonify({'error': f"Error transforming the DataFrame: {e}"}), 500

# # Endpoint to upload CSV file
# @app.route('/upload-csv', methods=['POST'])
# def upload_csv():
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file selected'}), 400
#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({'error': 'No selected file'}), 400
#     if file:
#         try:
#             # Read CSV file using pandas
#             df = pd.read_csv(file)

#             # Convert DataFrame to JSON
#             json_data = df.to_json(orient='split')

#             # Return JSON response
#             return jsonify({'data': json_data})
#         except Exception as e:
#             return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)





from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import pandas as pd
import docx
import json
import os
import io
import numpy as np
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import PowerTransformer, StandardScaler, MinMaxScaler
from scipy.stats import boxcox
import bcrypt

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:rishi123@localhost:3306/dart'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define the User model
class User(db.Model):
    __tablename__ = 'dart_users'
    userid = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    username = db.Column(db.String(120), nullable=False)

    def __init__(self, email, password, username):
        self.email = email
        self.password = password
        self.username = username

# Create the database tables
with app.app_context():
    db.create_all()

# User signup endpoint
@app.route('/user/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    username = data.get('username')

    if not email or not password or not username:
        return jsonify({'error': 'Email, password, and username are required'}), 400

    # Check if the user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'User already exists'}), 400

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    new_user = User(email=email, password=hashed_password, username=username)
    db.session.add(new_user)
    db.session.commit()

    # Generate a token (you can replace this with actual JWT generation)
    token = 'some_generated_token'  # Replace with real token generation logic

    return jsonify({'token': token}), 200

# User login endpoint
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

    return jsonify({'message': 'success'}), 200

# User password reset endpoint
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

# Get username endpoint
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

    @staticmethod
    def poz_handle_missing_values(df, fill_method='mean', constant=0):
        try:
            if fill_method == 'mean':
                fill_value = df.mean()
                df_filled = df.fillna(fill_value)
            elif fill_method == 'median':
                fill_value = df.median()    
                df_filled = df.fillna(fill_value)
            elif fill_method == 'mode':
                fill_value = df.mode().iloc[0]
                df_filled = df.fillna(fill_value)
            elif fill_method == 'constant':
                df_filled = df.fillna(constant)
            elif fill_method == 'linear':
                df_filled = preprocess.fill_missing_values_linear(df)
            elif fill_method == 'random_forest':
                df_filled = preprocess.fill_missing_values_rf(df)
            else:
                raise ValueError("Invalid fill_method. Options: 'mean', 'median', 'mode', 'constant', 'linear', 'random_forest'.")
        except Exception as e:
            print(f"An error occurred: {e}")
            df_filled = pd.DataFrame()  # Return an empty DataFrame in case of error

        return df_filled  

    @staticmethod
    def fill_missing_values_linear(df):
        df_filled = df.copy()
        initial_imputer = SimpleImputer(strategy='mean')
        df_initial_imputed = pd.DataFrame(initial_imputer.fit_transform(df_filled), columns=df.columns)
        for column in df.columns:
            missing_values_mask = df[column].isnull()
            if not missing_values_mask.any():
                continue
            X_train = df_initial_imputed.loc[~missing_values_mask].drop(columns=[column])
            y_train = df_initial_imputed.loc[~missing_values_mask, column]
            X_test = df_initial_imputed.loc[missing_values_mask].drop(columns=[column])
            model = LinearRegression()
            model.fit(X_train, y_train)
            predicted_values = model.predict(X_test)
            df_filled.loc[missing_values_mask, column] = predicted_values
        return df_filled

    @staticmethod
    def fill_missing_values_rf(df):
        df_filled = df.copy()
        initial_imputer = SimpleImputer(strategy='mean')
        df_initial_imputed = pd.DataFrame(initial_imputer.fit_transform(df_filled), columns=df.columns)
        for column in df.columns:
            missing_values_mask = df[column].isnull()
            if not missing_values_mask.any():
                continue
            X_train = df_initial_imputed.loc[~missing_values_mask].drop(columns=[column])
            y_train = df_initial_imputed.loc[~missing_values_mask, column]
            X_test = df_initial_imputed.loc[missing_values_mask].drop(columns=[column])
            model = RandomForestRegressor()
            model.fit(X_train, y_train)
            predicted_values = model.predict(X_test)
            df_filled.loc[missing_values_mask, column] = predicted_values
        return df_filled

    @staticmethod
    def poz_transform(df, method='standardize'):
        try:
            numerical_columns = df.select_dtypes(include='number')
            if method == 'standardize':
                transformed_df = (numerical_columns - numerical_columns.mean()) / numerical_columns.std()
            elif method == 'boxcox':
                transformed_df = numerical_columns.apply(lambda x: pd.Series(boxcox(x + 1)[0], index=x.index))
            elif method == 'yeojohnson':
                pt = PowerTransformer(method='yeo-johnson')
                transformed_data = pt.fit_transform(numerical_columns)
                transformed_df = pd.DataFrame(transformed_data, columns=numerical_columns.columns, index=numerical_columns.index)
            elif method == 'normalize':
                transformed_df = numerical_columns.apply(lambda x: (x - x.min()) / (x.max() - x.min()))
            elif method == 'scaler':
                scaler = StandardScaler()
                transformed_data = scaler.fit_transform(numerical_columns)
                transformed_df = pd.DataFrame(transformed_data, columns=numerical_columns.columns, index=numerical_columns.index)
            elif method == 'minmax':
                scaler = MinMaxScaler()
                transformed_data = scaler.fit_transform(numerical_columns)
                transformed_df = pd.DataFrame(transformed_data, columns=numerical_columns.columns, index=numerical_columns.index)
            elif method == 'log2':
                transformed_df = np.log2(numerical_columns)
            else:
                raise ValueError(
                    "Invalid method. Options: 'standardize', 'boxcox', 'yeojohnson', 'normalize', 'scaler', 'minmax', 'log2'.")

            # Combine transformed numerical columns with non-numeric columns
            for column in df.columns:
                if column in numerical_columns.columns:
                    df[column] = transformed_df[column]
        except Exception as e:
            print(f"An error occurred: {e}")
            df = pd.DataFrame()  # Return an empty DataFrame in case of error
        return df
    
    def poz_outliers(data, method='z-score', threshold=3, action='remove'):
        cleaned_data = data.copy()
        if method == 'z-score':
            # Detect outliers using z-score
            z_scores = (cleaned_data - cleaned_data.mean()) / cleaned_data.std()
            outliers = abs(z_scores) > threshold

        elif method == 'iqr':
            # Detect outliers using interquartile range (IQR)
            q1 = cleaned_data.quantile(0.25)
            q3 = cleaned_data.quantile(0.75)
            iqr = q3 - q1
            lower_bound = q1 - threshold * iqr
            upper_bound = q3 + threshold * iqr
            outliers = (cleaned_data < lower_bound) | (cleaned_data > upper_bound)

        else:
            raise ValueError("Invalid method. Options: 'z-score', 'iqr'")

        if action == 'remove':
            # Remove outliers
            cleaned_data = cleaned_data[~outliers.any(axis=1)]

        elif action == 'cap':
            # Cap outliers to a specified range
            cleaned_data[outliers] = cleaned_data.clip(lower=lower_bound, upper=upper_bound, axis=1)

        else:
            raise ValueError("Invalid action. Options: 'remove', 'transform', 'cap'")

        return cleaned_data

# Endpoint to handle missing values
@app.route('/handle_missing_values', methods=['POST'])
def handle_missing_values():
    try:
        file = request.files['file']
        fill_method = request.form.get('method', 'mean')
        constant = request.form.get('constant', 0)
        df = preprocess.poz_read_file(file)

        if df is None:
            raise ValueError("Error reading the file. Unsupported file type or corrupt file.")

        df_filled = preprocess.poz_handle_missing_values(df, fill_method, constant)
        result = df_filled.to_json(orient="split")
        print(json.loads(result))
        return jsonify({'processed_data': json.loads(result)}), 200
        
    except Exception as e:
        print(f"Error processing the DataFrame: {e}")
        return jsonify({'error': f"Error processing the DataFrame: {e}"}), 500

# Endpoint to handle data transformation
@app.route('/transform_data', methods=['POST'])
def transform_data():
    try:
        file = request.files['file']
        method = request.form.get('method', 'standardize')
        df = preprocess.poz_read_file(file)

        if df is None:
            raise ValueError("Error reading the file. Unsupported file type or corrupt file.")

        df_transformed = preprocess.poz_transform(df, method)
        result = df_transformed.to_json(orient="split")
        print(json.loads(result))
        return jsonify({'transformed_data': json.loads(result)}), 200
        
    except Exception as e:
        print(f"Error transforming the DataFrame: {e}")
        return jsonify({'error': f"Error transforming the DataFrame: {e}"}), 500

# Endpoint to upload CSV file
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
        
        # Endpoint to handle outliers
@app.route('/handle_outliers', methods=['POST'])
def handle_outliers():
    try:
        file = request.files['file']
        method = request.form.get('method', 'z-score')
        threshold = float(request.form.get('threshold', 3))
        action = request.form.get('action', 'remove')
        df = preprocess.poz_read_file(file)

        if df is None:
            raise ValueError("Error reading the file. Unsupported file type or corrupt file.")

        df_outliers_handled = preprocess.poz_outliers(df, method, threshold, action)
        result = df_outliers_handled.to_json(orient="split")
        print(json.loads(result))
        return jsonify({'processed_data': json.loads(result)}), 200
        
    except Exception as e:
        print(f"Error processing outliers: {e}")
        return jsonify({'error': f"Error processing outliers: {e}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
