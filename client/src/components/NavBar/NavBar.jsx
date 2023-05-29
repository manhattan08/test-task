import React from 'react';
import {Link} from "react-router-dom";
import style from "./NavBar.module.css";
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {useContext} from "react";
import {AuthContext} from "../../utils/AuthContext";
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';




const NavBar = () => {
    const { handleLogout,isAuth } = useContext(AuthContext);
    const onLogout = () => {
        window.localStorage.removeItem("username")
        handleLogout();
    }

    return (
        <nav>
            <ul className={style.navbar}>
                <Link to={"/"}>
                    <li>
                        <p>
                            <CottageOutlinedIcon  />
                        </p>
                    </li>
                </Link>
                <Link to={'/favpokemons'}>
                    {isAuth &&
                        <li>
                            <p>
                                <CatchingPokemonIcon />
                            </p>
                        </li>
                    }
                </Link>
                {isAuth?
                        <li onClick={onLogout} className={style.floatRight}><p><LogoutIcon/></p></li>
                    :
                    <Link to={"/login"}>
                        <li className={style.floatRight}><p><LoginIcon /></p></li>
                    </Link>
                }

            </ul>
        </nav>
    );
};

export default NavBar;