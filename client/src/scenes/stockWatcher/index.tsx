import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

import React, { useMemo, useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";

import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import regression, { DataPoint } from "regression";
import Textfield from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

const StyledTextField = styled(Textfield)(({ theme }) => ({
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
    // borderRadius: "60px",
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      // border: "none",
      // borderColor: "#transparent",
    },
    "&.Mui-focused fieldset": {
      //border: "solid",
      boxShadow: "0px 1px 2px 1px rgba(0, 0, 0, 0.2)",
      backgroundColor: "white",
      zIndex: 0,
    },
  },
  "& .MuiOutlinedInput-input": {},
  "& .MuiInputLabel-outlined.MuiInputLabel-marginDense": {},
}));

const StyledSelect = styled(Select)((theme) => ({
  fontSize: 12,
  "& .MuiSelect-outlined": {
    padding: "8px 12px",
  },
  "& .MuiMenuItem-root": {
    fontSize: 12,
    ":hover": {
      backgroundColor: "",
    },
  },
  "& .MuiMenuItem-root.Mui-selected": {
    backgroundColor: "#f6f6f6",
    ":hover": {
      backgroundColor: "",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    ":active": {
      border: "none",
    },
  },
}));

const timeFrames = [
  { value: "1d", label: "1 Day" },
  { value: "5d", label: "5 Day" },
  { value: "30d", label: "1 Month" },
  { value: "180d", label: "6 Months" },
  { value: "1y", label: "1 Year" },
  { value: "5y", label: "5 Years" },
];

const dummyData = {
  Tickername: "TSLA",
  Period: "5d",
  data: [
    {
      index: 0,
      Date: "2024-04-22 00:00:00-04:00",
      Open: 140.559997558594,
      High: 144.440002441406,
      Low: 138.800003051758,
      Close: 142.050003051758,
      Volume: 107097600,
      Dividends: 0,
      "Stock Splits": 0,
    },
    {
      index: 1,
      Date: "2024-04-23 00:00:00-04:00",
      Open: 143.330001831055,
      High: 147.259994506836,
      Low: 141.110000610352,
      Close: 144.679992675781,
      Volume: 124545100,
      Dividends: 0,
      "Stock Splits": 0,
    },
    {
      index: 2,
      Date: "2024-04-24 00:00:00-04:00",
      Open: 162.839996337891,
      High: 167.970001220703,
      Low: 157.509994506836,
      Close: 162.130004882813,
      Volume: 181178000,
      Dividends: 0,
      "Stock Splits": 0,
    },
    {
      index: 3,
      Date: "2024-04-25 00:00:00-04:00",
      Open: 158.960006713867,
      High: 170.880004882813,
      Low: 158.360000610352,
      Close: 170.179992675781,
      Volume: 126427500,
      Dividends: 0,
      "Stock Splits": 0,
    },
    {
      index: 4,
      Date: "2024-04-26 00:00:00-04:00",
      Open: 168.850006103516,
      High: 172.119995117188,
      Low: 166.369995117188,
      Close: 168.289993286133,
      Volume: 108896700,
      Dividends: 0,
      "Stock Splits": 0,
    },
  ],
};

const StockWatcher = () => {
  const { palette } = useTheme();

  const [tickers, setTickers] = useState([
    {
      id: 1,
      name: "",
      period: "",
    },
    {
      id: 2,
      name: "",
      period: "",
    },
    {
      id: 3,
      name: "",
      period: "",
    },
  ]);

  function handleChange(event: SelectChangeEvent, index: number) {
    console.log(event.target);
    console.log(event.target.value as string, index);
    let clone = [...tickers];
    clone[index].period = event.target.value;
    setTickers([...clone]);
  }

  return (
    <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
      <Grid container style={{ gap: "8px", flexWrap: "nowrap" }}>
        <Grid container style={{ gap: "12px" }}>
          {tickers?.map((ticker, index) => (
            <Grid item style={{ display: "flex", gap: "8px" }} md={8}>
              <StyledTextField
                placeholder="Search Ticker (AAPL FOR Apple)"
                key={ticker.id}
                variant="outlined"
                value={ticker?.name ?? ""}
                onChange={(ev) => {
                  let clone = [...tickers];
                  clone[index].name = ev.target.value as string;
                  setTickers([...clone]);
                }}
                onKeyDown={(ev) => {
                  if (ev.key == "Enter") {
                    ev.preventDefault();
                  }
                }}
                InputLabelProps={{ shrink: true }}
                InputProps={
                  {
                    // startAdornment: (
                    //   <SearchIcon fontSize="small" sx={{ zIndex: 1 }} />
                    // ),
                  }
                }
              />

              <FormControl fullWidth>
                <InputLabel style={{ marginTop: "-8px" }}>TimeFrame</InputLabel>
                <Select
                  variant="outlined"
                  margin="dense"
                  label="TimeFrame"
                  value={
                    timeFrames?.filter(
                      (time) => time?.value == ticker?.period
                    )[0]?.value
                  }
                  defaultValue={ticker?.period ?? ""}
                  onChange={(event: SelectChangeEvent<string>) =>
                    handleChange(event, index)
                  }
                  sx={{
                    fontSize: 12,
                    background: "#fff",
                    "& .MuiSelect-outlined": {
                      padding: "8px 12px",
                    },
                    "& .MuiMenuItem-root": {
                      fontSize: 12,
                      ":hover": {
                        backgroundColor: "",
                      },
                    },
                    "& .MuiMenuItem-root.Mui-selected": {
                      backgroundColor: "#f6f6f6",
                      ":hover": {
                        backgroundColor: "",
                      },
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      ":active": {
                        border: "none",
                      },
                    },
                  }}
                >
                  {timeFrames.map((time) => (
                    <MenuItem id={time?.value} value={time?.value}>
                      {time.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ))}
        </Grid>
        <Grid item style={{ flexGrow: 0, flexWrap: "nowrap" }}>
          <Button variant="contained" sx={{ height: "36px", width: "92px" }}>
            Submit
          </Button>
        </Grid>
      </Grid>
      <Grid container style={{ flexWrap: "nowrap" }}>
        {/* {dummyData?.map((ticker) => ( */}
        {/* ))} */}
        <Grid item style={{ display: "flex", flexGrow: 1 }}>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              width={500}
              height={200}
              data={dummyData?.data}
              syncId="anyId"
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="Close"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </DashboardBox>
  );
};

export default StockWatcher;
