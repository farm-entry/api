# TypeScript API with MongoDB

This project is a TypeScript-based API that connects to a MongoDB database. It uses Express for handling HTTP requests and Mongoose for interacting with the MongoDB database.

## Project Structure

```
typescript-api-with-mongodb
├── src
│   ├── app.ts               # Entry point of the application
│   ├── controllers          # Contains controllers for handling requests
│   │   └── index.ts
│   ├── models               # Contains Mongoose models
│   │   └── index.ts
│   ├── routes               # Contains route definitions
│   │   └── index.ts
│   └── config               # Contains configuration files
│       └── database.ts
├── package.json             # NPM package configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd typescript-api-with-mongodb
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure MongoDB:**
   Update the `src/config/database.ts` file with your MongoDB connection string.

4. **Run the application:**
   ```
   npm start
   ```

## API Endpoints

- **GET /items**: Retrieve a list of items from the database.
- **POST /items**: Create a new item in the database.

## Usage Examples

### Retrieve Items

```bash
curl -X GET http://localhost:3000/items
```

### Create Item

```bash
curl -X POST http://localhost:3000/items -H "Content-Type: application/json" -d '{"name": "New Item"}'
```

## License

This project is licensed under the MIT License.