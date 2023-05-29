import React, {useState} from 'react';
import Header from "../components/Header/Header";
import {useContext, useEffect} from "react";
import {AuthContext} from "../utils/AuthContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { SERVER_API} from "../utils/consts";
import PokeList from "../components/PokeList/PokeList";

const FavPokemons = () => {
    const [data,setData] = useState(null)
    let { isAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect( ()=>{
        if(!isAuth)
            navigate("/")
        const id = window.localStorage.getItem("id")
        if(id) {
            axios.get(`${SERVER_API}pokemon/getFavouritePokemons/${id}`).then((res) => setData(res?.data?.pokemons))
        }
    },[])

    const favPoki = data?.map((i) => i.name)

    return (
        <>
            <div className={"container"}>
                <Header title={window.localStorage.getItem("username")} />
                    <main style={{width:"100%"}}  className={"container"}>
                            <PokeList search={false} data={data} favPoki={favPoki}/>
                    </main>

            </div>
        </>
    );
};

export default FavPokemons;