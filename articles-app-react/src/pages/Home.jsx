import FeatureCard from "../components/FeatureCard";
import ArticleCard from "../components/articleCard";
import articleData from "../assets/data.json";
import { useState } from "react";
function Home() {
  const [articles] = useState(articleData);
  const [userName] = useState("Sumanth");
  
  return (
    <div>
      <p className="font-medium text-lg text-gray-700">
        Good Morning {userName}
      </p>
      <div className="my-2">
        <h2 className="font-medium text-base text-gray-600 ">
          Popular Articles
        </h2>
        <FeatureCard />
      </div>
      <div className="my-2">
        {articles.map((article) => (
          <div className="py-2" key={article._id?.$oid}>
            <ArticleCard data={article} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
