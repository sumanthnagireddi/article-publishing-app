import { useParams } from "react-router-dom";
import useGetArticleById from "../hooks/useGetArticleById";
import useGetArticles from "../hooks/useGetArticles";
import ArticleCard from "../components/articleCard";

export default function ArticleDetails() {
  const { id } = useParams(); 
  const articleData = useGetArticleById(id);
  const articles = useGetArticles("articles");
  if (!articleData) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="py-4 px-4 mx-auto max-w-4xl">
        <div className="max-w-xl ">
          <h3 className="text-3xl py-1 capitalize font-medium text-gray-800">
            {articleData?.articleName}
          </h3>
          <p className="text-gray-600 text-sm px-1">
            {articleData?.articleDescription}
          </p>
        </div>
        <div className="pt-6 flex gap-4">
          <div className="relative w-10 h-10 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600">
            <svg
              className="absolute w-12 h-12 text-gray-400 -left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">
              {articleData?.author}
              <span className="px-8 cursor-pointer text-emerald-600 ">
                Follow
              </span>
            </p>
            <p className="text-sm text-gray-600 ">
              {articleData?.readTime} min read{" "}
              <span className="px-8 ">
                {/* Published on {formatDate(articleData?.created)} */}
              </span>
            </p>
          </div>
        </div>
        <div className="my-4 py-2 border-t border-b border-gray-200/75  w-full flex justify-between  line-clamp-3 items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex text-gray-500 items-center gap-x-1 dark:text-gray-400 ">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </span>
              <span className="text-sm ">{articleData.views}</span>
            </div>
            <div className="flex cursor-pointer text-gray-500 items-center gap-x-1 dark:text-gray-400 ">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
              </span>
              <span className="text-sm ">
                {articleData?.comments ? articleData?.comments?.length : 0}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex text-gray-500 items-center gap-x-1 dark:text-gray-400 ">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                  />
                </svg>
              </span>
              <span className="text-sm ">1.8K</span>
            </div>
          </div>
        </div>
        <div className="ql-snow">
          <div className="ql-editor">{articleData.editorContent}</div>
        </div>
        <div className="py-4">
          <h3 className="font-medium text-xl text-gray-700 py-4">
            Recommended for you
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {articles.slice(0,3).map((article) => (
              <div className="py-2" key={article._id}>
                <ArticleCard data={article} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
