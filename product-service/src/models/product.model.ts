import { FromSchema } from 'json-schema-to-ts';

import product from '@schema/product';

export type Product = FromSchema<typeof product>;
