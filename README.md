# Cocoon Lab site

Contact: rashid@cocoonlab.ai

## Contact form issue intake

The contact page submits to `/api/contact`, which creates a GitHub issue from each message.

Set these environment variables in Vercel:

- `CONTACT_GITHUB_REPO=owner/repo`
- `CONTACT_GITHUB_TOKEN=github_token_with_repo_issue_access`
- `CONTACT_GITHUB_LABELS=contact,website` (optional)
- `CONTACT_GITHUB_ASSIGNEES=username1,username2` (optional)
