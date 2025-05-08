import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCountries from "./hooks/useCountries";
import { useNavigate } from "react-router-dom";

let apiUrl = "https://dream-destinations-reactjs.onrender.com/destinations";

function Update() {
    let {update_id} = useParams();

    const countries = useCountries();
    const nav = useNavigate();

    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    const [place, setPlace] = useState("");
    const [country, setCountry] = useState("");
    const [travelType, setTravelType] = useState("");
    const [activities, setActivities] = useState([]);
    const [description, setDescription] = useState("");
    const [pic, setPic] = useState(null);


    const [placeError, setPlaceError] = useState("");
    const [travelTypeError, setTravelTypeError] = useState("");
    const [activitiesError, setActivitiesError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [picError, setPicError] = useState("");

    useEffect(() => {
        axios
            .get(`${apiUrl}/${update_id}`)
            .then((res) => {
                if(res.status === 200) {
                    setPlace(res.data.place);
                    setCountry(res.data.country);
                    setTravelType(res.data.travel_type);
                    setActivities(res.data.activities);
                    setDescription(res.data.description);
                    setPic(res.data.picture);
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

            document.title = "Update";
    }, []);

    //activitiesHandler
    const activitiesHandler = (e) => {
        if(e.target.checked) {
            setActivities([...activities, e.target.value]);
        }
        else {
            setActivities(activities.filter((val)=>val !== e.target.value));
        }
    }

    //picHandler
    const picHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = function() {
            setPic(reader.result);
        } 
        
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    //Submit
    function createFormHandler(e) {
        e.preventDefault();

        setPlaceError("");
        setTravelTypeError("");
        setActivitiesError("");
        setDescriptionError("");
        setPicError("");
        
        if(place.trim() === "") {
            setPlaceError(`Please enter a place`);
            return;
        }
        if(travelType.trim() === "") {
            setTravelTypeError(`Please select a travel type`);
            return;
        }
        if(activities.length === 0){
            setActivitiesError("Please select atleast one activity");
            return;
        }
        if(description === "") {
            setDescriptionError("Please enter some description");
            return;
        }
        if(pic === null) {
            setPicError("Please select an Image");
            return;
        }

        const newDestination = {
            place: place,
            country: country,
            travel_type: travelType,
            activities: activities,
            description: description,
            picture: pic || image
        }

        axios
            .put(apiUrl+"/"+update_id, newDestination)
            .then((res) => {
                if(res.status === 200) {
                    alert("Updated Successfully");

                    setPlace("");
                    setCountry("");
                    setTravelType("");
                    setActivities([]);
                    setDescription("");
                    setPic(null);
                }
                nav("/");
            })
            .catch((err) => {
                console.log("CATCH ERROR:", err);
            });
    }

    if(loading) {
        return <p className="text-center pt-5">Loading...</p>
    }
    else if(err) {
        return <p className="red text-center pt-5">{err}</p>
    }

    return (<>
        <div className="container py-3">
            <div className="list text-center">
                <h3 className="headline d-inline-block">Create Destination</h3>
            </div>
            <div>
                <p><span className="red">*</span> marked are mandatory!</p>
            </div>

            <form onSubmit={createFormHandler}>
                <div className="row">
                    <div className="col-sm-6 col-md-4">
                        <div className="my-3">
                            <label htmlFor="place" className="form-label create_form_label">Place <span className="red">*</span>:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="place" 
                                placeholder="Enter Place" 
                                name="place"
                                value={place}
                                onChange={(e)=>setPlace(e.target.value)} required />
                                <p className="red err">{placeError}</p>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4">
                        <div className="my-3">
                            <label htmlFor="country" className="form-label create_form_label">Country <span className="red">*</span>:</label>
                            <select className="form-select" id="country" 
                                name="country"
                                onChange={(e)=>setCountry(e.target.value)}
                                value={country} required>
                                <option value="" disabled>--- Select ---</option>
                                {countries.map((country) => {
                                    return <option key={country.code} value={country.name}>{country.name}</option>;
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4">
                        <div className="my-3">
                            <label className="form-label create_form_label">Travel Type <span className="red">*</span>:</label> 
                            <div className="d-flex justify-content-between">
                                <div className="form-check">
                                    <input type="radio" className="form-check-input" id="solo" 
                                        name="travel_type" 
                                        value="solo"
                                        checked={travelType === "solo"}
                                        onChange={(e)=>setTravelType(e.target.value)} />
                                    <label className="form-check-label" htmlFor="solo">Solo</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" className="form-check-input" id="family" 
                                        name="travel_type" 
                                        value="family"
                                        checked={travelType === "family"}
                                        onChange={(e)=>setTravelType(e.target.value)} />
                                    <label className="form-check-label" htmlFor="family">Family</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" className="form-check-input" id="friends" 
                                    name="travel_type" 
                                    value="friends"
                                    checked={travelType === "friends"}
                                    onChange={(e)=>setTravelType(e.target.value)} />
                                    <label htmlFor="friends" className="form-check-label">Friends</label>
                                </div>
                            </div>
                            <p className="red err">{travelTypeError}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="my-3">
                            <label className="form-label create_form_label">Activities <span className="red">*</span>:</label>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="trekking" 
                                    name="activities" 
                                    value="trekking"
                                    checked={activities.includes("trekking")}
                                    onChange={activitiesHandler} />
                                <label className="form-check-label" htmlFor="trekking">Trekking</label>
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="museum_tour" 
                                    name="activities"
                                    value="museum_tour"
                                    checked={activities.includes("museum_tour")}
                                    onChange={activitiesHandler} />
                                <label className="form-check-label" htmlFor="museum_tour">Museum Tour</label>
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="boating" 
                                name="activities" 
                                value="boating"
                                checked={activities.includes("boating")}
                                onChange={activitiesHandler} />
                                <label className="form-check-label" htmlFor="boating">Boating</label>
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="skydiving" 
                                name="activities" 
                                value="skydiving"
                                checked={activities.includes("skydiving")}
                                onChange={activitiesHandler} />
                                <label className="form-check-label" htmlFor="skydiving">Sky Diving</label>
                            </div>
                            <p className="red err">{activitiesError}</p>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="my-3">
                            <label className="form-label create_form_label" htmlFor="description">Description <span className="red">*</span>:</label>
                            <textarea className="form-control" id="description" 
                                name="description"
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)} ></textarea>
                            <p className="red err">{descriptionError}</p>
                        </div>
                    </div>

                    <div className="col-8 col-sm-6 col-md-3">
                        <div className="my-3">
                            <label className="form-label create_form_label" htmlFor="picture">Picture <span className="red">*</span>:</label><br />
                            <input type="file" accept="image/*" onChange={picHandler} /><br />
                        </div>
                        <p className="red err">{picError}</p>
                    </div>
                    <div className="col-4 col-md-1 my-3">
                        {pic && <img src={pic} alt="picture" style={{width:"100%", height:"80px", objectFit:"cover"}} />}
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="offset-sm-10 col-sm-2 text-end">
                        <input type="submit" value="+ Update" className="btn btn-primary" style={{backgroundColor:"var(--header)"}} />
                    </div>
                </div> 
            </form>
        </div>
    </>);
}

export default Update;