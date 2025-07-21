import React, { Fragment, useState, useEffect } from "react";
import { useRouter } from 'next/router'
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import Dialog from "../Dialog";
import { updateBanner, updateBannerSideImage, clearErrors, getSiderImage, deleteBannerImage, deleteSideImage } from "../../redux/actions/productActions";
import { Buffer } from 'buffer'

const BannerImages = () => {
    const dispatch = useDispatch();

    const { success, error } = useSelector((state) => state.sideImage);
    const { sideImages } = useSelector((state) => state.allSideImage);
    const { siderImages } = useSelector((state) => state.allSiderImage);

    const [fileSider1, setFileSider1] = useState();
    const [avatarPreview1, setAvatarPreview1] = useState('/images/default_banner.jpg')

    const [fileSider2, setFileSider2] = useState();
    const [avatarPreview2, setAvatarPreview2] = useState('/images/default_banner.jpg')

    const [fileSider3, setFileSider3] = useState();
    const [avatarPreview3, setAvatarPreview3] = useState('/images/default_banner.jpg')

    const [fileSider4, setFileSider4] = useState();
    const [avatarPreview4, setAvatarPreview4] = useState('/images/default_banner.jpg')

    const [fileSider5, setFileSider5] = useState();
    const [avatarPreview5, setAvatarPreview5] = useState('/images/default_banner.jpg')

    const [fileSider6, setFileSider6] = useState();
    const [avatarPreview6, setAvatarPreview6] = useState('/images/default_banner.jpg')

    const [fileSider7, setFileSider7] = useState();
    const [avatarPreview7, setAvatarPreview7] = useState('/images/default_banner.jpg')




    useEffect(() => {
        dispatch(getSiderImage())

        if (siderImages) {
            if (siderImages[0]) {
                if (siderImages[0].id) {
                    // setFileSideImage1(sideImages[0].url)
                    setAvatarPreview1(siderImages[0].url ? siderImages[0].url : "/images/default_banner.jpg")
                }
            }
            if (siderImages[1]) {
                if (siderImages[1].id) {
                    // setFileSideImage2(sideImages[1].url)
                    setAvatarPreview2(siderImages[1].url ? siderImages[1].url : "/images/default_banner.jpg")
                }
            }
            if (siderImages[2]) {
                if (siderImages[2].id) {
                    // setFileSideImage3(sideImages[2].url)
                    setAvatarPreview3(siderImages[2].url ? siderImages[2].url : "/images/default_banner.jpg")
                }
            }
            if (siderImages[3]) {
                if (siderImages[3].id) {
                    // setFileSideImage3(sideImages[2].url)
                    setAvatarPreview4(siderImages[3].url ? siderImages[3].url : "/images/default_banner.jpg")
                }
            }
            if (siderImages[4]) {
                if (siderImages[4].id) {
                    // setFileSideImage3(sideImages[2].url)
                    setAvatarPreview5(siderImages[4].url ? siderImages[4].url : "/images/default_banner.jpg")
                }
            }

            if (siderImages[5]) {
                if (siderImages[5].id) {
                    // setFileSideImage3(sideImages[2].url)
                    setAvatarPreview6(siderImages[5].url ? siderImages[5].url : "/images/default_banner.jpg")
                }
            }

            if (siderImages[6]) {
                if (siderImages[6].id) {
                    // setFileSideImage3(sideImages[2].url)
                    setAvatarPreview7(siderImages[6].url ? siderImages[6].url : "/images/default_banner.jpg")
                }
            }
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            window.location.reload();
            // router.push('/admin/banner')
            toast.success("Images Modified successfully");
        }

    }, [dispatch, toast, error, siderImages.length, success]);


    //sideer images onchnge
    const onChange1 = event => {
        if (event.target.name === 'file') {
            const file = event.target.files[0];
            setFileSider1(file);

            if (event.target.files.length === 0) {
                window.alert("Please select a image");
                return false;
            }

            if (file.type !== "image/png" && file.type !== "image/jpg" && file.type !== "image/jpeg") {
                window.alert("File does not support. You must use .png or .jpg ");
                return false;
            }
            if (file.size > 10000000) {
                window.alert("Please upload a image smaller than 10 MB");
                return false;
            }

            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview1(reader.result)
                }
            }

            reader.readAsDataURL(event.target.files[0])
        }
    }

    //sideer images onchnge
    const onChange2 = event => {
        if (event.target.name === 'file') {
            const file = event.target.files[0];
            setFileSider2(file);

            if (event.target.files.length === 0) {
                window.alert("Please select a image");
                return false;
            }

            if (file.type !== "image/png" && file.type !== "image/jpg" && file.type !== "image/jpeg") {
                window.alert("File does not support. You must use .png or .jpg ");
                return false;
            }
            if (file.size > 4000000) {
                window.alert("Please upload a image smaller than 4 MB");
                return false;
            }

            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview2(reader.result)
                }
            }

            reader.readAsDataURL(event.target.files[0])
        }
    }

    //sideer images onchnge
    const onChange3 = event => {
        if (event.target.name === 'file') {
            const file = event.target.files[0];
            setFileSider3(file);

            if (event.target.files.length === 0) {
                window.alert("Please select a image");
                return false;
            }

            if (file.type !== "image/png" && file.type !== "image/jpg" && file.type !== "image/jpeg") {
                window.alert("File does not support. You must use .png or .jpg ");
                return false;
            }
            if (file.size > 4000000) {
                window.alert("Please upload a image smaller than 4 MB");
                return false;
            }

            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview3(reader.result)
                }
            }

            reader.readAsDataURL(event.target.files[0])
        }
    }

    const onChange4 = event => {
        if (event.target.name === 'file') {
            const file = event.target.files[0];
            setFileSider4(file);

            if (event.target.files.length === 0) {
                window.alert("Please select a image");
                return false;
            }

            if (file.type !== "image/png" && file.type !== "image/jpg" && file.type !== "image/jpeg") {
                window.alert("File does not support. You must use .png or .jpg ");
                return false;
            }
            if (file.size > 4000000) {
                window.alert("Please upload a image smaller than 4 MB");
                return false;
            }

            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview4(reader.result)
                }
            }

            reader.readAsDataURL(event.target.files[0])
        }
    }

    const onChange5 = event => {
        if (event.target.name === 'file') {
            const file = event.target.files[0];
            setFileSider5(file);

            if (event.target.files.length === 0) {
                window.alert("Please select a image");
                return false;
            }

            if (file.type !== "image/png" && file.type !== "image/jpg" && file.type !== "image/jpeg") {
                window.alert("File does not support. You must use .png or .jpg ");
                return false;
            }
            if (file.size > 4000000) {
                window.alert("Please upload a image smaller than 4 MB");
                return false;
            }

            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview5(reader.result)
                }
            }

            reader.readAsDataURL(event.target.files[0])
        }
    }

    const onChange6 = event => {
        if (event.target.name === 'file') {
            const file = event.target.files[0];
            setFileSider6(file);

            if (event.target.files.length === 0) {
                window.alert("Please select a image");
                return false;
            }

            if (file.type !== "image/png" && file.type !== "image/jpg" && file.type !== "image/jpeg") {
                window.alert("File does not support. You must use .png or .jpg ");
                return false;
            }
            if (file.size > 4000000) {
                window.alert("Please upload a image smaller than 4 MB");
                return false;
            }

            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview6(reader.result)
                }
            }

            reader.readAsDataURL(event.target.files[0])
        }
    }

    const onChange7 = event => {
        if (event.target.name === 'file') {
            const file = event.target.files[0];
            setFileSider7(file);

            if (event.target.files.length === 0) {
                window.alert("Please select a image");
                return false;
            }

            if (file.type !== "image/png" && file.type !== "image/jpg" && file.type !== "image/jpeg") {
                window.alert("File does not support. You must use .png or .jpg ");
                return false;
            }
            if (file.size > 4000000) {
                window.alert("Please upload a image smaller than 4 MB");
                return false;
            }

            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview7(reader.result)
                }
            }

            reader.readAsDataURL(event.target.files[0])
        }
    }


    const addBannerHandler = (id, file) => {
        const formData = new FormData();
        formData.append(`file`, file);

        dispatch(updateBanner(Buffer.from(id.toString(), 'binary').toString('base64'), formData));
    }


    const removeSliderHandler = (id) => {
        dispatch(deleteBannerImage(Buffer.from(id.toString(), 'binary').toString('base64')))
        // handleDialog1("Are you sure you want to delete image?", true, Buffer.from(id.toString(), 'binary').toString('base64'));

    }


    const [dialog1, setDialog1] = useState({
        message: "",
        isLoading: false
    });

    const handleDialog1 = (message, isLoading, id) => {
        setDialog1({
            message,
            isLoading,
            id
        });
    };



    const [dialog, setDialog] = useState({
        message: "",
        isLoading: false
    });

    const handleDialog = (message, isLoading, id) => {
        setDialog({
            message,
            isLoading,
            id
        });
    };


    return (
        <Fragment>
            <MetaData title={"Add Slider Images"} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <Fragment>
                    <div className="col-12 col-md-10 p-3">
                        <form
                        // onSubmit={submitHandler1}
                        // enctype="multipart/form-data"
                        >
                            <h1 className="mb-2">Add Home Banner</h1>
                            <small className="banner-text">(Banner image size should be 1500px * 500px)</small>
                            <div>
                                <div className="form-row" >
                                    <div className="col-md-2 mt-3">
                                        <img
                                            src={avatarPreview1}
                                            key={avatarPreview1}
                                            alt="Images Preview"
                                            className="border"
                                            width="200"
                                            height="80"
                                        />
                                    </div>

                                    <div className="col-md-4 mt-3">
                                        <div className="form-group">
                                            <label className="custom-file-label" htmlFor="customFile">
                                                Banner 1
                                            </label>
                                            <div className="row custom-file">
                                                <input
                                                    type="file"
                                                    name="file"
                                                    className="custom-file-input"
                                                    id="customFile"
                                                    accept='image/*'
                                                    onChange={onChange1}
                                                />
                                                <button type="button" className="btn btn-primary mt-3" onClick={() => addBannerHandler(1, fileSider1)}>ADD</button>
                                                <i className="fa fa-trash btn btn-danger mt-3" onClick={() => removeSliderHandler(1)} ></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>

                            <div>
                                <div className="form-row" >
                                    <div className="col-md-2 mt-3">
                                        <img
                                            src={avatarPreview2}
                                            key={avatarPreview2}
                                            alt="Images Preview"
                                            className="border"
                                            width="200"
                                            height="80"
                                        />
                                    </div>
                                    <div className="col-md-4 mt-3">
                                        <div className="form-group">
                                            <label className="custom-file-label" htmlFor="customFile">
                                                Banner 2
                                            </label>
                                            <div className="row custom-file">
                                                <input
                                                    type="file"
                                                    name="file"
                                                    className="custom-file-input"
                                                    id="customFile"
                                                    accept='image/*'
                                                    onChange={onChange2}
                                                />
                                                <button type="button" className="btn btn-primary mt-3" onClick={() => addBannerHandler(2, fileSider2)}>ADD</button>
                                                <i className="fa fa-trash btn btn-danger mt-3 " onClick={() => removeSliderHandler(2)} ></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>

                            <div>
                                <div className="form-row" >
                                    <div className="col-md-2 mt-3">
                                        <img
                                            src={avatarPreview3}
                                            key={avatarPreview3}
                                            alt="Images Preview"
                                            className="border"
                                            width="200"
                                            height="80"
                                        />
                                    </div>

                                    <div className="col-md-4 mt-3">
                                        <div className="form-group">
                                            <label className="custom-file-label" htmlFor="customFile">
                                                Image 3
                                            </label>
                                            <div className="row custom-file">
                                                <input
                                                    type="file"
                                                    name="file"
                                                    className="custom-file-input"
                                                    id="customFile"
                                                    accept='image/*'
                                                    onChange={onChange3}
                                                />
                                                <button type="button" className="btn btn-primary mt-3" onClick={() => addBannerHandler(3, fileSider3)}>ADD</button>
                                                <i className="fa fa-trash btn btn-danger mt-3 " onClick={() => removeSliderHandler(3)} ></i>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>


                            <div>
                                <div className="form-row" >
                                    <div className="col-md-2 mt-3">
                                        <img
                                            src={avatarPreview4}
                                            key={avatarPreview4}
                                            alt="Images Preview"
                                            className="border"
                                            width="200"
                                            height="80"
                                        />
                                    </div>

                                    <div className="col-md-4 mt-3">
                                        <div className="form-group">
                                            <label className="custom-file-label" htmlFor="customFile">
                                                Banner 4
                                            </label>
                                            <div className="row custom-file">
                                                <input
                                                    type="file"
                                                    name="file"
                                                    className="custom-file-input"
                                                    id="customFile"
                                                    accept='image/*'
                                                    onChange={onChange4}
                                                />
                                                <button type="button" className="btn btn-primary mt-3" onClick={() => addBannerHandler(4, fileSider4)}>ADD</button>
                                                <i className="fa fa-trash btn btn-danger mt-3 " onClick={() => removeSliderHandler(4)} ></i>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>


                            <div>
                                <div className="form-row" >
                                    <div className="col-md-2 mt-3">
                                        <img
                                            src={avatarPreview5}
                                            key={avatarPreview5}
                                            alt="Images Preview"
                                            className="border"
                                            width="200"
                                            height="80"
                                        />
                                    </div>

                                    <div className="col-md-4 mt-3">
                                        <div className="form-group">
                                            <label className="custom-file-label" htmlFor="customFile">
                                                Banner 5
                                            </label>
                                            <div className="row custom-file">
                                                <input
                                                    type="file"
                                                    name="file"
                                                    className="custom-file-input"
                                                    id="customFile"
                                                    accept='image/*'
                                                    onChange={onChange5}
                                                />
                                                <button type="button" className="btn btn-primary mt-3" onClick={() => addBannerHandler(5, fileSider5)}>ADD</button>
                                                <i className="fa fa-trash btn btn-danger mt-3 " onClick={() => removeSliderHandler(5)} ></i>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>

                            <div>
                                <div className="form-row" >
                                    <div className="col-md-2 mt-3">
                                        <img
                                            src={avatarPreview6}
                                            key={avatarPreview6}
                                            alt="Images Preview"
                                            className="border"
                                            width="200"
                                            height="80"
                                        />
                                    </div>

                                    <div className="col-md-4 mt-3">
                                        <div className="form-group">
                                            <label className="custom-file-label" htmlFor="customFile">
                                                Banner 6
                                            </label>
                                            <div className="row custom-file">
                                                <input
                                                    type="file"
                                                    name="file"
                                                    className="custom-file-input"
                                                    id="customFile"
                                                    accept='image/*'
                                                    onChange={onChange6}
                                                />
                                                <button type="button" className="btn btn-primary mt-3" onClick={() => addBannerHandler(6, fileSider6)}>ADD</button>
                                                <i className="fa fa-trash btn btn-danger mt-3 " onClick={() => removeSliderHandler(6)} ></i>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>


                            <div>
                                <div className="form-row" >
                                    <div className="col-md-2 mt-3">
                                        <img
                                            src={avatarPreview7}
                                            key={avatarPreview7}
                                            alt="Images Preview"
                                            className="border"
                                            width="200"
                                            height="80"
                                        />
                                    </div>

                                    <div className="col-md-4 mt-3">
                                        <div className="row form-group">
                                            <label className="custom-file-label" htmlFor="customFile">
                                                Banner 7
                                            </label>
                                            <div className="row custom-file">
                                                <input
                                                    type="file"
                                                    name="file"
                                                    className="custom-file-input"
                                                    id="customFile"
                                                    accept='image/*'
                                                    onChange={onChange7}
                                                />
                                                <button type="button" className="btn btn-primary mt-3" onClick={() => addBannerHandler(7, fileSider7)}>ADD</button>
                                                <i className="fa fa-trash btn btn-danger mt-3 " onClick={() => removeSliderHandler(7)} ></i>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </form>
                    </div>


                </Fragment >
            </div >
            <ToastContainer />
        </Fragment >
    )
}

export default BannerImages