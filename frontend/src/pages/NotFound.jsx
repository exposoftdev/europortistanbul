import { Link } from "react-router-dom";
import { Eyebrow } from "@/components/brand/Primitives";

export default function NotFound() {
  return (
    <div data-testid="not-found" className="py-32 text-center">
      <Eyebrow>404 · Off the chart</Eyebrow>
      <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">This position does not exist.</h1>
      <Link to="/" className="btn-secondary mt-8">Back to course</Link>
    </div>
  );
}
