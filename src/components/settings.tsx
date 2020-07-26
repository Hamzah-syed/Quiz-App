import React, { useState, useEffect } from "react";
//api
import { Categories } from "../services/Quiz_SERVICE";
//mui
import {
  InputLabel,
  FormControl,
  Select,
  TextField,
  Button,
  Box,
  Typography,
  NativeSelect,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import { useMinimalSelectStyles } from "@mui-treasury/styles/select/minimal";
//types
import {
  settingPropsType,
  settingType,
  categoriesType,
  difficulty,
} from "../types/Quiz_TYPE";
import { SettingFormerrors } from "../types/Error_TYPE";

const useStyle = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
  },
  loader: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translte(-50%,-50%)",
  },
  settinHeader: {
    background: theme.palette.primary.main,
    color: "white",
    borderRadius: "0.5rem",
  },
  form: {
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
}));

const Settings: React.FC<settingPropsType> = ({
  setnewsetting,
  setSendRequest,
}) => {
  const classes = useStyle();
  //state
  const [categories, setCategories] = useState<categoriesType[]>([]);
  const [error, setError] = useState<SettingFormerrors>({
    categoryname: "",
    numberOfQues: "",
  });

  // settings
  const [setting, setsetting] = useState<settingType>({
    numberOfQuestions: 5,
    difficulty: "easy",
    category: 9,
    categoryName: "General Knowledge",
    UserName: "",
  });

  //useEffect to get data of Categories
  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await Categories();
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  if (!categories.length) {
    return (
      <div>
        <CircularProgress color="secondary" className={classes.loader} />
      </div>
    );
  }

  const submithanddle = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setnewsetting(AppliedSettings);

    //validation
    if (setting.UserName === "") {
      setError({
        ...error,
        categoryname: String("Name is required"),
        // numberOfQues: String("Number Of Question Is Required"),
      });
    } else if (setting.numberOfQuestions <= 3) {
      setError({
        ...error,
        numberOfQues: String("kindly add more than 3 questions"),
      });
    } else {
      setSendRequest(true);
    }
  };

  //to get name of category and put in AppliedSettings object
  let categoryNamevar = categories.filter((category) => {
    return category.id === setting.category;
  });

  const AppliedSettings: settingType = {
    numberOfQuestions: setting.numberOfQuestions,
    difficulty: setting.difficulty,
    category: setting.category,
    categoryName: categoryNamevar[0].name,
    UserName: setting.UserName,
  };

  // to get name value

  return (
    <div>
      <div className={classes.root}>
        <form onSubmit={submithanddle} className={classes.form}>
          <Box py={3} px={4}>
            <div className={classes.settinHeader}>
              <Box py={2} px={1}>
                <Typography variant="h5" align="center">
                  Settings
                </Typography>
              </Box>
            </div>

            <TextField
              error={error.categoryname === "" ? false : true}
              helperText={error.categoryname === "" ? "" : error.categoryname}
              className={classes.inputFields}
              id="standard-basic"
              label="Your Name"
              type="text"
              value={
                // to not show 0 we put this conition
                setting.UserName
              }
              onChange={(e) => {
                setsetting({
                  ...setting,
                  UserName: String(e.target.value),
                });
                setError({ ...error, categoryname: "" });
              }}
            />
            <TextField
              error={error.numberOfQues === "" ? false : true}
              helperText={error.numberOfQues === "" ? "" : error.numberOfQues}
              className={classes.inputFields}
              id="standard-basic"
              label="Number Of Questions"
              // InputLabelProps={{
              //   shrink: true,
              // }}
              type="number"
              value={
                setting.numberOfQuestions === 0 ? "" : setting.numberOfQuestions
              }
              onChange={(e) => {
                setsetting({
                  ...setting,
                  numberOfQuestions: Number(e.target.value),
                });
                setError({ ...error, numberOfQues: "" });
              }}
            />
            <FormControl className={classes.inputFields}>
              <InputLabel htmlFor="grouped-native-select">
                Select Difficulty
              </InputLabel>
              <Select
                native
                onChange={(e) =>
                  setsetting({ ...setting, difficulty: String(e.target.value) })
                }
                id="grouped-native-select"
              >
                {/* without enum */}

                {/* <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option> */}
                {/* with enum */}

                <option value={difficulty.Easy}>Easy</option>
                <option value={difficulty.Medium}>Medium</option>
                <option value={difficulty.Hard}>Hard</option>
              </Select>
            </FormControl>
            <FormControl className={classes.inputFields}>
              <InputLabel htmlFor="grouped-native-select">
                Select Category
              </InputLabel>
              <NativeSelect
                onChange={(e) =>
                  setsetting({
                    ...setting,
                    category: Number(e.target.value),
                  })
                }
                defaultValue=""
                id="grouped-native-select"
              >
                {categories.map((category: categoriesType) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
            <Box pt={4} pb={1}>
              <Button variant="contained" color="primary" type="submit">
                Start Quiz
              </Button>
            </Box>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default Settings;
