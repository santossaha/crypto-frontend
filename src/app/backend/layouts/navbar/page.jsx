import '../../ui/plugins/fontawesome-free/css/all.min.css'
import '../../ui/plugins/icheck-bootstrap/icheck-bootstrap.min.css'
import '../../ui/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css'
import '../../ui/plugins/jqvmap/jqvmap.min.css'
import '../../ui/css/adminlte.min.css'
import '../../ui/css/custom.css'
import '../../ui/plugins/overlayScrollbars/css/OverlayScrollbars.min.css'
import Sidebar from "../sidebar/page";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
// <Sidebar />
const Navbar = ({ children }) => {
    return (
        <div>
            <div>
                <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                                <i className="fas fa-user"></i>
                            </a>
                        </li>
                    </ul>
                </nav>
                <Sidebar />
                {children}
            </div >
        </div >
    )
}

export default Navbar;