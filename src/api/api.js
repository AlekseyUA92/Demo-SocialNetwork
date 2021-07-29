import * as axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    // 'API-KEY':
    // 'b523ace8-8079-455e-b7c7-0a9f0946e6bf'
    'API-KEY': '16ed8655-3ae7-4450-b649-ace997347a05'
  }
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data;
      });
  },
  unfollowUser(id) {
    return instance.delete(`follow/${id}`).then((response) => {
      return response.data;
    });
  },
  followUser(id) {
    return instance.post(`follow/${id}`).then((response) => {
      return response.data;
    });
  },
  getProfile(userId) {
    // Обратная совместимость
    console.warn('Obsolete method. Please use profileAPI object.');
    return profileAPI.getProfile(userId);
  }
};
export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/` + userId);
  },
  getUserStatus(userId) {
    return instance.get(`profile/status/` + userId);
  },
  updateStatus(status) {
    return instance.put(`profile/status/`, {
      status: status
    });
  }
};

export const authAPI = {
  me() {
    return instance.get(`auth/me`);
  },
  login(email, password, rememberMe = false) {
    return instance.post(`auth/login`, { email, password, rememberMe });
  },
  logout() {
    return instance.delete(`auth/login`);
  }
};

//export default usersAPI;
