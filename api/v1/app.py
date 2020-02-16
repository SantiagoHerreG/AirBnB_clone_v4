#!/usr/bin/python3
"""
Flask App that integrates with AirBnB static HTML Template
"""
from api.v1.views import app_views
from flask import Flask, jsonify, make_response, render_template, url_for
from flask_cors import CORS, cross_origin
# from flasgger import Swagger
from models import storage
import os
from werkzeug.exceptions import HTTPException

# Global Flask Application Variable: app
app = Flask(__name__)
# could not install flasgger
# swagger = Swagger(app)

# global strict slashes
app.url_map.strict_slashes = False

# flask server environmental setup
host = os.getenv('HBNB_API_HOST', '0.0.0.0')
port = os.getenv('HBNB_API_PORT', 5001)

# app_views BluePrint defined in api.v1.views
app.register_blueprint(app_views)

# Cross-Origin Resource Sharing
CORS(app, resources={r"/api/v1/*": {"origins": "*"}})


# begin flask page rendering
@app.teardown_appcontext
def teardown_db(exception):
    """
    after each request, this method calls .close() (i.e. .remove()) on
    the current SQLAlchemy Session
    """
    storage.close()


@app.errorhandler(404)
def error_404(error):
    """
    returns json with status: error
    """
    return make_response(jsonify({'error': 'Not found'}), 404)

if __name__ == "__main__":
    """
    MAIN Flask App
    """
    # start Flask app
    app.run(host=host, port=port, threaded=True)
