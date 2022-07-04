import { Button, Center, Group, Modal, Paper, Stack, Text, TextInput, Title } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CommentCard from '../../components/CommentCard';
import Layout from '../../layouts/Layout';
import commentsStore from '../../store/commentsStore';
import placesStore from '../../store/placesStore';

const dateOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  timezone: 'UTC',
};

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

function Place() {
  const [place, setPlace] = useState<IPlace | null>(null);
  const [value, setValue] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  useEffect(() => {
    if (place) {
      commentsStore.getCommentsFromApi(place.id);
    }
  }, [place]);

  const [inputComment, setInputComment] = useState('');
  const [opened, setOpened] = useState(false);

  const [free, setFree] = useState(true);
  useEffect(() => {
    if (place) {
      setFree(place.free);
    }
  }, [place]);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchPlace = async () => {
      if (id) {
        const response = await placesStore.getPlaceFromApi({ place: id.toString() });
        setPlace(response);
      }
    };
    fetchPlace();
  }, [id]);
    return (
    <Layout>
    { place?.id !== undefined ?
    <>
    <Title order={1} mb="xl">Currently place is {place.name}</Title>
    <Group spacing="xl" mb="xl">
      { free ?
        <Paper shadow="xs" p="md" withBorder>
            <Text size="xl" mb="md">{place.name}</Text>
            <Text size="md" mb="md" style={{ whiteSpace: 'break-spaces' }}>{place.desc}</Text>
            <Button variant="light" color="dark" onClick={() => setOpened(true)}>Book this place</Button>
        </Paper>
      : <Stack><Text size="xl">Great, your booking is done!</Text>
          <Text size="lg">We will send you an email with information about it.</Text>
        </Stack>}
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
          onChange={(evt) => {
            placesStore.booking.username = evt.currentTarget.value;
          }}
        />
        <TextInput
          placeholder="dasha@mail.ru"
          label="Email"
          required
          onChange={(evt) => {
            placesStore.booking.email = evt.currentTarget.value;
          }}
        />
        <DateRangePicker
          pb="md"
          label="Choose dates"
          placeholder=".... - ...."
          value={value}
          onChange={(v) => {
            setValue(v);
            if (v[0] && v[1]) {
              console.log(v[0], v[1]);
              placesStore.booking.timeInterval = [v[0].toLocaleString('ru', dateOptions), v[1].toLocaleString('ru', dateOptions)];
            }
          }}
        />
        <Button
          onClick={() => {
          setOpened(false);
          setFree(false);
          const { username, email } = placesStore.booking;
          placesStore.addPlaceBookingToApi({
            place: place.id,
            username,
            email,
            out: placesStore.booking.timeInterval[0],
            _in: placesStore.booking.timeInterval[1],
          });
        }}
          type="submit"
        >Book
        </Button>
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

export default Place;
