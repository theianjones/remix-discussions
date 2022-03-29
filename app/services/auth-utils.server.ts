import SecurePassword from 'secure-password'

const SP = new SecurePassword()

export const hashPassword = async (password: string) => {
  const hashedBuffer = await SP.hash(Buffer.from(password))
  return hashedBuffer.toString('base64')
}
export const verifyPassword = async (
  hashedPassword: string,
  password: string,
) => {
  try {
    return await SP.verify(
      Buffer.from(password),
      Buffer.from(hashedPassword, 'base64'),
    )
  } catch (error) {
    return false
  }
}
