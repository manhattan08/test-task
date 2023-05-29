import React from 'react';
import style from "../SectionName/SectionName.module.css";

const SectionName = ({text}) => {
    return (
        <div className={style.sectionName}>
            {text}
        </div>
    );
};

export default SectionName;