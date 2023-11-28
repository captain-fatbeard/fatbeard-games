export function calculateGravity() {
  const baseScreenHeight = 800 // calibrated for 800px height
  const baseGravity = 1000 // calibrated for 1000px height at 800px screen height

  const gravityScale = window.innerHeight / baseScreenHeight
  const scaledGravity = baseGravity * gravityScale

  return scaledGravity
}
