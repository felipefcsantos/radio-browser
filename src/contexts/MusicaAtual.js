import { createContext, useContext, useState } from "react";

export const MusicaAtualContext = createContext();
MusicaAtualContext.displayName = 'MusicaAtual';

export default function MusicaAtualProvider({ children }) {
    const [musicaAtual, setMusicaAtual] = useState([]);

    return(
        <MusicaAtualContext.Provider
            value={{musicaAtual, setMusicaAtual}}>
                {children}
            </MusicaAtualContext.Provider>
    )
}

export function useMusicaAtualContext(){
    const {musicaAtual, setMusicaAtual} = useContext(MusicaAtualContext);
    // console.log(musicaAtual.url);
    return {
        musicaAtual,
        setMusicaAtual

    }
}

