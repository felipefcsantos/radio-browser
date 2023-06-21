import React, { useState } from 'react'
import playIcon from '../assets/play.svg'
import stop from '../assets/stop.svg'
import { useTocandoContext } from '../contexts/Tocando'
import favoritar from '../assets/favorito.svg'
import desfavorito from '../assets/desfavorito.svg'
import { useFavoritoContext } from '../contexts/Favoritar'
import { Box } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

export default function CardFavoritos({ id, url, nome, pais, lingua }) {
  const { favorito, adicionarFavorito } = useFavoritoContext()
  const [toggle, setToggle] = useState(true)
  const { tocando, tocandoMusica } = useTocandoContext()
  const keys = Object.keys(localStorage);
  const ehFavorito = keys.some((fav) => fav === id);
  const icone = ehFavorito ? favoritar : desfavorito;
  const [nomeEditavel, setNomeEditavel] = useState(nome)



  function edicao(novoNome) {

    setNomeEditavel(novoNome)
    localStorage.removeItem(id)
    const object =
    {
      'id': id,
      'url': url,
      'nome': novoNome,
      'pais': pais,
      'lingua': lingua

    }
    localStorage.setItem(id, JSON.stringify(object))


  }

  return (

    <Box sx={{ display: 'flex', justifyContent: 'space-between',  borderRadius: '5px', alignItems: 'center' , margin: '.5rem 0', boxShadow: '1px 1px 5px 1px #525252'}}>
      <div style={{display: 'flex'}}>
        <img
          src={tocando === id ? stop : playIcon}
          alt='Play'
          onClick={() => tocandoMusica(id, url, nomeEditavel)}
          style={{margin: '0 2rem'}}
        />

        {!toggle ? <input style={{ borderRadius: '3px', fontSize: '1.5rem', margin: '1.5rem 0'}} value={nomeEditavel} onChange={(e) => { edicao(e.target.value) }} /> : <h2>{nomeEditavel}</h2>}
      </div>

      <div style={{display: 'flex'}}>
        <img
          src={icone}
          alt='Favoritar'
          onClick={() => { adicionarFavorito({ id, url, nomeEditavel }) }}
          style={{margin: '0 .5rem'}}
        />
        <button style={{ background: 'none', border: 'none', width: '2rem', margin: '0 .5rem' }} onClick={() => { setToggle(!toggle) }}>{toggle ? <EditIcon /> : <CheckIcon />}</button>
      </div>
    </Box>

  )
}
