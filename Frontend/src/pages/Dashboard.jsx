import { useEffect, useState } from 'react';
import api from '../api';

export default function Dashboard() {
  const [players, setPlayers] = useState([]);
  const [form, setForm] = useState({ name: '', team: '', points_per_game: '' });

  const loadPlayers = async () => {
    const res = await api.get('/players');
    setPlayers(res.data);
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  const addPlayer = async () => {
    await api.post('/players', form);
    loadPlayers();
  };

  const deletePlayer = async id => {
    await api.delete(`/players/${id}`);
    loadPlayers();
  };

  return (
    <div>
      <h2>Players</h2>

      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Team" onChange={e => setForm({ ...form, team: e.target.value })} />
      <input placeholder="PPG" onChange={e => setForm({ ...form, points_per_game: e.target.value })} />
      <button onClick={addPlayer}>Add</button>

      <ul>
        {players.map(p => (
          <li key={p.id}>
            {p.name} — {p.team} — {p.points_per_game}
            <button onClick={() => deletePlayer(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
