import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

// Specify the type for parameters explicitly
export function createControllerFile(controllerName: string, workspaceFolderPath: string): void {
    const controllerFolderPath: string = path.join(workspaceFolderPath, 'controllers');
    const controllerFilePath: string = path.join(controllerFolderPath, `${controllerName}.py`);
    
    // Capitalize the first letter of controllerName for class name
    const className = controllerName.charAt(0).toUpperCase() + controllerName.slice(1);
    
    if (!fs.existsSync(controllerFolderPath)) {
        fs.mkdirSync(controllerFolderPath, { recursive: true });
    }

    const controllerTemplate: string = `
from mountaineer import ControllerBase, RenderBase

class ${className}Controller(ControllerBase):
    url = "/${controllerName.toLowerCase()}"
    view_path = "/views/src/app/${controllerName.toLowerCase()}/page.tsx"

    async def render(self) -> RenderBase:
        return RenderBase()
`;

    if (!fs.existsSync(controllerFilePath)) {
        fs.writeFileSync(controllerFilePath, controllerTemplate.trim());
        vscode.window.showInformationMessage(`Controller ${className} created successfully.`);
    } else {
        // Optional: Append or handle the existing file case differently
        fs.appendFileSync(controllerFilePath, controllerTemplate);
    }
}

export function createViewFile(viewName: string, workspaceFolderPath: string): void {
    const viewFolderPath: string = path.join(workspaceFolderPath, 'views', 'src', 'app', viewName.toLowerCase());
    const viewFilePath: string = path.join(viewFolderPath, 'page.tsx');

    // Capitalize the first letter of viewName for component name
    const componentName = viewName.charAt(0).toUpperCase() + viewName.slice(1);

    if (!fs.existsSync(viewFolderPath)) {
        fs.mkdirSync(viewFolderPath, { recursive: true });
    }

    const viewTemplate: string = `
import React from "react";

const ${componentName} = () => {
    return <div>Welcome to the ${componentName} page.</div>;
};

export default ${componentName};
`;

    if (!fs.existsSync(viewFilePath)) {
        fs.writeFileSync(viewFilePath, viewTemplate.trim());
        vscode.window.showInformationMessage(`View ${componentName} created successfully.`);
    } else {
        // Optional: Append or handle the existing file case differently
        fs.appendFileSync(viewFilePath, viewTemplate);
    }
}


export function registerControllerInAppPy(controllerName: string, workspaceFolderPath: string): void {
    const appPyPath: string = path.join(workspaceFolderPath, 'app.py');
    let content: string = fs.readFileSync(appPyPath, { encoding: 'utf8' });

    // Convert controllerName to CamelCase for class name
    const controllerClassName = controllerName.charAt(0).toUpperCase() + controllerName.slice(1) + 'Controller';

    // Construct correct import statement
    const importStatement = `from controllers.${controllerName.toLowerCase()} import ${controllerClassName}\n`;

    // Add the import statement if it doesn't exist
    if (!content.includes(importStatement)) {
        // Assuming all controller imports are grouped together at the top of app.py
        const firstControllerImportIndex = content.indexOf('from controllers');
        if (firstControllerImportIndex !== -1) {
            const beforeImport = content.substring(0, firstControllerImportIndex);
            const afterImport = content.substring(firstControllerImportIndex);
            content = beforeImport + importStatement + afterImport;
        } else {
            content = importStatement + content;
        }
    }

    // Add the controller registration statement
    const registerStatement = `controller.register(${controllerClassName}())\n`;
    if (!content.includes(registerStatement)) {
        // Find the last controller registration and add the new registration after it
        const lastRegisterIndex = content.lastIndexOf('controller.register(');
        if (lastRegisterIndex !== -1) {
            const beforeRegister = content.substring(0, lastRegisterIndex);
            const afterRegister = content.substring(lastRegisterIndex);
            content = beforeRegister + registerStatement + afterRegister;
        } else {
            // If no previous registration, append it
            content += `\n${registerStatement}`;
        }
    }

    // Write the updated content back to app.py
    fs.writeFileSync(appPyPath, content, { encoding: 'utf8' });
    vscode.window.showInformationMessage(`Controller ${controllerClassName} registered in app.py.`);
}

// Assuming this function is in Utils.ts and needs adjustment
export function getViewPathForController(controllerPath: string): string {
    const baseName: string = path.basename(controllerPath, '.py');
    // Ensure baseName is a string; however, in this context, baseName should always be a string.
    // This example shows how to deal with TypeScript's type safety features.
    return path.join(controllerPath.replace('/controllers', '/views/src/app'), baseName, 'page.tsx');
}

// Assuming this function is in Utils.ts and needs adjustment
export function getControllerPathForView(viewPath: string): string {
    const baseName: string = path.dirname(viewPath).split(path.sep).pop() ?? '';
    // Here, using ?? '' to ensure baseName is treated as a string even if pop() returns undefined.
    return path.join(viewPath.replace('/views/src/app', '/controllers'), `${baseName}.py`);
}
