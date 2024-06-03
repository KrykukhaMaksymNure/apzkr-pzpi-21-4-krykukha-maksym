import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { AddHeartbeatDto, UpdateHeartbeatDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SessionEnabledStatus, SessionStatusDesciption, WatcherRole } from 'src/constants/enum';
import { AlertService } from '../alert/alert.service';
import { AccidentService } from '../accident/accident.service';

@Injectable()
export class HeartbeatService {

    constructor (private prisma: PrismaService){
    }

    async getHeartbeatDescription(count: number) {
        if (count < 60) {
          return SessionStatusDesciption.LOW;
        } else if (count >= 60 && count < 100) {
          return SessionStatusDesciption.NORMAL;
        } else {
          return SessionStatusDesciption.HIGH;
        }
      }

    async addHeartbeat(dto: AddHeartbeatDto){
        try{

            const admin = await this.prisma.watcher.findFirst({
                where:{id:dto.watcherId}
            })
            const role = admin.role
        }
        catch (e){
            throw new ForbiddenException("You are not ADMIN")
        }
        const admin = await this.prisma.watcher.findFirst({
            where:{id:dto.watcherId}
        })
        if (!admin.role || admin.role !==WatcherRole.ADMIN ){
            throw new ForbiddenException("You are not ADMIN")
        }

        const session = await this.prisma.session.findFirst({
            where:{id:dto.sessionId}
        })
        if (session.isEnabled !== SessionEnabledStatus.ENABLED){
            throw new ConflictException("Session is disabled")
        }

        const desc = await this.getHeartbeatDescription(dto.count);
        const result = await this.prisma.heartbeat.create({
            data: {
                count:dto.count,
                description:desc,
                driver:{connect:{id:dto.driverId}},
                session:{connect:{id:dto.sessionId}}
            }
        })

        const heartbeats = await this.prisma.heartbeat.findMany({
            where: {
              driverId: dto.driverId,
              createdAt: {
                gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
              }
            }
          });

        const averageCount = heartbeats.reduce((acc, heartbeat) => acc + heartbeat.count, 0) / heartbeats.length;


        const checkDriver =  await this.prisma.driver.update({
            where:{
                id:dto.driverId
            },data:{
                averageMonthlyHeartbeat: Math.round(averageCount)
            }
        })
        return result
    }



    async getAllHeartbeats(){
        return this.prisma.heartbeat.findMany()
    }

    async getHeartbeatById(id){
        return this.prisma.heartbeat.findMany({
            where:{
                driverId:id
            }
        })
    }

    async deleteHeartbeatById(id){
        await this.prisma.heartbeat.delete({
            where:{id:id}
        })
    }

}
