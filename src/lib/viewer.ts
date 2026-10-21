// Who is looking at the page. Phase 2 replaces this with the signed-in Clerk user.
export type Viewer = { kind: "public" } | { kind: "member" };

/**
 * Until sign-in exists, reviewers can preview the member view with `?as=member`.
 * Honoured only in development or when ALLOW_VIEWER_PREVIEW=1, never in production by default.
 */
export function previewAllowed() {
  return process.env.NODE_ENV === "development" || process.env.ALLOW_VIEWER_PREVIEW === "1";
}

export function viewerFromSearch(as: string | string[] | undefined): Viewer {
  return previewAllowed() && as === "member" ? { kind: "member" } : { kind: "public" };
}
