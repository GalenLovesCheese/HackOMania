from flask import Flask
from pymongo import MongoClient

def create_app():
    # Init app
    app = Flask(__name__)

    # Register routes
    from app.main import bp as main_bp
    app.register_blueprint(main_bp, url_prefix="/")

    return app

app = Flask(__name__)

#27017 is Port no. of host 'localhost'
client = MongoClient('localhost', 27017) 

db = client.flask_db
todos = db.todos

