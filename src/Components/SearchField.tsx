import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import style from "../Styles/searchfield.module.css";

type SearchProps = {
  setSearchQuery: (query: string) => void;
  searchQuery: string;
};

const SearchField = ({ searchQuery, setSearchQuery }: SearchProps) => {
  const theme = useTheme();

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
      sx={{
        input: {
          backgroundColor: theme.palette.mode === "dark" ? "#333" : "#fff",
          color: theme.palette.text.primary,
        },
        label: {
          color: theme.palette.text.secondary,
        },
        "& .MuiFilledInput-root": {
          backgroundColor: theme.palette.mode === "dark" ? "#333" : "#fff",
        },
      }}
    />
  );
};

export default SearchField;
