import React, { useEffect, useState } from "react";
import { HashLink } from 'react-router-hash-link';
import "./SideBarSearch.scss";
// import axios from "axios";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { searchResults } from "../../../store/actions/userActions";


const SideBarSearch = ({ handleCloseSideBar }) => {
    const allProducts = useSelector((state) => state.products.products);

    const [searchData, setSearchData] = useState({
        query: "",
        results: {},
        loading: false,
        message: "",
        openSearch: false
    });

    const scrollWidthOffset = (el) => {
        const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
        const yOffset = -110;
        window.scrollTo({ top: yCoordinate + yOffset, //behavior: 'smooth' 
        });
      }

    useEffect(() => {
        let resFiltered = []
    
        resFiltered = allProducts.filter(prod =>
          prod.name.toLowerCase().includes(searchData.query.toLowerCase()));
    
        // let resFiltered = allProducts.filter(entry => Object.values(entry)
        // .some(val => typeof val === "string" && val.includes(searchData.query.toLowerCase())));
    
        // console.log(" resFiltered", resFiltered)
        setSearchData({
          ...searchData,
          results: resFiltered,
        });
    
      }, [searchData.query, allProducts]);

    // useEffect(() => {
    //     let mounted = true;
    //     axios
    //         .post(`${process.env.REACT_APP_URL_BACKEND}/products/search`, {
    //             searchParam: searchData.query,
    //         })
    //         .then((result) => {
    //             if (mounted) {
    //                 setSearchData({
    //                     ...searchData,
    //                     results: result.data,
    //                     loading: false
    //                 });
    //             }
    //         })
    //         .catch((err) =>
    //             setSearchData({ ...searchData, message: err, loading: false })
    //         );
    //     return () => (mounted = false);
    // }, [searchData.loading]);
    // // console.log(searchData);

    const dispatch = useDispatch();
    const handleSearchResults = (e) => {
        e.preventDefault();
        dispatch(searchResults(searchData.results));
    };

    return (
        <div className="sidebar-search-container">
            <form className="sidebar-search" onSubmit={handleSearchResults}>
                <input
                    className="sidebar-search-input"
                    type="text"
                    name="search"
                    placeholder="Cercare..."
                    autoComplete="off"
                    value={searchData.query}
                    onChange={(e) =>
                        setSearchData({
                            ...searchData,
                            query: e.target.value,
                            loading: true,
                        })
                    }
                ></input>
                <div className="sideba-search-icon">
                    <i className="fas fa-search" ></i>
                </div>
            </form>

            {/* SEARCH RESULTS CONTAINER */}
            {
                searchData.query !== '' &&
                <div className="sidebar-search-res-container">
                    {searchData.results.length > 0 ?
                        <div className="sidebar-search-res">
                            {searchData.results.map((items, i) =>
                                <ul key={i}>
                                    <li><HashLink to={"/" + items.category + "#" + items.ID}
                                        scroll={(el) => scrollWidthOffset(el)}
                                        onClick={() => {
                                            handleCloseSideBar();
                                            setSearchData({ ...searchData, query: "" });
                                        }}
                                    >{items.name}
                                    </HashLink>
                                    </li>
                                </ul>
                            )}
                        </div>
                        :
                        <div className="search-loading">Non trovato</div>
                    }
                </div>
            }

        </div>
    );
};

export default SideBarSearch;
