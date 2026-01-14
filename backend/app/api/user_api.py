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
# #     ])
# from flask import Blueprint, jsonify, request
# from flask_jwt_extended import jwt_required, get_jwt_identity
# from app.models import User
# from app.extensions import db

# user_api = Blueprint("user_api", __name__)

# # ---------------------------
# # GET PROFILE
# # ---------------------------
# @user_api.route("/api/profile", methods=["GET"])
# @jwt_required()
# def get_profile():
#     user_id = int(get_jwt_identity())
#     user = User.query.get_or_404(user_id)
#     return jsonify(user.to_dict()), 200


# # ---------------------------
# # UPDATE PROFILE
# # ---------------------------
# @user_api.route("/api/profile", methods=["PUT"])
# @jwt_required()
# def update_profile():
#     user_id = int(get_jwt_identity())
#     user = User.query.get_or_404(user_id)

#     data = request.get_json()

#     user.name = data.get("name", user.name)
#     user.linkedin_url = data.get("linkedin_url", user.linkedin_url)
#     user.phone = data.get("phone", user.phone)
#     user.experience_years = data.get("experience_years", user.experience_years)
#     user.organization = data.get("organization", user.organization)

#     db.session.commit()

#     return jsonify({"message": "Profile updated successfully"}), 200
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
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
    
    # 👑 HANDLE DUMMY ADMIN PROFILE
    if user_id == 0:
        return jsonify({
            "id": 0,
            "name": "Super Admin",
            "email": "setuadmin@gmail.com",
            "role": "admin",
            "designation": "Administrator",
            "organization": "SETU",
            "experience_years": 99,
            "phone": "0000000000",
            "linkedin_url": ""
        }), 200

    user = User.query.get_or_404(user_id)

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "linkedin_url": user.linkedin_url,
        "phone": user.phone,
        "experience_years": user.experience_years,
        "organization": user.organization,
    }), 200


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

    db.session.commit()

    return jsonify({"message": "Profile updated successfully"}), 200


# ---------------------------
# ADMIN: GET ALL USERS
# ---------------------------
@user_api.route("/api/admin/users", methods=["GET"])
@jwt_required()
def get_all_users():
    claims = get_jwt()
    
    # 🔒 RBAC CHECK
    if claims.get("role") != "admin":
        return jsonify({"error": "Admin access required"}), 403

    users = User.query.all()
    
    # Return only essential fields for admin panel display
    # Excludes sensitive persona details (phone, linkedin_url, experience_years)
    return jsonify([
        {
            "id": u.id,
            "name": u.name,
            "email": u.email,
            "role": u.role,
            "organization": u.organization
        }
        for u in users
    ]), 200


# ---------------------------
# ADMIN: GET USER DETAILS
# ---------------------------
@user_api.route("/api/admin/user/<int:user_id>", methods=["GET"])
@jwt_required()
def get_user_details(user_id):
    claims = get_jwt()
    
    # 🔒 RBAC CHECK
    if claims.get("role") != "admin":
        return jsonify({"error": "Admin access required"}), 403

    user = User.query.get_or_404(user_id)
    
    # Return all user details including persona information
    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "organization": user.organization,
        "phone": user.phone,
        "linkedin_url": user.linkedin_url,
        "experience_years": user.experience_years,
        "designation": getattr(user, 'designation', None)
    }), 200


# ---------------------------
# ADMIN: DELETE USER
# ---------------------------
@user_api.route("/api/admin/user/<int:user_id>", methods=["DELETE"])
@jwt_required()
def delete_user(user_id):
    claims = get_jwt()
    if claims.get("role") != "admin":
        return jsonify({"error": "Admin access required"}), 403

    if user_id == 0:
        return jsonify({"error": "Cannot delete Super Admin"}), 403

    user = User.query.get_or_404(user_id)
    
    if user.role == "admin":
         return jsonify({"error": "Cannot delete other admins"}), 403

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted successfully"}), 200


# ---------------------------
# ADMIN: ACTIVITY LOGS (MOCKED)
# ---------------------------
@user_api.route("/api/admin/logs", methods=["GET"])
@jwt_required()
def get_logs():
    claims = get_jwt()
    if claims.get("role") != "admin":
        return jsonify({"error": "Admin access required"}), 403

    # 🎭 MOCKED LOGS GENERATOR
    from datetime import datetime
    import random
    
    actions = ["Logged in", "Updated profile", "Viewed course", "Downloaded certificate"]
    users = ["Alice", "Bob", "Charlie", "David"]
    
    logs = []
    for i in range(10):
        logs.append({
            "id": i + 1,
            "user": random.choice(users),
            "action": random.choice(actions),
            "time": datetime.now().strftime("%I:%M %p"),
            "status": "Success"
        })

    return jsonify(logs), 200
