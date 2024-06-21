import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import StarsCustom from "../../Components/StarsCustom/StarsCustom";
import { useDispatch } from "react-redux";
import { getCookie } from "../../Routers/ProtectedRoute";
import { addItemToCart } from "../../Redux/Slice/CartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const MedicineSimilar = ({ id, category }) => {
  const [similarMedicines, setSimilarMedicines] = useState([]);
  const dispatch = useDispatch();
  const userID = getCookie("id");

  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => {
    setShowDetails(!showDetails);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    const fetchSimilarMedicines = async () => {
      try {
        let diseaseId;

        // Check if the category is "Medicine" before fetching similar medicines
        if (category === "Medicine") {
          // Determine disease ID based on the provided ID
          if (id === "1" || id === "13" || id === "23") {
            diseaseId = "2";
          } else if (id === "18" || id === "22" || id === "11") {
            diseaseId = "3";
          } else if (id === "9" || id === "6" || id === "8") {
            diseaseId = "1";
          } else if (id === "25") {
            diseaseId = "4";
          } else {
            return; // Don't fetch similar medicines for other IDs
          }

          const response = await fetch(
            `https://e-pharmacyhub-edarcdhhakcaeaad.eastus-01.azurewebsites.net/api/product?CategoryId=1&DiseaseId=${diseaseId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch similar medicines");
          }
          const data = await response.json();
          setSimilarMedicines(data.data);
        }
      } catch (error) {
        console.error("Error fetching similar medicines:", error);
      }
    };

    fetchSimilarMedicines();
  }, [id, category]);

  const [userRating, setUserRating] = useState(0);
  const addToCart = async (product) => {
    if (product.id === 25) {
      toast.warning("This product is out of stock");
      return;
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

  return (
    <>
      {similarMedicines.length > 0 && (
        <Row>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#27b43e",
              marginBottom: "30px",
            }}
          >
            Similar Medicines
          </h2>
          {similarMedicines.map((medicine) => (
            <Col key={medicine.id}>
              <Card
                style={{ height: "550px", width: "18rem" }}
                id="card-one"
                className={`${
                  medicine.id === 25 && "border border-red-500 bg-red-300"
                }`}
              >
                <div
                  className={`card-body ${
                    medicine.id === 25 && "border border-red-500 bg-red-300"
                  }`}
                >
                  <div className="icon">
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

                  {medicine.id !== 25 && (
                    <div className="available__pharmacy h-7 w-full">
                      {medicine.pharmacies?.map((pharmacy, index) => (
                        <span key={index} className="text-sm text-center">
                          ⚕ {pharmacy}
                        </span>
                      ))}
                    </div>
                  )}
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

export default MedicineSimilar;
