import React from 'react'
import SideMenu from 'react-burger-menu'

import withWidth, { LARGE } from '../../HigherOrderComponents/exercise/withWidth'
import FloatingMenuBtn from '../../../FloatingMenuBtn'

const Menu = ({ isOpen, children, pageWrapId, width, toggleMenu}) => (
  <div>
    { width === LARGE ? '' :
      <FloatingMenuBtn toggleMenu={ toggleMenu } />
    }
    <SideMenu.slide
       isOpen={ isOpen }
       pageWrapId={ pageWrapId || 'page-wrap' }
    >
      { children }
    </SideMenu.slide>
  </div>
)

export default withWidth({
  largeWidth: 992,
  mediumWidth: 768,
  resizeInterval: 166
})(Menu)
