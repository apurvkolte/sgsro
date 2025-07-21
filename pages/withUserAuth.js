import React, { Fragment, useContext, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Unauthorized from '../components/Unauthorized';
import Loading from '../components/layout/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import commonContext from '../contexts/common/commonContext';

// Higher-order component for session handling
const withUserAuth = (importComponent) => {
    const DynamicComponent = dynamic(importComponent, { ssr: false });

    const WithAuthComponent = (props) => {
        const { toggleForm } = useContext(commonContext);
        const { data: session, status } = useSession();
        const [isClient, setIsClient] = useState(false);
        const router = useRouter();
        const toastShown = useRef(false);

        useEffect(() => {
            setIsClient(true);

            // Only redirect after session is known
            if (status === 'loading') return;

            const isAuthorized = session && (session.user.role === 'admin' || session.user.role === 'user');

            if (!isAuthorized) {
                router.push('/');
            }
        }, [session, status, router]);

        useEffect(() => {
            if (status === 'loading') return;

            const isAuthorized = session && (session.user.role === 'admin' || session.user.role === 'user');

            if (!isAuthorized && !toastShown.current) {
                toastShown.current = true;
                toast.error("Login is required to proceed", { position: "bottom-center" });
                toggleForm(true);
            }
        }, [session, status, toggleForm]);

        // Show loading indicator during session loading
        if (status === 'loading') {
            return isClient && <Loading />;
        }

        const isAuthorized = session && (session.user.role === 'admin' || session.user.role === 'user');

        // Show unauthorized screen if session is invalid
        if (!isAuthorized) {
            return <Unauthorized />;
        }

        // Render the protected component
        return (
            <Fragment>
                <ToastContainer />
                {isClient && <DynamicComponent {...props} />}
            </Fragment>
        );
    };

    return WithAuthComponent;
};

export default withUserAuth;
