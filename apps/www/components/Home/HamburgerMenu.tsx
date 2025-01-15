import React, { useState } from 'react'

import Hamburger from '../icons/Hamburger'

const HamburgerMenu = ({ className }: { className?: string }) => {
  const [isMenuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState)
  }

  return (
    <button
      className={`bg- outline-none lg:hidden ${className}`}
      onClick={toggleMenu}
    >
      <div className={`hamburger-icon pl-5 ${isMenuOpen ? 'open' : ''}`}>
        <Hamburger
          className="size-5 stroke-black dark:stroke-white"
          isOpen={isMenuOpen}
        />
      </div>
    </button>
  )
}

export default HamburgerMenu
