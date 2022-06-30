import { TextInput, PasswordInput, Container, Button, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import Layout from '../layouts/Layout';

function SignUp() {
    const registrationForm = useForm({
        initialValues: {
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        },
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
          password: (value) => value.length < 8 ? 'Password must contain at least 8 characters' : null,
          confirmPassword: (value, values) =>
             value !== values.password ? 'Passwords did not match' : null,
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
        <TextInput
          {...registrationForm.getInputProps('email')}
          mb="xs"
          label="Email"
          placeholder="oliviasmith@gmail.com"
          required
          value={registrationForm.values.email}
          onChange={(event) => registrationForm.setFieldValue('email', event.currentTarget.value)}
        />
        <PasswordInput
          {...registrationForm.getInputProps('password')}
          placeholder="Password"
          label="Password"
          description="Password must include at least one letter, number and special character"
          required
          mb="md"
        />
        <PasswordInput
          {...registrationForm.getInputProps('confirmPassword')}
          placeholder="Confirm password"
          label="Confirm password"
          required
          mb="md"
        />
        <Button type="submit">Sign Up</Button>
        </form>
        </Container>
        </Layout>
    );
}

export default SignUp;
