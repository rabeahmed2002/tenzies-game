import React from "react"
import Die from "./Die"
import './App.css';
import {nanoid} from 'nanoid'

export default function App() {

  const [dice, setDice]=React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  let dieElements=dice.map(die=><Die id={die.id} value={die.value} isHeld={die.isHeld} holdDice={()=>holdDice(die.id)}/>)

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }

  function allNewDice() {
    const newDice=[]
    for(let i=0; i<10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    if(!tenzies) {
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? 
                die :
                generateNewDie()
        }))
    } else {
        setTenzies(false)
        setDice(allNewDice())
    }
}

  function holdDice(id) {
    setDice(oldDice=>oldDice.map(die=>{
      return die.id===id ? {...die, isHeld: !die.isHeld}:die
    }))
  }

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
        console.log("You won!")
    }
}, [dice])

  return (
    <div className="App">
        {/* {tenzies && <Confetti/>} */}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-container">
        {dieElements}
      </div>
      <button onClick={rollDice} className="dice-btn">
        {tenzies ? "New game":"Roll dice"}
      </button>
    </div>
  );
}