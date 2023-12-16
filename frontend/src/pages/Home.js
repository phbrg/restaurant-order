import useApi from '../hooks/useApi'

import { useState } from "react"

const Home = () => {
  const [name, setName] = useState(null);
  const [table, setTable] = useState(null);

  const [error, setError] = useState(null);

  const api = useApi();
  let url = 'http://localhost:3001'
  const data = {name, table}

  const login = async (e) => {
    e.preventDefault();
    try {
      const registerUser = await api.fetchData(`${url}/`, 'POST', data);
      api.login(registerUser.token);
    } catch(err) {
      setError(err.message);
    }
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-background">
      {
        error && <p className='text-white'>{error}</p>
      }
    <form onSubmit={login} className="flex flex-col gap-4 w-64">
      <label className='p-1 flex flex-col items-start font-medium text-white'>
      Nome
      <input
        type="text"
        placeholder="Digite o nome"
        className="w-full p-2 text-background text-sm rounded-md border-none outline-none"
        onChange={(e) => setName(e.target.value)}
      />
      </label>
      <label className='p-1 flex flex-col items-start font-medium text-white'>
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