# Canvas Extension

A Chrome extension that enhances the Canvas LMS (Learning Management System) experience with additional features and improvements.

## Features

- Weekly Learning Progress Tracking
- Note-taking Integration
- Attendance Management
- Enhanced User Interface

## Tech Stack

- TypeScript
- Vite
- SCSS
- Axios
- Radix UI Icons

## Project Structure

```
src/
├── apis/           # API integration modules
│   ├── attendance_items/  # Attendance management API
│   └── modules/    # Canvas modules API
├── config/         # Configuration files
│   └── config.axios.ts  # Axios configuration
├── pages/          # Feature pages
│   ├── note/       # Note-taking feature
│   └── weekly-learning/  # Weekly learning tracking
├── main.ts         # Entry point
└── style.scss      # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yngkim/Ssuvas.git
```

2. Install dependencies:

```bash
npm install
```

3. Build the extension:

```bash
npm run build
```

4. Load the extension in Chrome:

- Open Chrome and go to `chrome://extensions/`
- Enable "Developer mode"
- Click "Load unpacked" and select the `dist` directory

## Development

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run test`: Run tests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Canvas LMS API
- Radix UI Icons
- Vite
