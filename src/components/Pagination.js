import React from 'react'
import { usePaginasContext } from '../contexts/Paginas';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Pagination() {
    const { paginas, paginacao } = usePaginasContext()
  return (
    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            margin: '.5rem'
                        }}>
                        <ArrowBackIosIcon
                            onClick={() =>  {paginacao('voltar')} }
                            sx={{ cursor: 'pointer' }}
                        />

                        {(paginas / 10) + 1}

                        <ArrowForwardIosIcon
                            onClick={() =>  {paginacao('avançar')} }
                            sx={{ cursor: 'pointer' }}
                        />
                    </div>
  )
}
