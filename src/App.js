import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const response = api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: "Repo 1", 
      url: "http://github.com/hcsouza",
      techs: ["react", "node"],
    })
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const repoIndex = repositories.findIndex(repository => repository.id === id);
    if(repoIndex > -1) {
      const response = await api.delete(`repositories/${id}`);
      repositories.splice(repoIndex, 1);
      setRepositories([...repositories]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => 
            <li key={repository.id}>
              <span>{repository.title}</span>
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
