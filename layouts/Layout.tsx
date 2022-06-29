import { AppShell, Footer } from '@mantine/core';
import { ReactNode } from 'react';
import LayoutHeader from '../components/layout/LayoutHeader';

interface ILayout {
    children: ReactNode
}

function Layout({ children }: ILayout) {
  return (
    <AppShell
      padding="md"
      fixed
      header={
      <LayoutHeader />}
      footer={<Footer height="auto">Footer</Footer>}
    >
        {children}
    </AppShell>
  );
}
export default Layout;
