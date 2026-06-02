import { Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Course = {
  term: string;
  number: string;
  meets: string;
  title: string;
};

type Courses = Record<string, Course>;

type CourseListProps = {
  courses: Courses;
  selected: string[];
  toggle: (id: string) => void;
  conflicts: (id: string) => boolean;
};

const CourseList = ({ courses, selected, toggle, conflicts }: CourseListProps) => {
  return (
    <div className="flex flex-row flex-wrap gap-4 mt-6 w-full justify-center">
      {Object.entries(courses).map(([id, course]) => {
        const isSelected = selected.includes(id);
        const disabled = conflicts(id);

        return (
          <Card
            key={id}
            onClick={() => { if (!disabled) toggle(id); }}
            className={
              disabled
                ? "w-64 opacity-40"
                : isSelected
                ? "w-64 bg-green-200"
                : "w-64"
            }
          >
            <CardHeader>
              <CardDescription>{course.term} · CS {course.number}</CardDescription>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{course.meets}</p>
              {isSelected && <span>✓ Selected</span>}
              {disabled && <span>✕ Conflict</span>}
              <Link
                to="/courses/$id/edit"
                params={{ id }}
                onClick={(e) => e.stopPropagation()}
                className="block mt-2 text-sm text-blue-600 underline"
              >
                Edit
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CourseList;