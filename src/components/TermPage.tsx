import { useState } from "react";
import CourseList from "./CourseList";
import TermSelector, { type Term } from "./TermSelector";

type Course = {
  term: string;
  number: string;
  meets: string;
  title: string;
};

type Courses = Record<string, Course>;

const TermPage = ({ courses }: { courses: Courses }) => {
  const [selectedTerm, setSelectedTerm] = useState<Term>("Fall");

  const filteredCourses = Object.fromEntries(
  Object.entries(courses).filter(([, course]) => course.term === selectedTerm));

  return (
    <div className="flex flex-col items-center w-full">
      <TermSelector selected={selectedTerm} setSelected={setSelectedTerm} />
      <CourseList courses={filteredCourses} />
    </div>
  );
};

export default TermPage;
