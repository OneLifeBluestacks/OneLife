const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();

// Подключение к базе данных
const db = new sqlite3.Database('onelife.db');

// Middleware
app.use(bodyParser.json());

// API для активации ключа
app.post('/api/activate-key', (req, res) => {
    const { key, userId, hwid } = req.body;
    
    // Проверяем ключ в базе данных
    db.get('SELECT * FROM keys WHERE key = ? AND activated_at IS NULL', [key], (err, row) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Ошибка базы данных' });
        }
        
        if (!row) {
            return res.json({ success: false, message: 'Неверный или уже использованный ключ' });
        }
        
        // Активируем ключ
        const activatedAt = new Date().toISOString();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + row.days);
        
        db.run(
            'UPDATE keys SET activated_by = ?, activated_at = ? WHERE id = ?',
            [userId, activatedAt, row.id],
            function(err) {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Ошибка активации ключа' });
                }
                
                // Обновляем информацию о пользователе
                db.run(
                    'UPDATE users SET hwid = ? WHERE id = ?',
                    [hwid, userId],
                    function(err) {
                        if (err) {
                            console.error('Ошибка обновления HWID:', err);
                        }
                        
                        res.json({ 
                            success: true, 
                            message: `Ключ успешно активирован! Срок действия: ${row.days} дней`,
                            expiresAt: expiresAt.toISOString()
                        });
                    }
                );
            }
        );
    });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});