import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersInformationDto } from './create-users.dto';

export class DeleteUsersInformationDto extends PartialType(
  CreateUsersInformationDto,
) {}

// 관리자가 유저의 정보를 삭제할 때는 굳이 비밀번호를 입력하지 않아도 됨.
// 그럼 DTO에서 뭐가 필요할까?
