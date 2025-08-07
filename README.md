# TaskFlow 🗂️

TaskFlow es una aplicación web full stack tipo gestor de tareas similar
a Jira. Permite a usuarios autenticados crear, visualizar y gestionar
tareas, con un panel de administración exclusivo para usuarios con rol
`ADMIN`.

## ✨ Características

-   Registro y login con autenticación JWT
-   Roles de usuario (`USER` y `ADMIN`)
-   Crear, listar y eliminar tareas
-   Panel de administración para ver todas las tareas
-   Diseño responsive con TailwindCSS

## 🚀 Tecnologías

### Backend

-   Java 17
-   Spring Boot 3
-   Spring Security + JWT
-   JPA + Hibernate
-   MySQL

### Frontend

-   React
-   Tailwind CSS
-   React Router

## 🔐 Usuario de prueba (Demo)

Puedes acceder con:

    Email: demo@example.com
    Contraseña: demo1234

## 📦 Instalación y ejecución

### Backend

1.  Clona el repositorio
2.  Configura la base de datos en `application.properties`:

``` properties
spring.datasource.url=jdbc:mysql://localhost:3306/taskflow_db
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
```

3.  Ejecuta la aplicación con tu IDE o `mvn spring-boot:run`

### Frontend

1.  Ve al directorio del frontend
2.  Instala las dependencias:

``` bash
npm install
```

3.  Ejecuta la aplicación:

``` bash
npm run dev
```

## 🛠️ Notas de desarrollo

-   La aplicación crea automáticamente el usuario demo si no existe.
-   Puedes eliminar y reiniciar la base de datos manualmente desde tu
    cliente MySQL.
-   JWT se almacena en `localStorage` para mantener la sesión.

## 📄 Licencia

Proyecto con fines educativos - Roberto Frutos Jiménez
