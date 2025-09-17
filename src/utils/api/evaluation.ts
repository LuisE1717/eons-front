import { axiosI, intanceAxios } from ".";

export interface EvaluationData {
  type: string;
  shortType: string;
  coinPositions: number[][];
}

export interface EvaluationResponse {
  success: boolean;
  data?: {
    id: string;
    resultadoFinal: string;
    interpretacion: string;
    sistemaUsado: string;
    detalles: {
      principal: any;
      sistemita: any;
    };
  };
  error?: any;
}

export async function postSaveEvaluation(token: string, data: EvaluationData): Promise<EvaluationResponse> {
  try {
    console.log('Enviando evaluación a endpoint:', 'lanzamientos/dialogo-abierto');
    console.log('Datos enviados:', JSON.stringify(data, null, 2));
    
    const response = await axiosI(token).post('lanzamientos/dialogo-abierto', data);
    console.log('Respuesta del servidor:', response.data);
    
    return {
      data: response.data,
      success: true,
    };
  } catch (error: any) {
    console.error('Error completo en postSaveEvaluation:', error);
    
    // Log detallado del error
    if (error.response) {
      console.error('Response error:', error.response.status, error.response.data);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request error:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    
    return {
      data: null,
      success: false,
      error: error.response?.data || error.message,
    };
  }
}

export async function getUltimaConsulta(token: string): Promise<EvaluationResponse> {
  try {
    const response = await axiosI(token).get(`lanzamientos/ultima`);
    
    return {
      data: response.data,
      success: true,
    };
  } catch (error: any) {
    console.error('Error getting last consultation:', error);

    return {
      data: null,
      success: false,
      error: error.response ? error.response.data : error.message,
    };
  }
}

export async function getResultadoPorId(token: string, id: string): Promise<EvaluationResponse> {
  try {
    const response = await axiosI(token).get(`lanzamientos/resultado/${id}`);
    
    return {
      data: response.data,
      success: true,
    };
  } catch (error: any) {
    console.error('Error getting resultado by id:', error);

    return {
      data: null,
      success: false,
      error: error.response ? error.response.data : error.message,
    };
  }
}