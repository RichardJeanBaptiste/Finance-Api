import { useState, useEffect } from "react"
import Typography from '@mui/material/Typography';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

export default function FinancialQuotesGrid(){

    //const queryClient = new QueryClient();

    const [ QuoteData, setQuoteData ] = useState([]);

    
    useEffect(() => {

        fetch('/quotes/all')
        .then(response => response.json())
        .then(data => setQuoteData(data))
        .catch(error => console.log(error))
        

    },[ setQuoteData ]);
    
    let asd = () => {
        console.log(QuoteData)
    }

   
    return (
        <>
            <Typography variant='h4'>Finance Quotes</Typography>
            <button onClick={asd}>
                Test
            </button>

        </>
    )
}