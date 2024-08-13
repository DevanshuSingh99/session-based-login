## Project Setup and Execution

### Prerequisites
* Node.js and npm (or yarn) installed.
* MongoDB and Redis servers running and accessible.

### Project Initialization
1. Create a new project directory:
   ```bash
   cd server
   npm i
   touch .env
2. Populate ENV file from .env.example
3. To run the server
    ```bash
    node app.js

## API Documentation

### Base Routes

- `/user`: All user-related API endpoints.
- `/admin`: All admin-related API endpoints.

### User Routes

#### POST /user/create-user

- **Description:** Creates a new user.
- **Request Body:**
  - `mobile`: User's mobile number (length 10).
  - `user_name`: User's username (minimum length 3).
- **Validation:** Uses `userValidator.createUser` for input validation.
- **Response:** Returns a JSON object with user information and a JWT token upon successful creation.
- **Handler:** `userController.createUser`

#### POST /user/login

- **Description:** Logs in a user and returns a JWT token.
- **Request Body:**
  - `mobile` or `user_name`: Either mobile number or username (optional).
  - `password`: User's password (required, not included in documentation for security reasons).
- **Validation:** Uses `userValidator.login` for input validation.
- **Response:** Returns a JSON object with a JWT token upon successful login.
- **Handler:** `userController.login`

#### GET /user/get-user

- **Description:** Retrieves user information (requires authentication).
- **Authorization:** Requires a valid JWT token in the authorization header.
- **Response:** Returns a JSON object containing user information.
- **Handler:** `userController.getUser`

### Admin Routes

#### POST /admin/login

- **Description:** Logs in an admin and returns a JWT token.
- **Request Body:**
  - `username`: Admin's username (required, not included in documentation for security reasons).
  - `password`: Admin's password (required, not included in documentation for security reasons).
- **Validation:** Uses `adminValidator.login` for input validation.
- **Response:** Returns a JSON object with a JWT token upon successful login.
- **Handler:** `adminController.login`

#### GET /admin/get-user-details

- **Description:** Retrieves user session information by ID (requires authentication).
- **Authorization:** Requires a valid JWT token in the authorization header.
- **Request Query:** `userId` (required).
- **Validation:** Uses `adminValidator.getUserDetails` for input validation.
- **Response:** Returns a JSON object containing user information.
- **Handler:** `adminController.getUserDetails`

#### GET /admin/get-users-login-report

- **Description:** Retrieves a report on user login reports data (requires authentication).
- **Authorization:** Requires a valid JWT token in the authorization header.
- **Validation:** Uses `adminValidator.getUserDetails` for input validation (might not be necessary for this endpoint).
- **Response:** Returns a JSON object containing user login report data.
- **Handler:** `adminController.getUsersLoginReport`

#### PUT /admin/invalidate-user-session

- **Description:** Invalidates a user's session (requires authentication).
- **Authorization:** Requires a valid JWT token in the authorization header.
- **Request Query:** `userId` (required).
- **Validation:** Uses `adminValidator.getUserDetails` for input validation.
- **Response:** Returns a success message upon successful session invalidation.
- **Handler:** `adminController.invalidateUserSession`

## Additional TODOs:
* Add unit test cases using mocha/jest.
* Create swagger/postman api collection.
* OTP based login.
* Adhere better coding standards : Use consistent formatting, naming conventions, and code style.
