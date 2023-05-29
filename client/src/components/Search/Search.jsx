import React, {useEffect} from 'react';
import {TextField} from "@mui/material";
import style from "./Search.module.css"
import {useState} from "react";
import axios from "axios";
import {POKE_API_URL} from "../../utils/consts";
import {useNavigate} from "react-router-dom";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            if (searchTerm.trim() !== '') {
                searchPokemon();
            }
        }, 500);

        return () => {
            clearTimeout(delaySearch);
        };
    }, [searchTerm]);

    const searchPokemon = async () => {
        try {
            const response = await axios.get(
                `${POKE_API_URL}pokemon/${searchTerm.toLowerCase()}`
            );
            if(response.status === 200)
                navigate(`/pokemon/${response.data.name}`)
        } catch (error) {
            console.log('Error:', error);
        }
    };
    return (
        <div className={style.root}>
            <TextField
                color={"secondary"}
                label="Enter Pokemon Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                variant="outlined"
                InputProps={{
                    endAdornment: null,
                }}
            />
        </div>
    );
};

export default Search;