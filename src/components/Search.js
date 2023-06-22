import { MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import api from '../services/api';
import { DadosContext } from '../contexts/Dados';
import { usePaginasContext } from '../contexts/Paginas';

export default function Search() {
    const { dados, setDados } = React.useContext(DadosContext);
    const { paginas} = usePaginasContext()
    const [option, setOption] = React.useState('country=')
    const [info, setInfo] = React.useState()

    function titleize() {
        var words = info.toLowerCase().split(" ");
        for (var a = 0; a < words.length; a++) {
            var w = words[a];
            words[a] = w[0].toUpperCase() + w.slice(1);
        }
        return pesquisar(words.join(" "));
    }

    function pesquisar(info) {

        api
            .get(`search?${option}${option === 'language=' ? info.toLowerCase() : info}&offset=${paginas}&limit=10&hidebroken=false`)
            .then((response) => setDados(response.data))
        setInfo('')
    }

    function limpar() {
        setInfo('')
        setOption('')
        return (pesquisar(info))

    }

    return (
        <div>
            <TextField
                id="outlined-basic"
                label="Pesquisar"
                variant="outlined"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
            />
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={option}
                help
                onChange={(e) => setOption(e.target.value)}
            >

                <MenuItem value='country='>
                    País
                </MenuItem>
                <MenuItem value='language='>
                    Lingua
                </MenuItem>
                <MenuItem value='name='>
                    Nome
                </MenuItem>
            </Select>

            <SearchIcon onClick={() => titleize()} sx={{ cursor: 'pointer' }} />
            <DeleteOutlineIcon onClick={() => limpar()} sx={{ cursor: 'pointer' }} /></div>
    )
}
