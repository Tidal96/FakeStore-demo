import { useNavigate } from "react-router-dom";
import "../styles/Item.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton } from "@mui/material";
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
function Item({
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
  const handleClickItem = () => {
    const foundItem = data.find((item) => item.id === id);
    console.log(foundItem);
    navigate(`/product/${id}`);
  };

  return (
    <>
      <table className="content-item">
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
export default Item;