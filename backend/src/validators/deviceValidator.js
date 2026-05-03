import {z} from "zod"
export const createDeviceSchema =z.object({
    device_code: z.string().min(1, "Mã thiết bị bắt buộc"),
    device_name: z.string().min(1, "Tên thiết bị bắt buộc"),
    ip_address: z.string().regex(
            /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/,
            "IP không hợp lệ"
        ),
    status: z.string().optional()
})

export const updateDeviceSchema =z.object({
     device_code: z.string().optional(),
        device_name: z.string().optional(),
        ip_address: z
            .string()
            .regex(
                /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/,
                "IP không hợp lệ"
            )
            .optional(),
        status: z.string().optional()

})
