/**
 * Seed content for the Synpact platform documentation (api::doc.doc).
 * Bodies are Markdown, rendered on the frontend docs pages.
 * Grouped into sections; `order` is global so the docs index reads top-to-bottom.
 */

export type DocSeed = {
  title: string;
  slug: string;
  section: string;
  excerpt: string;
  body: string;
  order: number;
};

/** Canonical display order of documentation sections. */
export const DOC_SECTIONS = [
  'Getting Started',
  'Sites & Page Builder',
  'Charts',
  'Tables',
  'Data Library',
  'Sharing & Collaboration',
  'Account & Billing',
  'Support',
] as const;

export const DOCS: DocSeed[] = [
  {
    title: 'Welcome to Synpact',
    slug: 'welcome-to-synpact',
    section: 'Getting Started',
    order: 1,
    excerpt: 'What Synpact is and what you can build with it.',
    body: `# Welcome to Synpact

Synpact is a platform for building and publishing **Impact & Sustainability report sites**. You design pages visually, bring your data to life with charts, tables and maps, and publish a polished public site — no code required.

## What you can do
- **Build sites** with a live page builder organised into pages, sections and components.
- **Visualise data** with charts, data tables and maps that bind to your own datasets.
- **Collaborate** by sharing sites, charts and tables with teammates by email.
- **Publish** to a public URL and update it any time.

## How the pieces fit together
- The **Data Library** holds the datasets your charts and tables read from.
- **Charts** and **Tables** turn those datasets into visuals you can reuse across sites.
- **Sites** are where you assemble everything into pages and publish them.
- **Support** (this Help Center, plus tickets) is here whenever you get stuck.

Continue with **Creating your first site** to get going.`,
  },
  {
    title: 'Creating your first site',
    slug: 'creating-your-first-site',
    section: 'Getting Started',
    order: 2,
    excerpt: 'Go from an empty workspace to a published site in a few steps.',
    body: `# Creating your first site

## 1. Create the site
From **Home**, choose **New Site** and pick a template to start from. The site opens directly in the page builder.

## 2. Build your pages
A site is made of one or more **pages**. Each page is a stack of **sections**, and each section holds **columns** with **components** (headings, text, charts, tables, images and more). Add and arrange these to lay out your content.

## 3. Add your data
Charts and tables read from datasets in the **Data Library**. Upload or paste your data there first, then drop a chart or table component onto the page and bind it to a dataset.

## 4. Publish
When you're ready, click **Publish** in the top bar. Your site becomes available at its public URL and can be re-published whenever you make changes.

> Tip: use **Preview** mode while editing to see exactly what visitors will see.`,
  },
  {
    title: 'How the page builder is structured',
    slug: 'how-the-page-builder-is-structured',
    section: 'Sites & Page Builder',
    order: 3,
    excerpt: 'Pages, sections, columns and components — the building blocks of every site.',
    body: `# How the page builder is structured

Every Synpact site follows the same simple hierarchy:

**Site → Pages → Sections → Columns → Components**

## Pages
A site has one or more pages, each with its own slug in the published URL.

## Sections
A page is a vertical stack of sections. A section can be:
- **Standard** — a simple row of columns, or
- **Tabs** — multiple tabbed surfaces, each with its own content.

## Columns
Each section is divided into columns using a layout preset (for example one, two or three columns). Columns hold your components.

## Components
Components are the actual content. There are around twenty types, including headings, text, rich text, images, charts, tables, maps and nested tabs. Because some components (like nested tabs) can contain other components, the structure is fully nestable.

Understanding this tree makes it easier to find and edit any piece of content on the page.`,
  },
  {
    title: 'Adding and editing components',
    slug: 'adding-and-editing-components',
    section: 'Sites & Page Builder',
    order: 4,
    excerpt: 'Insert components, edit their content, and style them.',
    body: `# Adding and editing components

## Adding a component
Open a column's add menu and pick a component type from the picker (heading, text, chart, table, image, map and more). It's inserted into that column.

## Editing content
Select a component to open its editor in the right-hand panel. Each component type has its own content fields — for example a heading has its text and level, while a chart has its dataset and series settings.

## Styling
The same panel has style controls (spacing, colours, alignment and so on) so you can match your brand. Changes appear live in the canvas.

## Builder vs Preview
Switch between **Builder** mode (editing) and **Preview** mode (what visitors see) at any time. Your work is saved automatically as you edit.`,
  },
  {
    title: 'Publishing and viewing your site',
    slug: 'publishing-and-viewing-your-site',
    section: 'Sites & Page Builder',
    order: 5,
    excerpt: 'Publish your changes and share the public link.',
    body: `# Publishing and viewing your site

## Publishing
Click **Publish** in the editor's top bar. Synpact assembles your pages and header into a snapshot and makes it live at your site's public URL.

## Re-publishing
Edits you make in the builder aren't visible to the public until you publish again. Publish as often as you like — each publish replaces the previous live version.

## Viewing the published site
Your published site is served at its public address, with each page reachable by its slug. Share that link with anyone — no account required to view it.`,
  },
  {
    title: 'Creating a chart',
    slug: 'creating-a-chart',
    section: 'Charts',
    order: 6,
    excerpt: 'Turn a dataset into a chart you can reuse across sites.',
    body: `# Creating a chart

## 1. Start a chart
Go to **Charts** and create a new chart. You'll work in a dedicated chart editor.

## 2. Connect data
Charts read from datasets in your **Data Library**. Choose the dataset and the columns that make up your series and categories. You can edit values directly in the datasheet grid.

## 3. Configure
Pick the chart type, adjust series, labels and colours, and preview the result live.

## 4. Use it on a site
Once saved, a chart can be added to any site page with the **Chart** component and will display your latest configuration.`,
  },
  {
    title: 'Chart types and styling',
    slug: 'chart-types-and-styling',
    section: 'Charts',
    order: 7,
    excerpt: 'The chart types available and how to style them.',
    body: `# Chart types and styling

Synpact supports a range of visualisations, including bar, line and area charts, and geographic **maps** for location-based data.

## Styling
Each chart offers controls for:
- **Colours** — apply your palette to series and categories.
- **Labels** — axis titles, data labels and legends.
- **Series** — choose which columns are plotted and how.

## Reusing charts
A chart is created once and can be placed on multiple site pages. Updating the chart updates it everywhere it's used.`,
  },
  {
    title: 'Building tables',
    slug: 'building-tables',
    section: 'Tables',
    order: 8,
    excerpt: 'Create data tables and add them to your pages.',
    body: `# Building tables

## Creating a table
Go to **Tables** and create a new table. The table editor uses a spreadsheet-style **datasheet grid** where you can type or paste values.

## Connecting data
Like charts, tables can read from datasets in the **Data Library**, or you can enter values directly in the grid.

## Adding a table to a site
Use the **Table** component in the page builder to place a saved table on any page.`,
  },
  {
    title: 'Connecting and managing datasets',
    slug: 'connecting-and-managing-datasets',
    section: 'Data Library',
    order: 9,
    excerpt: 'Upload, paste and manage the data behind your charts and tables.',
    body: `# Connecting and managing datasets

The **Data Library** is where your data lives. Charts and tables bind to datasets here, so this is usually the first stop when building visuals.

## Adding a dataset
From **Home → Data Library**, choose **Add dataset** and either upload a file or paste your data into the grid.

## Editing data
Open any dataset to edit its values in the datasheet grid. Charts and tables that use the dataset pick up your changes.

## Reusing data
One dataset can power many charts and tables, keeping your numbers consistent across every site.`,
  },
  {
    title: 'Sharing sites, charts and tables',
    slug: 'sharing-sites-charts-and-tables',
    section: 'Sharing & Collaboration',
    order: 10,
    excerpt: 'Give teammates access by email, and find what was shared with you.',
    body: `# Sharing sites, charts and tables

## Sharing
Use the **Share** action on a site, chart or table to grant access to a teammate by their **email address**. They'll be able to view the shared item.

## Where shared items appear
Items shared with you show up in the **Shared with me** views under Charts, Tables and Sites.

## Starring
Star the items you use most so they're easy to find in your **Starred** views.`,
  },
  {
    title: 'Account, profile and themes',
    slug: 'account-profile-and-themes',
    section: 'Account & Billing',
    order: 11,
    excerpt: 'Manage your profile and switch between light and dark themes.',
    body: `# Account, profile and themes

## Profile
Open the **profile menu** (top of the app) to manage your account details and preferences.

## Themes
Choose **Appearance** in the profile menu to switch between **Light**, **Dark** and **System** themes. System follows your operating-system setting automatically.

## Security
Your sign-in is handled securely; you stay signed in across sessions until you sign out.`,
  },
  {
    title: 'Plans and billing',
    slug: 'plans-and-billing',
    section: 'Account & Billing',
    order: 12,
    excerpt: 'Upgrade your plan and find your invoices.',
    body: `# Plans and billing

## Upgrading
Go to **Account & Settings → Billing** and choose **Upgrade**. New plan limits apply immediately after checkout.

## Invoices
All past invoices are available under **Account & Settings → Billing → Invoices**, where you can download each as a PDF.

## Changing plans
You can move between plans as your needs change; your access updates to match the new plan.`,
  },
  {
    title: 'Getting help',
    slug: 'getting-help',
    section: 'Support',
    order: 13,
    excerpt: 'Find answers and reach the support team.',
    body: `# Getting help

## Help Center
The **Help Center** (where you are now) has FAQs and these documentation guides. Use the search box or browse by topic.

## Creating a ticket
If you can't find an answer, go to **Support → Create a Ticket**. Describe your issue and our team will follow up with you by email.

## Tracking tickets
See the status of your requests any time in the **Support Dashboard**, which lists your open and past tickets.`,
  },
];
