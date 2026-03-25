const Person = ({ person, onDelete }) => (
  <li>
    {person.name}: {person.number}{" "}
    <button onClick={() => onDelete(person)}>✕</button>
  </li>
);

const Persons = ({ persons, onDelete }) => (
  <ul>
    {persons.map((person) => (
      <Person key={person.id} person={person} onDelete={onDelete} />
    ))}
  </ul>
);

export { Person, Persons };
