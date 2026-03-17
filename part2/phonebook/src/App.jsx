import { useState, useEffect } from "react";
import personService from "./services/persons";

const Filter = ({ search, onChange }) => (
  <div>
    filter shown with: <input value={search} onChange={onChange} />
  </div>
);

const PersonForm = ({
  onSubmit,
  newName,
  onNameChange,
  newNumber,
  onNumberChange,
}) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={newName} onChange={onNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

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

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const filtered = persons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.some((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService.create(personObject).then((savedPerson) => {
      setPersons(persons.concat(savedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleDelete = (person) => {
    if (!window.confirm(`Delete ${person.name}?`)) return;
    personService.remove(person.id).then(() => {
      setPersons(persons.filter((p) => p.id !== person.id));
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <h2>Search</h2>
      <Filter search={search} onChange={(e) => setSearch(e.target.value)} />

      <h2>Add a new one</h2>
      <PersonForm
        onSubmit={handleSubmit}
        newName={newName}
        onNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        onNumberChange={(e) => setNewNumber(e.target.value)}
      />
      <h2>Numbers</h2>
      <Persons persons={filtered} onDelete={handleDelete} />
    </div>
  );
};

export default App;
