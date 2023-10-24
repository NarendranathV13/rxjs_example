import React, { useState, useEffect } from "react";
import { GetAxiosData, EditAxiosData } from "../../Api/ApiMethods";
import { CountService } from "../../service/Count.service";
import { distinct, from } from "rxjs";
import { filter, take } from "rxjs";

const TableView = () => {
    const [userData, setUserData] = useState([]);
    const [deleteCount, setDeleteCount] = useState(0);
    useEffect(() => {
        GetAxiosData("/Formdata")
            .then(response => {
                setUserData(response.data);
                CountService.sendTotal(response.data.length)
                const initDeleteCount = localStorage.getItem("deleteCount");
                CountService.deletedUser(initDeleteCount ? initDeleteCount : 0)
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);
    const showAll = () => {
        GetAxiosData("/Formdata")
            .then(response => {
                setUserData(response.data);
                CountService.sendTotal(response.data.length)
                const initDeleteCount = localStorage.getItem("deleteCount");
                CountService.deletedUser(initDeleteCount ? initDeleteCount : 0)
                console.log("show all")
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }

    const handleDeleteUser = (id) => {
        const userToUpdate = userData.find(user => user.id === id);
        if (!userToUpdate) {
            return;
        }
        const updatedUser = {
            ...userToUpdate,
            active_status: false
        };

        EditAxiosData(`/Formdata/${id}`, updatedUser)
            .then(response => {

                GetAxiosData("/Formdata")
                    .then(response => {
                        setUserData(response.data);
                        CountService.sendTotal(response.data.length);
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
                console.error("Error updating user:", error);
            });
    }
    // const handleFilter = (status) => {
    //     setActive(status);
        
    // }
    // useEffect(() => {
    //     const source$ = from(userData);
    //     const filteredData$ = source$.pipe(
    //         filter(item => item.active_status === active)
    //     );
    //     const subscription = filteredData$.subscribe(result => {
            
    //         setUserData(prevData => [...prevData, result]);
    //         console.log(result, "result")
    //     });
    //     return () => {subscription.unsubscribe();
    //         setUserData([])};
    // }, [active]);

    const handleActiveClick = () =>{
        setUserData([])
        const source$ = from(userData);
        const filteredData$ = source$.pipe(
            filter(item => item.active_status === true),
            distinct(user => user.id), // Apply distinct on user IDs
            take(5)
        );
        console.log("active")
        const subscription = filteredData$.subscribe(result => {
            
            setUserData(prevData => [...prevData, result]);
            console.log(result, "result")
        });
        return () => {
            subscription.unsubscribe();
           
        };
    }
    const handleInActiveClick = () =>{
        setUserData([])
        const source$ = from(userData);
        const filteredData$ = source$.pipe(
            filter(item => item.active_status === false),
            distinct(user => user.id), // Apply distinct on user IDs
        );
        const subscription = filteredData$.subscribe(result => {
            setUserData(prevData => [...prevData, result]);
            console.log(result, "result")
           
        });
        console.log("in-active", userData)
        return () => {
            subscription.unsubscribe();
        };
    }
    return (
        <>
            <div className=" container">
                <div className=" row d-flex justify-content-between">
                    <div className=" col-lg-">
                        <button type="button" className="btn btn-warning" onClick={() => handleActiveClick()}>Active</button>
                    </div>
                    <div className=" col-lg-4">
                        <button type="button" className="btn btn-info" onClick={() => handleInActiveClick()}>In-Active</button>
                    </div>
                    <div className=" col-lg-4">
                        <button type="button" className="btn btn-info" onClick={showAll}>All users</button>
                    </div>
                </div>
            </div>
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
