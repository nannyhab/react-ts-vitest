import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react";

type Course = {
  term: string;
  number: string;
  meets: string;
  title: string;
};

type Courses = Record<string, Course>;


const CourseList = ({ courses }: { courses: Courses }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(x => x !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    
    <div className="flex flex-row flex-wrap gap-4 mt-6 w-full justify-center">
      {Object.entries(courses).map(([id, course]) => (
        <Card key={id}
        onClick={() => toggle(id)}
        className={selected.includes(id) ? "w-64 bg-green-200" : "w-64"}>
        <CardHeader>
          <CardDescription>{course.term} · CS {course.number}</CardDescription>
          <CardTitle>{course.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{course.meets}</p>
          {selected.includes(id) && <span>✓ Selected</span>}
        </CardContent>
      </Card>
      ))}
    </div>
  );
};

export default CourseList;