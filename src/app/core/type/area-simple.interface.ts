export interface AreaSimple { 
    uuid: string;            // identificador único
    name: string;            // nome da área
    abbrev: string;          // abreviação
    status: 'active' | 'inactive'; // estado atual da área
    domain_id: number;       // domínio ao qual a área pertence
    function: string;        // função ou responsabilidade principal da área
    valid_until: string;     // data limite de validade da área
    created_at?: string;     // data de criação
    updated_at?: string;     // data da última atualização

    super_area?: string
}










































