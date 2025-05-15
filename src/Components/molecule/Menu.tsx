import Button from "@mui/material/Button";
import SearchField from "../SearchField";
import { useState, useContext, createContext } from "react";
import DropdownMenu from "./DropdownMenu";
import Switch from "@mui/material/Switch";
import { Card } from "@mui/material";
import styles from "../../Styles/Menu.module.css";
import { appContext } from "../../App";
import { Link } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";


type MenuProps = {
  setSearchQuery: (query: string) => void;
  searchQuery: string;
  selectedItem: string | null;
  setSelectedItem: (selected: string | null) => void;
  showDropdownMenu?: boolean;
  showSearchField?: boolean;
};


export default function Menu({
  searchQuery,
  setSearchQuery,
  selectedItem,
  setSelectedItem,
  showDropdownMenu = true,
  showSearchField = true,
}: MenuProps) {
  const { darkMode, toggleDarkMode } = useContext(appContext);
  const { isXs, isSm, isMd } = useResponsive();

  const menuClass = `${styles.menu} ${isXs ? styles.menuXs : isSm ? styles.menuSm : ""}`;
  const wrapperClass = `${styles["layout-wrapper"]} ${isXs ? styles.wrapperXs : isSm ? styles.wrapperSm : ""}`;
  const elementClass = `${styles.element} ${isXs ? styles.elementXs : isSm ? styles.elementSm : ""}`;

  return (
    <Card className={menuClass} elevation={0}>
      <Card className={wrapperClass} elevation={0}>
        <Link to="/">
          <h1 className={styles["txt-color"]}>Fake Store</h1>
        </Link>
        <div className={elementClass}>
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
          {showSearchField && (
            <SearchField
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}

        </div>
      </Card>
    </Card>
  );
}


