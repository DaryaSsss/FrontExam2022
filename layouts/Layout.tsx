import { AppShell } from '@mantine/core';
import { ReactNode } from 'react';
import LayoutFooter from '../components/layout/LayoutFooter';
import LayoutHeader from '../components/layout/LayoutHeader';

interface ILayout {
    children: ReactNode
}
function Layout({ children }: ILayout) {
  return (
    <AppShell
      padding="md"
      styles={() => ({
        main: {
            paddingLeft: 'calc(var(--mantine-navbar-width, 0px) + 28px)',
            paddingRight: 'calc(var(--mantine-navbar-width, 0px) + 28px)',
            minHeight: 'calc(100vh - var(--mantine-header-height, 0px))',
        },
      })}
      header={
      <LayoutHeader />}
      footer={
      <LayoutFooter />}
    >
        {children}
    </AppShell>
  );
}
export default Layout;
