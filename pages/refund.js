import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import { Fragment } from "react";

// Dynamically import the Refund component
const Refund = dynamic(() => import("../components/refund"), { ssr: false });

const Index = () => {
    return (
        <Fragment>
            <Seo pageTitle="Refund Policy" />
            <Refund />
        </Fragment>
    );
};

export default Index;
