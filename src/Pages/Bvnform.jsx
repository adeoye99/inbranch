import React , { useState , useEffect } from 'react'
import axios from 'axios';
import correct from "../assets/Group 5.svg"
import Swal from "sweetalert2";
import Loader from "../Components/loading";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { orange } from "@mui/material/colors";
import  Cancel from "../assets/cancel.svg"
import ErrorIcon from "../assets/warning.svg";





const Bvnform = ({ handleNextClick , handlePreviousClick }) => {
    const [bvn, setBvn] = useState("");
    const [bvnIndividual, setBvnIndividual] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState("");
    const [idError, setIdError] = useState({});
    const [typeofaccount, setTypeofaccount] = useState(false);
   
    const [validationError, setValidationErrors] = useState({});
    const [listOfBvn, setListOfBvn] = useState([]);
    const [name, setName] = useState("");
    const [validationComplete, setValidationComplete] = useState(false);
    const [data, setData] = useState([]);
    const [signatory, setSignatory] = useState(false);
    const [director, setDirector] = useState(false);
  
    const handleSignatoryChange = (e) => {
      setSignatory(e.target.checked);
    };
    const handleDirectorChange = (e) => {
      setDirector(e.target.checked);
    };
    const accountType = sessionStorage.getItem("accountType");
  
    const token = JSON.parse(sessionStorage.getItem("token"));
  
    const signatories = sessionStorage.getItem("no.ofsignatories");
  
    const API_URL = process.env.REACT_APP_BaseApi_URL;
  
    const accountCategoryType = sessionStorage.getItem("accountCategoryType");
  
    useEffect(() => {
      try {
        const getCustomerId = async () => {
          const response = await axios.get(API_URL + "/getCostomerId", {
            headers: {
              Authorization: token,
            },
          });
  
          sessionStorage.setItem("customerid", response.data.customerID);
        };
  
        getCustomerId();
      } catch (e) {
        console.log(e);
      }
    }, []);
    useEffect(() => {
      if (!listOfBvn) {
        setIsValid(false);
      }
    }, [listOfBvn]);
  
    const validateinbranch = async () => {
      setSubmitting(true);
      if (!bvnIndividual) {
        setError("Enter bvn");
        setSubmitting(false);
        return;
      }
      const body = { BVN: bvnIndividual };
      try {
        const response = await axios.post(API_URL + "/validate_bvn", body, {
          headers: {
            Authorization: token,
          },
        });
  
        if (response.data.data.ResponseCode == "00") {
        
            var name = response?.data?.data?.FirstName + " " + response?.data?.data?.MiddleName + " " + response?.data?.data?.LastName
         
             var BVN = response?.data?.data?.BVN
            setSubmitting(false);
            setIsValid(true);
            setError("");
            setValidationErrors({});
          
            sessionStorage.setItem("res", JSON.stringify({ ...response?.data?.data }));
            setSubmitting(false);
            // go("basicInfo")
           
            
            setListOfBvn((prev) =>[
              ...prev,
              {
                
                name : name,
                number : BVN,
              }
               
            ]
        
            )
            setValidationComplete(true)
        } else {
          setError(
            "You have entered an invalid BVN. Please check and try again."
          );
          setSubmitting(false);
          setIsValid(false);
          setValidationComplete(false);
        }
      } catch (error) {
        console.log(error.response)
        setSubmitting(false);
        setError("");
        setValidationErrors({});
        setValidationErrors(error?.response?.data);
      }
    };
  
    sessionStorage.setItem("listOfBvn", JSON.stringify(listOfBvn));
    useEffect(() => {
      if (accountCategoryType === "Individual Account") {
        if (listOfBvn.length == 1) {
          setValidationComplete(true);
        } else {
          setValidationComplete(false);
        }
      }
    }, [accountCategoryType, listOfBvn]);
    useEffect(() => {
      if (accountCategoryType === "Corporate Account") {
        if (listOfBvn.length == signatories) {
          // go("basicInfo")
          // setError("No. of signatories are complete")
          setValidationComplete(true);
        } else {
          setValidationComplete(false);
        }
      }
    }, [signatories, listOfBvn , accountCategoryType]);
  
  
   
    const handleAdd = async () => {
      if (!bvn) {
        setError("Enter bvn");
        return;
      }
      if (!signatory && !director) {
        Swal.fire({
          title: "Error!",
          text: "  Select a role before you proceed",
          icon: "error",
        });
        return;
      }
      const body = { BVN: bvn };
      try {
        setSubmitting(true);
        const response = await axios.post(API_URL + "/validate_bvn", body, {
          headers: {
            Authorization: token,
          },
        });
  
       
        listOfBvn.map((item) => {
          if (item.number === bvn) {
            return;
          }
        });
  
        if (response.data.data.ResponseCode == "00") {
       
           
             setData(response.data.data)
           
             var name = response?.data?.data?.FirstName + " " + response?.data?.data?.MiddleName + " " + response?.data?.data?.LastName
            
             var BVN = response?.data?.data?.BVN
            setSubmitting(false);
            setIsValid(true);
            setError("");
            setValidationErrors({});
            
            const isExists = listOfBvn.some((obj) => obj?.name === name && obj?.number === BVN);
          
            if(isExists){
              setError("Already exists")
              setIsValid(false);
              return
            }
            if( listOfBvn.length == signatories ){
          
               setError("number of bvn already equals to the number of signatories")
               setIsValid(false);
               return 
               
             }
            setListOfBvn((prev) =>[
              ...prev,
              {
                name : name,
                number : BVN,
                signatory: signatory,
                director: director
              }
               
            ]
        
            )
            
            setBvn("")
            setSignatory(false)
            setDirector(false)
  
          // const isExists = listOfBvn.some(
          //   (obj) => obj?.name === name && obj?.number === BVN
          // );
  
          // if (isExists) {
          //   setError("Already exists");
          //   setIsValid(false);
          //   return;
          // }
         
          
  
          setBvn("");
          setSignatory(false);
          setDirector(false);
  
          sessionStorage.setItem("listofbvn", listOfBvn);
        } else {
          setError(
            "You have entered an invalid BVN. Please check and try again."
          );
          setSubmitting(false);
          setIsValid(false);
        }
      } catch (error) {
        console.log(error.response)
        setSubmitting(false);
        setError("");
        setValidationErrors({});
        setValidationErrors(error?.response?.data);
      }
    };
  
    const handleDelete = (number) => {
      setListOfBvn(
        listOfBvn.filter((item) => {
          return item.number !== number;
        })
      );
    };



    console.log(listOfBvn)
  return (
    <>
    { accountType === "Savings" || accountType === "Current" ? (
    <div className='w-[100%] md:w-[55%] grid grid-cols-1 mt-[10px]'>
        <label>Verify your Bvn </label>
        <input
            type = "text"
            className='border border-grey border-2 h-[61px] pl-4 rounded-lg focus:border-none focus:outline-yellow-500' 
            placeholder='Bank Verification Number'
            // value={bvn}
            name="bvnIndividual"
            value = { bvnIndividual.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1")}
            maxLength="11"
            onChange={(e) => setBvnIndividual(e.target?.value)}

        />
        <button
            className={ ` h-[60px] mt-[5%] rounded text-white active:ring-1 active:ring-offset-2 active:ring-yellow-500 hover:opacity-[0.85] focus:border-yellow-500 ${
              bvnIndividual.length === 11 ? "bg-[#FDB815]" : "bg-[#FDB81533]"

   }`}
       
           onClick={() => validateinbranch()}


        >
            Validate
        </button>
        <button
           className='bg-[#FDB81533] h-[60px] mt-[5%] rounded text-white active:ring-1 active:ring-offset-2 active:ring-yellow-500 hover:opacity-[0.85] focus:border-yellow-500'
       
          onClick={handleNextClick}

        >
            Next
        </button>
        <button
           className='bg-[#344248] h-[60px] mt-[5%] rounded text-white active:ring-1 active:ring-offset-2 active:ring-yellow-500 hover:opacity-[0.85] focus:border-yellow-500'
         
          onClick = {handlePreviousClick}
        >
            Back
        </button>
        {

          listOfBvn?.map((item) => {
            return(
        <div className='bg-[#E2FDD8] h-auto mt-[50px] p-6 relative'>
             <div className='pt-[5%]'>
                <div className='flex flex-row gap-4 text-bold'>
                   <img src = {correct} alt ="ve"/>
                    Verified
                </div>
                 <div className='mt-[10px]'>
                    <p className='text-[#009721] font-bold'>
                       {item.name}
                    </p>
                    <p>
                       {item.number}
                    </p>

                 </div>
                 <img className='absolute top-2 right-2' src = {Cancel} alt = "cancel"/>

             </div>
             
           
      
          </div> )
            })
            
        }
     
    </div>) :
        <div className="w-[55%]">
        <div>
          <div className="grid grid-cols-1">
            <label htmlFor="BVN_Input">
              First, let's validate the BVN of all signatories
            </label>
            {validationComplete ? (
              <p className="text-success"> complete</p>
            ) : (
              ""
            )}
            <input
              type="text"
              className='border border-grey border-2 h-[61px] pl-4 rounded-lg focus:border-none focus:outline-yellow-500' 
              id="BVN_Input"
              name="bvn"
              value={bvn
                .replace(/[^0-9]/g, "")
                .replace(/(\..*)\./g, "$1")}
              maxLength="11"
              onChange={(e) => {
                setBvn(e?.target?.value);
              }}
              placeholder="Bank Verification Number"
              // onBlur ={()=>validateinbranch()}
            />
          </div>
          <div className="grid grid-cols-2">
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={director}
                    onChange={handleDirectorChange}
                    inputProps={{ "aria-label": "controlled" }}
                    sx={{
                      // color : orange[600],
                      "&.Mui-checked": {
                        color: orange[300],
                      },
                    }}
                  />
                }
                label="Director"
              />
            </div>
            <div >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={signatory}
                    onChange={handleSignatoryChange}
                    inputProps={{ "aria-label": "controlled" }}
                    sx={{
                      // color : orange[600],
                      "&.Mui-checked": {
                        color: orange[300],
                      },
                    }}
                  />
                }
                label="Signatory"
              />
            </div>
          </div>

          <div className="grid grid-cols-1">
            
                <button
                   className='bg-[#FDB81533] h-[60px] mt-[5%] rounded text-white active:ring-1 active:ring-offset-2 active:ring-yellow-500 hover:opacity-[0.85] focus:border-yellow-500'
       
                    onClick={() => handleAdd()}
                      >
                   {submitting ? "Validating..." : "Validate" } 
                </button>
            
           
           
           <button
              className='bg-[#344248] h-[60px] mt-[5%] rounded text-white active:ring-1 active:ring-offset-2 active:ring-yellow-500 hover:opacity-[0.85] focus:border-yellow-500'
         
              onClick = {handlePreviousClick}
            >
            Back
        </button>
             
          </div>
        </div>
        {isValid ? (
          <div className="d-flex align-items-center">
            <p className="text-success align-self-center">
              <img
                className="mr-2"
                src={correct}
                alt="error"
                width="25"
              />
              BVN validated successfully!
            </p>
          </div>
        ) : null}
        {!isValid ? (
          <div className="d-flex align-center">
            <p className="text-danger">{error}</p>
          </div>
        ) : null}
        {validationError?.BVN ? (
          <div className="d-flex align-items-center">
            <p className="text-danger align-self-center">
              <img
                className="mr-2"
                src={ErrorIcon}
                alt="error"
                width="25"
              />
              {validationError?.BVN}
            </p>
          </div>
        ) : null}
        <ul className="list-unstyled">
          {listOfBvn?.map((item) => {
            return (

              <li
                className='bg-[#E2FDD8] h-auto mt-[50px] p-6 relative'
                key={item?.number}
              >
                 <div className='flex flex-row gap-4 text-bold'>
                   <img src = {correct} alt ="ve"/>
                    Verified
                </div>
                <div className='mt-[10px]'>
                    <p className='text-[#009721] font-bold'>
                    {item?.name}
                    </p>
                    <p>
                    {item?.number}
                    </p>

                 </div>
               
                {item?.signatory && item?.director ? (
                  <p className="mb-0">Signatory and Director</p>
                ) : item?.signatory ? (
                  <p className="mb-0">Signatory</p>
                ) : item?.director ? (
                  <p className="mb-0">Director</p>
                ) : null}
                  <img
                   className='absolute top-2 right-2' 
                   src = {Cancel} 
                   alt = "cancel"
                   
                   onClick={() => handleDelete(item?.number)}
                   />
                
              </li>
            );
          })}
        </ul>
      </div>
    
   }
   {submitting ? <Loader text="validating customer" /> : null}
    </>
  )
}

export default Bvnform