import React from 'react';
import style from "../Essentials/Essentials.module.css";
import pokeBall from "../../assets/pokeball.png";
import Abilities from "../Abilities/Abilities";
import StatsChart from "../StatsChart/StatsChart";

const Essentials = ({pokemon}) => {
    return (
        <div className={style.essentials}>
            <div className={style.imageContainer}>
                <h3>{pokemon.name}</h3>
                <img
                    loading="lazy"
                    key={pokemon.sprites.front_default}
                    src={pokemon.sprites.front_default ? pokemon.sprites.front_default :  pokeBall}/>
                <div className={"pokemonTypes"}>
                    {pokemon.types.map(item =>
                        <span
                            style={{
                            background:`var(--${item.type.name.toLowerCase()})`
                            }}
                              key={item.type.name}
                        >{item.type.name}</span>
                    )}
                </div>
                <div>
                    <div><b>Height</b> - {pokemon.height/10}m</div>
                    <div><b>Height</b> - {pokemon.weight/10}kg</div>
                </div>
            </div>
            <Abilities abilities={pokemon.abilities} />
            <StatsChart stats={pokemon.stats} />
        </div>
    );
};

export default Essentials;