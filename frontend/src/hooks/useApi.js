import { useState, useEffect } from 'react';

const useApi = () => {
  const localToken = localStorage.getItem('token');
  const [token, setToken] = useState(localToken);

  const logout = () => {
    setToken(() => null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else if (localToken) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }, [token, localToken]);

  const fetchData = async (url, method = 'GET', data = null) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else if (localToken) {
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
        throw new Error(JSON.stringify({ status: res.status, message: result.message }));
      }
      
      return result;
    } catch (err) {
      console.error(`Error in request to ${url} with method ${method}:`, err);
      throw err;
    }
  };

  return {
    token,
    logout,
    fetchData,
  };
};

export default useApi;