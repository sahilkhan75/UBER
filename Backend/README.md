# API Documentation

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

---

## 3. Get User Profile

`GET /users/profile`

Fetches the currently authenticated user's profile.

### Authentication

Requires a valid JWT token in **Authorization** header:

```
Authorization: Bearer <token>
```

### Responses

#### **200 OK**

```json
{
  "_id": "64f1234abc5678",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com"
}
```

#### **401 Unauthorized**

```json
{
  "message": "Authentication required"
}
```

---

## 4. Logout User

`GET /users/logout`

Logs out the authenticated user by blacklisting the current token.

### Authentication

Requires a valid JWT token.

### Responses

#### **200 OK**

```json
{
  "message": "User logged out successfully"
}
```

---

## 5. Register Captain

`POST /captains/register`

Registers a new captain with vehicle details.

---

### Request Body

```json
{
  "fullname": {
    "firstname": "Mike",
    "lastname": "Smith"
  },
  "email": "mike@example.com",
  "password": "securePassword123",
  "vechile": {
    "color": "Red",
    "plate": "AB123CD",
    "capacity": 4,
    "vechileType": "car"
  }
}
```

### Field Requirements:

| Field                 | Type   | Required | Validation Rules                            |
| --------------------- | ------ | -------- | ------------------------------------------- |
| `fullname.firstname`  | string | Yes      | Minimum 3 characters                        |
| `fullname.lastname`   | string | No       | Minimum 3 characters (if provided)          |
| `email`               | string | Yes      | Must be a valid email address               |
| `password`            | string | Yes      | Minimum 6 characters                        |
| `vechile.color`       | string | Yes      | Minimum 3 characters                        |
| `vechile.plate`       | string | Yes      | Minimum 3 characters                        |
| `vechile.capacity`    | number | Yes      | Must be at least 1                          |
| `vechile.vechileType` | string | Yes      | Must be one of: `car`, `motorcycle`, `auto` |

---

### Responses

#### **201 Created**

```json
{
  "_id": "64f9876abc4321",
  "fullname": {
    "firstname": "Mike",
    "lastname": "Smith"
  },
  "email": "mike@example.com",
  "vechile": {
    "color": "Red",
    "plate": "AB123CD",
    "capacity": 4,
    "vechileType": "car"
  }
}
```

#### **400 Bad Request**

```json
{
  "errors": [
    {
      "msg": "color must be at least 3 characters long",
      "param": "vechile.color",
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

## Notes

* All endpoints use **express-validator** for input validation.
* Passwords are stored hashed using bcrypt.
* JWT tokens are signed using `process.env.JWT_SECRET`.
* Logout uses a **blacklist token** approach to invalidate the current session.

