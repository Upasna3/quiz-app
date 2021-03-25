import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Question.css';
import { useHistory } from 'react-router-dom';



export function Question(){
    let history = useHistory();
    const [ques, setQues] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");
    const [answer, setAnswer] = useState(0);
    const [guess, setGuess] = useState(0);
    const [questionId, setQuestionId] = useState(1);
    const [score, setScore] = useState(0);
    const [status, setStatus] = useState("");
    const [time, setTime] = useState(0);
    const [level, setLevel] = useState("");


    //Event Handlers
    //Getting answers from radio buttons
    const handleChange = (event) =>{
        setGuess(Number(event.target.value));
    }


    //Checking for the answer and setting the status of the question
    const handleClick = () =>{
        if(answer === guess){
            setStatus("CORRECT");
        }else{
            setStatus("INCORRECT");
        }

        //if it is a last question then setting the status of quiz as finished
        if(questionId === 5){
            setStatus("Finished");  
        }
    }

    //useEffect for setting time
    useEffect( () =>{
        const intervalId = setInterval(() =>{ setTime( (prev) => prev + 1)}, 1000); //setting the interval id 
        if(time >= 30){ //If the time > 30 seconds , the quiz status is finished.
            setStatus("Finished");
        }
     
        return () => {
           clearInterval(intervalId);
         }
       }, [time]);


    //Used effect for the status
    useEffect( function () {

        //if thq quiz is finished
        if(status === "Finished"){
            localStorage.setItem("Score", score);
            history.push("/finished");
        }

        //if the question is correct
        if(status === "CORRECT"){
            const intervalId = setInterval(() =>{
                setScore(prev => prev + 1); //setting score +1
                setQuestionId(prev => prev + 1); //settin questionId +1
                setStatus(null); //resetting the status
            }, 1000); //giving a interval of 1 second to move to the next question.

            return () =>{
                clearInterval(intervalId); 
            }  
        }else if(status === "INCORRECT"){
            const intervalId = setInterval(() =>{
                setQuestionId(prev => prev + 1);
                setStatus(null);
            }, 1000);

            return () =>{
                clearInterval(intervalId); 
            }  
        }
 
    }, [status, score, history]);

    //getting the level of questions from local storage in the browser set by home page.
    useEffect( () =>{
        if(!level){
            setLevel(localStorage.getItem("level"));
        }
    }, [level]);

    //Giving a get request with params like quesId and level
    useEffect( () =>{
        if(level){
            axios.get(`http://localhost:3001/question/${questionId}/${level}`)
            .then((res) =>{
                if(res.data[0].question){
                    setQues(res.data[0].question);
                    setOption1(res.data[0].option1);
                    setOption2(res.data[0].option2);
                    setOption3(res.data[0].option3);
                    setOption4(res.data[0].option4);
                    setAnswer(Number(res.data[0].answer));
                }
            })
        }
    }, [questionId, level]);


    return (
        <>
        <div className="header">
            <h1>Quiz App</h1>
            <p className="timer">Timer : {time}</p> 
        </div>

        <div className="question-box">
            <div className="container">
                <div className="question"><h3>{ques}</h3></div>
                <div className="option-box">
                    <div className="options">
                        <div className="option1">
                            <input type="radio" id="option1" name="option" value="1" onChange={handleChange}/>
                            <label htmlFor="option1">{option1}</label>
                        </div>
                        <div className="option2">
                            <input type="radio" id="option2"  name="option"  value="2" onChange={handleChange}/>
                            <label htmlFor="option1">{option2}</label>
                        </div>
                        <div className="option3">
                            <input type="radio" id="option3" name="option"   value="3"  onChange={handleChange}/>
                            <label htmlFor="option1">{option3}</label>
                        </div>
                        <div className="option4">
                            <input type="radio" id="option4"  name="option" value="4" onChange={handleChange}/>
                            <label htmlFor="option1">{option4}</label>
                        </div>
                    </div>
                </div>
            </div>
            <button className="save" onClick={handleClick}> SAVE AND NEXT</button>
            <h3 className={status}> {status}</h3>
        </div>

        </>
    );
}