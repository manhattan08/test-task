import React from 'react';
import style from "../Abilities/Abilities.module.css"
import AbilitiesItem from "./AbilitiesItem";

const Abilities = ({abilities}) => {
    return (
        <div className={style.abilitiesContainer}>
            <h3>Abilities</h3>
            <div className={style.line} />
            {
                abilities.map(ability =>{
                    if(!ability.is_hidden)
                        return <AbilitiesItem key={ability.ability.name} ability={ability} />
                })
            }

            <h4>Hidden Abilities</h4>
            <div className={style.line} />
            {

                abilities.map(ability =>{
                    if(ability.is_hidden)
                        return <AbilitiesItem key={ability.ability.name} ability={ability} />
                })
            }
        </div>
    );
};

export default Abilities;