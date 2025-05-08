import axios from "axios";
import { useEffect, useState } from "react";
import mysrc from "./img/favicon_32x32.png"
import { Link } from "react-router-dom";

function List() {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState('');

    let url = "https://dream-destinations-reactjs.onrender.com/destinations";

    useEffect(() => {
        axios
        .get(url)
        .then((res) => {
            if(res.status === 200) {
                setDestinations(res.data);
            }
            else {
                setErr("Some Error");
                console.log("Some Error"); 
            }
            setLoading(false);
        })
        .catch((err) => {
            setErr('Server error');
            setLoading(false);
            console.log("CATCH Error:", err);
        });

        document.title = "Home";

    }, []);

    const deleteHandler = (id) => {
        if(confirm("Are you sure to delete?")){
            axios
                .delete(url+"/"+id)
                .then((res) => {
                    alert("Deleted successfully");
                    setDestinations(destinations.filter((obj)=>obj.id !== id));
                })
                .catch((err) => {
                    console.log("DELETE CATCH ERROR:", err);
                })
        }
    }

    if(loading) {
        return <p className="py-5 text-center">Loading...</p>
    }
    else if(err) {
        return <p className="text-danger py-5 text-center">{err}</p>;
    }

    return (<>
        <div className="container py-3">
            <div className="list text-center">
                <h3 className="headline d-inline-block">Destinations List</h3>
            </div>

            <div className="text-end mt-3">
                <button type="button" className="btn btn-primary" style={{backgroundColor:"var(--header)"}}>
                    <Link to={`create`} style={{color:"white",textDecoration:"none"}}>+ Create</Link>
                </button>
            </div>
            <h4 className="m-0">Total: {destinations.length}</h4>
            <div style={{height:"60vh", overflowY:"auto"}}>
                <table  className="table table-striped table-bordered mt-4">
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Place</th>
                            <th className="hide_it">Travel Type</th>
                            <th className="hide_it">Description</th>
                            <th className="hide_it">Picture</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {destinations.length > 0 ? (destinations.map((obj, index) => {
                        return (<tr key={obj.id}>
                            <td>{index+1}</td>
                            <td><span className="ellipsis d-inline-block">{obj.place}</span></td>
                            <td className="hide_it">{obj.travel_type}</td>
                            <td className="hide_it"><span className="ellipsis_desc d-inline-block">{obj.description}</span></td>
                            <td className="hide_it"><img src={obj.picture} alt="Pic" style={{width:"40px", height:"40px"}} /></td>
                            <td className="actionMd">
                                <Link to={`view/${obj.id}`} className="btn btn-info" style={{color:"white",textDecoration:"none"}}>View</Link>
                                &nbsp;
                                
                                <Link className="btn btn-warning" to={`update/${obj.id}`} style={{color:"white",textDecoration:"none"}}>Update</Link>&nbsp;

                                <button type="button" className="btn btn-danger" onClick={()=>deleteHandler(obj.id)}>
                                    Delete
                                </button>
                            </td>
                            <td className="actionMobile">
                                <Link to={`view/${obj.id}`} className="btn btn-info" style={{color:"white",textDecoration:"none"}}><i className="bi bi-eye"></i></Link>
                                &nbsp;
                                
                                <Link className="btn btn-warning" to={`update/${obj.id}`} style={{color:"white",textDecoration:"none"}}><i className="bi bi-pencil"></i></Link>&nbsp;

                                <button type="button" className="btn btn-danger" onClick={()=>deleteHandler(obj.id)}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>)
                        })):(<tr>
                                <td colSpan="8" className="text-center text-muted">No data available</td>
                            </tr>)}
                        
                    </tbody>
                </table>
            </div>
        </div>
    </>);
}
export default List;