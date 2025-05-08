// src/api.ts
export interface ProcessStatus {
    status: 'pending' | 'processing' | 'done' | 'error';
    stepCin7: 'idle' | 'success' | 'error';
    stepContact: 'idle' | 'success' | 'error';
    stepAccount: 'idle' | 'success' | 'error';
    stepEmail: 'idle' | 'success' | 'error';
    stepCin7Message?: string;
    stepContactMessage?: string;
    stepAccountMessage?: string;
    stepEmailMessage?: string;
    errorMessage?: string;
  }
  
  
  export async function fetchStatus(id: string): Promise<ProcessStatus> {
    const res = await fetch(`/api/process-status/${id}`);
    if (!res.ok) throw new Error('Error al obtener el estado');
    return res.json();
  }
  
  export async function startProcess(id: string): Promise<ProcessStatus> {
    const res = await fetch(`/api/process/${id}`, { method: 'POST' });
    if (!res.ok) throw new Error('Error al iniciar el proceso');
    return res.json();
  }  