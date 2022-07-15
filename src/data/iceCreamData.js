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

export const getIceCreams = () => {
  return axios.get('/api/menu/stock-ice-creams').then(({ data }) => {
    return data.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
  });
};

export const getIceCream = id => {
  return axios
    .get(`/api/menu/stock-ice-creams/${id.toString()}`)
    .then(({ data }) => data)
    .catch(error => {
      throw error;
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

export const postMenuItem = menuItem => {
  return axios
    .post(`/api/menu`, menuItem)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const putMenuItem = menuItem => {
  return axios
    .put(`/api/menu/${menuItem.id.toString()}`, menuItem)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const deleteMenuItem = id => {
  return axios.delete(`/api/menu/${id.toString()}`);
};
