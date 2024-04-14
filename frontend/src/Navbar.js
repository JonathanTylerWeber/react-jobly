import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

function NavBar({ currentUser, handleLogout }) {
  return (
    <div>
      <Navbar expand="md">
        <NavLink exact='true' to="/" className="navbar-brand">
          Jobly
        </NavLink>

        <Nav className="ml-auto" navbar>

          {currentUser ? (
            <>
              <NavItem>
                <NavLink exact='true' to="/companies">Companies</NavLink>
              </NavItem>
              <NavItem>
                <NavLink exact='true' to="/jobs">Jobs</NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink exact to="/profile">Profile</NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink exact='true' to="/" onClick={handleLogout}>Logout</NavLink>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <NavLink exact='true' to="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink exact='true' to="/signup">Signup</NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
