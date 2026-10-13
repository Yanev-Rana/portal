# Achieved Tasks

### Authentication and Security

* User registration and login
* Password hashing using `bcryptjs`
* JSON Web Token (JWT) authentication
* Protected frontend routes and backend endpoints
* Role-based access control for regular users and administrators
* Token-based session handling
* Forgot-password and password-reset functionality
* Mailtrap integration for development email testing

### User Dashboard

* Dedicated dashboard for authenticated users
* Profile page
* Role-specific navigation
* Access restrictions for protected pages

### Administrator Dashboard

* Separate administrator interface
* Dashboard statistics, including total users and administrator accounts
* User management table
* View individual user details
* Change user roles through a protected API
* Backend checks to prevent administrators from changing their own role or deleting their own account

### Database and API

* MongoDB database integration using Mongoose
* REST API endpoints built with Express.js
* Authentication and administrator authorization middleware
* Database verification and API testing using MongoDB Compass and Thunder Client

## Tech Stack

Layer               | Technologies                                           
------------------- | ------------------------------------------------------
Frontend            | React, TypeScript, Vite                                
UI                  | Material UI (MUI), Minimal UI Kit / Material Kit React 
Backend             | Node.js, Express.js                                    
Database            | MongoDB Community Server, Mongoose                     
Authentication      | JWT, bcryptjs                                          
Email testing       | Nodemailer, Mailtrap                                   
API testing         | Thunder Client                                         
Database inspection | MongoDB Compass                                        

## Application Architecture

Portal follows a frontend–backend architecture.

1. **Frontend:** React and TypeScript provide the user interface, authentication context, dashboards, and protected navigation.
2. **Backend:** Express.js exposes REST API endpoints and applies authentication and authorization middleware.
3. **Database:** MongoDB stores user information, password hashes, account roles, and password-reset data.
4. **Authentication:** JWTs are issued after successful login and used to authenticate protected API requests.
5. **Authorization:** Middleware verifies user identity and restricts administrator-only operations.

## API Endpoints

The backend exposes the following authentication and user-management endpoints.

Method	Endpoint	                       Purpose	                                    Access
POST	/api/auth/signup	               Register a user	                            Public
POST	/api/auth/login	                   Authenticate a user	                        Public
GET	    /api/auth/profile	               Retrieve the authenticated user's profile	Authenticated
POST	/api/auth/forgot-password	       Request a password-reset link	            Public
POST	/api/auth/reset-password/:token	   Reset a password using a reset token	        Valid reset token
GET	    /api/auth/users	                   Retrieve users for administration	        Admin
PATCH	/api/auth/users/:userId/role	   Change a user's role	                        Admin
DELETE	/api/auth/users/:userId	           Delete a user account	                    Admin; implementation under testing

Protected endpoints require a valid JWT in the request's `Authorization` header:


Authorization: Bearer <JWT_TOKEN>


The role-update endpoint accepts a JSON body such as:


{
  "role": "admin"
}


Valid roles are `user` and `admin`. Administrator-only operations are enforced by backend middleware rather than relying solely on frontend navigation.

## Development Status

Portal is an ongoing full-stack development project.

**Implemented:**

* Registration and login
* Password hashing and JWT authentication
* User/admin role separation
* Protected routes and administrator APIs
* User and administrator dashboards
* User listing, detail viewing, and role management
* Forgot-password and password-reset implementation
* Development email testing configuration

**In progress:**

* Completing and testing the user-deletion workflow
* Further testing and refinement of password recovery
* Additional dashboard and administrative improvements

## Future Improvements

* Complete and thoroughly test user deletion
* Add automated tests for authentication and authorization
* Improve input validation and error handling
* Add reporting and settings functionality
* Improve deployment configuration and production security
* Add screenshots and a live demo when available

## Security Notes

* Passwords are stored as hashes rather than plaintext.
* JWTs are used to authenticate protected requests.
* Administrator operations require server-side authorization.
* Secret keys and SMTP credentials must be stored in environment variables.
* This project is intended for continued development; production deployment requires additional security review, testing, and configuration.

## License

Nil