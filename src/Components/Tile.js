import './Tile.css';
import { useState } from 'react';


const Tile = (props) => {


    return (
        <div 
        className={"tile " + ((props.value <= 4096) ? ("x" + props.value) : "x8192")} style={props.gameOver ? {opacity:"0.5"} : {opacity:"1"}}>
            {props.value === 0 ? "" : props.value}
        </div>
    )
}

export default Tile;