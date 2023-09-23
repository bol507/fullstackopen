import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent, getByText } from '@testing-library/react';
import Blog from './Blog';

describe('Blog component', () => {
  let component;
  let mockHandler;
  const blog = {
    title: 'Test Blog',
    author: 'John Doe',
    url: 'https://example.com ',
    likes: 10,
  };

  beforeEach(() => {
    mockHandler = jest.fn();
    component = render(
      <Blog blog={blog} UpdateBlog={mockHandler} handleDeleteBlog={jest.fn()} />
    );
  });

  test('renders title and author', () => {
    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).toHaveTextContent(blog.author);
    expect(component.container.textContent).not.toMatch(
      new RegExp(`\\b${blog.url}\\b`)
    );

    expect(component.container.querySelector('.blog')).toBeInTheDocument();
    expect(component.container.querySelector('.title')).toBeInTheDocument();
    expect(component.container.querySelector('.author')).toBeInTheDocument();
  });

  test('displays URL and number of likes when details button is clicked', () => {
    // Initially, the URL and number of likes should not be visible
    const div = component.container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');

    // Click the details button to expand the blog details
    const button = component.getByText('view');
    fireEvent.click(button);

    // After clicking, the URL and number of likes should be visible
    expect(component.container).toHaveTextContent(blog.url);
    expect(component.container).toHaveTextContent(blog.likes);
  });

  test('calls the like handler twice when like button is clicked twice', () => {
    const button = component.getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});

afterAll(cleanup);
