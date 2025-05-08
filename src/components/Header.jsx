import logo from "../img/logo.png";
import { Link } from "react-router-dom";

function Header() {
    const cssObj = {
        height: "10vh",
        backgroundColor: "var(--header)"
    }

    return (<>
        <header className='d-flex justify-content-center align-items-center' style={cssObj}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/">
                            <p className="d-inline-block m-0"><img src={logo} className="logo" alt="Logo" /></p>
                            <h3 className='text-white d-inline-block m-0 ms-2 align-middle'>Dream Destinations</h3>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    </>);
}
export default Header;