const localStorage = () => {
  const storage = {};

  return {
    setItem(key, value) {
      storage[key] = value || '';
    },
    getItem(key) {
      return storage[key] || null;
    },
  };
};

export default localStorage;
