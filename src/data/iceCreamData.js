import axios from 'axios';

export const getMenu = () => {
  return axios.get('/api/menu').then(({ data }) => {
    return data.sort((a, b) => {
      if (a.iceCream.name > b.iceCream.name) {
        return 1;
      }
      if (a.iceCream.name < b.iceCream.name) {
        return -1;
      }
      return 0;
    });
  });
};

export const getMenuItem = id => {
  return axios
    .get(`/api/menu/${id}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};
