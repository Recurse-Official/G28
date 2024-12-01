import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
    <div className="container-fluid">
      <a className="navbar-brand fw-bold" href="#">Digital Time Capsule</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/features">Features</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#contact">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
