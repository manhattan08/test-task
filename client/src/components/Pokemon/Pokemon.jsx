import React, {useContext, useEffect, useState} from 'react';
import {usePokeApi} from "../../api/pokeapi";
import {Grid} from "@mui/material";
import style from "./Pokemon.module.css";
import Loading from "../Loading/Loading";
import pokeBall from "../../assets/pokeball.png"
import {useNavigate} from "react-router-dom";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import axios from "axios";
import {SERVER_API} from "../../utils/consts";
import {AuthContext} from "../../utils/AuthContext";

const Pokemon = ({pokemon,favPoki}) => {
    const {isAuth} = useContext(AuthContext);
    const [isHovered,setIsHovered] = useState(false)
    let [loading, data] = usePokeApi(pokemon.url?`${pokemon.url}`:null)

    if(!pokemon.url) {
        data = pokemon
    }

    const navigate = useNavigate();

    const handleOnFav = async () => {
        const postData = {
            id:window.localStorage.getItem("id"),
            pokiName:pokemon.name
        }
        await axios.post(`${SERVER_API}pokemon/setFavouritePokemon`,postData)
        navigate("/favpokemons")
    }

    const handleRemoveFav = async () => {
        const postData = {
            id:window.localStorage.getItem("id"),
            name:pokemon.name
        }
        const result = await axios.post(`${SERVER_API}pokemon/removeFavouritePokemons`,postData)
        favPoki = result.data.pokemons
        window.location.reload()
    }
    return (
            <Grid  className={style.cart} xs={12} sm={6} md={3} item>
                {loading && <Loading/>}
                {data && !loading &&
                    <div
                        style={{color:`var(--${data.types[0].type.name})`}}
                        className={`
                        ${style.card} 
                        `}>

                        <div className={`${style.cardHeader} ${style.flexStretchRow}`}>
                            <h3>{pokemon.name}</h3>
                            {isAuth &&
                                <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                                    { isHovered || favPoki?.includes(pokemon.name)  ?
                                        <StarIcon onClick={favPoki?.includes(pokemon.name) ? handleRemoveFav: handleOnFav} />
                                        :
                                        <StarBorderIcon />
                                    }
                                </div>
                            }
                        </div>

                        <div onClick={()=>navigate(`/pokemon/${pokemon.name.toLowerCase()}`)} className={style.imageContainer}>
                            <img loading="lazy" src={data.sprites.front_default ? data.sprites.front_default :  pokeBall} alt=""/>
                        </div>

                        <div onClick={()=>navigate(`/pokemon/${pokemon.name.toLowerCase()}`)} className={`pokemonTypes ${style.flexStretchRow}`}>
                            {data.types.map(item =>
                                <span key={item.type.name} style={{background:`var(--${item.type.name.toLowerCase()})`}}>
                                    {item.type.name}
                                </span>
                            )}
                        </div>

                        <p className={style.flexStretchRow}>Stats</p>
                        <div onClick={()=>navigate(`/pokemon/${pokemon.name.toLowerCase()}`)} className={style.flexStretchRow}>
                            <div className={style.statsContainer}>
                                <div title={'HP'}><b>HP</b></div>
                                <div title={'Attack'}><b>Atk</b></div>
                                <div title={'Defence'}><b>Def</b></div>
                                <div title={'Special Attack'}><b>SpA</b></div>
                                <div title={'Special Defence'}><b>SpD</b></div>
                                <div title={'Speed'}><b>Spd</b></div>
                                {data.stats.map(item => <div key={item.stat.name}>{item.base_stat}</div>)}
                            </div>
                        </div>

                        <div onClick={()=>navigate(`/pokemon/${pokemon.name.toLowerCase()}`)} className={`${style.abilitiesContainer} ${style.flexStretchRow}`}>
                            <p><b>Abilities</b></p>
                            <div className={` ${style.abilitiesItems} ${style.flexStretchRow}`}>
                                {data.abilities.map(item => item.is_hidden ? null:<p key = {item.ability.name}>{item.ability.name}</p>)}
                            </div>
                        </div>
                    </div>
                }
            </Grid>
    );
};

export default Pokemon;