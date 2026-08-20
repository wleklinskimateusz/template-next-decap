import { redirect } from "next/navigation";
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
  redirect("/admin/index.html")

}
