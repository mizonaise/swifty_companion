export const checkExpired = (checkDate: number) => {
  const date = new Date().getTime() / 1000;
  if (checkDate <= date) {
    return true;
  }
  return false;
};
