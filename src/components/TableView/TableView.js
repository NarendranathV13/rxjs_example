import React, { useState, useEffect } from "react";
import { GetAxiosData, DeleteAxiosData } from "../../Api/ApiMethods";
import { CountService } from "../../service/Count.service";


const TableView = () => {
    const [userData, setUserData] = useState([]);
    const [deleteCount, setDeleteCount] = useState(0)

    useEffect(() => {
        GetAxiosData("/Formdata")
            .then(response => {
                setUserData(response.data);
                CountService.sendTotal(response.data.length)
                const initDeleteCount = localStorage.getItem("deleteCount");
                CountService.deletedUser( initDeleteCount ? initDeleteCount :0)
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);
    const handleDeleteUser = (id) => {
        DeleteAxiosData(`/Formdata/${id}`)
            .then(response => {
                // Fetch data again after deletion
                GetAxiosData("/Formdata")
                    .then(response => {
                        setUserData(response.data);
                        CountService.sendTotal(response.data.length)
                        // Increment delete count
                        setDeleteCount(deleteCount + 1);
                        // Save delete count to local storage
                        localStorage.setItem('deleteCount', deleteCount + 1);
                        const deleteCountSaved = localStorage.getItem('deleteCount');

                        // Pass the delete count to CountService
                        CountService.deletedUser(deleteCountSaved);
                    })
                    .catch(error => {
                        console.error("Error fetching data:", error);
                    });
            })
            .catch(error => {
                console.error("Error deleting user:", error);
            });
       
    }


    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Pincode</th>
                        <th scope="col">Country</th>
                        <th scope="col">State</th>
                        <th scope="col">City</th>
                        <th scope="col">Delete User</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map(user => (
                        <tr key={user.id}>
                            <th scope="row">{user.id}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.pincode}</td>
                            <td>{user.country}</td>
                            <td>{user.state}</td>
                            <td>{user.city}</td>
                            <td>

                                <i
                                    className="fa-solid fa-trash me-2 mx-2"
                                    style={{ color: "#b22a2a", cursor: 'pointer' }}
                                    onClick={() => handleDeleteUser(user.id)}
                                ></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default TableView;
