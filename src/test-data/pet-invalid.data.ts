
export const invalidPetTestCases = [
  {
    title: 'numeric name',
    payload: { id: 12345, name: 12345, status: 'available' },
  },
  {
    title: 'empty name',
    payload: { id: 12346, name: '', status: 'available' },
  },
  {
    title: 'unsupported status',
    payload: { id: 12347, name: 'Demo Pet', status: 'unknown' },
  },
  {
    title: 'missing name',
    payload: { id: 12348, status: 'available' },
  },
];
