import { Box, Typography, Container } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "gray", py: 3 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" color="white" gutterBottom>
        日本大学文理学部情報科学科 Webプログラミング最終課題
        </Typography>

        <Typography variant="h6" align="center" color="white" gutterBottom>
        5423054 坂口琴美
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          color="white"
          component="p"
        >
          Copyright © 2024 min
        </Typography>
      </Container>
    </Box>
  );
}