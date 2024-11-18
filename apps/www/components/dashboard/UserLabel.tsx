import { ParticipantAvatar } from './RoomCard'

interface UserLabelProps {
  participant: {
    name: string
    avatar: string
  }
  index: number
}

export const UserLabel = ({ participant, index }: UserLabelProps) => (
  <div
    key={index}
    className="flex items-center gap-2 rounded-2xl bg-black p-1 pr-2"
  >
    <ParticipantAvatar participant={participant} />
    <span className="whitespace-nowrap text-sm font-semibold text-white">
      @{participant.name}
    </span>
  </div>
)
