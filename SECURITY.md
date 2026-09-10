# Security policy

## Public repository scope

This repository contains a static project presentation and a non-persistent interface preview. It does not contain the operational Klightten Cloud service, private administration application, live data, infrastructure access, or production credentials.

## Responsible reporting

Do not publish suspected vulnerabilities, credentials, private account information, client filenames, or infrastructure details in a public issue. Use GitHub's private vulnerability reporting feature for sensitive reports when it is available for this repository.

## Repository hygiene

Before every release, verify that commits and generated artifacts exclude:

- Environment files, passwords, tokens, keys, and certificates
- Databases, account exports, sessions, logs, and backups
- Client workspaces, uploads, quarantine data, and Vault content
- Private addresses, tunnel credentials, and administration source

If sensitive information is exposed, revoke or rotate it immediately and remove it from Git history before continuing publication.
