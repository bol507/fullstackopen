import { gql  } from '@apollo/client'

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
      author
      genres
      id
      published
      title
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