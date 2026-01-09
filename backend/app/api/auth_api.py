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






from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from app.models import User
from app.extensions import db, bcrypt

auth_api = Blueprint("auth_api", __name__)

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
        ).decode(),
        role="user"
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Registered successfully"}), 201


@auth_api.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()

    if not user or not bcrypt.check_password_hash(user.password, data["password"]):
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_access_token(
        identity=str(user.id),
        additional_claims={"role": user.role}
    )

    return jsonify({"access_token": token}), 200
