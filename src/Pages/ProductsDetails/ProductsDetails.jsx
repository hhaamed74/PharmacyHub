// Importing necessary modules
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../Redux/Slice/CartSlice";
import "./ProductDetail.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StarsCustom from "../../Components/StarsCustom/StarsCustom";
import Helmet from "../../Components/Helmet/Helmet";
import MedicineAlternative from "../Medicine/MedicineAlternative";
import MedicineSimilar from "../Medicine/MedicineSimilar";
import { getCookie } from "../../Routers/ProtectedRoute";

const ProductDetail = () => {
  // State for user rating
  const [userRating, setUserRating] = useState(0);

  // Dispatch function for Redux actions
  const dispatch = useDispatch();

  // Getting the id from the URL parameters
  const { id } = useParams();

  // State for product details and loading status
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  // Getting UserId from cookies
  const UserId = getCookie("id");

  // Fetch product details when component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://e-pharmacyhub-edarcdhhakcaeaad.eastus-01.azurewebsites.net/api/product/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Add product to cart function
  const addToCart = async () => {
    try {
      await dispatch(
        addItemToCart({
          id: UserId,
          items: [
            {
              id: product.id,
              name: product.name,
              pictureUrl: product.pictureUrl,
              category: product.category,
              price: product.price,
              quantity: 1,
            },
          ],
        })
      );
    } catch (error) {}
    toast.success("Product added Successfully");
  };

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // If product not found
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Helmet title={product.name}>
      {/* Product details section */}
      <section className="pt-0 pb-3">
        <div style={{ marginTop: "30px" }} className="container">
          <Row>
            <Col lg="6">
              {/* Product image */}
              <div
                style={{
                  marginTop: "30px",
                  height: "auto",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <img
                  src={product.pictureUrl}
                  alt={product.name}
                  style={{
                    maxWidth: "300px",
                  }}
                />
              </div>
            </Col>
            <Col lg="6">
              {/* Product details */}
              <div className="product__details">
                <h2>{product.name}</h2>
                {/* User rating */}
                <div className="product__rating">
                  <StarsCustom
                    totalStars={5}
                    initialRating={userRating}
                    onChange={(rating) => setUserRating(rating)}
                  />
                </div>
                {/* Product price */}
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {product.price} EGY
                </p>

                {/* Available pharmacies */}
                {product.id !== 25 && (
                  <>
                    <h4 className="mt-3">Available in:</h4>
                    <div className="available">
                      {product.pharmacies?.map((pharmacy, index) => (
                        <span key={index}>⚕ {pharmacy}</span>
                      ))}
                    </div>
                  </>
                )}
                {/* Add to cart button */}
                {product.id !== 25 && (
                  <button
                    style={{
                      outline: "none",
                      border: "1px solid #48d760",
                      background: "#48d760",
                      color: "#ffffff",
                      fontWeight: "600",
                      borderRadius: "6px",
                      textAlign: "center",
                      width: "130px",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                    onClick={addToCart}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </Col>
          </Row>
          {/* Alternative medicines section */}
          <Row
            style={{
              marginTop: "50px",
            }}
          >
            <Col>
              <MedicineAlternative id={id} category="Medicine" />
            </Col>
          </Row>
          {/* Similar medicines section */}
          <Row
            style={{
              marginTop: "50px",
            }}
          >
            <Col>
              <MedicineSimilar id={id} category="Medicine" />
            </Col>
          </Row>
        </div>
      </section>
    </Helmet>
  );
};

export default ProductDetail;
