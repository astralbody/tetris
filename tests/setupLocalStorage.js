class LocalStorage {
  storage = {};

  setItem(key, value) {
    storage[key] = value;
  }
  getItem(key = null) {
    return storage[key];
  }
}

global.localStorage = new LocalStorage();
