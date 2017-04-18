module.exports = function validateParticipant({ name, notes = [] }) {
  const validationErrors = [];

  if (!name) {
    validationErrors.push('name must not be empty');
  }

  const invalidNote = notes.length !== notes.filter(n => n.title && n.category && n.description).length;
  if (invalidNote) {
    validationErrors.push('notes must have title, category and description');
  }

  const participant = { name, notes };
  if (validationErrors.length > 0) {
    participant.errors = validationErrors;
  }

  return participant;
};
