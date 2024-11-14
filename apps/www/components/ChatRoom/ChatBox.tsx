import { ArrowLeftToLine } from 'lucide-react'

import { Button } from '../shared/Button'

import FileInput from './FileInput'

const ChatBox = () => {
  return (
    <div className="relative w-full flex-1 rounded-2xl border border-neutral-200 bg-neutral-100">
      <div className="flex w-full items-center justify-between border-b border-neutral-200 px-6 pb-3 pt-6">
        <h1 className="text-xl font-semibold text-neutral-900">
          This is Room Title
        </h1>
        <Button>
          <ArrowLeftToLine
            className="-ms-1 me-2 opacity-60"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          Exit
        </Button>
      </div>
      <div className="h-[80vh] max-h-[80vh]"></div>
      <div className="absolute bottom-5 right-[50%] flex w-[90%] translate-x-[50%] items-center rounded-full bg-white p-1 px-2">
        <FileInput />
      </div>
    </div>
  )
}
export default ChatBox
