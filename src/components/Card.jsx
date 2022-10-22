export const Card = ({ cardId, url, isActive, onClick, numbered }) => {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: "rgb(203 114 163)",
        backgroundImage: isActive ? `url(${url})` : undefined,
        backgroundSize: "cover",
        backgroundAttachment: isActive ? "scroll" : "fixed",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {numbered && <h2>{cardId + 1}</h2>}
    </div>
  );
};
