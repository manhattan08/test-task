import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {usePokeApi} from "../api/pokeapi";
import { POKE_API_URL} from "../utils/consts";
import Loading from "../components/Loading/Loading";
import Header from "../components/Header/Header";
import SectionName from "../components/SectionName/SectionName";
import Essentials from "../components/Essentials/Essentials";
import Sprites from "../components/Sprites/Sprites";
import MovesTable from "../components/MovesTable/MovesTable";

const Details = () => {
    const {name}= useParams();
    const navigate = useNavigate();
    const [loading,data,error] = usePokeApi(`${POKE_API_URL}pokemon/${name}`)

    if(!data) return <Loading />

    return (
        <>
            {data &&
                <div className={"container"}>
                    <Header title={data.name} />
                    <main className={"infoMain"}>
                        <SectionName text={"Essentials"} />
                        <Essentials pokemon={data} />
                        <SectionName text={'Sprites'}/>
                        <Sprites sprites={data.sprites} />
                        <SectionName text={'Moves'}/>
                        <MovesTable moves={data.moves} />
                    </main>
                </div>
            }
        </>
    );
};

export default Details;