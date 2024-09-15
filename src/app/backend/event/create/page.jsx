'use client'
import Navbar from "../../layouts/navbar/page";
import Footer from "../../layouts/footer/page";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const EventCreate = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault()
        setIsLoading(true)

        const user_details = localStorage.getItem('user_details');
        const created_by = JSON.parse(user_details)._id;

        const formData = new FormData();
        let title = document.getElementById("title").value;
        let status = document.getElementById("status").value;
        let description = document.getElementById("description").value;
        let meta_description = document.getElementById("meta_description").value;
        let meta_title = document.getElementById("meta_title").value;
        let keywords = document.getElementById("keywords").value;

        formData.append("image", file, file.name);
        formData.append("created_by", created_by);
        formData.append("title", title);
        formData.append("status", status);
        formData.append("description", description);
        formData.append("shortDescription", short_description);
        formData.append("metaDescription", meta_description);
        formData.append("metaTitle", meta_title);
        formData.append("keywords", keywords);

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        }

        axios.post(`${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}event/create`, formData, { headers: headers })
            .then(function (response) {
                document.getElementById("event_form").reset();
                toast.success(response.data.message);
                setIsLoading(false);
            })
            .catch(function (error) {
                let errors = error.response.data.data.errors;
                errors.forEach((element) => {
                    toast.error(element.msg);
                })
                setIsLoading(false)
            });
    }

    const handleOnChange = e => {
        setFile(e.target.files[0]);
    };

    return (
        <div>
            <Navbar />
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Create</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <a href="javascript:void(0)" onClick={() => router.push('/backend/dashboard', { scroll: false })}>
                                            Dashboard
                                        </a>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <a href="javascript:void(0)" onClick={() => router.push('/backend/event', { scroll: false })}>
                                            Event
                                        </a>
                                    </li>
                                    <li className="breadcrumb-item active">Event Create</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">

                                        <div className="card-tools">
                                            <div className="input-group input-group-sm">
                                                <div className="input-group-append">
                                                    <a href="javascript:void(0)" className="btn btn-primary" onClick={() => router.push('/backend/event', { scroll: false })}>
                                                        <i className="fas fa-arrow-left"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit} id="event_form">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Image</label>
                                                        <input type="file" accept="image/*"
                                                            onChange={(e) => handleOnChange(e)} name="image" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Title</label>
                                                        <input type="text" name="title" id="title" className="form-control" placeholder="Enter title" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Status</label>
                                                        <select className="form-control" name="status" id="status">
                                                            <option value="" hidden>Select status</option>
                                                            <option value={true}>Active</option>
                                                            <option value={false}>Inactive</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Description</label>
                                                        <textarea className="form-control" name="description" id="description" placeholder="Enter description"></textarea>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Short Description</label>
                                                        <textarea className="form-control" name="short_description"
                                                            id="short_description" placeholder="Enter short description"></textarea>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Meta Description</label>
                                                        <textarea className="form-control" name="meta_description" id="meta_description" placeholder="Enter meta description"></textarea>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Meta Title</label>
                                                        <input type="text" name="meta_title" id="meta_title" className="form-control" placeholder="Enter meta title" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Keywords</label>
                                                        <input type="text" name="keywords" id="keywords" className="form-control" placeholder="Enter keywords" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <button type="button" className="btn btn-primary mr-2">Reset</button>
                                                <button type="submit" disabled={isLoading} className="btn btn-success">
                                                    {isLoading ? 'Submitting ...' : 'Submit'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
            <Footer />
            <Toaster position="bottom-right" toastOptions={{ duration: 5000 }} />
        </div >
    )
}

export default EventCreate;