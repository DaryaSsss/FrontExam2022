import { Footer, Grid, Text } from '@mantine/core';

function LayoutFooter() {
return (
    <Footer
      height="auto"
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[1],
        paddingLeft: 'calc(var(--mantine-navbar-width, 0px) + 28px)',
        paddingRight: 'calc(var(--mantine-navbar-width, 0px) + 28px);',
        })}
    >
    <Grid gutter="xl" mt="md">
       <Grid.Col span={6}>
       <Text size="xl" mb="lg">
                A few words
       </Text>
            <Text size="md">
                Our mission is comfortable, modern and pretty places to work.
                We believe it improves quality of any kind of work.
            </Text>
       </Grid.Col>
           <Grid.Col span={6}>
          <Text size="xl" mb="lg">Our contacts</Text>
          <Text size="md">
             Email: coworking@mail.ru
          </Text>
          <Text size="md">
             Phone: +7 (920) 123-45-67
          </Text>
           </Grid.Col>
    </Grid>
    </Footer>
  );
}

export default LayoutFooter;
