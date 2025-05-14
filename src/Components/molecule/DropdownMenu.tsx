import "../../Styles/dropdown.css";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

type MenuProps = {
  selectedItem: string | null;
  setSelectedItem: (selected: string | null) => void;
};

function DropdownMenu({ selectedItem, setSelectedItem }: MenuProps) {
  const categories = [
    { name: "All Categories" },
    { name: "electronics" },
    { name: "jewelery" },
    { name: "men's clothing" },
    { name: "women's clothing" },
  ];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSelectItem = (name: string) => {
    setSelectedItem(name === "All Categories" ? null : name);
    handleClose();
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {selectedItem || "Category"}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {categories.map((item) => (
          <MenuItem key={item.name} onClick={() => handleSelectItem(item.name)}>
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default DropdownMenu;
