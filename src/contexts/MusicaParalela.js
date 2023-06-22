import { createContext, useContext, useRef, useState } from "react";

export const MusicaParalelaContext = createContext(0);
MusicaParalelaContext.displayName = "MusicaParalela";

export default function MusicaParalelaProvider({children}){
    const [musicaParalela, setMusicaParalela] = useState(0);

    return(
        <MusicaParalelaContext.Provider
            value={{musicaParalela, setMusicaParalela}}>
            {children}
        </MusicaParalelaContext.Provider>
    )
}

export function useMusicaParalelaContext(){
    const {musicaParalela, setMusicaParalela} = useContext(MusicaParalelaContext);

    function parar() {
        musicaParalela.pause()
    }

    return{
        musicaParalela, setMusicaParalela, parar
    }
}