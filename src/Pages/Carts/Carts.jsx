import React, { useState, useEffect, useCallback } from "react";
import Helmet from "../../Components/Helmet/Helmet";
import { Row, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart, fetchCart } from "../../Redux/Slice/CartSlice";
import "../../css/Carts.css";
import Stars from "../../Components/StarsCustom/StarsCustom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getCookie } from "../../Routers/ProtectedRoute";

// Carts component definition
const Carts = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart.items); // Get cart items from Redux store
  const [userRating, setUserRating] = useState(0); // State for user rating
  const USERID = getCookie("id"); // Get user ID from cookies

  // Function to delete a product from the cart
  const deleteProduct = useCallback(
    async (id) => {
      await dispatch(removeItemFromCart(id)); // Dispatch action to remove item
      dispatch(fetchCart()); // Fetch updated cart
      toast.success(`Product deleted from the cart`); // Show success message
    },
    [dispatch]
  );

  // Fetch cart items when the component mounts or deleteProduct changes
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch, deleteProduct]);

  const isCartEmpty = cartItems?.length === 0; // Check if the cart is empty

  return (
    <Helmet title="Carts">
      {" "}
      {/* Helmet component to set the page title */}
      <div className="container">
        <Row
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            marginTop: "70px",
          }}
        >
          {isCartEmpty ? ( // Check if there are no items in the cart
            <h2
              className="fs-4 text-center text-red-600"
              style={{
                height: isCartEmpty ? "50vh" : "",
              }}
            >
              No item added to the cart
            </h2>
          ) : (
            <>
              {cartItems?.map(
                (
                  product // Iterate over cart items
                ) => (
                  <Card
                    style={{
                      height: "520px",
                      width: "15rem",
                    }}
                    id="card-one"
                    key={product.id}
                  >
                    <div className="card-body">
                      <div className="img">
                        <img
                          src={product.pictureUrl}
                          alt="CaresImage"
                          className="cardImage"
                        />
                      </div>
                      <div className="divider"></div>
                      <h3>{product.name}</h3>
                      <div className="text">
                        <p className="text__one">{product.price} EGP</p>
                      </div>
                      <div className="star">
                        <Stars
                          totalStars={5}
                          initialRating={userRating}
                          onChange={(rating) => setUserRating(rating)} // Handle rating change
                        />
                      </div>
                      <h4 className="text__three">
                        Category: <span>{product.category}</span>
                      </h4>
                      <div className="deleteBtn flex items-center justify-center">
                        <button
                          className="delete"
                          onClick={() => deleteProduct(USERID)} // Delete product on button click
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </Card>
                )
              )}
            </>
          )}
        </Row>
        <Row>
          <div id="order">
            <div className="flex w-full">
              {isCartEmpty ? null : ( // Check if there are items in the cart
                <>
                  <button className="buy__btn inline-block w-3/6 mx-auto">
                    <Link to="/orders">Complete Order</Link>{" "}
                    {/* Link to complete order */}
                  </button>
                </>
              )}
            </div>
          </div>
        </Row>
      </div>
    </Helmet>
  );
};

export default Carts;
