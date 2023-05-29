import React from 'react';
import Header from "../components/Header/Header";
import PokeList from "../components/PokeList/PokeList";
import {usePokeApi} from "../api/pokeapi";
import {PER_PAGE, POKE_API_URL} from "../utils/consts";
import {useEffect, useState} from "react";
import {Pagination, PaginationItem} from "@mui/material";

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading,data,error] = usePokeApi(`${POKE_API_URL}pokemon?offset=${(currentPage-1)*PER_PAGE}&limit=${PER_PAGE}`)

    useEffect(  () => {
        setTotalPages(Math.floor(data?.count / PER_PAGE));
    },[data])


    return (
        <div className={"container"}>
            <Header title={"PokeDex"} />
            <main className={"container"}>
                <PokeList data={data?.results}/>
                <div style={{margin:"70px"}}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(e,p)=>setCurrentPage(p)}
                        shape="rounded"
                        color="secondary"
                        renderItem={(item)=>(
                            <PaginationItem
                                {...item}
                                sx={{
                                    color:"yellow"
                                }}
                            />
                        )}
                    />
                </div>
            </main>
        </div>
    );
};

export default Home;