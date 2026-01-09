# from flask import Flask
# from .config import Config
# from .extensions import db, bcrypt
# from .routes import main_bp
# from .auth import auth_bp

# def create_app():
#     app = Flask(__name__)
#     app.config.from_object(Config)

#     # Init extensions
#     db.init_app(app)
#     bcrypt.init_app(app)

#     # Register blueprints
#     app.register_blueprint(main_bp)
#     app.register_blueprint(auth_bp)

#     # 🔥 AUTO-CREATE TABLES IF NOT EXIST
#     with app.app_context():
#         db.create_all()

#     return app
# from flask import Flask
# from flask import Flask
# from .config import Config
# from .extensions import db, bcrypt, jwt

# from .auth import auth_bp
# from .routes import main_bp
# from .api.auth_api import auth_api
# from .api.user_api import user_api


# def create_app():
#     app = Flask(__name__)
#     app.config.from_object(Config)

#     db.init_app(app)
#     bcrypt.init_app(app)
#     jwt.init_app(app)

#     app.register_blueprint(auth_bp)
#     app.register_blueprint(main_bp)
#     app.register_blueprint(auth_api)
#     app.register_blueprint(user_api)

#     with app.app_context():
#         db.create_all()

#     return app
from flask import Flask
from flask_cors import CORS
from .config import Config
from .extensions import db, bcrypt, jwt

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # 🔥 Enable CORS for React
    CORS(app, supports_credentials=True)

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

    from .api.auth_api import auth_api
    from .api.user_api import user_api

    app.register_blueprint(auth_api)
    app.register_blueprint(user_api)

    with app.app_context():
        db.create_all()

    return app

