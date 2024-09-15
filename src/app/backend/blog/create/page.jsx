 'use client'
import Navbar from "../../layouts/navbar/page";
import Footer from "../../layouts/footer/page";
import CustomEditor from '../../../components/Ckediter/CustomEditor';
import Select from 'react-select';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';


const EventCreate = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [currentCategory, setCurrentCategory] = useState([]);
    const [optionCategory, setOptionCategory] = useState([]);
    const [description, setDescription] = useState('');
    const [shortDescription, setShortDescription] = useState('');

    useEffect(() => {
        // Fetch categories for dropdown
        async function fetchCategories() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}category/cat-list?type=blog`);
                const data = await response.json();
                console.log(data.data.cateList, 'data....');
                const formattedCategories = data.data.cateList.map(category => ({
                    value: category._id,
                    label: category.name
                }));
                setOptionCategory(formattedCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        fetchCategories();
    }, []);

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleCategoryChange = (selectedOptions) => {
        setCurrentCategory(selectedOptions);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', title);
        formData.append('status', status);
        formData.append('categories', currentCategory.map(option => option.value));
        formData.append('description', description);
        formData.append('short_description', shortDescription);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}event/create`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                toast.success(result.message);
                router.push('/backend/blog', { scroll: false });
            } else {
                const errorResult = await response.json();
                toast.error(errorResult.error);
            }
        } catch (error) {
            toast.error('Error submitting the form');
            console.error('Submission error:', error);
        } finally {
            setIsLoading(false);
        }
    }

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
                                        <form id="event_form" onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label>Image</label>
                                                        <input type="file" accept="image/*"
                                                            onChange={handleOnChange} name="image" className="form-control" />
                                                    </div>
                                                </div>
                                                
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label>Title</label>
                                                        <input type="text" name="title" id="title" value={title}
                                                            onChange={(e) => setTitle(e.target.value)} 
                                                            className="form-control" placeholder="Enter title" />
                                                    </div>
                                                </div>
                                                
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label>Status</label>
                                                        <Select options={[
                                                            { value: true, label: 'Active' },
                                                            { value: false, label: 'Inactive' }
                                                        ]}
                                                        onChange={(option) => setStatus(option.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label>Category</label>
                                                       <Select options={optionCategory}  isMulti onChange={handleCategoryChange}  /> 
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label>Description</label>
                                                        <CustomEditor />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label>Short Description</label>
                                                        <CustomEditor />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label>Meta Description</label>
                                                        <textarea className="form-control" name="meta_description" id="meta_description" placeholder="Enter meta description"></textarea>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Meta Title</label>
                                                        <input type="text" name="meta_title" id="meta_title" className="form-control" placeholder="Enter meta title" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
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
