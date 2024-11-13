import { Button } from '@echo/ui/components/ui/button.tsx'

export default function CreateRoomButton() {
  return (
    <Button className="">
      Create room
      <span className="border-primary-foreground/30 text-primary-foreground/60 -me-1 ms-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
        1/2
      </span>
    </Button>
  )
}
