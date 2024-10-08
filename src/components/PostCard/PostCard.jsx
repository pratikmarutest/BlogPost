import appwriteService from "../../appwrite/config";
import { Link } from "react-router-dom";
import { Button } from "../index";
import parse from "html-react-parser";
import { postCard } from "../../common/commonText";

const PostCard = ({
  $id,
  title,
  featuredImage,
  content,
  ratings,
  category,
}) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="max-w-sm border border-gray-300 rounded-lg shadow-xl bg-gray-800 border-white border-opacity-30 h-96 relative">
        <div className="bg-black rounded-t-lg bg-opacity-30 p-2">
          <img
            className="object-contain w-full h-40"
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
          />
        </div>

        <div className="px-3 py-3">
          <h5 className="mb-1 text-xl font-bold tracking-tight text-white">
            {title}
          </h5>

          <div className="bg-white bg-opacity-10 text-blue-400 rounded-md px-2 py-1 inline text-xs md:text-sm">
            # {category}
          </div>

          <h1>
            {[...Array(ratings)].map((_, index) => {
              return (
                <span className="text-2xl text-yellow-400" key={index}>
                  &#9733;
                </span>
              );
            })}
            {[...Array(5 - ratings)].map((_, index) => {
              return (
                <span className="text-2xl text-gray-400" key={index}>
                  &#9733;
                </span>
              );
            })}
          </h1>

          <div className="text-md mb-3 font-normal w-full h-30 max-h-12 text-gray-400">
            {parse(content.substring(0, 45))}...
          </div>
        </div>

        <Button className="absolute bottom-0 left-0 mb-3 ml-3">
          {postCard.moreInfo}
        </Button>
      </div>
    </Link>
  );
};

export default PostCard;
