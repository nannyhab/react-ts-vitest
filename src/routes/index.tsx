import { createFileRoute } from "@tanstack/react-router";
import { useJsonQuery } from "../utilities/fetch";
import TermPage from "../components/TermPage";

const URL = "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php";

const HomePage = () => {
  const [json, loading, error] = useJsonQuery(URL);

  if (error) return <div>Error: {`${error}`}</div>;
  if (loading) return <div>Loading...</div>;
  if (!json) return <div>No data.</div>;

  const schedule = json as { courses: Record<string, any> };
  return <TermPage courses={schedule.courses} />;
};

export const Route = createFileRoute("/")({
  component: HomePage,
});