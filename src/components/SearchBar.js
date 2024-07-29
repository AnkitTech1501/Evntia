import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, onOpenEventModal }) => (
    <div className="container">
        <div className="row align-items-center">
            <div className="col-12 col-md-8 mb-2 mb-md-0">
                <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={onSearchChange}
                />
            </div>
        </div>
    </div>
);

export default SearchBar;
