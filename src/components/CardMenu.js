import React from 'react'
import {  Box, Button,   Divider,   List,   ListItem, Typography} from '@mui/material';
import favoritar from '../assets/favorito.svg'
import desfavorito from '../assets/desfavorito.svg'
import playIcon from '../assets/play.svg'
import stop from '../assets/stop.svg'
import { useFavoritoContext } from '../contexts/Favoritar';
import { useTocandoContext } from '../contexts/Tocando';

export default function CardMenu({ dados}) {

    const {favorito, adicionarFavorito} = useFavoritoContext()
    const {tocando, tocandoMusica} = useTocandoContext()
    const keys = Object.keys(localStorage);
    const id = dados.changeuuid
    const url = dados.url_resolved
    const pais = dados.country
    const lingua = dados.language
    let nome = dados.name.trim()
    const ehFavorito = keys.some((fav) => fav === id);
    const icone = ehFavorito ? favoritar : desfavorito;

    if (!nome || nome === "     " || nome === "" || nome === "    ") {
        nome = 'No Name'
    }

        return (
            <div>
                <Box 
                    sx={{ flexGrow: 1, 
                        width: { sm: '100vw' }, 
                        maxWidth: '320px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        padding: '1rem' 
                    }}>
                        <h3>{nome}</h3>

                    <List >
                        <ListItem>
                            <Button
                                onClick={() => tocandoMusica(id, url, nome)}>
                                <img
                                    src={tocando===id ?  stop : playIcon}
                                    alt='Icone de play'
                                    sx={{ width: "2rem", textAlign: 'center' }}
                                />
                            </Button>
                            <img
                                src={icone}
                                alt='Favoritar'
                                onClick={() => {adicionarFavorito({id, url, nome, pais, lingua})}}
                            />
                        </ListItem>
                    </List>
                </Box>
                <Divider sx={{ width: '375px' }} />
            </div>
        )
    }
