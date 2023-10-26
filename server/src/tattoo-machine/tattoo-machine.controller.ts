import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TattooMachineService } from './tattoo-machine.service';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { TattooMachine } from './tattoo-machine.model';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import {
  FindOneResponse,
  GetBestsellersResponse,
  GetByNameRequest,
  GetByNameResponse,
  GetNewResponse,
  PaginateAndFilterResponse,
  SearchRequest,
  SearchResponse,
} from './types';

@Controller('tattoo-machines')
export class TattooMachineController {
  constructor(private readonly tattooMachineService: TattooMachineService) {}

  @ApiOkResponse({ type: PaginateAndFilterResponse })
  @UseGuards(AuthenticatedGuard)
  @Get()
  paginateAndFilter(@Query() query) {
    return this.tattooMachineService.paginateAndFilter(query);
  }

  @ApiOkResponse({ type: FindOneResponse })
  @UseGuards(AuthenticatedGuard)
  @Get('find/:id')
  getOne(@Param('id') id: string): Promise<TattooMachine> {
    return this.tattooMachineService.findOne(Number(id));
  }

  @ApiOkResponse({ type: GetBestsellersResponse })
  @UseGuards(AuthenticatedGuard)
  @Get('bestsellers')
  getBestseller() {
    return this.tattooMachineService.bestsellers();
  }

  @ApiOkResponse({ type: GetNewResponse })
  @UseGuards(AuthenticatedGuard)
  @Get('new')
  getNew() {
    return this.tattooMachineService.new();
  }

  @ApiOkResponse({ type: SearchResponse })
  @ApiBody({ type: SearchRequest })
  @UseGuards(AuthenticatedGuard)
  @Post('search')
  search(@Body() { search }: { search: string }) {
    return this.tattooMachineService.searchByString(search);
  }

  @ApiOkResponse({ type: GetByNameResponse })
  @ApiBody({ type: GetByNameRequest })
  @UseGuards(AuthenticatedGuard)
  @Post('name')
  findByName(@Body() { name }: { name: string }) {
    return this.tattooMachineService.findOneByName(name);
  }
}
