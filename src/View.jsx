import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function View() {
    let url = "http://localhost:3000/destinations";
    let {view_id} = useParams();

    const [destination, setDestination] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() => {
        axios
            .get(`${url}/${view_id}`)
            .then((res) => {
                if(res.status === 200) {
                    setDestination(res.data);
                }
                else {
                    setErr("Unexpected Error");
                }
                setLoading(false);
            })
            .catch((err) => {
                if(err.status === 404) {
                    setErr("Page Not Found");
                }
                else {
                    setErr("Server Error");
                }
                setLoading(false);
            });
    }, []);

    if(loading) {
        return <p className="text-center pt-5">Loading...</p>
    }
    else if(err) {
        return <p className="red text-center pt-5">{err}</p>
    }

    return (<>
        <div className="container py-3">
            <div className="list text-center">
                <h3 className="headline d-inline-block">View Destination</h3>
            </div>

            <div className="text-end mt-2">
                <Link className="btn btn-primary" to={`/`} style={{color:"white",textDecoration:"none", backgroundColor:"var(--header)"}}>Goto Home</Link>
            </div>

            <div className="single_dest mt-4">
                <div className="row">
                    <div className="col-sm-4 image">
                        <img src={destination.picture} alt="" />
                    </div>
                    <div className="col-sm-8 details">
                        <ul>
                            <li><span className="heading">Id: </span>{destination.id}</li>
                            <li><span className="heading">Place: </span>{destination.place}</li>
                            <li><span className="heading">Country: </span>{destination.country}</li>
                            <li><span className="heading">Travel Type: </span>{destination.travel_type}</li>
                            <li><span className="heading">Activities: </span>
                                {Array.isArray(destination.activities)?
                                destination.activities.map(w=>
                                    w.trim()
                                    .replace(/_/, " ")
                                    .split(" ").map(x=>x.charAt(0).toUpperCase() + x.slice(1)).join(" ")).join(", ")
                                
                                :"No Activities"}</li>
                            <li><span className="heading">Description: </span>{destination.description}</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </>);
}
export default View;