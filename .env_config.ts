/**
 * Configuración unificada de entorno
 *
 * IMPORTANTE: No hay diferencias de comportamiento entre entornos.
 * Solo cambian las URLs de conexión y credenciales definidas en las variables de entorno.
 *
 * TODOS LOS ARCHIVOS DEL PROYECTO DEBEN IMPORTAR LAS VARIABLES DE ENTORNO DESDE AQUÍ.
 * NO usar import.meta.env directamente en otros archivos.
 *
 * NOTA SOBRE VARIABLES PÚBLICAS (CLIENT-SIDE):
 * - Variables con PUBLIC_ prefix están disponibles en el navegador
 * - Variables sin PUBLIC_ solo están disponibles en el servidor
 * - API_BASE_URL se usa en el cliente, por eso debe ser PUBLIC_API_BASE_URL
 */

const configEnv = {
  // URLs de conexión (disponibles en cliente y servidor)
  api: import.meta.env.PUBLIC_API_BASE_URL || "http://localhost:3000",
  frontend: import.meta.env.PUBLIC_FRONTEND_BASE_URL || "http://localhost:4321",
  // WebSocket usa la misma URL que la API
  ws: import.meta.env.PUBLIC_API_BASE_URL || "http://localhost:3000",

  // Autenticación (solo servidor - sin PUBLIC_ prefix)
  auth: {
    secret: import.meta.env.AUTH_SECRET || "",
    publicSecret: import.meta.env.PUBLIC_AUTH_SECRET || "",
  },

  // Credenciales de autenticación OAuth - Google (solo servidor)
  google: {
    clientId: import.meta.env.GOOGLE_CLIENT_ID || "",
    clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET || "",
  },
};

export default configEnv;