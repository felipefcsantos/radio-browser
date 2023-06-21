import { createContext, useContext, useRef, useState } from "react";
import { useMusicaAtualContext } from "./MusicaAtual";

export const EditarNomeContext = createContext();
EditarNomeContext.displayName = 'EditarNome';

export default function EditarNomeProvider({ children }) {
    const [editarNome, setEditarNome] = useState();

    return(
        <EditarNomeContext.Provider
            value={{editarNome, setEditarNome}}>
                {children}
            </EditarNomeContext.Provider>
    )
}

export function useEditarNomeContext(){
    const {editarNome, setEditarNome} = useContext(EditarNomeContext);

    
    return {
        editarNome,
        setEditarNome
    }
}

