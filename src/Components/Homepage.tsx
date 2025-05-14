import { useEffect, useState, useMemo } from "react";
import Menu from "./molecule/Menu";
import Item from "../Components/Item";
import ContentGrid from "./ContentGrid";
import "../Styles/homepage.css";
interface DataItem {
  id: number;
  title: string;
  image: string;
  category: string;
  price: number;
  description: string;
}

export default function Homepage() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://fakestoreapi.com/products/");
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const jsonData: DataItem[] = await response.json();
        setData(jsonData);
      } catch (err: any) {
        console.error("Error fetching products:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);


  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchesText = row.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedItem === null || row.category === selectedItem;
      return matchesText && matchesCategory;
    });
  }, [data, searchQuery, selectedItem]);

  return (
    <>
      <Menu
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />

      <ContentGrid title="List Of Products">
        {loading && (
          <div style={{
            width: "100%",
            textAlign: "center",
            padding: "2rem 0",
            fontSize: "1.25rem",
          }}>
            Loading products…
          </div>
        )}

        {error && (
          <div className="error-message">
            Error loading products: {error}
          </div>
        )}

        {!loading && !error && filteredData.length === 0 && (
          <div className="loading-message">
            No products match your criteria.
          </div>
        )}

        {!loading &&
          !error &&
          filteredData.map((row) => (
            <Item
              key={row.id}
              id={row.id}
              img={row.image}
              title={row.title}
              category={row.category}
              price={row.price}
              description={row.description}
              showRemoveIcon={false}
              data={[]}
            />
          ))}
      </ContentGrid>
    </>
  );
};


