import bcrypt from 'bcrypt'

export const hashPassword = async (
  password: string,
  saltRounds: number = 10
): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash)
}
