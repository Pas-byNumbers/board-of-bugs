import { Menu } from "grommet";
import { useNavigate } from "react-router-dom";

const MyAccountMenu = () => {
  const navigate = useNavigate();
  return (
    <Menu
      label="My Account"
      items={[
        {
          label: "Register",
          onClick: () => {
            navigate("/register");
          },
        },
        {
          label: "Login",
          onClick: () => {
            navigate("/login");
          },
        },
      ]}
    />
  );
};

export default MyAccountMenu;
