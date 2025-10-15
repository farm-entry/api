# Farm Entry API

A TypeScript-based Node.js API that serves as a middleware between client applications and Microsoft Dynamics NAV OData services. It includes MongoDB integration for local data storage and user management.

## Project Structure

```
src/
├── app.ts                   # Express application setup
├── server.ts               # Server startup and configuration
├── controllers/            # Request handlers and business logic
│   └── UserController.ts
├── routes/                 # Route definitions
│   ├── index.ts           # Main router
│   └── UserRoutes.ts      # User-specific routes
├── models/                # MongoDB/Mongoose models
│   ├── UserSettings.ts
│   └── FarmConfig.ts
├── services/              # External service integrations
│   └── navODataService.ts
├── config/                # Configuration files
│   ├── mongo.ts          # MongoDB connection
│   └── logger.ts         # Logging configuration
└── types/                 # TypeScript type definitions
    └── types.d.ts
```

## Environment Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment variables:**
   Create a `.env` file with the following variables:
   ```properties
   MONGO_URL=mongodb://127.0.0.1:27017/farmapp-local
   NAV_BASE_URL=https://nav.moglerfarms.com:7148/AppTest/ODataV4
   NAV_USER=your_nav_username
   NAV_ACCESS_KEY=your_nav_access_key
   NODE_ENV=development
   SESSION_SECRET=your_session_secret
   ```

4. **Start MongoDB:**
   ```bash
   # Using Windows Service
   net start MongoDB
   
   # Or using Docker
   docker run -d -p 27017:27017 --name mongodb mongo
   ```

5. **Run the application:**
   ```bash
   npm run start    # Production
   npm run dev      # Development with hot reload
   ```

## API Endpoints

### Health Check
- **GET** `/ping` - Health check endpoint
  - **Response:** `"pong"`

### User Management
Base URL: `/api/user`

- **GET** `/api/user/` - Get all users from NAV OData service
  - **Response:** Array of user objects from NAV
  - **Auth:** Requires NAV credentials

- **GET** `/api/user/:name` - Get specific user by username
  - **Parameters:** 
    - `name` (string) - Username to search for
  - **Response:** User object from MongoDB
  - **Example:** `GET /api/user/john.doe`

- **POST** `/api/user/` - Create new user
  - **Body:**
    ```json
    {
      "username": "john.doe"
    }
    ```
  - **Response:** Success message with created user

## Usage Examples

### Health Check
```bash
curl http://localhost:3000/ping
```

### Get NAV Users
```bash
curl http://localhost:3000/api/user/
```

### Get Specific User
```bash
curl http://localhost:3000/api/user/john.doe
```

## License

This project is licensed under the MIT License.
