const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const validateParticipant = require('./validateParticipant');

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
            id: 'n1',
            title: 'note 1',
            category: 'good', // one of good, bad, keep, improve (more?)
            description: 'lkasd aölsfkj\naösflkadlk\nskfdkfaös\nasölkj\ndkdöklj\nasdflkj',
          },
          {
            id: 'n2',
            title: 'note 2',
            category: 'bad', // one of good, bad, keep, improve (more?)
            description: 'kdkj djkdjl flkdl sdflkj sflkj sflkj df',
          },
          {
            id: 'n3',
            title: 'note 3',
            category: 'bad', // one of good, bad, keep, improve (more?)
            description: 'jd djkddfkjkdf kjdj',
          },
        ],
      },
      {
        name: 'Lisa',
        notes: [],
      },
      {
        name: 'Paul',
        notes: [],
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
        notes: [],
      },
      {
        name: 'Frank',
        notes: [],
      },
      {
        name: 'Viola',
        notes: [],
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

// create/update participant
apiRoutes.post('/retro/:id/part', (req, res) => {
  const participantRequest = validateParticipant(req.body);
  if (participantRequest.errors) {
    res.status(400).json({ messages: participantRequest.errors });
    return;
  }

  const retroId = req.params.id;
  const retro = retros.find(r => r.id === retroId);
  if (!retro) {
    res.sendStatus(404).json({ message: `unknown retro id '${retroId}'` });
    return;
  }

  const notesSuppliedWithIds = participantRequest.notes.map(n => Object.assign({}, { id: shortid.generate() }, n));

  const participant = retro.participants.find(p => p.name === participantRequest.name);
  if (participant) {
    participant.notes = notesSuppliedWithIds;
  } else {
    retro.participants.push({
      name: participantRequest.name,
      notes: notesSuppliedWithIds,
    });
  }

  res.status(201).json(retro);
});

module.exports = apiRoutes;
