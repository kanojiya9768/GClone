'use client'
import React, { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { RiMovieLine } from "react-icons/ri";
import { HiOutlinePhotograph } from "react-icons/hi";
import { BiNews } from "react-icons/bi";
import { FiBook } from "react-icons/fi";
import { FiMoreVertical } from "react-icons/fi";
import voiceIcon from "@/public/images/icon/voiceIcon.png";
import lenseIcon from "@/public/images/icon/lenseIcon.png";
import Image from "next/image";
import HomeHeader from "./HomeHeader";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import secureLocalStorage from "react-secure-storage";

const SearchHeader = () => {
;
    let {push} = useRouter();
    let searchParams = useSearchParams();
    let query =searchParams.get('q')

    let [newSearch,setnewSearch] = useState(false)
    let [searchQuery,setSearchQuery] = useState('')


    const handleChange = (e) =>{
        setSearchQuery(e.target.value)
        setnewSearch(true)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
       if(searchQuery!==''){
        push(`/search?q=${searchQuery?.split(' ').join('+')}&sca_esv=${Math.ceil(Math.random()*1287732773)}&source=hp&ei=fVAQPIA-MadeByVishal_QD4AQE&sclient=gws-wiz${Math.ceil(Math.random()*2636)}`)
        

        let recentSerch = Array.from(new Set(secureLocalStorage.getItem('recentSearch')))
        secureLocalStorage.setItem('recentSearch',[...recentSerch,searchQuery])
       }else{
        toast.error('Search Feild Is Required..!')
       }
    }

  return (
    <>
      <nav className="SearchPageHeader">
        <div className="SearchPageHeaderLeftSideSearchInputAndLogo">
          <Link href={'/'}>
            <img
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                alt="google_logo"
                className="SearchPageHeaderLogo"
            />
          </Link>
          {/* //search div  */}
          <form className="Google_Home_Page_Search_div" onSubmit={handleSubmit}>
            <HiOutlineSearch style={{ color: "grey", fontSize: "1.3rem" }} />
            <input type="text" value={!newSearch ? query : searchQuery} onChange={handleChange} />
            <div>
              <Image src={voiceIcon} alt="Voice Icon" />
              <Image src={lenseIcon} alt="lense Icon" />
            </div>
            <input type="submit" onSubmit={handleSubmit} hidden />
          </form>
        </div>


        <HomeHeader OnSearchPage={true} />
      </nav>




        <div className="Search_Page_All_Options_Listing_Container">
            <div className="Search_Page_All_Options_Listing">
            <Link href={`/search?q=${query?.split(' ').join('+')}&sca_esv=${Math.ceil(Math.random()*1287732773)}&source=hp&ei=fVAQPIA-MadeByVishal_QD4AQE&sclient=gws-wiz${Math.ceil(Math.random()*2636)}`} style={{cursor : "pointer"}}>
                <HiOutlineSearch className="Option_logo" />
                <p>All</p>
            </Link>
            <Link href={`/video?q=${query?.split(' ').join('+')}&sca_esv=${Math.ceil(Math.random()*1287732773)}&source=hp&ei=fVAQPIA-MadeByVishal_QD4AQE&sclient=gws-wiz${Math.ceil(Math.random()*2636)}`}>
                <RiMovieLine className="Option_logo" />
                <p>Videos</p>
            </Link>
            <Link href={`/images?q=${query?.split(' ').join('+')}&sca_esv=${Math.ceil(Math.random()*1287732773)}&source=hp&ei=fVAQPIA-MadeByVishal_QD4AQE&sclient=gws-wiz${Math.ceil(Math.random()*2636)}`}>
                <HiOutlinePhotograph className="Option_logo" />
                <p>Images</p>
            </Link>
            <Link href={`/news?q=${query?.split(' ').join('+')}&sca_esv=${Math.ceil(Math.random()*1287732773)}&source=hp&ei=fVAQPIA-MadeByVishal_QD4AQE&sclient=gws-wiz${Math.ceil(Math.random()*2636)}`}>
                <BiNews className="Option_logo" />
                <p>News</p>
            </Link>
            <Link href={`/books?q=${query?.split(' ').join('+')}&sca_esv=${Math.ceil(Math.random()*1287732773)}&source=hp&ei=fVAQPIA-MadeByVishal_QD4AQE&sclient=gws-wiz${Math.ceil(Math.random()*2636)}`}>
                <FiBook className="Option_logo" />
                <p>Books</p>
            </Link>
            <Link href={''}>
                <FiMoreVertical className="Option_logo" />
                <p>More</p>
            </Link>
            </div>
            <Link href='/'>Tools</Link>
        </div>
    </>
  );
};

export default SearchHeader;
