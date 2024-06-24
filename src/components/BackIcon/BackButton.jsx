import { useNavigate } from "react-router-dom";
import { backIcon } from "../../assets/index";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        className="hidden md:block cursor-pointer w-8 h-8 rounded-full bg-opacity-10 bg-white"
        onClick={() => {
          navigate(-1);
        }}
      >
        <img className="w-8 h-8" src={backIcon} alt="Back-Icon" />
      </div>
    </div>
  );
};
export default BackButton;
