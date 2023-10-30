import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  AlertColor,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useMutation } from "@apollo/client";
import INSERT_ITEM from "../apollo/InsertData";
import { useState } from "react";
import { Alert } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogContentText } from "@mui/material";
import { DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/context";

interface FormData {
  itemId: string;
  itemName: string;
  description: string;
  locationId: string;
  state: string;
  phoneNumber: string;
  address: string;
}
export const InventoryForm = () => {
  const [createItem, { loading }] = useMutation(INSERT_ITEM, {
    errorPolicy: "all",
  });
  const navigate = useNavigate();
  const context = useData();

  const [alert, setAlert] = useState<{
    type: AlertColor;
    message: string | undefined;
  } | null>(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    itemId: "",
    itemName: "",
    description: "",
    locationId: "",
    state: "",
    address: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handelInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Partial<FormData> = {};
    if (!formData.itemId) {
      newErrors.itemId = "El ID del artículo es requerido";
    }
    if (!formData.itemName || formData.itemName.trim() === "") {
      newErrors.itemName = "El nombre del artículo es requerido";
    }
    if (!formData.description) {
      newErrors.description = "La descripción del artículo es requerida";
    }
    if (!formData.locationId) {
      newErrors.locationId = "El ID de la ubicación es requerido";
    }
    if (!formData.state) {
      newErrors.state = "El estado es requerido";
    }
    if (!formData.address) {
      newErrors.address = "La dirección es requerida";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "El número de teléfono es requerido";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const {
        itemId,
        itemName,
        description,
        locationId,
        state,
        address,
        phoneNumber,
      } = formData;
      try {
        await createItem({
          variables: {
            itemId: parseInt(itemId),
            name: itemName,
            desc: description,
            locId: parseInt(locationId),
            state: state,
            address: address,
            phone: phoneNumber,
          },
        }).then((response) => {
          if (loading) {
            setAlert({
              type: "info",
              message: "Agregando item...",
            });
          }
          if (response.data) {
            if (
              response.data.createItem !== null &&
              response.data.createItem.itemId === parseInt(formData.itemId)
            ) {
              setAlert({
                type: "success",
                message: "Item agregado con éxito",
              });
              setOpen(true);
            }
          }
          if (response.data.createItem.itemId === -1) {
            setAlert({
              type: "error",
              message: `Error al agregar el item: el itemId o el locationId ya existen`,
            });
          }
        });
      } catch (error: unknown) {
        setAlert({
          type: "error",
          message: (error as Error).message,
        });
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const addMore = () => {
    setFormData({
      itemId: "",
      itemName: "",
      description: "",
      locationId: "",
      state: "",
      address: "",
      phoneNumber: "",
    });
    setOpen(false);
  };
  const routeInventory = () => {
    context.setRefreshValue(true);
    navigate("/items");
  };

  return (
    <>
      <Container maxWidth="xl">
        <Typography sx={{ pb: 3 }} variant="h5">
          Información del Artículo
        </Typography>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                type="number"
                size="small"
                fullWidth
                label="Item ID"
                variant="outlined"
                name="itemId"
                value={formData.itemId}
                onChange={handelInputChange}
                error={!!errors.itemId}
                helperText={
                  errors.itemId ? errors.itemId : "ID, máximo 10 caracteres"
                }
                InputProps={{
                  inputProps: {
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  },
                }}
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                size="small"
                fullWidth
                label="Nombre"
                variant="outlined"
                name="itemName"
                value={formData.itemName}
                onChange={handelInputChange}
                error={!!errors.itemName}
                helperText={errors.itemName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                size="small"
                label="Descripción"
                variant="outlined"
                name="description"
                value={formData.description}
                onChange={handelInputChange}
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>
          </Grid>

          {/* Sección de información de ubicación */}
          <Typography sx={{ paddingBlock: 3 }} variant="h5">
            Información de la Ubicación
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                type="number"
                size="small"
                fullWidth
                label="ID de Ubicación"
                variant="outlined"
                name="locationId"
                value={formData.locationId}
                onChange={handelInputChange}
                error={!!errors.locationId}
                helperText={
                  errors.locationId
                    ? errors.locationId
                    : "ID, máximo 10 caracteres"
                }
                InputProps={{
                  inputProps: {
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  },
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                fullWidth
                label="Estado"
                variant="outlined"
                name="state"
                value={formData.state}
                onChange={handelInputChange}
                error={!!errors.state}
                helperText={errors.state}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                type="number"
                size="small"
                fullWidth
                label="Teléfono"
                variant="outlined"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handelInputChange}
                error={!!errors.phoneNumber}
                helperText={
                  errors.phoneNumber
                    ? errors.phoneNumber
                    : "Número de teléfono, máximo 10 caracteres"
                }
                InputProps={{
                  inputProps: {
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                fullWidth
                label="Dirección"
                variant="outlined"
                name="address"
                value={formData.address}
                onChange={handelInputChange}
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            sx={{ marginBlock: 4, color: "white" }}
            endIcon={<SendIcon />}
          >
            Enviar
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Item agregado con éxito"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ¿Deseas continuar agregando items?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={addMore}>Si, Agregar más items</Button>
              <Button onClick={routeInventory}>
                No, regresar al inventario
              </Button>
            </DialogActions>
          </Dialog>
          {alert && (
            <Alert severity={alert.type} onClose={() => setAlert(null)}>
              {alert.message}
            </Alert>
          )}
        </form>
      </Container>
    </>
  );
};
