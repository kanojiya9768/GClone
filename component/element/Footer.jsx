import React from 'react'
import '@/public/style/footer.css'

const Footer = () => {
  return (
    <div className='Footer'>
      <div className='Footer_Up_Level'>
        <p>India</p>
        <div></div>
      </div>
      <div className='Footer_Down_Level'>
        <div>
            <p>About</p>
            <p>Advertising</p>
            <p>Business</p>
            <p>How Search Works</p>
        </div>
        <div>
            <p>Privacy</p>
            <p>Terms</p>
            <p>Setting</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
