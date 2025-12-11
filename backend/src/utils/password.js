import bcrypt from "bcryptjs";

// mã hóa mật khẩu
export const hashPassword = (password) => {
    return bcrypt.hashSync(password,10); 
}
// so sánh mã hóa mật khẩu
export const comparePassword = (password,hashedPassword) => {
    return bcrypt.compareSync(password,hashedPassword);
}