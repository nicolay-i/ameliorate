import { initAuth0 } from "@auth0/nextjs-auth0";

import fs from "node:fs";

const baseURL = process.env.AUTH0_BASE_URL;
const issuerBaseURLFromEnv = process.env.AUTH0_ISSUER_BASE_URL;
const auth0DomainFromEnv = process.env.AUTH0_DOMAIN;
const issuerBaseURLDockerOverride = process.env.AUTH0_ISSUER_BASE_URL_DOCKER;

const isRunningInDocker = () =>
  fs.existsSync("/.dockerenv") || fs.existsSync("/run/.containerenv");

const normalizeUrlNoTrailingSlash = (url: string) => url.trim().replace(/\/+$/, "");

const deriveIssuerBaseURL = () => {
  if (issuerBaseURLFromEnv) return normalizeUrlNoTrailingSlash(issuerBaseURLFromEnv);

  if (!auth0DomainFromEnv) return undefined;

  // Accept either raw domain (dev-xxx.us.auth0.com) or full URL (https://dev-xxx.us.auth0.com)
  const domainOrUrl = auth0DomainFromEnv.trim();
  if (/^https?:\/\//i.test(domainOrUrl)) return normalizeUrlNoTrailingSlash(domainOrUrl);
  return `https://${domainOrUrl}`;
};

const derivedIssuerBaseURL = deriveIssuerBaseURL();

if (!derivedIssuerBaseURL) {
  throw new Error(
    "Auth0 misconfigured: issuerBaseURL is required. Set AUTH0_DOMAIN (recommended) or AUTH0_ISSUER_BASE_URL in the runtime environment.",
  );
}

const normalizeIssuerBaseURLForDocker = (issuerBaseURL: string | undefined) => {
  if (!issuerBaseURL) return issuerBaseURL;

  // When Next.js runs inside Docker but `mock-auth` is published on the host (port-mapped),
  // `localhost` points at the app container, not the host.
  if (isRunningInDocker() && /^https?:\/\/localhost(?::\d+)?/i.test(issuerBaseURL)) {
    // Don't guess a hostname here: `host.docker.internal` is not guaranteed on Linux.
    // If you need a different issuer URL inside containers, set `AUTH0_ISSUER_BASE_URL_DOCKER`.
    return issuerBaseURLDockerOverride ?? issuerBaseURL;
  }

  return issuerBaseURL;
};

/**
 * For some reason, after nextjs 13.4.19 -> 14.2.2 upgrade, letting auth0 create its own instance
 * on usage of `handleAuth` resulted in `TypeError: "baseURL" is required`, but this sets it
 * properly.
 *
 * This is all despite
 * 1. `process.env.AUTH0_BASE_URL` logging the correct value to console before `handleAuth` is called
 * 2. nextjs-auth0 pulling the base url the same exact way https://github.com/auth0/nextjs-auth0/blob/951a24864c61eec98702f91eb7784555d54916da/src/config.ts#L151
 * 3. nextjs-auth0 apparently being set intentionally to handle env vars from `next.config.js`
 * (which is where we're setting it) https://github.com/auth0/nextjs-auth0/blob/951a24864c61eec98702f91eb7784555d54916da/src/config.ts#L148
 */
export const auth0 = initAuth0({
  baseURL,
  issuerBaseURL: normalizeIssuerBaseURLForDocker(derivedIssuerBaseURL),
});
