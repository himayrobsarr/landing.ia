import { useState } from 'react';
import WompiWidget from './WompiWidget';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    document: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const resetForm = () => {
    setFormData({
      name: '',
      lastname: '',
      email: '',
      phone: '',
      document: ''
    });
  };

  // Modificar handlePaymentSuccess para aceptar la transacción
  const handlePaymentSuccess = async (transaction: any) => {
    try {
      setIsSubmitting(true);
      setError('');
      setSuccess(false);
  
      console.log("Transacción exitosa:", transaction);
  
      setSuccess(true);
      resetForm();
  
    } catch (err) {
      console.error('Error:', err);
      setError('Error al procesar el pago. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = Object.values(formData).every(value => value.trim().length > 0);

  return (
    <form className="max-w-md mx-auto">
      <div className="space-y-6 bg-white/5 p-8 rounded-xl border border-purple-500/20">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">Inscríbete Ahora</h3>
          <p className="text-purple-300">Completa tus datos y te contactaremos</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-400 p-4 rounded-lg mb-6">
            ¡Registro completado con éxito! Redirigiendo a WhatsApp...
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={isSubmitting}
              placeholder="Ej: Juan"
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/20 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
              text-white placeholder:text-white/30"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Apellido</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={e => setFormData({ ...formData, lastname: e.target.value })}
              required
              disabled={isSubmitting}
              placeholder="Ej: Pérez"
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/20 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
              text-white placeholder:text-white/30"
            />
          </div>
        </div>

        {[{
          label: 'Email', name: 'email', type: 'email', placeholder: 'correo@ejemplo.com'
        }, {
          label: 'Celular', name: 'phone', type: 'tel', placeholder: '+57 300 123 4567'
        }, {
          label: 'Número de documento', name: 'document', type: 'text', placeholder: 'Tu número de cédula'
        }].map(field => (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-white/80">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name as keyof typeof formData]}
              onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
              required
              disabled={isSubmitting}
              placeholder={field.placeholder}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/20 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
              text-white placeholder:text-white/30"
            />
          </div>
        ))}

        {isFormValid ? (
          <WompiWidget
            amountInCents={9700000}
            formData={formData}
            onTransactionSuccess={(transaction) => handlePaymentSuccess(transaction)} // Pasar transacción
            disabled={isSubmitting}
          />
        ) : (
          <button
            disabled
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 
            hover:to-blue-700 text-white px-8 py-4 rounded-lg font-medium 
            transition-all transform hover:scale-105 disabled:opacity-50 
            disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Completa tus datos para pagar
          </button>
        )}

        <p className="text-center text-sm text-white/60 mt-4">
          Al inscribirte aceptas recibir información sobre el curso
        </p>
      </div>
    </form>
  );
}
