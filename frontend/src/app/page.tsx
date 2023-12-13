export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-background">
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Digite o nome" className="p-2 text-sm font-semibold rounded-md border-none outline-none" />
        <input type="text" placeholder="Digite a mesa" className="p-2 text-sm font-semibold rounded-md border-none outline-none" />
        <input type="submit" value="Ir pra o menu" className="p-2 text-sm w-full font-semibold bg-yellow text-white font-semibol border-none rounded-md cursor-pointer" />
      </form>
    </div>
  )
}