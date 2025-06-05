export interface Spot {
    id: string;
    user: {
        id: string;
        username: string;
    };
    description: string;
    address: string;
    createdAt: string;
    modifiedAt: string;
}

export interface CreateSpot {
    description: string;
    address: string;
}

export interface UpdateSpot {
    description?: string;
    address?: string;
}
