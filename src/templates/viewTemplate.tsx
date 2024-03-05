// src/templates/viewTemplate.tsx
export const viewTemplate = (baseName: string): string => `
import React from "react";

const ${baseName} = () => {
    return <div>${baseName} page content goes here.</div>;
};

export default ${baseName};
`;
