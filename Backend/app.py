from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from datetime import datetime

app = Flask(__name__)
CORS(app)

def _init_db():
    try:
        connection = sqlite3.connect('contacts.db')
        c = connection.cursor()
        c.execute('''
                CREATE TABLE IF NOT EXISTS contacts
                (id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
                ''')
        connection.commit()
    except Exception as e:
        print(f"Database initialization error: {e}")
    finally:
        connection.close()
    
@app.route('/submit', methods=['POST'])
def submit_form():
    conn = None
    try:
        data = request.get_json()
        print(f'recieved : {data}')
        name = data['name']
        email = data['email']
        message = data['message']
        
        conn = sqlite3.connect('contacts.db')
        c = conn.cursor()
        c.execute('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
                (name, email, message))
        
        conn.commit()
        return jsonify({'message':"Form submitted successfully!thanks for your feedback!"}), 200
    
    except KeyError as ke:
        print(f"Missing field in form data: {ke}")
        return jsonify({'error': "Missing required fields"}), 400
        
    except Exception as e:
        print(f"Error processing form: {e}")
        return jsonify({'error': "An error occurred while processing your submission"}), 500
        
    finally:
        if conn:
            conn.close()
            
if __name__ == '__main__':
    _init_db()
    app.run(debug=True)