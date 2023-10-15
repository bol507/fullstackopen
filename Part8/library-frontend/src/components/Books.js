import React, { useState } from 'react';

const Books = ({show,booksgql}) => {
  const [selectedGenre, setSelectedGenre] = useState('');
  
  if (!show) {
    return null
  }
  if (booksgql.loading)  {
    return <div>loading...</div>
  }
  
  const books = booksgql.data.allBooks
 
  const genres = [...new Set(books.flatMap(book => book.genres))];

  const filteredBooks = selectedGenre
    ? books.filter(book => book.genres.includes(selectedGenre))
    : books;
    
  const handleGenreChange = event => {
    setSelectedGenre(event.target.value);
  };  
  
  return (
    <div>
      <h2>books</h2>

      <div>
        <label htmlFor="genre-select">Filter by Genre: </label>
        <select id="genre-select" value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map(book => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
