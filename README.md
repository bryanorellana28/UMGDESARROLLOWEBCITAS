# Proyecto Final UMG Desarrollo WEB

Este es un proyecto de gestión de citas médicas desarrollado con [Next.js](https://nextjs.org), iniciado con [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Tecnologías Utilizadas

### **Frontend**
- Next.js
- React.js (TypeScript)
- Tailwind CSS

### **Backend**
- API Routes de Next.js
- MySQL 

### **Autenticación**
- JWT para autenticación de usuarios

### **ORM**
- Prisma o TypeORM para interacción con bases de datos

## Funcionalidades Principales

1. **Gestión de Citas**
   - Reserva de citas según disponibilidad de fechas y horarios.
   - Confirmación y recordatorios automáticos por correo.
   - Posibilidad de cancelar o reprogramar citas.

2. **Calendario y Disponibilidad**
   - Administración de horarios por parte de médicos o agentes de viaje.
   - Vista de calendario con citas semanales/mensuales.

3. **Autenticación y Roles**
   - Autenticación de usuarios con JWT.
   - Roles de usuario: Administrador, Médico, Paciente.

4. **Dashboard para Administración**
   - Visualización de todas las citas.
   - Reportes de citas programadas y canceladas.

## Configuración del Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/bd"
JWT_SECRET="secreto"
