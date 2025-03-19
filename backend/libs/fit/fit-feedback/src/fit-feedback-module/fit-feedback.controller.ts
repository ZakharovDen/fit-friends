import { Body, Controller, HttpStatus, Post, SerializeOptions } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FitFeedbackService } from "./fit-feedback.service";
import { CreateFeedBackDto } from "./dto/create-feedback.dto";
import { FitFeedBackRdo } from "./rdo/fit-feedback.rdo";

@ApiTags('Отзывы')
@Controller('feedbacks')
export class FitFeedbackController {
  constructor(
    private readonly fitFeedbackService: FitFeedbackService,
  ) {}

  @Post('/')
  @ApiOperation({ summary: 'Создание отзыва.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: FitFeedBackRdo })
  @SerializeOptions({ type: FitFeedBackRdo })
  public async create(@Body() dto: CreateFeedBackDto){
    const feedback = await this.fitFeedbackService.create(dto);
    return feedback;
  }
}