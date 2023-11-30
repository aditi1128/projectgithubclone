import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import axios from 'axios';

function GithubApp() {
  const [user, setUser] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newRepoName, setNewRepoName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/user', {
          headers: { 'Authorization': `Token ${localStorage.getItem('token')}` }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user', error);
      }
    };

    const fetchRepositories = async () => {
      try {
        const response = await axios.get('/api/repositories', {
          headers: { 'Authorization': `Token ${localStorage.getItem('token')}` }
        });
        setRepositories(response.data);
      } catch (error) {
        console.error('Error fetching repositories', error);
      }
    };

    fetchUser();
    fetchRepositories();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
      history.push('/home'); // Redirect to '/home' route after successful login
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleNewRepoSubmit = async (event) => {
    event.preventDefault();
    // Add logic to create a new repository
  };

  const handleDelete = async (repoId) => {
    // Add logic to delete a repository
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  if (!isLoggedIn) {
    return (
      <div>
        <h1>Welcome to College Github!</h1>
        <h2>Please login to access College Github</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome to College Github!</h1>

      {user ? (
        <div>
          <h2>Hello, {user.username}!</h2>
          <form onSubmit={handleNewRepoSubmit}>
            <input
              type="text"
              placeholder="Enter new repository name"
              value={newRepoName}
              onChange={(event) => setNewRepoName(event.target.value)}
            />
            <button type="submit">Create Repository</button>
          </form>
          <input
            type="text"
            placeholder="Search repositories..."
            onChange={handleSearchChange}
          />
          <ul>
            {repositories
              .filter(repo => repo.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(repo => (
                <li key={repo.id}>
                  {repo.name}
                  <span>Created on: {repo.created_at}</span>
                  <button onClick={() => handleDelete(repo.id)}>Delete</button>
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>Please login to access College Github</h2>
          {/* Add login form, authentication, and redirection logic here */}
        </div>
      )}
    </div>
  );
}

export default GithubApp