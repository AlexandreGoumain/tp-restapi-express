export interface Spot {
    id: string;
    user: {
        id: string;
        username: string;
    };
    description: string;
    address: string;
    pictureUrl: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateSpot {
    description: string;
    address: string;
    pictureUrl: string;
}

export interface UpdateSpot {
    description?: string;
    address?: string;
    pictureUrl?: string;
}
