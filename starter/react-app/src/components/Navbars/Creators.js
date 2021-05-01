import React from 'react';
import LeftNavBar from '../../components/Navbars/LeftNavBar';

export default function Creators() {
    return (
    <div className='outer_container'>
        <div className='left'>
          <LeftNavBar />
        </div>
        <div className="we_the_dudes">
            <div className='each_dude'>
                <h1>Christopher Kyle</h1>
                <a href='https://github.com/ckyle6300'><i className="fab fa-github"></i></a>
            </div>
            <div className='each_dude'>
                <h1>Bergan Oudshoorn</h1>
                <a href='https://github.com/Bergan404'><i className="fab fa-github"></i></a>
            </div>
            <div className='each_dude'>
                <h1>Jairo Calderon</h1>
                <a href='https://github.com/JairoCal'><i className="fab fa-github"></i></a>
            </div>
            <div className='each_dude'>
                <h1>Mike Mihalchik</h1>
                <a href='https://github.com/mike4344'><i className="fab fa-github"></i></a>
            </div>
        </div>
    </div>
    )
}
