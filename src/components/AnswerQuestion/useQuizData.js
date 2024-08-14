import { useState, useEffect } from "react";
import axios from "axios";

const UNSPLASH_ACCESS_KEY = "pexr6BPwVeMfVZybxbYzkOKNos7E84HrJl6YPsA1bYA";

const useQuizData = (selectedCategory) => {
  const [questions, setQuestions] = useState([]);
  const [questionImages, setQuestionImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedCategory) return;

    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `https://opentdb.com/api.php?amount=5&category=${selectedCategory.id}`
        );
        const formattedQuestions = response.data.results.map((question) => {
          const answers = [
            ...question.incorrect_answers,
            question.correct_answer,
          ];
          for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
          }
          return {
            ...question,
            answers: answers,
          };
        });
        setQuestions(formattedQuestions);
        const imagePromises = formattedQuestions.map((question) =>
          fetchQuestionImage(question.question)
        );
        const images = await Promise.all(imagePromises);
        setQuestionImages(images);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuestions();
  }, [selectedCategory]);

  const fetchQuestionImage = async (query) => {
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: { query, client_id: UNSPLASH_ACCESS_KEY, per_page: 1 },
        }
      );
      return (
        response.data.results[0]?.urls?.regular ||
        "https://via.placeholder.com/400"
      );
    } catch (err) {
      console.error("Error fetching image from Unsplash", err);
      return "https://via.placeholder.com/400";
    }
  };

  return { questions, questionImages, loading };
};

export default useQuizData;
