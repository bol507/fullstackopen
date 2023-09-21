const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE_ANECDOTE':
      const id = action.payload.id;
      const updatedAnecdotes = state.map(anecdote => {
        if (anecdote.id === id) {
          return {
            ...anecdote,
            votes: anecdote.votes + 1
          };
        }
        return anecdote;
      });
      return updatedAnecdotes

    case 'ADD_ANECDOTE':
      const newAnecdote = {
        content: action.payload.content,
        id: getId(),
        votes: 0
      };
      return [...state, newAnecdote]
    case 'SET_FILTER':
      console.log(action.filter)
      if (action.filter === ""){
        
        return initialState
      }
      const filteredAnecdotes = state.filter(anecdote =>
        anecdote.content.toLowerCase().includes(action.filter.toLowerCase())
      )
      return filteredAnecdotes
     
    default:
      return state
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    payload: {
      id: id
    }
  };
}

export const addAnecdote = (content) => {
  return {
    type: 'ADD_ANECDOTE',
    payload: {
      content: content,
      votes: 0
    }
  };
};

export default reducer