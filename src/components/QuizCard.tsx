import React, { useState, useEffect } from "react";
import { QuestionPropsType } from "../types/Quiz_TYPE";
//material ui
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
  Divider,
} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  QuizStart: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
  },
  quesCard: {
    width: "90%",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    margin: "0 auto",
    background: "white",
    borderRadius: "0.5rem",
    [theme.breakpoints.up("md")]: {
      width: "70%",
    },
  },
  primaryColor: {
    color: theme.palette.primary.main,
  },
  quesParent: {
    background: theme.palette.primary.main,
    color: "#f3f3f3",
    borderRadius: "0.5rem",
  },
}));
const QuizCard: React.FC<QuestionPropsType> = ({
  questions,
  options,
  answer,
  username,
  // fetched number of questions
  fetchNumberOfQuestiuons,
  TotalScore,
  score,
  // object of satate count of questions
  QuestionsCountProps,
  callback,
}) => {
  // mui class
  const classes = useStyle();
  //states
  const [answerState, setAnswerState] = useState<string>("");

  //to show/hide next, previous an submit button
  const [buttonHideShow, setButtonHideShow] = useState<boolean>(false);
  // destructuring question count state
  const { QuestionsCount, setQuestionsCount } = QuestionsCountProps;

  //next button click
  const NextHandler = () => {
    if (answer === answerState) {
      TotalScore(score + 1);
      setAnswerState("");
    }
    if (fetchNumberOfQuestiuons !== QuestionsCount) {
      setQuestionsCount(QuestionsCount + 1);
    }
  };

  useEffect(() => {
    //to make submit button show
    if (fetchNumberOfQuestiuons === QuestionsCount) {
      setButtonHideShow(true);
    } else {
      setButtonHideShow(false);
    }
  }, [QuestionsCount, score, fetchNumberOfQuestiuons]);

  return (
    <div className={classes.QuizStart}>
      <div className={classes.quesCard}>
        <Box px={4} py={3}>
          <Box px={1}>
            <Typography
              variant="h6"
              gutterBottom
              style={{ textTransform: "capitalize" }}
            >
              <b> Stuent Name: {username}</b>
            </Typography>
            <Typography color="primary" variant="h5">
              <b>
                Question {QuestionsCount + 1} of {fetchNumberOfQuestiuons + 1}{" "}
              </b>
            </Typography>
          </Box>
          <Box py={2} px={1}>
            <Divider className={classes.primaryColor} />
          </Box>
          <Box py={3} px={2} className={classes.quesParent}>
            <Typography variant="h5">
              {/* +1 is putted because array is start from 0 index so question number was starting from 0 */}
              {questions}
            </Typography>
          </Box>

          <form name="setiingForm" onSubmit={callback}>
            <Box px={1} pt={3}>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={answerState}
                  onChange={(e) => setAnswerState(e.target.value)}
                >
                  {options.map((options: string, i: number) => (
                    <FormControlLabel
                      key={i}
                      value={options}
                      control={<Radio color="primary" />}
                      label={options}
                      color="primary"
                    />
                  ))}
                </RadioGroup>
                <Box py={2}>
                  {buttonHideShow ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={NextHandler}
                      type="submit"
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      onClick={NextHandler}
                      variant="contained"
                      disabled={answerState === "" ? true : false}
                      color="primary"
                    >
                      Next
                    </Button>
                  )}
                </Box>
              </FormControl>
            </Box>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default QuizCard;
