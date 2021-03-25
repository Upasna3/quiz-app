import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './Home.css';


export function Home (){

    const [level, setLevel] = useState(null);
    const history = useHistory();

    //selecting the level according to the button pressed.
    const selectLevel = (e)=>{
        console.log(e.target.id);
        setLevel(e.target.id);
    };
    
    //setting the level value in local storage and redirecting to the question page
    useEffect( () =>{
        if(level){
            localStorage.setItem("level", level);
            history.push("/question");
        }
    });

    return (
        <>
        <header><h1>Quiz App</h1></header>
        <h2>Please select the level of difficulty.</h2>
        <div className="button-group">
            <button id="easy" onClick={selectLevel}>Easy</button>
            <button id="medium" onClick={selectLevel}>Medium</button>
            <button id="hard" onClick={selectLevel}>Hard</button>
        </div>
        </>
    );
}