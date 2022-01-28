import { Nav } from "grommet";
import MyAccountMenu from "./MyAccountMenu";

const Navbar = () => {
  return (
    <Nav direction="row" background="brand" pad="medium">
      <MyAccountMenu />
    </Nav>
  );
};

export default Navbar;
