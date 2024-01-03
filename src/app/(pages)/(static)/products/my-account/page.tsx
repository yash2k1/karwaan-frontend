'use client'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import React, {useState } from 'react'
import styles from './style.module.css'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { ClipLoader } from 'react-spinners';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function page() {
    const router = useRouter();
    if(typeof window !== 'undefined'){
    const  {token, _id } = JSON.parse(localStorage.getItem('user') as string);
    console.log("hi maam kaisi ho", _id,token)
    //to get user details
    const {handleGetUser}=useUser(token, _id);
     handleGetUser();
    var { firstName, lastName, email,isEmailValid ,isPhoneNumberValid,phoneNumber} = JSON.parse(localStorage.getItem("user") as string);
    //to update user fields
    var {handleUpdateFieldsUser}=useUser(token, _id);
    //to delete user
    var {handleDeleteUser}=useUser(token, _id);
    
}

    const [isPassVisible, setIsPassVisible] = useState({ existPass: false, newPass: false, confirmNewPass: false });
    type formType={ 
        firstName: string, 
        lastName: string,
         email: string,
          password: string,
           confirmNewPassword: string,
            newPassword: string ,
            phoneNo:string|null
        }
    const [formData, setFormData] = useState <formType>({ firstName: firstName, lastName: lastName, email: email, password: "", confirmNewPassword: "", newPassword: "" ,phoneNo:phoneNumber});
    const [modalOpen, setModalOpen] = useState<any>(false);
    type loading={
        updateField:boolean,
        updateEmail:boolean,
        updatePass: boolean
    }
    const [isLoading] = useState<loading>({updateField:false,updateEmail:false,updatePass:false});
    const close = () => setModalOpen(false);
    const open = () => setModalOpen(true);

console.log(formData.phoneNo,typeof(formData.phoneNo),phoneNumber,typeof(phoneNumber+""),phoneNumber+"")
console.log("kya sahi bola", ""=="")
    
    // const {firstName,lastName,email}=useAppSelector((state)=>state.user.user);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
//   setBackdrop("blur")
    return (
        
        <div className={styles.myAccountContainer} >
        {/* <div className={styles.myAccountContainer} style={isOpen?{background:"rgba(0,0,0,0.8)"}:{background:"rgba(0,0,0,0)"}}> */}
            <h1 className={styles.heading }>my Account</h1>
        <div className={styles.myAccount} style={modalOpen?{filter:"blur(3px)",height:"100vh"}:{background:"white"}} onClick={() => (modalOpen ? close() :"")}>
            {/* change fields */}

            <form className={styles.myAccountForm} >
                <h2>change fields</h2>
                <div className={styles.userName}>
                    <input className={styles.inputField} type="text" name='userFirstName' id='userFirstName'
                        value={formData.firstName}
                        onChange={(e) => {
                            setFormData({ ...formData, firstName: e.target.value })
                        }} required />
                    <label className={`${styles.nameLable}${styles.lables}`}>First Name</label>
                </div>
                <div className={styles.userName}>
                    <input className={styles.inputField} type="text" name='userLastName' id='userLastName'
                        value={formData.lastName}
                        onChange={(e) => {
                            setFormData({ ...formData, lastName: e.target.value })
                        }} required />
                    <label className={`${styles.nameLable}${styles.lables}`}>Last Name</label>
                </div>

                <button className={styles.submitButton} 
                // onClick={handleUpdateFieldsUser}
                    style={!((firstName === formData.firstName) && (lastName === formData.lastName)) ? { background: "black" } : { background: "gray", pointerEvents: "none" }}>
                       update fields
                       {/* <span style={{marginRight:"10px"}}>update fields</span>  */}
                       {/* <div style={isLoading?{opacity:0}:{opacity:1}}> */}
                       <div style={!isLoading.updateField?{display:"none"}:{display:"flex",alignItems:"center"}}>
                        <ClipLoader  color="white" cssOverride={{}}  size={15} speedMultiplier={0.5}/>
                       </div>
                       </button>
            </form>

            {/* Change Phone Number */}
            <div className={styles.changePhoneNo}>
                <h2>change Phone number</h2>
                <div className={styles.email}>
                    <input className={styles.inputField} type="number" name='phone' id='phone'
                        value={formData.phoneNo as string}
                        onChange={(e) => {
                            setFormData({ ...formData, phoneNo: e.target.value })
                        }} required />
                    <label className={`${styles.emailLable}${styles.lables}`}>Phone Number</label>
                </div>
                <button className={styles.submitButton}
                    onClick={() => router.push("/shop/delete-account")}  style={(!(isPhoneNumberValid===true)||( formData.phoneNo!=phoneNumber))? { background: "black" } : { background: "gray", pointerEvents: "none" }}>
                     {  ( formData.phoneNo===phoneNumber)&&(phoneNumber!==null) ?"verify Phone Number":"Update Phone Number"}
                       <div style={!isLoading.updateEmail?{display:"none"}:{display:"flex",alignItems:"center"}}>
                       <ClipLoader  color="white" cssOverride={{}}  size={15} speedMultiplier={0.5}/>
                       </div>
                    </button>
            </div>
            {/* change email */}
            <div className={styles.changeEmail}>
                <h2>change email</h2>
                <div className={styles.email}>
                    <input className={styles.inputField} type="text" name='email' id='email'
                        value={formData.email}
                        onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value })
                        }} required />
                    <label className={`${styles.emailLable}${styles.lables}`}>Email</label>
                </div>
                <button className={styles.submitButton}
                    onClick={() => router.push("/shop/delete-account")}  style={!((email === formData.email)&&(!(isEmailValid==false)))? { background: "black" } : { background: "gray", pointerEvents: "none" }}>
                     {  (email === formData.email) ?"verify Email":"Update Email"}
                       <div style={!isLoading.updateEmail?{display:"none"}:{display:"flex",alignItems:"center"}}>
                       <ClipLoader  color="white" cssOverride={{}}  size={15} speedMultiplier={0.5}/>
                       </div>
                    </button>
            </div>

            {/* change password */}

            <div className={styles.resetPassword}>
                <h2>change password</h2>
                <div className={styles.password}>
                    <input className={styles.inputField} type={isPassVisible.existPass ? "text" : "password"} name='password' id='ExistPassword'
                        value={formData.password}
                        onChange={(e) => {
                            setFormData({ ...formData, password: e.target.value })
                        }} required />
                    <label className={`${styles.passwordLable}${styles.lables}`}>Exisiting password</label>
                    <div className={styles.visibility} onClick={() => setIsPassVisible({ existPass: !isPassVisible.existPass, newPass: false, confirmNewPass: false })}>{isPassVisible.existPass ? <VisibilityOutlinedIcon className={styles.VisibleIcon} /> : <VisibilityOffOutlinedIcon className={styles.VisibleIcon} />}</div>
                </div>
                <div className={styles.password}>
                    <input className={styles.inputField} type={isPassVisible.newPass ? "text" : "password"} name='password' id='newPassword'
                        value={formData.newPassword}
                        onChange={(e) => {
                            setFormData({ ...formData, newPassword: e.target.value })
                        }} required />
                    <label className={`${styles.passwordLable}${styles.lables}`}>New password</label>
                    <div className={styles.visibility} onClick={() => setIsPassVisible({ existPass: false, newPass: !isPassVisible.newPass, confirmNewPass: false })}>{isPassVisible.newPass ? <VisibilityOutlinedIcon className={styles.VisibleIcon}/> : <VisibilityOffOutlinedIcon className={styles.VisibleIcon} />}</div>
                </div>
                <div className={styles.password}>
                    <input className={styles.inputField} type={isPassVisible.confirmNewPass ? "text" : "password"} name='password' id='confirmNewPassword'
                        value={formData.confirmNewPassword}
                        onChange={(e) => {
                            setFormData({ ...formData, confirmNewPassword: e.target.value })
                        }} required />
                    <label className={`${styles.passwordLable}${styles.lables}`}>Confirm new password</label>
                    <div className={styles.visibility} onClick={() => setIsPassVisible({ existPass: false, newPass: false, confirmNewPass: !isPassVisible.confirmNewPass })}>{isPassVisible.confirmNewPass ? <VisibilityOutlinedIcon className={styles.VisibleIcon}/> : <VisibilityOffOutlinedIcon className={styles.VisibleIcon} />}</div>
                </div>
                <button className={styles.submitButton}
                    onClick={() => router.push("/shop/delete-account")}
                   >Change Password
                        <div style={!isLoading.updatePass?{display:"none"}:{display:"flex",alignItems:"center"}}>
                        <ClipLoader  color="white" cssOverride={{}}  size={15} speedMultiplier={0.5}/>
                       </div>
                    </button>
            </div>

            {/* delete account*/}

            <div className={styles.deleteAccount}>
                <h2>delete account</h2>
                {/* <button className={styles.submitButton}
                    onClick={() => router.push("/shop/delete-account")}>Delete My Account</button> */}
                      <Button  className={styles.submitButton} style={{width:"50px",height:"140px"}} onPress={onOpen}>Delete My Account</Button>
      <Modal 
        backdrop="blur" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
   
      >
        <ModalContent  className={styles.deletePopUp}>
          {(onClose) => (
            <div >
              <ModalHeader className={styles.modalTittle}>This action cannot be undone.</ModalHeader>
              <ModalBody>
             <p>You will lose access to all your account, teams, credits, dataset, models, and plans. If you have an active subscription you will lose access to it. There are no refunds.SavePlease make sure you are certain about this action.</p>
              </ModalBody>
              <ModalFooter  className={styles.deletePopUpButtons}>
                <Button className={styles.deletePopUpButton} variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button  className={styles.deletePopUpButton} onPress={onClose} onClick={handleDeleteUser}>
                  Delete
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
            </div>
        </div>
        <ToastContainer
    position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark" />
    </div>
    )
}

export default page