const express = require('express');
const app = express();
const cors = require('cors');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig.development);
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 8081;
const saltRounds = 10;

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  try {
    const items = await knex('inventory')
      .select('inventory.*', 'users.username as username')
      .join('users', 'users.id', 'inventory.user_id');

    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
;

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await knex("users").where({ username }).first();

    if (user && await bcrypt.compare(password, user.password)) {
      res.status(200).json({ id: user.id });
    } else {
      res.status(401).send("Invalid username/password");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use(express.json());

app.get('/item-details/:itemId', async (req, res) => {
  try {
    const itemId = req.params.itemId;


    const item = await knex('inventory').where('id', itemId).first();

    if (!item) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }

    res.json(item);
  } catch (error) {
    console.error('Error fetching item details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/inventory/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const inventoryItems = await knex('inventory')
      .where('user_id', userId)
      .select('*');

    res.json(inventoryItems);
  } catch (error) {
    console.error('Error fetching inventory items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/add-item', async (req, res) => {
  try {
    const { equipment, count, description, user_id } = req.body;

    await knex('inventory').insert({ equipment, count, description, user_id });

    res.status(201).json({ message: 'Item added successfully' });
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put("/update-item/:itemId", async (req, res) => {
  const itemId = req.params.itemId;
  const { equipment, count, description } = req.body;

  try {
    await knex('inventory')
      .where('id', itemId)
      .update({
        equipment: equipment,
        count: count,
        description: description
      });

    res.status(200).send("Item updated successfully");
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).send("Internal server error");
  }
});

app.delete('/delete-item/:itemId', async (req, res) => {
  try {
    const itemId = req.params.itemId;

    await knex('inventory').where('id', itemId).del();

    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post("/check-username", async (req, res) => {
  const { username } = req.body;

  try {
    const existingUser = await knex("users").where({ username }).first();

    res.json({ exists: !!existingUser });
  } catch (error) {
    console.error("Error checking username:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/create-user', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await knex('users').where({ username }).first();
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await knex('users').insert({ username, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});