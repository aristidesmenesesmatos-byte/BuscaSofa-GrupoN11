FROM node:20-slim

# Dependencias del sistema para compilar sqlite3
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar ficheros de dependencias
COPY buscasofa-server-main/package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código del servidor
COPY buscasofa-server-main/ ./

# Directorio para la base de datos SQLite
RUN mkdir -p /data

# Exponer el puerto del backend
EXPOSE 4000

# Arrancar el servidor de desarrollo
CMD ["node", "index_dev.js"]
