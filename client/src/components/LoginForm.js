import { Box, Button, Form, FormField, TextInput } from "grommet";
import { Hide, View } from "grommet-icons";
import { useState } from "react";

const LoginForm = ({ handleLogin }) => {
    
  const [formData, setFormData] = useState({
      username: '',
      password: ''
  });
  const [reveal, setReveal] = useState(false);



  return (
    <div>
      <Box align="center" pad="medium">
        <Form
          value={formData}
          onChange={(newValue) => setFormData(newValue)}
          onReset={() => setFormData({})}
          onSubmit={({value}) => handleLogin(value)}
        >
          <Box direction="row" pad="small">
            <FormField name="username" label="Username" component={TextInput} />
          </Box>
          <Box direction="row" pad="small">
            <FormField
              name="password"
              label="Password"
              component={TextInput}
              type={reveal ? "text" : "password"}
            />
            <Button
              icon={reveal ? <View size="medium" /> : <Hide size="medium" />}
              onClick={() => setReveal(!reveal)}
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

export default LoginForm;
