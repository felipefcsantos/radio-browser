import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FavoritosProvider from './contexts/Favoritar'
import PaginasProvider from './contexts/Paginas'
import MusicaAtualProvider from './contexts/MusicaAtual'
import TocandoProvider from './contexts/Tocando'
import EditarNomeProvider from './contexts/EditarNome'
import DadosProvider from './contexts/Dados'
import GetApi from './services/GetApi'
import Home from './pages/Home'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <DadosProvider>
                <PaginasProvider>
                    <GetApi />
                    <MusicaAtualProvider>
                        <TocandoProvider>
                            <FavoritosProvider>
                                <EditarNomeProvider>
                                    <Routes>
                                        <Route path='/' element={<Home />} />
                                    </Routes>
                                </EditarNomeProvider>
                            </FavoritosProvider>
                        </TocandoProvider>
                    </MusicaAtualProvider>
                </PaginasProvider>
            </DadosProvider>
        </BrowserRouter>
    )
}
