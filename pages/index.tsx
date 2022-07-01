import { Title, Grid, Center, Select, Switch, Group, Pagination } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import Card from '../components/Card';
import Layout from '../layouts/Layout';

export interface IPlace {
  url: string;
  name: string;
  place_type: string;
  desc: string;
  free: boolean;
}

function Services({ places, errorMsg }: { places?: IPlace[], errorMsg?: string }) {
  const [activePage, setPage] = useState(1);
  const [placeType, setPlaceType] = useState<string | null>('all');
  const [checked, setChecked] = useState(false);

  const filteredPlaces = useMemo(() => {
    if (!places) return [];
    const freePlaces = places.filter(place => place.free);
    if (placeType === 'all') {
      return freePlaces;
    }
      return freePlaces.filter(place => place.place_type === placeType);
  }, [places, placeType]);

  const sortedPlaces = useMemo(() => {
    if (!checked) return filteredPlaces;
    return [...filteredPlaces].sort((a, b) => a.name.localeCompare(b.name));
  }, [checked, filteredPlaces]);

  const placesToShow = useMemo(() =>
    sortedPlaces.slice((activePage - 1) * 6, activePage * 6), [sortedPlaces, activePage]);

  const pages = useMemo(() => {
    if (!filteredPlaces) return 0;
    return Math.ceil(filteredPlaces.length / 6);
  }, [filteredPlaces]);

  useEffect(() => {
    setPage(1);
  }, [pages]);
  return (
      <Layout>
            <Title order={1} mb="xl">Services</Title>
            <Group align="center" position="apart">
            <Group>
            <Select
              value={placeType}
              onChange={setPlaceType}
              mb="md"
              style={{ maxWidth: '320px' }}
              label="Choose type of places"
              placeholder="Pick one"
              data={[
                { value: 'all', label: 'All places' },
                { value: 'W', label: 'Workplace' },
                { value: 'O', label: 'Office' },
                { value: 'MR', label: 'Meeting Room' },
      ]}
            />
            <Switch
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
              label="Sort by name"
              radius="lg"
              color="dark"
            />
            </Group>
            <Group><Pagination color="dark" page={activePage} onChange={setPage} total={pages} /></Group>
            </Group>
            {placesToShow.length > 0 ?
            <Grid gutter="md" mb="md" align="stretch">
                {placesToShow.map((place, i) => (
                  <Grid.Col span={4} key={i}>
                    <Card place={place} />
                  </Grid.Col>
                ))}
            </Grid>
            : <Center>{errorMsg}</Center>}
            <Pagination color="dark" page={activePage} onChange={setPage} total={pages} />
      </Layout>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/places');
    const places = await res.json();
    return {
      props: {
        places,
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

export default Services;
