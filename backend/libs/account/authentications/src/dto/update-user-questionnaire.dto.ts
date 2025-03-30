import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionnaireDto } from './create-user-questionnaire.dto';

export class UpdateQuestionnaireDto extends PartialType(CreateQuestionnaireDto) {}