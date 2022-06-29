import { Title, Group } from '@mantine/core';
import Image from 'next/image';
import Layout from '../layouts/Layout';
import home from '../assets/img/home.png';

export default function HomePage() {
  return (
      <Layout>
            <Title order={1}>Home</Title>
            <Group>
            <Image
              width={500}
              height={350}
              src={home.src}
              alt="Office picture"
            />
            </Group>
      </Layout>
  );
}
