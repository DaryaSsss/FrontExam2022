import { Group, Title, Text, Paper, Image } from '@mantine/core';
import Layout from '../layouts/Layout';
import home from '../assets/img/home.png';

function About() {
  return (
    <Layout>
    <Title order={1} mb="xl">About us</Title>
    <Group spacing="xl" noWrap align="flex-start">
        <Image
          width={500}
          height={350}
          src={home.src}
          alt="Office picture"
          radius="md"
        />
        <Paper shadow="md" p="md" withBorder>
            <Text size="xl">Coworking is an arrangement in which workers of different companies share an office space, allowing cost savings and convenience through the use of common infrastructures, such as equipment, utilities, and receptionist and custodial services, and in some cases refreshments and parcel acceptance services.
            </Text>
            <Text size="xl">We are a company providing coworking services: from a place for a large office for a long time. Go to services and try!
            </Text>
        </Paper>
    </Group>
    </Layout>
  );
}

export default About;
