axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const err = error;
    if (err.response?.status === 401) {
      debugger;
      localStorage.setItem('isLogin', false);
      axios.delete('/api/auth/redis');
      window.location.href = '/view/login';
    }

    return Promise.reject(error);
  },
);
