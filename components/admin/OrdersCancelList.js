import React, { Fragment, useEffect, useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
const Sidebar = dynamic(() => import('./Sidebar'));
const MemoizedSidebar = React.memo(Sidebar);

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { allOrders, deleteOrder, invoicePdf, clearErrors } from '../../redux/actions/orderActions'
import { DELETE_ORDER_RESET } from '../../redux/constants/orderConstants'
import Dialog from "../Dialog";
import { CSVLink } from 'react-csv';
import { Buffer } from 'buffer'

const OrdersCancelList = () => {

    const dispatch = useDispatch();

    const { loading, error, cancelOrders } = useSelector(state => state.allOrders, shallowEqual);
    // console.log("orders45", orders);
    const { isDeleted } = useSelector(state => state.order)


    const [list, setList] = useState({ display: "block" });
    const hide = () => {
        if (list.display === "block") {
            setList({ display: "none" })
        } else {
            setList({ display: "block" })
        }
    }

    useEffect(() => {
        if (!cancelOrders?.length > 0) {
            dispatch(allOrders());
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        // if (isDeleted) {
        //     toast.success('Order deleted successfully');
        //     navigate('/admin/orders/cancel', { replace: true });
        //     dispatch({ type: DELETE_ORDER_RESET })
        // }

    }, [dispatch, toast, error, isDeleted])

    const sidebar = useMemo(() => <MemoizedSidebar />, []);
    const [dialog, setDialog] = useState({
        message: "",
        isLoading: false,
        //Update
        nameProduct: ""
    });

    const handleDialog = useCallback((message, isLoading, nameProduct, id) => {
        setDialog({ message, isLoading, nameProduct, id });
    }, []);

    const orderInvoiceHandler = useCallback((id, order_date) => {
        dispatch(invoicePdf(id, order_date));
    }, [dispatch]);

    const deleteOrderHandler = useCallback((id, name) => {
        handleDialog('Are you sure you want to delete this order?', true, name, id);
    }, [handleDialog]);

    const areUSureDelete = useCallback((choose) => {
        if (choose) {
            dispatch(deleteOrder(dialog.id));
        }
        handleDialog('', false, '', null);
    }, [dispatch, dialog.id, handleDialog]);

    const csvData = useMemo(() => (cancelOrders ? JSON.parse(JSON.stringify(cancelOrders)) : []), [cancelOrders]);

    const setOrders = useMemo(() => {
        const data = {
            columns: [
                { label: 'Order ID', field: 'id', sort: 'asc', width: 200 },
                { label: 'Product', field: 'name', sort: 'asc', width: 150 },
                { label: 'GSTN No', field: 'gstn', sort: 'asc', width: 160 },
                { label: 'Order Date', field: 'date', sort: 'asc', width: 100 },
                { label: 'User', field: 'userName', sort: 'asc', width: 100 },
                { label: 'Cancel Date', field: 'cancel', sort: 'asc', width: 100 },
                { label: 'Price', field: 'price', sort: 'asc', width: 100 },
                { label: 'Cancel Status', field: 'status', sort: 'asc', width: 100 },
                { label: 'Actions', field: 'actions', width: 150 },
            ],
            rows: []
        };

        cancelOrders?.forEach(order => {
            if (order.paymentStatus) {
                const EID = Buffer.from(`${order.id}`, 'binary').toString('base64');
                data.rows.push({
                    id: order.order_id,
                    date: new Date(order.order_date).toLocaleDateString('en-IN'),
                    userName: order.userName,
                    name: (
                        <Link className='proda' href={`/product-details/${Buffer.from(`${order.product_id}`, 'binary').toString('base64')}?${encodeURIComponent(order.productName)}`}>
                            {`${order.productName} (Qty: ${order.quantity})`}
                        </Link>
                    ),
                    price: `₹${order.sale_price}`,
                    gstn: order.gstn,
                    cancel: order.delivered_date ? order.delivered_date.substring(0, 10) : "",
                    status: order.orderStatus.includes('Delivered')
                        ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                        : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                    actions: (
                        <Fragment>
                            <Link href={`/admin/orders/${EID}`} className="btn-success py-2 px-3 mr-2 mb-1">
                                <i className="fa fa-eye"></i>
                            </Link>
                            <button className="btn-secondary py-2 px-3" title='Invoice' onClick={() => orderInvoiceHandler(EID, order.order_date)}>
                                <i className="fa fa-print" aria-hidden="true"></i>
                            </button>
                        </Fragment>
                    ),
                });
            }
        });

        return data;
    }, [cancelOrders, orderInvoiceHandler]);
    return (
        <Fragment>
            <MetaData title={'All Orders'} />
            <div className="row">
                <div style={list} className="col-12 col-md-2">
                    {sidebar}
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className='my-4'></div>
                        <button className="mt-3 proda menuorder" onClick={hide}><i className="fa fa-bars" aria-hidden="true"></i></button>
                        <h3 style={{ display: 'inline' }} className="mt-5 ml-2 px-md-3 menuorder1 heading"><Link href={'/admin/orders'} >All Orders</Link></h3>
                        <h3 style={{ display: 'inline' }} className="mt-5 ml-2 px-md-2 menuorder"><Link href={'/admin/orders/cancel'} >Cancel Orders</Link></h3>
                        {/* <h3 style={{ display: 'inline' }} className="mt-5 ml-2 px-md-2 menuorder1 heading"><Link href={'/admin/orders/return'} >Return Orders</Link></h3> */}
                        <h3 style={{ display: 'inline' }} className="mt-5 ml-2 px-md-2 menuorder1 heading"><Link href={'/admin/orders/fail'}>Fail Orders</Link></h3>

                        <h5 style={{ display: 'inline' }} className="marginleft mr-1 mt-5 px-md-2"> <CSVLink className='menuorder' data={csvData}
                            filename={"cancel_orders.csv"} target="_blank" >Download</CSVLink></h5>
                        <br />
                        <br />

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setOrders}
                                className="px-3"
                                bordered
                                striped
                                hover scrollX
                                exportToCSV
                            />
                        )}

                    </Fragment>
                </div>
                {dialog.isLoading && (
                    <Dialog
                        //Update
                        nameProduct={dialog.nameProduct}
                        onDialog={areUSureDelete}
                        message={dialog.message}
                        id={dialog.id}
                    />
                )}
            </div>
            <ToastContainer />
        </Fragment>
    )
}

export default OrdersCancelList
