import { z } from 'zod';

export const createBecaSchema = z.object({
  title: z.string({
    required_error: 'Title required',
  }),
  description: z.string({
    required_error: 'Description required, must be string',
  }),
  image: z.string({
    required_error: 'Link of image is required',
  }),
  country: z.string({
    required_error: 'Country is required',
  }),
  continent: z.string({
    required_error: 'Continent is required',
  }),
  moreInfo: z.string({
    required_error: 'More infomation is required',
  }),
  date: z.string().datetime().optional(),
});
