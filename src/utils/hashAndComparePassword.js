import bcrypt from "bcrypt";
export const hashPassword = (password = "") => {
  const hash = bcrypt.hashSync(password, parseInt(process.env.SULT_ROUNDs));
  return hash;
};

export const comparePassword = ({ password = "", userPassword = "" } = {}) => {
  const compare = bcrypt.compareSync(password, userPassword);
  return compare;
};
