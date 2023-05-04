export interface Employee {
    id?: number | string,
    parentId?: string | number,
    name?: string,
    positionName?: string,
    phone?: string,
    email?: string,
    team?: string,
    location?: string,
    department?: string,
    description?: string,
    imageUrl?: string,
    _directSubordinates?: number
    role?: string
}