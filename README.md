# Moni

**Moni** es una aplicación web full-stack para la gestión de finanzas personales. Permite registrar ingresos y gastos, organizar movimientos por categorías, crear presupuestos mensuales, definir metas de ahorro, visualizar reportes y controlar mejor el dinero desde una interfaz sencilla y responsive.

El sistema cuenta con autenticación segura, verificación de correo electrónico, recuperación de contraseña, frontend desplegado en Vercel, backend desplegado en Render, base de datos en Azure SQL Database y envío de correos mediante Gmail usando Google Apps Script.

---

## Tabla de contenido

- [Descripción general](#descripción-general)
- [Características principales](#características-principales)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Arquitectura del sistema](#arquitectura-del-sistema)
- [Módulos del sistema](#módulos-del-sistema)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Base de datos](#base-de-datos)
- [Seguridad implementada](#seguridad-implementada)
- [Envío de correos](#envío-de-correos)
- [Despliegue](#despliegue)
- [Variables de entorno](#variables-de-entorno)
- [Instalación local](#instalación-local)
- [Comandos útiles](#comandos-útiles)
- [Estado del proyecto](#estado-del-proyecto)
- [Próximas mejoras](#próximas-mejoras)
- [Capturas del sistema](#capturas-del-sistema)
- [Autor](#autor)
- [Uso y derechos](#uso-y-derechos)

---

## Descripción general

Moni nace como una solución para organizar gastos personales de manera clara y práctica. El sistema permite a cada usuario administrar su propia información financiera de forma independiente.

Cada usuario puede:

- Crear una cuenta.
- Verificar su correo electrónico.
- Iniciar sesión de forma segura.
- Registrar ingresos y gastos.
- Clasificar movimientos por categorías.
- Crear presupuestos mensuales.
- Registrar metas de ahorro.
- Consultar reportes financieros.
- Exportar información en CSV.
- Actualizar su perfil y contraseña.

El objetivo principal del proyecto es demostrar el desarrollo de una aplicación web completa, integrando frontend, backend, base de datos, autenticación, seguridad, despliegue y envío de correos transaccionales.

---

## Características principales

- Registro de usuarios.
- Verificación de correo electrónico mediante Gmail usando Google Apps Script.
- Inicio de sesión con JWT.
- Recuperación de contraseña mediante enlace enviado por correo.
- Gestión de perfil de usuario.
- Cambio de contraseña.
- CRUD de categorías financieras.
- CRUD de movimientos de ingresos y gastos.
- Dashboard con resumen financiero.
- Presupuestos mensuales por categoría.
- Metas de ahorro.
- Reportes mensuales.
- Exportación de reportes en CSV.
- Sidebar con navegación activa.
- Diseño responsive.
- Logo y favicon personalizado.
- Modal reutilizable de confirmación.
- Protección de rutas privadas.
- Separación entre entorno local y producción.
- Despliegue completo en la nube.

---

## Tecnologías utilizadas

### Frontend

- React
- TypeScript
- Vite
- React Router DOM
- Axios
- Recharts
- CSS

### Backend

- Node.js
- Express
- SQL Server
- JWT
- BcryptJS
- Dotenv
- CORS
- Google Apps Script para envío de correos transaccionales

### Base de datos

- SQL Server
- Azure SQL Database
- SQL Server Management Studio

### Despliegue

- Vercel para el frontend
- Render para el backend
- Azure SQL Database para la base de datos
- Google Apps Script para el envío de correos con Gmail

---

## Arquitectura del sistema

```text
Usuario
   │
   ▼
Frontend React en Vercel
   │
   ▼
Backend Node.js / Express en Render
   │
   ├── Azure SQL Database
   │
   └── Google Apps Script
           │
           ▼
        Gmail
```

El frontend consume la API del backend mediante Axios.  
El backend procesa las solicitudes, valida autenticación, se comunica con Azure SQL Database y utiliza Google Apps Script para enviar correos de verificación y recuperación de contraseña.

---

## Módulos del sistema

### Autenticación

- Registro de usuario.
- Verificación de correo.
- Inicio de sesión.
- Recuperación de contraseña.
- Restablecimiento de contraseña.
- Validación de usuario autenticado.

### Perfil

- Visualización de datos personales.
- Actualización de nombre.
- Cambio de contraseña.

### Categorías

- Registro de categorías.
- Edición de categorías.
- Eliminación lógica.
- Clasificación por tipo: ingreso o gasto.
- Asignación de color.

### Movimientos

- Registro de ingresos.
- Registro de gastos.
- Asociación con categorías.
- Fecha, monto, descripción y método de pago.
- Edición y eliminación lógica.

### Dashboard

- Resumen mensual.
- Total de ingresos.
- Total de gastos.
- Balance.
- Porcentaje de ahorro.
- Visualización gráfica.

### Presupuestos

- Registro de presupuesto mensual por categoría.
- Comparación entre presupuesto y gasto real.
- Control por mes y año.

### Metas de ahorro

- Creación de metas.
- Monto objetivo.
- Monto actual.
- Fecha objetivo.
- Estado de la meta.

### Reportes

- Reportes financieros mensuales.
- Resumen por categorías.
- Exportación CSV.

---

## Estructura del proyecto

```text
Moni/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   │   └── mail.service.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── package.json
│   ├── vercel.json
│   └── .env.example
│
├── database/
│   └── schema.sql
│
└── README.md
```

---

## Base de datos

La base de datos fue desarrollada inicialmente en SQL Server local y posteriormente desplegada en Azure SQL Database.

Base local:

```text
FinTrackPersonalDB
```

Base en producción:

```text
MoniDB
```

### Esquemas principales

```text
auth
finance
```

### Tablas principales

```text
auth.Usuario
auth.TokenRecuperacionPassword
auth.TokenVerificacionEmail

finance.Categoria
finance.Movimiento
finance.PresupuestoMensual
finance.MetaAhorro
```

### Descripción de tablas

#### auth.Usuario

Almacena los usuarios registrados en el sistema.

Campos principales:

- usuario_id
- nombre
- correo
- password_hash
- fecha_registro
- activo
- email_verificado

#### auth.TokenVerificacionEmail

Almacena tokens temporales para verificar cuentas nuevas.

#### auth.TokenRecuperacionPassword

Almacena tokens temporales para recuperación de contraseña.

#### finance.Categoria

Almacena categorías de ingresos y gastos por usuario.

#### finance.Movimiento

Almacena ingresos y gastos registrados por el usuario.

#### finance.PresupuestoMensual

Almacena presupuestos mensuales por categoría.

#### finance.MetaAhorro

Almacena metas de ahorro definidas por el usuario.

---

## Seguridad implementada

- Contraseñas almacenadas con hash usando BcryptJS.
- Autenticación mediante JWT.
- Rutas privadas protegidas con middleware.
- Separación de datos por usuario autenticado.
- Validación de propiedad de datos por usuario.
- Verificación de correo mediante token temporal.
- Recuperación de contraseña mediante token temporal.
- Tokens almacenados como hash.
- Expiración de enlaces de verificación y recuperación.
- Invalidación de tokens antiguos.
- Validación de correo antes de permitir el inicio de sesión.
- Envío de correos mediante endpoint protegido con secreto privado.
- Separación entre variables de entorno locales y de producción.
- Variables sensibles protegidas mediante `.env`.

---

## Envío de correos

Moni utiliza correos transaccionales para:

- Verificar cuentas nuevas.
- Enviar enlaces de recuperación de contraseña.

Para mantener una solución gratuita y funcional en producción, el sistema utiliza **Google Apps Script** como puente para enviar correos mediante Gmail.

El backend no se conecta directamente a Gmail por SMTP. En su lugar, realiza una petición HTTP a un Web App de Google Apps Script. Luego, Google Apps Script envía el correo usando Gmail.

Flujo del envío de correos:

```text
Backend en Render
   │
   ▼
Petición HTTP a Google Apps Script
   │
   ▼
GmailApp.sendEmail()
   │
   ▼
Correo enviado al usuario
```

Variables necesarias:

```env
MAIL_MODE=google_apps_script
GOOGLE_APPS_SCRIPT_EMAIL_URL=https://script.google.com/macros/s/TU_URL_DE_APPS_SCRIPT/exec
GOOGLE_APPS_SCRIPT_EMAIL_SECRET=tu_secret_para_apps_script
MAIL_FROM_NAME=Moni
```

Esta integración permite enviar correos sin depender de SMTP y sin utilizar servicios de pago.

---

## Despliegue

El sistema se encuentra desplegado usando una arquitectura separada para frontend, backend y base de datos.

```text
Frontend: Vercel
Backend: Render
Base de datos: Azure SQL Database
Correos: Gmail mediante Google Apps Script
```

### URLs principales

Frontend:

```text
https://monifront.vercel.app
```

Backend:

```text
https://moni-backend-2r9q.onrender.com
```

Health check:

```text
https://moni-backend-2r9q.onrender.com/api/health
```

### Configuración de producción

El frontend utiliza la siguiente variable para consumir el backend:

```env
VITE_API_URL=https://moni-backend-2r9q.onrender.com/api
```

El backend utiliza Azure SQL Database como base de datos en producción y Google Apps Script como servicio de envío de correos.

---

## Variables de entorno

### Backend `.env.example`

```env
PORT=3000

DB_USER=tu_usuario_sql
DB_PASSWORD=tu_password_sql
DB_SERVER=localhost
DB_DATABASE=FinTrackPersonalDB
DB_PORT=1433
DB_ENCRYPT=false
DB_TRUST_SERVER_CERTIFICATE=true

JWT_SECRET=tu_jwt_secret_seguro
JWT_EXPIRES_IN=8h

FRONTEND_URL=http://localhost:5173
CORS_ORIGINS=http://localhost:5173

PASSWORD_RESET_EXPIRES_MINUTES=30
EMAIL_VERIFICATION_EXPIRES_MINUTES=60

MAIL_MODE=google_apps_script
GOOGLE_APPS_SCRIPT_EMAIL_URL=https://script.google.com/macros/s/TU_URL_DE_APPS_SCRIPT/exec
GOOGLE_APPS_SCRIPT_EMAIL_SECRET=tu_secret_para_apps_script
MAIL_FROM_NAME=Moni
```

### Frontend `.env.example`

```env
VITE_API_URL=http://localhost:3000/api
```

### Variables de producción en Render

```env
DB_USER=moniadmin
DB_PASSWORD=tu_password_azure
DB_SERVER=moni-sql-server-flavio.database.windows.net
DB_DATABASE=MoniDB
DB_PORT=1433
DB_ENCRYPT=true
DB_TRUST_SERVER_CERTIFICATE=false

JWT_SECRET=tu_jwt_secret_seguro
JWT_EXPIRES_IN=8h

FRONTEND_URL=https://monifront.vercel.app
CORS_ORIGINS=https://monifront.vercel.app,http://localhost:5173

PASSWORD_RESET_EXPIRES_MINUTES=30
EMAIL_VERIFICATION_EXPIRES_MINUTES=60

MAIL_MODE=google_apps_script
GOOGLE_APPS_SCRIPT_EMAIL_URL=https://script.google.com/macros/s/TU_URL_DE_APPS_SCRIPT/exec
GOOGLE_APPS_SCRIPT_EMAIL_SECRET=tu_secret_para_apps_script
MAIL_FROM_NAME=Moni
```

### Variables de producción en Vercel

```env
VITE_API_URL=https://moni-backend-2r9q.onrender.com/api
```

---

## Instalación local

### 1. Clonar el repositorio

```bash
git clone https://github.com/enleam/Moni.git
cd Moni
```

### 2. Configurar la base de datos

Crear la base de datos local en SQL Server:

```sql
CREATE DATABASE FinTrackPersonalDB;
```

Luego ejecutar el script ubicado en:

```text
database/schema.sql
```

### 3. Configurar variables de entorno del backend

Crear un archivo `.env` dentro de `backend/` tomando como referencia `.env.example`.

Ejemplo local:

```env
PORT=3000

DB_USER=sa
DB_PASSWORD=tu_password_local
DB_SERVER=localhost
DB_DATABASE=FinTrackPersonalDB
DB_PORT=1433
DB_ENCRYPT=false
DB_TRUST_SERVER_CERTIFICATE=true

JWT_SECRET=tu_jwt_secret_seguro
JWT_EXPIRES_IN=8h

FRONTEND_URL=http://localhost:5173
CORS_ORIGINS=http://localhost:5173

PASSWORD_RESET_EXPIRES_MINUTES=30
EMAIL_VERIFICATION_EXPIRES_MINUTES=60

MAIL_MODE=google_apps_script
GOOGLE_APPS_SCRIPT_EMAIL_URL=https://script.google.com/macros/s/TU_URL_DE_APPS_SCRIPT/exec
GOOGLE_APPS_SCRIPT_EMAIL_SECRET=tu_secret_para_apps_script
MAIL_FROM_NAME=Moni
```

### 4. Configurar variables de entorno del frontend

Crear un archivo `.env` dentro de `frontend/`:

```env
VITE_API_URL=http://localhost:3000/api
```

### 5. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 6. Ejecutar backend

```bash
npm run dev
```

El backend se ejecutará en:

```text
http://localhost:3000
```

### 7. Instalar dependencias del frontend

En otra terminal:

```bash
cd frontend
npm install
```

### 8. Ejecutar frontend

```bash
npm run dev
```

El frontend se ejecutará en:

```text
http://localhost:5173
```

---

## Comandos útiles

### Backend

```bash
cd backend
npm install
npm run dev
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
npm run build
npm run preview
```

---

## Endpoints principales

### Auth

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
GET  /api/auth/verify-email/:token
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### Perfil

```text
GET /api/perfil
PUT /api/perfil
PUT /api/perfil/password
```

### Categorías

```text
GET    /api/categorias
POST   /api/categorias
PUT    /api/categorias/:id
DELETE /api/categorias/:id
```

### Movimientos

```text
GET    /api/movimientos
POST   /api/movimientos
PUT    /api/movimientos/:id
DELETE /api/movimientos/:id
```

### Dashboard

```text
GET /api/dashboard/resumen
```

### Presupuestos

```text
GET    /api/presupuestos
POST   /api/presupuestos
PUT    /api/presupuestos/:id
DELETE /api/presupuestos/:id
```

### Metas

```text
GET    /api/metas
POST   /api/metas
PUT    /api/metas/:id
DELETE /api/metas/:id
```

### Reportes

```text
GET /api/reportes
GET /api/reportes/csv
```

### Health check

```text
GET /api/health
```

---

## Estado del proyecto

Versión 1.0 completada y desplegada.

Funcionalidades implementadas:

- Homepage pública.
- Registro con verificación de correo.
- Login con JWT.
- Recuperación de contraseña por correo.
- CRUD de categorías.
- CRUD de movimientos financieros.
- Resumen financiero.
- Presupuestos mensuales.
- Metas de ahorro.
- Reportes mensuales.
- Exportación CSV.
- Perfil de usuario.
- Cambio de contraseña.
- Modal reutilizable de confirmación.
- Sidebar con navegación activa.
- Diseño responsive.
- Logo y favicon personalizado.
- Despliegue del frontend en Vercel.
- Despliegue del backend en Render.
- Base de datos desplegada en Azure SQL Database.
- Envío de correos mediante Gmail y Google Apps Script.

---

## Próximas mejoras

- Reportes en PDF.
- Modo oscuro.
- Filtros avanzados por rango de fechas.
- Cuentas bancarias o billeteras.
- Movimientos recurrentes.
- Notificaciones internas.
- Gráficos comparativos por periodos.
- Mejoras de accesibilidad.
- Pruebas automatizadas.
- Dockerización del proyecto.
- Panel administrativo para métricas generales.

---

## Consideraciones técnicas

- El frontend y el backend están separados en carpetas independientes.
- El backend utiliza variables de entorno para proteger credenciales.
- La base de datos local y la base de datos en producción usan configuraciones distintas.
- Azure SQL requiere `encrypt=true` en producción.
- Vercel requiere que las variables del frontend empiecen con `VITE_`.
- El envío de correos se realiza mediante Google Apps Script para evitar dependencia de SMTP.
- Los tokens de verificación y recuperación se almacenan como hash.
- El sistema valida que cada usuario solo acceda a su propia información.

---

## Capturas del sistema

### Homepage

![Homepage](https://raw.githubusercontent.com/enleam/Moni/main/docs/screenshots/home.PNG)

### Login

![Login](https://raw.githubusercontent.com/enleam/Moni/main/docs/screenshots/login.PNG)

### Registro de usuario

![Registro](https://raw.githubusercontent.com/enleam/Moni/main/docs/screenshots/registro.PNG)

### Verificación de correo

![Verificación de correo](https://raw.githubusercontent.com/enleam/Moni/main/docs/screenshots/verificacion-email.PNG)

### Recuperación de contraseña

![Recuperación de contraseña](https://raw.githubusercontent.com/enleam/Moni/main/docs/screenshots/recuperacion-password.PNG)

### Resumen financiero

![Resumen](https://raw.githubusercontent.com/enleam/Moni/main/docs/screenshots/dashboard.PNG)

### Gestión de categorías

![Categorías](https://raw.githubusercontent.com/enleam/Moni/main/docs/screenshots/categorias.PNG)

### Gestión de movimientos

![Movimientos](https://raw.githubusercontent.com/enleam/Moni/main/docs/screenshots/movimientos.PNG)

### Presupuestos mensuales

![Presupuestos](https://raw.githubusercontent.com/enleam/Moni/main/docs/screenshots/presupuestos.PNG)

### Metas de ahorro

![Metas](https://raw.githubusercontent.com/enleam/Moni/main/docs/screenshots/metas.PNG)

### Reportes mensuales

![Reportes](https://raw.githubusercontent.com/enleam/Moni/main/docs/screenshots/reportes.PNG)

### Perfil de usuario

![Perfil](https://raw.githubusercontent.com/enleam/Moni/main/docs/screenshots/perfil.PNG)

---

## Autor

**Flavio Enrique Huapaya Bohorquez**

Estudiante de Ingeniería de Sistemas  
Universidad Nacional Mayor de San Marcos

---

## Uso y derechos

Este proyecto fue desarrollado con fines educativos y de portafolio.

No se autoriza el uso comercial, redistribución o publicación de copias derivadas sin autorización del autor.

© 2026 Moni. Todos los derechos reservados.