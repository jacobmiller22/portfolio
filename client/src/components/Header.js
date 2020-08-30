import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="ui pointing menu">
      <Link to="/" className="item">
        Jacob Miller
      </Link>
      <Link to="/courses" className="item">
        Courses
      </Link>
      <Link to="/projects" className="item">
        Projects
      </Link>
      <Link to="/contact" className="item">
        Contact
      </Link>
    </div>
  );
};

export default Header;