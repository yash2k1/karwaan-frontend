'use client'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { ClipLoader } from 'react-spinners';
import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/redux/hooks";
import ResetPassword from "@/component/reset-password/ResetPassword";
import { toast } from "react-toastify";
import withAuth from "@/component/RoutesProtect/withAuth";

function page() {
    const router = useRouter();
    if (typeof window !== 'undefined') {
        var token = JSON.parse(localStorage.getItem('user') as string)?.token;
        var _id = JSON.parse(localStorage.getItem('user') as string)?._id;

        var { firstName, lastName, email, isEmailValid, isPhoneNumberValid, phoneNumber } = JSON.parse(localStorage.getItem("user") as string);
    }

    useEffect(() => {
        handleGetUser();
    }, []);

    type formType = {
        token: string,
        _id: string,
        firstName: string,
        lastName: string,
        email: string,
        oldPassword: string,
        confirmNewPassword: string,
        newPassword: string,
        phoneNumber: string
    }
    const [formData, setFormData] = useState<formType>({
        token: token,
        _id: _id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        oldPassword: "",
        confirmNewPassword: "",
        newPassword: "",
        phoneNumber: phoneNumber
    });
    const [modalOpen, setModalOpen] = useState<any>(false);
    type loading = {
        updateField: boolean,
        updateEmail: boolean,
        updatePass: boolean
    }
    const [isLoading] = useState<loading>({ updateField: false, updateEmail: false, updatePass: false });
    const { handleGetUser, handleDeleteUser } = useUser(formData);
    //  loading states
    const isUpdateUserLoading: boolean = useAppSelector((state: any) => state.userRequest.updateUser.loading);
    const isVerifyLoading: boolean = useAppSelector((state: any) => state.userRequest.sendVerifyEmail.loading);

    // update field
    var { handleUpdateFeilds, handleUpdateEmail, handleUpdatePhoneNumber, handleUpdatePassword } = useUser(formData);
    // phone number regex
    const phoneNumberRegex = /^[6-9]\d{9}$/;
    // verify email
    const { handleSendVerifyEmail } = useAuth(formData.email, null, null, null, token);

    // delete open and close logic
    const close = () => setModalOpen(false);
    const open = () => setModalOpen(true);


    // const {firstName,lastName,email}=useAppSelector((state)=>state.user.user);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    //   setBackdrop("blur")
    return (

        <div className={styles.myAccountContainer} >
            {/* <div className={styles.myAccountContainer} style={isOpen?{background:"rgba(0,0,0,0.8)"}:{background:"rgba(0,0,0,0)"}}> */}
            <h1 className={styles.heading}>my Account</h1>
            <div className={styles.myAccount} style={modalOpen ? { filter: "blur(3px)", height: "100vh" } : { background: "white" }} onClick={() => (modalOpen ? close() : "")}>

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
                    <button className={styles.submitButton} onClick={handleUpdateFeilds}

                        style={
                            !((firstName === formData.firstName) && (lastName === formData.lastName)) ?
                                { background: "black", pointerEvents: "all" } :
                                { background: "gray", pointerEvents: "none" }}>
                        {!isUpdateUserLoading || ((firstName === formData.firstName) && (lastName === formData.lastName)) ? "update fields" :
                            <div >
                                <ClipLoader color="white" size={15} speedMultiplier={0.5} />
                            </div>}
                    </button>
                </form>

                {/* Change Phone Number */}
                <div className={styles.changePhoneNo}>
                    <h2>change Phone number</h2>
                    <div className={styles.email}>
                        <input className={styles.inputField} type="number" name='phone' id='phone'
                            value={formData.phoneNumber}
                            onChange={(e) => {
                                setFormData({ ...formData, phoneNumber: e.target.value })
                            }} required />
                        <label className={`${styles.emailLable}${styles.lables}`}>Phone Number</label>
                    </div>
                    <button className={styles.submitButton}
                        onClick={(e) => {
                            e.preventDefault();
                            if (phoneNumberRegex.test(formData.phoneNumber!)) {
                                handleUpdatePhoneNumber(e);
                            } else {
                                toast.error("Invalid phone number");
                            }
                        }} style={(!(isPhoneNumberValid === true) || (formData.phoneNumber !== phoneNumber)) ? { background: "black" } : { background: "gray", pointerEvents: "none" }}>
                        {isUpdateUserLoading && (formData.phoneNumber !== phoneNumber || formData.phoneNumber === "") ?
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <ClipLoader color="white" cssOverride={{}} size={15} speedMultiplier={0.5} />
                            </div> :
                            (formData.phoneNumber === phoneNumber) && (formData.phoneNumber !== null) ? "verify Phone Number" : "Update Phone Number"
                        }
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
                        onClick={(e) => {
                            (email === formData.email) ?
                                handleSendVerifyEmail(e) :
                                handleUpdateEmail(e);
                        }
                        }
                        style={!((email === formData.email) && ((isEmailValid == true))) ? { background: "black" } : { background: "gray", pointerEvents: "none" }}>
                        {isVerifyLoading || ((email !== formData.email) && isUpdateUserLoading) ?
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <ClipLoader color="white" cssOverride={{}} size={15} speedMultiplier={0.5} />
                            </div> :
                            (email === formData.email) ?
                                "verify Email" :
                                "Update Email"
                        }
                    </button>
                </div>

                {/* change password */}
                <div className={styles.resetPassword}>
                    <ResetPassword token={token!} _id={_id!} />
                    <p className={styles.message} onClick={(e) => router.push('/forgot-password')}>Forgot Password ?</p>
                </div>

                {/* delete account*/}

                <div className={styles.deleteAccount}>
                    <h2>delete account</h2>
                    <Button className={styles.submitButton} style={{ width: "50px", height: "140px" }} onPress={onOpen}>Delete My Account</Button>
                    <Modal
                        style={{ filter: "brightness(0.6)" }}
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}

                    >
                        <ModalContent className={styles.deletePopUp}>
                            {(onClose) => (
                                <div >
                                    <ModalHeader className={styles.modalTittle}>This action cannot be undone.</ModalHeader>
                                    <ModalBody>
                                        <p>You will lose access to all your account, teams, credits, dataset, models, and plans. If you have an active subscription you will lose access to it. There are no refunds.SavePlease make sure you are certain about this action.</p>
                                    </ModalBody>
                                    <ModalFooter className={styles.deletePopUpButtons}>
                                        <Button className={styles.deletePopUpButton} variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button className={styles.deletePopUpButton} onPress={onClose} onClick={handleDeleteUser}>
                                            Delete
                                        </Button>
                                    </ModalFooter>
                                </div>
                            )}
                        </ModalContent>
                    </Modal>
                </div>
            </div>

        </div >
    )
}

export default withAuth(page);