# Mountaineer Framework Support for VSCode

This VSCode extension enhances the development experience for the Mountaineer web framework by providing automated file generation, controller registration, and intuitive navigation between controllers and views. It aims to streamline the workflow, enforce best practices, and reduce manual boilerplate code.

## Features

- **Automatic File Generation**: Automatically generates template files and counterpart template files for controllers and views upon creation.
- **Controller Registration**: Automatically adds newly created controllers to `app.py`.
- **Navigation**: Facilitates easy navigation between controllers and their corresponding views.
- **Template Support**: Utilizes predefined templates for new files, ensuring consistency and adherence to best practices.
- **Intelligent Path Handling**: Manages file paths intelligently, abstracting away the complexity of the framework's directory structure.

## Getting Started

### Prerequisites

- Visual Studio Code ^1.87.0
- Node.js 18+

### Generate package

`npm install -g vsce`
`vsce package`

### Installation

1. Open Visual Studio Code.
2. Go to Extensions view by clicking on the square icon on the sidebar or pressing `Ctrl+Shift+X`.
3. Search for "Mountaineer Framework Support".
4. Click on "Install" to install the extension.

### Usage

- **Creating a Controller**: Simply create a `.py` file under the `/controllers` directory, and the extension will automatically generate the corresponding `.py` template and also generate the view file in the `/views/src/app` directory.
- **Creating a View**: When you create a `.tsx` file under the `/views/src/app` directory, the extension will automatically generate the corresponding `.tsx` template and also generate the controller file in the `/controllers` directory.
- **Automatic Registration**: When a controller or view file are created, the extension will automatically add the necessary import and registration code to `app.py`.

## Configuration

No additional configuration is needed to start using this extension. Future versions may include customizable templates and more configuration options.

## Contributing

Contributions to improve the extension are welcome. Please follow the standard fork and pull request workflow.

### To Fix

- Adding template to bottom of existing file.
- view_path path issues extra /view/app 


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to the Mountaineer framework team for their excellent work.
- This extension was inspired by the needs of the Mountaineer community for a more streamlined development process.

## Support

For support, please open an issue in the GitHub repository.
