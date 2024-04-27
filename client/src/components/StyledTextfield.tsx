import { styled, Theme } from "@mui/material/styles";
import { TextField } from "@mui/material";

interface StyledTextField {
  theme: Theme;
}

const StyledTextField = styled(TextField)<StyledTextField>(({ theme }) => ({
  width: "100%",
  backgroundColor: "#F1F3F4",
  borderRadius: "6px",
  "& label": {
    transform: "translate(10px, 10px) scale(1)",
    fontSize: "13px",
    zIndex: 1,
  },
  "& label.MuiInputLabel-shrink": {
    transform: "translate(14px, -6px) scale(0.85)",
  },
  "& input": {
    padding: "8px 10px",
    fontSize: "13px",
    zIndex: 1,
  },
  "& label.Mui-focused": {
    color: "#2981E9",
  },
  "& .MuiOutlinedInput-root": {
    border: "none",
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      // border: "none",
      // borderColor: "#transparent",
    },
    "&.Mui-focused fieldset": {
      // border: "solid",
      boxShadow: "0px 1px 2px 1px rgba(0, 0, 0, 0.2)",
      backgroundColor: "white",
      zIndex: 0,
    },
  },
  "& .MuiOutlinedInput-input": {},
  "& .MuiInputLabel-outlined.MuiInputLabel-marginDense": {},
}));

export default StyledTextField;
