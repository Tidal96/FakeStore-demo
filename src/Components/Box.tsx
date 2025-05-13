
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export default function BoxSx() {
  return (
    <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: "#e0d6d6",
          },
        },
      }}
    >
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: 1,
          bgcolor: "primary.main",
          //   "&:hover": {
          //     bgcolor: "primary.dark",
          //   },
        }}
      />
    </ThemeProvider>
  );
}
