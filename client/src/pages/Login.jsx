import React from 'react';
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../utils/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import {SERVER_API} from "../utils/consts";
import styles from "./Registration.module.css";
import {Button, TextField} from "@mui/material";
import OAuth2Login from 'react-simple-oauth2-login';
import FacebookIcon from '@mui/icons-material/Facebook';

const Login = () => {
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
            const res = await axios.post(SERVER_API+"auth/login",values);
            console.log(res.data)
            window.localStorage.setItem('username', res.data.user.username)
            window.localStorage.setItem('id', res.data.user.id)
            handleLogin();
            navigate("/")
        } catch (e) {
            setError(e.response.data?.message)
        }

    }
   const onSuccess = async (res) => {
        try{
            const accessToken = res.access_token;
            const result = await axios.get(`https://graph.facebook.com/me?fields=id,first_name&access_token=${accessToken}`);
            const profile = result.data

            const result2 = await axios.post(SERVER_API+"auth/login/social",profile);
            if(result2.status === 200){
                window.localStorage.setItem('username', profile.first_name)
                window.localStorage.setItem('id', profile.id+"+facebook")
                handleLogin()
                navigate("/")
            }
        } catch (e) {
            console.log(e)
        }
   }
   const onFailure = (res) => {
       console.log(res)
   }
    useEffect(()=>{
        if(isAuth)
            navigate("/")
    },[])
    return (
        <div className={styles.container}>
            <div className={styles.root}>
                <h3 className={styles.title}>Login</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField autoComplete="off" color={"secondary"} className={styles.field} label="Email" type="email" fullWidth {...register("email", {required:"Enter your email"})} />
                    <TextField autoComplete="off" color={"secondary"} className={styles.field} label="Password" type="password" fullWidth {...register("password", {required:"Enter your password",minLength:5,maxLength:32})} />
                    <Button color={"secondary"} disabled={!isValid} type="submit" style={{transition:'.2s'}} className={styles.btn} size="large" variant="contained" fullWidth>
                        Login
                    </Button>
                    <div className={styles.error}>{error}</div>
                </form>
                <div>
                        <OAuth2Login
                            className="oauth2-login-button"
                            buttonText={<FacebookIcon />}
                            authorizationUrl="https://www.facebook.com/dialog/oauth"
                            responseType="token"
                            clientId="341380535215234"
                            redirectUri="http://localhost:3000"
                            scope="public_profile"
                            onSuccess={onSuccess}
                            onFailure={onFailure}/>
                </div>
                <div style={{textAlign:"center",fontWeight:"bold"}}>
                    <p>If you don't have an account</p>
                    <Link to={"/registration"}>
                        <Button variant="outlined" color={"secondary"}>Registration</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;