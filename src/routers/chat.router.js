import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('chat');
});

router.post('/messages', (req, res) => {
    res.status(200).json({ ok: true });
});


export default router;