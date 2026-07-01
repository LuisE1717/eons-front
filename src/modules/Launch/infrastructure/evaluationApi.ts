import { axiosI, intanceAxios } from "@modules/Shared/infrastructure/httpClient";

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

// Función ORIGINAL que ya existía
export async function postSaveEvaluation(token: string, data: EvaluationData): Promise<EvaluationResponse> {
  try {
    console.log('🔐 Token usado:', token ? token.substring(0, 20) + '...' : 'No token');
    console.log('📤 Enviando evaluación a endpoint:', 'lanzamientos/dialogo-abierto');
    console.log('📊 Datos enviados:', JSON.stringify(data, null, 2));
    
    const response = await axiosI(token).post('lanzamientos/dialogo-abierto', data);
    console.log('✅ Respuesta del servidor:', response.status, response.data);
    
    return {
      data: response.data,
      success: true,
    };
  } catch (error: any) {
    console.error('❌ Error completo en postSaveEvaluation:', error);
    
    // Log detallado del error
    if (error.response) {
      console.error('📋 Response error:', error.response.status, error.response.data);
      console.error('🔧 Response config:', error.response.config);
    } else if (error.request) {
      console.error('🌐 Request error:', error.request);
    } else {
      console.error('💬 Error message:', error.message);
    }
    
    return {
      data: undefined,
      success: false,
      error: error.response?.data || error.message,
    };
  }
}

// NUEVA FUNCIÓN AÑADIDA - que es la que falta y causa el error
export async function postMesagges(token: string, data: any): Promise<EvaluationResponse> {
  try {
    console.log('🔐 Token usado para mensajes:', token ? token.substring(0, 20) + '...' : 'No token');
    console.log('📤 Enviando mensaje a endpoint:', 'lanzamientos/mensajes');
    console.log('📊 Datos del mensaje:', JSON.stringify(data, null, 2));
    
    const response = await axiosI(token).post('lanzamientos/mensajes', data);
    console.log('✅ Respuesta del servidor para mensajes:', response.status, response.data);
    
    return {
      data: response.data,
      success: true,
    };
  } catch (error: any) {
    console.error('❌ Error en postMesagges:', error);
    
    if (error.response) {
      console.error('📋 Response error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('🌐 Request error:', error.request);
    } else {
      console.error('💬 Error message:', error.message);
    }
    
    return {
      data: undefined,
      success: false,
      error: error.response?.data || error.message,
    };
  }
}

// Función ORIGINAL que ya existía
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
      data: undefined,
      success: false,
      error: error.response ? error.response.data : error.message,
    };
  }
}

// Función ORIGINAL que ya existía
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
      data: undefined,
      success: false,
      error: error.response ? error.response.data : error.message,
    };
  }
}