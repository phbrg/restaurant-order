import { useState } from 'react';

const useApi = () => {
  const [token, setToken] = useState(null);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  const fetchData = async (url, method = 'GET', data = null) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      method,
      headers,
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      let res = await fetch(url, config);
      let result = await res.json();

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${result.message}`);
      }
      
      return result;
    } catch (err) {
      console.error('Erro na solicitação:', err);
      throw err;
    }
  };

  return {
    token,
    login,
    logout,
    fetchData,
  };
};

export default useApi;
