import { useParams } from "react-router-dom";

export default function Test(props){

    const { userId } = useParams();

    let x;

    if(props.default === true){
        x = 'default';
    }else{
        x = userId;
    }

    return (
        <>
            <h1>{x}</h1>
        </>
    )
}