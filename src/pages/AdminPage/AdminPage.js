import React, { useEffect, useState } from "react";
import CardComp from "../../components/CardComp/CardComp";
import TableView from "../../components/TableView/TableView";
import { CountService } from "../../service/Count.service";
const AdminPage = () => {
    const [totalCount, setTotalCount] = useState();
    const [deletedCount, setDeletedCount] = useState();

    useEffect(() => {
        const totalSubscription = CountService.onTotalCount().subscribe(count => {
            if (count) {
                setTotalCount(count);
            }
        });

        const deletedSubscription = CountService.onDeletedCount().subscribe(count => {
            if (count) {
                setDeletedCount(count);
            }
            else {
                setDeletedCount(0)
            }
        });

        return () => {
            totalSubscription.unsubscribe();
            deletedSubscription.unsubscribe();
        };
    }, []);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <CardComp title={"Active user"} count={totalCount} />
                    </div>
                    <div className="col-lg-6">
                        <CardComp title={"Deleted user"} count={deletedCount} />
                    </div>
                </div>
            </div>
            <div className="container my-3">
                <TableView />
            </div>
        </>
    );
};

export default AdminPage;