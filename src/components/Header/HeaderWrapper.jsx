import ClassicHeader from "./ClassicHeader";
import Header from "./Header";

const HeaderWrapper = ({ classicHeader, handleNavClick }) => {
  return (
    <>
      {classicHeader ? (
        <ClassicHeader handleNavClick={handleNavClick} />
      ) : (
        <Header handleNavClick={handleNavClick} />
      )}
    </>
  );
};

export default HeaderWrapper;
