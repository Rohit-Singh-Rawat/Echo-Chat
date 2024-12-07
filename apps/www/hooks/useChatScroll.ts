import { useEffect, useRef, MutableRefObject } from 'react'

export default function useChatScroll<T>(
  dep: T
): MutableRefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null!)
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [dep])
  return ref
}
