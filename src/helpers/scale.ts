// Function to calculate the scale for resizing the image while preserving aspect ratio
export function calculateScale({
  screenHeight,
  imageWidth,
  imageHeight,
  fractionOfScreen,
}: {
  screenHeight: number
  imageWidth: number
  imageHeight: number
  fractionOfScreen: number
}): number {
  // Desired height for the image on the screen (fraction of the screen height)
  const desiredHeight = screenHeight * fractionOfScreen

  // Calculate the aspect ratio of the image
  const aspectRatio = imageWidth / imageHeight

  // Calculate the scaled width based on the desired height and aspect ratio
  const scaledWidth = desiredHeight * aspectRatio

  // Calculate the scale factor
  const scale = scaledWidth / imageWidth

  return scale
}
