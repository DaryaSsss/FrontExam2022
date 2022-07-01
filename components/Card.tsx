import { Button, Paper, Text } from '@mantine/core';
import Link from 'next/link';
import { IPlace } from '../pages';

function Card({ place }: { place: IPlace }) {
    return (
    <Paper shadow="xs" p="md" withBorder style={{ height: '100%' }}>
        <Text size="xl" mb="md">{place.name}</Text>
        <Text size="md" mb="md" style={{ whiteSpace: 'break-spaces' }}>{place.desc}</Text>
        <Link href={`places/${place.id}`} passHref>
            <Button variant="outline" color="dark" component="a" uppercase>Know more</Button>
        </Link>
    </Paper>
    );
}

export default Card;
