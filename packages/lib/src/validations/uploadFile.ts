import z from "zod";

export const uploadFileSchema = z.object({
  filename: z.string().min(1, "Filename is required"),
  contentType: z.string().min(1, "Content type is required"),
  isTemporary: z.boolean().optional(),
  expiryTime: z.number().optional(),
  roomId: z.string().optional()
})