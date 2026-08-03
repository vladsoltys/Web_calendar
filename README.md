# Web Calendar

A Google Calendar-inspired single-page application built with React that allows users to create, manage, and organize events across multiple calendars.

---

## Overview

Web Calendar is a scheduling application that provides an intuitive interface for organizing daily events. Users can create multiple calendars, customize their colors, and manage events with automatic positioning and sizing based on their start and end time.

The project focuses on building reusable React components, managing application state with Zustand, and implementing a clean, maintainable application structure.

---

## Features

### Calendar Management

- Create, edit, and delete calendars
- Customize calendar names and colors
- Toggle calendar visibility
- Prevent deletion of the last remaining calendar

### Event Management

- Create, edit, and delete events
- Assign events to calendars
- Customize event colors
- Specify date, start time, and end time for each event

### Calendar View

- Daily timeline view
- Automatic event positioning based on start time
- Event height calculated from duration
- Current time indicator

### User Interface

- Custom modal windows
- Reusable UI components
- Color picker
- Toast notifications
- Event filtering by active calendars

### State Management

- Global state management using Zustand

---

## Tech Stack

### Frontend

- React
- Zustand

### Styling

- CSS Modules

### Tooling

- Vite
- npm
- Git

---

## Installation

```bash
git clone <repository-url>

cd Web_calendar

npm install

npm run dev
```


