import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SessionService } from './session.service';
import { AddSessionDto, UpdateSessionDto } from './dto';

@Controller('api/session')
export class SessionController {

    constructor(private readonly sessionService: SessionService){}

    @Post('add')
    async addSession(
        @Body() dto : AddSessionDto
    ){
        return this.sessionService.addSession(dto)
    }

    @Patch(':id')
    async updateSessionj(
        @Param('id') id: string,
        @Body() dto:UpdateSessionDto
    ){
        return this.sessionService.updateSession(id,dto)
    }

    @Get()
    async getAllSessions(){
        return this.sessionService.getSessions()
    }

    @Get(':id')
    async getSessionById(@Param('id') id: string){
        return this.sessionService.getSessionById(id)
    }



}

