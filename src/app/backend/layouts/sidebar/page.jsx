'use client'
import {useRouter} from 'next/navigation';
import Swal from 'sweetalert2';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOut, faTags, faBold, faHome, faCalendar} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import AxiosHeaders from "../../helper/axiosHelper";
import React from "react";

const Sidebar = () => {
    const router = useRouter();

    const signOut = () => {
        // Swal.fire({
        //     title: "Are you sure?",
        //     text: "You want to logout your account!",
        //     icon: "warning",
        //     showCancelButton: true,
        //     confirmButtonColor: "#3085d6",
        //     cancelButtonColor: "#d33",
        //     confirmButtonText: "Logout"
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         let headers = {
        //             'Content-Type': 'application/json'
        //         }
        //         axios.get(`${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}sign-out`, {headers: AxiosHeaders.axiosGetHeader})
        //             .then(function (response) {
        //                 toast.success(response.data.message);
        //                 localStorage.removeItem("auth_token");
        //                 router.push('/backend/login', {scroll: false});
        //             })
        //             .catch(function (error) {
        //                 toast.error(error.response.data.error);
        //             });
        //     }
        // });
    }
    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <a href="index3.html" className="brand-link text-center">
                    <span className="brand-text font-weight-light">Crypto Blog</span>
                </a>
                <div className="sidebar">
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                            data-accordion="false">
                            <li className="nav-item">
                                <a href="javascript:void(0)"
                                   onClick={() => router.push('/backend/dashboard', {scroll: false})}
                                   className="nav-link active">
                                    <FontAwesomeIcon icon={faHome}/>
                                    <p className="text-position">
                                        Dashboard
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="javascript:void(0)"
                                   onClick={() => router.push('/backend/event', {scroll: false})}
                                   className={router.pathname == "/backend/event" ? "nav-link active" : "nav-link"}>
                                    <FontAwesomeIcon icon={faCalendar}/>
                                    <p className="text-position">
                                        Events
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="javascript:void(0)"
                                   onClick={() => router.push('/backend/blog', {scroll: false})}
                                   className={router.pathname == "/backend/blog" ? "nav-link active" : "nav-link"}>
                                    <FontAwesomeIcon icon={faBold}/>
                                    <p className="text-position">
                                        Blogs
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="javascript:void(0)"
                                   onClick={() => router.push('/backend/tag', {scroll: false})}
                                   className={router.pathname == "/backend/tag" ? "nav-link active" : "nav-link"}>
                                    <FontAwesomeIcon
                                        icon={faTags}
                                    />
                                    <p className="text-position">
                                        Tag
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="javascript:void(0)"
                                   onClick={signOut}
                                   className={router.pathname == "/backend/tag" ? "nav-link active" : "nav-link"}>
                                    <FontAwesomeIcon
                                        icon={faSignOut}
                                    />
                                    <p className="text-position">
                                        Logout
                                    </p>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
            <Toaster position="bottom-right" toastOptions={{duration: 5000}}/>
        </div>
    )
}

export default Sidebar;