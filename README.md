# FunPark

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React.js](https://img.shields.io/badge/react.js-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/mongodb-%23FFFFFF.svg?style=for-the-badge&logo=mongodb&logoColor=%2347A248)
![React Router](https://img.shields.io/badge/react--router--dom-%23CA4245.svg?style=for-the-badge&logo=reactrouter&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-339933.svg?style=for-the-badge&logo=express&logoColor=white)
![Chart.js](https://img.shields.io/badge/chart.js-%23FFEB3B.svg?style=for-the-badge&logo=chartdotjs&logoColor=%23212121)
![Vite](https://img.shields.io/badge/vite-%236F46D8.svg?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%230099FF.svg?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Context API](https://img.shields.io/badge/context--api-%237159c1.svg?style=for-the-badge&logo=react&logoColor=white)
![Axios](https://img.shields.io/badge/axios-%230077B5.svg?style=for-the-badge&logo=axios&logoColor=white)
![React Hot Toast](https://img.shields.io/badge/react--hot--toast-%23CA4245.svg?style=for-the-badge&logo=react&logoColor=white)

## About The Project
FunPark is a full-stack website made with React, Node.js, and MongoDB. Users can see and buy tickets for a made-up amusement park and get a receipt after buying. The project also includes an admin panel with JWT-based authentication, where admins can manage orders and tickets (create, edit, delete). State management is handled using Context API.
  
## Demo
![Fun-Park-Demo](https://github.com/StackWard/FunPark/blob/main/Frontend/public/images/Client-Side-Demo.jpg?raw=true)
![Fun-Park-Demo](https://github.com/StackWard/FunPark/blob/main/Frontend/public/images/Admin-Panel-Demo.jpg?raw=true)

## Back-End Flow Diagram
![FunPark](https://github.com/user-attachments/assets/60341a43-ad4c-4b57-a04f-cc5af0913de4)

## Features

- Interactive UI — A user-friendly interface that ensures an intuitive user experience.
- Responsive Design — Optimized for various devices and screen sizes.
- Modular Architecture — Organized codebase with separate frontend and backend directories for maintainability.

## Technologies Used

- Frontend: React.js, Javascript, Tailwind, ContextApi, ...
- Backend: Node.js, Express.js, MongoDB, ...
- Version Control: Git

## Getting Started

To set up and run the FunPark project, follow these steps:

### Prerequisites

- Node.js installed on your machine
- Git for version control

### Installation

#### Clone the repository:
```bash
git clone https://github.com/StackWard/FunPark.git
cd FunPark
```
#### Install dependencies:
Navigate to both the frontend and backend directories and install the necessary packages:
```bash
cd Frontend
npm i
cd ../Backend
npm i
```

### Running the Application
> Please note that if you want to run this project locally, just uncomment lines 13 to 24 of the /Backend/app.js file to bypass the browser SOP, then run the code.
- Modify the `Backend/config.env` file with your own properties, then start the backend server.
  ```bash
  cd Backend
  npm start
  ```
- Put the back-end URL to the `Frontend/.env` file. After that, simply start the front-end server:
  ```bash
  cd Frontend
  npm run dev
  ```


