import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { MenuItem, Select, TextField, useTheme } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled } from '@mui/material/styles';
import { DadosContext } from '../contexts/Dados';
import api from '../services/api';
import { usePaginasContext } from '../contexts/Paginas';
import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CardMenu from '../components/CardMenu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Favorites from './Favorites';

const drawerWidth = 375;


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Home(props) {
    const { window } = props;
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { paginas, paginacao } = usePaginasContext()
    const [info, setInfo] = React.useState()
    const [option, setOption] = React.useState('country=')
    const { dados, setDados } = React.useContext(DadosContext);

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

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleDrawerClose = () => {
        setMobileOpen(false);
    };



    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    background: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h4" noWrap component="div">
                        Radio Browser
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <DrawerHeader sx={{ margin: '1rem .3rem' }}>
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
                        <DeleteOutlineIcon onClick={() => limpar()} sx={{ cursor: 'pointer' }}/>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider/>
                    <List>
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


                    {dados.map((event) => {

                        return (
                            <CardMenu key={event.changeuuid} dados={event} />
                        )
                    })}


                    <div style={{ display: 'flex', justifyContent: 'space-around', margin: '.5rem' }}>
                        <ArrowBackIosIcon
                            onClick={() => { paginacao('voltar') }}
                            sx={{ cursor: 'pointer' }}
                        />

                        {(paginas / 10) + 1}

                        <ArrowForwardIosIcon
                            onClick={() => { paginacao('avançar') }}
                            sx={{ cursor: 'pointer' }}
                        />
                    </div>
                </List>
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                     <DrawerHeader sx={{ margin: '1rem .3rem' }}>
                        <TextField
                            id="outlined-basic"
                            label="Pesquisar no Mundo"
                            variant="outlined"
                            value={info}
                            onChange={(e) => {setInfo(e.target.value)}}
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
                        <DeleteOutlineIcon onClick={() => limpar()} sx={{ cursor: 'pointer' }}/>
                    </DrawerHeader>
                    <Divider/>
                    <List>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            margin: '.5rem'
                        }}>
                        <ArrowBackIosIcon
                            onClick={() => { paginacao('voltar') }}
                            sx={{ cursor: 'pointer' }}
                        />

                        {(paginas / 10) + 1}

                        <ArrowForwardIosIcon
                            onClick={() => { paginacao('avançar') }}
                            sx={{ cursor: 'pointer' }}
                        />
                    </div>


                    {dados.map((event) => {

                        return (
                            <CardMenu key={event.changeuuid} dados={event} />
                        )
                    })}


                    <div style={{ display: 'flex', justifyContent: 'space-around', margin: '.5rem' }}>
                        <ArrowBackIosIcon
                            onClick={() => { paginacao('voltar') }}
                            sx={{ cursor: 'pointer' }}
                        />

                        {(paginas / 10) + 1}

                        <ArrowForwardIosIcon
                            onClick={() => { paginacao('avançar') }}
                            sx={{ cursor: 'pointer' }}
                        />
                    </div>
                </List>
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Typography paragraph>
                    <Favorites />
                </Typography>
            </Box>
        </Box>
    );
}

// HomeTeste.propTypes = {
//     window: PropTypes.func,
// };
