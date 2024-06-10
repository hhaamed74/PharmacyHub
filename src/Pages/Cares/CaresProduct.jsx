import React, { useState } from "react";
import { Col, Row, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import "../../css/Cares.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../Redux/Slice/CartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StarsCustom from "../../Components/StarsCustom/StarsCustom";
import { getCookie } from "../../Routers/ProtectedRoute";

// CaresProduct component definition
const CaresProduct = (product) => {
  const dispatch = useDispatch();
  const id = getCookie("id"); // Retrieve user ID from cookies

  // Function to handle adding product to cart
  const addToCart = async () => {
    try {
      await dispatch(
        addItemToCart({
          id: id, // User ID
          items: [
            {
              id: product.id,
              name: product.name,
              price: product.price,
              pictureUrl: product.pictureUrl,
              category: product.category,
              pharmacies: product.pharmacies,
              quantity: 1, // Default quantity to add
            },
          ],
        })
      );
      toast.success("Product added Successfully"); // Show success toast message
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product"); // Show error toast message
    }
  };

  const [showDetails, setShowDetails] = useState(false); // State to toggle product details
  const toggleDetails = () => {
    setShowDetails(!showDetails); // Toggle details state
    window.scrollTo(0, 0); // Scroll to top of the page
  };

  const [userRating, setUserRating] = useState(0); // State for user rating

  return (
    <div>
      <div className="container">
        <Row>
          <Col>
            <Card
              style={{
                height: "550px",
                width: "18rem",
              }}
              id="card-one"
            >
              <div className="card-body">
                <div className="icon">
                  <FontAwesomeIcon
                    icon={faCartPlus}
                    className="iconCarts"
                    onClick={addToCart} // Add to cart on icon click
                  />
                </div>
                <div className="img">
                  <img
                    whileHover={{ scale: 1.1 }}
                    src={product.pictureUrl}
                    alt="CaresImage"
                    className="cardImage"
                  />
                </div>
                <div className="divider"></div>
                <h3>{product.name}</h3>

                <div className="text">
                  <p className="text__one">{product.price} EGP</p>
                  <p className="text__two">
                    <span className="text__two__span">
                      {Math.ceil(product.price - product.price * 0.3)}{" "}
                      <del>30%</del> {/* Show discount */}
                    </span>
                  </p>
                </div>

                <div className="star">
                  <StarsCustom
                    totalStars={5}
                    initialRating={userRating}
                    onChange={(rating) => setUserRating(rating)} // Handle rating change
                  />
                </div>
                <h4
                  style={{
                    paddingBottom: "10px",
                  }}
                  className="text__three"
                >
                  Available in:
                </h4>
                <div className="flex items-center h-7 w-full">
                  {product.pharmacies?.map((pharmacy, index) => (
                    <span key={index} className="text-sm text-center p-1 ">
                      ⚕{pharmacy} {/* List pharmacies */}
                    </span>
                  ))}
                </div>
                {/* Add the button to toggle details */}
                <Link to={`/product/${product.id}`}>
                  <button
                    whileHover={{ scale: 1.1 }}
                    style={{
                      marginTop: "30px",
                    }}
                    onClick={toggleDetails}
                    className="showDetails sm:w-30 sm:h-8 sm:text-sm"
                  >
                    Show Details
                  </button>
                </Link>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CaresProduct;
