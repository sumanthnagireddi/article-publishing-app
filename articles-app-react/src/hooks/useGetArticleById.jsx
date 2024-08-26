import { useEffect, useState } from "react";
import API_URL from "../utils/constants";

const useGetArticleById = (articleID) => {
  const [article, setArticles] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_URL}/articles/${articleID}`);
      const json = await response.json();
      setArticles(json);
    };

    fetchData();
  }, [articleID]);

  return article;
};

export default useGetArticleById;
