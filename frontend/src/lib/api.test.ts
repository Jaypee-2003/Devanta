import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getApiBaseUrl, fetchGithubPreview } from "./api";

describe("getApiBaseUrl", () => {
  const original = process.env.NEXT_PUBLIC_API_URL;

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_API_URL;
  });

  afterEach(() => {
    if (original === undefined) {
      delete process.env.NEXT_PUBLIC_API_URL;
    } else {
      process.env.NEXT_PUBLIC_API_URL = original;
    }
  });

  it("defaults to localhost:5001", () => {
    expect(getApiBaseUrl()).toBe("http://localhost:5001");
  });

  it("strips trailing slash from env URL", () => {
    process.env.NEXT_PUBLIC_API_URL = "https://api.example.com/";
    expect(getApiBaseUrl()).toBe("https://api.example.com");
  });

  it("ignores empty env string", () => {
    process.env.NEXT_PUBLIC_API_URL = "   ";
    expect(getApiBaseUrl()).toBe("http://localhost:5001");
  });
});

describe("fetchGithubPreview", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () =>
            Promise.resolve({
              username: "octocat",
              data: {
                about: {
                  name: "Octocat",
                  email: "",
                  avatar_url: null,
                  bio: "Test",
                },
                featured_projects: [],
                tech_stack: [],
                github_stats: {
                  total_repos: 0,
                  total_stars: 0,
                  primary_language: "N/A",
                },
                contact: {
                  email: "",
                  github_username: "octocat",
                  socials: { github: "https://github.com/octocat" },
                },
              },
            }),
        } as Response),
      ),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("returns username and data on success", async () => {
    const result = await fetchGithubPreview("octocat");
    expect(result.username).toBe("octocat");
    expect(result.data.about.name).toBe("Octocat");
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/v1/github/preview"),
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("throws with API error message on failure", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ error: "GitHub user not found." }),
    } as Response);

    await expect(fetchGithubPreview("nope")).rejects.toThrow("GitHub user not found.");
  });
});
