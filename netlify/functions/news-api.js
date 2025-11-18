const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Add CORS headers for preflight requests
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  // Handle OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  // Get query parameters
  const { category, country, max, page } = event.queryStringParameters || {};

  // Validate required parameters
  if (!category) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Category is required' })
    };
  }

  // Build API URL with your API key (stored securely)
  const apiKey = process.env.GNEWS_API_KEY || 'bef8eb024c885302e7002e308616e7e8';
  const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=${country || 'in'}&max=${max || 10}&apikey=${apiKey}&page=${page || 1}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch news', message: error.message })
    };
  }
};
