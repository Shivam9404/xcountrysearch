import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import './Countrysearch.css';

const Card = ({ flag, name }) => {
    return (
        <div className="countryCard">
        <img src={flag} alt={`flag of ${name}`} />
        <h2>{name}</h2>
    </div>
    );
};

function Countries() {
    const API = "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState('');
    console.log(search)

    useEffect(() => {
        fetch(API)
            .then((response) => response.json())
            .then((data) => setCountries(data))
            .catch((error) => console.error("Error fetching data: ", error));
    }, []);

    return (
        <>

            <TextField 
                id="outlined-search" 
                label="Search for countries" 
                type="text" 
                sx={{ width: "900px", mb: 2 }} 
                onChange={(e) => setSearch(e.target.value)} 
            />
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: '10px'
        }}>
            {countries
            .filter((country) => {
            return search.trim() === "" || country.common.toLowerCase().includes(search.toLowerCase());
            }).map((country) => (
            <Card key={country.common} name={country.common} flag={country.png} />
            ))}

        </div>

        </>
    );
}

export default Countries;
