const setHiScore = (score, hiScore) => {
  if (score > hiScore) {
    localStorage.setItem('hiScore', score);
  }
};

export default setHiScore;
