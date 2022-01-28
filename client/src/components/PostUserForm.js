import { Box, Button, Form, FormField, TextInput, MaskedInput } from "grommet";
import { Hide, View } from "grommet-icons";
import { useState } from "react";

const PostUserForm = ({ handleRegister, handleLogin, formAction }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [reveal, setReveal] = useState(false);

  const renderEmailField = () => (
    <Box direction="row" pad="small">
      <FormField label="Email" name="email" required>
        <MaskedInput
          name="email"
          mask={[
            { regexp: /^[\w\-_.]+$/, placeholder: "example" },
            { fixed: "@" },
            { regexp: /^[\w]+$/, placeholder: "email" },
            { fixed: "." },
            { regexp: /^[\w]+$/, placeholder: "com" },
          ]}
        />
      </FormField>
    </Box>
  );

  return (
    <div>
      <Box align="center" pad="medium">
        <Form
          value={formData}
          onChange={(newValue) => setFormData(newValue)}
          onReset={() => setFormData({})}
          onSubmit={({ value }) => {
            switch (formAction) {
              case "register":
                handleRegister(value);
                break;
              case "login":
                handleLogin(value);
                break;
              default:
                break;
            }
          }}
        >
          <Box direction="row" pad="small">
            <FormField
              name="username"
              label="Username"
              component={TextInput}
              required
            />
          </Box>
          <Box direction="row" pad="small">
            <FormField
              name="password"
              label="Password"
              component={TextInput}
              type={reveal ? "text" : "password"}
              required
            />
            <Button
              icon={reveal ? <View size="medium" /> : <Hide size="medium" />}
              onClick={() => setReveal(!reveal)}
            />
          </Box>
          {formAction === "register" ? renderEmailField() : null}
          <Box direction="row" gap="medium" margin="small">
            <Button type="submit" primary label="Submit" />
            <Button type="reset" label="Reset" />
          </Box>
        </Form>
      </Box>
    </div>
  );
};

export default PostUserForm;
