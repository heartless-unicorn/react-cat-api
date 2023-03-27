import { useParams } from "react-router-dom";

export default function SelectedBreed() {
  const { id } = useParams();

  return <div>Hello Cat</div>;
}
