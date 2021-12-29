import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FaceIcon from '@mui/icons-material/Face';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import FinancialQuotesGrid from './FinancialQuotesGrid';

/**
 * Create Seperate Components For Each Database
 * Switch Between Components On Click
 * Import Quote Database
 * Display Database with mui/Grid
 * Add Grid Actions
 */


export default function Admin() {

    let drawerWidth = '200px';

    const [ CurrentDatabase, setCurrentDatabase ] = useState("Database");

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection:'column'}}>

                <AppBar sx={{ height: '80px'}}>
                    <Typography align='center' sx={{marginTop:'1.5%'}}>{CurrentDatabase}</Typography>
                </AppBar>

                <Box sx={{ marginLeft: '47.5%', marginTop: '8%'}}>
                    <Typography variant='h5'>Collection</Typography>
                    <FinancialQuotesGrid/>
                </Box>
            </Box>
            <Box>
                <Drawer
                    sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                <Toolbar />
                    <List>
                        <ListItem>
                            <ListItemText primary={<Typography variant='h4'>Databases</Typography>} />
                        </ListItem>
                    </List>
                <Divider />
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <AttachMoneyIcon/>
                            </ListItemIcon>
                        <ListItemText primary='Finance Quotes' />
                        </ListItem>
                    </List>
                <Divider />
                    <List>
                        <ListItem button>
                            {/* List Item Icon*/}
                            <ListItemIcon>
                                <FaceIcon/>
                            </ListItemIcon>
                        <ListItemText primary='Animated Quotes' />
                        </ListItem>
                    </List>
                <Divider />
                    <List>
                        <ListItem button>
                            {/* List Item Icon*/}
                            <ListItemIcon>
                                <MenuBookIcon/>
                            </ListItemIcon>
                        <ListItemText primary='Modern Wisdom Quotes' />
                        </ListItem>
                    </List>
                </Drawer>
            </Box>
        </>
    )
}

