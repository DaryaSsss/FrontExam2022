import { Title, Grid, Center, Select } from '@mantine/core';
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
  return (
      <Layout>
            <Title order={1} mb="xl">Services</Title>
            <Select
              mb="md"
              style={{ maxWidth: '320px' }}
              label="Choose type of places"
              placeholder="Pick one"
              data={[
                { value: 'W', label: 'Workplace' },
                { value: 'O', label: 'Office' },
                { value: 'MR', label: 'Meeting Room' },
      ]}
            />
            {places ?
            <Grid>
                {places.map(place => (
                  <Grid.Col span={4}>
                  <Card place={place} />
                  </Grid.Col>
                ))}
            </Grid>
            : <Center>{errorMsg}</Center>}
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
      console.log(e);
      return {
        props: {
          errorMsg: 'Something went wrong, please reload the page',
        },
      };
  }
}

export default Services;
