import { z } from 'zod';

export const createBecaSchema = z.object({
  title: z.string({
    required_error: "Title required",
  }),
  description: z.string({
    required_error: "Description required, must be string",
  }),
  image: z.string({
    required_error: "Link of image is required",
  }),
  date: z.string().datetime().optional(),
});
