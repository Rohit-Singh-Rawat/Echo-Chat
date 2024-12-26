import { Badge } from '@echo/ui/components/ui/badge.tsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@echo/ui/components/ui/popover.tsx'
import { ScrollArea, ScrollBar } from '@echo/ui/components/ui/scroll-area.tsx'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@echo/ui/components/ui/tabs.tsx'
import { motion } from 'framer-motion'

import { useIdentityStore } from '@/app/store/useIdentityStore'

import { MessageAvatar } from './MessageAvatar'

type Reaction = {
  emoji: string
  total: number
  users: {
    id: string
    name: string
    avatar: string
  }[]
}

type MessageReactionsProps = {
  reactions: Reaction[]
  totalReactions: number
}

export const MessageReactions = ({
  reactions,
  totalReactions,
}: MessageReactionsProps) => {
  const { userId: participantId } = useIdentityStore()
  if (totalReactions === 0) return null

  const renderUsers = (users: Reaction['users'], emoji: string) =>
    users.map((user, index) => (
      <motion.div
        key={user.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-5">
          <MessageAvatar
            avatar={user.avatar}
            showAvatar={true}
            userName={user.id === participantId ? 'You' : user.name}
          />
          <p className="text-sm font-medium text-black/70">
            {user.id === participantId ? 'You' : user.name}
          </p>
        </div>
        <p className="text-2xl">{emoji}</p>
      </motion.div>
    ))

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="z-50 mx-2 w-fit -translate-y-2 rounded-full border border-neutral-200 bg-white p-1.5">
          <div className="flex items-center justify-center gap-0.5">
            {reactions.slice(0, 3).map((reaction) => (
              <span key={reaction.emoji} className="text-xs">
                {reaction.emoji}
              </span>
            ))}
            {totalReactions > 1 && (
              <div className="px-1 text-xs font-medium text-gray-600">
                {totalReactions}
              </div>
            )}
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="">
          <Tabs defaultValue="all">
            <ScrollArea>
              <TabsList className="border-border text-foreground mb-3 h-auto rounded-none bg-transparent px-0 py-1">
                <TabsTrigger
                  value="all"
                  className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative px-1.5 after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  All{' '}
                  <Badge
                    className="bg-primary/15 hover:bg-primary/15 ms-1.5 min-w-5 px-1.5"
                    variant="secondary"
                  >
                    {totalReactions}
                  </Badge>
                </TabsTrigger>
                {reactions.map((reaction) => (
                  <TabsTrigger
                    key={reaction.emoji}
                    value={reaction.emoji}
                    className="after:-mb-.5 hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative px-1.5 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    {reaction.emoji}
                    <Badge
                      className="bg-primary/15 hover:bg-primary/15 ms-1.5 min-w-5 px-1.5"
                      variant="secondary"
                    >
                      {reaction.total}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <TabsContent value="all" className="space-y-2">
              {reactions.map((reaction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.2 }}
                >
                  {renderUsers(reaction.users, reaction.emoji)}
                </motion.div>
              ))}
            </TabsContent>

            {reactions.map((reaction) => (
              <TabsContent
                key={reaction.emoji}
                value={reaction.emoji}
                className="space-y-2"
              >
                {renderUsers(reaction.users, reaction.emoji)}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </PopoverContent>
    </Popover>
  )
}
