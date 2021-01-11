import { Button, FormControl, Navbar, Nav, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Alert from "../utils/Alert";

function Menu({ handleLogout, currentUser, validation }) {
  const history = useHistory();
  return (
    <>
      <Navbar expand="lg">
        <Navbar.Brand>
          <Link to={"/"}>
            <div className="logo-completo">
              <p>
                Data<span className="logo-clientes">Tools</span>
              </p>
              <img
                src="https://ddo0fzhfvians.cloudfront.net/uploads/icons/png/15803414591605579771-64.png"
                alt="Logo"
                className="login-logo-img"
              />
            </div>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/"></Nav.Link>
          </Nav>

          <Form inline>
            {currentUser.id ? (
              <Button variant="dark" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button variant="dark" onClick={() => history.push("/login")}>
                Login
              </Button>
            )}
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <div className="navname">Bienvenid@ {currentUser.name}</div>
      {validation ? (
        <Alert
          className="alert"
          key={validation.key}
          message={validation.msg}
          type={validation.type}
        />
      ) : null}
    </>
  );
}

export default Menu;
