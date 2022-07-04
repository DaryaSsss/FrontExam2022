import { Header, Group, Button, Text } from '@mantine/core';
import Link from 'next/link';

function LayoutHeader() {
return (
        <Header
          height={60}
          p="xs"
          sx={(theme) => ({
            backgroundColor: theme.colors.gray[1],
          })}
        >
        <Group position="apart">
        <Group>
        <Link href="/" passHref>
               <Text
                 style={{ cursor: 'pointer', fontSize: '25px' }}
                 px="18px"
                 size="xl"
                 variant="gradient"
                 gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                 weight={700}
                 transform="uppercase"
               >Coworking Area
               </Text>
        </Link>
        </Group>
            <Group>
                <Link href="/" passHref>
                    <Button variant="subtle" color="dark" component="a" uppercase>Places</Button>
                </Link>
                <Link href="/contacts" passHref>
                    <Button variant="subtle" color="dark" component="a" uppercase>Contacts</Button>
                </Link>
                <Link href="/about" passHref>
                    <Button variant="subtle" color="dark" component="a" uppercase>About</Button>
                </Link>
            </Group>
        </Group>
        </Header>
  );
}

export default LayoutHeader;
