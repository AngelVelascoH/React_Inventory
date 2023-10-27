import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";

import { Typography } from "@mui/material";

import { Stack } from "@mui/material";
function appBarLabel(label: string) {
  return (
    <Toolbar>
      <Typography
        variant="h5"
        noWrap
        component="div"
        sx={{
          flexGrow: 1,
          color: "white",
          textAlign: "left",
          userSelect: "none",
        }}
      >
        {label}
      </Typography>
    </Toolbar>
  );
}

export const Header = () => {
  return (
    <Stack spacing={2} sx={{ flexGrow: 1, marginBottom: 10, paddingBottom: 3 }}>
      <AppBar
        position="static"
        color="primary"
        enableColorOnDark
        sx={{ padding: 2 }}
      >
        {appBarLabel("Inventory")}
      </AppBar>
    </Stack>
  );
};
