'use client'
import SearchHeader from "@/component/element/SearchHeader";
import React, { useEffect, useState } from "react";
import "@/public/style/SearchPage.css";
import "@/public/style/home.css";
import "@/public/style/news.css";
import { useSearchParams } from "next/navigation";
import { getNewsByQuery } from "@/apiHandling/allmethod";
import Link from "next/link";

const NewsPage = () => {

  let [news,setnews] = useState([])
  let searchParams = useSearchParams();
  let query = searchParams.get('q');


  useEffect(()=>{
    fetchNews();
  },[])

  const fetchNews = async() =>{
    try{
      let response = await getNewsByQuery(query);
      setnews(response?.articles)
    }catch(error){
      console.log(error);
    }
  }

  return (
    <>
      <SearchHeader />

      {/* //news  */}
      <div className="News_Page_Container">
       {
        news
        &&
        news?.map((data,index)=>{
          let {author,content,description,publishedAt,source,title,url,urlToImage} = data;
          return(
            <div className="News_section">
            <div className="News_Details">
              <div className="News_Company_and_name">
                <img
                  src={urlToImage}
                  alt=""
                />
                <p>{source?.name}</p>
              </div>
              <Link href={url} target="_Blank" className="News_Title">
                {title}
              </Link>
              <p className="News_Description">
                {description}
              </p>
              <p className="News_Time">3 hours ago</p>
            </div>
            <img
              src={urlToImage}
              alt=""
              className="News_Photo"
            />
          </div>
          )
        })
       }
      </div>

    </>
  );
};

export default NewsPage;
