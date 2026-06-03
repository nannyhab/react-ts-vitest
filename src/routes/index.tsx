import { createFileRoute } from "@tanstack/react-router";
import { useDataQuery } from "../utilities/firebase";
import TermPage from "../components/TermPage";

const HomePage = () => {
  const [json, loading, error] = useDataQuery("/");

  if (error) return <div>Error: {`${error}`}</div>;
  if (loading) return <div>Loading...</div>;
  if (!json) return <div>No data.</div>;

  const schedule = json as { courses: Record<string, any> };
  return <TermPage courses={schedule.courses} />;
};

export const Route = createFileRoute("/")({
  component: HomePage,
});