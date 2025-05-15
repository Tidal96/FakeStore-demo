import { useTheme, useMediaQuery } from "@mui/material";

export default function useResponsive() {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // <600px
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600–899px
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg")); // 900–1199px
  const isLg = useMediaQuery(theme.breakpoints.up("lg")); // ≥1200px

  return { isXs, isSm, isMd, isLg };
}
