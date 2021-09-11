import React from 'react'
import img1 from '../images/mockup-phone.png'

export default function AppScreen() {
    return (
        <div>
            <h2 className="title" >Notre application</h2>
            <div className="row center">
                <div className='col-2 mock'>
                    <p className="about">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                    </p>
                    <p className="about">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                </div>
                <div className='col-2 mock'>
                    <p className="imgcenter"><img className="mockup" src={img1} alt="e"></img></p>
                </div>
            </div>
        </div>
    )
}
