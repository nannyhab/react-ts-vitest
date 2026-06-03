import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { courseSchema, type CourseData } from "../utilities/courseSchema";
import { useDataUpdate } from "../utilities/firebase";

const CourseForm = ({ id, course }: { id: string; course: CourseData }) => {
  const navigate = useNavigate();
  const [updateCourse] = useDataUpdate(`/courses/${id}`);

  const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
    useForm<CourseData>({
      mode: "onChange",
      resolver: zodResolver(courseSchema),
      defaultValues: course,
    });

  const onSubmit: SubmitHandler<CourseData> = (data) => {
    updateCourse(data);
    navigate({ to: "/" });
  };

  return (
    <div className="bg-white text-black rounded p-6 m-6 w-full max-w-md text-left">
      <h2 className="text-lg font-semibold mb-4">
        Edit CS {course.number}: {course.title}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label className="flex flex-col">
          Title
          <input className="border border-gray-300 rounded p-2 mt-1" {...register("title")} />
          {errors.title && <span className="text-sm text-red-600">{errors.title.message}</span>}
        </label>

        <label className="flex flex-col">
          Term
          <input className="border border-gray-300 rounded p-2 mt-1" {...register("term")} />
          {errors.term && <span className="text-sm text-red-600">{errors.term.message}</span>}
        </label>

        <label className="flex flex-col">
          Number
          <input className="border border-gray-300 rounded p-2 mt-1" {...register("number")} />
          {errors.number && <span className="text-sm text-red-600">{errors.number.message}</span>}
        </label>

        <label className="flex flex-col">
          Meeting times
          <input className="border border-gray-300 rounded p-2 mt-1"
            placeholder="e.g. MWF 12:00-13:20" {...register("meets")} />
          {errors.meets && <span className="text-sm text-red-600">{errors.meets.message}</span>}
        </label>

        <div className="flex gap-2">
          <button type="submit" disabled={!isDirty || !isValid}
            className="bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-40">
            Submit
          </button>
          <button type="button" onClick={() => navigate({ to: "/" })}
            className="bg-gray-200 rounded px-4 py-2">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;