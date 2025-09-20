
import React, { useState } from 'react';
import axios from 'axios';

const ChatSearch = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleSearch = async () => {
    try {
      const res = await axios.post('/api/recommendations/search/', { query });
      setResponse(res.data.response);
    } catch (error) {
      console.error(error);
      setResponse('Error fetching response.');
    }
  };

  return (
    <div>
      <h1>Search with ChatGPT</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask your product-related question"
      />
      <button onClick={handleSearch}>Search</button>
      {response && <div><h3>Response:</h3><p>{response}</p></div>}
    </div>
  );
};

export default ChatSearch;
