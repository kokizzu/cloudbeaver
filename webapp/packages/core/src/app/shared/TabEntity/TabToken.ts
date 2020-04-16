/*
 * cloudbeaver - Cloud Database Manager
 * Copyright (C) 2020 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { ITab } from '@dbeaver/core/blocks';
import { createValueToken } from '@dbeaver/core/di';

export const TabToken = createValueToken<ITab>('ITab');
