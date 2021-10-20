import getNow from './getNow';

const getCurrentDateTime = () => {
  const now = getNow();
  const currentDate = new Date(now);
  return currentDate.toLocaleString();
};

export default getCurrentDateTime;
