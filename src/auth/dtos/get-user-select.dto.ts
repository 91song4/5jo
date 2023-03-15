export class GetUserSelectDto {
  whereColumns: {
    id?: number;
    userId?: string;
    name?: string;
  };

  selectColumns?: string[];
}
