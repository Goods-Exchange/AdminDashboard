import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { Carousel } from "primereact/carousel";
import { ProductService } from "../../getDataService";
import "../../LandingPageDetail/Css/CarouselProduct.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function CircularDemo() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  useEffect(() => {
    ProductService.getProductsSmall().then((data) =>
      setProducts(data.slice(0, 9))
    );
  }, []);

  const handleProductClick = (productId) => {
    // Replace `/login` with the actual path where you want to navigate
    navigate(`/login`);
  };

  const productTemplate = (product) => {
    return (
      <div className="product-card" onClick={() => handleProductClick(product.id)}>
        <div className="product-image">
          <img
            src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
            alt={product.name}
          />
        </div>
        <div className="product-details">
          <h4 className="product-name">{product.name}</h4>
          <h6 className="product-price">${product.price}</h6>
          {/* Uncomment if needed */}
          {/* <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
          <div className="product-actions">
            <Button icon="pi pi-search" className="p-button p-button-rounded" />
            <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" />
          </div> */}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Box
        sx={{
          width: { sm: "100%", md: "100%" },
          textAlign: { sm: "center", md: "center" },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Product
        </Typography>
        <Typography variant="body1" color="text.secondary">
          See what products are available in our exchange app
        </Typography>
      </Box>
      <div className="card">
        <Carousel
          value={products}
          numVisible={3}
          numScroll={3}
          responsiveOptions={responsiveOptions}
          className="custom-carousel"
          circular
          autoplayInterval={100000}
          itemTemplate={productTemplate}
        />
      </div>
    </div>
  );
}
