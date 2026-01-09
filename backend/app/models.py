# from .extensions import db

# class User(db.Model):
#     __tablename__ = "user"

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     password = db.Column(db.String(255), nullable=False)
#     role = db.Column(db.String(20), default="user")  # user | admin

from .extensions import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default="user")

    # 🔹 PROFILE FIELDS
    linkedin_url = db.Column(db.String(255))
    phone = db.Column(db.String(20))
    experience_years = db.Column(db.Integer)
    organization = db.Column(db.String(150))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "linkedin_url": self.linkedin_url,
            "phone": self.phone,
            "experience_years": self.experience_years,
            "organization": self.organization,
            "role": self.role
        }
