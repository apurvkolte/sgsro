import React, { Fragment, useContext, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import AccountForm from '../form/AccountForm';
import SearchBar from './SearchBar';
import { dropdownMenu } from '../../data/headerData';
import commonContext from '../../contexts/common/commonContext';
import { useDispatch, useSelector } from 'react-redux'
import { allOrders } from "../../redux/actions/orderActions";
import { signOut, useSession } from "next-auth/react";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const MemoizedLogoComponent = React.memo(() => <Link href='/'><a><img src="/images/logo.png" alt="SGSRO Logo" /></a></Link>);

const Header = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const { formUserInfo, toggleForm, toggleSearch } = useContext(commonContext);
    const { cartItems } = useSelector(state => state.cart);
    const { orders, returnOrders } = useSelector(state => state.allOrders);
    const dispatch = useDispatch();
    const cartQuantity = cartItems.length;


    const accountFormComponent = useMemo(() => <AccountForm />, []);
    const searchBarComponent = useMemo(() => <SearchBar />, []);

    const newArrivalsOrders = useMemo(() => {
        if (!orders) return [];
        return orders.filter(value => value.orderStatus === 'Processing' && value.paymentStatus === 'Success');
    }, [orders]);

    const newReturnOrders = useMemo(() => {
        if (!returnOrders) return [];
        return returnOrders.filter(value => value.orderStatus === 'Return');
    }, [returnOrders]);

    useEffect(() => {
        if (session) {
            if (session?.user?.role === "admin") {
                dispatch(allOrders());
            }
        }
    }, [session]);

    const logoutHandler = () => {
        signOut({ redirect: false }).then(() => {
            router.push("/");
        });
        toast.success('Logged out successfully.');
    };

    // const handleMobileSearch = () => {
    //     const searchContainer = document.querySelector(".search_box");
    //     // Toggle between block and none
    //     if (searchContainer.style.display === "grid") {
    //         searchContainer.style.display = "none";
    //     } else {
    //         searchContainer.style.display = "grid"; // Show the container
    //     }
    // }

    return (
        <Fragment>
            <header className='sticky-top' id="header">
                <div className="container">
                    <div className="navbar">
                        <h2 className="nav_logo">
                            <MemoizedLogoComponent />
                        </h2>
                        <nav className="nav_actions">
                            {/* WhatsApp Customer Service Section */}

                            {session?.user?.role !== 'admin' ? (
                                <div className="whatsapp_action" style={{
                                    display: 'inline-block',
                                    transition: 'all 0.3s ease',
                                    ':hover': {
                                        transform: 'scale(1.05)'
                                    }
                                }}>
                                    <Link href="https://wa.me/918007779657" passHref>
                                        <a target="_blank" rel="noopener noreferrer" className="whatsapp_link" style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            textDecoration: 'none',
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '36px',
                                                height: '36px',
                                                borderRadius: '50%',
                                                backgroundColor: '#25D366',
                                                flexShrink: 0
                                            }}>
                                                <i className="fa fa-whatsapp" style={{
                                                    color: 'white',
                                                    fontSize: '24px'
                                                }}></i>
                                            </div>
                                            <div className="whatsapp_info" style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                lineHeight: '1.3'
                                            }}>
                                                <div className="customer_service" style={{
                                                    color: '#075E54',
                                                    fontSize: '14px',
                                                    marginLeft: "12px",
                                                    fontWeight: 600
                                                }}>Got Questions?</div>
                                                <div className="whatsapp_number customer_service" style={{
                                                    color: '#128C7E',
                                                    fontSize: '16px',
                                                    fontWeight: 700,
                                                    alignItems: 'center',
                                                    gap: '6px'
                                                }}>
                                                    <i className="fa fa-phone " aria-hidden="true" style={{
                                                        fontSize: '12px'
                                                    }}></i>
                                                    +91 800 777 9657
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                </div>

                            ) : ""}

                            {/* <div className='mobilesearch'>
                                <button type="button" onClick={handleMobileSearch} style={{ color: '#0059a3', fontSize: '24px' }}>
                                    <AiOutlineSearch />
                                </button>
                            </div> */}

                            {session && session?.user?.role === 'admin' ? (
                                <div className='row'>
                                    <div className="col order_action mr-30">
                                        <Link href="/admin/orders/return">
                                            <div>
                                                <i className="fa fa-shopping-basket text-primary me-2" aria-hidden="true"></i>
                                                <span className="badge">{orders ? newReturnOrders?.length : 0}</span>
                                            </div>
                                        </Link>

                                        <div className="tooltip tp">Return Orders</div>
                                    </div>

                                    <div className="col order_action">
                                        <Link href="/admin/orders">
                                            <div>
                                                <i className="fa fa-shopping-bag text-primary me-2" aria-hidden="true"></i>
                                                <span className="badge">{orders ? newArrivalsOrders?.length : 0}</span>
                                            </div>
                                        </Link>
                                        <div className="tooltip tp">New Orders</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="cart_action">

                                    <Link href="/cart">
                                        <div>
                                            <AiOutlineShoppingCart style={{ color: '#0059a3', fontSize: '24px' }} />
                                            {cartQuantity > 0 && (
                                                <span className="badge ">{cartQuantity}</span>
                                            )}
                                        </div>
                                    </Link>
                                    <div className="tooltip">Cart</div>
                                </div>
                            )}



                            <div className="user_action">
                                <span>
                                    <AiOutlineUser style={{ color: '#0059a3', fontSize: '24px' }} />
                                </span>
                                <div className="dropdown_menu">
                                    <h4>Hello! {session ? <Link href="*"><>&nbsp;{session?.user.name}</></Link> : ""}</h4>
                                    <p>Access account and manage orders</p>
                                    {!session ? (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => toggleForm(true)}
                                            >
                                                Login / Signup
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="separator"></div><br />
                                            <ul>
                                                {dropdownMenu.map(item => {
                                                    const { id, link, path } = item;
                                                    if (Number(id) === 4) {
                                                        return (
                                                            <li key={id}>
                                                                <Link href={`${path}`} legacyBehavior>
                                                                    <a onClick={() => {
                                                                        signOut({ redirect: false }).then(() => {
                                                                            router.push("/");
                                                                        });
                                                                    }}>{link}</a>
                                                                </Link>
                                                            </li>
                                                        );
                                                    } else if (session?.user?.role === "admin" || Number(id) !== 1) {
                                                        return (
                                                            <li key={id}>
                                                                <Link href={`${path}`}><a>{link}</a></Link>
                                                            </li>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </ul>
                                        </>
                                    )}
                                </div>
                            </div>
                        </nav>

                    </div>
                </div>
                {searchBarComponent}
            </header >

            {accountFormComponent}
        </Fragment >
    );
};

export default React.memo(Header);
