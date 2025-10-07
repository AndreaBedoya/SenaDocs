# 📄 SenaDocs

**SenaDocs** es una plataforma web desarrollada para facilitar la gestión de documentos académicos en el entorno institucional del SENA. Su propósito es ofrecer a los usuarios una experiencia segura, intuitiva y eficiente para:

- Registrarse con validación y encriptación de contraseñas.
- Iniciar sesión para acceder a funcionalidades personalizadas.
- Subir, organizar y visualizar documentos académicos.
- Evaluar la originalidad y novedad de los archivos cargados.

---

## 🧪 Tecnologías utilizadas

### 🔹 Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [SweetAlert2](https://sweetalert2.github.io/) — para alertas visuales
- [React Router DOM](https://reactrouter.com/) — para navegación entre pantallas

### 🔹 Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/) — servidor web
- [pg](https://node-postgres.com/) — cliente PostgreSQL
- [bcrypt](https://www.npmjs.com/package/bcrypt) — encriptación de contraseñas
- [dotenv](https://www.npmjs.com/package/dotenv) — manejo de variables de entorno
- [nodemon](https://www.npmjs.com/package/nodemon) — recarga automática en desarrollo

### 🔹 Base de datos
- [PostgreSQL](https://www.postgresql.org/) — base de datos relacional

---

## 📦 Dependencias instaladas

```bash
# Frontend
npm install react react-dom react-router-dom sweetalert2

# Backend
npm install express pg bcrypt dotenv
npm install --save-dev nodemon
