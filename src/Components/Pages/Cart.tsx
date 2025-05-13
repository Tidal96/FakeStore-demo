import Menu from "../molecule/Menu";
import { useEffect, useState } from "react";
import ContentGrid from "../ContentGrid";
import Item from "../Item";
import "../../styles/Cart.css";
type Cartprops = {
  id: number;
  title: string;
  price: number;
  description: string;
};
function Cart() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [list, setList] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart") ?? "[]");
    setList(data);
  }, []);
  const removeItem = (index: number) => {
    const newList = list.filter((_, i) => i !== index);

    setList(newList);
    localStorage.setItem("cart", JSON.stringify(newList));
  };

  return (
    <>
      <Menu
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        showDropdownMenu={false}
      ></Menu>
      <div className="cart-container">

        <ContentGrid title="Cart">
          {list.length > 0 ? (
            list.map((row: any, index: number) => (
              <Item
                img={row.image}
                title={row.title}
                category={row.category}
                price={row.price}
                description={row.description}
                showRemoveIcon={true}
                onDelete={() => removeItem(index)}
                id={row.id}
                data={[]}
              />
            ))
          ) : (
            <p style={{ textAlign: "center", padding: "20px", fontSize: "18px" }}>
              Your cart is empty!
            </p>
          )}
        </ContentGrid>

      </div>
    </>
  );
}
export default Cart;
