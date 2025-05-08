import axios from "axios";
import { useEffect, useState } from "react";

let countriesUrl = "https://restcountries.com/v3.1/all";

function useCountries() {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios
            .get(countriesUrl)
            .then((res) => {
                if(res.status === 200) {
                    let c = res.data.map((obj) => {
                        return {name:obj.name.common, code:obj.cca3}
                    }).sort((a, b) => a.name.localeCompare(b.name));

                    setCountries(c); 
                }
            })
            .catch((err) => {
                console.log("CATCH ERROR:", err);
                setCountries([{name:"India", code:"IND"},
                    {name:"Bangladesh", code:"BAN"},
                    {name:"Australia", code:"AUS"},
                    {name:"England", code:"ENG"},
                    {name:"Pakisthan", code:"PAK"}
                ]);
            });
    }, []);

    return countries;
}
export default useCountries;