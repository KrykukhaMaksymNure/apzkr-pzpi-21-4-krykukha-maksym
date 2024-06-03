import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IotService {

    constructor(private readonly prismaService: PrismaService) {
    }

    async addIot(){
        return "Iot succesfully added"
    }


}
