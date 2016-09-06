
/**
 * Returns promise that wraps `res` value
 */
export function promise (res) {
  return new Promise((resolve, reject) => resolve(res))
}
