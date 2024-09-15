'use client'
import React, { useEffect, useState } from 'react'
import Navbar from "../layouts/navbar/page";
import Footer from "../layouts/footer/page";
import { useRouter } from 'next/navigation'
import { useTable } from 'react-table'
import axios from 'axios'
import Swal from 'sweetalert2';
import AxiosHeaders from "../helper/axiosHelper";
import toast, { Toaster } from 'react-hot-toast';
import Dropdown from 'react-bootstrap/Dropdown';
import Link from 'next/link';

const columns = [
    {
        Header: 'Title',
        accessor: 'title',
    },
    {
        Header: 'Description',
        accessor: 'body',
    },
    {
        Header: 'Action',
        accessor: 'action',
    }
]

const Event = () => {
    const router = useRouter();
    const [data, setData] = useState([])

    useEffect(() => {
        callData()
    }, [])

    const callData = () => {
        axios.get(`${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}event/list`)
            .then(response => {
                const fetchedData = response.data.data.events.docs.map(item => ({
                    title: item.title,
                    body: item.description,
                    action: <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Action
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Link
                                    href={{ pathname: "/backend/event/edit", query: { id: item._id } }}
                                >Edit</Link>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => deleteItem(item._id)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                }));
                setData(fetchedData)
            })
            .catch(error => {
                console.error('Error fetching data:', error)
            })
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })



    const deleteItem = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete item!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(`${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}event/delete/${id}`, { headers: AxiosHeaders.axiosGetHeader })
                    .then(function (response) {
                        toast.success(response.data.message);
                        callData()
                    })
                    .catch(function (error) {
                        toast.error(error.response.data.error);
                    });
            }
        });
    }

    return (
        <div>
            <Navbar />
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Event</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <a href="javascript:void(0)" onClick={() => router.push('/backend/dashboard', { scroll: false })}>
                                            Dashboard
                                        </a>
                                    </li>
                                    <li className="breadcrumb-item active">Event</li>
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
                                                    <a href="javascript:void(0)" className="btn btn-success" onClick={() => router.push('/backend/event/create', { scroll: false })}>
                                                        <i className="fas fa-plus"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <table {...getTableProps()} style={{ border: 'solid 1px blue' }} className='table table-bordered text-center'>
                                            <thead>
                                                {headerGroups.map(headerGroup => (
                                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                                        {headerGroup.headers.map(column => (
                                                            <th
                                                                {...column.getHeaderProps()}
                                                                style={{
                                                                    borderBottom: 'solid 3px red',
                                                                    background: 'aliceblue',
                                                                    color: 'black',
                                                                    fontWeight: 'bold',
                                                                }}
                                                            >
                                                                {column.render('Header')}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </thead>
                                            <tbody {...getTableBodyProps()}>
                                                {rows.map(row => {
                                                    prepareRow(row)
                                                    return (
                                                        <tr {...row.getRowProps()}>
                                                            {row.cells.map(cell => (
                                                                <td
                                                                    {...cell.getCellProps()}
                                                                    style={{
                                                                        padding: '10px',
                                                                        border: 'solid 1px gray',
                                                                        background: 'papayawhip',
                                                                    }}
                                                                >
                                                                    {cell.render('Cell')}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
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

export default Event;
