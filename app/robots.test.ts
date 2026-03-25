import robots from "@/app/robots";

describe("robots", () => {
  it("allows public marketing pages and blocks private areas", () => {
    const result = robots();

    expect(result.rules).toEqual({
      userAgent: "*",
      allow: [
        "/",
        "/pricing",
        "/learn-crypto",
        "/bitcoin-for-beginners",
        "/crypto-wallet-basics",
        "/what-is-bitcoin",
        "/how-crypto-transactions-work",
      ],
      disallow: ["/auth/", "/dashboard", "/learn", "/profiles", "/purchases", "/api/"],
    });
    expect(result.sitemap).toBe("http://localhost:3000/sitemap.xml");
  });
});
