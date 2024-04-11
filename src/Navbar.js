import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Calculator</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;