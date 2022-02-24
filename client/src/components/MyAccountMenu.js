import { Menu } from "grommet";
import { useNavigate } from "react-router-dom";

const MyAccountMenu = ({ user, handleLogout }) => {
  const navigate = useNavigate();

  const renderGuestMenu = () => (
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
  )

  const renderUserMenu = () => (
    <Menu
      label="My Account"
      items={[
        { 
          label: "Sign Out",
          onClick: () => {
            handleLogout()
            navigate("/")
          }
        }
      ]}
    />
  )
  return (
    <div>
      {
        user.id ? renderUserMenu() : renderGuestMenu()
      }
    </div>
  );
};

export default MyAccountMenu;
