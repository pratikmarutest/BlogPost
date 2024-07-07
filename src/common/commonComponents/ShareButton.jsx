import { Button } from "../../components/index";
import { shareButtonText } from "../commonText";
import { shareIcon } from "../../assets/index";

const ShareButton = ({ url }) => {
  return (
    <div className="relative flex items-center">
      {/* Dynamically generate sharing options based on installed apps */}
      {getShareOptions().map((option, index) => (
        <Button key={index} onClick={() => option.action(url)}>
          <img src={shareIcon} />
        </Button>
      ))}
    </div>
  );
};

// Function to get available sharing options
const getShareOptions = () => {
  const shareOptions = [];

  // Check for installed apps
  if (navigator.share) {
    shareOptions.push({
      label: "Share",
      action: (url) => {
        navigator.share({
          title: shareButtonText.shareTitle,
          text: shareButtonText.shareText,
          url: url,
        });
      },
    });
  }

  if (window.hasOwnProperty("WhatsApp")) {
    shareOptions.push({
      label: "WhatsApp",
      action: (url) => {
        window.WhatsApp.send({
          text: url,
        });
      },
    });
  }

  // Add more sharing options for other apps as needed
  return shareOptions;
};

export default ShareButton;
