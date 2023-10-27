import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface ChildProps {
  onChildClick: () => void;
}
export const FormHeader: React.FC<ChildProps> = (props) => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        pt: 3,
        pb: 5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" sx={{ flex: 1, textAlign: "center" }}>
        Añadir un nuevo Item
      </Typography>
      <Box display="flex" alignItems={"center"}>
        <IconButton
          sx={{ width: "80px", height: "80px" }}
          color="primary"
          onClick={props.onChildClick}
        >
          <ArrowBackIcon sx={{ width: "50px", height: "50px" }} />{" "}
        </IconButton>
      </Box>
    </Container>
  );
};
