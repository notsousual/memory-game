export const Card = ({ cardId, url, isActive, onClick, numbered }) => {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: "rgb(203 114 163)",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        overflow: "hidden",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {numbered && !isActive && (
        <h2 style={{ position: "relative", left: "50%" }}>{cardId + 1}</h2>
      )}
      <img
        style={{
          maxWidth: "100%",
          visibility: isActive ? "initial" : "hidden",
        }}
        src={url}
      ></img>
    </div>
  );
};
