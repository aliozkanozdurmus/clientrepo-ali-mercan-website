# Deployment Notes

## Standard Flow

1. Validate deployment environment variables.
2. Run lint/build checks.
3. Deploy from `main` using your CI/CD platform.
4. Verify critical pages and integrations.

## Security Checks

- Confirm no secrets in tracked files.
- Confirm `.env` files remain ignored.
- Confirm no private certificates or keys are committed.
