import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCookie } from '../../Routers/ProtectedRoute';
import { Link } from 'react-router-dom';
import { fetchDeliveryMethods } from '../../Redux/Slice/deliveryMethods';
import { useDispatch } from 'react-redux';

function Summary() {
  const cartItems = useSelector((state) => state.cart.cart.items);
  const dispatch = useDispatch();
  const deliveryMethods = useSelector(
    (state) => state.deliveryMethods.deliveryMethods,
  );
  const status = useSelector((state) => state.deliveryMethods.status);
  const error = useSelector((state) => state.deliveryMethods.error);
  const [selectedMethodId, setSelectedMethodId] = useState(0);
  const [selectedMethodCost, setSelectedMethodCost] = useState(0);

  const [billingData, setBillingData] = useState({
    id: getCookie('id'),
    items: [],
    deliveryMethodId: selectedMethodId,
    shippingPrice: 0,
    paymentIntentId: '',
    clientSecret:
      'pk_test_51PCvbyCUzw0yD3H3EwAbARz3bRkiMAUn8c3Xzv1OcLxBjJF2OfYJUUEZ9rLB8Si9A2g0FRpLPc7I4gE3xRit5Li300A8pW0PBL',
  });
  // Load billingData from localStorage on component mount
  useEffect(() => {
    const savedBillingData = localStorage.getItem('billingData');
    if (savedBillingData) {
      setBillingData(JSON.parse(savedBillingData));
    }
  }, []);

  // Save billingData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('billingData', JSON.stringify(billingData));
  }, [billingData]);
  useEffect(() => {
   dispatch(fetchDeliveryMethods());
  }, [dispatch]);

  const handleSelectChange = (event) => {
    const selectedId = parseInt(event.target.value);
    setSelectedMethodId(selectedId);
    const selectedMethod = deliveryMethods.find(
      (method) => method.id === selectedId,
    );
    const cost = selectedMethod ? selectedMethod.cost : 0;
    setSelectedMethodCost(cost);

    setBillingData((prevData) => ({
      ...prevData,
      deliveryMethodId: selectedId,
      shippingPrice: cost,
    }));
  };

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const initialQuantities = cartItems.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {});
    setQuantities(initialQuantities);

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

  const increaseQuantity = (itemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: prevQuantities[itemId] + 1,
    }));

    setBillingData((prevData) => ({
      ...prevData,
      items: prevData.items.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    }));
  };

  const decreaseQuantity = (itemId) => {
    if (quantities[itemId] > 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: prevQuantities[itemId] - 1,
      }));

      setBillingData((prevData) => ({
        ...prevData,
        items: prevData.items.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item,
        ),
      }));
    }
  };

  const calculateTotalPrice = () => {
    let total = billingData.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    total += billingData.shippingPrice;
    return total;
  };

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = (
      <select value={selectedMethodId} onChange={handleSelectChange}>
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
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div>
      <div className="card-body shadow-md">
        <div className="card">
          <div className="card-header border-1 border-green-500 bg-green-100">
            Order Summary
          </div>
          {cartItems.length === 0 && (
            <div className="alert alert-warning" role="alert">
              There are no items in the cart. Please add some items.
            </div>
          )}
          <ul className="list-group">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img
                    src={item.pictureUrl}
                    alt={item.name}
                    style={{
                      width: '50px',
                      height: '50px',
                      marginRight: '10px',
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
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => decreaseQuantity(item.id)}>
                    -
                  </button>
                  <span className="badge bg-primary rounded-pill">
                    {quantities[item.id]}
                  </span>
                  <button
                    className="btn btn-sm btn-primary ms-2"
                    onClick={() => increaseQuantity(item.id)}>
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-between px-4">
            <p>Shipping:</p>
            <p>Cost: ${selectedMethodCost}</p>
          </div>
          <div className="d-flex justify-content-between mt-4 px-4">
            <p>Sub total:</p>
            <p>{calculateTotalPrice()} EGP</p>
          </div>
          <hr />
          <div className="d-flex justify-content-between px-4">
            <p>Total:</p>
            <p>{calculateTotalPrice()} EGP</p>
          </div>
        </div>
      </div>
      <section>
        <h6 className="mt-4">Delivery Methods</h6>
        {content}
        {selectedMethodId && (
          <div>
            <h5 className="mt-2">Selected Delivery Method Details</h5>
            {deliveryMethods
              .filter((method) => method.id === parseInt(selectedMethodId))
              .map((method) => (
                <div key={method.id}>
                  <p>Name: {method.name}</p>
                  <p>Description: {method.description}</p>
                  <p>Cost: ${method.cost}</p>
                  <p>Delivery Time: {method.deliveryTime}</p>
                </div>
              ))}
          </div>
        )}
      </section>
      <button className="btn btn-success mt-4 w-full my-8">
        <Link
          style={{
            color: 'white',
          }}
          to="/checkout">
          Checkout
        </Link>
      </button>
    </div>
  );
}

export default Summary;
