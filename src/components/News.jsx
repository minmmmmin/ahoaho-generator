import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Divider, CircularProgress } from "@mui/material";

const News = () => {
  const [news, setNews] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://ahoaho.microcms.io/api/v1/news",
          {
            headers: {
              "X-MICROCMS-API-KEY": import.meta.env.VITE_X_MICROCMS_API_KEY,//ちゃんと隠す！！
            },
          }
        );

        if (!response.ok) {
          throw new Error("お知らせの取得に失敗しました。");
        }

        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Error fetching content:", error);
        setError("お知らせの取得中にエラーが発生しました。");
      }
    };
    fetchNews();
  }, []);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!news?.contents) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          お知らせ
        </Typography>
        {news.contents.map((announcement) => (
          <Box key={announcement.id} mb={4}>
            <Box display="flex" alignItems="center" mb={1}>
              <Typography variant="body2" color="textSecondary" mr={2}>
                {new Date(announcement.publishedAt).toLocaleDateString()}
              </Typography>
            </Box>
            <Typography variant="h5" component="h2" gutterBottom>
              {announcement.title}
            </Typography>
            <Typography variant="body1" component="div" gutterBottom>
              <span dangerouslySetInnerHTML={{ __html: announcement.content }} />
            </Typography>
            <Divider />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default News;