import React from "react";
//types
import { resultProps, resultStateType } from "../types/Quiz_TYPE";
//material ui
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Grid, Button } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
  },
  result: {
    width: "90%",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    margin: "0 auto",
    background: "white",
    borderRadius: "0.5rem",
    [theme.breakpoints.up("sm")]: {
      width: "60%",
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "30%",
    },
  },
  inputFields: {
    width: "100%",
    marginTop: "20px",
  },
  Resultheading: {
    background: theme.palette.primary.main,
    color: "white",
    borderRadius: "0.5rem",
  },
}));
const Result: React.FC<resultProps> = ({
  username,
  totalScore,
  numberOfQuestions,
  category,
  difficulty,
  callback,
}) => {
  const classes = useStyle();
  const result: resultStateType = [
    { name: "name", value: username },
    { name: "total questions", value: numberOfQuestions },
    { name: "difficulty level", value: difficulty },
    { name: "category", value: category },
    { name: "score", value: totalScore },
  ];

  return (
    <div>
      <div className={classes.root}>
        <div className={classes.result}>
          <Box p={3}>
            <Box py={1} className={classes.Resultheading}>
              <Typography variant="h5" align="center">
                Result
              </Typography>
            </Box>
            <Box pb={1} px={1} pt={3}>
              {result.map((result: any, i: number) => (
                <div key={i}>
                  <Box py={1}>
                    <Grid container>
                      <Grid
                        item
                        container
                        xs={6}
                        justify="flex-start"
                        alignItems="center"
                      >
                        <Typography
                          style={{
                            fontWeight: 550,
                            textTransform: "capitalize",
                          }}
                          variant="subtitle1"
                          align="center"
                        >
                          {result.name}:
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        xs={6}
                        justify="center"
                        alignItems="center"
                      >
                        <Typography
                          variant="subtitle1"
                          color="textSecondary"
                          align="center"
                          style={{
                            fontWeight: 550,
                            textTransform: "capitalize",
                          }}
                        >
                          {result.value}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <hr
                    style={{
                      borderColor: "#259cf7",
                      borderWidth: "1px",
                      borderBottom: "none",
                    }}
                  />
                </div>
              ))}
              <Box pt={4}>
                <Button variant="contained" color="primary" onClick={callback}>
                  New Quiz
                </Button>
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Result;
