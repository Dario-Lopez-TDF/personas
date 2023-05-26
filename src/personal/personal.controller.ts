import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { PersonalService } from './personal.service';

@Controller('api')
export class PersonalController {
  constructor(private personalService: PersonalService) {}

  @Get('persona/lista')
  public getPersona(): any {
    return this.personalService.getPersona();
  }
  @Get('persona/:id')
  public getPersonaId(@Param('id', ParseIntPipe) id: number): any {
    return this.personalService.getPersonaId(id);
  }
  @Delete('persona/eliminar/:id')
  public eliminarPersona(@Param('id', ParseIntPipe) id: number): any {
    return this.personalService.eliminarPersona(id);
  }
  @Post('persona/agregar')
  public crearPersona(@Body() body: any): any {
    return this.personalService.crearPersona(body);
  }
}
