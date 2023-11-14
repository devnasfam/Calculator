import React, { useRef, useContext } from 'react';
import { AppContext, AppProvider } from './AppContext';

const Layout = () =>{
 const {value,setValue,
     equal,setEqual,
     isDark,setIsdark,
     Icon,setIcon,setIsBg} = useContext(AppContext);
 const layoutRef = useRef(null);
 const AppRef = useRef(null);
 
 const ModeSwitch = () =>{
     isDark ? (document.documentElement.classList.add("dark"),setIsdark(!isDark),setIcon("light_mode"),setIsBg(false)):(document.documentElement.classList.remove("dark"),setIsdark(!isDark),setIcon("dark_mode"), setIsBg(true));
 }
 
 const Insert = (val) =>{
   const visualToCalculation = {
    '÷': '/',
    '×': '*',
  };
  const calculationSymbol = visualToCalculation[val] || val;
  let newValue =
  value === 0 || value === "0" ? String(val) : value + String(val);

if (String(value).charAt(0) === "=") {
  newValue = String(value).slice(1) + String(val);
}
setValue(newValue);
}
 
 const Clear = () =>{
     setValue("0");
     setEqual("");
 }
 const Delete = () =>{
   const newValue = value === 0 || value === "0" || value === "" || value === "Syntax Error" ? "0" : value.slice(0,-1);
   setValue(newValue===""?0:newValue);
 }
 const Equal = () => {
  try {
    const result = new Function('return ' + value.replace(/÷/g, '/').replace(/×/g, '*').replace(/²/g, '**2').replace(/EXP/g, '*10'))();
    const decimalLength = (result.toString().split('.')[1] || '').length;
    const resultWithFixedDecimals = decimalLength > 5 ? result.toFixed(5) : result;
    setValue('=' + String(resultWithFixedDecimals));
    setEqual(String(value));
  } catch {
    setEqual(String(value));
    setValue('Syntax Error');
  }
};

const Close = () =>{
   layoutRef.current.style.transform='scale(0)'; 
   AppRef.current.style.display="flex";
}

const BackWide = () =>{
   layoutRef.current.style.transform='scale(1)'; 
}

const Wide = () =>{
   layoutRef.current.style.transform='scale(1.15)'; 
}

const Open = () =>{
    layoutRef.current.style.transform='scale(1)'; 
    AppRef.current.style.display="none";
}
    return(
     <div className="w-full max-h-[100%] grid place-items-center relative">
       {/*App Icon*/}
       <div className="w-[80px] h-[80px] rounded-2xl flex items-center justify-center hidden absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] cursor-pointer transform transition-all active:scale-90 shadow-[inset_-3px_-5px_5px_rgba(0,0,0,.1)] dark:shadow-[inset_-3px_-5px_5px_rgba(255,255,255,.1)]" onClick={Open} ref={AppRef} style={{"backgroundImage":"url(https://cdn.jim-nielsen.com/macos/128/calculator-2021-04-29.png)","backgroundSize":"cover"}}>
       </div>
       {/*Calculator Body*/}
        <div className="w-[85%] sm:w-[65%] md:max-2xl:w-[400px] overflow-hidden h-auto pb-1.5 bg-slate-200 dark:bg-slate-900 backdrop-blur-md bg-opacity-60 dark:bg-opacity-60 shadow-[inset_2px_2px_5px_rgba(0,0,0,.15)] dark:shadow-[inset_2px_4px_7px_rgba(255,255,255,.2)] rounded-[20px] p-3.5 transition-color duration-100 ease-in-out delay-0" ref={layoutRef}>
        <div className="w-full h-auto p-2 mt-2 flex items-center justify-start">
        <div className="w-5 h-5 rounded-full bg-[#fc5753] p-1 m-1 -mt-2 border border-red-800 transform transition-all active:scale-90" onClick={Close}></div>
        <div className="w-5 h-5 rounded-full bg-[#fdbc40] p-1 m-1 -mt-2 border border-yellow-600 transform transition-all active:scale-90" onClick={BackWide}></div>
        <div className="w-5 h-5 rounded-full bg-[#33c748] p-1 m-1 -mt-2 border border-green-600 transform transition-all active:scale-90" onClick={Wide}></div>
        <div className="p-2 align-self-end -mt-3 font-black text-2xl truncate dark:text-slate-200 text-slate-600 uppercase">Calculator <i className="fa fa-calculator px-1"></i></div>
        </div>
         {/*Screen*/}
         <div className="w-[97%] h-[145px] bg-[#bbd3ba] overflow-hidden dark:bg-slate-800 rounded-xl shadow-[0_5px_5px_rgba(0,0,0,.03)] dark:shadow-[0_5px_5px_rgba(255,255,255,.15)] mt-1 relative transition-color duration-100 ease-in-out delay-0 mx-auto">
         {/*Screen Nav*/}
  <div className="w-full h-auto p-2 flex">
        {/*Switch Modes*/}
     <div className="p-[8px] py-[7px] rounded-lg bg-slate-600 dark:bg-slate-100 transform transition-all active:scale-90 active:bg-opacity-50 cursor-pointer flex items-center justify-center transition-color duration-300 ease-in-out delay-0" onClick={ModeSwitch}>
  <i className="material-symbols-outlined text-slate-200 dark:text-slate-800 transition-color duration-300 ease-in-out delay-0">{Icon}</i>
          </div>
         </div>
         {/*Calculated Value*/}
         <div className={`w-full text-right text-slate-500 font-medium dark:text-slate-400 pr-3 text-[2xl] absolute bottom-[50px] text-lg px-1" ${String(value).length>=13 && value !== 'Syntax Error' ? '-mb-3' : 'mb-0'}`}>{equal}</div>
         <div className={`w-full h-[60px] absolute bottom-0 text-right font-black px-2 pr-3 text-slate-700 dark:text-slate-200 overflow-x-auto ${String(value).length >= 13 && value!=="Syntax Error" ? 'text-[25px]' : 'text-[40px]'} ${String(value).length >= 13 && value!=="Syntax Error" ? '-mb-5' : 'mb-0'} `}>
         {value}
         </div>
         </div>
         {/*Buttons*/}
         <div className="w-full h-auto p-1 mt-3 grid grid-cols-4 place-items-center gap-[7px] mt-2">
         <div className="w-full h-full bg-blue-500 shadow-[inset_2px_2px_5px_rgba(0,0,0,.15)] rounded-lg flex items-center justify-center text-xl p-3 px-4 transform transition-all active:scale-90 active:opacity-50 font-bold text-white" onClick={Clear}>AC</div>
           <div className="w-full h-full bg-slate-400 shadow-[inset_2px_2px_5px_rgba(0,0,0,.15)] rounded-lg flex items-center justify-center text-xl p-3 px-4 transform transition-all active:scale-90 active:opacity-50 font-bold text-white" onClick={()=>Insert('%')}>%</div>
           <div className="w-full h-full bg-slate-400 shadow-[inset_2px_2px_5px_rgba(0,0,0,.15)] rounded-lg flex items-center justify-center text-xl p-3 px-4 transform transition-all active:scale-90 active:opacity-50 font-bold text-white" onClick={()=>Insert('EXP')}>EXP</div>
           <div className="w-full h-full bg-red-600 shadow-[inset_2px_2px_5px_rgba(0,0,0,.15)] rounded-lg flex items-center justify-center text-xl p-3 px-4 transform transition-all active:scale-90 active:opacity-50 font-bold" onClick={Delete}><i className="fa fa-backspace text-white"></i></div>
         <div className="w-full h-full bg-slate-400 shadow-[inset_2px_2px_5px_rgba(0,0,0,.15)] rounded-lg flex items-center justify-center text-xl p-3 px-4 transform transition-all active:scale-90 active:opacity-50 font-bold text-white" onClick={()=>Insert('(')}>(</div>
         <div className="w-full h-full bg-slate-400 shadow-[inset_2px_2px_5px_rgba(0,0,0,.15)] rounded-lg flex items-center justify-center text-xl p-3 px-4 transform transition-all active:scale-90 active:opacity-50 font-bold text-white" onClick={()=>Insert(')')}>)</div>
         <div className="w-full h-full bg-slate-400 shadow-[inset_2px_2px_5px_rgba(0,0,0,.15)] rounded-lg flex items-center justify-center text-xl p-3 px-4 transform transition-all active:scale-90 active:opacity-50 font-bold text-white" onClick={()=>Insert('²')}>x²</div>
           <div className="w-full h-full bg-orange-400 shadow-[inset_2px_2px_5px_rgba(0,0,0,.15)] rounded-lg flex items-center justify-center text-xl p-3 px-4 transform transition-all active:scale-90 active:opacity-50 font-bold text-white" onClick={()=>Insert('÷')}>÷</div>
           <div className="w-full h-full bg-white shadow-[inset_2px_2px_5px_rgba(0,0,0,.15)] rounded-lg flex items-center justify-center text-xl p-3 px-4 transform transition-all active:scale-90 active:opacity-50 font-bold" onClick={()=>Insert(7)}>7</div>
           <div className="w-full h-full bg-white shadow-[inset_2px_2px_5px_rgba(0,0,0,.15)] rounded-lg flex items-center justify-center text-xl p-3 px-4 transform transition-all active:scale-90 active:opacity-50 font-bold" onClick={()=>Insert(8)}>8</div>
           <div className="w-full h-full bg-white shadow-[inset_2px_2px_5px_rgba(0,0,0,.15)] rounded-lg flex items-center justify-center text-xl p-3 px-4 transform transition-all active:scale-90 active:opacity-50 font-bold" onClick={()=>Insert(9)}>9</div>
           <div className="w-full h-full bg-orange-400 shadow-inner rounded-lg flex items-center justify-center text-xl p-3 px-4 transform transition-all active:scale-90 active:opacity-50 font-bold text-white" onClick={()=>Insert('×')}>×</div>
           <div className="w-full h-full bg-white shadow-[inset_2px_2px_5px_rgba(0,0,0,.15)] rounded-lg flex items-center justify-center text-xl p-3 px-4 transform transition-all active:scale-90 active:opacity-50 font-bold" onClick={()=>Insert(4)}>4</div>
           <div className="w-full h-full bg-white shadow-[inset_2px_2px_5px_rgba(0,0,0,.15)] rounded-lg flex items-center justify-center text-xl p-3 px-4 transform transition-all active:scale-90 active:opacity-50 font-bold" onClick={()=>Insert(5)}>5</div>
           <div className="w-full h-full bg-white shadow-[inset_2px_2px_5px_rgba(0,0,0,.15)] rounded-lg flex items-center justify-center text-xl p-3 px-4 transform transition-all active:scale-90 active:opacity-50 font-bold" onClick={()=>Insert(6)}>6</div>
           <div className="w-full h-full bg-orange-400 shadow-[inset_2px_2px_5px_rgba(0,0,0,.15)] rounded-lg flex items-center justify-center text-xl p-3 px-4 transform transition-all active:scale-90 active:opacity-50 font-bold text-white" onClick={()=>Insert('-')}>-</div>
           <div className="w-full h-full bg-white shadow-[inset_2px_2px_5px_rgba(0,0,0,.15)] rounded-lg flex items-center justify-center text-xl p-3 px-4 transform transition-all active:scale-90 active:opacity-50 font-bold" onClick={()=>Insert(1)}>1</div>
           <div className="w-full h-full bg-white shadow-[inset_2px_2px_5px_rgba(0,0,0,.15)] rounded-lg flex items-center justify-center text-xl p-3 px-4 transform transition-all active:scale-90 active:opacity-50 font-bold" onClick={()=>Insert(2)}>2</div>
           <div className="w-full h-full bg-white shadow-[inset_2px_2px_5px_rgba(0,0,0,.15)] rounded-lg flex items-center justify-center text-xl p-3 px-4 transform transition-all active:scale-90 active:opacity-50 font-bold" onClick={()=>Insert(3)}>3</div>
           <div className="w-full h-full bg-orange-400 shadow-[inset_2px_2px_5px_rgba(0,0,0,.15)] rounded-lg flex items-center justify-center text-xl p-3 px-4 transform transition-all active:scale-90 active:opacity-50 font-bold text-white" onClick={()=>Insert('+')}>+</div>
           <div className="w-full h-full bg-white shadow-[inset_2px_2px_5px_rgba(0,0,0,.15)] rounded-lg flex items-center justify-center text-xl p-3 px-4 transform transition-all active:scale-90 active:opacity-50 rowspan-2 font-bold" onClick={()=>Insert(0)}>0</div>
           <div className="w-full h-full bg-white shadow-[inset_2px_2px_5px_rgba(0,0,0,.15)] rounded-lg flex items-center justify-center text-xl p-3 px-4 transform transition-all active:scale-90 active:opacity-50 font-bold" onClick={()=>Insert('.')}>.</div>
           <div className="w-full h-full bg-[#33c748] shadow-[inset_2px_2px_5px_rgba(0,0,0,.15)] rounded-lg flex items-center justify-center text-xl p-3 px-4 transform transition-all active:scale-90 active:opacity-50 font-bold col-span-2 text-white" onClick={Equal}>=</div>
           <div className="w-full col-span-4 flex items-center justify-center text-xs text-slate-600 dark:slate-300 mt-2">@devnasfam 2023</div>
         </div>
        </div>
      </div>
    );
      }
export default Layout;
