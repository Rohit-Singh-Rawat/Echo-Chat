'use client'
import { Button } from '@echo/ui/components/ui/button.tsx'
import { Textarea } from '@echo/ui/components/ui/textarea.tsx'
import { Send } from 'lucide-react'
import { FormEvent, useState } from 'react'

import FileInput from './FileInput'

const ChatBoxInput = ({
  sendMessage,
}: {
  sendMessage: (content: string, image?: string) => void
}) => {
  const [message, setMessage] = useState('')
  const [image, setImage] = useState<string | null>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmedMessage = message.trim()
    if (!trimmedMessage && !image) return
    sendMessage(trimmedMessage ?? '', image || undefined)
    setMessage('')
    setImage(null)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute bottom-2 md:bottom-5 right-1/2 z-50 flex w-[95%] md:w-[90%] translate-x-1/2 items-center rounded-full border border-neutral-200 bg-white p-0.5 md:p-1 px-1 md:px-2"
    >
      <FileInput onImageUpload={setImage} SendImage={image} />
      <Textarea
        id="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
          }
        }}
        className="chat-scroll mx-1 md:mx-2 max-h-16 md:max-h-20 min-h-6 md:min-h-7 w-full flex-1 resize-none overflow-auto border-none shadow-none outline-none ring-0 [field-sizing:content] focus-within:outline-none focus-visible:ring-0 text-sm md:text-base"
        placeholder="Enter your message"
      />
      <Button
        type="submit"
        className="flex-center h-auto rounded-full p-2 md:p-[10px]"
        aria-label={'send message'}
      >
        <Send size={24} className="size-8 md:size-12 p-0" />
      </Button>
    </form>
  )
}

export default ChatBoxInput
