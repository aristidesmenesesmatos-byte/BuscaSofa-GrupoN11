const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const SECRET = require("./secret").secret; // Cambia esto en producción

const app = express();
app.use(express.json());
app.use(cors());

// Inicializa la base de datos SQLite
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error al abrir la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite');
        console.log('Creando la tabla de usuarios si no existe...');
        db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        console.log('Creando la tabla de comentarios si no existe...');
        db.run(`
      CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        station_id TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        username TEXT NOT NULL,
        comment TEXT NOT NULL,
        rating INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
            if (err) {
                console.error('Error creando tabla comments:', err.message);
                return;
            }
            db.all('PRAGMA table_info(comments)', [], (err, columns) => {
                if (err) {
                    console.error('Error comprobando columnas de comments:', err.message);
                    return;
                }
                const hasRating = columns.some((col) => col.name === 'rating');
                if (!hasRating) {
                    db.run('ALTER TABLE comments ADD COLUMN rating INTEGER', (err) => {
                        if (err) console.error('Error agregando columna rating a comments:', err.message);
                        else console.log('Columna rating añadida a la tabla comments');
                    });
                }
            });
        });
        console.log('Finalizada la conexión con la base de datos SQLite :)');
    }
});

// Registro de usuario
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });

    db.get('SELECT id FROM users WHERE username = ? OR email = ?', [username, email], async (err, row) => {
        if (row) return res.status(409).json({ message: 'Usuario o email ya existe' });

        const hashedPassword = await bcrypt.hash(password, 10);
        db.run(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword],
            function (err) {
                if (err) return res.status(500).json({ message: 'Error en el servidor', error: err.message });
                res.status(201).json({ message: 'Usuario registrado correctamente' });
            }
        );
    });
});

// Login de usuario
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });

    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (!user) return res.status(401).json({ message: 'Credenciales incorrectas' });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: 'Credenciales incorrectas' });

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login correcto', token, username: user.username });
    });
});

// Añadir comentario
app.post('/api/comments', (req, res) => {
    const { token, station_id, comment, rating } = req.body;
    if (!token || !station_id || !comment) return res.status(400).json({ message: 'Datos incompletos' });

    const parsedRating = rating == null ? null : Number(rating);
    if (rating != null && (Number.isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5)) {
        return res.status(400).json({ message: 'Rating inválido. Debe ser un número entre 0 y 5.' });
    }

    let payload;
    try {
        payload = jwt.verify(token, SECRET);
    } catch {
        return res.status(401).json({ message: 'Token inválido' });
    }

    db.run(
        'INSERT INTO comments (station_id, user_id, username, comment, rating) VALUES (?, ?, ?, ?, ?)',
        [station_id, payload.id, payload.username, comment, parsedRating],
        function (err) {
            if (err) return res.status(500).json({ message: 'Error al guardar comentario', error: err.message });
            res.status(201).json({ message: 'Comentario guardado' });
        }
    );
});

// Obtener comentarios de una estación
app.get('/api/comments/:station_id', (req, res) => {
    db.all(
        'SELECT username, comment, rating, created_at FROM comments WHERE station_id = ? ORDER BY created_at DESC',
        [req.params.station_id],
        (err, rows) => {
            if (err) return res.status(500).json({ message: 'Error al obtener comentarios', error: err.message });
            res.json(rows);
        }
    );
});

// Obtener detalle del usuario
app.get('/api/users/:user_id', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Token requerido' });
    }

    let payload;
    try {
        payload = jwt.verify(token, SECRET);
    } catch {
        return res.status(401).json({ message: 'Token inválido' });
    }
    if (payload.id !== Number(req.params.user_id)) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    db.all(
        'SELECT username, email FROM users WHERE id = ? ORDER BY created_at DESC',
        [req.params.user_id],
        (err, rows) => {
            if (err) return res.status(500).json({ message: 'Error al obtener detalle del usuario', error: err.message });
            res.json(rows);
        }
    );
});

app.patch('/api/users/:user_id', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const { username, email } = req.body;

    if (!token) {
        return res.status(401).json({ message: 'Token requerido' });
    }

    if (!username && !email) {
        return res.status(400).json({ message: 'Debe proporcionar username y/o email para actualizar' });
    }

    let payload;
    try {
        payload = jwt.verify(token, SECRET);
    } catch {
        return res.status(401).json({ message: 'Token inválido' });
    }

    if (payload.id !== Number(req.params.user_id)) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar que username o email no existan en otros usuarios
    if (username || email) {
        const query = username && email 
            ? 'SELECT id FROM users WHERE (username = ? OR email = ?) AND id != ?'
            : username
            ? 'SELECT id FROM users WHERE username = ? AND id != ?'
            : 'SELECT id FROM users WHERE email = ? AND id != ?';
        
        const params = username && email
            ? [username, email, req.params.user_id]
            : username
            ? [username, req.params.user_id]
            : [email, req.params.user_id];

        db.get(query, params, (err, row) => {
            if (err) return res.status(500).json({ message: 'Error en el servidor', error: err.message });
            if (row) return res.status(409).json({ message: 'Usuario o email ya existe' });

            // Proceder con la actualización
            let updateQuery = 'UPDATE users SET ';
            const updateParams = [];

            if (username) {
                updateQuery += 'username = ?';
                updateParams.push(username);
            }

            if (email) {
                if (username) updateQuery += ', ';
                updateQuery += 'email = ?';
                updateParams.push(email);
            }

            updateQuery += ' WHERE id = ?';
            updateParams.push(req.params.user_id);

            db.run(updateQuery, updateParams, function (err) {
                if (err) return res.status(500).json({ message: 'Error al actualizar usuario', error: err.message });
                res.json({ message: 'Usuario actualizado correctamente' });
            });
        });
    }
});

// Eliminar usuario
app.delete('/api/users/:user_id', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token requerido' });
    }

    let payload;
    try {
        payload = jwt.verify(token, SECRET);
    } catch {
        return res.status(401).json({ message: 'Token inválido' });
    }

    if (payload.id !== Number(req.params.user_id)) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Eliminar comentarios del usuario primero (integridad referencial)
    db.run('DELETE FROM comments WHERE user_id = ?', [req.params.user_id], (err) => {
        if (err) return res.status(500).json({ message: 'Error al eliminar comentarios', error: err.message });

        // Luego eliminar el usuario
        db.run('DELETE FROM users WHERE id = ?', [req.params.user_id], function (err) {
            if (err) return res.status(500).json({ message: 'Error al eliminar usuario', error: err.message });
            res.json({ message: 'Usuario eliminado correctamente' });
        });
    });
});

app.listen(4000, () => console.log('Servidor backend (SQLite) en http://localhost:4000'));