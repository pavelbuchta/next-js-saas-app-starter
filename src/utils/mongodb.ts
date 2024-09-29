export function isValidObjectId(id: string) {
  return /^[a-f\d]{24}$/i.test(id);
}
