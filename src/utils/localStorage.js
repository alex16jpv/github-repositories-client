const getItem = (id) => {
  return localStorage.getItem(id);
};

const setItem = (id, value) => {
  localStorage.setItem(id, value);
};

export { getItem, setItem };
