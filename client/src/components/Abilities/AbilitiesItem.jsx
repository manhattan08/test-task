import React from 'react';
import style from "../Abilities/Abilities.module.css";
import {usePokeApi} from "../../api/pokeapi";

const AbilitiesItem = ({ability}) => {

    const [loading,data,error] = usePokeApi(ability.ability.url)
    
    return (
        <>
            {data &&
                <div className={style.abilityItem}>
                    <div>
                        <p className={style.abilityName}>{data.name}</p>
                        {
                            data.effect_entries.map(item =>
                                <span key={data.name} className={style.abilityItem}>
                                    {item.effect}
                                </span>
                            )
                        }
                    </div>
                </div>
            }
        </>
    );
};

export default AbilitiesItem;