import Weather from "./Weather";

const CountryDetail = ({ country }) => {
  const languages = Object.values(country.languages || {});

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Area: {country.area.toLocaleString()} km²</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <h3>Languages</h3>
      <ul>
        {languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={country.flags.alt || `Flag of ${country.name.common}`}
        width={200}
      />
      <Weather
        capital={country.capital?.[0]}
        capitalInfo={country.capitalInfo}
      />
    </div>
  );
};

export default CountryDetail;
