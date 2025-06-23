import { Link } from "react-router-dom";
import "./Landing.css";
import MicrohuascaLogo from "../../assets/microhuasca.svg";

function Landing() {
  return (
    <div className="landing">
      <h1>Bitácora</h1>
      <img src={MicrohuascaLogo} alt="Logo Microhuasca" className="logo-img" />
      <Link to="/login">
      <button>Entrar</button>
      </Link>
      
    </div>
  );
}

export default Landing;
