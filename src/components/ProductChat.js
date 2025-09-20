// import React, { useState } from 'react';
// import axios from 'axios';

// const ProductChat = ({ productId }) => {
//   const [question, setQuestion] = useState('');
//   const [response, setResponse] = useState('');
//   const [loading, setLoading] = useState(false);

//   const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000"; // Ensure the correct base URL

//   const handleInputChange = (e) => {
//     setQuestion(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!question) {
//       setResponse('Please enter a question.');
//       return;
//     }

//     setLoading(true);
//     try {
//       console.log("Sending question to:", `${BASE_URL}/api/products/${productId}/chat/`);
//       const res = await axios.post(`${BASE_URL}/api/products/${productId}/chat/`, { question });
//       console.log("Response received:", res.data);
//       setResponse(res.data.answer || 'No response received.');
//     } catch (error) {
//       console.error('Error during chat:', error);
//       setResponse('An error occurred while fetching the response.');
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="product-chat">
//       <h3>Ask a question about this product:</h3>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={question}
//           onChange={handleInputChange}
//           placeholder="Type your question here..."
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? 'Asking...' : 'Ask'}
//         </button>
//       </form>
//       {response && (
//         <div className="chat-response">
//           <h4>Response:</h4>
//           <p>{response}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductChat;


import React, { useState } from 'react';
import axios from 'axios';

const ProductChat = ({ productId }) => {
  const [question, setQuestion] = useState('');
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question && !image) {
      setResponse('Please provide a question or upload an image.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    if (question) formData.append('query', question);
    if (image) formData.append('image', image);

    try {
      const res = await axios.post(`${BASE_URL}/api/products/${productId}/chat/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponse(res.data.response || 'No response received.');
    } catch (error) {
      console.error('Error during chat:', error);
      setResponse('An error occurred while fetching the response.');
    }

    setLoading(false);
  };

  return (
    <div className="product-chat">
      <h3>Ask a question about this product:</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={handleInputChange}
          placeholder="Type your question here..."
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit" disabled={loading}>
          {loading ? 'Asking...' : 'Ask'}
        </button>
      </form>
      {response && (
        <div className="chat-response">
          <h4>Response:</h4>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default ProductChat;
