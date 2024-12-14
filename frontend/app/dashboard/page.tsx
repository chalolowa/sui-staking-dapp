"use client"

import { Skeleton } from '@/components/ui/skeleton';
import { AuthService } from '@/utils/authService';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';

export default function Dashboard() {
    /*const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        async function verifyAuth() {
            try {
                const jwt = localStorage.getItem('authToken');
                if (!jwt) {
                    redirect('/login');
                }

   
                const isAuth = await AuthService.verifyAuth(jwt);

                if (!isAuth) {
                    redirect('/login');
                } else {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Authentication verification failed:', error);
                redirect('/');
            }
        }

        verifyAuth();
    }, []);

    if (!isAuthenticated) {
        return <Skeleton className="w-[100px] h-[20px] rounded-full" />
        ;
    }*/

    return (
        <div>
            <Navbar />
            <Sidebar />
        </div>
    );
}
