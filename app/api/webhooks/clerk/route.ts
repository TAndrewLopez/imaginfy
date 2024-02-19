import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";
import { clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    console.log('test');
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error(
            "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local file."
        );
    }

    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix_signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occurred -- no svix headers", { status: 400 });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);
    const webhook = new Webhook(WEBHOOK_SECRET);
    let evt: WebhookEvent;

    try {
        evt = webhook.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (error) {
        console.error("Error verifying webhook:", error);
        return new Response("Error occurred", {
            status: 400,
        });
    }

    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created") {
        const { id, email_addresses, image_url, first_name, last_name, username } =
            evt.data;
        const user = {
            clerkID: id,
            email: email_addresses[0].email_address,
            username: username!,
            firstName: first_name,
            lastName: last_name,
            photo: image_url,
        };

        const newUser = await createUser(user);

        if (newUser) {
            await clerkClient.users.updateUserMetadata(id, {
                publicMetadata: {
                    userID: newUser._id,
                },
            });
        }
        return NextResponse.json({ message: "Success", user: newUser });
    }

    if (eventType === "user.updated") {
        const { id, image_url, first_name, last_name, username } = evt.data;
        const user = {
            firstName: first_name,
            lastName: last_name,
            username: username!,
            photo: image_url,
        };

        const updatedUser = await updateUser(id, user);
        return NextResponse.json({ message: "Success", user: updatedUser });
    }

    if (eventType === "user.deleted") {
        const { id } = evt.data;
        const deletedUser = await deleteUser(id!);
        return NextResponse.json({ message: "Success", user: deletedUser });
    }

    console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
    console.log("Webhook body:", body);
    return new Response("", { status: 200 });
};
