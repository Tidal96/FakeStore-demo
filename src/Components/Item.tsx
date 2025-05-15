import { useNavigate } from "react-router-dom";
import "../Styles/item.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton } from "@mui/material";
import { useContext } from "react";
import { appContext } from "../App";
import useResponsive from "../hooks/useResponsive";
interface DataItem {
  id: number;
  img: string;
  title: string;
  category: string;
  price: number;
  description: string;
}

type itemProps = {
  id: number;
  img: string;
  title: string;
  category: string;
  price: number;
  description: string;
  showRemoveIcon?: boolean;
  onDelete?: (index: number) => void;
  data: DataItem[];
};

export default function Item({
  id,
  img,
  title,
  category,
  price,
  description,
  showRemoveIcon,
  onDelete,
  data,
}: itemProps) {
  const navigate = useNavigate();
  const { darkMode } = useContext(appContext);
  const { isXs, isSm, isMd } = useResponsive();
  const handleClickItem = () => {
    const foundItem = data.find((item) => item.id === id);

    navigate(`/product/${id}`);
  };
  const responsiveClass = isXs
    ? "menuXs"
    : isSm
      ? "menuSm"
      : isMd
        ? "menuMd"
        : "";
  return (
    <>
      <table className={`content-item ${darkMode ? "dark" : ""} ${responsiveClass}`}>
        <tr>
          <td onClick={handleClickItem}>
            <img src={img} alt={title} style={{ backgroundColor: "transparent" }} />
          </td>
          <td onClick={handleClickItem}>{title}</td>
          <td onClick={handleClickItem}>{category}</td>
          <td onClick={handleClickItem}>
            {price}
            <span className="txt-color">$</span>
          </td>
          <td onClick={handleClickItem}>{description}</td>
          <td>
            {onDelete && (
              <IconButton onClick={() => onDelete && onDelete(id)}>
                <DeleteOutlineIcon></DeleteOutlineIcon>
              </IconButton>
            )}
          </td>
        </tr>
      </table>
    </>
  );
}
