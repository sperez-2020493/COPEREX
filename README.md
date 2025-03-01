# API de Registro de Empresas - Interfer COPEREX

## Descripción
Esta API ha sido desarrollada para gestionar la incorporación de nuevos socios y empresas a la feria "Interfer". Proporciona funcionalidades esenciales como autenticación de administradores, registro de empresas, visualización de datos empresariales y generación de reportes en formato Excel.

## Tecnologías Utilizadas
- **Backend:** Node.js, Express
- **Base de Datos:** MongoDB
- **Autenticación y Seguridad:** Implementación de medidas de seguridad vistas durante el bimestre.
- **Generación de Reportes:** Librerías para exportar datos en formato Excel.

## Funcionalidades Principales
1. **Inicio de Sesión**
   - Solo los administradores pueden acceder al sistema.
   - No se admiten otros roles.
   - Se establece un administrador por defecto si no existe.

   ```javascript

                   username: "Sperez",
                   email: "sperez@gmail.com",
                   password: await hash("1Aa/", 10),
                   role: "ADMIN_ROLE",
   ```

2. **Registro de Empresas**
   - Formulario para ingreso de datos clave (nivel de impacto, años de trayectoria, categoría empresarial, entre otros).
   
3. **Visualización de Empresas**
   - Listado de empresas con opciones de filtrado y ordenamiento (por años de trayectoria, categoría, orden A-Z y Z-A).
   - Posibilidad de edición de la información, pero sin eliminación de registros.
   
4. **Generación de Reportes**
   - Exportación de datos en formato Excel para facilitar el análisis y toma de decisiones.

## Instalación y Uso
1. Clonar el repositorio:
   ```bash
   git clone <repositorio>
   cd <nombre-del-proyecto>
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar variables de entorno.
4. Iniciar el servidor:
   ```bash
   npm start dev
   ```

## Requerimientos
- Node.js instalado.
- MongoDB en funcionamiento.
- Variables de entorno configuradas correctamente.

## Autores
- **Desarrollador:** Samuel Alexander Perez Cap


