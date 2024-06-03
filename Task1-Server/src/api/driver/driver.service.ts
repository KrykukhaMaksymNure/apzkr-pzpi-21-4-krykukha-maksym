import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { DriverLoginDto } from 'src/api/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as EmailValidator from 'email-validator';
import { AddWatcherDto, UpdateDriverDto } from './dto';
import { WatcherIsTaken, cityTranslations } from 'src/constants/enum';


@Injectable()
export class DriverService {
    constructor(private prisma:PrismaService){}

    async getDriver(email:string):Promise<any>{
        return this.prisma.driver.findFirst({
            where: {
              email:email,
            },
          });
    }

    async getDrivers(): Promise<any>{
        return this.prisma.driver.findMany()
    }
    async translateCity(cityName: string, language: string) {
      if (language === 'uk') {
        return cityTranslations[cityName] || cityName;
      }
      return Object.keys(cityTranslations).find(key => cityTranslations[key] === cityName) || cityName;
    }
    async getById(id: string, language: string): Promise<any> {
      const driver = await this.prisma.driver.findUnique({
        where: { id },
      });

      if (driver) {
        driver.city = await this.translateCity(driver.city, language);
      }

      return driver;
    }

    async updateDriver(id:string,body:UpdateDriverDto){

      if (!/^\d{10}$/.test(body.phone)){
        throw new BadRequestException('Invalid phone number')
      }

      const result = await this.prisma.driver.update({
        where:{id:id},
        data: {
          email: body.email,
          driverSurname:body.driverSurname,
          phone: body.phone,
          driverName:body.driverName
        }
      })
      return result
    }

    async deleteDriver(id:string){
      await this.prisma.driver.delete({where:{id}})
    }


    async addWatcher(dto:AddWatcherDto){

      const updateDriver = await this.prisma.driver.update({
        where:{
          id:dto.driverId
        },
        data:{
          isTaken:WatcherIsTaken.TAKEN,
          watcher:{connect:{id:dto.watcherId}}
        }
      })


      return updateDriver
    }


    async deleteWatcher(dto){
      const watcher = (await this.prisma.driver.findFirst({where:{id:dto.driverId}})).watcherId
      const updateWatcher = await this.prisma.watcher.update({
        where:{id:watcher},
        data:{
          isTaken:WatcherIsTaken.FREE
      }})
      const result = await this.prisma.driver.update({
        where:{id:dto.driverId},data:{
          watcher:{disconnect:true},
          isTaken:WatcherIsTaken.FREE
        }
      })
      return result
    }
}
