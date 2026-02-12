import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import React from 'react';

function RootLayout() {
  return React.createElement('div', { className: 'root-layout' },
    React.createElement('nav', null, 'Navigation'),
    React.createElement('main', null, 'Content')
  );
}

function HomePage() {
  return React.createElement('div', null, 'Home Page');
}

function AboutPage() {
  return React.createElement('div', null, 'About Page');
}

function UserProfile() {
  return React.createElement('div', null, 'User Profile');
}

function UserSettings() {
  return React.createElement('div', null, 'User Settings');
}

function NotFound() {
  return React.createElement('div', null, '404 - Not Found');
}

async function homeLoader() {
  return { title: 'Welcome Home' };
}

async function userLoader({ params }) {
  return { userId: params.userId };
}

async function settingsAction({ request }) {
  const formData = await request.formData();
  return { success: true, name: formData.get('name') };
}

const router = createBrowserRouter(
  createRoutesFromElements(
    React.createElement(Route, { path: '/', element: React.createElement(RootLayout) },
      React.createElement(Route, { index: true, element: React.createElement(HomePage), loader: homeLoader }),
      React.createElement(Route, { path: 'about', element: React.createElement(AboutPage) }),
      React.createElement(Route, { path: 'users/:userId', element: React.createElement(UserProfile), loader: userLoader }),
      React.createElement(Route, { path: 'settings', element: React.createElement(UserSettings), action: settingsAction }),
      React.createElement(Route, { path: '*', element: React.createElement(NotFound) })
    )
  )
);

export { router, homeLoader, userLoader, settingsAction };
export { RootLayout, HomePage, AboutPage, UserProfile, UserSettings, NotFound };
