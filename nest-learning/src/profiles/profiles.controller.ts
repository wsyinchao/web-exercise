import {
    Controller, Get, Post, Query, Param, Body, Put,
    Delete, HttpCode, HttpStatus, NotFoundException,
    ParseUUIDPipe, UseGuards
} from '@nestjs/common';
import { ProfileCreate } from "./dto/profiles-create";
import { UpdateProfileDto } from "./dto/update-profiles.dto";
import { ProfilesService } from "./profiles.service";
import type { UUID } from 'crypto';
import { ProfilesGuard } from "./profiles.guard";

@Controller('profiles')
export class ProfilesController {
    // syntax sugar
    // declare and initial properties in the parameter list of consturctor
    constructor(private profilesService: ProfilesService) { }

    @Get()
    getAllProfiles(@Query('location') location: string) {
        return this.profilesService.findAll()
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: UUID) {
        return this.profilesService.findOne(id)
    }

    @Post()
    create(@Body() profile: ProfileCreate) {
        const result = this.profilesService.create(profile)
        return result
    }

    @Put(':id')
    put(@Body() profile: UpdateProfileDto, @Param('id', ParseUUIDPipe) id: UUID) {
        const res = this.profilesService.update({ id, ...profile })
        return res
    }

    @Delete(':id')
    @UseGuards(new ProfilesGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseUUIDPipe) id: UUID) {
        try {
            this.profilesService.delete(id)
        } catch (error) {
            throw new NotFoundException(error.message)

            // The more better way to handle Exceptions
            // if (error instanceof DatabaseException) {
            //     // to do something
            // }
        }
    }
}
