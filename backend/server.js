const express = require('express');
const app = express();
const cors = require('cors');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig.development);
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  try {
    const items = await knex('inventory')
      .select('inventory.*', 'users.username as username')
      .leftJoin('users', 'inventory.user_id', 'user_id');

    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await knex('users').where('username', username).first();


    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    if (!password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.json({ message: 'Login successful', username: user.username });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});