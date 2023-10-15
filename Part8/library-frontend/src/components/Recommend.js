import React from 'react';

const Recommend = ({show,booksgql,user}) => {
  
  if (!show || !user) {
    return null
  }
  if (booksgql.loading)  {
    return <div>loading...</div>
  }
  
  
  const books = booksgql.data.allBooks
 
  
  
  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre {user.favoriteGenre}</p>
     
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.filter(book =>  book.genres.includes(user.favoriteGenre)).map( b=>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
