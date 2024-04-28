import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom'
import { db } from './firebase-config';
import './App.css';
import { collection, onSnapshot, orderBy } from 'firebase/firestore';
import { useStateContext } from './contexts/Context';
import SideNav from "./Components/SideNav";
import Pending from "./Components/Pending";
import { Link } from "react-router-dom";


export default function Home() {
    const { currentUser } = useStateContext();
    const [posts, setPosts] = useState([]);
    const [details, setDetails] = useState([])
    const [all, setAll] = useState([])

    console.log(currentUser)

    useEffect(() =>
        onSnapshot(collection(db, 'fixes'), (snapshot) => {
            setAll(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })).filter(fix => fix.username == currentUser.displayName))
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
        <main className="px-[4.89vw] pt-[20px] pl-[24vw] relative">
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
            <h2 className="mt-[33px]">Pending Reports</h2>
            <p className="mt-2">Here is a list of your pending reports. To see the cost and feedback, go to <Link to='/feedback'>feedback</Link></p>
            {
                all.length > 0 ? (<Pending all={all}/>) : <p className="text-left">You have no pending reports.</p>
            }
        </main>

    
    )
}