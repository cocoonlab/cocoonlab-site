# Cocoon Lab site

Contact: rashid@cocoonlab.ai

## Contact form issue intake

The contact page submits to `/api/contact`, which creates a GitHub issue from each message.

### Required Vercel environment variables

- `CONTACT_GITHUB_REPO=owner/repo`
- `CONTACT_GITHUB_TOKEN=github_token_with_issue_write_access`

### Optional Vercel environment variables

- `CONTACT_GITHUB_LABELS=contact,website`
- `CONTACT_GITHUB_ASSIGNEES=username1,username2`
- `CONTACT_GITHUB_API_URL=https://api.github.com`

### Recommended GitHub token setup

Use a fine-grained personal access token rather than a broad classic token.

1. In GitHub, open `Settings` -> `Developer settings` -> `Personal access tokens` -> `Fine-grained tokens`.
2. Click `Generate new token`.
3. Choose the account or organization that owns the repository.
4. Restrict the token to the single repository you want the contact form to write into.
5. Set repository permissions:
   - `Issues: Read and write`
   - `Metadata: Read-only`
6. Generate the token and copy it immediately. GitHub will only show it once.
7. If the repository belongs to an organization, the token may need organization approval before it can access that repository.

If you use `CONTACT_GITHUB_ASSIGNEES`, the token owner must also be allowed to assign issues in that repository. If assignee or label configuration is invalid, the API now still creates the issue and only skips the optional assignment step.

### Vercel setup

1. Open your project in Vercel.
2. Go to `Settings` -> `Environment Variables`.
3. Add `CONTACT_GITHUB_REPO`.
4. Add `CONTACT_GITHUB_TOKEN`.
5. Optionally add labels and assignees.
6. Save the variables for `Production` and `Preview` if you want both environments to work.
7. Redeploy the project after saving the variables.

### Notes

- If the environment variables are missing or invalid, the public form now shows a generic temporary-unavailable message instead of exposing internal configuration details.
- The API creates the GitHub issue first, then applies labels and assignees as a best-effort step so optional metadata does not block intake.
