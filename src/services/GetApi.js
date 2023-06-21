import { useContext, useEffect} from 'react';
import api from './api';
import { usePaginasContext } from '../contexts/Paginas';
import { DadosContext } from '../contexts/Dados';


export default function GetApi() {
  const {dados, setDados} = useContext(DadosContext);
  let {paginas} = usePaginasContext();


  useEffect(() => {
    api
      .get(`search?offset=${paginas}&limit=10&hidebroken=false`)
      .then((response) => setDados(response.data))

      
  }, [paginas]);
}

