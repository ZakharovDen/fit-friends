import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthenticationService } from "./authentication.service";
import { AddFriendDto } from "../dto/add-friend.dto";
import { fillDto } from "@backend/helpers";
import { UserRdo } from "../rdo/user.rdo";

@ApiTags('friends')
@Controller('friends')
export class FriendsController {
  constructor(
    private readonly authService: AuthenticationService,
  ) { }

  @Get('/:userId')
  @ApiOperation({ summary: 'Получение друзей пользователя.' })
  @ApiResponse({
    type: [UserRdo],
    status: HttpStatus.OK,
  })
  async getFriends(
    @Param('userId') userId: string,
  ) {
    const friends = this.authService.getFriends(userId);
    return fillDto(UserRdo, friends);
  }

  @Post('/:userId')
  @ApiOperation({ summary: 'Добавление пользователя в друзья.' })
  async addFriend(
    @Param('userId') userId: string,
    @Body() {friendId}: AddFriendDto 
  ) {
    return this.authService.addFriend(userId, friendId);
  }

  @Delete('/:userId')
  @ApiOperation({ summary: 'Удаление пользователя из друзей.' })
  async deleteFriend(
    @Param('userId') userId: string,
    @Body() {friendId}: AddFriendDto 
  ) {
    return this.authService.deleteFriend(userId, friendId);
  }

}
