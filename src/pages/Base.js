import React from 'react'
import DadosProvider from '../contexts/Dados'
import PaginasProvider from '../contexts/Paginas'
import GetApi from '../services/GetApi'
import MusicaAtualProvider from '../contexts/MusicaAtual'
import MusicaParalelaProvider from '../contexts/MusicaParalela'
import TocandoProvider from '../contexts/Tocando'
import FavoritosProvider from '../contexts/Favoritar'
import { Outlet } from 'react-router-dom'

export default function Base() {
    return (
        <>
            <DadosProvider>
                <PaginasProvider>
                    <GetApi />
                    <MusicaAtualProvider>
                        <MusicaParalelaProvider>
                            <TocandoProvider>
                                <FavoritosProvider>
                                    <Outlet />
                                </FavoritosProvider>
                            </TocandoProvider>
                        </MusicaParalelaProvider>
                    </MusicaAtualProvider>
                </PaginasProvider>
            </DadosProvider>
        </>
    )
}
