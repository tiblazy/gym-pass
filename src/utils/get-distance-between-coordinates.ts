import { GetDistanceBetweenCoordinatesRequest } from '@/dtos/get-distance-between-coordinates-dto'

const getDistanceBetweenCoordinates = (
  from: GetDistanceBetweenCoordinatesRequest,
  to: GetDistanceBetweenCoordinatesRequest,
) => {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0
  }

  const fromRadian = (Math.PI * from.latitude) / 180
  const toRadian = (Math.PI * to.latitude) / 180

  const theta = from.longitude - to.longitude
  const radTheta = (Math.PI * theta) / 180

  let distance =
    Math.sin(fromRadian) * Math.sin(toRadian) +
    Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta)

  if (distance > 1) {
    distance = 1
  }

  distance = Math.cos(distance)
  distance = (distance * 180) / Math.PI
  distance = distance * 60 * 1.1515
  distance = distance * 1.609344

  return distance
}

export { getDistanceBetweenCoordinates }
