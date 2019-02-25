const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.sqlite3',
  },
  useNullAsDefault: true,
}
const db = knex(knexConfig);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.post('/api/zoos', async (req, res) => {
  try {
    const zoo = req.body;
    if (zoo.name) {
      const [id] = await db('zoos').insert(zoo);

      res.status(201).json(id)
    } else {
      res.status(400).json({error: "Zoo name is required."})
    }

  } catch (error) {
    res.status(500).json({error: "Error adding zoo."})
  }
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
