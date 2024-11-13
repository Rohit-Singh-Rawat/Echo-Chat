'use client'
import { Button as Button2 } from '@echo/ui/components/ui/button.tsx'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@echo/ui/components/ui/dialog.tsx'
import { Input as Input2 } from '@echo/ui/components/ui/input.tsx'
import { Switch } from '@echo/ui/components/ui/switch.tsx'
import { LoadingSpinner } from '@echo/ui/icons/Spinner.tsx'
import { ChevronDown, ChevronUp, Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { Button, Group, Input, Label, NumberField } from 'react-aria-components'

export default function CreateRoomButton() {
  const [isLoading, setIsLoading] = useState(false)

  const dummyTimeout = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
        }, 30000)
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button2 className="">
          Create room
          <span className="border-primary-foreground/30 text-primary-foreground/60 -me-1 ms-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
            1/2
          </span>
        </Button2>
      </DialogTrigger>
      <DialogContent className="animate-scale-in max-h-[95vh] max-w-[500px] overflow-y-auto p-10">
        <DialogHeader>
          <DialogTitle className="mb-10 text-3xl font-semibold">
            Create Room
          </DialogTitle>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label
                className="text-foreground text-sm font-medium"
                htmlFor="room-name"
              >
                Room Name
              </Label>
              <Input2
                id="room-name"
                placeholder="Enter room name"
                type="text"
              />
            </div>

            <NumberField defaultValue={2} minValue={1} maxValue={100}>
              <div className="space-y-2">
                <Label className="text-foreground text-sm font-medium">
                  Total Participants
                </Label>
                <Group className="border-input ring-offset-background data-[focus-within]:border-ring data-[focus-within]:ring-ring/30 relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border text-sm shadow-sm shadow-black/5 transition-shadow data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-2 data-[focus-within]:ring-offset-2">
                  <Button
                    slot="decrement"
                    className="border-input bg-background text-muted-foreground/80 ring-offset-background hover:bg-accent hover:text-foreground -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-lg border text-sm transition-shadow disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Minus size={16} strokeWidth={2} aria-hidden="true" />
                  </Button>
                  <Input className="bg-background text-foreground w-full grow px-3 py-2 text-center tabular-nums focus:outline-none" />
                  <Button
                    slot="increment"
                    className="border-input bg-background text-muted-foreground/80 ring-offset-background hover:bg-accent hover:text-foreground -me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-lg border text-sm transition-shadow disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Plus size={16} strokeWidth={2} aria-hidden="true" />
                  </Button>
                </Group>
              </div>
            </NumberField>

            <NumberField defaultValue={10} minValue={1} maxValue={20}>
              <div className="space-y-2">
                <Label className="text-foreground text-sm font-medium">
                  Room Duration (minutes)
                </Label>
                <Group className="border-input ring-offset-background data-[focus-within]:border-ring data-[focus-within]:ring-ring/30 relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border text-sm shadow-sm shadow-black/5 transition-shadow data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-2 data-[focus-within]:ring-offset-2">
                  <Input className="bg-background text-foreground w-full grow px-3 py-2 text-center tabular-nums focus:outline-none" />
                  <div className="flex h-[calc(100%+2px)] flex-col">
                    <Button
                      slot="increment"
                      className="border-input bg-background text-muted-foreground/80 ring-offset-background hover:bg-accent hover:text-foreground -me-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-shadow disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <ChevronUp size={12} strokeWidth={2} aria-hidden="true" />
                    </Button>
                    <Button
                      slot="decrement"
                      className="border-input bg-background text-muted-foreground/80 ring-offset-background hover:bg-accent hover:text-foreground -me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-shadow disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <ChevronDown
                        size={12}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </Button>
                  </div>
                </Group>
              </div>
            </NumberField>

            <div className="border-input has-[[data-state=checked]]:border-ring relative flex w-full items-start gap-2 rounded-lg border p-4 shadow-sm shadow-black/5">
              <Switch
                id="save-history"
                className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 [&_span]:data-[state=checked]:translate-x-2 rtl:[&_span]:data-[state=checked]:-translate-x-2"
                aria-describedby="save-history-description"
              />
              <div className="grid grow gap-2">
                <Label htmlFor="save-history">
                  Save Chat History{' '}
                  <span className="text-muted-foreground text-xs font-normal leading-[inherit]">
                    (Recommended)
                  </span>
                </Label>
                <p
                  id="save-history-description"
                  className="text-muted-foreground text-xs"
                >
                  Keep a record of this room&apos;s chat to review later
                </p>
              </div>
            </div>

            <div className="border-input has-[[data-state=checked]]:border-ring relative flex w-full items-start gap-2 rounded-lg border p-4 shadow-sm shadow-black/5">
              <Switch
                id="private-room"
                className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 [&_span]:data-[state=checked]:translate-x-2 rtl:[&_span]:data-[state=checked]:-translate-x-2"
                aria-describedby="private-room-description"
              />
              <div className="grid grow gap-2">
                <Label htmlFor="private-room">Private Room</Label>
                <p
                  id="private-room-description"
                  className="text-muted-foreground text-xs"
                >
                  Only invited participants can join this room
                </p>
              </div>
            </div>

            <Button2
              type="submit"
              size="lg"
              className="mt-6 w-full"
              onClick={dummyTimeout}
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : <>Create Room</>}
            </Button2>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
