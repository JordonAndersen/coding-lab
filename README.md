# CodeLab: deploy guide

CodeLab is a static website (HTML + JavaScript, no build step) that uses **Supabase** for student accounts and saved progress, and **Netlify** for hosting.

- Supabase project: **CodeLab** (`cgkfwzyeismdinxgyxhl`, US West). Database tables and security rules are already set up.
- This folder is ready to upload to Netlify as-is.

---

## 1. Put the site on Netlify (about 2 minutes)

Pick one:

- **Drag and drop:** go to <https://app.netlify.com/drop> and drop this whole folder on the page.
- **Netlify CLI:** from this folder run `npx netlify-cli deploy --prod --dir .`
- **Git:** push this folder to a GitHub repo, then in Netlify choose *Add new site → Import an existing project*. Leave the build command empty and set the publish directory to `.`.

Write down your site address, for example `https://codelab-yourschool.netlify.app`.

## 2. Tell Supabase where the site lives (required)

Supabase dashboard → **CodeLab** project → **Authentication → URL Configuration**:

| Setting | Value |
| --- | --- |
| Site URL | `https://YOUR-SITE.netlify.app` |
| Redirect URLs | `https://YOUR-SITE.netlify.app/**` (add your custom domain too, if you use one) |

Without this, email confirmation and password-reset links won't come back to CodeLab.

## 3. Connect an email provider (required before students sign up)

Supabase's built-in email service **only sends to members of your Supabase team** and is heavily rate-limited. Until you connect your own provider, students won't receive confirmation or password-reset emails.

1. Create an account with an email service such as [Resend](https://resend.com/docs/send-with-supabase-smtp), Postmark, SendGrid or AWS SES, and verify your sending domain.
2. Supabase → **Authentication → Emails → SMTP Settings** → enable custom SMTP and paste the host, port, username, password and a From address (for example `no-reply@yourdomain.org`).
3. Supabase → **Authentication → Rate Limits** → raise the email limit to fit a class sign-up (for example, 100 per hour).

## 4. Recommended Auth settings

Supabase → **Authentication**:

- **Sign In / Providers → Email:** keep **Confirm email** turned on.
- **Password requirements:** minimum length **8**, and require letters + digits (the app enforces this too).
- **Attack protection:** turn on **CAPTCHA** (Cloudflare Turnstile is free) once the site is public, to stop bot sign-ups.
- **Email templates:** keep them short and plain. Students are more likely to find them outside the spam folder.

## 5. Try it

1. Open your Netlify site → **Create a free account**.
2. Confirm the email, sign in, complete a lesson, then sign in on another device: your progress follows you.
3. Open **My account** to rename yourself, switch lesson style, change your password, download your data, or delete the account.

---

## How student data is handled

| What | Stored? |
| --- | --- |
| Nickname (no real name required) | Yes, in `profiles` |
| Email + password | Yes, by Supabase Auth (passwords are hashed) |
| Learning progress: XP, quiz answers, code, notes | Yes, in `progress` |
| Birthday | **No.** It's only used in the browser to check age, then discarded |
| Lesson style (Simple / Full) | Yes, in `profiles` |

**Ages 13 and up only.** Sign-up starts with a neutral "When were you born?" screen. Anyone under 13 is turned away without anything being sent to the server, and the check can't be retried in the same browser tab. As a backstop, the database itself rejects any sign-up that didn't pass the age check. Visitors who can't make an account can still use CodeLab as a guest, with progress kept only on their own device.

**Security rules (Row Level Security):** each student can read and change only their own profile and progress. Students can't change their own age-check timestamp. Deleting an account removes the login, profile and progress together. These rules were tested directly against the database.

**Shared computers:** when a student signs out, their local copy of progress is wiped from that browser. Their work stays safe in their account.

**Supabase security advisor:** it shows one warning, that signed-in users can run `delete_my_account()`. That's intentional: the function can only delete the account of whoever calls it.

> I'm not a lawyer. If you roll this out through a school or district, check its student-privacy requirements (for example FERPA and your state's student-data laws), and consider publishing a short privacy page that matches the table above.

## Keep in mind

- **Free Supabase projects pause after about a week with no activity.** Upgrade to a paid plan, or open the dashboard to restore a paused project, before a class depends on it.
- The publishable key in `config.js` is meant to be public. Never put a *secret* key in this folder.
- Python, SQL, TypeScript and React run in the student's browser. Java, C#, C++, Go and Rust are copied to an online compiler (links in the app) and the output is pasted back to be checked.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page shell and styles |
| `app.js` | The app: lessons, editor, runners, accounts, sync |
| `config.js` | Supabase URL + publishable key |
| `content-*.js` | Full lessons, exercises, algorithm challenges |
| `simple-*.js` | Simple-mode cards (277 bite-size steps across all 70 lessons) |
| `harness.js` | Generates test programs for compiled languages |
| `docs-map.js` | Links from code in the editor to official documentation |
| `netlify.toml` | Netlify settings and security headers (CSP, HSTS, etc.) |
