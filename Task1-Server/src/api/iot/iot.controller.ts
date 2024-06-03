import { Controller, Post } from '@nestjs/common';
import { IotService } from './iot.service';

@Controller('api/iot')
export class IotController {
    constructor(private readonly iotService: IotService){}


    @Post('add')
    async addIot(){
        return this.iotService.addIot()
    }
}
