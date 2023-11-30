// Repositories.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Repositories() {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
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

        fetchRepositories();
    }, []);

    return (
        <div>
            <h1>My Repositories</h1>
            <ul>
                {repositories.map(repo => (
                    <li key={repo.id}>{repo.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Repositories;
