import express from 'express';
import { createServer } from 'http';
import { join } from 'path';
import { Server } from 'socket.io';
const app = express();
const appServer = createServer(app);
const io = new Server(appServer);
import path from 'path';
import { fileURLToPath } from 'url';
import { serialController } from "./backend/controllers/serialController.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

serialController(io)

// Servir archivos estáticos desde 'frontend/public'
app.use(express.static(join(__dirname, 'frontend', 'public')));

// Ruta para servir el archivo HTML principal
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'frontend', 'public', 'index.html'));
});

// Iniciar el servidor
appServer.listen(3000, () => {
    console.log('el servidor esta corriendo en el puerto 3000');
});
