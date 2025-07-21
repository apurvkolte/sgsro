import { FaFacebookF, FaTwitterSquare, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';

export const footMenu = [
    {
        id: 1,
        title: "Home ",
        menu: [
            {
                id: 1,
                link: "About Us",
                path: "/about-us"
            },
            {
                id: 2,
                link: "Contact Us",
                path: "/contact"
            },
            {
                id: 4,
                link: "Careers",
                path: "/"
            },
            {
                id: 5,
                link: "Affiliates",
                path: "/"
            },
        ]
    },
    {
        id: 2,
        title: "Information",
        menu: [
            {
                id: 1,
                link: "Return Policy",
                path: "/refund"
            },
            {
                id: 2,
                link: "Shipping Policy",
                path: "/policy"
            },
            {
                id: 4,
                link: "Privacy Policy",
                path: "/privacy"
            },
            {
                id: 5,
                link: "Terms & Conditions",
                path: "/terms-and-conditions"
            },
        ]
    },
    {
        id: 3,
        title: "Help",
        menu: [
            {
                id: 1,
                link: "FAQs",
                path: "/faq"
            },
            {
                id: 2,
                link: "Orders",
                path: "/orders"
            },
            {
                id: 3,
                link: "Cancel Orders",
                path: "/orders/cancel"
            },
            {
                id: 4,
                link: "Return Orders",
                path: "/orders/return"
            }
        ]
    },


];

export const footSocial = [
    {
        id: 1,
        icon: <FaFacebookF />,
        path: "https://www.facebook.com/rowaterpurifierspune/",
        bg: "facebook"
    },
    {
        id: 2,
        icon: <FaWhatsapp />,
        path: "https://wa.me/918007779657/",
        bg: "whatsapp"
    },
    {
        id: 3,
        icon: <FaInstagram />,
        path: "https://www.instagram.com/zope.vaibhav/",
        bg: "instagram"
    },
    // {
    //     id: 4,
    //     icon: <FaTwitterSquare />,
    //     path: "/",
    //     bg: "twitter"
    // },
    // {
    //     id: 5,
    //     icon: <FaLinkedinIn />,
    //     path: "/",
    //     bg: "linkedin"
    // },
];
