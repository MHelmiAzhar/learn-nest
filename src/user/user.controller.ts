import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUser() {
    return this.userService.getAllUser();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(
    @Body() payload: UpdateUserDto,
    @Param('id') id: string,
    @Request() req: any,
  ) {
    const userId = req.user.sub;
    return this.userService.updateUser(id, payload, userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.sub;
    return this.userService.deleteUser(id, userId);
  }
}
