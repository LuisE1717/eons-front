import React from 'react';

interface Props {
    type: string;
    label: string;
}

const OutlineInputReact: React.FC<Props> = ({ type, label }) => {
    return (
        <div className='form'> {/* Aplica el estilo form */}
            <input 
                type={type} 
                name="text" 
                autoComplete="off" 
                required 
            />
            <label htmlFor="text" className="label-name"> {/* Aplica múltiples clases */}
                <span className="content-name">{label}</span>
            </label>
        </div>
    );
};

export default OutlineInputReact;