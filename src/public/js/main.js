axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const err = error;
    if (err.response?.status === 401) {
      localStorage.setItem('isLogin', false);
      window.location.href = '/view/login';
    }

    axios.delete('/api/auth/redis');

    return Promise.reject(error);
  },
);
