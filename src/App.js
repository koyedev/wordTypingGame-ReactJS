import React, { useEffect, useRef, useState } from 'react'
import "./App.css"

function App() {
    const STARTING_TIME = 15
    const [countdown, setCountDown] = useState(STARTING_TIME)
    const [text, setText] = useState("")
    const [wordCount,  setwordCount] = useState(0)
    const [isTimerunning, setisTimeRunning] = useState(false)
    const textboxRef = useRef(null)

    useEffect(() => {
        if (isTimerunning && countdown > 0){
            setTimeout(() => {
                setCountDown(count => count - 1)
            }, 1000)
        } else if (countdown === 0) {
            endGame()
        }
        
    }, [countdown, isTimerunning])

    
    function handleChange (e){
        const {value} = e.target
        setText(value)
    }

    function startGame(){
        setisTimeRunning(true)
        setCountDown(STARTING_TIME)
        setText("")
        textboxRef.current.disabled = false
        textboxRef.current.focus()
    }

    function endGame(){
        setisTimeRunning(false)
        setwordCount(calculateWords(text))
    }

    function calculateWords(text){
        const num_of_words = text.trim().split(" ")
        return num_of_words.filter(word => word !== "").length
    }

  return (
    <div>
        <h1>Word Typing Game in 10 Seconds</h1>
        <textarea name="textarea" ref={textboxRef} value={text}  onChange={handleChange} disabled={!isTimerunning}/>
        <h4>You have {countdown} seconds remainig</h4>
        <button onClick={startGame} disabled={isTimerunning}>Start Game</button>
        <h1>The Amount of words you typed is {wordCount}</h1>
    </div>
  )
}

export default App