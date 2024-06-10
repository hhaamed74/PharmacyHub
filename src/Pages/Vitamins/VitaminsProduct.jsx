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

const VitaminsProduct = (product) => {
  // Redux dispatch hook
  const dispatch = useDispatch();

  // Get user ID from cookies
  const id = getCookie("id");

  // Function to add item to cart
  const addToCart = async () => {
    try {
      await dispatch(
        addItemToCart({
          id: id,
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

  // State for toggling details view
  const [showDetails, setShowDetails] = useState(false);

  // Function to toggle details view
  const toggleDetails = () => {
    setShowDetails(!showDetails);
    window.scrollTo(0, 0);
  };

  // State for user rating
  const [userRating, setUserRating] = useState(0);

  return (
    <div>
      <div className="container">
        <Row>
          <Col>
            {/* Product card */}
            <Card
              style={{
                height: "560px",
                width: "18rem",
              }}
              id="card-one"
            >
              <div className="card-body">
                {/* Add to cart icon */}
                <div className="icon">
                  <FontAwesomeIcon
                    icon={faCartPlus}
                    className="iconCarts"
                    onClick={addToCart}
                  />
                </div>
                {/* Product image */}
                <div className="img">
                  <img
                    whileHover={{ scale: 1.1 }}
                    src={product.pictureUrl}
                    alt="CaresImage"
                    className="cardImage"
                  />
                </div>
                {/* Divider */}
                <div className="divider"></div>
                {/* Product name */}
                <h3 className="!text-lg">{product.name}</h3>

                {/* Product price */}
                <div className="text">
                  <p className="text__one">{product.price} EGP</p>
                  {/* Discounted price */}
                  <p className="text__two">
                    <span className="text__two__span">
                      {Math.ceil(product.price - product.price * 0.3)}{" "}
                      <del>30%</del>
                    </span>
                  </p>
                </div>

                {/* Star rating */}
                <div className="star">
                  <StarsCustom
                    totalStars={5}
                    initialRating={userRating}
                    onChange={(rating) => setUserRating(rating)}
                  />
                </div>
                {/* Available pharmacies */}
                <h4
                  style={{
                    paddingBottom: "10px",
                  }}
                  className="text__three"
                >
                  Available in:
                </h4>
                <div className="available__pharmacy h-7 w-full">
                  {product.pharmacies?.map((pharmacy, index) => (
                    <span key={index}>⚕ {pharmacy}</span>
                  ))}
                </div>
                {/* Button to show details */}
                {product.id === 25 ? (
                  // Button disabled if product is out of stock
                  <button
                    whileHover={{ scale: 1.1 }}
                    className="outOfStock"
                    disabled={true}
                  >
                    Show Details{" "}
                  </button>
                ) : (
                  // Link to product details page
                  <Link to={`/product/${product.id}`}>
                    <button
                      whileHover={{ scale: 1.1 }}
                      onClick={toggleDetails}
                      className="showDetails sm:w-30 sm:h-8 sm:text-sm"
                    >
                      Show Details{" "}
                    </button>
                  </Link>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default VitaminsProduct;
