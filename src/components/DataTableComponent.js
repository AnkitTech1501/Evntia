import React from 'react';
import DataTable from 'react-data-table-component';
import { RingLoader } from 'react-spinners';

const DataTableComponent = ({ data, columns, loading, pagination, paginationServer, paginationTotalRows, handlePageChange, itemsPerPage }) => {
    return (
        <>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <RingLoader color="#123abc" />
                </div>
            ) : (
                <div className="table-responsive">
                    <DataTable
                        columns={columns}
                        data={data}
                        customStyles={pagination.customStyles}
                        pagination
                        paginationServer
                        paginationTotalRows={paginationTotalRows}
                        onChangePage={handlePageChange}
                        highlightOnHover
                        paginationPerPage={itemsPerPage}
                        paginationRowsPerPageOptions={[5]}
                    />
                </div>
            )}
        </>
    );
};

export default DataTableComponent;
