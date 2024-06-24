import common from "../../common/commonText";
import { orgLogo } from "../../assets/index";

const Logo = ({ addClass = "" }) => {
  return (
    <div>
      <img
        className={`h-8 rounded-sm md:rounded-md ${addClass}`}
        src={orgLogo}
        alt={`${common.orgName}`}
      />
    </div>
  );
};

export default Logo;
