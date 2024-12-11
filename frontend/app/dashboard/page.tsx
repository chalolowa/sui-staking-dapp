"use client"

import { Skeleton } from '@/components/ui/skeleton';
import { AuthService } from '@/utils/authService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        async function verifyAuth() {
            try {
                const jwt = localStorage.getItem('authToken');
                if (!jwt) {
                    router.push('/login');
                    return;
                }

   
                const isAuth = await AuthService.verifyAuth(jwt);

                if (!isAuth) {
                    router.push('/login');
                } else {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Authentication verification failed:', error);
                router.push('/login');
            }
        }

        verifyAuth();
    }, [router]);

    if (!isAuthenticated) {
        return <Skeleton className="w-[100px] h-[20px] rounded-full" />
        ;
    }

    return (
        <div className="p-8 text-center font-sans">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="mt-8 flex justify-center gap-8">
                <a href="/staking" className="px-4 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-700">Stake Now</a>
                <a href="/history" className="px-4 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-700">Transaction History</a>
                <a href="/stats" className="px-4 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-700">View Stats</a>
            </div>
        </div>
    );
}
