import React, {useContext, useEffect, useState} from 'react';
import styles from "./Registration.module.css";
import {Button, TextField} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import {SERVER_API} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../utils/AuthContext";

const Registration = () => {
    const [error,setError] = useState("")

    const { handleLogin,isAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const { register, handleSubmit, formState:{isValid}} = useForm({
        defaultValues:{
            username:"",
            email:"",
            password:"",
        },
        mode: "onChange"
    })

    const onSubmit = async (values) => {
        setError("")
        try{
            const res = await axios.post(SERVER_API+"auth/registration",values);
            window.localStorage.setItem('username', res.data.user.username)
            handleLogin();
            navigate("/")
        } catch (e) {
            setError(e.response.data?.message)
        }

    }
    useEffect(()=>{
        if(isAuth)
            navigate("/")
    },[])

    return (
        <div className={styles.container}>
            <div className={styles.root}>
                <h3 className={styles.title}>Registration</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField autoComplete="off" color={"secondary"} className={styles.field} label="Username" fullWidth {...register("username", {required:"Enter your username",minLength:3,maxLength:32})} />
                        <TextField autoComplete="off" color={"secondary"} className={styles.field} label="Email" type="email" fullWidth {...register("email", {required:"Enter your email"})} />
                        <TextField autoComplete="off" color={"secondary"} className={styles.field} label="Password" type="password" fullWidth {...register("password", {required:"Enter your password",minLength:5,maxLength:32})} />
                        <Button color={"secondary"} disabled={!isValid} type="submit" style={{transition:'.2s'}} className={styles.btn} size="large" variant="contained" fullWidth>
                            Registration
                        </Button>
                        <div className={styles.error}>{error}</div>
                    </form>
            </div>
        </div>
    );
};

export default Registration;