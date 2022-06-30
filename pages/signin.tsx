import { TextInput, PasswordInput, Container, Button, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import Layout from '../layouts/Layout';

function SignIn() {
    const registrationForm = useForm({
        initialValues: {
          username: '',
          password: '',
        },
        validate: {
          password: (value) => value.length < 8 ? 'Password must contain at least 8 characters' : null,
        },
      });

    return (
        <Layout>
        <Title order={1} mb="xl">Registration</Title>
        <Container size="xs" px="xs">
        <form onSubmit={registrationForm.onSubmit((values) => {
          registrationForm.validate();
          console.log('Submitted', values);
        })}
        >
        <TextInput
          {...registrationForm.getInputProps('username')}
          placeholder="Your username"
          label="Username"
          required
          mb="sm"
          value={registrationForm.values.username}
          onChange={(event) => registrationForm.setFieldValue('username', event.currentTarget.value)}
        />
        <PasswordInput
          {...registrationForm.getInputProps('password')}
          placeholder="Password"
          label="Password"
          required
          mb="md"
        />
        <Button type="submit">Sign In</Button>
        </form>
        </Container>
        </Layout>
    );
}

export default SignIn;
