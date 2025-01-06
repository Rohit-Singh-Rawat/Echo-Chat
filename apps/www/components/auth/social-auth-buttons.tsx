import { GitHubAuthButton } from './GitHubAuthButton'
import { GoogleAuthButton } from './GoogleAuthButton'

export function SocialAuthButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <GoogleAuthButton />
      <GitHubAuthButton />
    </div>
  )
}
