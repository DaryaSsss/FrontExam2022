import { Button, Group, Paper, Text, Stack } from '@mantine/core';
import { X, ArrowsExchange } from 'tabler-icons-react';

function Card() {
    return (
    <Paper shadow="xs" p="md" style={{ maxWidth: '70%' }} withBorder>
      <Stack>
        <Group position="apart">
          <Group>
            <Text size="xl">Guest</Text>
            <Text size="xs">Created at 10:23 12.13.4232</Text>
          </Group>
          <Group>
            <Button size="xs" color="red" variant="light" leftIcon={<X size={14} />}>Delete</Button>
            <Button size="xs" color="blue" variant="light" leftIcon={<ArrowsExchange size={14} />}>Change</Button>
          </Group>
        </Group>
        <Text size="md" mb="md">Comment esorihgoergo</Text>
      </Stack>
    </Paper>
    );
}

export default Card;
