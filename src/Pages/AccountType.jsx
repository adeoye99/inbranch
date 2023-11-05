import React , { useState } from 'react'



const AccountypeDropdowndata = [
    {
      id: 1,
      type: "Current",
      accountCategoryType: "Individual Account",
      subAccountCategoryType: "Current Account",
      requirements: [
        {
          id: 1,
          required: "Specimen Signature",
        },
        {
          id: 2,
          required: "Passport photograph",
        },
        {
          id: 3,
          required: " Utility Bill",
        },
        {
          id: 4,
          required: "Completed Account Opening form and Mandate Card",
        },
        {
          id: 5,
          required:
            "Valid Identification (NIN, Voter’s card, International Passport, Driver’s License)",
        },
      ],
    },
    {
      id: 2,
      type: "Savings",
      accountCategoryType: "Individual Account",
      subAccountCategoryType: "Savings Account",
      requirements: [
        {
          id: 1,
          required: "Specimen Signature",
        },
        {
          id: 2,
          required: "Passport photograph",
        },
        {
          id: 3,
          required: " Utility Bill",
        },
        {
          id: 4,
          required: "Completed Account Opening form and Mandate Card",
        },
        {
          id: 5,
          required:
            "Valid Identification (NIN, Voter’s card, International Passport, Driver’s License)",
        },
      ],
    },
    {
      id: 3,
      type: "Corporate Account (sole proprietorship)",
      accountCategoryType: "Corporate Account",
      subAccountCategoryType: "Sole proprietorship",
      requirements: [
        {
          id: 1,
          required: "BVN of all Signatories and Directors",
        },
        {
          id: 2,
          required: "Valid ID Card of all Signatories and Directors",
        },
        {
          id: 3,
          required: "Certificate of Registration",
        },
        {
          id: 4,
          required:
            "Application form for Registration of Business Name (CAC Form 2.1)",
        },
        {
          id: 5,
          required: "TIN/Tax Clearance Certificate/Personal Tax ID",
        },
        {
          id: 6,
          required: "Utility Bill/ Address Verification",
        },
        {
          id: 7,
          required: "Completed Account Opening form and Mandate Card",
        },
      ],
    },
    {
      id: 4,
      type: "Corporate Account (Limited Liability Company)",
      accountCategoryType: "Corporate Account",
      subAccountCategoryType: "Limited Liability Company",
      requirements: [
        {
          id: 1,
          required: "BVN of all Signatories and Directors",
        },
        {
          id: 2,
          required: "Valid ID Card of all Signatories and Directors",
        },
        {
          id: 3,
          required: "Certificate of Incorporation",
        },
        {
          id: 4,
          required: "Board Resolution Under Seal",
        },
        {
          id: 5,
          required:
            "Memorandum & Articles of Association CTC (Certified True Copy)",
        },
        {
          id: 6,
          required: "Form CO2 and CO7",
        },
        {
          id: 7,
          required: "TIN/Tax Clearance Certificate",
        },
        {
          id: 8,
          required: "Utility Bill/ Address Verification",
        },
        {
          id: 9,
          required: "Completed Account Opening form and Mandate Card",
        },
      ],
    },
    {
      id: 5,
      type: "Corporate Account (MFB’s and OFI’s)",
      accountCategoryType: "Corporate Account",
      subAccountCategoryType: "MFB’s and OFI’s",
      requirements: [
        {
          id: 1,
          required:
            "BVN of all Signatories, Directors and Shareholders with 5% and above shareholding ",
        },
        {
          id: 2,
          required:
            "Valid ID Card of all Signatories and Directors and all beneficial owners ",
        },
        {
          id: 3,
          required: "Evidence of TIN/Tax Clearance Certificate ",
        },
        {
          id: 4,
          required:
            "Corporate Affairs Commission (CAC) Certificate & Incorporation documents to operate as an MFB/Financial Institution ",
        },
        {
          id: 5,
          required: "CBN Operating License ",
        },
        {
          id: 6,
          required: "Utility Bill/ Address Verification ",
        },
        {
          id: 7,
          required: "Board Resolution under seal",
        },
        {
          id: 8,
          required: "Completed Account Opening form and Mandate Card",
        },
      ],
    },
    {
      id: 6,
      type: "Corporate Account (Fintechs)",
      accountCategoryType: "Corporate Account",
      subAccountCategoryType: "Fintechs",
      requirements: [
        {
          id: 1,
          required:
            "BVN of all Signatories, Directors and Shareholders with 5% and above shareholding ",
        },
        {
          id: 2,
          required:
            "Valid ID Card of all Signatories and Directors and all beneficial owners ",
        },
        {
          id: 2,
          required: "Evidence of TIN/Tax Clearance Certificate ",
        },
        {
          id: 3,
          required:
            "Corporate Affairs Commission (CAC) Certificate & Incorporation documents to operate as an MFB/Financial Institution ",
        },
        {
          id: 4,
          required: "CBN Operating License ",
        },
        {
          id: 5,
          required: "Utility Bill/ Address Verification ",
        },
        {
          id: 6,
          required: "Board Resolution under seal",
        },
        {
          id: 7,
          required: "Completed Account Opening form and Mandate Card",
        },
      ],
    },
    {
      id: 7,
      type: "Corporate Account (Partnership account)",
      accountCategoryType: "Corporate Account",
      subAccountCategoryType: "Partnership account",
      requirements: [
        {
          id: 1,
          required: "BVN of all Signatories and Directors",
        },
        {
          id: 2,
          required: "Valid ID Card of all Signatories and Directors",
        },
        {
          id: 3,
          required: "Certificate of Registration",
        },
        {
          id: 4,
          required:
            "Application form for Registration of Business Name (CAC Form 2.1)",
        },
        {
          id: 5,
          required: "TIN/Tax Clearance Certificate/Personal Tax ID",
        },
        {
          id: 6,
          required: "Partnership Deed ",
        },
        {
          id: 7,
          required: "Utility Bill/ Address Verification",
        },
        {
          id: 8,
          required: "Completed Account Opening form and Mandate Card",
        },
      ],
    },
  ];

const AccountType = ( {handleNextClick}) => {


    const [accountType, setAccountType] = useState("");
    const [requirements, setRequirements] = useState([]);
 
    const [numberOfSignatories, setNumberOfSignatories] = useState("");

  

  const handleAccountTypeOnChange = (e) => {
    setAccountType(e.currentTarget.value);

    sessionStorage.setItem("accountType", e.currentTarget.value);
    let selecteditem = AccountypeDropdowndata?.filter(
      (item) => item.type === e.currentTarget.value
    );
    setRequirements(selecteditem[0]?.requirements);

    sessionStorage.setItem(
      "accountCategoryType",
      selecteditem[0]?.accountCategoryType
    );
    sessionStorage.setItem(
      "subAccountCategoryType",
      selecteditem[0]?.subAccountCategoryType
    );
  };
  const handleNumberOfSignatoriesChange = (e) => {
    setNumberOfSignatories(e.target.value);
    sessionStorage.setItem("no.ofsignatories", e.target.value);
  };



  return (
    <div className='md:w-[55%] grid grid-cols-1 mt-[10px] '>
         <label className='text-black font-semibold'>Account Type</label>
        <select
          className='border border-black border h-[61px] mt-[2%] pl-4 focus:border focus:outline-yellow-500 rounded '
          placeholder='Select Account Type'
          value={accountType}
          onChange={handleAccountTypeOnChange}
          required
        >
              <option value="">Select Account Type</option>
              {AccountypeDropdowndata.map((item) => {
                        return (
                          <option className = "" key={item.type} value={item.type}>
                            {item.type}
                          </option>
                        );
                      })}
        </select>

        {accountType === "Corporate Account (sole proprietorship)" ||
                accountType ===
                  "Corporate Account (Limited Liability Company)" ||
                accountType === "Corporate Account (MFB’s and OFI’s)" ||
                accountType === "Corporate Account (Fintechs)" ||
                accountType === "Corporate Account (Partnership account)" ? (
                  <div className="grid grid-cols-1 mt-[20px]">
                    <label
                      className={numberOfSignatories !== "" ? "" : "text-danger"}
                      htmlFor="exampleFormControlSelect1"
                    >
                      Number of Signatories/Directors  <sup className="text-danger">*</sup>
                    </label>
                    <input
                      type="text"
                      className='border border-black h-[50px] mt-[10px] pl-4 focus:border-none focus:outline-yellow-500 '
                 
                      placeholder="Number of signatories"
                      value={numberOfSignatories}
                      onChange={handleNumberOfSignatoriesChange}
                      
                    />
                  </div>
                ) : (
                  ""
                )}
        <button

           className={`h-[60px] mt-[5%] rounded text-white  ${
            accountType === "Current" ||
            accountType === "Savings" ||
            ((accountType ===
              "Corporate Account (sole proprietorship)" ||
              accountType ===
                "Corporate Account (Limited Liability Company)" ||
              accountType === "Corporate Account (MFB’s and OFI’s)" ||
              accountType === "Corporate Account (Fintechs)" ||
              accountType ===
                "Corporate Account (Partnership account)") &&
              numberOfSignatories)
              ? "bg-[#FDB815] active:ring-1 active:ring-offset-2 active:ring-yellow-500 hover:opacity-[0.85] focus:border-yellow-500"
              : "bg-[#FDB81533]"
          }`} 

           disabled={
            !accountType ||
            ((accountType ===
              "Corporate Account (sole proprietorship)" ||
              accountType ===
                "Corporate Account (Limited Liability Company)" ||
              accountType === "Corporate Account (MFB’s and OFI’s)" ||
              accountType === "Corporate Account (Fintechs)" ||
              accountType ===
                "Corporate Account (Partnership account)") &&
              !numberOfSignatories)
          }
           onClick={handleNextClick}
        >
            Next
        </button>
        <div className="mt-4 ">
                {accountType ? (
                  <p
                    className="text-center text-medium font-bold"
                  >
                    Minimum Requirements
                  </p>
                ) : (
                  ""
                )}
                <div className="container-fluid ">
                  <ol className=" min_require ">
                    {requirements?.map((item) => {
                      return (
                        <li className="mt-[2px] flex text-sm gap-x-2" key={item.id}>
                          {" "}
                          {item.id}
                          <p className='ml-2'> {item.required} </p>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>


    </div>
  )
}

export default AccountType