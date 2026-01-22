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





import os
from datetime import timedelta
from dotenv import load_dotenv

# 🔥 Load .env file
load_dotenv()

class Config:
    # --------------------------------------------------
    # 🔐 Core Secrets
    # --------------------------------------------------
    SECRET_KEY = os.getenv("SECRET_KEY", "fallback-secret")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "fallback-jwt-secret")

    # --------------------------------------------------
    # 🗄️ Database
    # --------------------------------------------------
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DB_URL",
        "mysql+pymysql://root@localhost/test"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # --------------------------------------------------
    # 🔐 JWT TOKEN SETTINGS (ACCESS + REFRESH)
    # --------------------------------------------------

    # Token expy
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=15)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=7)

    # Where JWT can be read from
    JWT_TOKEN_LOCATION = ["headers", "cookies"]

    # Cookie paths
    JWT_ACCESS_COOKIE_PATH = "/"
    JWT_REFRESH_COOKIE_PATH = "/api/refresh"

    # Cookie security (True in production with HTTPS)
    JWT_COOKIE_SECURE = False
    JWT_COOKIE_SAMESITE = "Lax"

    # Disable CSRF for development
    JWT_COOKIE_CSRF_PROTECT = False

    # --------------------------------------------------
    # 👑 Predefined Admin (NO REGISTRATION)
    # --------------------------------------------------
    ADMIN_NAME = os.getenv("ADMIN_NAME")
    ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
    ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")
