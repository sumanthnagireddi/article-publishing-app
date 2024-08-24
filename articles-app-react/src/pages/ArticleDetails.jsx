import { useParams } from "react-router-dom";

export default function ArticleDetails() {
  const { _id } = useParams();
  return <div>ArticleDetails {_id}</div>;
}
