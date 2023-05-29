import React from 'react';
import style from "../Sprites/Sprites.module.css";

const Sprites = ({sprites}) => {
    return (
            <div className={style.spritesContainer}>
                {sprites.front_default &&
                    <img
                        loading="lazy"
                        key={sprites.front_default}
                        src={sprites.front_default}
                    />
                }
                {sprites.front_shiny &&
                    <img
                        loading="lazy"
                        key={sprites.front_shiny}
                        src={sprites.front_shiny}
                    />
                }
                {sprites.other["official-artwork"].front_default &&
                    <img
                        loading="lazy"
                        key={sprites.other["official-artwork"].front_default}
                        src={sprites.other["official-artwork"].front_default}
                    />
                }
            </div>
    );
};

export default Sprites;