export const auth = {
  currentUser: {
    uid: 'test-uid',
  },
};

export const firestore = {
  collection: jest.fn(() => ({
    add: jest.fn(),
  })),
}; 