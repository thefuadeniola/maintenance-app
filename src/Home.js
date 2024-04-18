import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom'
import { db } from './firebase-config';
import './App.css'
import Post from './Components/Post'
import { collection, onSnapshot, orderBy } from 'firebase/firestore';
import { useStateContext } from './contexts/Context';
import SideNav from "./Components/SideNav";
import Pending from "./Components/Pending";


export default function Home() {
    const { currentUser } = useStateContext();
    const [posts, setPosts] = useState([]);
    const [details, setDetails] = useState([])
    const [all, setAll] = useState([])

    console.log(all)

    useEffect(() =>
        onSnapshot(collection(db, 'fixes'), (snapshot) => {
            setAll(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })).filter(fix => fix.username == currentUser.displayName))
        })
        , []
    )
    useEffect(() =>
    onSnapshot(collection(db, 'details'), (snapshot) => {
        setDetails(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    })
    ,[]
    )

    console.log(details)

    const allPosts = posts.map((post) => {
        return <Post key={post.id} avatar={post.avatar} postId={post.id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
    })

    if (!currentUser) {
        return <Navigate to='/' />
    }


    return (
        <main className="px-[4.89vw] pt-[20px] pl-[24vw]">
            <SideNav />
            <div className="w-full flex flex-col space-y-3 md:space-y-0 md:flex-row justify-between md:items-center">
                <div>
                    <h1 className="font-bold text-3xl">Hello {details[0]?.full_name}</h1>
                    <span className="flex flex-row gap-[4px] items-center">
                        <p className="text-semibold text-secondary-text">Matric No: {currentUser.displayName}</p>
                    </span>
                </div>
                <button className="btn-primary md:w-[200px] w-[100px]">
                    Report a Problem
                </button>
            </div>
            <h2 className="mt-[33px]">Pending Reports</h2>
            {
                all.length > 0 ? (<Pending all={all}/>) : <p className="text-left">You have no pending reports.</p>
            }
        </main>

    
    )
}