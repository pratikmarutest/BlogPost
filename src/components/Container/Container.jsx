import { BackButton } from "../index";

const Container = ({ children, displayBack = false }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {displayBack && <BackButton />}
      {children}
    </div>
  );
};

export default Container;
