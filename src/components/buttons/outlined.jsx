import useTheme from "../../hooks/theme.hook";

const OutlinedButton = ({ type, title, onClick, disabled }) => {
  const theme = useTheme();
  return (
    <button
      type={type}
      className={`w-full p-2.5 ${theme.colors.secondaryButtonBg} ${theme.colors.secondaryButtonText} border ${theme.colors.secondaryButtonBorder} transition-all hover:${theme.colors.secondaryButtonHoverbg} hover:${theme.colors.secondaryButtonHovertext} active:bg-violet-500 disabled:bg-gray-100 disabled:text-violet-800 disabled:border-violet-800 disabled:cursor-not-allowed`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default OutlinedButton;
