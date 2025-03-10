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
            <img src={flag} alt={`flag of ${name}`} style={{ width: "100px", height: "100px" }} />
            <h2>{name}</h2>
        </div>
    );
};

function Countries() {
    const API = "https://xcountries-backend.azurewebsites.net/all";
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch(API)
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched Countries Data:", data);
                setCountries(data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    // Filter countries based on search input
    const filteredCountries = countries.filter(({ name }) => 
        search.trim() === "" || name.toLowerCase().includes(search.toLowerCase())
    );

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
                {filteredCountries.length > 0 ? (
                    filteredCountries.map(({ name, flag, abbr }) => (
                        <Card key={abbr} name={name} flag={flag} />
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </>
    );
}

export default Countries;
