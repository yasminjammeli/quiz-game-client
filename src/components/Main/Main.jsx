import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Main.css";
import Profil from "../Profil/Profil";
import Achievements from "../Achievements/Achievements";
const UNSPLASH_ACCESS_KEY = "pexr6BPwVeMfVZybxbYzkOKNos7E84HrJl6YPsA1bYA";
const fetchCategoriesFromOTDB = async () => {
  try {
    const response = await axios.get("https://opentdb.com/api_category.php");
    return response.data.trivia_categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
const fetchImageForCategory = async (categoryName) => {
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: categoryName,
        client_id: UNSPLASH_ACCESS_KEY,
        per_page: 1,
      },
    });
    return (
      response.data.results[0]?.urls?.regular ||
      "https://via.placeholder.com/100"
    );
  } catch (error) {
    console.error("Error fetching image:", error);
    return "https://via.placeholder.com/100";
  }
};
const Main = () => {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchImages = async () => {
      const categoriesList = await fetchCategoriesFromOTDB();
      const imagePromises = categoriesList.map(async (category) => {
        const imageUrl = await fetchImageForCategory(category.name);
        return { name: category.name, imageUrl };
      });
      const imageResults = await Promise.all(imagePromises);
      const imageMap = imageResults.reduce((acc, { name, imageUrl }) => {
        acc[name] = imageUrl;
        return acc;
      }, {});
      setCategories(categoriesList);
      setImages(imageMap);
    };
    fetchImages();
  }, []);
  return (
    <div className="dashboard-right">
      <div className="main-content">
        <Profil/>
        <Achievements/>
        <div className="feartured-categories">
          <div className="feartured">
            <h2>Featured Categories</h2>
            <p onClick={() => navigate("/SelectTopic")}>View All</p>
          </div>
          <div className="categories">
            {categories.slice(0, 4).map((category) => (
              <div key={category.id} className="category-item">
                <img
                  src={images[category.name]}
                  alt={category.name}
                  className="category-icon"
                />
                <p>{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
