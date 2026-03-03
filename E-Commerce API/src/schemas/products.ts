import { z } from "zod";

const productsSchema = z.object({
  body: z.object({
    title: z.string().trim().min(2, { message: "title required." }),
    price: z.coerce
      .number()
      .positive({ message: "price must be greater than 0" }),
  }),
});

export default productsSchema;
