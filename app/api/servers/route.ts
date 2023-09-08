import { v4 as uuiv4 } from "uuid";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();

    const profile = await currentProfile();

    console.log({profile});

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.create({
      data: {
        name,
        imageURL: imageUrl,
        profileId: profile.id,
        inviteCode: uuiv4(),
        channels: {
          create: [
            {
              name: "general",
              profileId: profile.id,
            },
          ],
        },
        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.Admin,
            },
          ],
        },
      },
    });

    return NextResponse.json(server);
  } catch (err) {
    console.log("[SERVER_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
