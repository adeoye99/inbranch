import React from 'react';
import { NavLink } from '../Components/NavLink';

function Sidebar({ stepCompleted, onCheckboxChange, currentStep , steps }) {

  console.log(stepCompleted)
  const handleCheckboxChange = (step, completed) => {
    console.log(completed)
    onCheckboxChange(step, completed);
  };
    
  // Calculate the progress percentage
  const totalSteps = Object.keys(stepCompleted).length;
  const completedSteps = Object.values(stepCompleted).filter((value) => value).length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  return (
    <div className='flex flex-row md:flex-col pt-[10%]'>
      {/* Your existing NavLink components */}
      {steps.map((step) => (
        <NavLink
          key={step}
          name={step}
          isChecked={stepCompleted[step]}
          onChange={(e) => handleCheckboxChange(step, e.target.checked)}
          isCurrent={currentStep === step}
        />
      ))}
      {/* Progress bar */}
      <div className='w-full'>
        <div className='relative pt-1'>
          <div className='flex mb-2 items-center justify-between'>
            <div>
              <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200'>
                {`${completedSteps}/${totalSteps}`}
              </span>
            </div>
          </div>
          <div className='flex space-x-2'>
            <div className='w-full bg-teal-200 rounded-full'>
              <div
                style={{ width: `${progressPercentage}%` }}
                className='w-0 bg-teal-500 rounded-full'
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
