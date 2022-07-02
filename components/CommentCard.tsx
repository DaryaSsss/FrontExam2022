import { Button, Group, Paper, Text, Stack, TextInput } from '@mantine/core';
import { useState } from 'react';
import { X, ArrowsExchange, Check } from 'tabler-icons-react';
import commentsStore, { ICommentModel } from '../store/commentsStore';

function Card({ comment } : { comment: ICommentModel }) {
  const [inputVisible, setInputVisible] = useState(false);
  const [editComment, setEditComment] = useState(comment.text);
  console.log(comment);
  return (
  <Paper shadow="xs" p="md" mb="md" style={{ maxWidth: '70%' }} withBorder>
    <Stack>
      <Group position="apart">
        <Group>
          <Text size="xl">{comment.username}</Text>
          <Text size="xs">{comment.date}</Text>
        </Group>
        { !inputVisible ?
        <Group>
          <Button
            onClick={() => {
              commentsStore.deleteComment(comment.id);
            }
          }
            size="xs"
            color="red"
            variant="light"
            leftIcon={<X size={14} />}
          >Delete
          </Button>
          <Button
            onClick={() => {
              setInputVisible(true);
            }}
            size="xs"
            color="blue"
            variant="light"
            leftIcon={<ArrowsExchange size={14} />}
          >Change
          </Button>
        </Group>
       :
        <Button
          onClick={() => {
              commentsStore.changeComment(comment.id, editComment, comment.place_id);
              setInputVisible(false);
            }
          }
          size="xs"
          color="green"
          variant="light"
          leftIcon={<Check size={14} />}
        >Save
        </Button>
      }
      </Group>
      { inputVisible ?
      <>
      <TextInput
        style={{ maxWidth: '70%' }}
        mb="md"
        label="Leave here your comment or review"
        value={editComment}
        onChange={(evt) => {
          setEditComment(evt.currentTarget.value);
        }}
      />
      </> :
      <Text size="md" mb="md">{comment.text}</Text>
      }
    </Stack>
  </Paper>
  );
}

export default Card;
