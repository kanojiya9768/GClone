"use client";
import React, { useEffect, useState } from "react";
import SearchHeader from "../element/SearchHeader";
import "@/public/style/SearchPage.css";
import "@/public/style/home.css";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getResultByQuery } from "@/apiHandling/allmethod";

const Search = () => {
  let {replace} = useRouter();
  let [results, setresults] = useState([]);
  let [searchInformation, setsearchInformation] = useState([]);
  let [SearchQuery, setSearchQuery] = useState("");
  let searchParams = useSearchParams();

  useEffect(() => {
    let query = searchParams.get("q");
    setSearchQuery(query);
    if (query !== null && query !== "") {
      fetchResults(query);
    }else{
      replace('/')
    }
  }, [searchParams]);

  const fetchResults = async (query) => {
    try {
      let response = await getResultByQuery(query);
      setresults(response?.items);
      setsearchInformation(response?.searchInformation)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* //search header  */}
      <SearchHeader />

      <div className="Horizontal_line"></div>

      {/* //search results  */}
      <div className="Search_ResultS_Container">
        <p className="Search_Results_Counts">
          About {searchInformation?.formattedTotalResults} results ({searchInformation?.formattedSearchTime} seconds)
        </p>
        {results &&
          results?.map((sites, index) => {
            let {title,snippet,displayLink,link} =sites;
            return (
              <Link href={link} target="_blank" className="Search_Results" key={index*Math.random()}>
                <div className="Logo_and_Name_Of_result">
                  <div className="Search_Result_logo">
                    <img
                      src="https://w7.pngwing.com/pngs/151/104/png-transparent-computer-icons-web-browser-google-chrome-globe-icon-miscellaneous-blue-apartment.png"
                      alt=""
                    />
                  </div>
                  <div className="result_Name_and_link">
                    <p>{title}</p>
                    <Link href={link}>{displayLink}</Link>
                  </div>
                </div>
                <div className="Result_title_and_description">
                  <p>{title}</p>
                  <p>
                    {snippet}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default Search;
