import { useState, useEffect } from "react";
import { Box } from "grommet";
import ProjectForm from "../components/ProjectForm";
import { axiosCreateProject, axiosGetProjects } from "../helpers/axiosRequests";
import ProjectCard from "../components/ProjectCard";
import { toast } from "react-hot-toast";

const ProjectsContainer = ({ userId, token }) => {
  const [projects, setProjects] = useState([]);

  const handleGetProjects = async (token) => {
    // const toastLoadProjects = toast.loading("Loading your projects...");
    const res = await axiosGetProjects(token.access);
    // toast.dismiss(toastLoadProjects);
    if (res.data) {
      setProjects(res.data);
    //   toast.success("Projects loaded successfully!");
    }
  };

  const handleCreateProject = async (formData) => {
    const toastCreateProject = toast.loading("Creating your project...");
    const res = await axiosCreateProject(formData, userId, token.access);
    toast.dismiss(toastCreateProject);
    if (res.data) {
      setProjects([res.data, ...projects]);
      toast.success("Created your project successfully!");
    }
  };

  useEffect(() => {
    handleGetProjects(token);
  }, [token]);

  const renderProjects = () => (
    <div>
      <Box pad="large" gap="medium" width="medium">
        {projects.map((project) => (
          <ProjectCard
            name={project.name}
            context={project.context}
            cycle={project.cycle}
            status={project.status}
            version={project.version}
          />
        ))}
      </Box>
    </div>
  );

  return (
    <div>
      <div>
        <ProjectForm 
        formAction="create"
        handleCreateProject={handleCreateProject} 
        />
      </div>
      <div>{projects ? renderProjects() : null}</div>
    </div>
  );
};

export default ProjectsContainer;
