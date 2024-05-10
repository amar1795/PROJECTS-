"use client";
import { ReactNode } from 'react';
import Head from 'next/head';
import NotFound from './page';
type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
       
          <div>
                <title>404-not found</title>
                <h1>THIS IS NOT FOUND PAGE</h1>
                    {children}
          </div>
          
    );
};

export default Layout;