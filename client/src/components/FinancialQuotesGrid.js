import { useState, useEffect } from "react"
import Typography from '@mui/material/Typography';
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from 'react-query';


const queryClient = new QueryClient();

export default function FinancialQuotesGrid(){

    const [ QuoteData, setQuoteData ] = useState([]);

    
    useEffect(() => {

        fetch('/test')
        .then(response => response.json())
        .then(data => setQuoteData(data))
        .catch(error => console.log(error))
        

    },[ setQuoteData ]);
    
    let asd = () => {
        console.log(QuoteData)
    }

    function Quotes() {

        // Access the cient
        //const queryClient = useQueryClient();

        // Queries
        const { isLoading, error, data } = useQuery('quotes', () =>

            fetch('/quotes/all').then(res =>
                res.json()
            )

        )


        return (
            <>
                 
                <button onClick={ () => console.log(data)}>
                    Test Query
                </button>
            </>
        )
    
    }

   
    return (
        <>
            <Typography variant='h4'>Finance Quotes</Typography>
            <button onClick={asd}>
                Test
            </button>

            <QueryClientProvider client={queryClient}>
                <Quotes/>
            </QueryClientProvider>
            

        </>
    )
}