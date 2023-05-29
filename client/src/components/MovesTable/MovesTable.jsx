import React, {useEffect, useState} from 'react';
import axios from "axios";
import Loading from "../Loading/Loading";
import style from "./MovesTable.module.css";
import MovesTableItem from "./MovesTableItem";

const MovesTable = ({moves}) => {
    const [loading,setLoading] = useState(true)
    const [data,setData] = useState(null)

    useEffect(() => {
        Promise.all(moves.flat().map(item =>
            axios.get(item.move.url)
        )).then(response => {
            setData(response.map(item => item.data))
        }).catch(e => console.log(e)).finally(() => setLoading(false))
    },[])

    if(loading) return <Loading />

    return (
        <div className={style.movesTableContainer}>
            <table className={style.movesTable}>
                <thead>
                    <tr>
                        <th>Move</th>
                        <th>Type</th>
                        <th>Class</th>
                        <th>PP</th>
                        <th>Power</th>
                        <th>Acc</th>
                        <th>Pri</th>
                        <th>Effect</th>
                    </tr>
                </thead>
                <tbody>
                {data.map(move =>
                    <MovesTableItem key={move.id} move={move} />
                )}
                </tbody>
            </table>
        </div>
    );
};

export default MovesTable;