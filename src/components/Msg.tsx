import {Message as BedRockMessage, Participant} from "@renfraser/cody-client";
import React from "react";

interface MsgProps {
    message: BedRockMessage
}

const Msg: React.FC<MsgProps> = (props: MsgProps) => {
    const { message } = props
    const bg = message.participant === Participant.HUMAN ? 'bg-stone-700' : 'bg-stone-900'
    return (
        <div className={`mt-1 mb-1 ${bg} rounded-xl p-3`}>
            {message.text}
        </div>
    )
}

export default Msg