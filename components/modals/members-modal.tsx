"use client"

import { useState } from "react";

import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatar } from "@/components/user-avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuTrigger,
    DropdownMenuSubTrigger,
    DropdownMenuPortal
} from "@/components/ui/dropdown-menu";


import { Shield, MoreVertical, ShieldAlert, ShieldCheck, ShieldQuestion, Check, GavelIcon, Loader2 } from "lucide-react";

const RoleIconMap = {
    "Guest": null,
    "Moderator": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
    "Admin": <ShieldAlert className="h-4 w-4 ml-2 text-red-500" />,
}

export const MembersModal = () => {

    const { onOpen, isOpen, onClose, type, data } = useModal();
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const { server } = data as { server: ServerWithMembersWithProfiles };

    const isModalOpen = isOpen && type === "members";


    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl font-bold text-center">
                        Manage members
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        {`${server?.members.length} Members`}
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-8 max-h-[420px] pr-6">
                    {
                        server?.members.map(member => {
                            return (
                                <div key={member.id} className="flex items-center gap-x-2 mb-6">
                                    <UserAvatar src={member.profile.imageURL} />
                                    <div className="flex flex-col gap-y-1">
                                        <div className="text-xs font-semibold flex items-center gap-x-1">
                                            {member.profile.name}
                                            {RoleIconMap[member?.role]}
                                        </div>
                                        <p className="text-xs text-zinc-500">
                                            {member.profile.email}
                                        </p>
                                    </div>
                                    {server?.profileId !== member.profileId &&
                                        (loadingId !== member.id && (
                                            <div className="ml-auto">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger>
                                                        <MoreVertical className="h-4 w-4 text-zinc-500" />
                                                        <DropdownMenuContent side="left">
                                                            <DropdownMenuSub>
                                                                <DropdownMenuSubTrigger className="flex items-center">
                                                                    <ShieldQuestion className="h-4 w-4 mr-2" />
                                                                    <span>
                                                                        Role
                                                                    </span>
                                                                </DropdownMenuSubTrigger>
                                                                <DropdownMenuPortal>
                                                                    <DropdownMenuSubContent>
                                                                        <DropdownMenuItem>
                                                                            <Shield className="h-4 w-4 mr-2" />
                                                                            Guest
                                                                            {member.role === "Guest" && (
                                                                                <Check className="h-4 w-4 ml-auto" />
                                                                            )}
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuSeparator />
                                                                        <DropdownMenuItem>
                                                                            <ShieldCheck className="h-4 w-4 mr-2" />
                                                                            Moderator
                                                                            {member.role === "Moderator" && (
                                                                                <Check className="h-4 w-4 ml-auto" />
                                                                            )}
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuSubContent>
                                                                </DropdownMenuPortal>
                                                            </DropdownMenuSub>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem>
                                                                <GavelIcon className="h-4 w-4 mr-2" />
                                                                Kick
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenuTrigger>
                                                </DropdownMenu>
                                            </div>
                                        ))
                                    }
                                    {loadingId === member.id && (<Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4" />)}
                                </div>
                            );
                        })
                    }
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}