"use client"

import { CreateServerModal } from "@/components/modals/create-server-modal"
import { InviteModal } from "../modals/invite-modal";
import { EditServerModal } from "../modals/edit-server-modal";


import { useState, useEffect } from "react";


export const ModalProvider = () => {

    const [isMounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, [])


    if (!isMounted) return null;

    return (
        <>
            <CreateServerModal />
            <InviteModal />
            <EditServerModal />
        </>
    )
}


