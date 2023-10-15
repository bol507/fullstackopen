import { useState } from 'react'
import { useQuery,useMutation,useApolloClient } from '@apollo/client';


import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

import { ALL_AUTHORS,ALL_BOOKS,CREATE_BOOK,CREATE_AUTHOR,SET_AUTHOR_BORN } from './queries';

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [createBook] = useMutation(CREATE_BOOK,{ refetchQueries: [ { query: ALL_BOOKS } ]})
  const [createAuthor] = useMutation(CREATE_AUTHOR,{ refetchQueries: [{ query: ALL_AUTHORS}] })
  const [setAuthorBorn] = useMutation(SET_AUTHOR_BORN,{ refetchQueries: [{ query: ALL_AUTHORS}] });
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)  
  const client = useApolloClient()
  
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === 'authors'} authorsgql={authors} setAuthorBorn={setAuthorBorn} />

      <Books show={page === 'books'} booksgql={books} />

      <NewBook show={page === 'add'} authorsgql={authors} createBook={createBook} createAuthor={createAuthor} />
    </div>
  )
}

export default App
