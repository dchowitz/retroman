const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');

const retros = [
  {
    id: 'foo',
    name: 'foo retro',
    description: 'our super duper retro',
    participants: [
      {
        name: 'Tom',
        notes: [
          {
            title: 'note 1',
            category: 'good', // one of good, bad, keep, improve (more?)
            description: 'lkasd aölsfkj\naösflkadlk\nskfdkfaös\nasölkj\ndkdöklj\nasdflkj',
          },
          {
            title: 'note 2',
            category: 'bad', // one of good, bad, keep, improve (more?)
            description: 'kdkj djkdjl flkdl sdflkj sflkj sflkj df',
          },
          {
            title: 'note 3',
            category: 'bad', // one of good, bad, keep, improve (more?)
            description: 'jd djkddfkjkdf kjdj',
          },
        ],
      },
      {
        name: 'Lisa',
      },
      {
        name: 'Paul',
      },
    ],
  },
  {
    id: 'bar',
    name: 'bar retro',
    description: 'our bar retro about some stuff',
    participants: [
      {
        name: 'Clair',
      },
      {
        name: 'Frank',
      },
      {
        name: 'Viola',
      },
    ],
  },
];

const apiRoutes = express.Router();
apiRoutes.use(bodyParser.json());

apiRoutes.post('/retro', (req, res) => {
  const { name, description } = req.body;
  const retro = { name, description, id: shortid.generate(), participants: [] };
  retros.push(retro);
  res.status(201).json(retro);
});

apiRoutes.get('/retro/:id', (req, res) => {
  const retro = retros.find(r => r.id === req.params.id);
  if (retro) {
    res.status(200).json(retro);
  } else {
    res.sendStatus(404);
  }
});

apiRoutes.post('/retro/:id/part', (req, res) => {
  const retro = retros.find(r => r.id === req.params.id);
  if (retro) {
    const name = req.body.name;
    const participant = retro.participants.find(p => p.name === name);
    if (!participant) {
      retro.participants.push({ name });
    }
    res.status(201).json(retro);
  } else {
    res.sendStatus(404);
  }
});

module.exports = apiRoutes;
