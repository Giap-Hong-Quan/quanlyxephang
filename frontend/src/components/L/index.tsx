import { useUI } from "../../context/UiProvider";
import ClipLoader from "react-spinners/ClipLoader";

function FullscreenLoading() {
  const { loading } = useUI();

  if (!loading) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999
      }}
    >
      <ClipLoader size={60} />
    </div>
  );
}

export default FullscreenLoading;