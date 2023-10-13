"use client";
import SearchHeader from "@/component/element/SearchHeader";
import React, { useEffect, useState } from "react";
import "@/public/style/video.css";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { getVideosByQuery } from "@/apiHandling/allmethod";
import "@/public/style/SearchPage.css";
import "@/public/style/home.css";
import Link from "next/link";

const page = () => {
  let [videos, setvideos] = useState([]);
  let searchParams = useSearchParams();
  let query = searchParams.get("q");

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      let response = await getVideosByQuery(query);
      setvideos(response?.items);
    } catch (error) {
      toast.error("Failed To Fetch Videos..!");
    }
  };

  return (
    <>
      <SearchHeader />

      <div className="Video_page_Search_Result_Container">
        <p className="Video_Page_Search_result_Count">
          About 84,30,00,000 results (0.22 seconds)
        </p>

        {videos &&
          videos?.map((video, index) => {
            let { etag, id } = video;
            let { channelId, channelTitle, title, thumbnails,description , publishTime} = video?.snippet;
            let { high } = thumbnails;

            let baseUrlForYoutubeVideo = 'https://www.youtube.com/watch?v=';
            return (
              <Link href={baseUrlForYoutubeVideo+id?.videoId} target="_blank" className="Video_Page_Search_Result_div">
                <div className="Video_website_name">
                  <p>www.youtube.com</p> {">"}{" "}
                  <p className="Watch_Text">watch</p>
                </div>
                <p className="Video_title">
                  {title}
                </p>
                <div className="Video_Result_section">
                  {/* <iframe
                    id="ytplayer"
                    type="text/html"
                    src={`https://www.youtube.com/embed/${id}`}
                    frameborder="0"
                  ></iframe> */}
                  <img src={high?.url} alt="thumbnail" loading="lazy" />
                  <div className="Video_Section_detail">
                    <p>
                      {description}
                    </p>
                    <p>
                      <span style={{ color: "#222427" }}>YouTube</span> ·
                      {channelTitle} · {new Date(publishTime).toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default page;
