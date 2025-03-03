// src/components/WompiWidget.tsx
import React, { useEffect, useState } from 'react';
import { getSignature } from '../../data/wompiService';
import { createPendingInscription } from '../../data/wompiService';

interface WompiWidgetProps {
  amountInCents: number;
  formData: any;
  onTransactionSuccess?: (transaction: CheckoutResult['transaction']) => void; // Modificado para incluir transaction
  disabled?: boolean;
}

// Declaración global para tipar el objeto WidgetCheckout del window
declare global {
  interface Window {
    WidgetCheckout: {
      new(config: WidgetCheckoutConfig): WidgetCheckoutInstance;
    };
  }
}

interface WidgetCheckoutConfig {
  currency: string;
  amountInCents: number;
  reference: string;
  publicKey: string;
  redirectUrl: string;
  'signature:integrity': string;
  onClose: () => void;
  onReady: () => void;
  onError: (error: unknown) => void;
}

interface WidgetCheckoutInstance {
  open: (callback: (result: CheckoutResult) => void) => void;
}

interface CheckoutResult {
  transaction?: {
    status: string;
    [key: string]: any;
  };
  [key: string]: any;
}

const generateUniqueReference = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `ia_${timestamp}_${randomStr}`;
};

const WompiWidget: React.FC<WompiWidgetProps> = ({
  amountInCents,
  formData,
  onTransactionSuccess,
  disabled = false,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const WOMPI_PUBLIC_KEY = import.meta.env.PUBLIC_WOMPI_PUBLIC_KEY as string;

  const initializePayment = async () => {
    try {
      setIsLoading(true);

      if (isNaN(amountInCents) || amountInCents <= 0) {
        console.error("Error: El monto no es válido", amountInCents);
        return;
      }

      const reference = generateUniqueReference();
      
      // Crear inscripción pendiente
      const payload = {
        ...formData,
        reference
      };

      await createPendingInscription(payload);

      const signature = await getSignature(reference, amountInCents, 'COP');

      const checkout = new window.WidgetCheckout({
        currency: 'COP',
        amountInCents,
        reference,
        publicKey: WOMPI_PUBLIC_KEY,
        redirectUrl: `${window.location.origin}/pago-exitoso`,
        'signature:integrity': signature,
        onClose: () => {
          console.log('Widget cerrado');
        },
        onReady: () => {
          console.log('Widget listo');
        },
        onError: (error: unknown) => {
          console.error('Error en el widget:', error);
        }
      });

      checkout.open(async (result: CheckoutResult) => {
        if (!result || !result.transaction) {
          console.error("Error: No se recibió una transacción válida", result);
          return;
        }

        const { transaction } = result;
        console.log("Transacción recibida:", transaction);

        if (transaction.status === "APPROVED") {
          console.log("¡Pago exitoso!");
          // Llamamos al callback para enviar la información del formulario
          if (onTransactionSuccess) {
            onTransactionSuccess(transaction);
            setTimeout(() => {
              window.location.href = `${window.location.origin}/pago-exitoso`;
            }, 300);
          }

        } else if (transaction.status === "DECLINED") {
          console.error("Pago rechazado.");
        } else {
          console.log("Pago pendiente.");
        }
      });
    } catch (error) {
      console.error('Error al iniciar el pago:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.wompi.co/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <button
      onClick={initializePayment}
      disabled={disabled || isLoading}
      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 
                 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-medium 
                 transition-all transform hover:scale-105 disabled:opacity-50 
                 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      {isLoading ? 'Cargando...' : 'Paga Ahora con Wompi'}
    </button>
  );
};

export default WompiWidget;
