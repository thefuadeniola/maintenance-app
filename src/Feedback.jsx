import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom'
import { db } from './firebase-config';
import './App.css';
import { collection, onSnapshot, orderBy } from 'firebase/firestore';
import { useStateContext } from './contexts/Context';
import SideNav from "./Components/SideNav";
import Pending from "./Components/Pending";
import { Link } from "react-router-dom";


export default function Feedback() {
    const { currentUser } = useStateContext();
    const [posts, setPosts] = useState([]);
    const [details, setDetails] = useState([])
    const [all, setAll] = useState([])

    console.log(currentUser)

    useEffect(() =>
        onSnapshot(collection(db, 'fixes'), (snapshot) => {
            setAll(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })).filter(fix => fix.username == currentUser.displayName).filter(fix => fix.feedback))
        })
        , []
    )
    useEffect(() =>
        onSnapshot(collection(db, 'details'), (snapshot) => {
            setDetails(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })).filter(obj => obj.username == currentUser.displayName))
        })
    ,[]
    )

    console.log(details)

    if (!currentUser) {
        return <Navigate to='/' />
    }


    return (
        <main className="pt-[24px] pl-[14vw] relative w-full">
            <SideNav />
            <div className="w-full flex flex-col space-y-3 md:space-y-0 md:flex-row justify-between md:items-center">
                <div>
                    <h1 className="font-bold text-3xl">Hello {details[0]?.full_name}</h1>
                    <span className="flex flex-row gap-[4px] items-center">
                        <p className="text-semibold text-secondary-text">{details[0]?. type == 'staff' ? 'Staff Username:' : 'Matric No:'} {currentUser.displayName}</p>
                    </span>
                </div>
                <Link to='/report' className="btn-primary md:w-[200px] w-[100px] flex items-center justify-center no-underline">
                    Report a Problem
                </Link>
            </div>
            <h3 className="mt-[33px]">Feedback</h3>
            <p className="mt-2">Here is a list of received feedback from the admin. To report a new problem, go to <Link to='/report'>report</Link></p>
            {
                all.length > 0 ? ( all.map((single) => (
                  <div className="garb_item shadow-md">
                    <div className='feedback py-2 shadow-md px-[12px] text-secondary-text'>
                        <div className='flex flex-col'>
                            <span className='text-base text-dark '>{single.description}</span>
                            <span className='text-sm'>Room {single.roomNo}</span>
                            <span className="italic text-black">Feedback: {single.feedback}</span>
                            {single.cost && <span className="text-sm">Cost: {single.cost}</span>}
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <div className='flex flex-row items-center space-x-[4px] justify-end'>
                                <span className='text-[11px]'>{single.urgency}</span>
                                <span className={`urgency ${single.urgency == 'high' && 'bg-red'} ${single.urgency == 'medium' && 'bg-orange'} ${single.urgency == 'low' && 'bg-primary-green'}`}></span>
                            </div>
                        </div>
                    </div>
                  </div>

                ))
  
                ) : <p className="text-left">You have no received feedback.</p>
            }
        </main>

    
    )
}