import { IsString, Length } from "class-validator";

export class ProfileCreate {
    @IsString()
    @Length(3, 10)
    name: string

    @IsString()
    description: string
}