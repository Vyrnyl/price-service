import { z } from "zod";

export const commodityStatusEnum = z.enum(["Active", "Inactive"]);
export const commodityStatusOptions = commodityStatusEnum.options;
export type CommodityStatus = z.infer<typeof commodityStatusEnum>;

export const createCommoditySchema = z.object({
  name: z.string().trim().min(1, "Commodity name is required"),
  category: z.string().trim().min(1, "Category is required"),
  status: commodityStatusEnum,
});

export type CreateCommodityFormSchema = z.infer<typeof createCommoditySchema>;
