# Profile Setu - Backend

A Flask-based REST API backend for the Profile Setu platform with JWT authentication, role-based access control (RBAC), and MySQL database integration.

## 🚀 Features

- **JWT Authentication**: Secure token-based authentication with access and refresh tokens
- **Role-Based Access Control (RBAC)**: Admin and user roles with protected endpoints
- **User Management**: Complete CRUD operations for user profiles
- **Admin Dashboard API**: Endpoints for admin to manage users and view details
- **MySQL Database**: Persistent data storage with SQLAlchemy ORM
- **Password Security**: Bcrypt password hashing

## 📋 Prerequisites

- Python 3.8 or higher
- MySQL Server
- pip (Python package manager)

## 🛠️ Installation

### 1. Clone the repository
```bash
cd backend
```

### 2. Create a virtual environment
```bash
python -m venv venv
```

### 3. Activate the virtual environment
**Windows:**
```bash
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

### 4. Install dependencies
```bash
pip install -r requirements.txt
```

### 5. Configure environment variables
Create a `.env` file in the backend directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=profile_setu
SECRET_KEY=your_secret_key_here
JWT_SECRET_KEY=your_jwt_secret_key_here
```

### 6. Set up the database
1. Create a MySQL database:
```sql
CREATE DATABASE profile_setu;
```

2. The tables will be created automatically when you run the application for the first time.

## 🏃 Running the Application

```bash
python run.py
```

The server will start on `http://localhost:5000`

## 📚 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/register` | Register a new user | No |
| POST | `/api/login` | Login and get tokens | No |
| POST | `/api/refresh` | Refresh access token | Yes (Refresh Token) |

### User Profile

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/profile` | Get current user profile | Yes |
| PUT | `/api/profile` | Update user profile | Yes |

### Admin Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/admin/users` | Get all users (summary) | Yes (Admin) |
| GET | `/api/admin/user/<id>` | Get detailed user info | Yes (Admin) |
| DELETE | `/api/admin/user/<id>` | Delete a user | Yes (Admin) |
| GET | `/api/admin/logs` | Get activity logs | Yes (Admin) |

## 🔐 Admin Access

**Default Admin Credentials:**
- Email: `setuadmin@gmail.com`
- Password: `admin123`

## 📦 Dependencies

- **Flask**: Web framework
- **Flask-SQLAlchemy**: ORM for database operations
- **Flask-Bcrypt**: Password hashing
- **Flask-JWT-Extended**: JWT token management
- **PyMySQL**: MySQL database connector

## 🗂️ Project Structure

```
backend/
├── app/
│   ├── __init__.py          # App factory
│   ├── models.py            # Database models
│   ├── extensions.py        # Flask extensions
│   ├── api/
│   │   ├── auth_api.py      # Authentication routes
│   │   └── user_api.py      # User & admin routes
├── .env                     # Environment variables
├── requirements.txt         # Python dependencies
└── run.py                   # Application entry point
```

## 🔑 Key Features Explained

### JWT Authentication
- Access tokens expire after 15 minutes
- Refresh tokens expire after 30 days
- Tokens include user role for RBAC

### Role-Based Access Control
- **User Role**: Access to own profile and basic features
- **Admin Role**: Full access to user management and admin dashboard

### Admin Features
- View all users with summary information
- View detailed user profiles including persona data
- Delete users (with protection for admin accounts)
- View activity logs

## 🐛 Troubleshooting

**Database Connection Error:**
- Verify MySQL is running
- Check `.env` credentials
- Ensure database exists

**Import Errors:**
- Activate virtual environment
- Reinstall dependencies: `pip install -r requirements.txt`

**401 Unauthorized on Refresh:**
- Check if refresh token is being sent correctly
- Verify JWT_SECRET_KEY matches in `.env`

## 📝 License

This project is part of the Profile Setu platform.

## 👥 Support

For issues or questions, please contact the development team.
