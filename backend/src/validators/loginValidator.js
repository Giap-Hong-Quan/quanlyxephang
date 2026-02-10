import {z} from "zod"

export const loginSchema =z.object(
    {
        email:z.string().min(1,"Vui lòng nhập đầy đủ email")
            .email("Email không đúng định dạng"),
        password: z.string()
        .min(1, "Vui lòng nhập đầy đủ password")
    }
)