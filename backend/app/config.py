# class Config:
#     SECRET_KEY = "supersecret"
#     SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root@localhost/test"
#     SQLALCHEMY_TRACK_MODIFICATIONS = False

# class Config:
#     SECRET_KEY = "secret-key"
#     JWT_SECRET_KEY = "jwt-secret"

#     SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root@localhost/test"
#     SQLALCHEMY_TRACK_MODIFICATIONS = False

#     # 🔥 FIX: allow BOTH browser & Postman
#     JWT_TOKEN_LOCATION = ["headers", "cookies"]

#     JWT_ACCESS_COOKIE_PATH = "/"
#     JWT_COOKIE_SECURE = False
#     JWT_COOKIE_CSRF_PROTECT = False



import os
from dotenv import load_dotenv

# 🔥 Load .env file
load_dotenv()

class Config:
    # 🔐 Secrets
    SECRET_KEY = os.getenv("SECRET_KEY", "fallback-secret")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "fallback-jwt-secret")

    # 🗄️ Database
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DB_URL",
        "mysql+pymysql://root@localhost/test"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # 🔐 JWT Settings
    
    JWT_ACCESS_COOKIE_PATH = "/"
    JWT_TOKEN_LOCATION = ["headers"]
    JWT_COOKIE_SECURE = False
    JWT_COOKIE_CSRF_PROTECT = False


    # 👑 Predefined Admin (from .env)
    ADMIN_NAME = os.getenv("ADMIN_NAME")
    ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
    ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")
