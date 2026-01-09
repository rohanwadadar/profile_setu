# # # from flask import Blueprint, jsonify
# # # from flask_jwt_extended import jwt_required, get_jwt_identity
# # # from app.models import User

# # # user_api = Blueprint("user_api", __name__)

# # # @user_api.route("/api/profile", methods=["GET"])
# # # @jwt_required()
# # # def profile():
# # #     user_id = int(get_jwt_identity())

# # #     user = User.query.get(user_id)

# # #     if not user:
# # #         return jsonify({"error": "User not found"}), 404

# # #     return jsonify({
# # #         "id": user.id,
# # #         "name": user.name,
# # #         "email": user.email
# # #     })




# # from flask import Blueprint, jsonify
# # from flask_jwt_extended import jwt_required, get_jwt_identity
# # from app.models import User
# # from app.utils import role_required

# # user_api = Blueprint("user_api", __name__)

# # @user_api.route("/api/profile", methods=["GET"])
# # @jwt_required()
# # def profile():
# #     user = User.query.get(int(get_jwt_identity()))
# #     return jsonify({
# #         "id": user.id,
# #         "name": user.name,
# #         "email": user.email,
# #         "role": user.role
# #     })

# # @user_api.route("/api/admin/users", methods=["GET"])
# # @jwt_required()
# # @role_required("admin")
# # def all_users():
# #     users = User.query.all()
# #     return jsonify([
# #         {
# #             "id": u.id,
# #             "name": u.name,
# #             "email": u.email,
# #             "role": u.role
# #         } for u in users
# #     ])








# from flask import Blueprint, jsonify
# from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
# from app.models import User

# user_api = Blueprint("user_api", __name__)

# # -------------------------
# # USER PROFILE
# # -------------------------
# @user_api.route("/api/profile")
# @jwt_required()
# def profile():
#     user_id = int(get_jwt_identity())
#     user = User.query.get(user_id)

#     return jsonify({
#         "id": user.id,
#         "name": user.name,
#         "email": user.email,
#         "role": user.role
#     })


# # -------------------------
# # ADMIN: ALL USERS
# # -------------------------
# @user_api.route("/api/admin/users")
# @jwt_required()
# def all_users():
#     claims = get_jwt()

#     if claims.get("role") != "admin":
#         return jsonify({"error": "Admin access required"}), 403

#     users = User.query.all()

#     return jsonify([
#         {
#             "id": u.id,
#             "name": u.name,
#             "email": u.email,
#             "role": u.role
#         }
#         for u in users
#     ])
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import User
from app.extensions import db

user_api = Blueprint("user_api", __name__)

# ---------------------------
# GET PROFILE
# ---------------------------
@user_api.route("/api/profile", methods=["GET"])
@jwt_required()
def get_profile():
    user_id = int(get_jwt_identity())
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict()), 200


# ---------------------------
# UPDATE PROFILE
# ---------------------------
@user_api.route("/api/profile", methods=["PUT"])
@jwt_required()
def update_profile():
    user_id = int(get_jwt_identity())
    user = User.query.get_or_404(user_id)

    data = request.get_json()

    user.name = data.get("name", user.name)
    user.linkedin_url = data.get("linkedin_url", user.linkedin_url)
    user.phone = data.get("phone", user.phone)
    user.experience_years = data.get("experience_years", user.experience_years)
    user.organization = data.get("organization", user.organization)

    db.session.commit()

    return jsonify({"message": "Profile updated successfully"}), 200
