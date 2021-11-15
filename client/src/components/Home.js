import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


export default function Home(){

    let navigate = useNavigate();

    // es-lint-disable-next-line
    const { username } = useParams();

    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/admin/checklogin',{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({username: username})  
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            setIsLoggedIn(data)
        });

        // es-lint-disable-next-line
    },[username]);


    if(isLoggedIn === 'true'){
        return (
            <Box>
                <h1>Admin Home</h1>
            </Box>
        )
    }else{
        return (
            <Box>
                <h1>Not Logged In</h1>
                <Button variant="outlined" onClick={() => navigate("/login")}>Login</Button>
            </Box>
        )
    }
    
    
}