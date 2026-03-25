const CountryList = ({ countries, onShow }) => (
  <ul style={{ listStyle: "none", padding: 0 }}>
    {countries.map((country) => (
      <li key={country.cca3} style={{ marginBottom: "4px" }}>
        {country.name.common}{" "}
        <button onClick={() => onShow(country)}>show</button>
      </li>
    ))}
  </ul>
);

export default CountryList;
