/* global test, expect*/

const validateParticipant = require('./validateParticipant');

test('returns no errors for valid participant', () => {
  const result = validateParticipant({
    name: 'foo',
    notes: [],
  });

  expect(result.errors).toBe(undefined);
});

test('returns name', () => {
  const result = validateParticipant({
    name: 'foo',
    notes: [],
  });

  expect(result.name).toBe('foo');
});

test('returns notes', () => {
  const notes = [];
  const result = validateParticipant({
    name: 'foo',
    notes,
  });

  expect(result.notes).toBe(notes);
});

test('returns error for missing name', () => {
  const result = validateParticipant({
    name: '',
    notes: [],
  });

  expect(result.errors.length).toBe(1);
  expect(result.errors[0]).toMatch('name must not be empty');
});

test('returns error for missing note title', () => {
  const result = validateParticipant({
    name: 'foo',
    notes: [
      { title: '', category: 'foo', description: 'bar' },
      { title: 'x', category: 'y', description: 'z' },
    ],
  });

  expect(result.errors.length).toBe(1);
  expect(result.errors[0]).toMatch('notes must have title, category and description');
});

test('returns error for missing note category', () => {
  const result = validateParticipant({
    name: 'foo',
    notes: [
      { title: 'foo', category: null, description: 'bar' },
      { title: 'x', category: 'y', description: 'z' },
    ],
  });

  expect(result.errors.length).toBe(1);
  expect(result.errors[0]).toMatch('notes must have title, category and description');
});

test('returns error for missing note description', () => {
  const result = validateParticipant({
    name: 'foo',
    notes: [
      { title: 'foo', category: 'foo' },
      { title: 'x', category: 'y', description: 'z' },
    ],
  });

  expect(result.errors.length).toBe(1);
  expect(result.errors[0]).toMatch('notes must have title, category and description');
});

test('returns multiple errors', () => {
  const result = validateParticipant({
    notes: [
      { title: '', category: 'foo', description: 'bar' },
      { title: 'x', category: 'y', description: 'z' },
    ],
  });

  expect(result).toMatchObject({
    errors: [
      'name must not be empty',
      'notes must have title, category and description',
    ],
  });
});
