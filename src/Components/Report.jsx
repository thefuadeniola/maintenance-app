import React, { useState } from 'react'
import { Button } from '@mui/material'
import { storage, db } from '../firebase-config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useStateContext } from '../contexts/Context'
import './ImageUpload.css'
import RootLayout from './layout'
import { useNavigate } from 'react-router-dom'

const ImageUpload = () => {
    const { currentUser } = useStateContext();
    const [roomNo, setRoomNo] = useState('')
    const [description, setDescription] = useState('')
    const [urgency, setUrgency] = useState('')
    const [cost, setCost] = useState('')
    const [image, setImage] = useState(null)
    const navigate = useNavigate();


    //    const [url, setUrl] = useState('')
    const [progress, setProgress] = useState(0)
    const fixesCollectionRef = collection(db, 'fixes')

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        if (!image) {
            alert('Choose an image to upload!')
        }
        const storageRef = ref(storage, `images/${image.name}`)
        const uploadTask = uploadBytesResumable(storageRef, image)
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgress(percent)
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
                    await addDoc(fixesCollectionRef, {
                        timestamp: serverTimestamp(),
                        username: currentUser.displayName,
                        imageUrl: url,
                        description: description,
                        cost: cost,
                        urgency: urgency,
                        roomNo: roomNo
                    })
                    navigate('/home')
                    setImage(null)
                })
            }
        )
    }

    return (
      <>
        <RootLayout />
        <div className='image__upload'>
          <h2 className='font-semibold'>Report Problem</h2>
            <input type='text' className='input' placeholder='Room Number' onChange={(e) => setRoomNo(e.target.value)} value={roomNo} />
            <input type='text' className='input' placeholder='Description' onChange={(e) => setDescription(e.target.value)} value={description} />
            <input type='number' className='input' placeholder='Urgency Level' onChange={(e) => setUrgency(e.target.value)} value={urgency} />
            <input type='text' className='input' placeholder='Cost' onChange={(e) => setCost(e.target.value)} value={cost} />


            <div className='mt-[33px]'>
            <p className='font-semibold text-sm text-secondary-text'>Add a picture of the damage</p>
            <div className='waste_image flex justify-center items-center flex-row space-x-[40px] mt-[5px]'>
            <input type='file'onChange={handleChange} accept='.jpg, .png, .jfif, .jpeg, .gif' />

            </div>
            </div>

            <button className='upload_btn' onClick={handleUpload}>
                Upload
            </button>
        </div>

      </>
    )
}

export default ImageUpload