import { FromSchema } from 'json-schema-to-ts';

import { productSchema } from '@schema/product';

export type Product = FromSchema<typeof productSchema>;
