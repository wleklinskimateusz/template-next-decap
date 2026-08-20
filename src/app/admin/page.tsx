import Script from "next/script";


export const metadata = {
  // do not index this page
  robots: {
    index: false,
    follow: false,
  },
  title: "Admin - Ezin",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function AdminPage() {
  return (
    <>
      <link href="/cms/config.yml" type="text/yaml" rel="cms-config-url" />
      <Script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></Script>
    </>
  );
}
