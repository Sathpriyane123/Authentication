This project is a comprehensive user authentication and role management system built with React and Redux, ideal for applications needing strong access control and user role customization. It supports a dual login interface, securely routing admins and regular users to their designated dashboards.

At the core is a Super User with advanced permissions:

Register new users, assign and reassign roles, and manage the system dynamically. The Super User can easily promote users to admin status or demote admins to regular users.
Monitor Active Logins: The Super User can view and manage active session statuses for all users and admins, enhancing system oversight and security.
User Management: Additionally, the Super User has the ability to remove any user or admin, ensuring a clean and controlled user base.
The app’s authentication flow is structured to automatically direct users to the correct dashboard based on their role upon login, creating a smooth and secure user experience. Redux handles the secure storage of user data and roles, maintaining reliable data flow across the application.
