/*
 * cloudbeaver - Cloud Database Manager
 * Copyright (C) 2020 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { css } from 'reshadow';

import { composes } from '@dbeaver/core/theming';

export const menuPanelStyles = composes(
  css`
    Menu {
      composes: theme-background-surface theme-text-on-surface from global;
    }
    MenuItem,
    MenuDisclosure {
      composes: theme-ripple from global;
    }
    MenuItemElement {
      composes: theme-ripple from global;
    }
  `,
  css`
    MenuDisclosure {
      background: none;
      border: none;
      outline: none !important;
      color: inherit;
      cursor: pointer;
      display: flex;
      padding: 12px 0;
    }
    Menu {
      composes: theme-typography--body2 theme-elevation-z5 from global;
      position: absolute;
      display: flex;
      min-width: 140px;
      flex-direction: column;
      padding: 12px 0;
      outline: none;
      z-index: 999;

      & Menu {
        margin-top: -12px;
      }
    }
    MenuItem {
      display: flex;
      border: none;
      background: none;
      padding: 6px 16px;
      text-align: left;
      outline: none;
      color: inherit;
      cursor: pointer;
      white-space: nowrap;
      
      &[use|hidden] {
        display: none;
      }

      &:hover {
        font-weight: 600;

        & Icon {
          opacity: 1;
        }
      }
    }
    menu-panel-item {
      flex: 1;
      display: flex;
      align-items: center;
      
      & menu-item-text  {
        display: block;
        flex: 1;
      }
      & Icon {
        width: 16px;
        height: 16px;
        opacity: 0.5;
        padding-left: 16px;
      }
    }
  `
);
