"use client"
import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Link from 'next/link';

function ShowSchools() {
  const [data, setData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSchool, setSelectedSchool] = useState(null);
  const[Loading,setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await fetch('https://edunify.onrender.com/api/v1/getSchool', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  const openModal = (school) => {
    setSelectedSchool(school);
    onOpen();
  };

  return (
    <div className="container mx-auto min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center my-4">School List</h1>
      <Link href="/pages/AddSchool">
        <button className="bg-blue-500 mb-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add School Data
        </button>
      </Link>
      {
        Loading ? <h1 className="text-3xl font-bold text-center my-4">Api is Live on Render It may Take Sometime to load Pls Wait ....</h1> : null
      }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((school) => (
          <div key={school.id} className="flex flex-col bg-white p-4 rounded shadow text-black">
            <h2 className="text-xl font-semibold mb-2">{school.name}</h2>
            <p className="mb-2">Email: {school.email_id}</p>
            <p>Contact Number: {school.contact_number}</p>
            <Button onPress={() => openModal(school)} className="mt-5">Show More</Button>
            <img src={school.imageUrl} alt="image" className="mt-3 mx-auto max-w-full h-auto" />
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {selectedSchool && (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">School Details</ModalHeader>
              <ModalBody className="text-black">
                <div className="flex flex-col bg-white p-4 rounded shadow text-black">
                  <div>
                    <p>Name: {selectedSchool.name}</p>
                    <p>Email: {selectedSchool.email_id}</p>
                    <p>Contact: {selectedSchool.contact_number}</p>
                    <p>City: {selectedSchool.city}</p>
                    <p>Address: {selectedSchool.address}</p>
                    <p>State: {selectedSchool.state}</p>
                  </div>
                  <a href={selectedSchool.imageUrl} target="_blank" rel="noopener noreferrer">
                    <img src={selectedSchool.imageUrl} alt="image" className="mt-3 mx-auto max-w-full h-auto" />
                  </a>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ShowSchools;
