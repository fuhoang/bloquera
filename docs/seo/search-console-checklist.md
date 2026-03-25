# Search Console Checklist

Use this after the production domain is live and `NEXT_PUBLIC_SITE_URL` points to it.

## Setup

1. Verify the production domain in Google Search Console.
2. Confirm the production app returns:
   - `/robots.txt`
   - `/sitemap.xml`
3. Submit the sitemap URL in Search Console.

## Pages to inspect

- `/`
- `/pricing`
- `/learn-crypto`
- `/bitcoin-for-beginners`
- `/crypto-wallet-basics`
- `/what-is-bitcoin`
- `/how-crypto-transactions-work`

## What to confirm

1. Google sees the canonical URL you expect.
2. The page is indexable and not blocked by robots.
3. The rendered HTML includes the title and description you expect.
4. Open Graph images resolve correctly.
5. The page is linked internally from the homepage or footer.

## Ongoing checks

1. Watch the Indexing report for coverage or canonical conflicts.
2. Watch Performance for early query impressions.
3. Re-submit the sitemap after major public content additions.
4. Inspect newly published guide pages manually after deploys.
