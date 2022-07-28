import { FromSchema } from 'json-schema-to-ts';

import { stockSchema } from '@schema/stock';

export type Stock = FromSchema<typeof stockSchema>;
