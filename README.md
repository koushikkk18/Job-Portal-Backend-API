
## 🚀 Complete API Routing Matrix

Use the following endpoints to interact with the backend server during testing:

### 1. Authentication & Session Management (Public Access)
- `POST /api/auth/register` — Create a new account. Body must specify name, email, password, and `role` (`seeker` or `employer`).
- `POST /api/auth/login` — Authenticate user credentials. Sets an `httpOnly` JWT session cookie.
- `GET /api/auth/logout` — Destroys the active authentication cookie.

### 2. Job Seeker Endpoints (Strictly Restricted to 'seeker' Role)
- `POST /ja` — Insert a new job application to a target company.
- `DELETE /ja/:id` — Delete a specific job application by its unique database ID.

### 3. Employer Endpoints (Strictly Restricted to 'employer' Role)
- `POST /api/jobs` — Publish a new job opening. Automatically assigns your user ID as `postedBy`.
- `GET /api/employer/jobs` — Retrieve all active job openings published by your company.
- `GET /api/jobs/:id/applicants` — View profiles of seekers who have applied to your specific job post.
- `PUT /api/applications/:id/status` — Move an applicant through the pipeline (Body: `status` -> `shortlisted` or `rejected`).

### 4. Admin Administration (Strictly Restricted to 'admin' Role)
- `GET /api/admin/users` — Fetch a global view of all registered system users.
- `DELETE /api/admin/users/:id` — Ban and completely wipe a user and their cascading records from the database.

