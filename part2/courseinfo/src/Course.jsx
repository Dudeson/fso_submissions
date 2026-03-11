const Header = ({ course }) => <h1>{course}</h1>;

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} partName={part.name} exercises={part.exercises} />
    ))}
  </div>
);

const Total = ({ parts }) => (
  <strong>
    Total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
  </strong>
);

const Part = ({ partName, exercises }) => (
  <p>
    {partName} {exercises}
  </p>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
