import { useState, useEffect } from "react";
import countryService from "./services/countries";
import Search from "./components/Search";
import CountryList from "./components/CountryList";
import CountryDetail from "./components/CountryDetail";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    countryService.getAll().then((data) => setCountries(data));
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setSelected(null);
  };

  const filtered = search
    ? countries.filter((c) =>
        c.name.common.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  const renderResults = () => {
    if (!search) return null;

    if (selected) return <CountryDetail country={selected} />;

    if (filtered.length > 10)
      return <p>Too many matches, specify another filter</p>;

    if (filtered.length === 0) return <p>No matches found</p>;

    if (filtered.length === 1) return <CountryDetail country={filtered[0]} />;

    return <CountryList countries={filtered} onShow={setSelected} />;
  };

  return (
    <div>
      <h1>Countries</h1>
      <Search search={search} onChange={handleSearchChange} />
      {renderResults()}
    </div>
  );
};

export default App;
