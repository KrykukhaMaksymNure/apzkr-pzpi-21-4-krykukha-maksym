import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddSessionDto, UpdateSessionDto } from './dto';
import { SessionEnabledStatus } from 'src/constants/enum';

@Injectable()
export class SessionService {

    constructor(private prisma:PrismaService){}

    async addSession(body: AddSessionDto){
        const result = await this.prisma.session.create({
            data:{
                sessionName: body.sessionName,
                driver:{connect:{id:body.driverId}}
            },
            include:{
                heartBeats:{
                    select:{
                        id:true
                    }
                }
            }
        })

        return result
    }

    async updateSession(id:string,body:UpdateSessionDto){
        const result = await this.prisma.session.update({
            where:{id:id},
            data:{
                isEnabled:body.isEnabled
            },
            include:{
                heartBeats:{
                    select:{
                        id:true
                    }
                }
            }
        })
        return result
    }


    async getSessions(): Promise<any>{
        return this.prisma.session.findMany({
            include:{
                heartBeats:{
                    select:{
                        id:true
                    }
                }
            }
        })
    }

    async getSessionById(id){
      return this.prisma.session.findFirst({
        where:{id:id},
        include:{
            heartBeats:{
                select:{
                    id:true
                }
            }
        }
      })
    } 
    

}
