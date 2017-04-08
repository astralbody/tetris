const getHiScore = (hiScore) => {
  const numHiScore = parseInt(hiScore, 10);
  return isNaN(numHiScore) ? 0 : numHiScore;
};

export default getHiScore;
