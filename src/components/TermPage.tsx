import { useState } from "react";
import CourseList from "./CourseList";
import TermSelector, { type Term } from "./TermSelector";
import Modal from "./Modal";

type Course = {
  term: string;
  number: string;
  meets: string;
  title: string;
};

type Courses = Record<string, Course>;

const TermPage = ({ courses }: { courses: Courses }) => {
  const [selectedTerm, setSelectedTerm] = useState<Term>("Fall");
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(x => x !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const filteredCourses = Object.fromEntries(
    Object.entries(courses).filter(([, course]) => course.term === selectedTerm)
  );

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center w-full">
        <TermSelector selected={selectedTerm} setSelected={setSelectedTerm} />
        <button
          className="ml-auto px-4 py-2 rounded font-semibold bg-white text-[#282c34]"
          onClick={() => setOpen(true)}
        >
          Course plan
        </button>
      </div>

      <CourseList courses={filteredCourses} selected={selected} toggle={toggle} />

      <Modal open={open} onClose={() => setOpen(false)}>
        <h2 className="text-lg font-semibold mb-3">Your course plan</h2>
        {selected.length === 0 ? (
          <p className="text-sm">
            No courses selected. Click a course card to add it to your plan.
          </p>
        ) : (
          selected.map(id => (
            <p key={id} className="text-sm">
              CS {courses[id].number}: {courses[id].title} — {courses[id].meets}
            </p>
          ))
        )}
      </Modal>
    </div>
  );
};

export default TermPage;