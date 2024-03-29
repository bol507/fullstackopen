import { useState } from 'react'
import { useQuery, useMutation, useApolloClient, useSubscription } from '@apollo/client';


import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

import { ALL_AUTHORS,ALL_BOOKS,CREATE_BOOK,CREATE_AUTHOR,SET_AUTHOR_BORN, GET_USER, BOOK_ADDED } from './queries';

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

// problem n+1
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}//updateCache

const App = () => {
  const [page, setPage] = useState('authors')
  /**
   * querys
   */
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const user = useQuery(GET_USER)

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
/*
  const includedIn = (set, object) =>
    set.map(p => p.title).includes(object.title)


  const updateCacheWith = (addedBook) => {
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      dataInStore.allBooks.push(addedBook)
      client.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore
      })
    }
  }*/

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`${addedBook.title} added`)
      //updateCacheWith(addedBook)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

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
        <button onClick={() => setPage('recommends')}>recommends</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === 'authors'} authorsgql={authors} setAuthorBorn={setAuthorBorn} />

      <Books show={page === 'books'} booksgql={books} />

      <NewBook show={page === 'add'} authorsgql={authors} createBook={createBook} createAuthor={createAuthor} />

      <Recommend show={page === 'recommends'} booksgql={books} user={user.data.me}/>
    </div>
  )
}

export default App
