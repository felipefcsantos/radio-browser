import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FavoritosProvider from './contexts/Favoritar'
import PaginasProvider from './contexts/Paginas'
import MusicaAtualProvider from './contexts/MusicaAtual'
import TocandoProvider from './contexts/Tocando'
import DadosProvider from './contexts/Dados'
import GetApi from './services/GetApi'
import Home from './pages/Home'
import MusicaParalelaProvider from './contexts/MusicaParalela'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <DadosProvider>
                <PaginasProvider>
                    <GetApi />
                    <MusicaAtualProvider>
                        <MusicaParalelaProvider>
                            <TocandoProvider>
                                <FavoritosProvider>
                                    <Routes>
                                        <Route path='/' element={<Home />} />
                                    </Routes>
                                </FavoritosProvider>
                            </TocandoProvider>
                        </MusicaParalelaProvider>
                    </MusicaAtualProvider>
                </PaginasProvider>
            </DadosProvider>
        </BrowserRouter>
    )
}
