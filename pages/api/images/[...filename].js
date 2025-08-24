export default async function handler(req, res) {
  const { filename } = req.query;
  
  if (!filename || filename.length === 0) {
    return res.status(400).json({ error: 'Filename is required' });
  }
  
  // Join the filename parts if it's an array
  const imagePath = Array.isArray(filename) ? filename.join('/') : filename;
  
  // Get the API base URL from environment or use the configured one
  const apiBaseUrl = process.env.API_URL || "http://13.233.93.31";
  
  try {
    // Construct the full API URL for the image
    const imageUrl = `${apiBaseUrl}/${imagePath}`;
    
    // Fetch the image from the API
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }
    
    // Get the image data
    const imageBuffer = await response.arrayBuffer();
    
    // Get the content type from the response
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    // Set appropriate headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Send the image
    res.status(200).send(Buffer.from(imageBuffer));
    
  } catch (error) {
    console.error('Error fetching image:', error);
    
    // If we can't fetch the image, return a 404 or fallback
    res.status(404).json({ 
      error: 'Image not found',
      message: 'Failed to fetch image from API',
      path: imagePath
    });
  }
} 