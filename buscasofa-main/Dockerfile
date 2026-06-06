FROM node:20-slim

WORKDIR /app

# Copiar ficheros de dependencias
COPY buscasofa-main/package*.json ./

# Instalar dependencias (incluyendo devDependencies para vite)
RUN npm install

# Copiar el código del frontend
COPY buscasofa-main/ ./

# Exponer el puerto de Vite
EXPOSE 5173

# Arrancar vite en modo dev, accesible desde fuera del contenedor
CMD ["npx", "vite", "--host", "0.0.0.0"]
