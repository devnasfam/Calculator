import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import Layout from './Layout';
import './style.css';

const Calculator = () =>{
  const {isBg} = useContext(AppContext);
  const BgImage = isBg ? "https://cdn.osxdaily.com/wp-content/uploads/2020/10/macos-big-sur-wallpaper-1-scaled.jpg" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlcQFdo5OyrzLyztgd3R8ZddpZOoBSwyUCHw&usqp=CAU";
    return(
        <>
         <div className="w-screen h-screen bg-sky-50 dark:bg-gray-900 fixed top-0 overflow-scroll flex items-center justify-center transition-all duration-500 ease-in-out delay-0" style={{backgroundImage:`url(${BgImage})`,backgroundSize:"cover"}}>
           <Layout />
         </div>
        </>
    );
}

export default Calculator;
