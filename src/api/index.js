function validate(response) {
  if (response.ok) {
    return response.json();
  }
  throw new Error(response.statusText);
}

function normalizeRetro(retro) {
  return {
    id: retro.id,
    name: retro.name,
    description: retro.description,
    participants: retro.participants.map(p => p.name),
    notes: retro.participants.reduce((allNotes, p) => allNotes.concat(p.notes.map(n => ({
      id: n.id,
      author: p.name,
      title: n.title,
      category: n.category,
      description: n.description,
    }))), []),
  };
}

export function postRetro({ name, description }) {
  return fetch('/api/retro', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({ name, description }),
  }).then(validate)
    .then(normalizeRetro);
}

export function getRetro(id) {
  return fetch(`/api/retro/${id}`, { method: 'GET' })
    .then(validate)
    .then(normalizeRetro);
}

export function postParticipant(id, participant) {
  return fetch(`/api/retro/${id}/part`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(participant),
  }).then(validate)
    .then(normalizeRetro);
}
