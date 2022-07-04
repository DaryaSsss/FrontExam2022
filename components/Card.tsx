import { Button, Paper, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import { IPlace } from '../pages';

function Card({ place }: { place: IPlace }) {
    return (
    <Paper shadow="xs" p="md" withBorder style={{ height: '100%' }}>
      <Stack style={{ height: '100%' }}>
        <Text size="xl">{place.name}</Text>
        <Text size="md" mb="md" style={{ whiteSpace: 'break-spaces' }}>{place.desc}</Text>
        <Link href={`places/${place.id}`} passHref>
            <Button variant="outline" color="dark" component="a" mt="auto" uppercase>Know more</Button>
        </Link>
      </Stack>
    </Paper>
    );
}

export default Card;
