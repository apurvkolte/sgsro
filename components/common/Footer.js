import React, { Fragment } from 'react';
import Link from 'next/link';
import { footMenu } from '../../data/footerData';
import { useSession } from 'next-auth/react';
import { FaFacebookF, FaWhatsapp, FaInstagram, FaChevronUp, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
    const { data: session } = useSession();
    const currYear = new Date().getFullYear();

    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const socialMediaLinks = [
        {
            id: 1,
            icon: <FaFacebookF />,
            path: "https://www.facebook.com/rowaterpurifierspune/",
            bg: "#1877F2",
            hover: "#166FE5"
        },
        {
            id: 2,
            icon: <FaWhatsapp />,
            path: "https://wa.me/918007779657/",
            bg: "#25D366",
            hover: "#1DA851"
        },
        {
            id: 3,
            icon: <FaInstagram />,
            path: "https://www.instagram.com/zope.vaibhav/",
            bg: "#E4405F",
            hover: "#D32D4C"
        },
    ];

    if (session?.user.role === "admin") return null;

    return (
        <Fragment>
            <footer style={{
                backgroundColor: '#023E8A',
                color: '#FFFFFF',
                padding: '3rem 0 0',
                fontFamily: '"Segoe UI", Arial, sans-serif'
            }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '2rem',
                        paddingBottom: '2rem',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                        {/* Brand Column */}
                        <div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <img
                                    src="/images/logo.png"
                                    alt="SGSRO Logo"
                                    loading="lazy"
                                    style={{
                                        height: '60px',
                                        width: 'auto',
                                        objectFit: 'contain'
                                    }}
                                />
                            </div>

                            <div style={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                lineHeight: '1.6',
                                fontSize: '0.9rem',
                                marginBottom: '1.5rem'
                            }}>
                                Looking for the best water purifier in Pune? Find top brands, dealers, installation, and service for clean, safe water in all areas.
                            </div>
                        </div>


                        {/* Menu Columns */}
                        {footMenu.map(({ id, title, menu }) => (
                            <div key={id}>
                                <h4 style={{
                                    color: '#FFFFFF',
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    marginBottom: '1.5rem',
                                    position: 'relative',
                                    paddingBottom: '0.5rem'
                                }}>
                                    <span style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        width: '40px',
                                        height: '2px',
                                        backgroundColor: '#25D366'
                                    }}></span>
                                    {title}
                                </h4>
                                <ul style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0
                                }}>
                                    {menu.map(({ id, link, path }) => (
                                        <li key={id} className='footer-menu' style={{ marginBottom: '0.75rem' }}>
                                            <Link href={path} style={{
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                textDecoration: 'none',
                                                transition: 'all 0.3s ease',
                                                fontSize: '0.9rem',
                                            }}>
                                                {link}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        ))}

                        {/* Contact Column */}
                        <div>
                            <h4 style={{
                                color: '#FFFFFF',
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                marginBottom: '1.5rem',
                                position: 'relative',
                                paddingBottom: '0.5rem'
                            }}>
                                <span style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '40px',
                                    height: '2px',
                                    backgroundColor: '#25D366'
                                }}></span>
                                Contact Us
                            </h4>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                marginBottom: '1rem'
                            }}>
                                <FaPhone style={{ color: '#25D366', fontSize: '1rem' }} />
                                <div>
                                    <a
                                        href="https://wa.me/918007779657"
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                            color: '#FFFFFF',
                                            textDecoration: 'none',
                                            display: 'block',
                                            transition: 'all 0.3s ease',
                                            ':hover': { color: '#25D366' }
                                        }}
                                    >
                                        (+91) 80077 79657
                                    </a>
                                    <a
                                        href="tel:+918007779657"
                                        style={{
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            textDecoration: 'none',
                                            fontSize: '0.85rem',
                                            transition: 'all 0.3s ease',
                                            ':hover': { color: '#25D366' }
                                        }}
                                    >
                                        Call Now
                                    </a>
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                marginBottom: '2rem'
                            }}>
                                <FaEnvelope style={{ color: '#25D366', fontSize: '1rem' }} />
                                <a
                                    href="mailto:info@sgsro.com"
                                    style={{
                                        color: '#FFFFFF',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s ease',
                                        ':hover': { color: '#25D366' }
                                    }}
                                >
                                    info@sgsro.com
                                </a>
                            </div>

                            <div style={{
                                display: 'flex',
                                gap: '1rem',
                                marginBottom: '1.5rem'
                            }}>
                                {socialMediaLinks.map((social) => (
                                    <a
                                        key={social.id}
                                        href={social.path}
                                        target="_blank"
                                        className='social-icon'
                                        rel="noopener noreferrer"
                                        style={{
                                            backgroundColor: social.bg,
                                            color: "#fff",
                                            width: "40px",
                                            height: "40px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "50%",
                                            textDecoration: "none",
                                            fontSize: "1rem",
                                            transition: 'all 0.3s ease',
                                            ':hover': {
                                                backgroundColor: social.hover,
                                                transform: 'translateY(-3px)',

                                            }
                                        }}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div style={{
                    backgroundColor: '#023E8A',
                    padding: '1.5rem 0',
                }}>
                    <div className="container">
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1rem',
                            '@media (min-width: 768px)': {
                                flexDirection: 'row'
                            }
                        }}>
                            <div style={{
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: '0.85rem',
                                textAlign: 'center'
                            }}>
                                Copyright &copy; {currYear} <a style={{ color: '#FFFFFF' }}>SGSRO</a>. All Rights Reserved.
                            </div>

                            <div style={{
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: '0.85rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem'
                            }}>
                                Design & Developed By
                                <a
                                    href="https://weblinkservices.net/"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ display: 'inline-flex' }}
                                >
                                    <img
                                        src="https://www.weblinkservices.net/assets-web/logo-main.png"
                                        alt="Weblink Services Pvt. Ltd."
                                        style={{
                                            height: '20px',
                                            width: 'auto',
                                            marginLeft: '0.5rem'
                                        }}
                                    />
                                </a>
                            </div>

                        </div>
                        <button
                            onClick={scrollTop}
                            style={{
                                backgroundColor: '#25D366',
                                color: '#FFFFFF',
                                border: 'none',
                                marginTop: "-20px",
                                width: '40px',
                                height: '40px',
                                float: "right",
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                ':hover': {
                                    backgroundColor: '#1DA851',
                                    transform: 'translateY(-3px)'
                                }
                            }}
                            aria-label="Scroll to top"
                        >
                            <FaChevronUp />
                        </button>
                    </div>
                </div>
            </footer>
        </Fragment >
    );
};

export default Footer;