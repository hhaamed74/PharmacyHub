import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Card } from "react-bootstrap";
import { Prescription, Upload } from "../../Assets/img/index"; // Importing images
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../Redux/Slice/CartSlice"; // Importing Redux action
import "../../css/Cares.css"; // Importing CSS file
import { toast } from "react-toastify"; // Importing toast notification
import "react-toastify/dist/ReactToastify.css"; // Importing toast notification CSS
import "./Search.css"; // Importing Search component CSS
import StarsCustom from "../StarsCustom/StarsCustom"; // Importing StarsCustom component
import { Link } from "react-router-dom"; // Importing Link component
import { getCookie } from "../../Routers/ProtectedRoute"; // Importing getCookie function

const Search = () => {
  const [userRating, setUserRating] = useState(0); // State for user rating
  const [products, setProducts] = useState([]); // State for products data
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [showDetails, setShowDetails] = useState(false); // State for toggling product details
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image
  const [imageUploaded, setImageUploaded] = useState(false); // State to track if image is uploaded

  const id = getCookie("id"); // Get user ID from cookie

  const dispatch = useDispatch(); // Redux dispatch function

  // Function to handle image selection
  const handleImageSelect = (event) => {
    setSelectedImage(event.target.files[0]);
    setImageUploaded(true);
  };

  // Function to upload image to cloudinary
  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("upload_preset", "xboh7dxo");
      formData.append("api_key", "924864744826299");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/djn5re91w/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const responseData = await response.json();
      return responseData.url; // Return the uploaded image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  // Fetch data from API based on search query
  useEffect(() => {
    const fetchDataHandler = async () => {
      try {
        let apiUrl = "https://e-pharmacy.runasp.net/api/product";
        if (searchQuery.trim() !== "") {
          apiUrl += `?search=${searchQuery}`;
        }
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        const ProductData = responseData.data.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          pictureUrl: product.pictureUrl,
          category: product.category,
          pharmacies: product.pharmacies,
          quantity: product.quantity,
        }));
        setProducts(ProductData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataHandler();
  }, [searchQuery]);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to toggle product details
  const toggleDetails = () => {
    setShowDetails(!showDetails);
    window.scrollTo(0, 0);
  };

  // Function to add product to cart
  const addToCart = async (product) => {
    try {
      let imageUrl = null;
      if (selectedImage) {
        imageUrl = await uploadImage();
      }
      await dispatch(
        addItemToCart({
          id: id,
          items: [
            {
              id: product.id.toString() || Math.random().toString(),
              name: product.name || Math.random().toString(),
              pictureUrl: imageUrl || product.pictureUrl,
              category: product.category || Math.random().toString(),
              price: product.price || Math.random().toString(),
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

  // Effect to add uploaded image to cart
  useEffect(() => {
    if (imageUploaded) {
      let staticProduct = {
        id: 5,
        name: "Bill OR Product name",
        category: "Medicine",
        price: 99,
        quantity: 1,
      };

      addToCart(staticProduct);
    }
  }, [imageUploaded]);

  return (
    <Container id="searchPage">
      <Row className="d-flex align-items-center justify-between">
        <Col sm="12" lg="9">
          <Form className="hh d-flex ">
            <Form.Control
              type="search"
              placeholder="Search for medicine & wellness products"
              id="searchBar"
              aria-label="Search"
              style={{ height: "50px" }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Form>
        </Col>
        <Col className="custom mt-5">
          <label
            htmlFor="uploadInput"
            className="flex flex-col justify-center items-center"
          >
            <input
              type="file"
              id="uploadInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageSelect}
            />
            <img src={Prescription} alt="Prescription" width={50} height={50} />
            <p>By Prescription</p>
          </label>
        </Col>
        <Col className="custom mt-5">
          <label
            htmlFor="uploadInput"
            className="flex flex-col justify-center items-center"
          >
            <input
              type="file"
              id="uploadInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageSelect}
            />
            <img src={Upload} alt="Upload" width={50} height={50} />
            <p>Upload product</p>
          </label>
        </Col>
      </Row>

      {products.length > 0 && (
        <Row style={{ marginTop: "50px" }}>
          {products.map((product) => (
            <Col key={product.id} className="mb-4">
              <Card style={{ height: "550px", width: "18rem" }} id="card-one">
                <div className="card-body">
                  <div className="icon">
                    <FontAwesomeIcon
                      icon={faCartPlus}
                      className="iconCarts"
                      onClick={() => addToCart(product)}
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
                        {product.price - product.price * 0.3} <del>30%</del>
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
                  <h4 className="text__three">Available in:</h4>
                  <div className="available__pharmacy flex items-center h-7 w-full">
                    {product.pharmacies?.map((pharmacy, index) => (
                      <span className="text-sm text-center" key={index}>
                        ⚕ {pharmacy}
                      </span>
                    ))}
                  </div>
                  <Link to={`/product/${product.id}`}>
                    <button
                      whileHover={{ scale: 1.1 }}
                      onClick={toggleDetails}
                      className="showDetails"
                    >
                      Show Details
                    </button>
                  </Link>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Search;
