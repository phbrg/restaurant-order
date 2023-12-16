import useApi from '../hooks/useApi'

import { useState } from "react"
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [name, setName] = useState(null);
  const [table, setTable] = useState(null);

  const [error, setError] = useState(null);

  const api = useApi();
  let url = 'http://localhost:3001'
  const data = {name, table};

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    if(!name || !table) {
      setError('Credenciais invalidas');
      return;
    }

    if(name.length > 255) {
      setError('Nome muito longo');
      return;
    }

    try {
      const registerUser = await api.fetchData(`${url}/`, 'POST', data);
      localStorage.setItem("token", registerUser.token);
      navigate('/menu');
    } catch(err) {
      const message = JSON.parse(err.message)
      setError(message.message);
    }
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-background">
      {
        error && <p className='text-white'>{error}</p>
      }
    <form onSubmit={login} className="flex flex-col gap-4 w-64">
      <label className='pl-1 flex flex-col items-start font-medium text-white'>
      <span>Nome</span>
      <input
        type="text"
        placeholder="Digite o nome"
        className="w-full p-2 text-background text-sm rounded-md border-none outline-none"
        onChange={(e) => setName(e.target.value)}
      />
      </label>
      <label className='pl-1 flex flex-col items-start font-medium text-white'>
      Mesa
      <input
        type="number"
        placeholder="Digite a mesa"
        className="w-full p-2 text-background text-sm rounded-md border-none outline-none"
        onChange={(e) => setTable(e.target.value)}
      /></label>
      <input
        type="submit"
        value="Acessar o menu"
        className="p-2 text-sm w-full font-semibold bg-yellow text-white font-semibol border-none rounded-md cursor-pointer"
      />
    </form>
  </div>
  )
}

export default Home