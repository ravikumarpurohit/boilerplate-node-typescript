import bcrypt from 'bcrypt';
const saltRounds = 10;

export const encryptPassword = async (reqPassword: string) => {
  try {
    const hash = await bcrypt.genSalt(saltRounds);
    const encryptText = await bcrypt.hash(reqPassword, hash);
    return encryptText
  } catch (error) {
    console.log(error)
  }
}

export const checkPassword = async (reqPassword: string, dbPassword: string) => {
  const isValidPassword = await bcrypt.compare(reqPassword, dbPassword);
  return isValidPassword;
}