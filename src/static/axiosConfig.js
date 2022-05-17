/*
 *   axios headers config
 */
export const headerConfig = {
  withCredentials: true,
  headers: {
    'Content-Type': `application/json; utf-8`,
  },
}

export const headerFileConfig = {
  withCredentials: true,
  headers: {
    'Content-Type': `multipart/form-data; utf-8`,
  },
}
