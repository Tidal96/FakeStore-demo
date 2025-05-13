import TextField from "@mui/material/TextField";
import style from "../styles/SearchField.module.css";

type SearchProps = {
  setSearchQuery: (query: string) => void;
  searchQuery: string;
};

const SearchField = ({ searchQuery, setSearchQuery }: SearchProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <TextField
      className={style["search-input"]}
      id="search"
      label="Search"
      variant="filled"
      value={searchQuery}
      onChange={handleChange}
    />
  );
};

export default SearchField;