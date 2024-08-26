import { useState } from "react";
import FeatureCard from "../components/FeatureCard";
import ArticleCard from "../components/articleCard";
import useGetArticles from "../hooks/useGetArticles";
function Home() {
  const articles = useGetArticles("articles");
  const [userName] = useState("Sumanth");
  const randomArticle = Math.floor(Math.random() * articles?.length + 1);
  const [currentPage,setCurrentPage] = useState(1);
  const articlesPerPage = 3;
  
  return articles.length === 0 ? (
    <div>Loading Data.....</div>
  ) : (
    <div>
      <p className="font-medium text-lg text-gray-700">
        Good Morning {userName}
      </p>
      <div className="my-2">
        <h2 className="font-medium text-base text-gray-600 ">
          Popular Articles
        </h2>
        <FeatureCard data={articles[randomArticle]} />
      </div>
      <div className="flex justify-end gap-1">
        <a className="inline-flex size-8 cursor-pointer items-center justify-center rounded border border-gray-300 bg-white text-gray-900 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white">
          <span className="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>

        <div>
          <label htmlFor="PaginationPage" className="sr-only">
            Page
          </label>

          <input
            type="number"
            disabled
            className="h-8 w-12 rounded border border-gray-300 bg-white p-0 text-center text-xs font-medium text-gray-900 [-moz-appearance:_textfield] dark:border-gray-800 dark:bg-gray-900 dark:text-white [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            min="1"
            id="PaginationPage"
          />
        </div>

        <a className="inline-flex size-8 cursor-pointer items-center justify-center rounded border border-gray-300 bg-white text-gray-900 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white">
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
       
      </div>

      <div className="my-2">
        {articles.map((article) => (
          <div className="py-2" key={article._id}>
            <ArticleCard data={article} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
