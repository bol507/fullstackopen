//react imports
import { useState } from 'react';

// component button 
const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}
// excercise 1.8
const Statistics = ({ good, neutral, bad }) => {
  // excercise 1.7 
  const total = good + neutral + bad 
  const average = ((1 * good + 0 * neutral - 1 * bad) / total).toFixed(2)
  const positive = ((good / (total)) * 100).toFixed(2) 
  //excercise 1.9
  if (total === 0) {
    return <p>No feedback given</p>
  }

  return (
    <div>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {total}</p>
      <p>Average: {average > 0 ? average : 0}</p>
      <p>Positive: {positive > 0 ? positive + "%" : 0}</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => { setGood(good + 1) }} text={'Good'} />
      <Button handleClick={() => { setNeutral(neutral + 1) }} text={'Neutral'}></Button>
      <Button handleClick={() => { setBad(bad + 1) }} text='Bad'></Button>

      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;