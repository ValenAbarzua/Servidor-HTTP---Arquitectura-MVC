# Frontend - Agenda de Tareas

## Descripcion

Este frontend fue desarrollado con React para consumir la API REST realizada en el proyecto. Su objetivo es demostrar el funcionamiento completo de las funcionalidades implementadas en el backend mediante una interfaz sencilla e intuitiva.

## Tecnologias utilizadas

* React
* React Router DOM
* Fetch API
* React Icons
* CSS

## Funcionalidades

# Autenticacion

* Registro de usuarios.
* Inicio de sesión con JWT.
* Persistencia de sesión mediante LocalStorage.
* Cierre de sesión.

# Gestion de tareas

* Crear tareas.
* Editar tareas.
* Eliminar tareas.
* Visualizar tareas propias.

# Validaciones

El frontend muestra los mensajes enviados por el backend utilizando las validaciones realizadas con Zod, indicando claramente el campo que contiene un error.

# Consultas avanzadas

La interfaz permite utilizar las funcionalidades implementadas en la API:

* Filtrado por estado.
* Orden ascendente y descendente.
* Paginación.
* Navegación entre páginas.

# Panel de administrador

Los usuarios con rol admin disponen de un panel exclusivo donde pueden:

* Visualizar todas las tareas del sistema.
* Identificar el usuario propietario de cada tarea.
* Filtrar tareas.
* Ordenarlas.
* Navegar entre páginas.
* Eliminar tareas de cualquier usuario.

## Objetivo

El frontend fue desarrollado como complemento de la API con el propósito de demostrar visualmente todas las funcionalidades implementadas en el backend, incluyendo autenticación, autorización mediante roles, validaciones con Zod y consultas avanzadas sobre la base de datos.