//api
export type QuizContentType = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};
export type QuizContentReqType = {
  answer: string;
  options: string[];
  questions: string;
};
export type categoriesType = {
  id: number;
  name: string;
};

//components/QuizCard
export type QuestionPropsType = {
  questions: string;
  options: string[];
  answer: string;
  username: string;
  fetchNumberOfQuestiuons: number;
  TotalScore: React.Dispatch<React.SetStateAction<number>>;
  score: number;
  QuestionsCountProps: {
    QuestionsCount: number;
    setQuestionsCount: React.Dispatch<React.SetStateAction<number>>;
  };
  callback: (e: React.FormEvent<EventTarget>) => void;
};

//components/settings
export type settingType = {
  numberOfQuestions: number;
  difficulty: string;
  category: number;
  categoryName: string;
  UserName: string;
};
//components/settingsprops
export type settingPropsType = {
  setnewsetting: React.Dispatch<React.SetStateAction<settingType>>;
  setSendRequest: React.Dispatch<React.SetStateAction<boolean>>;
};
//enum for difficulty level
export enum difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

//components/resultProps
export type resultProps = {
  username: string;
  totalScore: number;
  numberOfQuestions: number;
  category: string;
  difficulty: string;
  callback: () => void;
};

//components/result State
export type resultStateType = [
  { name: string; value: string },
  { name: string; value: number },
  { name: string; value: string },
  { name: string; value: string },
  { name: string; value: number }
];
