import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from "node:crypto";

@Injectable()
export class ProfilesService {
    private profiles = [
        {
            id: randomUUID(),
            name: 'Brianna Watts',
            description: `Looking for someone to merge with my heart. 
            I’m a full-stack romantic who refactors my feelings until they pass all tests. 
            Bonus points if you can debug my issues while we pair program over coffee. 
            Let’s commit to something beautiful together.`
        },
        {
            id: randomUUID(),
            name: 'Jasper Quinn',
            description: `Seeking a partner in crime to compile my heart.
            Must be comfortable with the terminal because I only speak fluent bash. 
            Swipe right if you can appreciate a good kernel panic every now and then.`
        },
        {
            id: randomUUID(),
            name: 'Leo Park',
            description: `You think you know VIM? Try Neovim. 
            I'll make your modal dreams come true. 
            Want to escape the matrix and explore the perfect keyboard shortcut for love?`
        },
    ]

    findAll() {
        return this.profiles
    }

    findOne(id: string) {
        const profile = this.profiles.find(profile => {
            if (profile.id === id) {
                return true
            }
        })
        if (!profile) {
            throw new NotFoundException()
        }

        return profile
    }

    create({ name, description }) {
        const profile = { id: randomUUID(), name, description }
        this.profiles.push(profile)
        return profile
    }

    update({ name, description, id }) {
        const profile = this.profiles.find(profile => profile.id === id)
        if (!profile) {
            throw new NotFoundException()
        } else {
            profile.name = name
            profile.description = description
            return profile
        }
    }

    delete(id: string) {
        const index = this.profiles.findIndex(profile => {
            if (profile.id === id) {
                return true
            }
        })
        if (index !== -1) {
            this.profiles.splice(index, 1)
        } else {
            // throw new NotFoundException()
            throw new Error(`The profile id ${id} does not exists`)
        }
    }
}
