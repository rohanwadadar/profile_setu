# from flask import Blueprint, request, render_template, redirect, session
# from .models import User
# from .extensions import db, bcrypt

# auth_bp = Blueprint("auth", __name__)

# # =========================
# # LOGIN
# # =========================
# @auth_bp.route("/login", methods=["GET", "POST"])
# def login():
#     if request.method == "POST":
#         email = request.form.get("email")
#         password = request.form.get("password")

#         # Validation
#         if not email or not password:
#             return render_template(
#                 "login.html",
#                 error="Email and password are required"
#             )

#         # Find user
#         user = User.query.filter_by(email=email).first()

#         if not user:
#             return render_template(
#                 "login.html",
#                 error="User not found"
#             )

#         # Check password
#         if not bcrypt.check_password_hash(user.password, password):
#             return render_template(
#                 "login.html",
#                 error="Incorrect password"
#             )

#         # Login success
#         session["user_id"] = user.id
#         session["user_name"] = user.name

#         return redirect("/dashboard")

#     # GET request
#     return render_template("login.html")


# # =========================
# # REGISTER
# # =========================
# @auth_bp.route("/register", methods=["GET", "POST"])
# def register():
#     if request.method == "POST":
#         name = request.form.get("name")
#         email = request.form.get("email")
#         password = request.form.get("password")

#         # Validation
#         if not name or not email or not password:
#             return render_template(
#                 "register.html",
#                 error="All fields are required"
#             )

#         if len(password) < 6:
#             return render_template(
#                 "register.html",
#                 error="Password must be at least 6 characters"
#             )

#         # Check existing user
#         existing_user = User.query.filter_by(email=email).first()
#         if existing_user:
#             return render_template(
#                 "register.html",
#                 error="Email already registered"
#             )

#         # Hash password
#         hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

#         # Save user
#         new_user = User(
#             name=name,
#             email=email,
#             password=hashed_password
#         )

#         db.session.add(new_user)
#         db.session.commit()

#         return redirect("/login")

#     # GET request
#     return render_template("register.html")


# # =========================
# # LOGOUT
# # =========================
# @auth_bp.route("/logout")
# def logout():
#     session.clear()
#     return redirect("/login")






# from flask import Blueprint, render_template, request, redirect
# from flask_jwt_extended import (
#     create_access_token,
#     set_access_cookies,
#     unset_jwt_cookies
# )
# from .models import User
# from .extensions import db, bcrypt

# auth_bp = Blueprint("auth", __name__)

# @auth_bp.route("/register", methods=["GET", "POST"])
# def register():
#     if request.method == "POST":
#         name = request.form["name"]
#         email = request.form["email"]
#         password = request.form["password"]

#         if User.query.filter_by(email=email).first():
#             return render_template("register.html", error="Email already exists")

#         hashed = bcrypt.generate_password_hash(password).decode("utf-8")
#         user = User(name=name, email=email, password=hashed)

#         db.session.add(user)
#         db.session.commit()

#         return redirect("/login")

#     return render_template("register.html")


# @auth_bp.route("/login", methods=["GET", "POST"])
# def login():
#     if request.method == "POST":
#         email = request.form["email"]
#         password = request.form["password"]

#         user = User.query.filter_by(email=email).first()
#         if not user or not bcrypt.check_password_hash(user.password, password):
#             return render_template("login.html", error="Invalid credentials")

#         token = create_access_token(identity=str(user.id))

#         response = redirect("/dashboard")
#         set_access_cookies(response, token)
#         return response

#     return render_template("login.html")


# @auth_bp.route("/logout")
# def logout():
#     response = redirect("/login")
#     unset_jwt_cookies(response)
#     return response
from flask import Blueprint, render_template, request, redirect
from flask_jwt_extended import (
    create_access_token,
    set_access_cookies,
    unset_jwt_cookies
)
from .models import User
from .extensions import db, bcrypt

auth_bp = Blueprint("auth", __name__)

# -------------------------
# LOGIN
# -------------------------
@auth_bp.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")

        user = User.query.filter_by(email=email).first()

        if not user or not bcrypt.check_password_hash(user.password, password):
            return render_template("login.html", error="Invalid credentials")

        # 🔐 CREATE JWT
        token = create_access_token(identity=str(user.id))

        # 🔁 ROLE-BASED REDIRECT
        response = redirect("/admin" if user.role == "admin" else "/")
        set_access_cookies(response, token)
        return response

    return render_template("login.html")


# -------------------------
# REGISTER
# -------------------------
@auth_bp.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        email = request.form.get("email")

        if User.query.filter_by(email=email).first():
            return render_template("register.html", error="Email already exists")

        user = User(
            name=request.form.get("name"),
            email=email,
            password=bcrypt.generate_password_hash(
                request.form.get("password")
            ).decode("utf-8"),
            role="user"
        )

        db.session.add(user)
        db.session.commit()

        return redirect("/login")

    return render_template("register.html")


# -------------------------
# LOGOUT
# -------------------------
@auth_bp.route("/logout")
def logout():
    response = redirect("/")
    unset_jwt_cookies(response)
    return response
