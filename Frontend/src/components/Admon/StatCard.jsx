import React from 'react';

const StatCard = ({ icon, title, value, subtitle, progress }) => {
    return (
        <div className="col-md-4">
            <div className="card shadow-sm border-0">
                <div className="card-body text-center">
                    {icon && <i className={`bi ${icon} text-primary mb-3`} style={{ fontSize: '2rem' }}></i>}
                    <h5 className="card-title">{title}</h5>
                    <h3 className="card-text text-primary">{value}</h3>
                    {subtitle && <p className="text-muted">{subtitle}</p>}
                    {progress !== undefined && (
                        <div className="progress mt-3" style={{ height: '8px' }}>
                            <div
                                className="progress-bar bg-primary"
                                role="progressbar"
                                style={{ width: `${progress}%` }}
                                aria-valuenow={progress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            ></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatCard;
