import type { AppModule } from "../../types";

/**
 * Placeholder for an app engine that is still being built. Replace the app's
 * own core.ts / index.ts with the real module.
 */
export function stubApp(name: string, accent: string): AppModule<Record<string, unknown>> {
  return {
    name,
    accent,
    chrome: "bare",
    ribbon: [{ id: "home", label: "Home", groups: [] }],
    dialogs: {},
    backstage: { templates: [], recent: [], formats: [], ext: "" },
    shortcuts: {},
    canvasCommands: [],
    initialUi: () => ({ selection: "" }),
    apply: (doc) => ({ doc }),
    ribbonState: () => ({}),
    Canvas: () => (
      <div className="flex h-full items-center justify-center bg-slate-50 p-6 text-center text-sm text-slate-600">
        The {name} simulation is still being built.
      </div>
    ),
    StatusBar: () => null,
  };
}
