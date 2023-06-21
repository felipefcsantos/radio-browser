import { createContext, useContext, useRef, useState } from "react";
import { useMusicaAtualContext } from "./MusicaAtual";

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
    const {musicaAtual, setMusicaAtual} = useMusicaAtualContext()
    const [oldUrl, setOldUrl] = useState()
    const songRef = useRef()
    
    function tocandoMusica(id, url, nome){
        

        
        setTocando(id)
        if (oldUrl !== url) {
            songRef.current = new Audio(url)
            songRef.current.play()
            setOldUrl(url)
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

