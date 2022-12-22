/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2022 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { injectable } from '@cloudbeaver/core-di';
import { SessionEventSource, TopicEventHandler, ISessionEvent, ClientEventId, SessionEventTopic, IBaseServerEvent, SessionEventId } from '@cloudbeaver/core-root';
import { isArraysEqual } from '@cloudbeaver/core-utils';

export type IProjectInfoEvent = IBaseServerEvent<SessionEventId, SessionEventTopic>;

@injectable()
export class ProjectInfoEventHandler
  extends TopicEventHandler<IProjectInfoEvent, ISessionEvent, SessionEventId, SessionEventTopic> {
  private lastActiveProjects: string[];

  constructor(
    sessionEventSource: SessionEventSource
  ) {
    super(SessionEventTopic.CbProjects, sessionEventSource);
    this.lastActiveProjects = [];

    this.onInit.addHandler(() => {
      this.lastActiveProjects = [];
    });
  }

  setActiveProjects(projects: string[]): void {
    console.log(projects);
    if (isArraysEqual(this.lastActiveProjects, projects)) {
      return;
    }

    this.emit({ id: ClientEventId.CbClientProjectsActive, projects });
    this.lastActiveProjects = projects;
  }

  map(event: ISessionEvent): IProjectInfoEvent {
    return event;
  }
}
