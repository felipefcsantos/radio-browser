import { createContext, useContext, useRef, useState } from "react";
import { MusicaAtualContext } from "./MusicaAtual";
import { useMusicaParalelaContext } from "./MusicaParalela";

export const TocandoContext = createContext();
TocandoContext.displayName = 'Tocando';

export default function TocandoProvider({ children }) {
    const [tocando, setTocando] = useState();

    return(
        <TocandoContext.Provider
            value={{tocando, setTocando}}>
                {children}
            </TocandoContext.Provider>
    )
}

export function useTocandoContext(){

    const {tocando, setTocando} = useContext(TocandoContext);
    const {musicaAtual, setMusicaAtual} = useContext(MusicaAtualContext)
    const {musicaParalela, setMusicaParalela, parar} = useMusicaParalelaContext()
    const [oldUrl, setOldUrl] = useState()
    const songRef = useRef()
    
    function tocandoMusica(id, url, nome){


        if (musicaAtual.nome !== nome && musicaAtual.nome !== undefined) {
            parar()
        }

        setTocando(id)
        if (oldUrl !== url) {
            songRef.current = new Audio(url)
            songRef.current.play()
            setOldUrl(url)
            setMusicaParalela(songRef.current)
            
        } else {
            songRef.current.pause()
            setOldUrl(undefined)
            setTocando('')
        }
        setMusicaAtual({id, url, nome})

    
    }
    return {
        tocando,
        tocandoMusica
    }
}

