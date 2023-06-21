import { createContext, useContext, useState } from "react";

export const PaginasContext = createContext(0);
PaginasContext.displayName = "Paginas";

export default function PaginasProvider({children}){
    const [paginas, setPaginas] = useState(0);

    return(
        <PaginasContext.Provider
            value={{paginas, setPaginas}}>
            {children}
        </PaginasContext.Provider>
    )
}

export function usePaginasContext(){
    let {paginas, setPaginas} = useContext(PaginasContext);

    function paginacao(action){
        if (action === 'avançar') {
           
            setPaginas(paginas += + 10)
        }else{
         
            setPaginas(paginas += - 10)
        }

    }

    return{
        paginas, paginacao
    }
}