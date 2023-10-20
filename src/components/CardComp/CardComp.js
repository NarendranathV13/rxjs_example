import React from 'react';

const CardComp = ({ count, title }) => {

    return (
        <>
            <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <h1 className="card-subtitle mb-2 text-muted">Total Count: {count||0}</h1>
                </div>
            </div>
        </>
    );
};

export default CardComp;
