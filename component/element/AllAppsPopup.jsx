import React from "react";
import "@/public/style/allAppPopup.css";
import calendar from "@/public/images/icon/calendar.png";
import chat from "@/public/images/icon/chat.png";
import contacts from "@/public/images/icon/contacts.png";
import docs from "@/public/images/icon/docs.png";
import drive from "@/public/images/icon/drive.png";
import forms from "@/public/images/icon/forms.png";
import gmail from "@/public/images/icon/gmail.png";
import meet from "@/public/images/icon/meet.png";
import sheets from "@/public/images/icon/sheets.png";
import sites from "@/public/images/icon/sites.jpg";
import slides from "@/public/images/icon/slides.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AllAppsPopup = ({profile}) => {

    let {replace} = useRouter();

  return (
    <>
      <div className="AllAppPopup">
        <div className="googleProduct">
          <div>
            {/* <Image src={gmail} /> */}
            <img src={profile} alt="profile" style={{borderRadius : '99px'}} />
            <p>My Account</p>
          </div>
          <div onClick={()=>replace('https://mail.google.com/')}>
            <Image src={gmail} />
            <p>Gmail</p>
          </div>
          <div>
            <Image src={drive} />
            <p>Drive</p>
          </div>
          <div>
            <Image src={docs} />
            <p>Docs</p>
          </div>
          <div>
            <Image src={sheets} />
            <p>Sheets</p>
          </div>
          <div>
            <Image src={slides} />
            <p>Slides</p>
          </div>
          <div>
            <Image src={calendar} />
            <p>Calendar</p>
          </div>
          <div>
            <Image src={chat} />
            <p>Chat</p>
          </div>
          <div>
            <Image src={meet} />
            <p>Meet</p>
          </div>
          <div>
            <Image src={forms} />
            <p>Forms</p>
          </div>
          <div>
            <Image src={sites} />
            <p>Sites</p>
          </div>
          <div>
            <Image src={contacts} />
            <p>Contacts</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllAppsPopup;
