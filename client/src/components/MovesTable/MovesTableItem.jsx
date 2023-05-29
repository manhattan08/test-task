import React from 'react';
import style from "../MovesTable/MovesTable.module.css";
import status from "../../assets/DamageClasses/status.png"
import special from "../../assets/DamageClasses/special.png"
import physical from "../../assets/DamageClasses/physical.png"

const MovesTableItem = ({move}) => {
    return (
        <tr>
            <td className={style.move}><p>{move.name}</p></td>
            <td className={"pokemonTypes"}>
                <span style={{background:`var(--${move.type.name.toLowerCase()})`}}>
                    {move.type.name}
                </span>
            </td>
            <td>
                {
                    move.damage_class.name === "status" &&
                    <img src={status} />
                }
                {
                    move.damage_class.name === 'special' &&
                    <img src={special} alt={special} title={'Special: Special damage, controlled by Special Attack and Special Defence'}/>
                }
                {
                    move.damage_class.name === 'physical' &&
                    <img src={physical} alt={physical} title={'Physical: Physical damage, controlled by Attack and Defence'}/>
                }
            </td>
            <td>{move['pp']}</td>
            <td>{move.power ? move.power : '-'}</td>
            <td>{move.accuracy ? move.accuracy+"%" : "-"}</td>
            <td>{move.priority}</td>
            <td>{move.effect_entries.length !== 0 && move.effect_entries[0].short_effect.replaceAll(/\$effect_chance%/ig, '')}</td>
        </tr>
    );
};

export default MovesTableItem;