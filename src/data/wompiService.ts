import axios from "axios";

const API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL;


interface GetSignatureResponse {
    signature: string;
}

export const getSignature = async (
    reference: string,
    amountInCents: number,
    currency: string = "COP"
): Promise<string> => {
    try {
        const response = await axios.post<GetSignatureResponse>(
            `${API_BASE_URL}wompi/generate-signature`,
            {
                reference,
                amountInCents,
                currency,
            }
        );

        return response.data.signature;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error(
                "Error obteniendo la firma:",
                error.response?.data || error.message
            );
        } else {
            console.error("Error obteniendo la firma:", error);
        }
        throw new Error("No se pudo obtener la firma de Wompi");
    }
};

// esta peticion hace que se cree la inscripcion en pendiente, y  con la
export const createPendingInscription = async (payload: any): Promise<any> => {
    try {
        const data = {
            name: payload.name,
            lastname: payload.lastname,
            email: payload.email,
            phone: payload.phone,
            document: payload.document,
            payment_reference: payload.reference,
            numSeats: payload.numSeats,
            selected_course: payload.targetDate
        }

        console.log("data a enviar:", data)

        const response = await axios.post(`${API_BASE_URL}landing-ia/register`, data);

        return response.data;

    } catch (error: unknown) {

        if (axios.isAxiosError(error)) {
            console.error("Error al registrar:", error.response?.data || error.message);
        } else {
            console.error("Error desconocido al registrar:", error);
        }

        throw new Error("No se pudo registrar la información");
    }
};
