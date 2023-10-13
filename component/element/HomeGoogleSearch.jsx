'use client'
import React, { useEffect, useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi';
import { BiTrendingUp } from 'react-icons/bi';
import voiceIcon from '@/public/images/icon/voiceIcon.png'
import lenseIcon from '@/public/images/icon/lenseIcon.png'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import secureLocalStorage from 'react-secure-storage';
import Link from 'next/link';


const HomeGoogleSearch = () => {
  
    let {push} = useRouter();
    let [recentSearchListing,setRecentSearchListing] = useState([])
    let [ShowRecentSearches,setShowRecentSearches] = useState(false)
    let [SearchQuery,setSearchQuery] = useState('');

    let handleChangeInput = (e) =>{
        setSearchQuery(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
       if(SearchQuery!==''){
        push(`/search?q=${SearchQuery?.split(' ').join('+')}&sca_esv=${Math.ceil(Math.random()*1287732773)}&source=hp&ei=fVAQPIA-MadeByVishal_QD4AQE&sclient=gws-wiz${Math.ceil(Math.random()*2636)}`)
        let recentSerch = Array.from(new Set(secureLocalStorage.getItem('recentSearch')))
        secureLocalStorage.setItem('recentSearch',[...recentSerch,SearchQuery])
       }else{
        toast.error('Search Field Is Mandatory!')
       }
    }


    useEffect(()=>{
      let recentSearch = secureLocalStorage.getItem('recentSearch');
      setRecentSearchListing(Array.from(new Set(recentSearch)).reverse())

      window.addEventListener('click', function(e){   
        if (document.querySelector('input').contains(e.target)){
          setShowRecentSearches(true)
        } else{
          setShowRecentSearches(false)
        }
      });
    },[])



    const SearchByVoice = () =>{
      let speech = true;

      window.SpeechRecognition = window.webkitSpeechRecognition;
 
      const Recognition = new SpeechRecognition();
      Recognition.interimResults = true;
 
      Recognition.addEventListener('result',e=>{
         const transcript = Array.from(e.results)
         .map(result => result[0])
         .map(result => result.transcript)
 
         setSearchQuery(transcript)
      })
 
      if(speech == true){
         Recognition.start();
      }else{
         Recognition.stop();
      }
    }


  return (
    <div className='Google_Home_Page_Middle_div'>
      {/* //google logo  */}
      <div className='Google_Home_Page_Logo'>
        <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="" />
      </div>

      {/* //search div  */}
      <form className='Google_Home_Page_Search_div' onSubmit={handleSubmit}>
        <HiOutlineSearch style={{color : "grey" , fontSize : "1.3rem"}} />
        <input type="text" onChange={handleChangeInput} value={SearchQuery} />
        <div>
            <Image src={voiceIcon} alt="Voice Icon" onClick={SearchByVoice} />
            <Image src={lenseIcon} alt="lense Icon" />
        </div>
        <input type="submit" onSubmit={handleSubmit} hidden />

        {
          ShowRecentSearches
          &&
          <div className='RecentSearchBoxListing'>
          <div className='RecentSearchHrLine'></div>
          <p>Recent searches</p>
          {
            recentSearchListing?.map((search,index)=>{
              return(
                <Link href={`/search?q=${search?.split(' ').join('+')}&sca_esv=${Math.ceil(Math.random()*1287732773)}&source=hp&ei=fVAQPIA-MadeByVishal_QD4AQE&sclient=gws-wiz${Math.ceil(Math.random()*2636)}`} key={index**Math.random()} className='RecentSearches'>
                  <BiTrendingUp style={{color : '#70757a',fontSize : "1.2rem"}} />
                  <p>{search}</p>
                </Link>
              )
            })
          }
        </div>
        }

      </form>

      {/* //button div  */}
      <div className='Google_Home_Page_Buttons_Below_Search'>
        <button onClick={handleSubmit}>Google Search</button>
        <button onClick={()=>push('https://www.google.com/doodles')}>I'm Feeling Lucky</button>
      </div>


      {/* //lanmguages div  */}
      <div className='Google_Home_Page_Languages_List'>
        <p>Google offered in:</p>
        <div className='Languages_List'>
            <p>हिन्दी</p>
            <p>বাংলা</p>
            <p>తెలుగు</p>
            <p>मराठी</p>
            <p>தமிழ்</p>
            <p>ગુજરાતી</p>
            <p>ಕನ್ನಡ</p>
            <p>മലയാളം</p>
            <p>ਪੰਜਾਬੀ</p>
        </div>
      </div>
    </div>
  )
}

export default HomeGoogleSearch
