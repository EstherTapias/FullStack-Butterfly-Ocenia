# 🦋 Backend MySQL - Mariposas de Oceanía

Bienvenida/o al **backend con MySQL** del proyecto **Mariposas de Oceanía** . Este repositorio contiene la API REST desarrollada para gestionar la información de las hermosas mariposas que habitan en la región de Oceanía.

## 📖 Descripción del Proyecto

Este backend forma parte de un proyecto colaborativo donde he desarrollado la **API con MySQL** para complementar el frontend de **Mariposas de Oceanía** creado por mis compañeras de bootcamp. 

La aplicación permite:
* 🔍 **Consultar información** detallada de mariposas oceánicas
* 📊 **Gestionar datos** a través de una base de datos MySQL
* 🌐 **API REST** completa con operaciones CRUD
* 🔒 **Validaciones** robustas de datos

## 🗂️ Estructura del Proyecto

```
Backend/
 ┣ controllers/           # Lógica de controladores
 ┣ database/             # Configuración y conexión MySQL
 ┣ models/               # Modelos de datos
 ┣ node_modules/         # Dependencias del proyecto
 ┣ routes/               # Definición de rutas API
 ┣ test/                 # Tests unitarios
 ┣ validations/          # Validaciones de entrada
 ┣ .env                  # Variables de entorno (crear)
 ┣ .gitignore           # Archivos ignorados por Git
 ┣ app.js               # Configuración principal
 ┣ package-lock.json    # Lock de dependencias
 ┗ package.json         # Dependencias y scripts

Frontend/
 ┣ dist/                # Archivos compilados
 ┣ node_modules/        # Dependencias frontend
 ┣ public/              # Archivos públicos estáticos
 ┣ src/                 # Código fuente React
 ┣ .gitignore          # Archivos ignorados
 ┣ eslint.config.js    # Configuración ESLint
 ┣ index.html          # HTML principal
 ┣ package-lock.json   # Lock de dependencias
 ┣ package.json        # Dependencias frontend
 ┣ README.md           # Documentación frontend
 ┗ vite.config.js      # Configuración Vite
```

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/mariposas-oceania-mysql.git
cd mariposas-oceania-mysql
```

### 2. Instalar dependencias del backend
```bash
cd Backend
npm install
```

### 3. Configurar Base de Datos MySQL

#### 3.1. Instalar MySQL Workbench
Descarga e instala [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)

#### 3.2. Crear la base de datos
```sql
CREATE DATABASE butterflies_oceania;
USE butterflies_oceania;
```

#### 3.3. Crear las tablas necesarias
```sql
CREATE TABLE butterflies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    scientific_name VARCHAR(255) NOT NULL,
    habitat VARCHAR(500),
    description TEXT,
    wingspan VARCHAR(100),
    conservation_status VARCHAR(100),
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Configurar variables de entorno

Crea un archivo `.env` en la carpeta `Backend/` con el siguiente contenido:

**⚠️ Importante:** Reemplaza `tu_usuario_mysql` y `tu_password_mysql` con tus credenciales reales de MySQL.

```env
# Configuración del servidor
PORT=5000
NODE_ENV=development

# Configuración MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_password_mysql
DB_NAME=butterflies_app
DB_NAME_TEST=butterflies_app_test
```

### 5. Ejecutar el servidor
```bash
# Modo desarrollo (el único script disponible)
npm run dev
```

El servidor estará disponible en `http://localhost:5000`

### 6. Instalar y ejecutar el frontend
```bash
cd ../Frontend
npm install
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## 🛠️ Tecnologías Utilizadas

### Backend
- ⚡ **Node.js** - Entorno de ejecución
- 🚀 **Express.js** - Framework web
- 🗄️ **MySQL** - Base de datos relacional
- 🔗 **mysql2** - Driver MySQL para Node.js
- 🔒 **bcryptjs** - Encriptación de contraseñas
- ✅ **express-validator** - Validación de datos
- 🌐 **cors** - Manejo de CORS
- 🔧 **dotenv** - Variables de entorno
- 🧪 **jest** - Testing framework

### Frontend (desarrollado por compañeras)
- ⚛️ **React.js** - Librería UI
- 🎨 **CSS/SCSS** - Estilos
- 📦 **Vite** - Build tool
- 🌐 **Axios** - Cliente HTTP

## 📚 Endpoints de la API

### Mariposas
- `GET /api/butterflies` - Obtener todas las mariposas
- `GET /api/butterflies/:id` - Obtener mariposa por ID
- `POST /api/butterflies` - Crear nueva mariposa
- `PUT /api/butterflies/:id` - Actualizar mariposa
- `DELETE /api/butterflies/:id` - Eliminar mariposa

## 🧪 Ejecutar Tests

```bash
npm run test
```

## 📝 Scripts Disponibles

```bash
npm run dev      # Servidor en modo desarrollo con nodemon
npm start        # Servidor en modo producción
npm run test     # Ejecutar tests
npm run lint     # Verificar código con ESLint
```

## 🌟 Características Técnicas

- ✅ **API RESTful** completa
- 🔒 **Validaciones** robustas con express-validator
- 🗄️ **Conexiones** optimizadas a MySQL
- 🔄 **Manejo de errores** centralizado
- 🧪 **Tests unitarios** con Jest
- 📝 **Documentación** de API
- 🚀 **Preparado para producción**

## 🤝 Colaboradoras del Frontend

Este backend complementa el excelente trabajo frontend realizado por mis compañeras de bootcamp en el proyecto Mariposas de Oceanía.

## 👩‍💻 Desarrollado por

**Esther Tapias**  
🌟 Fullstack Developer en formación 

👩‍✈️ Formada en perfiles Data Scientist | Data Analyst · Bootcampt en Inteligencia en Artificial 

💻 Especializada en Backend con Node.js y MySQL  

📱 **Conéctate conmigo:**
- 🐙 [GitHub](https://github.com/EstherTapias)
- 💼 [LinkedIn](https://www.linkedin.com/in/esther-tapias-paez-camino/)

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

*🦋 "Cada mariposa es una flor que vuela y nos recuerda que la transformación es posible" ✨*