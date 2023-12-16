import useApi from '../hooks/useApi'

const Menu = () => {
  const userToken = localStorage.getItem("token");

  if(!userToken) {
    window.location.href = `${window.location.origin}/`
  }

  const api = useApi();
  let url = 'http://localhost:3001'

  async function getMenu() {
    const menu = await api.fetchData(`${url}/menu`);
    return menu;
  };

    
  getMenu()
  .then((menu) => {
    menu.forEach((element) => {
      console.log(element);
    });
  }).catch((error) => {
    console.error('Erro ao obter o menu:', error);
  });

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-background">
        <header>
            <h2>Seja bem vindo, 
                <span className="text-yellow">Nome cliente</span>
            </h2>
        </header>
    </div>
  )
}

export default Menu