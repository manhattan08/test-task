import React from 'react';
import {Grid} from "@mui/material";
import Pokemon from "../Pokemon/Pokemon";
import Search from "../Search/Search";


const PokeList = ({data,search=true,favPoki}) => {
    return (
        <>
            {search &&
                <Grid className={"search-tag"} container md={8}>
                    <Search />
                </Grid>
            }

            {data &&
                <Grid spacing={5} xs={12} sm={12} md={12} lg={8} container>
                    {data.map(pokemon =>
                        <Pokemon favPoki={favPoki} key={pokemon.name} pokemon={pokemon} />
                    )}
                </Grid>
            }
        </>
    );
};
export default PokeList;