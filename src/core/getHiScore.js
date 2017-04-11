const getHiScore = (hiScore) => {
  const intHiScore = parseInt(hiScore, 10);
  return isNaN(intHiScore) ? 0 : intHiScore;
};

export default getHiScore;
