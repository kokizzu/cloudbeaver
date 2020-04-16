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
package io.cloudbeaver.server.registry;

import io.cloudbeaver.api.DBWService;
import org.eclipse.core.runtime.IConfigurationElement;
import org.eclipse.core.runtime.IExtensionRegistry;
import org.eclipse.core.runtime.Platform;
import org.jkiss.dbeaver.Log;

import java.util.ArrayList;
import java.util.List;

public class WebServiceRegistry {

    private static final Log log = Log.getLog(WebServiceRegistry.class);

    private static final String TAG_SERVICE = "service"; //$NON-NLS-1$

    private static WebServiceRegistry instance = null;

    public synchronized static WebServiceRegistry getInstance() {
        if (instance == null) {
            instance = new WebServiceRegistry();
            instance.loadExtensions(Platform.getExtensionRegistry());
        }
        return instance;
    }

    private final List<WebServiceDescriptor> webServices = new ArrayList<>();
    private DBWService[] webServiceInstances;

    private WebServiceRegistry() {
    }

    private void loadExtensions(IExtensionRegistry registry) {
        {
            IConfigurationElement[] extConfigs = registry.getConfigurationElementsFor(WebServiceDescriptor.EXTENSION_ID);
            for (IConfigurationElement ext : extConfigs) {
                // Load webServices
                if (TAG_SERVICE.equals(ext.getName())) {
                    this.webServices.add(
                        new WebServiceDescriptor(ext));
                }
            }
        }
        List<DBWService> instances = new ArrayList<>();
        for (WebServiceDescriptor wsd : webServices) {
            try {
                DBWService instance = wsd.getInstance();
                instances.add(instance);
            } catch (Exception e) {
                log.error("Error instantiating web service '" + wsd.getId() + "'", e);
            }
        }
        webServiceInstances = instances.toArray(new DBWService[0]);
    }

    public List<WebServiceDescriptor> getWebServices() {
        return webServices;
    }

    public DBWService[] getWebServiceInstances() {
        return webServiceInstances;
    }
}
