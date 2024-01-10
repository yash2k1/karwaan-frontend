'use client'
import React, { useEffect, useState } from 'react'
import styles from "./style.module.css"
import { ClipLoader } from 'react-spinners'
import { useSearchParams } from 'next/navigation'
import { useUser } from '@/hooks/useUser';

function page (){
 
const searchParams = useSearchParams()
//  const router=useRouter();
const token = searchParams.get('token');
const _id = searchParams.get('id');

   
    const {handleVerifyMailUser} = useUser(token,_id);
   useEffect(()=>{
    if(token&&_id)
    handleVerifyMailUser();
   },[_id,token]) 

  return (
    <div className={styles.verifyEmail}>
  <div className={styles.verifyEmailSpinner} style={{display:"flex",alignItems:"center"}}>
 <ClipLoader  color="blue"  size={40} speedMultiplier={0.5}/>
</div>
 <h1>{"Processing..."}</h1>

    </div>
  )
}

export default page
