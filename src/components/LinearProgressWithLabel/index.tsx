import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

interface ILinearProgressProps {
  value?: number;
}

const LinearProgressWithLabel: React.FC<ILinearProgressProps> = props => {
  const { value = 0 } = props;
  return (
    <div>
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Box style={{ width: "100%", marginRight: "10px" }}>
          <LinearProgress variant="determinate" value={value} />
        </Box>
        <Box style={{ minWidth: 35 }}>
          <p>{value}%</p>
        </Box>
      </Box>
    </div>
  );
};

export default LinearProgressWithLabel;
