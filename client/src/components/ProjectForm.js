import { useState } from "react";
import { Box, Form, FormField, TextInput, Select, Button } from "grommet";

const ProjectForm = ({ formAction, handleCreateProject }) => {
  const [formData, setFormData] = useState({});

  return (
    <div>
      <Box align="center" pad="medium">
        <Form
          value={formData}
          onChange={(newValue) => setFormData(newValue)}
          onReset={() => setFormData({})}
          onSubmit={({ value }) => {
            switch (formAction) {
              case "create":
                handleCreateProject(value);
                break;
              default:
                break;
            }
          }}
        >
          <Box direction="row" pad="small">
            <FormField
              name="name"
              label="Project Name"
              component={TextInput}
              required
            />
            </Box>
            <Box direction="row" pad="small">
            <FormField
              name="context"
              label="Project Context"
              component={TextInput}
              placeholder="Web, Game, etc..."
            />
            </Box>
            <Box direction="row" pad="small">
            <FormField
              name="cycle"
              label="Project Cycle"
              component={Select}
              options={[
                "Analysis",
                "Planning",
                "Design",
                "Prototyping",
                "Development",
                "Testing",
                "Production",
              ]}
              required
            />
            </Box>
            <Box direction="row" pad="small">
            <FormField
              name="status"
              label="Project Status"
              component={Select}
              options={[
                "Inactive - Not Functional / Unreleased",
                "Active - Fully Functional",
                "Inactive - Under Maintenance",
                "Active - Under Maintenance",
              ]}
              required
            />
            </Box>
            <Box direction="row" pad="small">
            <FormField
              name="version"
              label="Project Version"
              component={TextInput}
              placeholder="1.4, 2.683, etc..."
              help="This should have only one decimal point"
            />
          </Box>
          <Box direction="row" gap="medium" margin="small">
            <Button type="submit" primary label="Submit" />
            <Button type="reset" label="Reset" />
          </Box>
        </Form>
      </Box>
    </div>
  );
};

export default ProjectForm;
