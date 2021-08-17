/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2021 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { computed, makeObservable } from 'mobx';

import { DataTypeLogicalOperation, ResultDataFormat, SqlResultColumn } from '@cloudbeaver/core-sdk';

import { DatabaseDataAction } from '../../DatabaseDataAction';
import type { IDatabaseDataSource } from '../../IDatabaseDataSource';
import type { IDatabaseResultSet } from '../../IDatabaseResultSet';
import { databaseDataAction } from '../DatabaseDataActionDecorator';
import type { IDatabaseDataResultAction } from '../IDatabaseDataResultAction';
import type { IResultSetContentValue } from './IResultSetContentValue';
import type { IResultSetColumnKey, IResultSetElementKey, IResultSetRowKey } from './IResultSetDataKey';
import { isResultSetContentValue } from './isResultSetContentValue';
import type { IResultSetValue } from './ResultSetFormatAction';

@databaseDataAction()
export class ResultSetDataAction extends DatabaseDataAction<any, IDatabaseResultSet>
  implements IDatabaseDataResultAction<IDatabaseResultSet> {
  static dataFormat = ResultDataFormat.Resultset;

  get rows(): IResultSetValue[][] {
    return this.result.data?.rows || [];
  }

  get columns(): SqlResultColumn[] {
    return this.result.data?.columns || [];
  }

  constructor(source: IDatabaseDataSource<any, IDatabaseResultSet>, result: IDatabaseResultSet) {
    super(source, result);
    makeObservable(this, {
      rows: computed,
      columns: computed,
    });
  }

  insertRow(row: IResultSetRowKey, value: IResultSetValue[], shift = 0): void {
    if (this.result.data?.rows) {
      this.result.data.rows.splice(row.index + shift + 1, 0, value);
    }
  }

  removeRow(row: IResultSetRowKey, shift = 0): void {
    if (this.result.data?.rows) {
      this.result.data.rows.splice(row.index + shift, 1);
    }
  }

  setRowValue(row: IResultSetRowKey, value: IResultSetValue[], shift = 0): void {
    if (this.result.data?.rows) {
      this.result.data.rows[row.index + shift] = value;
    }
  }

  getRowValue(row: IResultSetRowKey): IResultSetValue[] | undefined {
    if (row.index >= this.rows.length) {
      return undefined;
    }

    return this.rows[row.index];
  }

  getCellValue(cell: IResultSetElementKey): IResultSetValue | undefined {
    if (
      cell.row === undefined
      || cell.column === undefined
      || cell.row.index >= this.rows.length
      || cell.column.index >= this.columns.length
    ) {
      return undefined;
    }

    return this.rows[cell.row.index][cell.column.index];
  }

  getContent(cell: IResultSetElementKey): IResultSetContentValue | null {
    const value = this.getCellValue(cell);

    if (isResultSetContentValue(value)) {
      return value;
    }

    return null;
  }

  getColumn(key: IResultSetColumnKey): SqlResultColumn | undefined {
    if (key.index >= this.columns.length) {
      return undefined;
    }

    return this.columns[key.index];
  }

  getColumnOperations(key: IResultSetColumnKey): DataTypeLogicalOperation[] {
    const column = this.getColumn(key);

    if (!column) {
      return [];
    }

    return column.supportedOperations
      .filter(operation => operation.argumentCount === 1 || operation.argumentCount === 0);
  }
}
