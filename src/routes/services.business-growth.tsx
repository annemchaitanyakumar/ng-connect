import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ServicePage } from "@/components/ServicePage";
import { getService } from "@/data/services";

const slug = "business-growth";
const svc = getService(slug)!;

export const Route = createFileRoute("/services/business-growth")({
  head: () => ({
    meta: [
      { title: `${svc.title} — Networq Global` },
      { name: "description", content: svc.tagline },
      { property: "og:title", content: `${svc.title} — Networq Global` },
      { property: "og:description", content: svc.tagline },
    ],
  }),
  component: () => (
    <SiteLayout>
      <ServicePage service={svc} />
    </SiteLayout>
  ),
});
