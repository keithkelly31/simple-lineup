import { fail, error as handleError } from '@sveltejs/kit';
import isEmail from "validator/lib/isEmail";
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase }, params}) => {
    const { data: roster, error } = await supabase.from("team_members").select("...member(*)").eq("team", params.uid).order("member(last_name)");
    if(error) return handleError(500, error.message);
    
    return {
        roster
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