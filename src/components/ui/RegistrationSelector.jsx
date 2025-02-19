import React from 'react';

const RegistrationSelector = ({ formType, setFormType }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white/80">Tipo de inscripción</label>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setFormType('individual')}
          className={`flex flex-col items-center justify-center px-4 py-5 rounded-xl transition-all duration-200 border ${
            formType === 'individual'
              ? 'bg-purple-600/30 border-purple-500 shadow-lg shadow-purple-500/20'
              : 'bg-white/5 border-purple-500/20 hover:bg-white/10'
          }`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`w-8 h-8 mb-2 ${formType === 'individual' ? 'text-purple-300' : 'text-white/60'}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className={`font-medium ${formType === 'individual' ? 'text-white' : 'text-white/80'}`}>
            Individual
          </span>
        </button>
        
        <button
          type="button"
          onClick={() => setFormType('multiple')}
          className={`flex flex-col items-center justify-center px-4 py-5 rounded-xl transition-all duration-200 border ${
            formType === 'multiple'
              ? 'bg-purple-600/30 border-purple-500 shadow-lg shadow-purple-500/20'
              : 'bg-white/5 border-purple-500/20 hover:bg-white/10'
          }`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`w-8 h-8 mb-2 ${formType === 'multiple' ? 'text-purple-300' : 'text-white/60'}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className={`font-medium ${formType === 'multiple' ? 'text-white' : 'text-white/80'}`}>
            Múltiples cupos
            <span className="block text-xs mt-1 font-normal opacity-80">
              Empresas
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default RegistrationSelector;