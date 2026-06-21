import AppShell from "../../../../components/AppShell";

export default function SettingsRoute() {
  return (
    <AppShell activePath="/settings">
      <main className="min-h-screen lg:ml-72">
        <section className="px-container-margin-mobile py-16 md:px-container-margin-desktop">
          <h1 className="font-h1-desktop text-h1-desktop text-on-surface">Admin Settings</h1>
          <p className="mt-2 font-body-lg text-on-surface-variant">This page is ready for settings controls.</p>
        </section>
      </main>
    </AppShell>
  );
}