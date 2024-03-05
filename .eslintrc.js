module.exports = {
    rules: {
      // Prevent direct mutation of server state
      'mountaineer/no-direct-state-mutation': {
        create: function (context) {
          return {
            AssignmentExpression(node) {
              if (node.left.object && node.left.object.name === 'serverState') {
                context.report({
                  node,
                  message: 'Do not mutate serverState directly. Use sideeffects instead.',
                });
              }
            },
          };
        },
      },
      // Ensure sideeffect and passthrough decorators are used correctly
      'mountaineer/decorators-usage': {
        create: function (context) {
          return {
            Decorator(node) {
              if (node.expression.callee && ['sideeffect', 'passthrough'].includes(node.expression.callee.name)) {
                const parentFunction = node.parent;
                if (parentFunction.kind !== 'method') {
                  context.report({
                    node,
                    message: `The @${node.expression.callee.name} decorator is only applicable to methods within a class.`,
                  });
                }
              }
            },
          };
        },
      },
      // Enforce the use of RenderBase for controller render methods
      'mountaineer/renderbase-required': {
        create: function (context) {
          return {
            MethodDefinition(node) {
              if (node.key.name === 'render' && !node.value.returnType) {
                context.report({
                  node,
                  message: 'Controller render methods must specify a return type of RenderBase.',
                });
              }
            },
          };
        },
      },
      // Ensure linkGenerator is used correctly for navigation
      'mountaineer/use-linkgenerator-for-navigation': {
        create: function (context) {
          return {
            CallExpression(node) {
              if (node.callee.object && node.callee.property && node.callee.property.name === 'navigate') {
                const args = node.arguments;
                if (!args[0] || args[0].type !== 'CallExpression' || (args[0].callee && args[0].callee.object && args[0].callee.object.name !== 'linkGenerator')) {
                  context.report({
                    node,
                    message: 'Use linkGenerator for generating navigation URLs.',
                  });
                }
              }
            },
          };
        },
      },
      // Check for proper use of the useServer hook
      'mountaineer/use-server-hook-usage': {
        create: function (context) {
          return {
            CallExpression(node) {
              if (node.callee.name === 'useServer') {
                const parentType = node.parent.type;
                if (['VariableDeclarator', 'AssignmentExpression'].includes(parentType)) {
                  context.report({
                    node,
                    message: 'Ensure useServer is used within functional components or custom hooks only.',
                  });
                }
              }
            },
          };
        },
      },
    },
  };
  