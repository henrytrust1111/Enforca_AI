import React from 'react'
import { Facebook, Google, Linkedin } from '../icons/Icons'

const SocialSignup: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-8 mt-6">
      <button className="authButton">
        <Google width={20} height={20} /> <span className='mt-1'>Google</span>
      </button>
      <button className="authButton">
        <Linkedin width={20} height={20} /> <span className='mt-1'>Linkedin</span>
      </button>
    </div>
  )
}

export default SocialSignup
