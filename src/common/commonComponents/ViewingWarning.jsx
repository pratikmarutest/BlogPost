import common from "../commonText";
const ViewingWarning = () => {
  return (
    <div className="md:hidden text-white bg-opacity-30 bg-yellow-500 rounded-lg text-center mb-3 text-sm py-1 ">
      {common.viewingWarning}
    </div>
  );
};

export default ViewingWarning;
