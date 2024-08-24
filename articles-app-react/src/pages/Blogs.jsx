import { useParams } from 'react-router-dom';

export default function Blogs() {
    const {category}=useParams()
  return (
    <div>Blogs {category}</div>
  )
}
