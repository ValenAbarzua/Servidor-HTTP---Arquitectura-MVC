# Servidor con Express + MongoDB + Autenticación (JWT) + Arquitectura MVC

## Descripcion del proyecto 

Este proyecto consiste en una API REST desarrollada con Node.js, Express y MongoDB con una arquitectura MVC (Modelo - Vista - Controlador).

La aplicacion permite tanto el registo como el login de usuarios mediante autenticacion JWT. Cada usuario puede gestionar sus propias tareas de forma segura, ya que las rutas estan protegidas mediante middleware de autenticacion y cada tarea queda asociada al usuario autenticado. Es decir, que cada usuario puede ver, crear, actualizar y eliminar sus propias tareas, no la de otros usuarios.

## Tecnologias utilizadas

* Node.js
* Express
* MongoDB
* Mongoose
* JWT 
* bcrypt
* dotenv
* cors

## Arquitectura del proyecto

src/

├── config/

├── controllers/

├── middlewares/

├── models/

├── routes/

└── .env.example

└── gitignore

└── package-lock.json

└── package.json

└── README.md

└── server.js

## Instalacion

1. Clonar el repositorio

```bash
git clone <https://github.com/ValenAbarzua/Servidor-HTTP---Arquitectura-MVC.git>
```

2. Instalar dependencias

```bash
npm install
```

3. Crear archivo `.env`

Ejemplo:

```env
PORT=3000
MONGO_URI=tu_uri_de_mongodb
JWT_SECRET=tu_clave_secreta
```

4. Ejecutar el servidor

```bash
npm run dev
```

---

## Endpoints

### Autenticación

#### Registro

POST /api/auth/register

Body:

```json
{
  "nombre": "Valentina",
  "apellido": "Abarzua",
  "email": "valentina@gmail.com",
  "password": "123456"
}
```

---

#### Login

POST /api/auth/login

Body:

```json
{
  "email": "valentina@gmail.com",
  "password": "123456"
}
```

Respuesta:

```json
{
  "token": "JWT_TOKEN"
}
```

---

### Tareas (Rutas protegidas)

Para acceder a estas rutas es necesario enviar:

```http
Authorization: Bearer TOKEN
```

---

#### Obtener tareas

GET /api/tareas

Obtiene unicamente las tareas pertenecientes al usuario autenticado.

---

#### Crear tarea

POST /api/tareas

Body:

```json
{
  "titulo": "Ir al gimnasio",
  "descripcion": "Entrenar miercoles y viernes",
  "estado": "Pendiente"
}
```

---

#### Actualizar tarea

PATCH /api/tareas/:id

Body:

```json
{
  "titulo": "Ir al gimnasio",
  "descripcion": "Entrenar miercoles y viernes",
  "estado": "Completada"
}
```

---

#### Eliminar tarea

DELETE /api/tareas/:id

Elimina una tarea perteneciente al usuario autenticado.

---

## Seguridad

* Limitacion de intentos de login mediante RateLimit. 
* Las contraseñas se almacenan utilizando bcrypt.
* La autenticacion se realiza mediante JWT.
* Las rutas de tareas estan protegidas mediante middleware.
* Cada usuario puede acceder unicamente a sus propias tareas.

---

# Decisiones de diseño
* Se desarrollo un CRUD de usuarios para poder implementar las operaciones de MongoDB y Mongoose.
* Cada tarea se encuentra asociada al usuario autenticado mediante su identificador (ObjectId).
* Las operaciones de consulta, actualizacion y eliminacion de tareas verifican la pertenencia de la tarea al usuario autenticado.

## Autor

Valentina Abarzua
Curso BACKEND DEVELOPER
