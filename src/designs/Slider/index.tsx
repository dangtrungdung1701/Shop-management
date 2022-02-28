import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import { withStyles } from "@material-ui/core";

interface ISliderProps {
  title?: string;
  initValue: number | number[];
  className?: string;
  onChange?: (value: number | number[]) => void;
}

const CustomSlider = withStyles({
  root: {
    color: "#33CCCC",
  },
})(Slider);

const VolumeSlider: React.FC<ISliderProps> = props => {
  const { onChange, title = "Âm lượng", initValue } = props;
  const [value, setValue] = React.useState<number | number[]>(initValue);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    onChange && onChange(newValue);
  };

  return (
    <Box sx={{ width: 500 }}>
      <Grid container spacing={3} alignItems="center">
        <Grid item>
          <span className="font-medium">{title}</span>
        </Grid>
        <Grid item xs>
          <CustomSlider
            value={value}
            onChange={handleChange}
            aria-label="Volume"
          />
        </Grid>
        <Grid item>
          <span className="font-medium">{value}%</span>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VolumeSlider;
