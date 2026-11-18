# Experiment 8: RESTful Book Management API

## Aim
To build a simple RESTful API using Node.js and Express.js for managing a book collection through CRUD operations.

## Technologies Used
- Node.js
- Express.js
- JavaScript
- cURL

## Project Structure

```text
Experiment8/
├── node_modules/
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/sreyanyaasingh02/web-designing-lab.git
```

2. Navigate to the Experiment 8 folder.

3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm start
```

The server runs at:

`http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /books | Retrieve all books |
| GET | /books/:id | Retrieve a book by ID |
| POST | /books | Add a new book |
| PUT | /books/:id | Update a book |
| DELETE | /books/:id | Delete a book |

## Sample Book Data

```json
{
  "id": 1,
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "year": 1988
}
```

## CRUD Operations

- **Create:** Add a new book using POST.
- **Read:** Retrieve books using GET.
- **Update:** Modify an existing book using PUT.
- **Delete:** Remove a book using DELETE.

## Result

Successfully developed and tested a RESTful Book Management API using Node.js and Express.js. All CRUD operations were performed successfully.

## Author
Sreyanya Pandey

## Repository
https://github.com/sreyanyaasingh02/web-designing-lab