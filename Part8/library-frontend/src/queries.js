import { gql  } from '@apollo/client'

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  title
  published
  genres
  author {
    name
  }
}`

export const ALL_BOOKS = gql`
query {
  allBooks {
    author {
      name
      id
    }
    published
    title
    genres
  }
}
`
export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    born
    bookCount
    id
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String! $author: String!, $published: Int!, $genres:[String!]!)
{
  addBook(
    title: $title,
    author: $author, 
    published: $published, 
    genres: $genres) 
    {
      genres
      id
      published
      title
      author {
        name
        id
      }
    }
}
`

export const CREATE_AUTHOR = gql`
  mutation createAuthor($name: String!, $born: Int) {
    addAuthor(name: $name, born: $born) {
      id
      name
      born
      bookCount
    }
  }
`;

export const SET_AUTHOR_BORN = gql`
  mutation editAuthor($id: ID!, $setBornTo: Int!) {
    editAuthor(id: $id, setBornTo: $setBornTo) {
      name
      id
      born
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const GET_USER = gql`
query{
  me {
    username
    favoriteGenre
  }
}
`

export const BOOKS_BY_GENRE = gql`
query($genre: String) {
  allBooksByGenre(genre: $genre) {
    title,
    published,
    genres,
    author {
      name,
      born
    }
  }
}
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`
