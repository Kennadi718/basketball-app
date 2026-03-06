const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// GET players
router.get('/', auth, (req, res) => {
  const db = req.db;
  db.query('SELECT * FROM players', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ADD player
router.post('/', auth, (req, res) => {
  const db = req.db;
  const { name, team, points_per_game } = req.body;

  db.query(
    'INSERT INTO players (name, team, points_per_game) VALUES (?, ?, ?)',
    [name, team, points_per_game],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Player added' });
    }
  );
});

// UPDATE player
router.put('/:id', auth, (req, res) => {
  const db = req.db;
  const { name, team, points_per_game } = req.body;

  db.query(
    'UPDATE players SET name=?, team=?, points_per_game=? WHERE id=?',
    [name, team, points_per_game, req.params.id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Player updated' });
    }
  );
});

// DELETE player
router.delete('/:id', auth, (req, res) => {
  const db = req.db;

  db.query('DELETE FROM players WHERE id=?', [req.params.id], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Player deleted' });
  });
});

module.exports = router;
