 export interface User {
    connectionId: string;
    identifier: string;
    groups: string[];
    tags: string[];
    createdAt: Date;
    disconnectedAt?: Date;
}