"use client";
import { ReactNode } from 'react';
import Head from 'next/head';
import NotFound from './page';
type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
       <html>
        <body >
          <div>
                <title>404-not found</title>
                <h1>THIS IS NOT FOUND PAGE LAYOUT</h1>
                    {children}
          </div>
        </body>
       </html>
          
    );
};

export default Layout;