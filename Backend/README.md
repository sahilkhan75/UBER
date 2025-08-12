Got it — I’ll extend your **backend/README.md** to include the `/users/login` endpoint right after `/users/register`, keeping the same style and clarity.

Here’s the updated documentation:

---

**backend/README.md**

````markdown
# User API Documentation

## 1. Register User
`POST /users/register`

Registers a new user in the system.

---

### Request Body
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

### Responses

#### **201 Created**

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

#### **400 Bad Request**

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

#### **500 Internal Server Error**

```json
{
  "message": "Internal Server Error",
  "error": "Detailed error message"
}
```

---

## 2. Login User

`POST /users/login`

Authenticates an existing user and returns a JWT token.

---

### Request Body

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Field Requirements:

| Field      | Type   | Required | Validation Rules              |
| ---------- | ------ | -------- | ----------------------------- |
| `email`    | string | Yes      | Must be a valid email address |
| `password` | string | Yes      | Minimum 6 characters          |

---

### Responses

#### **200 OK**

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

#### **400 Bad Request**

```json
{
  "errors": [
    {
      "msg": "invalid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### **401 Unauthorized**

```json
{
  "message": "invalid email or password"
}
```

#### **500 Internal Server Error**

```json
{
  "message": "Internal Server Error",
  "error": "Detailed error message"
}
```

---

## Notes

* Both endpoints use **express-validator** for request validation.
* Passwords are stored hashed using bcrypt.
* JWT tokens are signed using `process.env.JWT_SECRET`.