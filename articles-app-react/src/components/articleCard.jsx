import { Link } from "react-router-dom";
import formatDate from "../utils/DateFormat";

export default function ArticleCard(props) {
  const { data } = props;

  return (
    <article id="article" className="group   card sm:flex bg-white rounded-xl ">
      <div className="p-4 relative flex-1">
          <Link
            to={`discover/article-details/${data?._id}`}
            className="text-xl font-medium text-gray-900 dark:text-white"
          >
            {data?.articleName}
          </Link>

        <p className="mt-2  line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400">
          {data.articleDescription}
        </p>
        <div className="absolute bottom-4 pr-10 z-10 w-full flex justify-between  line-clamp-3 items-center gap-4">
          <div className="flex items-center gap-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              {formatDate(data.created)}
            </p>
            <p className="text-gray-800  dark:text-gray-400 px-2 py-0.5 rounded-xl text-sm bg-gray-200">
              {data.readTime} min read
            </p>
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
              <span className="text-sm ">{data.views}</span>
            </div>
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
                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
              </span>
              <span className="text-sm ">{data.comments?.length}</span>
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
                  className="size-5 cursor-pointer"
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
            <div className="flex items-center gap-1 group text-gray-700">
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
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>

              <p className="font-medium text-sm cursor-pointer hover:underline ">
                {data.author}
              </p>
            </div>
          </div>
        </div>
      </div>
      <img
        alt=""
        src="data:image/jpeg;base64,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"
        className="h-30   sm:m-4 w-auto rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%] dark:shadow-gray-700/25"
      />
    </article>
  );
}
