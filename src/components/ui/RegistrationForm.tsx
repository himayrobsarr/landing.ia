// src/components/ui/RegistrationForm.tsx
import { useState } from 'react';

export default function RegistrationForm() {
 const [formData, setFormData] = useState({
   firstName: '',
   lastName: '',
   email: '',
   phone: '',
   company: '',
   position: ''
 });

 const [isSubmitting, setIsSubmitting] = useState(false);
 const [error, setError] = useState('');
 const [success, setSuccess] = useState(false);

 const resetForm = () => {
   setFormData({
     firstName: '',
     lastName: '',
     email: '',
     phone: '',
     company: '',
     position: ''
   });
 };

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   setIsSubmitting(true);
   setError('');
   setSuccess(false);

   try {
     const response = await fetch('https://chatcampuslands.com:8443/landingpageapp/register', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(formData)
     });

     if (!response.ok) {
       throw new Error('Error al registrar');
     }

     setSuccess(true);
     resetForm();

     // Prepare WhatsApp message
     const whatsappText = encodeURIComponent(`

Para completar el registro envia tu cédula en pdf!!

Datos de registro:
📋 Nombre: ${formData.firstName} ${formData.lastName}
📧 Email: ${formData.email}
📱 Teléfono: ${formData.phone}
🏢 Compañia: ${formData.company}
💼 Cargo: ${formData.position}

Para completar el registro envia tu cédula en pdf!!  `);

     // Redirect to WhatsApp after 1.5 seconds
     setTimeout(() => {
       window.open(`https://wa.me/573012463004?text=${whatsappText}`, '_blank');
     }, 1500);
     
   } catch (err) {
     console.error('Error:', err);
     setError('Error al enviar el formulario. Por favor intenta nuevamente.');
   } finally {
     setIsSubmitting(false);
   }
 };

 return (
   <form onSubmit={handleSubmit} className="max-w-md mx-auto">
     <div className="space-y-6 bg-white/5 p-8 rounded-xl border border-purple-500/20">
       <div className="text-center mb-8">
         <h3 className="text-2xl font-bold text-white mb-2">Inscríbete Ahora</h3>
         <p className="text-purple-300">Completa tus datos y te contactaremos</p>
       </div>

       {error && (
         <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg mb-6 animate-fade-in">
           {error}
         </div>
       )}

       {success && (
         <div className="bg-green-500/10 border border-green-500/50 text-green-400 p-4 rounded-lg mb-6 animate-fade-in">
           ¡Registro completado con éxito! Redirigiendo a WhatsApp...
         </div>
       )}

       <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
           <label className="block text-sm font-medium text-white/80">
             Nombre
           </label>
           <input
             type="text"
             name="firstName"
             value={formData.firstName}
             onChange={e => setFormData({...formData, firstName: e.target.value})}
             className="w-full px-4 py-3 bg-white/5 border border-purple-500/20 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                        text-white placeholder:text-white/30"
             required
             disabled={isSubmitting}
             placeholder="Ej: Juan"
           />
         </div>

         <div className="space-y-2">
           <label className="block text-sm font-medium text-white/80">
             Apellido
           </label>
           <input
             type="text"
             name="lastName"
             value={formData.lastName}
             onChange={e => setFormData({...formData, lastName: e.target.value})}
             className="w-full px-4 py-3 bg-white/5 border border-purple-500/20 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                        text-white placeholder:text-white/30"
             required
             disabled={isSubmitting}
             placeholder="Ej: Pérez"
           />
         </div>
       </div>

       {[
         { 
           label: 'Email', 
           name: 'email', 
           type: 'email',
           placeholder: 'correo@ejemplo.com'
         },
         { 
           label: 'Celular', 
           name: 'phone', 
           type: 'tel',
           placeholder: '+57 300 123 4567'
         },
         { 
           label: 'Compañia', 
           name: 'company', 
           type: 'text',
           placeholder: 'Nombre de tu Compañia'
         },
         { 
           label: 'Cargo', 
           name: 'position', 
           type: 'text',
           placeholder: 'Cargo'
         }
       ].map(field => (
         <div key={field.name} className="space-y-2">
           <label className="block text-sm font-medium text-white/80">
             {field.label}
           </label>
           <input
             type={field.type}
             name={field.name}
             value={formData[field.name as keyof typeof formData]}
             onChange={e => setFormData({...formData, [field.name]: e.target.value})}
             className="w-full px-4 py-3 bg-white/5 border border-purple-500/20 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                        text-white placeholder:text-white/30"
             required
             disabled={isSubmitting}
             placeholder={field.placeholder}
           />
         </div>
       ))}

       <button
         type="submit"
         disabled={isSubmitting}
         className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 
                    hover:to-blue-700 text-white px-8 py-4 rounded-lg font-medium 
                    transition-all transform hover:scale-105 disabled:opacity-50 
                    disabled:cursor-not-allowed disabled:hover:scale-100"
       >
         {isSubmitting ? (
           <span className="flex items-center justify-center">
             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
             Procesando...
           </span>
         ) : 'Completar Inscripción'}
       </button>

       <p className="text-center text-sm text-white/60 mt-4">
         Al inscribirte aceptas recibir información sobre el curso
       </p>
     </div>
   </form>
 );
}