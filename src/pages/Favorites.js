import React, { useContext, useState } from 'react'
import { MusicaAtualContext } from '../contexts/MusicaAtual';
import CardFavoritos from '../components/CardFavoritos';
import { Box, Container, Divider, MenuItem, Select, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RadioIcon from '@mui/icons-material/Radio';


export default function Favorites() {
  const { musicaAtual } = useContext(MusicaAtualContext)
  const [info, setInfo] = useState()
  const [options, setOptions] = useState('pais')
  const [favoritos, setFavoritos] = useState()
  const [clear, setClear] = useState(false)
  const keys = Object.keys(localStorage);


  function pesquisa() {


    if (options === 'pais') {
      const novaLista = keys.filter(e => JSON.parse(localStorage.getItem(e)).pais === info)
      setFavoritos(novaLista)

    }
    if (options === 'lingua') {
      const novaLista = keys.filter(e => JSON.parse(localStorage.getItem(e)).lingua === info)
      setFavoritos(novaLista)

    }
    if (options === 'nome') {
      const novaLista = keys.filter(e => JSON.parse(localStorage.getItem(e)).nome === info)
      setFavoritos(novaLista)

    }

    setClear(true)
  }

  function limpar() {
    setClear(false)
  }



  return (
    <Container sx={{ background: 'linear-gradient(135deg, #fcfcfc 0%, #c2d9f0 100%)', borderRadius: '10px', padding: '1rem', boxShadow: '3px 3px 7px 1px #000000' }}>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <RadioIcon />
            <Typography variant='h4'>
              Favorite Radios
            </Typography>
          </div>
          <div >
            <TextField
              id="outlined-basic"
              label="Pesquisar Favoritos"
              variant="outlined"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={options}
              help
              onChange={(e) => setOptions(e.target.value)}
            >

              <MenuItem value='pais'>
                País
              </MenuItem>
              <MenuItem value='lingua'>
                Lingua
              </MenuItem>
              <MenuItem value='nome'>
                Nome
              </MenuItem>
            </Select>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
              <SearchIcon onClick={() => pesquisa()} sx={{ cursor: 'pointer' }} />
              <DeleteOutlineIcon onClick={() => limpar()} sx={{ cursor: 'pointer' }} />
            </div>
          </div>

        </div>
        <Box

          sx={{
            background: '#ffffff',
            borderRadius: '10px',
            padding: '1rem',
            boxShadow: '1px 1px 5px 1px #dedede',
            margin: '1rem 0',
            minHeight: '6rem',
            display: 'flex',
            alignItems: 'center'
          }}>
          <Typography variant='h4'>

            {musicaAtual.nome ? musicaAtual.nome : <Typography variant='h4' sx={{color: '#dedede'}}> Rádio Atual </Typography>}

          </Typography>
        </Box>

      </div>

      <Divider />

      {clear ? favoritos.map((fav) => {
        return <CardFavoritos {...JSON.parse(localStorage.getItem(fav))} key={fav} />
      }) : keys.map((fav) => {
        return <CardFavoritos {...JSON.parse(localStorage.getItem(fav))} key={fav} />
      })}
    </Container>
  )
}
