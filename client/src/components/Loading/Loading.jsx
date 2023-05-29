import React from 'react';
import classes from './Loading.module.css'
const Loading = () => {
    return (
        <div className={classes.item}>
            <i className={classes.loader}></i>
        </div>
    );
};

export default Loading;