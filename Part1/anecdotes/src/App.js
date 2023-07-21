//react imports
import { useState } from 'react';

const App = (props) => {
  const [selected, setSelected] = useState(0)

  const handleRandom = () => {
    const result = Math.floor(Math.random() * props.anecdotes.length);
    setSelected(result);
  }

  return (
    <div>
      {props.anecdotes[selected]}
      <br/>
      <button onClick={handleRandom}>Next Anecdote</button>
    </div>
  )
}

export default App;