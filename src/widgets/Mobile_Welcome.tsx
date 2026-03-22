import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"
import Desktop_IconButton from "../components/Desktop_IconButton"

function Mobile_Welcome() {
  return (
    <section className="text-left">
      <div>  
        <h2 className="text-[1.3rem] font-medium">Saudações! Me chamo</h2>
        <h1 className="text-[1.8rem] font-bold text-violet-400 motion-preset-typewriter-[50]">Emanuel Phillipe.</h1>
      </div>
      <div className="mt-8">
        <p className="text-zinc-300 text-[1rem]">Neste sistema, você conhecerá a minha, ainda em andamento, trajetória profissional e acadêmica e terá acesso a informações importantes. Aqui, representei meus três principais dilemas, os quais levo para minha vida profissional:</p>
        <div className="mt-8 grid grid-rows-2 grid-cols-2 justify-start gap-4">
          <span className="py-2 px-5 rounded-full bg-zinc-800 text-zinc-300 hover:motion-preset-pulse font-semibold w-full text-center">Inovação</span>
          <span className="py-2 px-5 rounded-full bg-zinc-800 text-zinc-300 hover:motion-preset-pulse font-semibold w-full text-center">Minimalismo</span>
          <span className="py-2 px-5 col-span-2 row-start-2 rounded-full bg-zinc-800 text-zinc-300 hover:motion-preset-pulse font-semibold w-full text-center">Criatividade</span>
        </div>
      </div>
      <div className="mt-12 mb-36 flex justify-start gap-6 text-zinc-400">
        <Desktop_IconButton icon={<GithubLogoIcon size={30}/>} link="https://github.com/emanuel-phillipe"/>
        <Desktop_IconButton icon={<InstagramLogoIcon size={30}/>} link="https://www.instagram.com/emanuel.phillipe"/>
        <Desktop_IconButton icon={<LinkedinLogoIcon size={30}/>} link="https://www.linkedin.com/in/emanuel-phillipe/"/>
      </div>
    </section>
  )
}

export default Mobile_Welcome