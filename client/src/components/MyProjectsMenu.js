import { Menu } from "grommet";
import { useNavigate } from "react-router-dom";

const MyProjectsMenu = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Menu
        label="My Projects"
        items={[
          {
            label: "Projects Board",
            onClick: () => {
              navigate("/projects");
            },
          },
        ]}
      />
    </div>
  );
};

export default MyProjectsMenu;
