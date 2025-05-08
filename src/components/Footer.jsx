function Footer() {
    const cssObj = {
        height:"8vh",
        backgroundColor:"var(--footer)"
    }
    return (<>
        <footer className="d-flex justify-content-center align-items-center" style={cssObj}>
            <div className="container">
                <p className="m-0 text-center text-white">&copy; 2025 Dream Destinations. All rights reserved.</p>
            </div>
        </footer>
    </>);
}

export default Footer;