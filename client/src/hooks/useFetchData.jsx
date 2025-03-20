import { useState, useEffect } from "react";

export default function useFetchData({ url, method = "GET", initialPostedData = null }) {
  // Initialize data state with empty object
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [postedData, setPostedData] = useState(initialPostedData || {});
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Skip initial automatic request for POST methods
    if (method === "POST" && initialPostedData === null && Object.keys(postedData).length === 0) {
      return;
    }
    
    // Skip empty URLs
    if (!url) {
      return;
    }
    
    const fetchData = async () => {
      // Reset states before making a new request
      setIsError(false);
      setIsLoading(true);
      setData({});
      setError(null);

      try {
        console.log(`Making ${method} request to ${url} with data:`, 
          method === "POST" ? postedData : "No data (GET request)");
        
        // Configure fetch options based on method
        const options = {
          method,
          credentials: 'include', // Include credentials for CORS
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        };

        // Add body for POST request
        if (method === "POST" && postedData) {
          options.body = JSON.stringify(postedData);
        }

        // Make the request
        const response = await fetch(url, options);
        
        // Handle error responses
        if (!response.ok) {
          let errorMessage;
          try {
            // Try to parse error as JSON
            const errorData = await response.json();
            errorMessage = errorData.message || `Server error: ${response.status} ${response.statusText}`;
          } catch (e) {
            // If can't parse JSON, use text or status
            try {
              errorMessage = await response.text() || `Server error: ${response.status}`;
            } catch (textError) {
              errorMessage = `Request failed with status ${response.status}`;
            }
          }
          throw new Error(errorMessage);
        }

        // Check content type to determine how to parse response
        const contentType = response.headers.get("content-type");
        let result;
        
        if (contentType && contentType.includes("application/json")) {
          result = await response.json();
        } else {
          // Handle non-JSON responses
          const text = await response.text();
          try {
            // Try to parse as JSON anyway (some servers send JSON with wrong content type)
            result = JSON.parse(text);
          } catch (e) {
            // If not JSON, create a simple object with the text
            result = { content: text, status: response.status };
          }
        }
        
        console.log("Request successful, received data:", result);
        setData(result);
      } catch (e) {
        console.error("Fetch error:", e);
        setIsError(true);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, method, postedData, initialPostedData]);

  // Helper function to manually trigger a fetch with new data
  const refetch = (newData = null) => {
    if (newData) {
      setPostedData(newData);
    } else if (Object.keys(postedData).length > 0) {
      // Force re-fetch with same data by creating a new object reference
      setPostedData({...postedData});
    }
  };

  return {
    data,
    isLoading,
    isError,
    error,
    postedData,
    setPostedData,
    refetch
  };
}