import React, { useState } from 'react'
import { Button } from '@mui/material'
import { storage, db } from '../firebase-config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useStateContext } from '../contexts/Context'
import './ImageUpload.css'
import RootLayout from './layout'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { Form } from 'react-bootstrap'

const ImageUpload = () => {
    const { currentUser } = useStateContext();
    const [roomNo, setRoomNo] = useState('');
    const [hostelName, setHostelName] = useState('')
    const [description, setDescription] = useState('')
    const [urgency, setUrgency] = useState('')
    const [cost, setCost] = useState('')
    const [image, setImage] = useState(null)
    const navigate = useNavigate();

    const options = [
        { value: 'high', label: 'High' },
        { value: 'medium', label: 'Medium' },
        { value: 'low', label: 'Low' }
    ]


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
                        urgency: urgency,
                        roomNo: roomNo,
                        hostelName: hostelName
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
            <input type='text' className='input' placeholder='Room / Office Number' onChange={(e) => setRoomNo(e.target.value)} value={roomNo} />
            <input type='text' className='input' placeholder='Hostel / Office Name' onChange={(e) => setHostelName(e.target.value)} value={hostelName} />
            <input type='text' className='input' placeholder='Description' onChange={(e) => setDescription(e.target.value)} value={description} />
            <Form.Group controlId="formBasicSelect">
                <Form.Label>Select Urgency Level</Form.Label>
                <Form.Control as="select" 
                    onChange={e => {
                        setUrgency(e.target.value);
                      }}
                >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </Form.Control>
            </Form.Group>

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