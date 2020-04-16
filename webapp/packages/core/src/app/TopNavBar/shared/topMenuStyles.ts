/*
 * cloudbeaver - Cloud Database Manager
 * Copyright (C) 2020 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { css } from 'reshadow';

import { composes } from '@dbeaver/core/theming';

export const topMenuStyles = composes(
  css`
    Menu {
      composes: theme-text-on-primary from global;
    }
  `,
  css`
    Menu {
      background-color: #338ecc!important;
    }
    MenuTrigger {
      height: 100%;
      padding: 0 16px !important;
      display: flex;
      align-items: center;
      padding-right: 0!important;

      &:before {
        display: none;
      }
  
      & > div {
        display: block;
      }
      & > Icon {
        background: #47a0dd;
        margin-left: 16px;
        width: 16px;
        height: 100%;
        padding: 0 16px;
      }
      & IconOrImage {
        display: block;
        width: 24px;
      }
      & menu-trigger-icon {
        margin-right: 8px;
      }
      &:hover > Icon {
        background: #236ea0;
      }
    }
    MenuItem {
      &:hover {
        background: #236ea0;
      }
      &:before {
        display: none;
      }
    }
  `
);
