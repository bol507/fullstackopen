//react imports
import { useState } from 'react';

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))//excercise 1.13

  const handleRandom = () => {
    const result = Math.floor(Math.random() * props.anecdotes.length)
    setSelected(result)
  }

  const handleVote = () => {
    // create a copy 
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }
  
  const maxVotes = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {props.anecdotes[selected]}
      <p>Votes: {votes[selected]}</p>
      <button onClick={handleVote}>Upvote</button>
      <button onClick={handleRandom}>Next Anecdote</button>
      <br/>
      <h2>Anecdote with the most votes</h2>
      {votes[maxVotes] > 0 ? (
        <div>
          <p>{props.anecdotes[maxVotes]}</p>
          <p>Votes: {votes[maxVotes]}</p>
        </div>
      ) : (
        <p>No votes</p>
      )}
    </div>
  )
}

export default App;