import LoadingButton from "@mui/lab/LoadingButton";

export default function CustomLoadingButton({ loading, onClick, children }) {
  return (
    <LoadingButton
      loading={loading}
      variant="contained"
      onClick={onClick}
      sx={{ bgcolor: "gray"}}
    >
      {children}
    </LoadingButton>
  );
}