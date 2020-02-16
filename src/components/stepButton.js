import { CircularProgress, Button } from "@material-ui/core";
import { stylesHook } from "../style/login";

export default function StepButton({ children, loading, ...props }) {
  const { button } = stylesHook();
  return (
    <Button
      className={button}
      type="submit"
      fullWidth
      variant="contained"
      disableElevation
      disabled={loading}
      color="primary"
      style={{
        marginTop: "10px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "block"
      }}
      type="submit"
      {...props}
    >
      {loading ? (
        <>
          {/*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/}
          <CircularProgress size={24} color="inherit" />
          {/*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/}
        </>
      ) : (
        children || "próximo"
      )}
    </Button>
  );
}
