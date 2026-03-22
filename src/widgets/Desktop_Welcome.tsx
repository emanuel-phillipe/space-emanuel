import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"
import Desktop_IconButton from "../components/Desktop_IconButton"

function Desktop_Welcome() {
  return (
    <section className="text-right w-160">
      <div>  
        <h2 className="text-[1.3rem] font-medium">Saudações! Me chamo</h2>
        <h1 className="text-[2rem] font-bold text-violet-400 motion-preset-typewriter-[24]">Emanuel Phillipe.</h1>
      </div>
      <div className="mt-12">
        <p className="text-zinc-300 text-[1.1rem]">Neste sistema, você conhecerá a minha, ainda em andamento, trajetória profissional e acadêmica e terá acesso a informações importantes. Aqui, representei meus três principais dilemas, os quais levo para minha vida profissional:</p>
        <div className="mt-8 flex justify-end gap-4">
          <span className="py-2 px-5 rounded-full bg-zinc-900 text-zinc-400 hover:motion-preset-pulse font-semibold">Inovação</span>
          <span className="py-2 px-5 rounded-full bg-zinc-900 text-zinc-400 hover:motion-preset-pulse font-semibold">Minimalismo</span>
          <span className="py-2 px-5 rounded-full bg-zinc-900 text-zinc-400 hover:motion-preset-pulse font-semibold">Criatividade</span>
        </div>
      </div>
      <div className="mt-20 flex justify-end gap-6 text-zinc-500">
        <Desktop_IconButton icon={<GithubLogoIcon size={36}/>} link="https://github.com/emanuel-phillipe"/>
        <Desktop_IconButton icon={<InstagramLogoIcon size={36}/>} link="https://www.instagram.com/emanuel.phillipe"/>
        <Desktop_IconButton icon={<LinkedinLogoIcon size={36}/>} link="https://www.linkedin.com/in/emanuel-phillipe/"/>
      </div>
    </section>
  )
}

export default Desktop_Welcome