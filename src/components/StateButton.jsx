export const StateButton = ({ onClick, state, targetValue, title }) => {
  return (
    <button
      onClick={onClick}
      style={{ background: state === targetValue ? "#3ecd66" : undefined }}
    >
      {title}
    </button>
  );
};
