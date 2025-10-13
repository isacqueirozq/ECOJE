export function isRequired(value: any) {
  return value !== null && value !== undefined && String(value).trim().length > 0;
}

export function isEmail(value: string) {
  if (!value) return true; // optional
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
  return re.test(String(value).toLowerCase());
}
