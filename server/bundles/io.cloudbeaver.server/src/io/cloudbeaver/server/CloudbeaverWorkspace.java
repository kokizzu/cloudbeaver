/*
 * DBeaver - Universal Database Manager
 * Copyright (C) 2010-2020 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.cloudbeaver.server;

import org.eclipse.core.resources.IWorkspace;
import org.jkiss.code.NotNull;
import org.jkiss.dbeaver.model.app.DBPPlatform;
import org.jkiss.dbeaver.registry.BaseWorkspaceImpl;

/**
 * Web workspace.
 *
 * Basically just a wrapper around Eclipse workspace.
 */
public class CloudbeaverWorkspace extends BaseWorkspaceImpl {

    public CloudbeaverWorkspace(DBPPlatform platform, IWorkspace eclipseWorkspace) {
        super(platform, eclipseWorkspace);
    }

    @NotNull
    @Override
    public String getWorkspaceId() {
        return "web-workspace";
    }

}