import { Paper } from "@mui/material";
import { Header } from "./components/Header";
import { InventoryContent } from "./components/InventoryContent";
import { InventoryForm } from "./components/InventoryForm";
import { Container, Box } from "@mui/system";
import { ContentHeader } from "./components/ContentHeader";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FormHeader } from "./components/FormHeader";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo/client";
import { DataProvider } from "./context/context";
import { ItemDetail } from "./components/ItemDetail";
const App: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/items");
  }, []);
  const showForm = () => {
    navigate("/newItem");
  };
  const showItems = () => {
    navigate("/items");
  };
  return (
    <ApolloProvider client={client}>
      <Header />

      <Container maxWidth="xl">
        <Paper square={false} elevation={3} sx={{ padding: 2 }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            // Ajusta la altura como desees
          >
            <DataProvider>
              <Routes>
                <Route
                  path="/newItem"
                  element={
                    <>
                      <FormHeader onChildClick={showItems} />
                      <InventoryForm />
                    </>
                  }
                />
                <Route
                  path="/items"
                  element={
                    <>
                      <ContentHeader onChildClick={showForm} />
                      <InventoryContent />
                    </>
                  }
                />
                <Route
                  path="/item/:id/detail"
                  element={
                    <>
                      <ItemDetail onChildClick={showItems} />
                    </>
                  }
                ></Route>
              </Routes>
            </DataProvider>
          </Box>
        </Paper>
      </Container>
    </ApolloProvider>
  );
};

export default App;
