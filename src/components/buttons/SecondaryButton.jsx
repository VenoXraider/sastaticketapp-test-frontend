
const SecondaryButton = ({ type, title, onClick, icon }) => {
  return (
    <button
      type={type}
      className={`p-2.5 px-7 text-center flex rounded-md bg-gray-900 text-white border transition-all transform hover:bg-green-600 active:scale-90`}
      onClick={onClick}
    >
      {title}

      {icon ? <span className='m-1 ml-2'>{icon}</span> : <></>}
    </button>
  );
};

export default SecondaryButton;
