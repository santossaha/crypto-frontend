export default async function handler(req, res) {
    const { endpoint } = req.query; // capture the endpoint dynamically from query params
    const apiUrl = `${process.env.NEXT_PUBLIC_API_ROOT}/${endpoint}`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch data from the API");
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Proxy error:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  }