import Button from "@mui/material/Button";
import SearchField from "../SearchField";
import { useState, useContext, createContext } from "react";
import DropdownMenu from "./DropdownMenu";
import Switch from "@mui/material/Switch";
import { Card } from "@mui/material";
import styles from "../../styles/Menu.module.css";
import { appContext } from "../../App";
import { Link } from "react-router-dom";

type MenuProps = {
  setSearchQuery: (query: string) => void;
  searchQuery: string;
  selectedItem: string | null;
  setSelectedItem: (selected: string | null) => void;
  showDropdownMenu?: boolean;
};


export default function Menu({
  searchQuery,
  setSearchQuery,
  selectedItem,
  setSelectedItem,
  showDropdownMenu = true,
}: MenuProps) {
  const { darkMode, toggleDarkMode } = useContext(appContext);

  return (
    <Card className={styles.menu}>
      <Link to="/">
        <h1 className={styles["txt-color"]}>Fake Store</h1>
      </Link>
      <div className={styles.element}>
        <Link to="/cart">
          <Button className={styles["txt-btn"]}>Cart</Button>
        </Link>

        {showDropdownMenu && (
          <div className={styles["category-container"]}>
            <DropdownMenu
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          </div>
        )}

        <Switch checked={darkMode} onChange={toggleDarkMode} />
        <SearchField
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
    </Card>
  );
}


