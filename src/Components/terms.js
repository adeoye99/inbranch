import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Terms({ showTerm, handleClose }) {
  //   const [show, setShow] = useState(false);

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onCpck={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal
        show={showTerm}
        onHide={handleClose}
        // style={{ height: "90vh", margin: "20px" }}
      >
        <Modal.Header closeButton style={{ justifyContent: "center" }}>
          <Modal.Title style={{ color: "#efb331" }}>Terms and Condition</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "20px" }}>
          
          <div style={{fontFamily:"garamond"}}>

         <p> 1. The Bank requires certain information and supporting documents to establish or operate the requested account(s); and reserves the right to decline Our account applications or Our money if We are unable to provide any of the information required.</p>
         <p>2. The Bank is hereby authorized to undertake all 'Know Your Customer' (KYC) procedures specified by applicable laws and /or regulations and/or Bank policies including the confirmation of our details and legal status at the appropriate government registry. We hereby authorize you to debit our account without further notice to us for costs attendant to such KYC procedures.</p>
         <p>3. The Bank may, without prior notice, impose or change the minimum balance requirements for Our account(s) or alter the applicable interest rate(s) for or the charges relating to such account(s) or any of them.</p>
         <p>4. The Bank is authorized to transfer money from any deposit account We maintain to any other account(s) We maintain with the Bank whose balance is below the required minimum.</p>
         <p>5. The Bank shall, in addition to any right of set-off or similar right prescribed by the law, be entitled, without notice, to combine and consolidate all or any of Our accounts with the bank (without any liabilities to the Bank) and/or to set off or transfer any or all amounts owed by us or a related party to the Bank against any and all money which the Bank may hold for Our account or any other credit be it cash, cheques, valuables, deposits, securities, negotiable instruments or other assets belonging to us whether held on current or deposit account or otherwise and whether in Naira or any other currency (hereinafter referred to as 'foreign currency').</p>
         <p>6. The Bank shall be entitled to retain and not repay any amount whatsoever that it owes to us or which it holds on our behalf and until all amounts owed by us or the related party to the Bank have been repaid or discharged in full and, for so long as such amounts have not been discharged or repaid in full, the Bank shall be entitled to appropriate any amounts so owed to us or held on Our behalf in or towards the payment and discharge of the amounts owed by us or Our related party to the Bank. 'Related Party' means an entity in which the Customer is a director/shareholder; or the Customer's spouse(s), sibling(s), child/children, and/or parent(s); or an entity in which the Customer's spouse, sibling, and/or parent is a director/shareholder.</p>
         <p>7. The Bank is hereby authorized, in the absence of any written instruction to the contrary, to place my funds in an appropriate investment (which for the purpose of this clause shall include but not be limited to investmentsin Commercial Paper whether guaranteed or otherwise) or on deposit and to renew/reinvest at maturity any investments or deposit made in my name on the same terms and conditions that applied to such investment/deposit immediately prior to its maturity or on such other terms and conditions as the Bank may, in absolute discretion, consider appropriate under the circumstances.</p>
         <p>8. I agree that where I give any instruction for a payment(s) that in aggregate exceed(s) the amounts standing to the credit of My account(s) against which payment is to be made, the Bank reserves the right to decline to carry out such instruction or where there is more than one transaction, to select the transaction that shall be executed without reference to the date of dispatch or time or receipt of my instructions. If the Bank in its discretion makes any such payment for which my account(s) is not funded, I confirm, my obligation to repay the Bank whether or not the Bank makes a demand, any outstanding sum in addition to charges and interest accrued thereon.</p>
         <p>9. Where any unclear effects credited to my account(s) by the Bank are subsequently dishonored and/or the Bank for any reason is required to repay to the paying banker or any other party, all or any part of any amount credited to my account, the Bank will be entitled to debit my account(s) with the amount of such unclear effects and/or repaid amounts plus accrued interest and applicable bank charges.</p>
         <p>10. No failure or delay in exercising any right, power or privilege vested in the Bank by these conditions, shall operate as a waiver thereof nor shall any partial exercise of such right, power or privilege preclude any other or further exercise thereof.</p>
         <p>11. If any of the conditions or the provisions specified herein are invalid, illegal or unforeseeable in any respect underthe law, the validity, legality and enforce-ability of the remaining conditions and/or provisions contained herein shall not in any manner be affected or impaired of charges and /or conditions thereof.</p>
         <p>12. I understand and acknowledge that electronic mail, facsimile and verbal communications are insecure transmission media. Where I advise the Bank to accept the instruction in such manner, I however undertake to indemnify the Bank in full for any loss it may suffer or incur by reason of its honoring my letters, electronic mail, facsimile or verbal instructions, irrespective of whether same are erroneous, fraudulent or issued otherwise in accordance with the mandate from my account(s). Any and all payments instructions issued in accordance with the mandate for my/our account(s) and which bears or purports to bear the facsimile or electronic mail signature of the person(s) whose specimen signatures have been provided to the Bank by me . The Bank is hereby authorized to honor and to debit my account for any and all payment instructions/confirmations issued or provided by me using a pre-agreed format for same which may include but is not limited to oral or written instructions/confirmations and where given orally, such oral instruction may, if previously agreed involves the use of specific password(s) and when given in writing.</p>
         <p>13. Any communication by the Bank shall be deemed to have been made as soon as it is sent to the most recent address provided by me and the date indicated on the duplicate copy of such letter or on the Bank's mailing list will constitute the date on which the communication was sent. Any statement or confirmation of any transaction between me and the Bank shall be deemed to have been examined by me and to be conclusive and binding unless within 10 working days from the date specified on such statement/confirmation, I advise the Bank in writing that an item contained therein is being disputed, whether or not such item was made in accordance with the mandate from time to time given by me to the Bank.</p>
         <p>14.I hereby affirm that I am aware that it is a crime under the laws of the Federal Republic of Nigeria to issue cheques without sufficient funds in Our account in the value of Our cheques and I hereby undertake to bear all consequences and/or liabilities arising from my instructions to the Bank to pay on cheques drawn on my account where such amount is not sufficiently funded with the value of my Cheques.</p>


            </div>
        </Modal.Body>
{/* 
        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button
            variant="secondary"
            onClick={() => Action(false)}
            style={{
              backgroundColor: "red",
              width: "30%",
              height: "50px",
            }}
          >
            Decline
          </Button>
          <Button
            variant="primary"
            onClick={() => Action(true)}
            style={{
              backgroundColor: "green",
              width: "30%",
              height: "50px",
            }}
          >
            Accept
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

// render(<Terms />);
