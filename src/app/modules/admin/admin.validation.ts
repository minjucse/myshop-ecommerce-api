import { z } from 'zod';
import { IsActive } from '../user/user.interface';

export const updateUserStatusValidationSchema = z.object({
  status: z.enum([IsActive.ACTIVE, IsActive.BLOCKED, IsActive.INACTIVE])
    .refine(
      (val) => [IsActive.ACTIVE, IsActive.BLOCKED, IsActive.INACTIVE].includes(val),
      {
        message: "Status must be either ACTIVE, BLOCK, or INACTIVE",
      }
    ),
});