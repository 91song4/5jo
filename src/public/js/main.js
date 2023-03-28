axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const err = error;
    if (err.response?.status === 401) {
      debugger;
      localStorage.setItem('isLogin', false);
      window.location.href = '/view/login';
    }
    debugger;
    axios.delete('/api/auth/redis');

    return Promise.reject(error);
  },
);
