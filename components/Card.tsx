import { Button, Paper, Text } from '@mantine/core';
import Link from 'next/link';
import { IPlace } from '../pages';

function Card({ place }: { place: IPlace }) {
    return (
    <Paper shadow="xs" p="md" withBorder>
        <Text size="xl" mb="md">{place.name}</Text>
        <Text size="md" mb="md" style={{ whiteSpace: 'break-spaces' }}>{place.desc}</Text>
        <Link href="/signup" passHref>
            <Button variant="outline" color="dark" component="a" uppercase>Book place</Button>
        </Link>
    </Paper>
    );
}

export default Card;
