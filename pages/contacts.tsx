import { Paper, Title, Text, Center, Container } from '@mantine/core';
import Layout from '../layouts/Layout';

function Contacts() {
  return (
  <Layout>
    <Title order={1}>Contacts</Title>
    <Container size="xs" px="xs">
    <Paper shadow="md" p="xl" withBorder>
      <Text size="xl">You can easily contact with us using:</Text>
      <Text size="xl">
        Email: coworking@mail.ru
      </Text>
      <Text size="xl">
        Phone: +7 (920) 123-45-67
      </Text>
    </Paper>
    </Container>
  </Layout>
  );
}

export default Contacts;
