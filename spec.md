# Lean Genie Advisors

## Current State
Full website with aqua blue theme, glassmorphism, animated hero, case studies, industries, insights, global impact, resources, contact form, Calendly booking, LinkedIn footer icon. Backend includes authorization and blob-storage components. Careers form and admin panel were added but the draft has expired.

## Requested Changes (Diff)

### Add
- Rebuild/redeploy the full site as-is

### Modify
- Nothing new; restore full site to working state

### Remove
- Nothing

## Implementation Plan
1. Regenerate Motoko backend with authorization, blob-storage, and careers application storage (submitApplication, getApplications)
2. Rebuild full frontend with all tabs: Home, Industries, Case Studies, Insights, Global Impact, Explore Resources, About Us, Careers, Book a Call, Contact
3. Admin panel at /admin for reviewing job applications with Internet Identity auth
4. Verification meta tag and file preserved
5. Calendly widget embedded
6. LinkedIn footer link
