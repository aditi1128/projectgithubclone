// src/utils.js
import axios from 'axios';

export function fetchRepositories() {
  return axios.get('http://localhost:8000/api/repositories');
}
