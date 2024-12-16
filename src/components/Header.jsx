import * as React from "react";
import { Box } from "@mui/material";

export default function Header() {
  return (
        <Box
          component="img"
          src="/images/aho.png"
          alt="Header images"
          sx={{
            width: "100%",
            height: { xs: "150px", sm: "200px", md: "250px" },
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
  );
}