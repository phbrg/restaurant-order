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
      const res = await fetch(url, config);

      if (!res.ok) {
        throw new Error(`Erro: ${res.status}`);
      }

      const result = await res.json();
      
      return result;
    } catch (err) {
      console.error('Erro na solicitação:', err.message);
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
