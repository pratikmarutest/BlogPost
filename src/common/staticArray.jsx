import { whatsappIcon, telegramIcon, instagramIcon } from "../assets/index";
import { socialMediaLink } from "../common/commonText";

export const messageRow = ["Resolved", "Name", "Email", "Message", "Actions"];

export const messageFilters = ["All", "Resolved", "Pending"];

export const footerTextArray = [
  "About",
  "Privacy Policy",
  "Licensing",
  "Contact",
];

export const socialMediaLinks = [
  {
    icon: instagramIcon,
    link: socialMediaLink.instagramLink,
  },
  {
    icon: telegramIcon,
    link: socialMediaLink.telegramLink,
  },
  {
    icon: whatsappIcon,
    link: socialMediaLink.whatsappLink,
  },
];
