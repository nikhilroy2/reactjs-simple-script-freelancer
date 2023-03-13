import React from 'react';
import Header from './Header';
import Footer from './Footer';
function Base(props) {
    return (
        <div id='base'>
            <Header></Header>
            {props.children}
            <Footer></Footer>
        </div>
    );
}

export default Base;