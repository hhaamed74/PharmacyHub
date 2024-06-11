import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getCookie } from "../../Routers/ProtectedRoute";
import { Link } from "react-router-dom";
import { fetchDeliveryMethods } from "../../Redux/Slice/deliveryMethods";
import { useDispatch } from "react-redux";
import "./Summery.css";
function Summary() {
  // Selectors
  const cartItems = useSelector((state) => state.cart.cart.items);
  const deliveryMethods = useSelector(
    (state) => state.deliveryMethods.deliveryMethods
  );
  const status = useSelector((state) => state.deliveryMethods.status);
  const error = useSelector((state) => state.deliveryMethods.error);

  // Dispatch
  const dispatch = useDispatch();

  // State
  const [selectedMethodId, setSelectedMethodId] = useState(0);
  const [selectedMethodCost, setSelectedMethodCost] = useState(0);
  const [billingData, setBillingData] = useState({
    // Initial billing data including user id, items, delivery method id, shipping price, and payment intent id
    id: getCookie("id"),
    items: [],
    deliveryMethodId: selectedMethodId,
    shippingPrice: 0,
    paymentIntentId: "",
    clientSecret:
      "pk_test_51PCvbyCUzw0yD3H3EwAbARz3bRkiMAUn8c3Xzv1OcLxBjJF2OfYJUUEZ9rLB8Si9A2g0FRpLPc7I4gE3xRit5Li300A8pW0PBL",
  });

  // Load billingData from localStorage on component mount
  useEffect(() => {
    const savedBillingData = localStorage.getItem("billingData");
    if (savedBillingData) {
      setBillingData(JSON.parse(savedBillingData));
    }
  }, []);

  // Save billingData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("billingData", JSON.stringify(billingData));
  }, [billingData]);

  // Fetch delivery methods on component mount
  useEffect(() => {
    dispatch(fetchDeliveryMethods());
  }, [dispatch]);

  // Handler for selecting delivery method
  const handleSelectChange = (event) => {
    const selectedId = parseInt(event.target.value);
    setSelectedMethodId(selectedId);
    const selectedMethod = deliveryMethods.find(
      (method) => method.id === selectedId
    );
    const cost = selectedMethod ? selectedMethod.cost : 0;
    setSelectedMethodCost(cost);

    // Update billing data with selected delivery method and its cost
    setBillingData((prevData) => ({
      ...prevData,
      deliveryMethodId: selectedId,
      shippingPrice: cost,
    }));
  };

  // State for item quantities in cart
  const [quantities, setQuantities] = useState({});

  // Initialize quantities and billing data when cart items change
  useEffect(() => {
    const initialQuantities = cartItems.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {});
    setQuantities(initialQuantities);

    // Update billing data with cart items
    setBillingData((prevData) => ({
      ...prevData,
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        pictureUrl: item.pictureUrl,
        category: item.category,
        price: item.price,
        quantity: item.quantity,
      })),
    }));
  }, [cartItems]);

  // Handler to increase quantity of an item in cart
  const increaseQuantity = (itemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: prevQuantities[itemId] + 1,
    }));

    // Update billing data when quantity is increased
    setBillingData((prevData) => ({
      ...prevData,
      items: prevData.items.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));
  };

  // Handler to decrease quantity of an item in cart
  const decreaseQuantity = (itemId) => {
    if (quantities[itemId] > 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: prevQuantities[itemId] - 1,
      }));

      // Update billing data when quantity is decreased
      setBillingData((prevData) => ({
        ...prevData,
        items: prevData.items.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        ),
      }));
    }
  };

  // Calculate total price including shipping
  const calculateTotalPrice = () => {
    let total = billingData.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    total += billingData.shippingPrice;
    return total;
  };

  // Content based on delivery methods loading status
  let content;

  if (status === "loading") {
    content = <div>Loading...</div>;
  } else if (status === "succeeded") {
    content = (
      <select
        value={selectedMethodId}
        onChange={handleSelectChange}
        style={{
          padding: "10px 20px",
          fontWeight: "bold",
          marginTop: "20px",
        }}
      >
        <option value="" disabled>
          Select a delivery method
        </option>
        {deliveryMethods.map((method) => (
          <option key={method.id} value={method.id}>
            {method.name} - ${method.cost} ({method.deliveryTime})
          </option>
        ))}
      </select>
    );
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div>
      <div className="card-body shadow-md">
        <div className="card">
          <div className="card-header border-1 border-green-500 bg-green-100">
            Order Summary
          </div>
          {/* Alert when cart is empty */}
          {cartItems.length === 0 && (
            <div className="alert alert-warning" role="alert">
              There are no items in the cart. Please add some items.
            </div>
          )}
          {/* List of cart items */}
          <ul className="list-group">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={item.pictureUrl}
                    alt={item.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                  />
                  <div>
                    <p className="mb-0">{item.name}</p>
                    <span className="text-green-600 font-semibold">
                      {item.price} EGP
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  {/* Button to decrease quantity */}
                  <button
                    className="btn btn-sm me-2"
                    onClick={() => decreaseQuantity(item.id)}
                    style={{
                      backgroundColor: "#27b43e",
                      color: "#f7f7f7",
                    }}
                  >
                    -
                  </button>
                  <span
                    className="badge rounded-pill"
                    style={{
                      backgroundColor: "#27b43e",
                      color: "#f7f7f7",
                    }}
                  >
                    {quantities[item.id]}
                  </span>
                  {/* Button to increase quantity */}
                  <button
                    className="btn btn-sm ms-2"
                    onClick={() => increaseQuantity(item.id)}
                    style={{
                      backgroundColor: "#27b43e",
                      color: "#f7f7f7",
                    }}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {/* Shipping cost */}
          <div className="d-flex justify-content-between px-4">
            <p>Shipping:</p>
            <p>Cost: ${selectedMethodCost}</p>
          </div>
          {/* Subtotal */}
          <div className="d-flex justify-content-between mt-4 px-4">
            <p>Sub total:</p>
            <p>{calculateTotalPrice()} EGP</p>
          </div>
          <hr />
          {/* Total */}
          <div className="d-flex justify-content-between px-4">
            <p>Total:</p>
            <p>{calculateTotalPrice()} EGP</p>
          </div>
        </div>
      </div>

      {/* Delivery Methods */}

      <section className="delivery">
        <h6 className="mt-4">Delivery Methods</h6>
        {/* Dropdown for selecting delivery method */}
        {content}
        {/* Details of selected delivery method */}
        {selectedMethodId && (
          <div className="methods">
            <h5 className="mt-2">Selected Delivery Method Details st</h5>
            {deliveryMethods
              .filter((method) => method.id === parseInt(selectedMethodId))
              .map((method) => (
                <div key={method.id} className="method__details">
                  <p>
                    Name: <span>{method.name}</span>
                  </p>
                  <p>
                    Description: <span>{method.description}</span>
                  </p>
                  <p>
                    Cost: <span>${method.cost}</span>
                  </p>
                  <p>
                    Delivery Time: <span>{method.deliveryTime}</span>
                  </p>
                </div>
              ))}
          </div>
        )}
      </section>
      {/* Checkout button */}
      <button
        className="btn mt-4 w-full my-8"
        style={{
          backgroundColor: "#13a03b",
          border: "1px solid #13a03b",
        }}
      >
        <Link
          style={{
            color: "white",
          }}
          to="/checkout"
        >
          Checkout
        </Link>
      </button>
    </div>
  );
}

export default Summary;
