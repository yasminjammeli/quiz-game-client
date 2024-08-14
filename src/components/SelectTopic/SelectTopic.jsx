import { useEffect, useState } from "react";
import axios from "axios";
import "./SelectTopic.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectCategory } from "../../redux/quizSlice";
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
    const imageUrl =
      response.data.results[0]?.urls?.regular ||
      "https://via.placeholder.com/100";
    return imageUrl;
  } catch (error) {
    console.error("Error fetching image:", error);
    return "https://via.placeholder.com/100";
  }
};
const SelectTopic = () => {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState({});
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const handleCategoryClick = (category) => {
    dispatch(selectCategory(category));
    navigate("/Instruction");
  };
  const displayedCategories = showAll ? categories : categories.slice(0, 12); // display 12 categories
  return (
    <div className="topic-selector">
      <div className="topic">
        <h2>Select Topic</h2>
        <p>Featured Category</p>
        <div className={`featured-category ${showAll ? "show-all" : ""}`}>
          {displayedCategories.map((category) => (
            <div
              key={category.id}
              className="category-item"
              onClick={() => handleCategoryClick(category)}
            >
              <img
                src={images[category.name]}
                alt={category.name}
                className="category-icon"
              />
              <p>{category.name}</p>
            </div>
          ))}
        </div>
        <button className="more-button" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "More"}
        </button>
      </div>
    </div>
  );
};
export default SelectTopic;
