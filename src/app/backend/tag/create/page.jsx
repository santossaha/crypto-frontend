'use client'
import Navbar from "../../layouts/navbar/page";
import Footer from "../../layouts/footer/page";
import { useRouter } from 'next/navigation'
const TagCreate = () => {
    const router = useRouter();
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
                                        <a href="javascript:void(0)" onClick={() => router.push('/backend/tag', { scroll: false })}>
                                            Tag
                                        </a>
                                    </li>
                                    <li className="breadcrumb-item active">Tag Create</li>
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
                                                    <a href="javascript:void(0)" className="btn btn-primary" onClick={() => router.push('/backend/tag', { scroll: false })}>
                                                        <i className="fas fa-arrow-left"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Title</label>
                                                        <input type="text" className="form-control" placeholder="Enter title" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Status</label>
                                                        <select className="form-control">
                                                            <option value="" hidden>Select status</option>
                                                            <option value={true}>Active</option>
                                                            <option value={false}>Inactive</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <button type="button" className="btn btn-primary mr-2">Reset</button>
                                                <button type="button" className="btn btn-success">Submit</button>
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
        </div >
    )
}

export default TagCreate;