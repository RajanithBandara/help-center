import type { Core } from '@strapi/strapi';

/**
 * Help Center content — the single source of truth for the seeded knowledge base.
 * Categories map 1:1 to the cards on /support/helpcenter; `icon` is a Lucide icon
 * name resolved on the frontend. Each FAQ references its category by `category`
 * title and renders under that topic's filter.
 */
const CATEGORIES = [
  { title: 'Getting Started', description: 'Set up your account and build your first site.', icon: 'Rocket', order: 1 },
  { title: 'Charts & Data', description: 'Create charts, tables, and connect your data.', icon: 'BarChart3', order: 2 },
  { title: 'Billing & Plans', description: 'Manage subscriptions, invoices, and upgrades.', icon: 'CreditCard', order: 3 },
  { title: 'Account & Settings', description: 'Profile, security, and workspace preferences.', icon: 'Settings', order: 4 },
] as const;

const FAQS = [
  // Getting Started
  { question: 'How do I create my first site?', answer: 'From Home, click New Site, choose a template, and the page builder opens so you can start editing right away.', order: 1, category: 'Getting Started' },
  { question: 'How do I publish a site?', answer: 'Open the site in the editor and click Publish in the top bar. Once published, it becomes available at your public URL.', order: 2, category: 'Getting Started' },
  // Charts & Data
  { question: 'How do I connect a data source?', answer: 'Open the Data Library, choose Add dataset, and upload a file or paste your data into the grid. Charts and tables can then bind to that dataset.', order: 3, category: 'Charts & Data' },
  { question: 'Can I share a chart with my team?', answer: 'Yes — use the Share action on any chart to grant view access to teammates by email address.', order: 4, category: 'Charts & Data' },
  // Billing & Plans
  { question: 'How do I upgrade my plan?', answer: 'Go to Account & Settings → Billing and choose Upgrade. Your new plan limits apply immediately after checkout.', order: 5, category: 'Billing & Plans' },
  { question: 'Where can I find my invoices?', answer: 'All past invoices live under Account & Settings → Billing → Invoices, where you can download each one as a PDF.', order: 6, category: 'Billing & Plans' },
  // Account & Settings
  { question: 'How do I change the theme?', answer: 'Open the profile menu and choose Appearance to switch between Light, Dark, and System themes.', order: 7, category: 'Account & Settings' },
  { question: 'How do I create a support ticket?', answer: 'Go to Support → Create a Ticket, fill in the details, and our team will follow up with you by email.', order: 8, category: 'Account & Settings' },
] as const;

/**
 * Grant the public role read access (find / findOne) to the given API uids.
 * Idempotent: only creates permissions that don't already exist.
 */
async function grantPublicReadAccess(strapi: Core.Strapi, uids: string[]) {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) return;

  const actions = uids.flatMap((uid) => [`${uid}.find`, `${uid}.findOne`]);

  for (const action of actions) {
    const existing = await strapi
      .query('plugin::users-permissions.permission')
      .findOne({ where: { action, role: publicRole.id } });

    if (!existing) {
      await strapi.query('plugin::users-permissions.permission').create({
        data: { action, role: publicRole.id },
      });
      strapi.log.info(`[help-center] granted public permission: ${action}`);
    }
  }
}

/** Create any category from CATEGORIES that doesn't already exist (matched by title). */
async function ensureCategories(strapi: Core.Strapi) {
  const existing = await strapi
    .documents('api::category.category')
    .findMany({ status: 'published', limit: 100 });
  const existingTitles = new Set(existing.map((c) => c.title as string));

  for (const category of CATEGORIES) {
    if (existingTitles.has(category.title)) continue;
    await strapi.documents('api::category.category').create({ data: category, status: 'published' });
    strapi.log.info(`[help-center] created category "${category.title}"`);
  }
}

/**
 * Ensure every FAQ in FAQS exists, is linked to its category, and carries the
 * canonical `order`. Matched by question. Creates missing FAQs and reconciles
 * the organizational fields (`order`, `category`) when they drift — but never
 * overwrites the `answer`, so wording edits made in the admin are preserved.
 */
async function ensureFaqs(strapi: Core.Strapi) {
  const categories = await strapi
    .documents('api::category.category')
    .findMany({ status: 'published', limit: 100 });
  const categoryDocIdByTitle = new Map(categories.map((c) => [c.title as string, c.documentId]));

  const existing = await strapi
    .documents('api::faq.faq')
    .findMany({ populate: { category: true }, status: 'published', limit: 100 });
  const existingByQuestion = new Map(existing.map((f) => [f.question as string, f]));

  for (const faq of FAQS) {
    const categoryDocId = categoryDocIdByTitle.get(faq.category);
    const found = existingByQuestion.get(faq.question);

    if (!found) {
      await strapi.documents('api::faq.faq').create({
        data: {
          question: faq.question,
          answer: faq.answer,
          order: faq.order,
          category: categoryDocId,
        },
        status: 'published',
      });
      strapi.log.info(`[help-center] created FAQ "${faq.question}" in ${faq.category}`);
      continue;
    }

    const currentCategory = (found as { category?: { title?: string } }).category;
    const driftedCategory = currentCategory?.title !== faq.category;
    const driftedOrder = (found as { order?: number }).order !== faq.order;

    if (driftedCategory || driftedOrder) {
      await strapi.documents('api::faq.faq').update({
        documentId: found.documentId,
        data: { order: faq.order, category: categoryDocId },
      });
      await strapi.documents('api::faq.faq').publish({ documentId: found.documentId });
      strapi.log.info(`[help-center] reconciled FAQ "${faq.question}" (order ${faq.order}, ${faq.category})`);
    }
  }
}

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await grantPublicReadAccess(strapi, ['api::category.category', 'api::faq.faq']);
    await ensureCategories(strapi);
    await ensureFaqs(strapi);
  },
};
