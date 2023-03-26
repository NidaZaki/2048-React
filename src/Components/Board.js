import Tile from "./Tile";
import './Board.css';
import React from "react";
import { useEffect, useState } from 'react';
import ModalPopUp from "./ModalPopUp";


const Board = (props) => {
    const [isGameOver, setIsGameOver] = useState(false) 
    const [refresh, setRefresh] = useState(false)
    const [score, setScore] = useState(0)
    const [bestScore, setBestScore] = useState(0)
    const stack = [];
    const [outsideStack, setOutsideStack] = useState([])
    let boardCopy;
    const [board, setBoard] = useState(() => ([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    ))

    useEffect(() => {               // 2 random index either a 2 or a 4
        addInitialNumber()
        addInitialNumber() 
     }, [refresh])

    const clearAllZeroes = () => {
        for(var r = 0; r < 4; r++){
            for(var c = 0; c < 4; c++){
                if(board[r][c] === 0){                  // clearing all zeroes
                    board[r].splice(c,1)
                    c--
                }
            }
        }
    }

    function add01Numbers(){
        for(var r = 0; r < board.length; r++){
            for(var c = 0; c < board[r].length; c++){
                if(board[r][0] && board[r][1] !== null ){
              
                    if(board[r][0] === board[r][1]){             // adding similar numbers
                    board[r][0] = board[r][0] + board[r][1]
                    let value01 = board[r][0]
                    setScore(prevCount => {
                        return prevCount + value01;
                    })
                  
                    board[r][1] = 0
                    }
                }
            }
        }    
    }
    props.scoreAtEachSwipe(score)

    function add12Numbers(){
        for(var r = 0; r < board.length; r++){
            for(var c = 0; c < board[r].length; c++){
               if(board[r][1] && board[r][2] !== null ){
                
                if(board[r][1] === board[r][2]){             // adding similar numbers
                    board[r][1] = board[r][1] + board[r][2]
                    let value12 = board[r][1]
                    setScore(prevCount => {
                        return prevCount + value12;
                    })
                  
                    board[r][2] = 0
               }
            }
            }
        }
    }

    function add23Numbers(){
        for(var r = 0; r < board.length; r++){
            for(var c = 0; c < board[r].length; c++){
               if(board[r][2] && board[r][3] !== null ){
                
                if(board[r][2] === board[r][3]){             // adding similar numbers
                    board[r][2] = board[r][2] + board[r][3]
                    let value23 = board[r][2]
                    setScore(prevCount => {
                        return prevCount + value23;
                    })
                  
                    board[r][3] = 0
               }
            }
            }
        }
    }
    
    function addSimilarNumbersForLeft(){
        clearAllZeroes();
        add01Numbers();
        add12Numbers();
        add23Numbers();
        clearAllZeroes();
    }

    function addTrailingZeroesForLeft(){
        for(var r = 0; r < 4; r++){
            for(var c = 0; c < 4; c++){
                if(board[r].length <= c){
                    board[r].push(0);
                } 
            }
        }
    }
    
    function swipeLeft(){
    
        boardCopy = JSON.parse(JSON.stringify(board));

        let element = {
            configuration: boardCopy,
            score: score,
          }; 
       
        stack.push(element);
        setOutsideStack(prevState => [...prevState, element])
        
        addSimilarNumbersForLeft()
        addTrailingZeroesForLeft();
    }
   
    function addSimilarNumbersForRight(){
        clearAllZeroes();
        add23Numbers();
        add12Numbers();
        add01Numbers();
        clearAllZeroes()
    }

    function addTrailingZeroesForRight(){
        for(var r = 0; r < 4; r++){
            for(var c = 0; c < 4; c++){
                if(board[r].length <= c){
                    board[r].unshift(0);
                } 
            }
        }
    }

    function swipeRight(){

        boardCopy = JSON.parse(JSON.stringify(board));

        let element = {
            configuration: boardCopy,
            score: score,
          }; 
       
        stack.push(element);
        setOutsideStack(prevState => [...prevState, element])
        addSimilarNumbersForRight();
        addTrailingZeroesForRight();
    }

    function transposeColsInRows(){
        for(var r = 0 ; r < 4; r++){
            for(var c = r ; c < 4; c++){
                var initial = board[r][c];
                board[r][c] = board[c][r];
                board[c][r] = initial
            }
        }
    }
    
    function finalTranspose(){
        for(var r = 0 ; r < 4; r++){
            for(var c = r ; c < 4; c++){
                var initial = board[r][c];
                board[r][c] = board[c][r];
                board[c][r] = initial
            }
        }
    }
    
    function addSimilarNumbersForUp(){
        transposeColsInRows();
        clearAllZeroes();
        add01Numbers();
        add12Numbers();
        add23Numbers();
        clearAllZeroes();
    }

    function swipeUp(){ 

        boardCopy = JSON.parse(JSON.stringify(board));

        let element = {
            configuration: boardCopy,
            score: score,
          }; 
       
        stack.push(element);
        setOutsideStack(prevState => [...prevState, element])

        addSimilarNumbersForUp();
        addTrailingZeroesForLeft();
        finalTranspose();
    }

    function addSimilarNumbersForDown(){
        transposeColsInRows();
        clearAllZeroes();
        add23Numbers();
        add12Numbers();
        add01Numbers();
        clearAllZeroes();
      
    }

    function boardHasEmptyTile(){
        for(var r = 0; r < 4; r++){
            for(var c = 0; c < 4;  c++){
                if(board[r][c] === 0){
                    return true;
                }         
            }
        }
        return false;
    }

    function setTwoOrFour(){
        return ((Math.random() < 0.5) ? 2 : 4);
    }

    function addInitialNumber(){            // initially calling it twice!!
    
        if(!boardHasEmptyTile()){
            return;
        }
    
        let found = false;
        
        while(!found){             // !found condition is evaluating to true
            var r = Math.floor(Math.random() * 4)
            var c = Math.floor(Math.random() * 4);
            if (board[r][c] == 0){
                board[r][c] = setTwoOrFour(); 
                found = true;
            }      
        }
        setBoardValuesAfterSwiping()
    }

    function setBoardValuesAfterSwiping(){
        setBoard((prevBoard) => {
            let board = [...prevBoard];
            return board;
          })
    }

    useEffect(() => {
        document.addEventListener('keydown', keyEventHandler)

        return () => {
            document.removeEventListener('keydown', keyEventHandler)
        }
    }, [refresh, board])

    function keyEventHandler(event){
        if(score > bestScore){
            setBestScore(score)
        }
        if(event.key === "U" || event.key === "u"){
            undoHandler()
        }
        else if(event.key === "ArrowLeft"){
            
            swipeLeft()
            setBoardValuesAfterSwiping()
            addInitialNumber()
        }
        else if(event.key === "ArrowRight"){
            swipeRight()
            setBoardValuesAfterSwiping()
            addInitialNumber()
        }
        else if(event.key === "ArrowUp"){
            swipeUp()
            setBoardValuesAfterSwiping()
            addInitialNumber()
        }
        else if(event.key === "ArrowDown"){
            swipeDown()
            setBoardValuesAfterSwiping()
            addInitialNumber()
        }
       
      
        checkGameOver()
      
    }

    const checkGameOver = () => {
        for(var r = 0; r < 4; r++) {
            for(var c = 0; c < 4;  c++) {
                if(board[r][c] === 0) {
                    return setIsGameOver(false)
                }         
            }
        }
    
        for (var r = 0; r < 4 - 1; r++) {
            for (var c = 0; c < 4 - 1; c++) {
              var value = board[r][c]
              if (value !== 0 && (value == board[r + 1][c] || value == board[r][c + 1])) {
                return setIsGameOver(false)
              }
            }
        }
        setIsGameOver(true) 
        
    }

    const updateBoard = () => {
        setBoard((prevBoard) => {
          let board = [...prevBoard];
          board = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
          ]
          return board;
        })
    }

    function tryAgainClickHandler(){
        props.updateFinalScore(score)
        updateBoard()
        setIsGameOver(false)
        setRefresh(!refresh)
        setScore(0)
        setOutsideStack([])
    }

    function swipeDown(){
      
        boardCopy = JSON.parse(JSON.stringify(board));
    
        let element = {
            configuration: boardCopy,
            score: score,
          }; 
       
        stack.push(element);
        setOutsideStack(prevState => [...prevState, element])

        addSimilarNumbersForDown();
        addTrailingZeroesForRight();
        finalTranspose();

    }

    let lastStateBoard;

    function undoHandler(){
        if(outsideStack.length > 0 ){
            lastStateBoard = outsideStack.pop()
          
            setBoard(prevBoard => {             // reflecting the undo on the board on screen
                prevBoard = [...lastStateBoard.configuration];
                return prevBoard;
              })

              setScore(lastStateBoard.score)
        }
        if(checkGameOver()){
            setRefresh(!refresh)
        }
    }

    return (

    <div>
        <div className="score-container-parent">
            <div className="column"> 
                <button className="score-container new-game" onClick={tryAgainClickHandler}>New Game</button>
             
            </div>

            <div className="score-container">
                <p className="header">SCORE</p> 
                <p id="score">{score}</p>
            </div>
            <div className="score-container">
                <p className="header">BEST</p> 
                <p id="best-score">{bestScore}</p>
            </div>
            <div>
            <button className="score-container new-game" onClick={undoHandler}>
                    <i className="bi bi-arrow-counterclockwise"></i> Undo (U)
                </button>
            </div>
        </div>
        <div id="board">
            {board.map((tile) => (
                tile.map((cell) => (
                    <Tile 
                    classNameValue="" 
                    value={cell} 
                    gameOver={isGameOver}
                    />))
                )
            )}

        <React.Fragment>
            {isGameOver &&  (
            <React.Fragment> 
                <p id ="game-over">Game Over!</p> 
                 <button id ="try-again" onClick={tryAgainClickHandler}>Try Again</button> 
            </React.Fragment> ) 
            }
        </React.Fragment>

        </div>
     
        <div >
            <ModalPopUp></ModalPopUp>
        </div>
      
    </div>
    )
}


export default Board;

