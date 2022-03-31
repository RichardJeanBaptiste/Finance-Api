import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Index(){

    const Styles = {
        linkStyle: {
            color:'blue',
            textDecoration: 'underline'
        },
        ApiCallStyle: {
            marginTop: '.6%',
            marginLeft: '1.5%'
        }
    }

    return (
        <>
            <Typography variant='h3' align='center' sx={{ marginTop: '3%', textDecoration:'underline'}}>Financial Quotes Api Reference</Typography>
            <Box sx={{ marginLeft: '1.5%'}}>
                <br/>
                <br/>
                <Typography variant='h4' >Access some of the greatest finance quotes from authors all over the world</Typography>
                <br/>

                <Typography variant='h5'>Get all quotes :</Typography>
                <Box sx={Styles.ApiCallStyle}>
                    <Typography variant='body1'>Api call:</Typography>
                    <Typography variant='body1' sx={Styles.linkStyle}>{'financequotesapi.herokuapp.com/quotes/all'}</Typography>
                </Box>
                <br/>


                <Typography variant='h5'>By Author Name :</Typography>
                <Box sx={Styles.ApiCallStyle}>
                    <Typography variant='body1'>Access all the quotes we have by specific author</Typography>
                    <Typography variant='body1'>Api call:</Typography>
                    <Typography variant='body1' sx={Styles.linkStyle}>{'financequotesapi.herokuapp.com/quotes/{author name} - (use only first and last name)'}</Typography>
                    <Typography variant='body1'>Get specific amount of quotes:</Typography>
                    <Typography variant='body1' sx={Styles.linkStyle}>{'financequotesapi.herokuapp.com/quotes/{author name}/limit={limit}'}</Typography>
                </Box>
                
                <br/>
                <Typography variant='h5'>Get random quote from author :</Typography>
                <Box sx={Styles.ApiCallStyle}>
                    <Typography variant='body1'>Api call:</Typography>
                    <Typography variant='body1' sx={Styles.linkStyle}>{'financequotesapi.herokuapp.com/quotes/{author name}/random'}</Typography>
                </Box>

                <br/>
                <Typography variant='h5'>Get random quote :</Typography>
                <Box sx={Styles.ApiCallStyle}>
                    <Typography variant='body1'>Api call:</Typography>
                    <Typography variant='body1' sx={Styles.linkStyle}>financequotesapi.herokuapp.com/quotes/all/random</Typography>
                    <Typography variant='body1'>Get specific amount of random quotes:</Typography>
                    <Typography variant='body1' sx={Styles.linkStyle}>{'financequotesapi.herokuapp.com/quotes/all/random/limit={limit}'}</Typography>
                </Box>
                
            </Box>
        </>
    )
}