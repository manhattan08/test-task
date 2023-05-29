import {useEffect, useState} from "react";
import axios from "axios";


export function usePokeApi(url){
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const controller = new AbortController();
        setLoading(true)

        axios.get(url,{
            signal:controller.signal
        })
            .then(res => setData(res.data))
            .catch(e => setError(e.message))
            .finally(()=> setLoading(false))

        return () => {
            controller.abort();
        }
    },[url])

    return [loading, data, error]
}
