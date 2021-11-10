import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Index(){

    const Styles = {
        linkStyle: {
            color:'blue',
            textDecoration: 'underline'
        }
    }

    return (
        <Box>
            <Typography variant='h3'>Financial Quotes Api Reference</Typography>
            <br/>
            <br/>
            <Typography variant='h4'>Access some of the greatest finance quotes from authors all over the world</Typography>
            <br/>
            <Typography variant='h5'>By Author Name</Typography>
            <Typography variant='body1'>Access all the quotes we have by specific author</Typography>
            <Typography variant='body1'>Api call:</Typography>
            <Typography variant='body1' sx={Styles.linkStyle}>{'financequotesapi.herokuapp.com/quotes/{author name} - (use only first and last name)'}</Typography>
            <Typography variant='body1'>Get specific amount of quotes:</Typography>
            <Typography variant='body1' sx={Styles.linkStyle}>{'financequotesapi.herokuapp.com/quotes/{author name}/limit={limit}'}</Typography>
            <br/>
            <Typography variant='h5'>Get random quote from author</Typography>
            <Typography variant='body1'>Api call:</Typography>
            <Typography variant='body1' sx={Styles.linkStyle}>{'financequotesapi.herokuapp.com/quotes/{author name}/rand'}</Typography>
            <br/>
            <Typography variant='h5'>Get random quote</Typography>
            <Typography variant='body1'>Api call:</Typography>
            <Typography variant='body1' sx={Styles.linkStyle}>financequotesapi.herokuapp.com/quotes/random/qr</Typography>
        </Box>
    )
}