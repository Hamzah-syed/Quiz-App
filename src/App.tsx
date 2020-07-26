import React, { useEffect, useState } from "react";
import "./App.css";
import { quizData } from "./services/Quiz_SERVICE";
import { QuizContentReqType, settingType } from "./types/Quiz_TYPE";
//Components
import QuizCard from "./components/QuizCard";
import Settings from "./components/settings";
import Result from "./components/result";

function App() {
  //questions
  const [QuestionsOpts, setQuestionsOpts] = useState<QuizContentReqType[]>([]);
  //number of questions
  const [QuestionsCount, setQuestionsCount] = useState<number>(0);
  //result
  const [result, setresult] = useState<Boolean>(false);
  //score
  const [totalScore, setTotalScore] = useState<number>(0);
  //to stop sening initial request to api
  const [sendRequest, setSendRequest] = useState<boolean>(false);
  //new settings
  const [newsetting, setnewsetting] = useState<settingType>({
    numberOfQuestions: 5,
    difficulty: "",
    category: 9,
    categoryName: "",
    UserName: "",
  });

  // onSubmit function that will call on submit the the form after completing quiz
  const questionsHandler = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    //to show result
    setresult(true);
  };

  //function will call when user click on new quiz button in result
  const NewQuiz = () => {
    // clearing following states
    setQuestionsOpts([]);
    setTotalScore(0);
    //to make question count to 0 so questions will start from Q1
    setQuestionsCount(0);
    //to close result card
    setresult(false);
    //to stop sening  initial request to api
    setSendRequest(false);
  };

  useEffect(() => {
    const fetchQues = async () => {
      if (sendRequest) {
        const fetchedData = await quizData(
          newsetting.numberOfQuestions,
          newsetting.difficulty,
          newsetting.category
        );
        setQuestionsOpts(fetchedData);
      }
    };
    fetchQues();
  }, [newsetting, sendRequest]);

  //-1 is putted so it can be compared with an array since array starts from 0
  let fetchedQuestions = QuestionsOpts.length - 1;

  return (
    <>
      {QuestionsOpts.length ? (
        !result ? (
          <QuizCard
            questions={QuestionsOpts[QuestionsCount].questions}
            options={QuestionsOpts[QuestionsCount].options}
            answer={QuestionsOpts[QuestionsCount].answer}
            username={newsetting.UserName}
            fetchNumberOfQuestiuons={fetchedQuestions}
            TotalScore={setTotalScore}
            score={totalScore}
            QuestionsCountProps={{ QuestionsCount, setQuestionsCount }}
            callback={questionsHandler}

            // answer={QuestionsOpts[0].correct_answer}
          />
        ) : (
          <Result
            username={newsetting.UserName}
            totalScore={totalScore}
            numberOfQuestions={newsetting.numberOfQuestions}
            category={newsetting.categoryName}
            difficulty={newsetting.difficulty}
            callback={NewQuiz}
          />
        )
      ) : (
        <Settings
          setnewsetting={setnewsetting}
          setSendRequest={setSendRequest}
        />
      )}
    </>
  );
}

export default App;
