import React, { useEffect, useState } from "react";

export default function App() {
    const [search, setSearch] = useState("");
    const [pictures, setPictures] = useState([]);
    const header = {
        headers: {
            Authorization:
                "563492ad6f9170000100000113e3867e17764135aacaadd72df4e2b8",
        },
    };

    const fetchPopular = async () => {
        const response = await fetch(
            "https://api.pexels.com/v1/curated",
            header
        );
        const data = await response.json();
        setPictures(data.photos);
    };

    const fetchSearch = async () => {
        const response = await fetch(
            `https://api.pexels.com/v1/search?query=${search}`,
            header
        );
        const data = await response.json();
        setPictures(data.photos);
    };

    useEffect(() => {
        if (search.length > 0) {
            fetchSearch();
        } else {
            fetchPopular();
        }
        // eslint-disable-next-line
    }, [search]);

    useEffect(() => {
        fetchPopular();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="container-all">
                <input
                    className="input-bar"
                    type="text"
                    placeholder="Search for nature, space, etc."
                    value={search}
                    onChange={(ev) => setSearch(ev.target.value)}
                />
                {pictures?.length > 0 && (
                    <div className="container-main">
                        {pictures.map((el) => (
                            <img
                                key={el.url}
                                src={el.src.medium}
                                alt={el.photographer}
                                className="image"
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className="bg"></div>
            <div className="bg bg2"></div>
            <div className="bg bg3"></div>
        </>
    );
}
