import logo from "./logo.svg";
import logostyle from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={logostyle}>
      <img src={logo} alt="logo"></img>
    </div>
  );
};

export default Logo;
