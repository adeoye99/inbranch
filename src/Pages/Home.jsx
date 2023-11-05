import React , { useState , useEffect , useMemo } from 'react'
import Header from '../Layout/Header'
import Sidebar from '../Layout/Sidebar'
import AccountType from './AccountType'
import Bvnform from './Bvnform'
import Basicinfo from './Basicinfo'


function Home() {
  const [stepCompleted, setStepCompleted] = useState({
    AccountType: false,
    Bvnform: false,
    BasicInfo: false,
    IdValidation: false, 
    FilesUpload : false
  });

  const steps = useMemo(() => ['AccountType', 'Bvnform', 'BasicInfo', 'IdValidation', 'FilesUpload'], []);
  const [currentStep, setCurrentStep] = useState(steps[0]);

  const handleStepChange = (step) => {
    if (stepCompleted[step]) {
      setCurrentStep(step);
    }
  };

  const handleCheckboxChange = (step, completed) => {
    // Set the current step and all previous steps as completed
    const updatedStepCompleted = { ...stepCompleted };
    const stepIndex = steps.indexOf(step);
  
    for (let i = 0; i <= stepIndex; i++) {
      updatedStepCompleted[steps[i]] = true;
    }
  
    setStepCompleted(updatedStepCompleted);
  };
  
  useEffect(() => {
    // In the useEffect, update the current step and all previous steps
    const updatedStepCompleted = {};
    const stepIndex = steps.indexOf(currentStep);
  
    for (let i = 0; i <= stepIndex; i++) {
      updatedStepCompleted[steps[i]] = true;
    }
  
    setStepCompleted(updatedStepCompleted);
  }, [currentStep ,steps]);
  

  const handleNextClick = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      setCurrentStep(nextStep);
    }
  };

  const handlePreviousClick = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      const previousStep = steps[currentIndex - 1];
      setCurrentStep(previousStep);
    }
  };


  return (
    <div className=' bg-[#EDEDED] h-auto h-screen w-[100%]'>
        <Header/>
        <div className = "grid md:grid-cols-4  h-auto md:mx-auto md:my-[2%] w-[80%] ">
            <div>
            <Sidebar onCheckboxChange={handleCheckboxChange} currentStep = {currentStep} stepCompleted={stepCompleted} steps ={steps} />
            </div>
            <div className='md:col-span-3 bg-white p-6 border-b-4 border-black rounded-md '> 
                <h1 className='font-semibold text-2xl'>IN BRANCH ONLINE ACCOUNT OPENING</h1>
          
                {(() => {
            switch (currentStep){
              case "AccountType":
                return(
                  <>
                  <AccountType 
                    handleNextClick={handleNextClick}
                  />
                 
                  </>
                ) ;
               case "Bvnform":
                return(
                  <>
                  <Bvnform 
                  handleNextClick = { handleNextClick }
                  handlePreviousClick = {handlePreviousClick}
                  />
                 
                  </>
                );
               case "BasicInfo":
                  return <Basicinfo
                  handleNextClick={handleNextClick}
                  handlePreviousClick = {handlePreviousClick}
                  />;
                case "IdValidation":
                  return <Basicinfo
                  handleNextClick={handleNextClick}
                  />;
                case "FilesUpload":
                  return <Basicinfo
                  handleNextClick={handleNextClick}
                  />;


              
             
              default:
                return <Basicinfo />;
            }
          })()}

          <div className="mt-4">
            {steps.map((step) => (
              <button
                key={step}
                onClick={() => handleStepChange(step)}
                disabled={!stepCompleted[step]}
                className={`mr-2 p-2 rounded ${
                  currentStep === step ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'
                }`}
              >
                {step}
              </button>
            ))}
          </div>
   

        
        </div>
       
           
         

       </div>
    </div>
  )
}

export default Home