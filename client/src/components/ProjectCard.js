import { Text, Card, CardBody } from "grommet";

const ProjectCard = ({
    name, context, cycle, status, version
}) => {

    const [ statusA, statusB ] = status.split(' - ')

  return (
    <Card pad="small" gap="medium" background="light-4">
        <h5>{name}</h5>
      <CardBody>
        <Text>Project Context: {context}</Text>
        <Text>Project Cycle: {cycle}</Text>
        <Text>Project Status: {statusA} ({statusB})</Text>
        <Text>Project Version: {version}</Text>
      </CardBody>
    </Card>
  );
};

export default ProjectCard;
