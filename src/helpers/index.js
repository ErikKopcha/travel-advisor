export const getFilteredArrayByRating = (array = [], rating = '') => {
  return array.filter(r => Number(r.rating) >= Number(rating));
};

export const getRandomRangeNum = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
};