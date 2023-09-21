import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes:0, id: Number((Math.random() * 1000000).toFixed(0))    }
  const response = await axios.post(baseUrl, object)
  return response.data.content
}

export default { getAll, createNew }