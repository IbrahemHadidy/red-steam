import { FC, useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { AuthContext } from 'contexts/AuthContext';
import ProfileDropdown from "./ProfileDropdown";
import NavigationLinks from "./NavigationLinks";
import { toast } from "react-toastify";

const DefaultDesktopComponent: FC = () => {
  const { isLoggedIn } = useContext(AuthContext);
	return (
    <div>
      <Navbar
        className="nav-color header-container"
        variant="dark"
        collapseOnSelect={false}
      >
        <Container className="header-content">
          {/* Right-Top-side navigation links */}
          <Nav className="my-nav">
            {/* "Install Steam" button */}
            <Button
              variant="secondary"
              className={`mr-2 compact-button ${!isLoggedIn && 'login'}`}
              onClick={() =>
                toast.warning(
                  'This is not the real Steam website, It is just a clone for learning purposes.',
                )
              }
            >
              <span className="button-content button-text">
                <img
                  className="fa-icon"
                  src="/images/btn_header_installsteam_download.png"
                  style={{ color: '#ffffff' }}
                />{' '}
                Install Steam
              </span>
            </Button>

            {/* "Notifications" button */}
            {isLoggedIn && (
              <Button
                variant="secondary"
                className="compact-button"
                onClick={() =>
                  toast.info(
                    `This feature is not implemented yet and may not be implemented in the future.`,
                  )
                }
              >
                <span className="button-content button-text bell">
                  <img src="/images/bell.svg" style={{ width: '14px' }} />
                </span>
              </Button>
            )}

            {/* User profile dropdown menu */}
            {isLoggedIn ? (
              <ProfileDropdown />
            ) : (
              <div className="logging">
                <a href="/login">login</a>
                &nbsp; | &nbsp;
                <a href="/join">Sign Up</a>
              </div>
            )}
          </Nav>

          {/* Brand/logo section */}
          <Navbar.Brand href="/">
            <img
              alt="Steam"
              src="/images/logo_steam.svg"
              width="180"
              height="80"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Left-side navigation links */}
            <NavigationLinks />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default DefaultDesktopComponent;
