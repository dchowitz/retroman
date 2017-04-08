function validate(response) {
  if (response.ok) {
    return response.json();
  }
  throw new Error(response.statusText);
}

export function createRetro({ name, description }) {
  return fetch('/api/retro', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({ name, description }),
  }).then(validate);
}

export function getRetro(id) {
  return fetch(`/api/retro/${id}`, { method: 'GET' }).then(validate);
}

export function createOrUpdateParticipant(id, participant) {
  return fetch(`/api/retro/${id}/part`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(participant),
  }).then(validate);
}
