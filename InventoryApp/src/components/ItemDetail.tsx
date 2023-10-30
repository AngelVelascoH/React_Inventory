import React from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Tooltip } from "@mui/material";
import GET_ALL_DATA from "../apollo/fetchAllDataofItem";
import { useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { CardMedia } from "@mui/material";
interface ChildProps {
  onChildClick: () => void;
}

export const ItemDetail: React.FC<ChildProps> = (props) => {
  const { id } = useParams();
  const itemId: number = id !== undefined ? parseInt(id, 10) : NaN;
  const { loading, error, data } = useQuery(GET_ALL_DATA, {
    variables: { itemId: itemId },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error interno: {error.message}</p>;

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          pt: 3,
          pb: 5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#87ceeb",
          color: "white",
          marginBottom: "3rem",
        }}
      >
        <Typography variant="h5" sx={{ flex: 1, textAlign: "left" }}>
          Item {id} Details
        </Typography>
        <Box display="flex" alignItems={"center"}>
          <Tooltip title="Go back">
            <IconButton
              sx={{ width: "80px", height: "80px", color: "white" }}
              onClick={props.onChildClick}
            >
              <ArrowBackIcon sx={{ width: "50px", height: "50px" }} />{" "}
            </IconButton>
          </Tooltip>
        </Box>
      </Container>
      <Container
        maxWidth="xs"
        sx={{
          pt: 3,
          pb: 5,
          width: "300px",
        }}
      >
        <Card sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardMedia
              component="img"
              sx={{ width: "100%" }}
              image="https://img.freepik.com/psd-gratis/caja-carton-aislada_125540-1169.jpg?size=626&ext=jpg&ga=GA1.1.867424154.1698278400&semt=ais"
              alt="Live from space album cover"
            />
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {data.Item.itemName}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {data.Item.itemId}
              </Typography>
            </CardContent>
            <Box
              sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
            ></Box>
          </Box>
        </Card>
      </Container>

      <Container
        maxWidth="xl"
        sx={{
          pt: 3,
          pb: 5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          marginBottom: "3rem",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card variant="elevation" elevation={8} sx={{ minWidth: 275 }}>
              <CardActionArea>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Item Details
                  </Typography>
                  <Typography variant="h5" component="div">
                    {data.Item.itemName}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {data.Item.itemId}
                  </Typography>
                  <Typography variant="body2">
                    {data.Item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="elevation" elevation={8} sx={{ minWidth: 275 }}>
              <CardActionArea>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Location Details {data.Item.location.locationId}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {data.Item.location.state}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {data.Item.location.address}
                  </Typography>
                  <Typography variant="body2">
                    {data.Item.location.phoneNumber}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
