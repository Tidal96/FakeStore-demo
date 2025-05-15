import { useState, useMemo } from "react";
import Menu from "./molecule/Menu";
import Item from "../Components/Item";
import ContentGrid from "./ContentGrid";
import "../Styles/homepage.css";
import { useQuery } from "@tanstack/react-query";
import useResponsive from "../hooks/useResponsive";
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
  const { isXs, isSm, isMd, isLg } = useResponsive();

  const {
    data = [],
    isLoading: loading,
    error,
  } = useQuery<DataItem[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("https://fakestoreapi.com/products/");
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    },
  });

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

  const loadingClass = isXs
    ? "loading-message-xs"
    : isSm
      ? "loading-message-sm"
      : "loading-message";

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
          <div className={loadingClass}>
            Loading products…
          </div>
        )}

        {error && (
          <div className="error-message">
            Error loading products: {(error as Error).message}
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
}
