//react imports
import { useState } from 'react';

// component button 
const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  //create function to count feedback separately 
  

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => { setGood(good + 1) }} text={'Good'} />
      <Button handleClick={() => { setNeutral(neutral + 1) }} text={'Neutral'}></Button>
      <Button handleClick={() => { setBad(bad + 1) }} text='Bad'></Button>

      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
    </div>
  )
}

export default App;