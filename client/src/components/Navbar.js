import { Nav, Box, Image, Header, Text } from "grommet";
import MyAccountMenu from "./MyAccountMenu";
import MyProjectsMenu from "./MyProjectsMenu";

const Navbar = ({ user, handleLogout }) => {
  return (
    <Header background="brand">
      <Nav direction= "row" align="center" pad="small">
        <MyAccountMenu user={user} handleLogout={handleLogout} />
        {user.id ? <MyProjectsMenu /> : null}
      </Nav>
        <Box align="center" pad="medium">
          <Text>Board of Bugs Title</Text>
        </Box>
      <Nav direction="row-reverse" align="center" pad="small" >
        <h4>Profile Scorecard</h4>
      </Nav>
    </Header>
  );
};

export default Navbar;
