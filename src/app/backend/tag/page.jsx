'use client'
import Navbar from "../layouts/navbar/page";
import Footer from "../layouts/footer/page";
import { useRouter } from 'next/navigation'
const Tag = () => {
    const router = useRouter();
    return (
        <div>
            <Navbar />
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Tag</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <a href="javascript:void(0)" onClick={() => router.push('/backend/dashboard', { scroll: false })}>
                                            Dashboard
                                        </a>
                                    </li>
                                    <li className="breadcrumb-item active">Tag</li>
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
                                                <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />

                                                <div className="input-group-append">
                                                    <a href="javascript:void(0)" className="btn btn-success" onClick={() => router.push('/backend/tag/create', { scroll: false })}>
                                                        <i className="fas fa-plus"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <table className="table table-bordered text-center">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Tag 1</td>
                                                    <td>
                                                        <button className="btn btn-success btn-sm">
                                                            <i className="fa fa-check" aria-hidden="true"></i>
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-warning btn-sm mr-2">
                                                            <i className="fa fa-edit" aria-hidden="true"></i>
                                                        </button>
                                                        <button className="btn btn-danger btn-sm">
                                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Tag 2</td>
                                                    <td>
                                                        <button className="btn btn-danger btn-sm">
                                                            <i className="fa fa-ban" aria-hidden="true"></i>
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-warning btn-sm mr-2">
                                                            <i className="fa fa-edit" aria-hidden="true"></i>
                                                        </button>
                                                        <button className="btn btn-danger btn-sm">
                                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Tag 3</td>
                                                    <td>
                                                        <button className="btn btn-success btn-sm">
                                                            <i className="fa fa-check" aria-hidden="true"></i>
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-warning btn-sm mr-2">
                                                            <i className="fa fa-edit" aria-hidden="true"></i>
                                                        </button>
                                                        <button className="btn btn-danger btn-sm">
                                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                                        </button>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                        <div className="card-footer clearfix">
                                            <ul className="pagination pagination-sm m-0 float-right">
                                                <li className="page-item"><a className="page-link" href="#">&laquo;</a></li>
                                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                <li className="page-item"><a className="page-link" href="#">&raquo;</a></li>
                                            </ul>
                                        </div>
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

export default Tag;