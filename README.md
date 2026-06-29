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
* express-rate-limit
* Zod 

## Arquitectura del proyecto

src/

├── config/

├── controllers/

├── middlewares/

├── models/

├── routes/

├── schemas/

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

### Roles 

Cada usuario posee un rol:
* ADMIN
* USER (por defecto)

# PERMISOS: 

* USER: 
Crear tareas
Ver únicamente sus tareas
Editar únicamente sus tareas
Eliminar únicamente sus tareas

* ADMIN:
Ver todas las tareas del sistema
Eliminar cualquier tarea

### Tareas (Rutas protegidas)

Para acceder a estas rutas es necesario enviar:

```http
Authorization: Bearer TOKEN
```

---

#### Obtener tareas (USER)

GET /api/tareas

Obtiene unicamente las tareas pertenecientes al usuario autenticado.

---

#### Obtener todas las tareas (ADMIN)

GET /api/tareas/all

El administrador obtiene todas las tareas de todos los usuarios registrados

---

#### Crear tarea (USER)

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

#### Actualizar tarea (USER)

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

#### Eliminar tarea (USER)

DELETE /api/tareas/:id

Elimina una tarea perteneciente al usuario autenticado.

---

### Eliminar tarea (ADMIN)

DELETE api/tareas/admin/:id

Elimina una tarea con su ID de cualquier usuario registrado.

---

## Validaciones con ZOD 

Se implemento validacion utilizando Zod para verificar los datos recibidos antes de llegar a los controladores.

Actualmente se validan:

* Registro de usuario
* Inicio de sesion
* Creacion de tareas
* Actualizacion de tareas

Los errores devueltos indican el campo correspondiente y un mensaje personalizado.

## Query Params

Los endpoints GET soportan consultas opcionales

* Filtrado
GET /api/tareas?filter=estado:Pendiente
GET /api/tareas/all?filter=estado:Completada

---

* Ordenamiento

Ascendente

GET /api/tareas?sort=asc

---
Descendente

GET /api/tareas?sort=desc

---

* Paginación

GET /api/tareas?page=1&limit=5

---

También es posible combinar los parámetros:

GET /api/tareas?page=2&limit=5&sort=desc&filter=estado:Pendiente

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

---

# Pruebas de la API
Se incluye una coleccion de Postman con ejemplos de:
* Registro de usuarios
* Inicio de sesion
* Obtener tareas 
* Crear tareas 
* Actualizar tareas 
* Eliminar tareas

## Usuario administrador para pruebas

Para facilitar la correccion del proyecto se incluye un usuario administrador previamente creado.

**Email**

```text
admin@test.com
```

**Contraseña**

```text
admin1234
```

Este usuario posee el rol **admin** y permite probar los siguientes endpoints protegidos:

* `GET /api/tareas/all`
* `DELETE /api/tareas/admin/:id`

Todos los usuarios registrados mediante `/api/auth/register` se crean automáticamente con el rol **user**.


## Autor

Valentina Abarzua
Curso BACKEND DEVELOPER
