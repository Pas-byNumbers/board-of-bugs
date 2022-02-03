import { Nav, Box, Image, Header, Text, Button } from "grommet";
import MyAccountMenu from "./MyAccountMenu";
import MyProjectsMenu from "./MyProjectsMenu";
import { Link } from 'react-router-dom'

const Navbar = ({ user, handleLogout, handleRecycleToken }) => {
  return (
    <Header background="brand">
      <Nav direction= "row" align="center" pad="small">
        <MyAccountMenu user={user} handleLogout={handleLogout} />
        {user.id ? <MyProjectsMenu /> : null}
      </Nav>
        <Box align="center" pad="medium">
          <Link to="/">Board of Bugs Title</Link>
        </Box>
      <Nav direction="row-reverse" align="center" pad="small" >
        <h4>Profile Scorecard</h4>
      </Nav>
    </Header>
  );
};

export default Navbar;
