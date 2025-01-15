import React from 'react'

import Hamburger from '../icons/Hamburger'

const HamburgerMenu = ({
  className,
  isOpen,
  setIsOpen,
}: {
  className?: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) => {
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <button
      className={`outline-none lg:hidden ${className}`}
      onClick={toggleMenu}
    >
      <div className={`hamburger-icon pl-5 ${isOpen ? 'open' : ''}`}>
        <Hamburger
          className="size-5 stroke-black dark:stroke-white"
          isOpen={isOpen}
        />
      </div>
    </button>
  )
}

export default HamburgerMenu
