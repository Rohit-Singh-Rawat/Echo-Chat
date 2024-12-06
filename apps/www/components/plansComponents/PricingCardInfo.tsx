interface PricingCardInfoProps {
  name: string
  description: string
  price: string
}

export function PricingCardInfo({
  name,
  description,
  price,
}: PricingCardInfoProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
      <p className="mb-4 text-gray-500">{description}</p>
      <div className="flex items-baseline">
        <span className="text-4xl font-bold text-gray-800">${price}</span>
        <span className="ml-2 text-gray-600">/month</span>
      </div>
    </div>
  )
}
