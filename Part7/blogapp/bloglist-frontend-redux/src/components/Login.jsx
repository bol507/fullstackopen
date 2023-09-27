import React, { useState } from 'react';

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xs mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
          Username
        </label>
        <input
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Enter your username"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your password"
        />
      </div>
      <button
        id="login-button"
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
