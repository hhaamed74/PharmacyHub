// MedicineAlternative.js
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import StarsCustom from "../../Components/StarsCustom/StarsCustom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../Redux/Slice/CartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "../../Routers/ProtectedRoute";
import { Link } from "react-router-dom";

const MedicineAlternative = ({ id, category }) => {
  const [alternativeMedicines, setAlternativeMedicines] = useState([]);
  const dispatch = useDispatch();
  const userID = getCookie("id");
 const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => {
    setShowDetails(!showDetails);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    const fetchAlternativeMedicines = async () => {
      try {
        let activeIngredientId;

        if (category === "Medicine") {
          if (id === "1" || id === "13" || id === "23") {
            activeIngredientId = "2";
          } else if (id === "18" || id === "22" || id === "11") {
            activeIngredientId = "3";
          } else if (id === "9" || id === "6" || id === "8") {
            activeIngredientId = "1";
          } else if (id === "25") {
            activeIngredientId = "4";
          } else {
            return;
          }

          const response = await fetch(
            `https://e-pharmacy.runasp.net/api/product?CategoryId=1&ActiveIngredientId=${activeIngredientId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch alternative medicines");
          }
          const data = await response.json();
          setAlternativeMedicines(data.data);
        }
      } catch (error) {
        console.error("Error fetching alternative medicines:", error);
      }
    };

    fetchAlternativeMedicines();
  }, [id, category]);

  const addToCart = async (product) => {
    if (product.id === 25) {
      // عرض رسالة تنبيه للمستخدم هنا
      toast.warning("This product is out of stock");
      return; // عدم إضافة المنتج للسلة
    }
    try {
      await dispatch(
        addItemToCart({
          id: userID,
          items: [
            {
              id: product.id,
              name: product.name,
              pictureUrl: product.pictureUrl,
              category: category,
              price: product.price,
              quantity: 1,
            },
          ],
        })
      );

      toast.success("Product added Successfully");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product");
    }
  };

  const [userRating, setUserRating] = useState(0);
  

  return (
    <>
      {alternativeMedicines.length > 0 && (
        <Row>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#27b43e",
              marginBottom: "30px",
            }}
          >
            Alternative Medicines
          </h2>
          {alternativeMedicines.map((medicine) => (
            <Col key={medicine.id}>
              <Card style={{ height: "530px", width: "18rem" }} id="card-one"
               className={`${
                medicine.id === 25 && "border border-red-500 bg-red-300"
              }`}
              >
                <div className={`card-body ${
                  medicine.id === 25 && "border border-red-500 bg-red-300"
                }`}>
                  <div className="icon">
                    {/* تمرير دالة addToCart كـ onClick handler */}
                    <FontAwesomeIcon
                      icon={faCartPlus}
                      className="iconCarts"
                      onClick={() => addToCart(medicine)}
                    />
                  </div>
                  <div className="img">
                    <img
                      whileHover={{ scale: 1.1 }}
                      src={medicine.pictureUrl}
                      alt="CaresImage"
                      className="cardImage"
                    />
                  </div>
                  <div className="divider"></div>
                  <h3>{medicine.name}</h3>
                  <div className="text">
                    <p className="text__one">{medicine.price} EGP</p>
                    <p className="text__two">
                      <span className="text__two__span">
                        {Math.ceil(medicine.price - medicine.price * 0.3)}{" "}
                        <del>30%</del>
                      </span>
                    </p>
                  </div>
                  <div className="star">
                    <StarsCustom
                      totalStars={5}
                      initialRating={userRating}
                      onChange={(rating) => setUserRating(rating)}
                    />
                  </div>
                  <h4
                  style={{
                    paddingBottom: "10px",
                  }}
                  className={`text__three ${
                    medicine.id === 25 && "!text-white-500"
                  }`}
                >
                  {medicine.id === 25 ? "Out of Stock" : "Available in:"}
                </h4>
                  {/* <div className="available__pharmacy flex items-center h-7 w-full">
                    {medicine.pharmacies?.map((pharmacy, index) => (
                      <span className="text-sm text-center" key={index}>
                        ⚕ {pharmacy}
                      </span>
                    ))}
                  </div> */}
                  {medicine.id !== 25 && (
                  <div className="available__pharmacy h-7 w-full">
                    {medicine.pharmacies?.map((pharmacy, index) => (
                      <span key={index} className="text-sm text-center">
                        ⚕ {pharmacy}
                      </span>
                    ))}
                  </div>
                )}
                  {/* {medicine.id === 25 && (
                    <button
                      style={{
                        backgroundColor: "#ff0000",
                        color: "#ffffff",
                        padding: "8px",
                        border: "none",
                        cursor: "not-allowed",
                        borderRadius: "6px",
                        fontSize: "14px",
                        width: "100%",
                      }}
                      whileHover={{ scale: 1.1 }}
                      className="out"
                      disabled={true}
                    >
                      Out of Stock
                    </button>
                  )} */}
                  {medicine.id === 25 ? (
                  <Link to={`/product/${medicine.id}`}>
                    <button
                      style={{ marginTop: "55px" }}
                      whileHover={{ scale: 1.1 }}
                      className="showDetails bg-red-500 border-red-500 sm:w-30 sm:h-8 sm:text-sm"
                      onClick={toggleDetails}
                    >
                      Show Details
                    </button>
                  </Link>
                ) : (
                  <Link to={`/product/${medicine.id}`}>
                    <button
                      style={{ marginTop: "5px" }}
                      onClick={toggleDetails}
                      className="showDetails sm:w-30 sm:h-8 sm:text-sm"
                    >
                      Show Details
                    </button>
                  </Link>
                )}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default MedicineAlternative;
