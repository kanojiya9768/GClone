"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { GrApps } from "react-icons/gr";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import AllAppsPopup from "./AllAppsPopup";

const HomeHeader = ({ OnSearchPage }) => {
  let [ShowProfile, setShowProfile] = useState(false);
  let [showAllAppsPopup,setShowAllAppsPopup] = useState(false)
  let [user, setuser] = useState(() => {
    let exist = secureLocalStorage.getItem("user");
    if (exist !== null) {
      return exist;
    } else {
      return null;
    }
  });
  let [profile, setprofile] = useState(null);

  useEffect(() => {
    if (user !== null) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      let response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        }
      );
      setprofile(response.data);
      secureLocalStorage.setItem("user", user);
    } catch (error) {
      toast.error("Failed To Fetch User Profile..!");
    }
  };

  const login = useGoogleLogin({
    onSuccess: (coderesponse) => setuser(coderesponse),
    onerror: () => toast.error("Login Failed..!"),
  });

  const logOut = () => {
    toast.loading("Signing You Out..! Wait");
    setTimeout(() => {
      googleLogout();
      secureLocalStorage.removeItem("user");
      setprofile(null);
      setuser(null);
      toast.dismiss();
      toast.success("Logged Out..!");
    }, 2000);
  };

  let count = 0;
  useEffect(() => {
    if (window.navigator.onLine && count === 0) {
      count = count + 1;
      toast.success("Welcome Back Champ 😁 !");
    }
  }, []);

  return (
    <>
      <div className="Home_Header">
        <div></div>
        <div className="Header_right_side">
          {OnSearchPage ? (
            <div className="All_App_logo">
              <FiSettings />
            </div>
          ) : (
            <>
              <Link href="https://gmail.com" className="">
                Gmail
              </Link>
              <Link href="https://www.google.com/imghp?hl=en&ogbl">Images</Link>
            </>
          )}
          <div className="All_App_logo" onClick={()=>{setShowProfile(false) , setShowAllAppsPopup(!showAllAppsPopup)}}>
            <GrApps />
          </div>
          {profile !== null ? (
            <div
              className="Profile_picture"
              onClick={() => {setShowAllAppsPopup(false) , setShowProfile(!ShowProfile)}}
            >
              <img src={profile?.picture} alt="" />
              {ShowProfile && (
                <div className="AfterLoginPopup">
                  <p className="Profile_email">{profile.email}</p>
                  <img
                    className="Profile_Picture"
                    src={profile?.picture}
                    alt=""
                  />
                  <p className="Profile_Name">Hi, {profile?.given_name}!</p>
                  <button onClick={logOut}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => login()} className="Login_button">
              Login
            </button>
          )}
        </div>
      </div>

      {showAllAppsPopup && <AllAppsPopup profile={profile?.picture ? profile?.picture : ''} />}
    </>
  );
};

export default HomeHeader;
