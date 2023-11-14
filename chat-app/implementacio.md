Para implementar la aplicación de chat web en un servidor Debian 12, sigue estos pasos. Ten en cuenta que esta guía es bastante detallada y puede requerir adaptaciones según tus necesidades específicas.

### 1. Acceso SSH al Servidor:

Asegúrate de tener acceso SSH al servidor Debian 12.

```bash
ssh tu_usuario@tu_direccion_ip
```

### 2. Actualización del Sistema:

```bash
sudo apt update
sudo apt upgrade
```

### 3. Instalación de Node.js y npm:

```bash
# Instala Node.js y npm usando NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Instala la última versión estable de Node.js
nvm install stable
```

### 4. Instalación de MongoDB:

```bash
# Importa la clave pública del repositorio MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-archive-keyring.gpg

# Agrega el repositorio oficial de MongoDB
echo "deb [signed-by=/usr/share/keyrings/mongodb-archive-keyring.gpg] https://repo.mongodb.org/apt/debian bullseye/mongodb-org/5.0 main" | sudo tee /etc/apt/sources.list.d/mongodb.list

# Actualiza e instala MongoDB
sudo apt update
sudo apt install -y mongodb-org

# Inicia el servicio MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 5. Configuración del Proyecto:

```bash
# Clona tu repositorio
git clone <URL del repositorio>
cd chat-app
```

### 6. Instalación de Dependencias del Servidor:

```bash
# Navega al directorio del servidor
cd server

# Instala las dependencias
npm install
```

### 7. Configuración de la Base de Datos:

Crea un archivo `.env` en el directorio `server` y agrega la URL de conexión a MongoDB:

```plaintext
MONGODB_URI=mongodb://localhost:27017/chatApp
PORT=3001
```

### 8. Ejecución del Servidor:

```bash
# Vuelve al directorio principal del proyecto
cd ..

# Ejecuta el servidor Node.js
cd server
node index.js
```

### 9. Configuración y Ejecución del Cliente:

```bash
# Navega al directorio del cliente
cd ../client

# Instala las dependencias
npm install

# Ejecuta el cliente React
npm start
```

### 10. Configuración de Nginx (Opcional):

Si deseas utilizar Nginx como servidor web para servir tu aplicación React:

```bash
# Instala Nginx
sudo apt install nginx

# Crea un archivo de configuración para tu sitio
sudo nano /etc/nginx/sites-available/chat-app

# Agrega la configuración básica
server {
    listen 80;
    server_name tu_direccion_ip;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Crea un enlace simbólico a sites-enabled
sudo ln -s /etc/nginx/sites-available/chat-app /etc/nginx/sites-enabled

# Reinicia Nginx
sudo systemctl restart nginx
```

### 11. Configuración de pm2 (Opcional):

Para ejecutar el servidor Node.js en segundo plano y asegurarse de que siga ejecutándose incluso después de cerrar la terminal:

```bash
# Instala pm2 globalmente
npm install -g pm2

# Inicia tu aplicación con pm2
pm2 start server/index.js

# Guarda el proceso para que se reinicie automáticamente en el arranque
pm2 save
pm2 startup
```

### 12. Configuración de SSL (Opcional):

Si deseas habilitar HTTPS para tu aplicación, considera obtener un certificado SSL gratuito de Let's Encrypt.

```bash
# Instala certbot
sudo apt install certbot

# Obtén y configura el certificado
sudo certbot --nginx -d tu_direccion_ip
```

### 13. Configuración del Firewall (Opcional):

Ajusta la configuración del firewall para permitir el tráfico en los puertos necesarios:

```bash
# Instala ufw (Uncomplicated Firewall)
sudo apt install ufw

# Habilita el tráfico en los puertos 80, 443 y 3001
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 3001

# Habilita el firewall
sudo ufw enable
```

### 14. Accede a tu Aplicación:

Abre tu navegador y accede a `http://tu_direccion_ip` o `https://tu