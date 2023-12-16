import { ShoppingCart } from 'lucide-react'

const Menu = () => {
  return (
    <div className="min-w-full p-2 min-h-screen flex flex-col bg-white">
        <header className="p-2 flex items-start justify-between border-b-2 border-gray-100">
            <h1 className="text-lg font-semibold">Seja bem vindo,
                <span className="text-yellow"> Nome cliente</span>
            </h1>
            <div className='cursor-pointer' onClick={() => console.log('click')}>
              <ShoppingCart color="#929292" size={24} />
            </div>
        </header>
        <nav className='p-2 gap-2 flex flex-wrap'>
          <button className='bg-yellow text-white p-1 font-semibold rounded-md transition-all hover:scale-105'>categoria</button>
          <button className='bg-yellow text-white p-1 font-semibold rounded-md transition-all hover:scale-105'>categoria</button>
          <button className='bg-yellow text-white p-1 font-semibold rounded-md transition-all hover:scale-105'>categoria</button>
          <button className='bg-yellow text-white p-1 font-semibold rounded-md transition-all hover:scale-105'>categoria</button>
          <button className='bg-yellow text-white p-1 font-semibold rounded-md transition-all hover:scale-105'>categoria</button>
        </nav>
    </div>
  )
}

export default Menu