import { useEffect, useState } from "react";
import API_URL from "../utils/constants";

const useGetArticles = (category) => {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`${API_URL}/${category}`);
        const json = await response.json();
        setArticles(json);
      };
  
      fetchData();
    }, [category]); 
  
    return articles;
  };
  

export default useGetArticles;
