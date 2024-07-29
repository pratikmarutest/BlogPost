import common, { postText } from "./commonText";
import { whatsappIcon, telegramIcon, instagramIcon } from "../assets/index";
import { socialMediaLink } from "../common/commonText";
import { Link } from "react-router-dom";

export const messageRow = ["Resolved", "Name", "Email", "Message", "Actions"];

export const messageFilters = ["All", "Resolved", "Pending"];

export const footerTextArray = ["About", "Privacy Policy", "Contact"];

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

export const reviewArray = [
  {
    userName: "Pratik Maru",
    userReview:
      "Platform lists best earning opportunities and offers. I have earned pocket money and also saved money using offers listed by this platform.",
  },
  {
    userName: "Foram shah",
    userReview:
      "Amazing site. Already saved good amount of money using this platform and also earned decent money by filling surveys on platforms listed by this site. ",
  },
  {
    userName: "Kritika Mehta",
    userReview:
      "Platform is having amazing contact support. Got response really quick.",
  },
  {
    userName: "Arjun Pandit",
    userReview:
      "Highly recommend this site. Earned good amount of money by filling surveys. Thank you.",
  },
];

export const appTimeline = [
  {
    stepTitle: `Step 1: Register on ${common.orgName}`,
    supportMessage: "We promise we won't spam you.",
    description:
      "Register on Earnquest. Post registration you'll see a list of sites/ apps posted on platform as per filter applied. You can filter sites/ apps based on preference.",
    action: (
      <div className="text-blue-400">
        <Link to="/login">{common.login}</Link> |{" "}
        <Link to="/signup">{common.signup}</Link>
      </div>
    ),
  },
  {
    stepTitle: `Step 2: Navigation of ${common.orgName}`,
    supportMessage: "Suggest you to use filters.",
    description: `Based on filters you'll come accross many posts related to earning opportunities and exiting offers. Try to explore ${common.orgName}.`,
    action: (
      <div className="text-blue-400">
        <Link to="/login">Explore</Link>
      </div>
    ),
  },
  {
    stepTitle: `Step 3: Grab opportunities listed on ${common.orgName}`,
    supportMessage: "Recommend you to always read post content",
    description: `Before registration it's always suggested to read post content about earning apps/ offers carefully. Once you're done reading click on "${postText.siteLink}" button to get redirected to site. Any queries / difficulties do reach out to us.`,
    action: (
      <div className="text-blue-400">
        <Link to="/contact">Contact Us</Link>
      </div>
    ),
  },
];
