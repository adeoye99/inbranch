import React, { useEffect, useState, useRef } from "react";
import ReactSelect from "react-select";


import axios from "axios";

import { Titles, Gender, MaritalValue, Countries } from "./utils";

import Terms from "../Components/terms";
import Selfie from "../Components/selfie";
import PDFIcon from "../assets/pdf-svg.svg";

import Checkbox from '@mui/material/Checkbox';
import { orange } from '@mui/material/colors';
import Loader from "../Components/loading";

const BasicInformation = ({  loading  , handleNextClick , handlePreviousClick }) => {

  // var link = sessionStorage.getItem('link'); 
  const bottomRef = useRef(null);
  const topRef = useRef(null);
  
  
 

  const INITIAL_DL_VALUE = {
    driversLicenseNumber: "",
    issueDate: new Date(),
    expirationDate: new Date(),
  };

  const INITIAL_IP_VALUE = {
    passportNumber: "",
    expirationDate: new Date(),
  };

  const INITIAL_NIN_VALUE = {
    nationalIdentificationNumber: "",
  };

  const INITIAL_VC_VALUE = {
    votersCardNumber: "",
  };

 

  // const [accountType, setAccountType] = useState("");
  // const [selected, setSelected] = useState(Identity[0].name);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [dob, setDOB] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState(""); 
  const [gender, setGender] = useState("");
  const [religion, setReligion] = useState("");
  const [state, setState] = useState("");
  const [lga, setLGA] = useState("");
  const [address, setAddress] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");

  const [branch, setBranch] = useState("");
  const [allBranch, setAllBranch] = useState([]);
  const [country, setCountry] = useState("Nigeria");
  const [altPhone, setAltPhone] = useState("");
  const [altEmail, setAltEmail] = useState("");

  const [maritalStatus, setMaritalStatus] = useState("");
  const [bvn, setBVN] = useState("");
  const [error, setError] = useState("");
  const [validationError, setValidationErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);





  const [showTerm, setShowTerm] = useState(false);
  const [showSelfie, setShowSelfie] = useState(false);
  const [agreementCheckBox, setAgreementCheckBox] = useState(false);

  const [selfieImg, setSelfieImg] = useState(null);

  const [allDataValid, setAllDataValid] = useState(false);
  const [rmCode, setRmCode] = useState("");
  const [motherMaidenName , setmotherMaidenName ] = useState("")
  const [occupation , setOccupation] = useState("")
  const [utilityDate , setUtilitydate ] = useState("")
  const [masterCard ,  setMasterCard] = useState("")
  const [ masterCardDescription , setMasterCardDescription ] = useState("")
  const [verveCard , setVerveCard] = useState("")
  const [verveCardDescription ,  setVerveCardDescription] = useState("")
  const [costOfCard , setCostOfCard] = useState("")
  const [ cardType , setCardType ] = useState("")


  const [clickCardIdentify, setClickCardIdentify] = useState(false);
  const [clickDriversLicense, setClickDriversLicense] = useState(false);
  const [clickInternationalPassport, setClickInternationalPassport] =
    useState(false);
  const [clickVotersCard, setClickVotersCard] = useState(false);
  const [clickNinNumber, setClickNinNumber] = useState(false);
  const [dlValue, setDlValue] = useState(INITIAL_DL_VALUE);
  const [ipValue, setIpValue] = useState(INITIAL_IP_VALUE);
  const [ninValue, setNinValue] = useState(INITIAL_NIN_VALUE);
  const [vcValue, setVcValue] = useState(INITIAL_VC_VALUE);
  const [ stateOfOrigindata , setStateOfOrigindata] = useState([]);
  const [ rmCodeData ,  setRmCodeData ] = useState([]);
  
  const [checkedVerve, setCheckedVerve] = useState(false);
  const [checkedMaster , setCheckedMaster] = useState(false);
  const [allDetails , setAllDetails] = useState(false)
  const [instantIssuanceID ,setInstantIssuanceID] = useState("")
  const [ amount ,  setAmount] = useState("")
  const [filteredRmCode , setFilterRmCode ] = useState([])
  const [rmIsOpen , setRmIsOpen] = useState(false)
  const [finalRmCode , setFinalRmCode] = useState("")
  const [strRmCode , setStrRmCode] = useState("")
  const [ lgadropdown , setLgadropdown ] = useState([])
  const [selectedBvn , setSelectedBvn] = useState("")
  


  const accountType1 = sessionStorage.getItem('accountType');
  const token = JSON.parse(sessionStorage.getItem("token"))
  const body ={
    tc  :  Titles?.filter((tt) => title?.toUpperCase() === tt?.title)[0]?.code,
    gn  : Gender?.filter((gg) => gender === gg?.gender)[0]?.code,
    ms  : MaritalValue?.filter((ms) => maritalStatus === ms?.status)[0]?.code,
    
    lastName,
    firstName,
    middleName,
    address,
    address2: address,
    religion,
    phone,
    dob,
    email,
    bvn,
    state,
    lga,
    country,
    altPhone,
    altEmail,
    currentAddress,
    branch,
    rmCode,
    docutilityDate :  utilityDate,
    occupation,
    motherMaidenName,
    amount : costOfCard,
    card_type : cardType,
    // new_cust_id
    new_cust_id : sessionStorage.getItem('customerid'),
    instantIssuanceID
  }
//  console.log(body);

 sessionStorage.setItem("body" , JSON.stringify(body))
 
 const listOfBvn = JSON.parse(sessionStorage.getItem("listOfBvn"))
const individualResponse = JSON.parse(sessionStorage.getItem("res"))

  const handleChangeforVerve = (event) => {
    setCheckedVerve(event.target.checked);
    // console.log(event.target.checked)
    if (checkedMaster === true){
      setCheckedMaster(false);
      setVerveCard("")


    }
    
  };

  const handleChangeforMaster=(e) =>{
    setCheckedMaster(e.target.checked);
    if (checkedVerve === true){
      setCheckedVerve(false);
      setMasterCard("")
    }

  }
  // const [loading, setLoading] = useState(false);
  const API_URL = process.env.REACT_APP_BaseApi_URL
  const API_URLAUTOSAVE = process.env.REACT_APP_BaseApi_URLAutosave

  const mask = (word) => {
    if (word === "" || word === undefined) {
      return "";
    } else if (word.length <= 2) {
      return word;
    } else {
      var masked =
        word.substring(0, word.length - 4) +
        word.substring(word.length - 4, word.length).replace(/[a-z\d]/gi, "*");
      return masked;
    }
  };

  function longMask(word) {
    if (word === "" || word === undefined) {
      return "";
    } else if (word.length <= 2) {
      return word;
    } else {
      var masked =
        word.substring(0, word.length - 10).replace(/[a-z\d]/gi, "*") +
        word.substring(word.length - 15, word.length);
      return masked;
    }
  }
// response fron the bvn validation
  useEffect(() => {
    if(accountType1 === "Current" || accountType1 === "Savings"){
     
    let data = JSON.parse(sessionStorage.getItem("res"));
     
    const dbUserTitle = data?.Gender === "Male" ? "MR" : "MRS";
    setFirstName(data?.FirstName);
    setLastName(data?.LastName);
    setMiddleName(data?.MiddleName);
    setDOB(data?.DOB);
    setPhone(data?.Phone);
    setEmail(data?.Email);
    setTitle(
      data?.Title == undefined || data?.Title == null || data?.Title == ""
        ? dbUserTitle
        : data.Title
    );
    setGender(data?.Gender);
    setState(data?.State);
    setLGA(data?.LGA);
    setAddress(data?.Address);
    setMaritalStatus(data?.MaritalStatus);
    setBVN(data?.BVN);
    getAllBranch();
    }else{
      getAllBranch();
    }
    
  }
  , 
  []);



  // stateoforigindropdown
  useEffect( () => {
     
    const getStateofOrigin = async () => {
      const response = await axios.get(API_URL  + "/getCountryState/NG")
      
      setStateOfOrigindata(response.data.data)
    } 
   
    
    getStateofOrigin()
    
   
  }, []);


  
  // /apitest/branches
  const getAllBranch = async () => {
    try {
      const response = await axios.get(
        API_URL + "/branches"
        // "https://providusonline.providusbank.com:8443/apitest/branches"
      );
      // console.log(response.data.data)
      setAllBranch(response.data.data);
    } catch (er) {}
  };


  useEffect(() => {
    if(accountCategoryType === "Corporate Account"){
      if( 
        accountType1 != "" &&
        religion != "" &&
        country != "" &&
        branch != "" &&
        trimStr(currentAddress) != "" &&
        currentAddress != "" &&
        selectedBvn != "" &&
        agreementCheckBox
           ? true
           : false
        
        ){
          // setAllDataValid(true)
          if( (checkedMaster === true || checkedVerve === true) && cardType === ""){
            setAllDataValid(false)
          }else{
            setAllDataValid(true)
          }
  
        }else{
          setAllDataValid(false)  
        }
  

    }else{
      if( 
        accountType1 != "" &&
        religion != "" &&
        country != "" &&
        branch != "" &&
        trimStr(currentAddress) != "" &&
        currentAddress != "" &&
        agreementCheckBox
           ? true
           : false
        
        ){
          // setAllDataValid(true)
          if( (checkedMaster === true || checkedVerve === true) && cardType === ""){
            setAllDataValid(false)
          }else{
            setAllDataValid(true)
          }
  
        }else{
          setAllDataValid(false)  
        }
  



    }
      
      
  }, [
    
    checkedMaster,
    checkedVerve,
    cardType,
    altPhone,
    altEmail,
   
    religion,
    country,
    currentAddress,
    agreementCheckBox,
    branch,
  ]);

  const handleClose = () => {
    setShowTerm(false);
  };
  const handleCloseSelfie = () => {
    setShowSelfie(false);
  };

  const handleCardIdentity = (e) => {
    const result = e.target.value;
    const { name } = e.target;
    // console.log(name, result)

    if (result === "DL") {
      setClickDriversLicense(true);
    } else if (result === "IP") {
      setClickInternationalPassport(true);
    } else if (result === "VC") {
      setClickVotersCard(true);
    } else if (result === "NIN") {
      setClickNinNumber(true);
    }
  };

  const handleDlChange = (e) => {
    if ([e.target.name === "driversLicenseNumber"]) {
      const updateDLValue = {...dlValue, driversLicenseNumber: e.target.value}
      setDlValue(updateDLValue);
    }
  };

  const handleIpChange = (e) => {
    if ([e.target.name === "passportNumber"]) {
      const updateIpValue = {...ipValue, passportNumber: e.target.value}
      setIpValue(updateIpValue);
    }
  };

  const handleNinChange = (e) => {
    if ([e.target.name === "nationalIdentificationNumber"]) {
      const updateNinValue = {...ninValue, nationalIdentificationNumber: e.target.value}
      setNinValue(updateNinValue);
    }
  };

  

  const SubmitSelfie = (selfieImg) => {
    setSelfieImg(selfieImg);
  };
   const Vervedata = [
    {
      id : "1",
      benefits : "ProvidusBank Verve Card is a local payment card that gives you real-time access to funds in your Savings or Current Naira account, allows you to conveniently pay for goods and services on all ATMs (Automated Teller Machines), POS and Web. It is acceptable at merchant locations where the Verve/Interswitch logos are displayed Access to account 24/7 through ATM, POS & WEB,Free Card Advisory Services Verve & Bank Reward Programmes ",

      value : "Classic/Gold Verve ",

      amountInstring : "(1000 NGN)",


      amount: "1000",
      instantIssuanceID: "1"
    },
    {
      id : "2",
      benefits : "ProvidusBank Black Verve Card is a premium payment card that gives you real-time access to funds in your HNI account, allows you to conveniently pay for goods and services on all ATMs (Automated Teller Machines), POS and Web. It is acceptable at merchant locations where the Verve/InterSwitch logos are displayed.Free card pouch and notepad box at onboarding ,Access to HNI Lounge at branches bankwide ,Free Card Advisory Services ,Higher Daily Transaction Limit ,Verve & Bank Reward Programmes ",

      value : "Black Verve",

      amountInstring : "(1000 NGN + N4000 lifestyle Enrolment Fees)",
      amount : "5000",
      instantIssuanceID: "2"
    },
    {
      id : "3",
      benefits : "ProvidusBank Platinum Verve Card is a premium payment card that gives you real-time access to funds in your HNI account, allows you to conveniently pay for goods and services on all ATMs (Automated Teller Machines), POS and Web. It is acceptable at merchant locations where the Verve/InterSwitch logos are displayed.Free card pouch and notepad box at onboarding,Access to HNI Lounge at branches bankwide ,Free Card Advisory Services ,Higher Daily Transaction Limit ,Verve & Bank Reward Programmes ",

      value : "Platinum Verve",

      amountInstring : "(1000 NGN + N4000 lifestyle Enrolment Fees)",
      amount : "5000",
      instantIssuanceID: "3"
    }
    
     
   ]

   const Masterdata = [
    {
      id : "1",
      benefits : "The Classic Mastercard is a Naira denominated debit card issued in partnership with MasterCard International. It is linked to customers current and/or savings account and can be used for transactions via various acceptance channels (ATM, POS and Web) both locally and internationally. ",
      value : "Classic Mastercard",
      amountInstring : "(1000 NGN)",
      amount: "1000",
      instantIssuanceID: "48"
    },
    {
      id : "2",
      benefits : "The Platinum Mastercard is a debit card issued in partnership with Mastercard International and avails cardholders exclusive access to premium benefits. Free access to Lounge at Lagos (Local & Int’l) and Abuja (Int’l) Airports VIP Lounge (MMA2) b. Gabfol Lounge (except MMA2),Access to over 600+ Airport lounges at a discounted rate, International transactions up to 3000USD/Month, Purchase Protection Offers,MyUs Premium Membership & Shipping Discount ,Eligibility for AVIS car rental at a discount,Higher International transactions up to 100,000USD/Annum",

      value : "Platinum Mastercard",
      amountInstring : "(1000 NGN + N4000 lifestyle Enrolment Fees)",

      amount: "5000",
      instantIssuanceID: "55"
    },
    {
      id : "3",
      benefits : "Nigeria's first eco-friendly contactless debit card. Free access to Gabfol lounges at Lagos & Abuja airport terminals ,Free access to Bi-Courtney Lounge at MMA2,Discounts at local merchant outlets e.g. Tino Electronics, Hotel Reno, Dutch Flowers, Dro health, Swiss International Hotel: The Vistana, Sari signature, Pricecut.com etc.",
      value : "ProvidusEco",
      amountInstring : "(1000 NGN + N4000 lifestyle Enrolment Fees)",
      amount : "5000",
      instantIssuanceID: "75"
    }
    
     
   ]
  



  

 

 const handleVerveChange = (e)=>{
  
   let selecteditem = Vervedata.filter((item)=>
    item.value == e.target.value
   
   )
  //  console.log(selecteditem[0]?.benefits)
  
   setVerveCard(e.target.value)
   setCardType(e.target.value)
   setVerveCardDescription(selecteditem[0]?.benefits)
   setCostOfCard(selecteditem[0]?.amount)
   setInstantIssuanceID(selecteditem[0]?.instantIssuanceID)
  //  console.log(costOfCard)

 }
 const handleMasterChange = (e) =>{
  setMasterCard(e.target.value)
  setCardType(e.target.value)
  // console.log(e.target.value)
  
  let selecteditem = Masterdata.filter((item)=>
  item.value == e.target.value
 
 )
//  console.log(selecteditem[0]?.benefits)

//  console.log(cardType)
  setMasterCardDescription(selecteditem[0]?.benefits)
  setCostOfCard(selecteditem[0]?.amount)
  setInstantIssuanceID(selecteditem[0]?.instantIssuanceID)

  // console.log(costOfCard)

 }
  const handleIdentityChange = () => {
    console.log("I am yazid");
  };

  const trimStr = (str) => {
    if (str != null && str != undefined) {
      return str.trim();
    }
    return "";
  };

  const ValidateEmail = (mail) => {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
      return true;
    }

    return false;
  };
  const handleBranchChange = (e) =>{
     setBranch(e.currentTarget.value)
     var branch = e.currentTarget.value
    //  console.log(e.currentTarget.value)
    //  console.log(branch)
    if(branch){
      // console.log(branch)
      const getRmCode = async()=>{
        const response = await axios.get(API_URL + `/getRm_list/${branch}`)
        // console.log(response)
        setRmCodeData(mapDataToOptions(response.data.data))
         
      }
  
      getRmCode()

    }

  }

  
  
  // const saveChanges = async () => {
  //    const data = {
           
  //    }
  //    const response = await axios.post("", data)
  //    console.log(response)
  // }


 
  const customStyles = {
    control : (base) => ({
      ...base,
     height: "48px"
       
    }),
  };

  function mapDataToOptions(data) {
    return data.map(item => ({ value: item.RMCODE  , label: item.RMCODE +  " " + item.EMPLOYEENAME }));
}

  // const  handleInputOnBlur = (event) => {
  //   console.log("blur is here")
  //   let rmcode = event.target.value

  //   setRmCode(rmcode)
  //   // const filteredrm = rmCodeData?.filter(item => item?.includes(value))
  //   console.log(rmcode)
  //   const filteredrm = rmCodeData.filter(item => (item?.RMCODE || item?.EMPLOYEENAME) === rmcode)
  //   console.log(rmCodeData)
  //   console.log(filteredrm)
    
  //   setFilterRmCode(filteredrm)


  //   console.log(filteredRmCode)
      
  // }
 
  // useEffect(()=>{
  //   if(!bvn){
  //     setFirstName("");
  //     setLastName("");
  //     setMiddleName("");
  //     setDOB("");
  //     setPhone("");
  //     setEmail("");
  //     setTitle("");
  //     setGender("");
  //     setState("");
  //     setLGA("");
  //     setAddress("");
  //     setMaritalStatus("");
  //   }

  // },[bvn])
  const handleRmCode = (event) => {

    setRmCode(event.target.value)

    let rmcode = event.target.value
    // console.log(rmcode)
    
    // console.log(isNaN(rmcode))
    if(rmcode?.length == 4 && !isNaN(rmcode)){
      //  console.log(rmCodeData)
      const filteredrm = rmCodeData.filter(item => item?.label === rmcode)
      // console.log(filteredrm)
      setRmIsOpen(true)
      setFilterRmCode(filteredrm)
 
    }else if(isNaN(rmcode)) {
      // console.log(rmCodeData)
      const filteredrm = rmCodeData.filter(item => item?.value.toLowerCase().includes(rmcode?.toLowerCase()))
      // console.log(filteredrm)
      setRmIsOpen(true)
      setFilterRmCode([...filteredrm])

    }
    setRmCode(rmcode)
 
   
   
      
  }

  const handleSetRmCode = (query) => {
    
    setStrRmCode(query?.label)
    let resp=query?.value!=""&& query?.value!=null&& query?.value!=undefined?query.value:"";
    setFinalRmCode(resp);
    
};



const accountCategoryType =  sessionStorage.getItem("accountCategoryType")
const subAccountCategoryType = sessionStorage.getItem("subAccountCategoryType")
const onSubmit = async () =>{
  const body ={
    data : {
    tc  :  Titles?.filter((tt) => title?.toUpperCase() === tt?.title)[0]?.code,
    gn  : Gender?.filter((gg) => gender === gg?.gender)[0]?.code,
    ms  : MaritalValue?.filter((ms) => maritalStatus === ms?.status)[0]?.code,
    accountType : "65",
    lastName,
    firstName,
    middleName,
    address,
    address2: address,
    religion,
    phone,
    dob,
    email,
    bvn : accountCategoryType === "Corporate Account" ? selectedBvn : bvn ,
    state,
    lga,
    country,
    altPhone,
    altEmail,
    currentAddress,
    bulkBvn : listOfBvn,
    branch,
    rmCode,
    docutilityDate :  utilityDate,
    occupation,
    motherMaidenName,
    amount : costOfCard,
    card_type : cardType,
    // new_cust_id
    customerID : sessionStorage.getItem('customerid'),
    accountCategoryType : accountCategoryType,
    subAccountCategoryType: subAccountCategoryType,

    instantIssuanceID
    }
  }

setSubmitting(true)
try {
 const response = await axios.post( API_URL + "/openAccount",
  body,{
  headers:{
    "Authorization": token,
  }

}
)   

if (response.data.data.ResponseCode === "00") {
  setSubmitting(false);
  loading(false);
  await sessionStorage.setItem("deets", JSON.stringify(response.data));
 
}
} catch(error){
  console.log(error)

}finally{
  setSubmitting(false)
}

}

const handleStateChange = (e) =>{
  setState(e.target.value)
  const state =  e.target.value

 const getAllLga = async () =>{
  const response = await axios.get(API_URL + `/getStateCity/NG/${state}` )
  
  setLgadropdown(response.data.data)
}
getAllLga()
}


const handleSelectedBVNChange = async (e) =>{
   setSelectedBvn(e.target.value)
   
   
   const bvn = e.target.value
   
   const body = { BVN: bvn };
   setSubmitting(true)
    try {
      const response = await axios.post( API_URL + "/validate_bvn",
        body,{
        headers: {

          "Authorization": token,
        
        }
      }
      );
       if(!e.target.value){
      
        setFirstName("");
        setLastName("");
        setMiddleName("");
        setDOB("");
        setPhone("");
        setEmail("");
        setTitle("");
        setGender("");
        setState("");
        setLGA("");
        setAddress("");
        setMaritalStatus("");
           return
       }
      
      if (response.data.data.ResponseCode == "00") {
          
         
         
          const data = response.data.data
            
          const dbUserTitle = data?.Gender === "Male" ? "MR" : "MRS";
          setFirstName(data?.FirstName);
          setLastName(data?.LastName);
          setMiddleName(data?.MiddleName);
          setDOB(data?.DOB);
          setPhone(data?.Phone);
          setEmail(data?.Email);
          setTitle(
            data?.Title == undefined || data?.Title == null || data?.Title == ""
              ? dbUserTitle
              : data.Title
          );
          setGender(data?.Gender);
          setState(data?.State);
          setLGA(data?.LGA);
          setAddress(data?.Address);
          setMaritalStatus(data?.MaritalStatus);

          setBVN(data?.BVN);
          setSubmitting(false)
          
      } else {
        setFirstName("");
          setLastName("");
          setMiddleName("");
          setDOB("");
          setPhone("");
          setEmail("");
          setTitle("");
          setGender("");
          setState("");
          setLGA("");
          setAddress("");
          setMaritalStatus("");
        
        setSubmitting(false);
      }
    } catch (error) {
      setSubmitting(false);
      setError("");
      setValidationErrors({});
      setValidationErrors(error?.response?.data);
    }

}

  return (
    <>
    <div style={{ position: "relative" }}>
   
      <>
      
          <form id="msform">
           
              <h2 className="fs-title" ref={topRef}>
                BASIC INFORMATION
              </h2>
              
              
              <h3 className="fs-subtitle text-danger">
                Fields marked with <sup>*</sup> are mandatory
              </h3>
              <p className="text-danger">
                {error != null && error != "" ? error : validationError.error}
              </p>
              <hr />
              <div 
        
              className= {` mt-[4%] gap-2 grid grid-cols-2 ${accountCategoryType === "Corporate Account" ? "grid grid-cols-3" : "grid grid-cols-2"}`}
              >
              { accountCategoryType === "Corporate Account" ? 


                
                <div className="flex flex-col w-[100%]">
                  <label
                    className={selectedBvn != "" ? "" : "text-danger"}
                    htmlFor="exampleInputEmail1"
                  >
                  Choose BVN <sup className="text-danger">*</sup>
                  </label>
                  <select
                    className='border border-black h-[50px]  pl-4  focus:border focus:outline-yellow-500' 
                    id="exampleFormControlSelect2"
                    name="religion"
                    value={selectedBvn}                   
                    onChange={handleSelectedBVNChange}
                    required
                  >
                    <option value = "">Select your BVN</option>
                    {
                      listOfBvn.map((item)=>{
                        return(
                        <option key = {item?.number} value = {item?.number}>{item?.number} {item?.signatory && item.director ? "signatory and director": item?.signatory ? "signatory" :item?.director ? "director": null}</option>
                        )
                      })
                      
                    }
                  </select>
                  <p className="text-danger">{validationError.religion}</p>
                </div>
            : ""




                }

                

                <div className={`${accountCategoryType === "Corporate Account" ? "col-md-4" : "col-md-6"}`}>
                  <div className="flex flex-col w-[100%]">
                    <label
                      className={religion != "" ? "" : "text-danger"}
                      htmlFor="exampleInputEmail1"
                    >
                      Religion <sup className="text-danger">*</sup>
                    </label>
                    <select
                     className='border border-black  h-[50px]  pl-4  focus:border focus:outline-yellow-500' 
                      id="exampleFormControlSelect2"
                      name="religion"
                      value={religion}
                     
                      onChange={(e) => setReligion(e.target.value)}
                      required
                    >
                      <option value = "">Select your Religion</option>
                      <option value="1">Christianity</option>
                      <option value="2">Islam</option>
                      <option value="4">Hindu</option>
                      <option value="3">Others</option>
                    </select>
                    <p className="text-danger">{validationError.religion}</p>
                  </div>
                </div>

                <div className={`${accountCategoryType === "Corporate Account" ? "col-md-4" : "col-md-6"}`}>
                  <div className="form-group">
                    <label
                      className={country != "" ? "" : "text-danger"}
                      htmlFor="exampleInputEmail1"
                    >
                      Country of Residence <sup className="text-danger">*</sup>
                    </label>
                    <ReactSelect
                      value={{ label: country, value: country }}
                      onChange={(e) => {
                        setCountry(e.value);
                      }}
                      // onBlur = {()=>autosave()}
                      options={Countries}
                      styles={customStyles}
                      className='h-[50px]  pl-4  focus:border-none focus:outline-yellow-500' 

                      
                    />

                    {/* <select
                      className="form-control select2"
                      id="exampleFormControlSelect3"
                      name="country"
                      defaultValue={country}
                      onChange={(e) => setCountry(e.currentTarget.value)}
                      required
                    >
                      <option>Select a Country</option>

                      {Countries.map((row, index) => (
                        <option value={row} key={index}>
                          {row}
                        </option>
                      ))}
                    </select> */}
                    <p className="text-danger">{validationError.country}</p>
                  </div>
                  
                </div>

                                
              </div>


              
              <div className="grid md:grid-cols-3 mt-[4%]">
              
                  <div className="flex flex-col">
                    <label htmlFor="title">Title</label>
                    <select
                     className='border border-black h-[50px]  pl-4  focus:border focus:outline-yellow-500' 
                      id="title"
                      name="title"
                      value = {title}
                     
                      disabled 
                    >
                    <option value = "">Title</option>
                      <option value={title}>{title}</option>
                      <option value = "MR">MR</option>
                      <option value = "MISS">MISS</option>
                      <option value = "MRS">MRS</option>
                    </select>
                 
                </div>

                <div className="flex flex-col mx-[10px]">
                    <label htmlFor="exampleInputEmail1">Date of Birth</label>
                    <input
                      type="text"
                      className='border border-black  h-[50px]  pl-4  focus:border-none focus:outline-yellow-500' 

                      id="exampleInputEmail1"
                      placeholder="Date of Birth"
                      name="dob"
                      value={ mask(dob) }
                    
                      disabled 
                      //  {accountType1 === "Current" || accountType1 === "Savings"}
                    />
                </div>
                <div className="flex flex-col ">
                
                    <label htmlFor="exampleInputEmail1">Gender</label>
                    <select
                      className='border border-black  h-[50px]  pl-4  focus:border focus:outline-yellow-500' 
                      id="exampleFormControlSelect1"
                      value = {gender}
                      onChange = {(e)=> setGender(e.target.value)}
                      disabled 
                      //  {accountType1 === "Current" || accountType1 === "Savings"}
                    >
                    {
                      accountType1 === "Current" || 
                      accountType1 === "Savings" ?
                      <option value={gender}>{gender}</option>
                      :<>
                      <option value = "">Gender</option>
                      <option value = "Female">Female</option>
                      <option value = "Male">Male</option>
                      </>
                    }
                      
                    </select>
                  </div>
                
              </div>

              <div className="grid md:grid-cols-3 mt-[4%] gap-2">
                <div className=" flex flex-col  w-[100%]  ">
                    <label htmlFor="exampleInputEmail1">First Name</label>
                    <input
                      type="text"
                      className='border border-black h-[50px]  pl-4  focus:border-none focus:outline-yellow-500' 
                     
                      id="exampleInputEmail1"
                      placeholder="First Name"
                      name = "firstname"
                      value = { mask(firstName) }
                    
                      disabled  
                      // {accountType1 === "Current" || accountType1 === "Savings"}
                    />
              
                </div>
               
                  <div className=" flex flex-col w-[100%]  ">
                    <label htmlFor="exampleInputEmail1">Middle Name</label>
                    <input
                      type="text"
                      className='border border-black h-[50px] pl-4  focus:border-none focus:outline-yellow-500' 
                      id="exampleInputEmail1"
                      placeholder="Middle Name"
                      name="middlename"
                      value={  mask(middleName) }
                    
                      disabled 
                      // {accountType1 === "Current" || accountType1 === "Savings"}
                    />
                  </div>
               

                
                  <div className=" flex flex-col w-[100%] ">
                    <label htmlFor="exampleInputEmail1">Last Name</label>
                    <input
                      type="text"
                      className='border border-black h-[50px]  pl-4  focus:border-none focus:outline-yellow-500' 
                      id="exampleInputEmail1"
                      placeholder="Last Name"
                      name="lastname"
                      value={mask(lastName) }
                      
                      disabled  
                      // {accountType1 === "Current" || accountType1 === "Savings"}
                    />
                  </div>
                
              </div>
              


              <div className="grid md:grid-cols-2 mt-[4%] gap-2">
              
                  <div className="flex flex-col w-[100%] ">
                    <label htmlFor="exampleInputEmail1"> Phone Number</label>
                    <input
                      type="text"
                      className='border border-black h-[50px] pl-4 focus:border-none focus:outline-yellow-500' 
                      id="exampleInputEmail1"
                      placeholder="Phone Number"
                      name="phone"
                      value={ mask(phone)}
                      onChange = {(e)=> setPhone(e.target.value)}
                      disabled 
                      // {accountType1 === "Current" || accountType1 === "Savings"}
                    />
                  </div>
               
              
                  <div className="flex flex-col w-[100%] ">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input
                      type="email"
                      className='border border-black  h-[50px]  pl-4  focus:border-none focus:outline-yellow-500' 
                      id="exampleInputEmail1"
                      placeholder="Email"
                      name="email"
                       value={ longMask(email) }
                      
                      
                      disabled 
                      // {accountType1 === "Current" || accountType1 === "Savings"}
                    />
                  </div>
               
              </div>

              <div className="grid grid-cols-2 mt-[4%] gap-2">
              
                  <div className="flex flex-col w-[100%] ">
                  {/* <label
                      htmlFor="exampleFormControlTextarea1"
                      className={
                        altPhone != "" ? "" : "text-danger"
                      }
                    >
                      Alternative Phone <sup className="text-danger">*</sup>
                    </label> */}

                       <label htmlFor="exampleInputEmail1">Alternative Phone</label>
                    <input
                      type="text"
                      className='border border-black h-[50px] pl-4 focus:border-none focus:outline-yellow-500' 

                      id="exampleInputEmail1"
                      placeholder="Alternative Phone Number"
                      name="altPhone"
                      value={altPhone}
                      onChange={(e) => setAltPhone(e.currentTarget.value)}
                     
                      // onBlur = {()=>autosave()}
                    />
                  </div>
              
                
                  <div className="flex flex-col w-[100%] ">
                  {/* <label
                      htmlFor="exampleFormControlTextarea1"
                      className={
                        // altEmail != "" ? "" : "text-danger"
                      }
                    >

                     Alternative Email <sup className="text-danger">*</sup>
                    </label> */}
                    <label htmlFor="exampleInputEmail1">Alternative Email</label>
                  
                    <input
                      type="text"
                      className='border border-black h-[50px] pl-4  focus:border-none focus:outline-yellow-500' 
                      id="exampleInputEmail1"
                      placeholder="Alternative Email"
                      name="altEmail"
                      value={altEmail}
                      onChange={(e) => setAltEmail(e.currentTarget.value)}
                      // onBlur = {()=>autosave()}
                      
                    />
                    <p className="text-danger">{validationError.altEmail}</p>
                  </div>
               
              </div>

              <div className="grid grid-cols-2 gap-2 mt-[4%]">
            
                  <div className="flex flex-col w-[100%] ">
                    <label htmlFor="exampleInputEmail1">State of Origin</label>
                    <select
                       className='border border-black border h-[50px]  pl-4  focus:border-none focus:outline-yellow-500' 
                      id="exampleFormControlSelect1"
                      name="state"
                      
                      disabled 
                      // {accountType1 === "Current" || accountType1 === "Savings"}
                   >
                    
                      
                      <option value={state}>{state}</option>                    
                    </select>

                      {/* <option value={state}>{state}</option> */}
                    
                  </div>
                  <div className="flex flex-col w-[100%]">
                    <label htmlFor="exampleInputEmail1">
                      Local Government Area
                    </label>
                    <select
                     className='border border-grey border-2 h-[50px] pl-4 focus:border-none focus:outline-yellow-500' 
                      id="exampleFormControlSelect1"
                      name="LGA"
                      
                      disabled 
                    
                    >

                    
                      
                      <option value={lga}>{lga}</option>
              
                     
                    </select>
                  </div>



                </div>
                
                
                
             

              <div className="grid grid-cols-2 mt-[4%] gap-2">
                
                  <div className="flex flex-col w-[100%] ">
                    <label
                      className={branch != "" ? "" : "text-danger"}
                      htmlFor="exampleInputEmail1"
                    >
                      Branch <sup className="text-danger">*</sup>
                    </label>
                    <select
                    className='border border-black border h-[50px] pl-4  focus:border-none focus:outline-yellow-500' 
                      id="exampleFormControlSelect3"
                      name="branch"
                      onChange= {handleBranchChange}
                      required
                   
                      // onBlur = {()=>autosave()}
                    >
                      <option value="">Select a Branch</option>
                      {allBranch?.map((row, index) => {
                        return (
                          <option value={row.code} key={index}>
                            {row.name}
                          </option>
                        );
                      })}

                      {/* // <option value="202">Head Office (Victoria Island)</option>
                      // <option value="203">Victoria Island</option>
                      // <option value="204">Abuja Main</option>
                      // <option value="205">Festac</option>
                      // <option value="206">Gbagada</option>
                      // <option value="207">Ikota</option>
                      // <option value="209">Ikeja</option>
                      // <option value="210">Apapa</option>
                      // <option value="211">Akure</option>
                      // <option value="212">Nnamdi Azikwe</option>
                      // <option value="213">Lekki</option> */}
                    </select>
                    <p className="text-danger">{validationError.branch}</p>
                  </div>
               
              
                  <div className="form-group">
                    <label 
                    // htmlFor="exampleInputEmail1"
                    >RM Code
                    </label>
                    {/* <Select
                        //  className='border-red-300 text-yellow-500 w-[30%] m-2 mx-auto'
                         defaultValue={{ label: rmCode, value: rmCode }}
                         value={{ label: rmCode, value: rmCode }}
                         onInputChange={(e)=>handleInputChange(e)}
                         options={rmCodeData}
                        menuIsOpen={rmCode?.length >= 4}
                        /> */}
                    <ReactSelect
                      value={{ label: strRmCode, value: strRmCode }}
                      onInputChange={(e)=>{setRmCode(e)}}
                      onChange={(e)=>handleSetRmCode(e)}
                      // onBlur = {()=>autosave()}
                      
                      options={rmCodeData}
                      styles={customStyles}

                      menuIsOpen={rmCode?.length >= 4}
        
                    />
                    {/* <input
                     value = {rmCode}
                     className="form-control"
                      id="exampleFormControlInput1"
                      name = "rmCode"
                      onBlur = { (e)=>handleInputOnBlur(e) }
                     onChange = {(e) =>{setRmCode(e.target.value)}}
                    />
                      <ul className = "rmDropdown"> 
                          {filteredRmCode.map(item => <li key={item?.id}>{item.RMCODE} {item?.EMPLOYEENAME}</li>)}
                     </ul> */}
                    {/* <select
                      className  = "form-control"
                      // id = "exampleInputEmail1"
                      name = "rmCode"
                      disabled = { branch ? false : true }
                      onBlur = {()=>autosave()}
                      onChange = {(e) =>{setRmCode(e.target.value)}}
                      // onBlur = {autosave()}
                    >
                      <option value = "">Select RM Code</option>
                     {
                      rmCodeData?.map((item) =>{
                        return(
                          <option className="px-3" value = {item.RMCODE}>{item.RMCODE} {item.EMPLOYEENAME}</option>
                        ) 
                      })

                     }
                    </select> */}
                  </div>
                
              </div>
              <div className="grid grid-cols-2 mt-[4%] gap-2">
                
                  <div className = "flex flex-col w-[100%]" >
                    <label htmlFor="exampleInputEmail1">Mother's maiden name</label>
                    <input
                      className='border border-black  h-[50px]  pl-4  focus:border-none focus:outline-yellow-500' 
                      id="exampleFormControlSelect1"
                      name="state"
                      value={motherMaidenName || ""}
                      onChange = {(e)=> {setmotherMaidenName(e.target.value)}}
                      // onBlur = {autosave()}
                      // onBlur = {()=>autosave()}

                    >
                      
                    </input>
                  
                </div>
           
                  <div className = "flex flex-col w-[100%]" >
                    <label htmlFor="exampleInputEmail1">
                      Occupation / Nature of Business
                    </label>
                    <input
                      className='border border-black h-[50px]  pl-4  focus:border focus:outline-yellow-500' 
                      id="exampleFormControlSelect1"
                      name="occupation"
                      value={occupation}
                      onChange = {(e)=> {setOccupation(e.target.value)}}
                     
                    >
                      
                    </input>
                  </div>
              </div>

      
                <div className="mt-[4%]">
                  <p>Card Selection</p>
                   <div className="grid grid-cols-2">
                      <div className="">
                    
                         
                               
                             <div className="grid grid-cols-2 h-100 ">
                              <div className="my-auto flex item-center justify-center">
                                 <label className="checkbox-label" htmlFor="exampleInputEmail1">Master Card</label>
                                 <Checkbox
                                         label = "Master Card"
                                         checked={checkedMaster}
                                         onChange={handleChangeforMaster}
                                         inputProps={{ 'aria-label': 'controlled' }}
                                         sx={{
                                          
                                          '&.Mui-checked': {
                                            color: orange[200],
                                          },
                                        }}
                                     />
                                 {/* <input className="ml-3" type = "checkbox" /> */}

                              </div>
                                
                               <div className=" my-auto  flex item-center justify-center">
                                <div className="flex item-center">
                                   <label className="checkbox-label" htmlFor="exampleInputEmail1">Verve Card</label>
                                     <Checkbox
                                         label = "Verve Card"

                                         checked={checkedVerve}

                                         onChange={handleChangeforVerve}

                                         inputProps={{ 'aria-label': 'controlled' }}

                                         sx={{
                                          '&.Mui-checked': {
                                            color: orange[200],
                                          },
                                        }}
                                     />

                                   {/* <input
                                    
                                   className="ml-3" 
                                   type = "checkbox" /> */}

                                </div>
                                   

                               </div>
                                  

                              
                             </div>
                     </div>
                  <div >

                    { checkedMaster ? 

                            <div >
                             <label htmlFor="exampleInputEmail1">
                               Master Card
                             </label>
                             <select
                              className='border border-black h-[50px]  pl-4  focus:border-none focus:outline-yellow-500' 
                              id="exampleFormControlSelect1"
                              name="masterCard"
                              value = {masterCard}
                              onChange = { handleMasterChange }
                              // disabled={verveCard ? true : false}

                              // onBlur = {autosave()}
                              // onBlur = {()=>autosave()}
                              
                              >     
                              <option value = "">Select a Master Card</option> 
                                    {
                              Masterdata.map((item)=>{
                                // console.log(item.benefits)
                                
                                return(
                                      
                                           <option title={item.benefits} key ={item.id} value = {item.value} > {item.value} - {item.amountInstring} </option>
                                           
                                )
                                  

                              })
                             }
                            </select>
                          
                          

                            </div>: checkedVerve ? 
                            <div >
                                      <label>Verve Card</label>
                                      <select
                                        className='border border-black h-[50px] pl-4 focus:border-none focus:outline-yellow-500' 
                                        id="exampleFormControlSelect1"
                                           name="verveCard"
                                          value = {verveCard}
                                           onChange = { handleVerveChange }
                                     
                                           >
                                              <option value="">Select a Verve Card</option>
                                             {
                                             Vervedata.map((item)=>{
                                              return(
                                                 <option title={item.benefits} key ={item.id} value = {item.value}>{item.value} - {item.amountInstring}</option>
                                                 )
                                                    // <option key ={item.id}>{item.value}</option>

                                                    })
                                         }
                             
                                         </select> 
                        

                         
                     </div>:null

                    }
                  
                   
                          </div>
                       </div>
                   </div>
                


              <div className="grid grid-cols-1">
               
                  <div className="flex flex-col w-[100%]">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className={
                        trimStr(currentAddress) != "" ? "" : "text-danger"
                      }
                    >
                      Current Address <sup className="text-danger">*</sup>
                    </label>
                    <textarea
                     className='rounded border border-black h-[100px] p-4  focus:border-none focus:outline-yellow-500' 
                      id="exampleFormControlTextarea1"
                      rows="3"
                      name="currentAddress"
                      value={currentAddress}
                      placeholder="Please type your full address"
                      onChange={(e) => setCurrentAddress(e.currentTarget.value)}
                      
                    ></textarea>
                    <p className="text-danger">
                      {validationError.currentAddress}
                    </p>
                  </div>
             
              </div>

               <p>
                <input
                  style={{ marginRight: "5px" }}
                  type="checkbox"
                  required={true}
                  checked={agreementCheckBox}
                  onChange={() => setAgreementCheckBox(!agreementCheckBox)}
                />
                I Agree to the
                <a href="#" onClick={() => setShowTerm(true)}
                   style={{ color: "#efb331" }}
                >
                  {" "}
                  Terms & Conditions
                </a>
              </p> 

              <div className="grid grid-cols-1 w-[50%]">

              <button
           className='bg-[#FDB81533] h-[60px] mt-[5%] rounded text-white active:ring-1 active:ring-offset-2 active:ring-yellow-500 hover:opacity-[0.85] focus:border-yellow-500'
       
          onClick={handleNextClick}

        >
            Save & Next
        </button>
        <button
           className='bg-[#344248] h-[60px] mt-[5%] rounded text-white active:ring-1 active:ring-offset-2 active:ring-yellow-500 hover:opacity-[0.85] focus:border-yellow-500'
         
          onClick = {handlePreviousClick}
        >
            Back
        </button>
              </div>
                <>
                  {!allDataValid ? (
                     <>
                <button
                    type="button"
                    name="previous"
                    className="previous action-button"
                    value="Previous"
                    
                  />
             </>
             ) :!submitting ?  (
              
                <>
             <button
           className='bg-[#FDB81533] h-[60px] mt-[5%] rounded text-white active:ring-1 active:ring-offset-2 active:ring-yellow-500 hover:opacity-[0.85] focus:border-yellow-500'
          //  disabled
    
        >
            Validate
        </button>
        <button
           className='bg-[#344248] h-[60px] mt-[5%] rounded text-white active:ring-1 active:ring-offset-2 active:ring-yellow-500 hover:opacity-[0.85] focus:border-yellow-500'
           disabled
           onClick = {handlePreviousClick}
        >
            Back
        </button>
                  <input
                  type="button"
                   name="submit"
                  className={
                    allDataValid ? "next action-button" : " disabled-button"
                  }
                  value="Submit"
                  onClick = {onSubmit}
                disabled={!allDataValid}
                
                />    
              </>         
     ):
           <>
                <input
                  type="button"
                  name="next"
                  className="btn next action-button"
                  value="Processing..."
                  disabled
                />
             </>

      }

                </>
      
                {/* <input
                  type="button"
                  name="next"
                  className="btn next action-button"
                  value="Processing..."
                  disabled
                /> */}
            

              <div
                className="d-flex align-items-center"
                ref={bottomRef}
                // ref={(el) => {
                //   bottomRef = el;
                // }}
              >
                <p className="text-danger align-self-center">
                  {error != null && error != "" ? error : validationError.error}
                </p>
              </div>
              <label>
                <b>
                  {" "}
                  <a
                    href="https://oap.providusbank.com/providus_files/reference-form.pdf"
                    target="_blank"
                    style={{ textDecoration: "none", color: "#efb331" }}
                  >
                    {" "}
                    Download Reference{" "}
                    <img
                      className="mr-2"
                      src={PDFIcon}
                      alt="reference"
                      width="25"
                    />
                  </a>
                </b>
              </label>

             
          
          </form>
          <br />
      
       
        
      </>
     

      <Terms showTerm={showTerm} handleClose={handleClose} />
      <Selfie
        showSelfie={showSelfie}
        handleClose={handleCloseSelfie}
        SubmitSelfie={SubmitSelfie}
      />
    
     
    </div>
    {
      submitting ? (
       <Loader/>

      ): null
     }
    </>
     
  );
};

export default BasicInformation;
