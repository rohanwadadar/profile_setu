# # from flask import Blueprint, request, jsonify
# # from flask_jwt_extended import create_access_token
# # from app.models import User
# # from app.extensions import db, bcrypt

# # auth_api = Blueprint("auth_api", __name__)

# # @auth_api.route("/api/register", methods=["POST"])
# # def api_register():
# #     data = request.get_json()

# #     if User.query.filter_by(email=data["email"]).first():
# #         return jsonify({"error": "Email exists"}), 409

# #     user = User(
# #         name=data["name"],
# #         email=data["email"],
# #         password=bcrypt.generate_password_hash(data["password"]).decode("utf-8")
# #     )

# #     db.session.add(user)
# #     db.session.commit()

# #     return jsonify({"message": "Registered"}), 201


# # @auth_api.route("/api/login", methods=["POST"])
# # def api_login():
# #     data = request.get_json()
# #     user = User.query.filter_by(email=data["email"]).first()

# #     if not user or not bcrypt.check_password_hash(user.password, data["password"]):
# #         return jsonify({"error": "Invalid credentials"}), 401

# #     token = create_access_token(identity=str(user.id))
# #     return jsonify({"access_token": token})
# from flask import Blueprint, request, jsonify
# from flask_jwt_extended import create_access_token
# from app.models import User
# from app.extensions import db, bcrypt

# # ✅ Blueprint name MUST be auth_api
# auth_api = Blueprint("auth_api", __name__)

# @auth_api.route("/api/register", methods=["POST"])
# def api_register():
#     data = request.get_json()

#     if User.query.filter_by(email=data["email"]).first():
#         return jsonify({"error": "Email already exists"}), 409

#     user = User(
#         name=data["name"],
#         email=data["email"],
#         password=bcrypt.generate_password_hash(
#             data["password"]
#         ).decode("utf-8"),
#         role="user"
#     )

#     db.session.add(user)
#     db.session.commit()

#     return jsonify({"message": "Registered successfully"}), 201


# @auth_api.route("/api/login", methods=["POST"])
# def api_login():
#     data = request.get_json()
#     user = User.query.filter_by(email=data["email"]).first()

#     if not user or not bcrypt.check_password_hash(
#         user.password, data["password"]
#     ):
#         return jsonify({"error": "Invalid credentials"}), 401

#     token = create_access_token(identity=str(user.id))
#     return jsonify({"access_token": token})






# from flask import Blueprint, request, jsonify
# from flask_jwt_extended import create_access_token
# from app.models import User
# from app.extensions import db, bcrypt

# auth_api = Blueprint("auth_api", __name__)

# @auth_api.route("/api/register", methods=["POST"])
# def register():
#     data = request.get_json()

#     if User.query.filter_by(email=data["email"]).first():
#         return jsonify({"error": "Email already exists"}), 409

#     user = User(
#         name=data["name"],
#         email=data["email"],
#         password=bcrypt.generate_password_hash(
#             data["password"]
#         ).decode(),
#         role="user"
#     )

#     db.session.add(user)
#     db.session.commit()

#     return jsonify({"message": "Registered successfully"}), 201


# @auth_api.route("/api/login", methods=["POST"])
# def login():
#     data = request.get_json()
#     user = User.query.filter_by(email=data["email"]).first()

#     if not user or not bcrypt.check_password_hash(user.password, data["password"]):
#         return jsonify({"error": "Invalid credentials"}), 401

#     token = create_access_token(
#         identity=str(user.id),
#         additional_claims={"role": user.role}
#     )

#     return jsonify({"access_token": token}), 200
from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
    set_refresh_cookies,
    unset_jwt_cookies
)
from app.models import User
from app.extensions import db, bcrypt

auth_api = Blueprint("auth_api", __name__)

# ---------------------------
# REGISTER
# ---------------------------
@auth_api.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "Email already exists"}), 409

    user = User(
        name=data["name"],
        email=data["email"],
        password=bcrypt.generate_password_hash(
            data["password"]
        ).decode("utf-8"),
        role="user"
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Registered successfully"}), 201


# ---------------------------
# LOGIN (ACCESS + REFRESH)
# ---------------------------
@auth_api.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    # 👑 HARDCODED ADMIN CHECK (Requested)
    if data["email"] == "setuadmin@gmail.com" and data["password"] == "admin1234":
        access_token = create_access_token(
            identity="0", # Dummy ID for admin
            additional_claims={"role": "admin"}
        )
        refresh_token = create_refresh_token(identity="0")
        
        response = jsonify({
            "access_token": access_token, 
            "role": "admin",
            "message": "Admin login successful"
        })
        set_refresh_cookies(response, refresh_token)
        return response, 200

    user = User.query.filter_by(email=data["email"]).first()

    if not user or not bcrypt.check_password_hash(user.password, data["password"]):
        return jsonify({"error": "Invalid credentials"}), 401

    access_token = create_access_token(
        identity=str(user.id),
        additional_claims={"role": user.role}
    )

    refresh_token = create_refresh_token(identity=str(user.id))

    response = jsonify({"access_token": access_token})
    set_refresh_cookies(response, refresh_token)

    return response, 200


# ---------------------------
# REFRESH ACCESS TOKEN
# ---------------------------
@auth_api.route("/api/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    user_id = get_jwt_identity()
    user = User.query.get_or_404(user_id)

    new_access_token = create_access_token(
        identity=str(user.id),
        additional_claims={"role": user.role}
    )

    return jsonify({"access_token": new_access_token}), 200


# ---------------------------
# LOGOUT
# ---------------------------
@auth_api.route("/api/logout", methods=["POST"])
def logout():
    response = jsonify({"message": "Logged out successfully"})
    unset_jwt_cookies(response)
    return response, 200
