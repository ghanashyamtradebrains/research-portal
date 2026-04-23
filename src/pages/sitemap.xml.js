function generateSiteMap() {
  const dynamicUrl = [
    "/sitemap/staticurl/sitemap.xml",
    "/sitemap/stocks/sitemap.xml",
    "/sitemap/index/sitemap.xml",
    "/sitemap/heatmap/sitemap.xml",
    "/sitemap/sectors/sitemap.xml",
    "/sitemap/industries/sitemap.xml",
    "/sitemap/superstars/sitemap.xml",
    "/sitemap/bucket/sitemap.xml",
    "/sitemap/corporateactions/sitemap.xml",
    "/sitemap/gainers/sitemap.xml",
    "/sitemap/losers/sitemap.xml",
    "/sitemap/gainers5D/sitemap.xml",
    "/sitemap/gainers1M/sitemap.xml",
    "/sitemap/losers5D/sitemap.xml",
    "/sitemap/losers1M/sitemap.xml",
    "/sitemap/mostactivestocks/sitemap.xml",
    "/sitemap/stockResearchReport/sitemap.xml",
    "/sitemap/watchlist/sitemap.xml",
    "/sitemap/portfolio/sitemap.xml",
    // "/sitemap/news/sitemap.xml",
    "/sitemap/ipos/sitemap.xml",
    "/sitemap/heatmapGlobal/sitemap.xml",
    "/sitemap/others/sitemap.xml",
    "/sitemap/institutionalInvest/sitemap.xml",
    "/sitemap/superstarsHeatmap/sitemap.xml",
    "/sitemap/businessHeatmap/sitemap.xml",
    "/sitemap/industryHeatmap/sitemap.xml",
    "/sitemap/heatmapAllStocks/sitemap.xml",
    "/sitemap/sectorHeatmaps/sitemap.xml",
    "/sitemap/historicData/sitemap.xml",
    "/sitemap/stockDetails/sitemap.xml",
    "/sitemap/company-list/sitemap.xml",
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${dynamicUrl
    ?.map(
      (items) =>
        `<sitemap>
    <loc>https://portal.tradebrains.in${items}</loc>
    </sitemap>`,
    )
    .join(" ")}
  </sitemapindex>`;
}

function SiteMap() {}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
  // ggg
  return {
    props: {},
  };
}

export default SiteMap;
