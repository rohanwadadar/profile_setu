# 📘 Guide: MasterRoutes & Route Automation

Welcome! This guide explains how the routing system works in this project. It is designed for beginners to help you understand how new pages, courses, and workshops are added and how the application automatically handles them.

## 🚀 Overview

The system relies on **three main files** working together:

1.  **`src/routeConfig.jsx`**: The "Map". It tells the app what pages exist and where they should go.
2.  **`src/data/courses.jsx`**: The "Database". It holds the lists of courses and workshops.
3.  **`src/MasterRoutes.jsx`**: The "Brain". It reads the Map and the Database to automatically build the website links and set page titles.

---

## 📂 The Files Explained

### 1. `src/routeConfig.jsx` (The Map)
This file contains an array called `routeConfig`. Each item in this array represents a distinct page on your website.

**Example Entry:**
```javascript
{
    path: "/about",           // The URL (e.g., website.com/about)
    label: "About Us",        // Name shown in navigation menus
    showInNav: true,          // Should this appear in the top Navbar?
    title: "SETU | About",    // The Browser Tab Title (SEO)
    element: <About />,       // The Component to load
    protected: false          // Is login required?
}
```

### 2. `src/data/courses.jsx` (The Data)
This file simply exports lists of data. Instead of creating a separate page file for every single course, we just add the course details here.

**Example Data:**
```javascript
export const selfPacedCourses = [
    { id: "llm", title: "Large Language Modeling" },
    { id: "genbi", title: "Generative BI" }
];
```

### 3. `src/MasterRoutes.jsx` (The Brain)
This file does two important things:
1.  **Creates Routes**: It loops through `routeConfig` and creates the actual `<Route>` elements so React knows what to render.
2.  **Automates Titles (SEO)**: It watches the URL. If you visit `/course/llm`, it automatically searches your `courses.jsx` file for the id `"llm"` and sets the browser tab title to "Large Language Modeling".

---

## 🛠️ How to Add Content (Step-by-Step)

### Scenario A: specific "Static" Page (e.g. Terms of Service)
1.  **Create the Page**: Create `Terms.jsx` in your `pages` folder.
2.  **Register the Route**: Open `src/routeConfig.jsx` and add a new object to the list:
    ```javascript
    {
        path: "/terms",
        label: "Terms",
        showInNav: false,
        title: "Terms of Service",
        element: <Terms />,
        protected: false
    }
    ```
    *That's it! The router handles the rest.*

### Scenario B: Adding a New Course or Workshop
**You do NOT need to touch `routeConfig.jsx` or `MasterRoutes.jsx`.**

Because we have "Dynamic Routes" set up (like `/course/:courseId`), you only need to add the data.

1.  **Open Data File**: Go to `src/data/courses.jsx`.
2.  **Add Entry**: Add your new course to the relevant list (`selfPacedCourses` or `workshopsData`).

    ```javascript
    // Inside src/data/courses.jsx
    export const selfPacedCourses = [
        // ... existing courses
        { id: "new-course-id", title: "My New Course Title" } 
    ];
    ```

3.  **Test It**: Go to `http://localhost:5173/course/new-course-id`.
    *   The **MasterRoutes** system will detect the URL.
    *   It will find your new data entry.
    *   It will automatically load the `CourseDetail` page and display your course information.
    *   It will update the Browser Tab Title to "My New Course Title".

---

## 🧠 How the "Magic" Works (Logic Flow)

1.  **User visits** `/course/llm`.
2.  **`MasterRoutes.jsx`** sees the path starts with `/course/`.
3.  It grabs the ID `llm` from the URL.
4.  It looks inside `selfPacedCourses` (imported from your data file).
5.  It finds: `{ id: "llm", title: "Large Language Modeling" }`.
6.  It executes: `document.title = "SETU | Large Language Modeling"`.

This means you can add 100 courses just by editing the data file, without ever changing the routing code!

## 🔗 Route Connection Summary

*   **`routeConfig.jsx`** connects URLs to Components (Pages).
*   **`MasterRoutes.jsx`** connects URLs to SEO Data (Titles/Descriptions) based on `courses.jsx`.

**Best Practice:**
*   Always define new pages in `routeConfig.jsx`.
*   Always define new course content in `data/courses.jsx`.
*   Leave `MasterRoutes.jsx` alone unless you are changing *how* the routing logic works globally.
