import { Button, Group, Paper, Text, Stack } from '@mantine/core';
import { X, ArrowsExchange } from 'tabler-icons-react';
import { ICommentModel } from '../../store/commentsStore';

function Card({ comment } : { comment: ICommentModel }) {
    console.log(comment);
    return (
    <Paper shadow="xs" p="md" mb="md" style={{ maxWidth: '70%' }} withBorder>
      <Stack>
        <Group position="apart">
          <Group>
            <Text size="xl">{comment.username}</Text>
            <Text size="xs">{comment.date}</Text>
          </Group>
          <Group>
            <Button size="xs" color="red" variant="light" leftIcon={<X size={14} />}>Delete</Button>
            <Button size="xs" color="blue" variant="light" leftIcon={<ArrowsExchange size={14} />}>Change</Button>
          </Group>
        </Group>
        <Text size="md" mb="md">{comment.text}</Text>
      </Stack>
    </Paper>
    );
}

export default Card;
