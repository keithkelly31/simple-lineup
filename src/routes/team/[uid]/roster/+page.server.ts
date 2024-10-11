import { api } from '$convex/_generated/api';
import type { Id } from '$convex/_generated/dataModel';
import { fail } from '@sveltejs/kit';
import isEmail from "validator/lib/isEmail";
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { convex }, params}) => {
    const id = params.uid as Id<"teams">;
    return {
        roster: await convex.query(api.team.roster, { id })
    };
};

export const actions: Actions = {
    invite: async ({ request }) => {
        let addresses;
        let errors: string[] = [];
        const form = await request.formData();
        addresses = form.get("addresses");

        if(!addresses) return fail(400, { message: "Please enter email addresses" });

        addresses = addresses.toString().split(",").map(address => address.trim()).map(address => {
            if(!isEmail(address)) {
                errors.push(address);
            }
            return address;
        }).filter(address => isEmail(address));

        if(errors.length) return fail(400, { message: `${errors.join(",")} are invalid. Please check the addresses and try again.` });

        return { message: "Invites sent successfully" }
    }
}