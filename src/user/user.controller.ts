import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { TableDto } from 'src/dtos/table.dto';
import { TableEntity } from 'src/entities/table';
import { HistoryLog } from 'src/entities/history-logs'; 

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() body: {username : string , password : string}): Promise<{ status: string }> {
    const userEntity = await this.userService.loginService(body.username, body.password);
      if (userEntity) {
        return {status: 'success'};
      } else {
        return {status: 'failed'};
      }
  }

  @Get('historyLog')
  async getHistoryLog(@Query('username') username: string): Promise<HistoryLog[]> {
    if (username === 'admin') {
      return this.userService.getHistoryLog();
    } else {
      return this.userService.getUserHistoryLog(username);
    }
  }

  @Get('getTable')
  async getTable(): Promise<TableEntity[]> {
    return this.userService.getTable();
  }

  @Post('insertTable')
  async insertTable(@Body() payload : TableDto){
    console.log('Received payload:', payload);
    var response = {
      message : "failed"
    };
    const res = await this.userService.insertTable(payload);
    if(res === true){
      response.message = 'success'
    }
    return response;
  }
  

  @Delete('deleteTable/:id')
  async deleteTable(
    @Param('id') id: number,
    @Body('username') username: string
  ): Promise<{ message: string }> {
    const response = { message: 'failed' };
    try {
      const result = await this.userService.deleteTable(id, username);
      if (result) {
        await this.userService.logHistoryAction('delete', id, username);
        response.message = 'success';
      }
    } catch (error) {
      console.error('Error deleting table entry:', error);
    }
    return response;
  }

  @Put('updateTable/:id')
  async updateTable(
    @Param('id') id: number,
    @Body() payload: TableDto,
    @Body('username') username: string 
  ): Promise<{ message: string }> {
    const response = { message: 'failed' };
    try {
      const result = await this.userService.updateTable(id, payload, username);
      if (result) {
        await this.userService.logHistoryAction('update', id, username);
        response.message = 'success';
      }
    } catch (error) {
      console.error('Error updating table entry:', error);
    }
    return response;
  }
}