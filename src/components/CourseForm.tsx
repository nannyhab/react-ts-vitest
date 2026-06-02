import { useNavigate } from "@tanstack/react-router";

type Course = { term: string; number: string; meets: string; title: string };

const CourseForm = ({ course }: { course: Course }) => {
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white text-black rounded p-6 m-6 w-full max-w-md text-left">
      <h2 className="text-lg font-semibold mb-4">
        Edit CS {course.number}: {course.title}
      </h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col">
          Title
          <input name="title" defaultValue={course.title}
            className="border border-gray-300 rounded p-2 mt-1" />
        </label>
        <label className="flex flex-col">
          Meeting times
          <input name="meets" defaultValue={course.meets}
            className="border border-gray-300 rounded p-2 mt-1" />
        </label>
        <button type="button" onClick={() => navigate({ to: "/" })}
          className="self-start bg-gray-200 rounded px-4 py-2">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CourseForm;