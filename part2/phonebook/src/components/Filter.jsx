const Filter = ({ search, onChange }) => (
  <div>
    filter shown with: <input value={search} onChange={onChange} />
  </div>
);

export default Filter;
