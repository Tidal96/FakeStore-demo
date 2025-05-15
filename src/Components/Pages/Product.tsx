import Menu from "../molecule/Menu";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Snackbar, Alert } from "@mui/material";
import "../../Styles/product.css";
import { useContext } from "react";
import { appContext } from "../../App";
import useResponsive from "../../hooks/useResponsive";
interface DataItem {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
}

export default function Product() {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [data, setData] = useState<DataItem>();
    const [error, setError] = useState(null);
    const { productId } = useParams<{ productId: string }>();
    const [open, setOpen] = useState(false);
    const { darkMode } = useContext(appContext)
    const { isXs, isSm, isMd } = useResponsive();

    async function fetchProduct() {
        try {
            const response = await fetch(
                `https://fakestoreapi.com/products/${productId}`
            );
            const products = await response.json();
            setData(products);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [productId]);


    const handleAdd = () => {
        if (!data) return;

        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const updatedCart = [...cart, data];

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        console.log("Product added to cart:", data);
        setOpen(true)
    };
    const handleClose = (_: any, reason?: string) => {
        if (reason === "click away") return;
        setOpen(false);
    };
    const productContainerClass = `product-container ${darkMode ? "dark" : ""} ${isXs ? "product-container-xs" : isSm ? "product-container-sm" : isMd ? "product-container-md" : ""}`;

    const containerClass = `container ${darkMode ? "dark" : ""} ${isXs ? "container-xs" : isSm ? "container-sm" : isMd ? "container-md" : ""}`;

    return (
        <>
            <Menu
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                showDropdownMenu={false}
                showSearchField={false}

            ></Menu>

            {data && (
                <div className={productContainerClass}>
                    <div className={containerClass}>
                        <div key={data.id}>
                            <h3>{data.title}</h3>
                            <p>{data.description}</p>
                            <img src={data.image} alt={data.title} width="100" style={{ backgroundColor: "transparent" }} />
                            <p className="price">Price: ${data.price}</p>
                        </div>
                    </div>
                </div>
            )}
            <Button variant="contained" onClick={handleAdd} sx={{
                color: "aliceblue"
            }}>
                Add to cart +
            </Button>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{
                    top: '50% !important',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '30px',
                }}
            >
                <Alert onClose={handleClose} severity="success">
                    Product added to cart!
                </Alert>
            </Snackbar>

        </>
    );
}

