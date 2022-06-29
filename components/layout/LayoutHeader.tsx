import { Header, Group, Button } from '@mantine/core';
import Link from 'next/link';

function LayoutHeader() {
return (
        <Header height={60} p="xs">
        <Group position="apart">
            <Group>
                <Link href="/" passHref>
                    <Button variant="subtle" color="ingigo" component="a" uppercase>Services</Button>
                </Link>
                <Link href="/contacts" passHref>
                    <Button variant="subtle" color="ingigo" component="a" uppercase>Contacts</Button>
                </Link>
                <Link href="/about" passHref>
                    <Button variant="subtle" color="ingigo" component="a" uppercase>About</Button>
                </Link>
            </Group>
            <Group>
                <Link href="/signin" passHref>
                    <Button variant="subtle" color="ingigo" component="a" uppercase>Sign in</Button>
                </Link>
                <Link href="/signin" passHref>
                    <Button variant="subtle" color="ingigo" component="a" uppercase>Sign up</Button>
                </Link>
            </Group>
        </Group>
        </Header>
  );
}

export default LayoutHeader;
