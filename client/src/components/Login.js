import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Login(props) {

    const DisplayError = () => {
        return (props.failLogin ? 'block' : 'none');
    }

    const Styles = {
        root: {
            position:'absolute',
            top:'50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
        },
        cardRoot: {
            width: '30em',
            height: '35em'
        },
        failStyle: {
            display: DisplayError(),
            color: 'red',
        }
    }

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    return (
        <Box sx={Styles.root}>
            <Card sx={Styles.cardRoot}>
                <CardContent sx={{
                    display:'flex',
                    flexDirection: 'column',
                    marginTop: '15%'
                }}>
                    <Typography align='center'>Login</Typography>
                    <Typography sx={Styles.failStyle} align='center'> Username or Password is Incorrect</Typography>
                    <form method='POST' action='http://localhost:4000/admin/login'>
                        <TextField 
                            id="username"
                            name="username"
                            label="Username"
                            value={username}
                            onChange={handleUsername}
                            sx={{ marginTop: '2%', marginLeft:'6%', width: '24em'}}
                        />

                        <TextField
                            id="password"
                            label="Password"
                            name="password"
                            value={password}
                            onChange={handlePassword}
                            type='password'
                            sx={{ marginTop: '4%', marginLeft: '6%', width:'24em'}}
                        />

                        <Button variant='contained' type='submit'
                            sx={{
                                marginTop: '4%',
                                marginLeft: '60%',
                                width: '10em'
                            }}
                        >Login
                        </Button>
                    </form>
                    
                </CardContent>
            </Card>
        </Box>
    )
}