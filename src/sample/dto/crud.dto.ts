import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CrudDto {
  @IsString()
  public title!: string;

  @IsOptional()
  @IsString()
  public content?: string;

  @IsOptional()
  @MaxLength(5, {
    message: 'Too much tags. Maximal length is $constraint1, but actual is $value',
  })
  public tags?: string[];
}
