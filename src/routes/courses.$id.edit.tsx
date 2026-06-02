import { createFileRoute } from "@tanstack/react-router";
import { useJsonQuery } from "../utilities/fetch";
import CourseForm from "../components/CourseForm";

const URL = "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php";

const EditPage = () => {
  const { id } = Route.useParams();
  const [json, loading, error] = useJsonQuery(URL);

  if (error) return <div>Error: {`${error}`}</div>;
  if (loading) return <div>Loading...</div>;
  if (!json) return <div>No data.</div>;

  const { courses } = json as { courses: Record<string, any> };
  const course = courses[id];
  if (!course) return <div>No course with id {id}.</div>;

  return <CourseForm course={course} />;
};

export const Route = createFileRoute("/courses/$id/edit")({
  component: EditPage,
});