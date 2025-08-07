import { z } from "zod"

// Password Protection Schema - simplified for construction management app
export const passwordSchema = z.object({
    password: z
        .string()
        .min(1, "Password is required"),
})

export type PasswordFormData = z.infer<typeof passwordSchema>
