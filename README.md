# Todo API Backend Server

This is a backend server for managing a To-Do list built using **Bun.js** and **Hono.js** with **TypeScript**. It provides RESTful APIs to add, update, mark as complete, delete, and fetch to-dos.

## Features

- Add a new todo
- Update an existing todo
- Mark a todo as complete
- Delete a todo
- Fetch all todos

## Tech Stack

- **Bun.js**: Fast, modern JavaScript runtime for back-end applications.
- **Hono.js**: Ultrafast web framework with a focus on small footprint and minimal overhead.
- **TypeScript**: Strongly typed JavaScript for better code maintainability and type checking.

## Requirements

- **Bun.js** (Ensure Bun.js is installed on your system)

```bash
 curl https://bun.sh/install | bash
```

## API Endpoints

### Account Endpoints

- **POST** - /account/login  
  **Body**: {username, email, password}

- **POST** - /account/signin  
  **Body**: {email, password}

- **POST** - /account/authenticate  
  **Body**: {token}

### Todo Group Endpoints

- **GET** - /todos/groups  
  **Query Params**: {token}

- **GET** - /todos/groups/grp:id  
  **Query Params**: {token}

- **GET** - /todos/groups/todos  
  **Query Params**: {token}

- **DELETE** - /todos/group  
  **Body**: {grp:id, token}

- **PATCH** - /todos/group/rename  
  **Body**: {grp:id, name, token}

### Todo Endpoints

- **POST** - /todos/add  
  **Body**: {grp_id, todo, token}

- **POST** - /todos/update  
  **Body**: {todo:id, todo, token}

- **POST** - /todos/completed  
  **Body**: {todo:id, token}

- **DELETE** - /todos/todo  
  **Body**: {todo:id, token}
