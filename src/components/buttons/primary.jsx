const PrimaryButton = ({ type, title, onClick, disabled, left, icon, style, wfull = false }) => {
  return (
    <button
      type={type}
      className={`${
        left ? "text-left" : "text-center"
      } rounded ${wfull ? "w-full" : ""} p-2.5 px-5 bg-gray-700 text-white border border-gray-800 transition-all hover:bg-gray-400 disabled:cursor-not-allowed disabled:text-zinc-700 disabled:bg-zinc-500 flex gap-2 justify-center items-center`}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {icon} {title}
    </button>
  );
};

export default PrimaryButton;
