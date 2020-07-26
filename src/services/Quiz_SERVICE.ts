import {
  QuizContentType,
  QuizContentReqType,
  categoriesType,
} from "../types/Quiz_TYPE";

export const quizData = async (
  numQuestions: number,
  diffculty: string,
  category: number
): Promise<QuizContentReqType[]> => {
  const res = await fetch(
    `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${diffculty}`
  );
  const { results } = await res.json();
  const quiz: QuizContentReqType[] = results.map(
    (questionsObj: QuizContentType) => {
      return {
        questions: questionsObj.question,
        answer: questionsObj.correct_answer,
        options: questionsObj.incorrect_answers.concat(
          questionsObj.correct_answer
        ),
      };
    }
  );

  return quiz;
};

export const Categories = async () => {
  const res = await fetch("https://opentdb.com/api_category.php");
  const { trivia_categories } = await res.json();
  const categories: categoriesType[] = trivia_categories;

  return categories;
};
