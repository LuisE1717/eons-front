import { axiosI, intanceAxios } from ".";

export interface EvaluationData {
  type: string;
  shortType: string;
  coinPositions: boolean[][];
}

export interface EvaluationResponse {
  success: boolean;
  data?: {
    id: string;
    pasos: Array<{
      paso: number;
      combinacion: string;
      resultado: string;
      interpretacion: string;
    }>;
    mensajeFinal: string;
    parrafoUnificado: string;
    fecha: string;
  };
  error?: any;
}

export async function postSaveEvaluation(token: string, data: EvaluationData): Promise<EvaluationResponse> {
  try {
    const response = await axiosI(token).post(`lanzamientos`, data);
    
    return {
      data: response.data,
      success: true,
    };
  } catch (error: any) {
    console.error('Error in postSaveEvaluation:', error);

    return {
      data: null,
      success: false,
      error: error.response ? error.response.data : error.message,
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