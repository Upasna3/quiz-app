import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './Finished.css';

export function Finished() {
    const [score, setScore] = useState(0);
    let history = useHistory();

    const Report = ["Poor", "Bad", "Good", "Strong", "Very Strong"];

    //event handler for resetting the game -> deleting score and level values from local storage and redirecting to starting page
    const handleClick = (e) =>{
        localStorage.removeItem('Score');
        localStorage.removeItem("level");
        history.push("/"); //for redirecting
    }

    //getting the score value from local storage
    useEffect( () =>{
        if(!score){
            setScore(localStorage.getItem("Score"));
        }
    }, [score]);

    if(!score){
        return <h1> Loading......</h1>
    }else{
        return (
            <>
            <h1 className="score">Your Score: {score}</h1>
            <h2 className="report">{Report[score-1]}</h2>
            <div className="reset">
            <button onClick={handleClick}> Play Again ?</button>
            </div>
            </>

        );
    }
}