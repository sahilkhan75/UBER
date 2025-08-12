**backend/README.md**

````markdown
# User Registration API

## Endpoint
`POST /users/register`

Registers a new user in the system.

---

## Request Body
The request body must be sent in **JSON** format:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "securePassword123"
}
````

### Field Requirements:

| Field                | Type   | Required | Validation Rules                   |
| -------------------- | ------ | -------- | ---------------------------------- |
| `fullname.firstname` | string | Yes      | Minimum 3 characters               |
| `fullname.lastname`  | string | No       | Minimum 3 characters (if provided) |
| `email`              | string | Yes      | Must be a valid email address      |
| `password`           | string | Yes      | Minimum 6 characters               |

---

## Responses

### **201 Created**

**Description:** User registered successfully.
**Example Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI...",
  "user": {
    "_id": "64f1234abc5678",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  }
}
```

---

### **400 Bad Request**

**Description:** Validation failed or missing required fields.
**Example Response:**

```json
{
  "errors": [
    {
      "msg": "first name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

---

### **500 Internal Server Error**

**Description:** Something went wrong on the server.
**Example Response:**

```json
{
  "message": "Internal Server Error",
  "error": "Detailed error message"
}
```

---

## Notes

* The endpoint uses **express-validator** for input validation.
* Passwords are hashed before being saved in the database.
* A JWT authentication token is returned upon successful registration.

```
