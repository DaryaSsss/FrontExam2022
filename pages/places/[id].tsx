import { Button, Center, Group, Modal, Paper, Stack, Text, TextInput, Title } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { observer } from 'mobx-react-lite';
import { ParsedUrlQuery } from 'querystring';
import { useEffect, useState } from 'react';
import CommentCard from '../../components/CommentCard';
import Layout from '../../layouts/Layout';
import commentsStore from '../../store/commentsStore';

function Comments() {
  return (
    <>
      {commentsStore.commentsList.map(((comment, i) =>
       <CommentCard key={i} comment={comment} />))}
    </>
  );
}

const CommentsObserver = observer(Comments);
export interface IPlace {
  url: string;
  id: string;
  name: string;
  place_type: string;
  desc: string;
  free: boolean;
}

interface Params extends ParsedUrlQuery {
  id: string,
}

function Place({ place }: { place: IPlace }) {
  useEffect(() => {
    commentsStore.getCommentsFromApi(place.id);
  }, []);

  const [inputComment, setInputComment] = useState('');
  const [opened, setOpened] = useState(false);
    return (
    <Layout>
    { place?.id !== undefined ?
    <>
    <Title order={1} mb="xl">Currently place is {place.name}</Title>
    <Group spacing="xl" mb="xl">
        <Paper shadow="xs" p="md" withBorder>
            <Text size="xl" mb="md">{place.name}</Text>
            <Text size="md" mb="md" style={{ whiteSpace: 'break-spaces' }}>{place.desc}</Text>
            <Button variant="light" color="dark" onClick={() => setOpened(true)}>Book this place</Button>
        </Paper>
    </Group>
    <Modal
      centered
      opened={opened}
      onClose={() => setOpened(false)}
      title="Please fill the forms"
    >
        <Stack>
        <TextInput
          placeholder="dasha111"
          label="Username"
          required
        />
        <TextInput
          placeholder="dasha@mail.ru"
          label="Email"
          required
        />
        <DateRangePicker
          pb="md"
          label="Choose dates"
          placeholder=".... - ...."
          required
        />
        <Button type="submit">Book</Button>
        <Text size="xs">By clicking button you agree to our rules and automatically pay for service</Text>
        </Stack>
    </Modal>
    <Title order={2}>Comments and reviews about this place</Title>
      <TextInput
        style={{ maxWidth: '70%' }}
        mb="md"
        placeholder="Type here"
        label="Leave here your comment or review"
        value={inputComment}
        onChange={(evt) => {
          commentsStore.comment.text = evt.currentTarget.value;
          setInputComment(evt.currentTarget.value);
        }}
      />
      <Button
        onClick={() => {
          const { text } = commentsStore.comment;
          if (text?.length) {
            commentsStore.addCommentsToApi(place.id, text);
            setInputComment('');
          }
        }}
        mb="md"
        variant="light"
        color="dark"
        type="submit"
      >Create comment
      </Button>
      <CommentsObserver />
    </>
    : <Center>Something went wrong, please reload the page</Center> }
    </Layout>
    );
}

export async function getServerSideProps({ params }: { params: Params }) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/places/${params.id}`);
    const place = await res.json();
    return {
      props: {
        place,
      },
    };
  } catch (e) {
      return {
        props: {
          errorMsg: 'Something went wrong, please reload the page',
        },
      };
  }
}

// async function postData(url = '', data = {}) {
//   const response = await fetch(url, {
//     method: 'POST',
//     mode: 'cors',
//     cache: 'no-cache',
//     credentials: 'same-origin',
//     headers: {
//       'Content-Type': 'application/json',
//      },
//     redirect: 'follow',
//     referrerPolicy: 'no-referrer',
//     body: JSON.stringify(data),
//   });
//   return response.json();
// }

// postData('https://example.com/answer', { answer: 42 })
//   .then((data) => {
//     console.log(data);
//   });

export default Place;
