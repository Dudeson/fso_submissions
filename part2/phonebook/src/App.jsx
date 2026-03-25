import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import { Persons } from "./components/Persons";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    type: "success",
  });

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: null, type }), 5000);
  };

  useEffect(() => {
    personService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const filtered = persons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = persons.find((p) => p.name === newName);
    if (existing) {
      if (
        !window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      )
        return;
      personService
        .update(existing.id, { ...existing, number: newNumber })
        .then((updatedPerson) => {
          setPersons(
            persons.map((p) => (p.id === existing.id ? updatedPerson : p)),
          );
          setNewName("");
          setNewNumber("");
          showNotification(`Updated ${existing.name}'s number`);
        })
        .catch(() => {
          showNotification(
            `Information of ${existing.name} has already been removed from server`,
            "error",
          );
          setPersons(persons.filter((p) => p.id !== existing.id));
        });
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
      showNotification(`Added ${newName}`);
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
      <Notification message={notification.message} type={notification.type} />
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
