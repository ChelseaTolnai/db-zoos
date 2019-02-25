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

// *** ZOOS ENDPOINTS ***
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

server.get('/api/zoos', async (req, res) => {
  try {
    const zoos = await db('zoos');
    res.status(200).json(zoos)
  } catch (error) {
    res.status(500).json({error: "Error getting zoos."})
  }
});

server.get('/api/zoos/:id', async (req, res) => {
  try {
    const zoo = await db('zoos')
      .where({ id: req.params.id })
      .first();
    if (zoo) {
      res.status(200).json(zoo)
    } else {
      res.status(404).json({error: "Zoo with specified ID does not exist."})
    }
  } catch (error) {
    res.status(500).json({error: "Error getting specified zoo."})
  }
});

server.put('/api/zoos/:id', async (req, res) => {
  try {
    const zoo = req.body;
    if (zoo.name) {
      const count = await db('zoos')
      .where({ id: req.params.id })
      .update(zoo);

      if (count > 0) {
        const updatedZoo = await db('zoos')
        .where({ id: req.params.id })
        .first();

        res.status(200).json(updatedZoo)
      } else {
        res.status(404).json({error: "Zoo with specified ID does not exist."})
      }
    } else {
      res.status(400).json({error: "Zoo name is required."})
    }
  } catch (error) {
    res.status(500).json({error: "Error updating specified zoo."})
  }
});

server.delete('/api/zoos/:id', async (req, res) => {
  try {
    const count = await db('zoos')
    .where({ id: req.params.id })
    .del();

    if (count > 0) {
      res.status(204).end()
    } else {
      res.status(404).json({error: "Zoo with specified ID does not exist."})
    }
  } catch (error) {
    res.status(500).json({error: "Error deleting specified zoo."})
  }
});

// *** BEARS ENDPOINTS ***
server.post('/api/bears', async (req, res) => {
  try {
    const bear = req.body;
    if (bear.name) {
      const [id] = await db('bears').insert(bear);
      res.status(201).json(id)
    } else {
      res.status(400).json({error: "Bear name is required."})
    }
  } catch (error) {
    res.status(500).json({error: "Error adding bear."})
  }
});

server.get('/api/bears', async (req, res) => {
  try {
    const bears = await db('bears');
    res.status(200).json(bears)
  } catch (error) {
    res.status(500).json({error: "Error getting bears."})
  }
});

server.get('/api/bears/:id', async (req, res) => {
  try {
    const bear = await db('bears')
      .where({ id: req.params.id })
      .first();
    if (bear) {
      res.status(200).json(bear)
    } else {
      res.status(404).json({error: "Bear with specified ID does not exist."})
    }
  } catch (error) {
    res.status(500).json({error: "Error getting specified bear."})
  }
});

server.put('/api/bears/:id', async (req, res) => {
  try {
    const bear = req.body;
    if (bear.name) {
      const count = await db('bears')
      .where({ id: req.params.id })
      .update(bear);

      if (count > 0) {
        const updatedBear = await db('bears')
        .where({ id: req.params.id })
        .first();

        res.status(200).json(updatedBear)
      } else {
        res.status(404).json({error: "Bear with specified ID does not exist."})
      }
    } else {
      res.status(400).json({error: "Bear name is required."})
    }
  } catch (error) {
    res.status(500).json({error: "Error updating specified bear."})
  }
});

server.delete('/api/bears/:id', async (req, res) => {
  try {
    const count = await db('bears')
    .where({ id: req.params.id })
    .del();

    if (count > 0) {
      res.status(204).end()
    } else {
      res.status(404).json({error: "Bear with specified ID does not exist."})
    }
  } catch (error) {
    res.status(500).json({error: "Error deleting specified bear."})
  }
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
