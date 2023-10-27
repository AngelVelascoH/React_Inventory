import { Container, Typography, Box } from "@mui/material";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useData } from "../context/context";
import { useState } from "react";
interface ChildProps {
  onChildClick: () => void;
}
export const ContentHeader: React.FC<ChildProps> = (props) => {
  const { data, setSearch } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setSearch(searchTerm);
    }
  };
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
      <Typography variant="h5">{data !== 0 && data} Items</Typography>
      <Box display="flex" alignItems={"center"}>
        <TextField
          label="Name or ID"
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon /> {/* Coloca el icono que desees aquí */}
              </InputAdornment>
            ),
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchKeyDown}
        />
        <IconButton
          color="primary"
          // Agrega la función de manejo de clic
          onClick={props.onChildClick}
        >
          <AddCircleIcon /> {/* Coloca aquí el icono que desees */}
        </IconButton>
      </Box>
    </Container>
  );
};
