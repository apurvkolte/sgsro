import React, { Fragment, useState, useEffect, useCallback, useMemo } from 'react';
import dynamic from "next/dynamic";
import { useRouter } from 'next/router';
import MetaData from '../layout/MetaData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { getContact, updateContactUs } from "../../redux/actions/userActions";
import { UPDATE_CONTACTUS_RESET } from "../../redux/constants/userConstants"
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const Sidebar = dynamic(() => import('./Sidebar'));
const MemoizedSidebar = React.memo(Sidebar);

const ContactUs = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { contact } = useSelector(state => state.contact);
    const { success, error } = useSelector(state => state.updateContact);
    const sidebar = useMemo(() => <MemoizedSidebar />, []);

    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const toggleSidebar = useCallback(() => setIsSidebarVisible(prev => !prev), []);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    useEffect(() => {
        dispatch(getContact());

        if (success) {
            toast.success("Contact Us Page Is Updated");
            dispatch({ type: UPDATE_CONTACTUS_RESET });
        }

        if (error) {
            toast.error(error);
        }
    }, [dispatch, success, error]);

    useEffect(() => {
        if (contact && contact.contact) {
            try {
                // Parse the JSON string (handling double-escaping)
                const decodedJson = JSON.parse(contact.contact.replace(/\\\"/g, '"'));
                // Assuming 'entityMap' is part of your JSON structure, adjust as necessary
                const contentState = convertFromRaw(decodedJson);
                setEditorState(EditorState.createWithContent(contentState));
            } catch (error) {
                console.error("Failed to parse JSON:", error);
            }
        }
    }, [contact]);



    const handleEditorChange = useCallback((state) => {
        setEditorState(state);
    }, []);

    const submitHandler = useCallback(() => {
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const stringifiedContent = JSON.stringify(rawContentState);

        dispatch(updateContactUs({ content: stringifiedContent }));
    }, [dispatch, editorState]);

    return (
        <Fragment>
            <MetaData title='Contact Us' />
            <div className="row">
                <div className={`col-12 col-md-${isSidebarVisible ? 2 : 0}`}>
                    {isSidebarVisible && sidebar}
                </div>

                <div className={`col-12 col-md-${isSidebarVisible ? 10 : 12}`}>
                    <Fragment>
                        <div className='wrapper1 my-4 shadow-lg'>
                            <button className="proda menuorder" onClick={toggleSidebar}><i className="fa fa-bars" aria-hidden="true"></i></button>
                            <h1 style={{ display: 'inline' }} className="ml-2 px-md-2 heading" >Contact Us</h1><br /><br />
                            <Editor
                                editorState={editorState}
                                onEditorStateChange={handleEditorChange}
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                toolbarClassName="toolbar-class"
                            />
                            <br />
                            <center>
                                <button onClick={submitHandler} type='button' className='btn btn-primary btn-lg btn-block d-flex justify-content-end'>
                                    Save
                                </button>
                            </center>
                        </div>
                    </Fragment>
                </div>
            </div>
            <ToastContainer />
        </Fragment>
    );
};

export default ContactUs;
