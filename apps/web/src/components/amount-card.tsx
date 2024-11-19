import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface AmountCardProps {
  amount: number;
  onCardClick: () => void;
}

export function AmountCard(props: AmountCardProps) {
  return (
    <Box sx={{ minWidth: 200 }}>
      <Card variant="outlined">
        <CardActionArea onClick={props.onCardClick}>
          <CardContent>
            <Typography variant="h5" textAlign={"center"}>
              {props.amount}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
