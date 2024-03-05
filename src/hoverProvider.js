function provideHover(document, position) {
    const range = document.getWordRangeAtPosition(position);
    const word = document.getText(range);
  
    const hoverTexts = {
      'useServer': '`useServer` is a hook provided by Mountaineer to allow access to server-side state directly from your React components.',
      '@sideeffect': '`@sideeffect` is a decorator that marks a server-side function to update client state upon completion, causing the client to re-fetch the data automatically.',
      '@passthrough': '`@passthrough` is a decorator for server-side functions that allows them to be called from the client without causing a state update.',
      'ControllerBase': '`ControllerBase` is the base class for all controllers in Mountaineer, providing essential functionalities for handling client requests.',
      'RenderBase': '`RenderBase` is used to define the return type of the `render` method in controllers, specifying the data structure sent to the client.',
      'AppController': '`AppController` orchestrates your application, managing routes, views, and global configurations.',
      'PostCSSBundler': '`PostCSSBundler` is a build tool integration within Mountaineer that processes CSS files using PostCSS during the build phase.',
      'Metadata': '`Metadata` allows you to define page-specific metadata such as title, meta tags, and external link references in your controllers.',
      'linkGenerator': '`linkGenerator` is a utility for creating type-safe links to other pages within your Mountaineer application, ensuring link validity.',
      'HTTPValidationErrorException': '`HTTPValidationErrorException` represents a validation error response from the server, typically used in the context of client-side error handling.'
    };
  
    return new vscode.Hover(hoverTexts[word] || `No documentation found for ${word}.`);
  }
  