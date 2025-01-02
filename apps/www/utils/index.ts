function getPublicUrl(key: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_CDN_URL

  if (!baseUrl) {
    throw new Error(
      'NEXT_PUBLIC_CDN_URL is not defined in the environment variables.'
    )
  }

  if (!key) {
    throw new Error('The key parameter is required to generate the URL.')
  }

  return `${baseUrl}${key}`
}

export default getPublicUrl
