import { CircularProgress } from "@material-ui/core";

const style = {
  height: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column"
};

function Loading() {
  return (
    <div style={style}>
      <div
        style={{
          ...style,
          flexDirection: "row"
        }}
      >
        <CircularProgress color="inherit" />
      </div>
    </div>
  );
}

export default Loading;
