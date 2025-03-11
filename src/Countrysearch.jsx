import { useEffect, useState } from "react";
import { TextField } from "@mui/material";

const Card = ({ flag, name }) => {
    return (
    <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: '200px',
        height: '200px',
        border: "1px solid black",
        borderRadius: '5px',
        textAlign: "center",
        
    }}>
        <img src={flag} alt={`flag of ${name}`} style={{ width: "100px", height: "100px" }}/>
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
                type="search" 
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
            return search.toLowerCase() === '' ? country : country.common.toLowerCase().includes(search);
            }).map((country) => (
            <Card key={country.common} name={country.common} flag={country.png} />
            ))}

        </div>

        </>
    );
}

export default Countries;
