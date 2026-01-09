# # from flask import Blueprint, render_template, session, redirect

# # main_bp = Blueprint("main", __name__)

# # @main_bp.route("/")
# # def home():
# #     return redirect("/login")

# # @main_bp.route("/dashboard")
# # def dashboard():
# #     if "user_id" not in session:
# #         return redirect("/login")
# #     return render_template("dashboard.html")
# from flask import Blueprint, render_template, redirect
# from flask_jwt_extended import jwt_required, get_jwt_identity
# from .models import User

# main_bp = Blueprint("main", __name__)

# @main_bp.route("/")
# def home():
#     return redirect("/login")


# @main_bp.route("/dashboard")
# @jwt_required()
# def dashboard():
#     user_id = int(get_jwt_identity())

#     user = User.query.get(user_id)

#     if not user:
#         return redirect("/login")

#     return render_template("dashboard.html", name=user.name)
from flask import Blueprint, render_template, redirect, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from .models import User

main_bp = Blueprint("main", __name__)

# -------------------------
# WELCOME PAGE
# -------------------------
@main_bp.route("/")
def home():
    logged_in = "access_token_cookie" in request.cookies
    return render_template("index.html", logged_in=logged_in)

@main_bp.route("/roadmap")
def roadmap():
    return render_template("next.html")

# -------------------------
# ADMIN PAGE (JWT + RBAC)
# -------------------------
@main_bp.route("/admin")
@jwt_required()
def admin_panel():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    # 🔒 BLOCK NON-ADMINS
    if not user or user.role != "admin":
        return redirect("/")

    users = User.query.all()
    return render_template("admin.html", users=users)
