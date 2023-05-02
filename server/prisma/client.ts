/* eslint-disable @typescript-eslint/no-namespace */
import { PrismaClient } from '@prisma/client'

declare global {
    namespace NodeJS {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface Global { }
    }
}
interface CustomNodeJsGlobal extends NodeJS.Global {
    prisma: PrismaClient
}

//prevebt multiple instances of prisma client 
declare const global: CustomNodeJsGlobal

const prisma = global.prisma || new PrismaClient()

export default prisma