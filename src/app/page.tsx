"use client"

import {
    CodyClient,
    CodyClientConfig,
    Message,
    Model,
    Participant,
    SendMessageCommand,
    SendMessageCommandInput,
    SendMessageCommandOutput,
} from "@renfraser/cody-client";
import { Open_Sans } from "next/font/google";
import {AdjustmentsHorizontalIcon} from "@heroicons/react/16/solid";
import React, {useEffect, useRef, useState} from "react";
import Msg from "@/components/Msg";

const openSans = Open_Sans({ subsets: ["latin"] });


export default function Home() {

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const handleInput = () => {
        if (textareaRef.current !== null) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    };
    useEffect(() => {
        handleInput();
    }, []);


    const [messages, setMessages] = useState<Message[]>([])
    const [message, setMessage] = useState<Message>({})

  const messageBedrock = async (messages: Message[]): Promise<Message[]> => {
      const config: CodyClientConfig = {
      endpoint: 'http://localhost:3000'
    }
    const client = new CodyClient(config);

    const input: SendMessageCommandInput = {
      model: Model.HAIKU,
      messages: messages
    }
    const command = new SendMessageCommand(input);

    const response: SendMessageCommandOutput = await client.send(command);

    return response.messages || []
  }

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey && !isInputEmpty()) {
            e.preventDefault();

            setMessages((prevMsgs) => [...prevMsgs, message])
            const reply = await messageBedrock([...messages, message])
            setMessages(reply)
        }
    };

    const isInputEmpty = () => {
        if (message.text) {
            return message.text.trim() === "";
        }

        return false
    }


    return (
      <>
      <div className="flex px-5 py-5 w-full flex-row justify-between items-center">
          <h1
              className={`${openSans.className} text-xl text-white`}
          >
              Cody
          </h1>
          <AdjustmentsHorizontalIcon className="size-5 text-white cursor-pointer"/>
      </div>
          <div className="relative mx-auto flex h-full w-full max-w-3xl flex-1 flex-col md:px-2 text-stone-200">
              <div className="flex-1  flex  flex-col  gap-3  px-4  max-w-3xl  mx-auto  w-full pt-12 md:pt-16">
                  { messages.map((msg: Message, index: number) => <Msg key={index} message={msg}/>) }
              </div>
              <div className="w-full sticky bottom-0 mx-auto">
                  <textarea
                         id="message-input"
                         ref={textareaRef}
                         className="text-stone-200 outline-none max-h-96 resize-none overflow-hidden bg-stone-600 border border-stone-500 text-sm rounded-t-md block w-full p-2.5"
                         placeholder="Reply to Cody"
                         onInput={handleInput}
                         value={message.text}
                         onChange={(e) => {
                             const newMsg: Message = {
                                 participant: Participant.HUMAN,
                                 text: e.target.value,
                                 images: message.images,
                                 documents: message.documents
                             }
                             setMessage(newMsg)}
                  }
                         onKeyDown={(e) => handleKeyDown(e)}
                         autoFocus
                  />
              </div>

          </div>
      </>
  );
}
