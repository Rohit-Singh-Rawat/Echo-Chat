'use client'
import { Button } from '@echo/ui/components/ui/button.tsx'
import { Textarea } from '@echo/ui/components/ui/textarea.tsx'
import { Send } from 'lucide-react'

import FileInput from './FileInput'

const ChatBoxInput = () => {
  return (
    <div className="absolute bottom-5 right-[50%] flex w-[90%] translate-x-[50%] items-center rounded-full bg-white p-1 px-2">
      <FileInput />
      <Textarea
        id="Message"
        className="chat-scroll mx-2 max-h-20 min-h-7 w-full flex-1 resize-none overflow-auto border-none shadow-none outline-none ring-0 [field-sizing:content] focus-within:outline-none focus-visible:ring-0"
        placeholder="Enter your message"
      />
      <Button
        className="flex-center h-auto rounded-full p-[10px]"
        aria-label={'send message'}
      >
        <Send size={30} className="size-12 p-0" />
      </Button>
    </div>
  )
}

export default ChatBoxInput
