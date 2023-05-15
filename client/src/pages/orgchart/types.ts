export type Node = {
    id: string | number,
    parentId: string | number,
    name: string,
    role?: string,
    phone?: string,
    email?: string,
    team?: string,
    location?: string,
    department?: string,
    description?: string,
    imageUrl?: string,
    _directSubordinates?: number
}