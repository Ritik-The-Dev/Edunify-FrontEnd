"use client"
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AddSchool() {
    const [data,setdata] = useState({
        name:'',
        address:'',
        city:'',
        state:'',
        contact_number:'',
        email_id:''
    })
    const [image,setImage] = useState(null)

const handleSubmit = async (e) => {
  e.preventDefault();

  if(!data.name,!data.email_id,!data.contact_number,!data.state,!data.city,!data.address,!image){
    toast("All Fields are Required")
  }

  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('address', data.address);
  formData.append('city', data.city);
  formData.append('email_id', data.email_id);
  formData.append('state', data.state);
  formData.append('contact_number', data.contact_number);
  
  // Append the file to the FormData
  formData.append('image', image);
  console.log("formData",formData)
  
  try {
    const response = await fetch('https://edunify.onrender.com/api/v1/addSchool', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      if(result.success === "true"){
        setdata({
          name:'',
          address:'',
          city:'',
          state:'',
          contact_number:'',
          email_id:''
      })
        toast("School Has been Successfully Added")
      }
    } else {
      const text = await response.text();
      console.error('Failed to submit data. Server response:', text);
    }
  } catch (error) {
    toast(`Error -: ${error}`)
    console.error('Error:', error);
  }
};

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setdata((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
      };
  return (
    <div className='h-[100vh] flex justify-center items-center flex-col'>
        <h1  className='text-center  font-extrabold mb-5 text-xl'>Add School Info</h1>
     <div className="w-full max-w-md">
     <ToastContainer />
        <div className="bg-white rounded shadow p-6 ">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1 text-black">Name</label>
              <input type="text" id="name" name='name' className="w-full p-2 border text-black   border-gray-300 rounded" value={data.name} onChange={handleChange}/>
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block mb-1 text-black">Address</label>
              <input type="text" id="address" name='address' className="w-full p-2 border text-black     border-gray-300 rounded" value={data.address} onChange={handleChange}/>
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block mb-1 text-black">City</label>
              <input type="text" id="city" name='city' className="w-full p-2 border text-black   border-gray-300 rounded" value={data.city} onChange={handleChange}/>
            </div>
            <div className="mb-4">
              <label htmlFor="state" className="block mb-1 text-black">State</label>
              <input type="text" id="state" name='state' className="w-full p-2 border text-black     border-gray-300 rounded" value={data.state} onChange={handleChange}/>
            </div>
            <div className="mb-4">
              <label htmlFor="contact" className="block mb-1 text-black">Contact</label>
              <input type="number" id="contact" name='contact_number' className="w-full p-2 border text-black   border-gray-300 rounded" value={data.contact_number} onChange={handleChange}/>
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block mb-1 text-black">Image</label>
              <input type="file" id="image" name='image' className="w-full p-2 border text-black     border-gray-300 rounded" onChange={handleImageChange}/>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 text-black">Email</label>
              <input type="email" id="email" name='email_id' className="w-full p-2 border text-black    border-gray-300 rounded" value={data.email_id} onChange={handleChange}/>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded w-full" onClick={handleSubmit}>Submit</button>
          </form>
        </div>
     </div>
     </div>
  )
}

export default AddSchool
