"use client";
import SearchHeader from "@/component/element/SearchHeader";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "@/public/style/SearchPage.css";
import "@/public/style/home.css";
import toast from "react-hot-toast";
import { getImagesByQuery } from "@/apiHandling/allmethod";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { FiMoreVertical } from "react-icons/fi";
import { TbArrowsCross } from "react-icons/tb";
import "@/public/style/image.css";
import Link from "next/link";

const ImagePage = () => {
  const {push} = useRouter();
  let [Images, setImages] = useState([]);
  let [popupImage,setPopupImage] = useState({})
  let [showPopup,setshowPopup] = useState(false)
  let searchParams = useSearchParams();
  let query = searchParams.get("q");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      let response = await getImagesByQuery(query);
      setImages(response?.hits);
    } catch (error) {
      toast.error("Failed To Fetch Images..!");
    }
  };

  const OpenPopup = (img) =>{
    setPopupImage(img)
    setshowPopup(true)
  }

  return (
    <div>
      <SearchHeader />

      <div className="Image_page_Listing_Container">
        <div className="listing">
          {Images &&
            Images?.map((img, index) => {
              let {previewURL,largeImageURL} = img;
              return (
                <div className="Image" onClick={()=>OpenPopup(img)}>
                  <img
                    src={largeImageURL}
                    alt=""
                  />
                </div>
              );
            })}
        </div>
        {
          showPopup && popupImage?.largeImageURL
          &&
          <div className="ImagePopup">
          <div className="Image_Container">
            <div className="Image_Actions">
              {" "}
              <img
                src={popupImage?.userImageURL}
                alt=""
              />{" "}
              {/* <p>{popupImage?.}{</p> */}
            </div>
            <div className="popupIconImage">
              <GrFormPrevious style={{cursor : "pointer"}} onClick={()=>setPopupImage(Images[Math.floor(Math.random()*20)])} />
              <GrFormNext style={{cursor : "pointer"}} onClick={()=>setPopupImage(Images[Math.floor(Math.random()*20)])} />
              <FiMoreVertical style={{cursor : "pointer"}} />
              <TbArrowsCross onClick={()=>setshowPopup(false)} style={{cursor : "pointer"}} />
            </div>
          </div>
          <img
            className="Popup_Image"
            src={popupImage?.largeImageURL}
            alt=""
          />
          <div className="Popup_Image_Details">
            <div>
              <Link href="/" className="ImageTitle">
                {popupImage?.tags}
              </Link>
              <p>
                Images may be subject to copyright.{" "}
                <a href="https://support.google.com/legal/answer/3463239?hl=en">
                  {" "}
                  Learn More
                </a>{" "}
              </p>
            </div>
            <button onClick={()=>push(popupImage?.pageURL)}>Visit</button>
          </div>
        </div>
        }
      </div>
    </div>
  );
};

export default ImagePage;
