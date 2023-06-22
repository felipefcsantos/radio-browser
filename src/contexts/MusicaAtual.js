import { createContext, useState } from "react";

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


