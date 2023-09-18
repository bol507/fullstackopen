import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('BlogForm component', () => {
  // Mock the handler function
  const mockCreateBlog = jest.fn()

  test('calls the event handler with correct details when creating a new blog', () => {
    // Render the BlogForm component with the mock handler
    const { container } = render(<BlogForm CreateBlog={mockCreateBlog} />)

    // Get the input fields and button
    const titleInput = container.querySelector('input[id="titleInput"]')
    const authorInput = container.querySelector('input[id="authorInput"]')
    const urlInput = container.querySelector('input[id="urlInput"]')
    const submitButton = container.querySelector('button[type="submit"]')

    // Set the values for the input fields
    const title = 'Test Title'
    const author = 'John Doe'
    const url = 'https://example.com'

    fireEvent.change(titleInput, { target: { value: title } })
    fireEvent.change(authorInput, { target: { value: author } })
    fireEvent.change(urlInput, { target: { value: url } })

    // Submit the form
    fireEvent.click(submitButton)

    // The createBlog handler should be called with the correct details
    expect(mockCreateBlog).toHaveBeenCalledTimes(1)
    expect(mockCreateBlog).toHaveBeenCalledWith({
      title,
      author,
      url,
    })
  })
})

afterAll(cleanup)