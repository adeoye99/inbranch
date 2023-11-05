import React  from 'react'

export const NavLink = ({ name  , isChecked , onChange , key , isCurrent }) => {

      
       
        return(

          <div className="flex items-center space-x-2 mb-[5%] pb-4 md:mr-[10%] border-b-2 border-[#D9D9D9] text-left">
            <input
              name = {name}
              key = {key}
              type="checkbox"
              id={`checkbox-${name}`}
              className="hidden"
              checked={isChecked}
              onChange={onChange}
              
              disabled
            />
            <label
               htmlFor={`checkbox-${name}`}
               className={`relative w-6 h-6 border rounded-full border-gray-400 transition-color duration-200 cursor-pointer 
                
                 ${isChecked ? 'border-yellow-100 bg-yellow-500' : ''}`}
                  >
              <div
                className="absolute inset-0 bg-yellow-400 rounded-full transform scale-0 transition-transform duration-200 origin-center"
                aria-hidden="true"
              ></div>
            </label>
            <span className={`text-gray-800 font-semibold text-[12px] md:text-[16px] ${isCurrent ? 'text-blue-500' : ''}`}>{name}</span>
          </div>
        )
}
