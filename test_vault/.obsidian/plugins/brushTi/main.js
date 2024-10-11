/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => MyPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");

// src/tool.ts
var parseFrontmatter = async (app) => {
  const files = app.vault.getFiles();
  for (const file of files) {
    if (file.extension == "md") {
      const cache = app.metadataCache.getFileCache(file);
      const frontmatter = cache == null ? void 0 : cache.frontmatter;
      console.log(frontmatter);
      if (typeof frontmatter === "undefined") {
        const content2 = await app.vault.read(file);
        const newContent2 = "---\ntags:\n---\n" + content2;
        await app.vault.modify(file, newContent2);
        console.log(`Added tag frontmatter to ${file.name}`);
      } else {
        const content2 = await app.vault.read(file);
        const frontmatterMatch = content2.match(/^---\n([\s\S]*?)\n---/);
        if (frontmatterMatch) {
          const frontmatterString = frontmatterMatch[0];
          const frontmatterObj = detect(frontmatterString);
          if ("tags" in frontmatterObj) {
            console.log(frontmatter.tags);
          } else {
            app.fileManager.processFrontMatter(file, (frontmatter2) => {
              frontmatter2["tags"] = [];
            });
          }
        }
      }
      const content = await app.vault.read(file);
      const newContent = rmFrontmatter(content);
      const firstline = newContent.split("\n")[0];
      const tags = getFirstLineTags(firstline);
      if (tags != null) {
        console.log(`find first-line tags in ${file.name}: ${tags}`);
        const rcontent = content.replace(firstline, "");
        await app.vault.modify(file, rcontent);
        let tgl = [];
        if (typeof frontmatter != "undefined") {
          tgl = frontmatter["tags"];
        } else {
          tgl = [];
        }
        app.fileManager.processFrontMatter(file, (frontmatter2) => {
          if (frontmatter2["tags"] != null) {
            tags.forEach((tag) => {
              if (!frontmatter2["tags"].includes(tag)) {
                tgl.push(tag);
              }
            });
          } else {
            tgl = tags;
          }
          console.log("taget", tgl);
          frontmatter2["tags"] = tgl;
        });
      }
    }
  }
};
var detect = (frontmatter) => {
  const lines = frontmatter.split("\n");
  const obj = {};
  for (const line of lines) {
    const [key, value] = line.split(":").map((part) => part.trim());
    if (key) {
      obj[key] = value || true;
    }
  }
  return obj;
};
var rmFrontmatter = (content) => {
  const regex = /^---\n([\s\S]*?)\n---\n*/g;
  return content.replace(regex, "");
};
var getFirstLineTags = (content) => {
  const regex = /#\w+/g;
  const matches = content.match(regex);
  let res = [];
  if (matches) {
    matches.forEach((mat) => {
      res.push(mat.replace("#", ""));
    });
    return res;
  } else {
    return null;
  }
};

// src/main.ts
var DEFAULT_SETTINGS = {
  mySetting: "default"
};
var MyPlugin = class extends import_obsidian.Plugin {
  async onload() {
    await this.loadSettings();
    const ribbonIconEl = this.addRibbonIcon("dice", "Sample Plugin", (evt) => {
      new import_obsidian.Notice("This is a notice!");
    });
    ribbonIconEl.addClass("my-plugin-ribbon-class");
    const statusBarItemEl = this.addStatusBarItem();
    statusBarItemEl.setText("Status Bar Text");
    this.addCommand({
      id: "add-tag-frontmatter-to-all-files",
      name: "add tag frontmatter to all files",
      callback: () => {
        parseFrontmatter(this.app);
      }
    });
    this.addCommand({
      id: "sample-editor-command",
      name: "Sample editor command",
      editorCallback: (editor, view) => {
        console.log(editor.getSelection());
        editor.replaceSelection("Sample Editor Command");
      }
    });
    this.addSettingTab(new SampleSettingTab(this.app, this));
    this.registerDomEvent(document, "click", (evt) => {
      console.log("click", evt);
    });
    this.registerInterval(window.setInterval(() => console.log("setInterval"), 5 * 60 * 1e3));
  }
  onunload() {
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
var SampleSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    new import_obsidian.Setting(containerEl).setName("Setting #1").setDesc("It's a secret").addText((text) => text.setPlaceholder("Enter your secret").setValue(this.plugin.settings.mySetting).onChange(async (value) => {
      this.plugin.settings.mySetting = value;
      await this.plugin.saveSettings();
    }));
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL21haW4udHMiLCAiLi4vc3JjL3Rvb2wudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IEFwcCwgRWRpdG9yLCBNYXJrZG93blZpZXcsIE1vZGFsLCBOb3RpY2UsIFBsdWdpbiwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB7cGFyc2VGcm9udG1hdHRlcn0gZnJvbSAnLi90b29sJ1xuXG4vLyBSZW1lbWJlciB0byByZW5hbWUgdGhlc2UgY2xhc3NlcyBhbmQgaW50ZXJmYWNlcyFcblxuaW50ZXJmYWNlIE15UGx1Z2luU2V0dGluZ3Mge1xuXHRteVNldHRpbmc6IHN0cmluZztcbn1cblxuY29uc3QgREVGQVVMVF9TRVRUSU5HUzogTXlQbHVnaW5TZXR0aW5ncyA9IHtcblx0bXlTZXR0aW5nOiAnZGVmYXVsdCdcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuXHRzZXR0aW5nczogTXlQbHVnaW5TZXR0aW5ncztcblxuXHRhc3luYyBvbmxvYWQoKSB7XG5cdFx0YXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcblxuXHRcdC8vIFRoaXMgY3JlYXRlcyBhbiBpY29uIGluIHRoZSBsZWZ0IHJpYmJvbi5cblx0XHRjb25zdCByaWJib25JY29uRWwgPSB0aGlzLmFkZFJpYmJvbkljb24oJ2RpY2UnLCAnU2FtcGxlIFBsdWdpbicsIChldnQ6IE1vdXNlRXZlbnQpID0+IHtcblx0XHRcdC8vIENhbGxlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyB0aGUgaWNvbi5cblx0XHRcdG5ldyBOb3RpY2UoJ1RoaXMgaXMgYSBub3RpY2UhJyk7XG5cdFx0fSk7XG5cdFx0Ly8gUGVyZm9ybSBhZGRpdGlvbmFsIHRoaW5ncyB3aXRoIHRoZSByaWJib25cblx0XHRyaWJib25JY29uRWwuYWRkQ2xhc3MoJ215LXBsdWdpbi1yaWJib24tY2xhc3MnKTtcblxuXHRcdC8vIFRoaXMgYWRkcyBhIHN0YXR1cyBiYXIgaXRlbSB0byB0aGUgYm90dG9tIG9mIHRoZSBhcHAuIERvZXMgbm90IHdvcmsgb24gbW9iaWxlIGFwcHMuXG5cdFx0Y29uc3Qgc3RhdHVzQmFySXRlbUVsID0gdGhpcy5hZGRTdGF0dXNCYXJJdGVtKCk7XG5cdFx0c3RhdHVzQmFySXRlbUVsLnNldFRleHQoJ1N0YXR1cyBCYXIgVGV4dCcpO1xuXG5cdFx0Ly8gVGhpcyBhZGRzIGEgc2ltcGxlIGNvbW1hbmQgdGhhdCBjYW4gYmUgdHJpZ2dlcmVkIGFueXdoZXJlXG5cdFx0dGhpcy5hZGRDb21tYW5kKHtcblx0XHRcdGlkOiAnYWRkLXRhZy1mcm9udG1hdHRlci10by1hbGwtZmlsZXMnLFxuXHRcdFx0bmFtZTogJ2FkZCB0YWcgZnJvbnRtYXR0ZXIgdG8gYWxsIGZpbGVzJyxcblx0XHRcdGNhbGxiYWNrOiAoKSA9PiB7XG5cdFx0XHRcdHBhcnNlRnJvbnRtYXR0ZXIodGhpcy5hcHApXG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0Ly8gVGhpcyBhZGRzIGFuIGVkaXRvciBjb21tYW5kIHRoYXQgY2FuIHBlcmZvcm0gc29tZSBvcGVyYXRpb24gb24gdGhlIGN1cnJlbnQgZWRpdG9yIGluc3RhbmNlXG5cdFx0dGhpcy5hZGRDb21tYW5kKHtcblx0XHRcdGlkOiAnc2FtcGxlLWVkaXRvci1jb21tYW5kJyxcblx0XHRcdG5hbWU6ICdTYW1wbGUgZWRpdG9yIGNvbW1hbmQnLFxuXHRcdFx0ZWRpdG9yQ2FsbGJhY2s6IChlZGl0b3I6IEVkaXRvciwgdmlldzogTWFya2Rvd25WaWV3KSA9PiB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGVkaXRvci5nZXRTZWxlY3Rpb24oKSk7XG5cdFx0XHRcdGVkaXRvci5yZXBsYWNlU2VsZWN0aW9uKCdTYW1wbGUgRWRpdG9yIENvbW1hbmQnKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XG5cblx0XHR0aGlzLmFkZFNldHRpbmdUYWIobmV3IFNhbXBsZVNldHRpbmdUYWIodGhpcy5hcHAsIHRoaXMpKTtcblxuXHRcdC8vIElmIHRoZSBwbHVnaW4gaG9va3MgdXAgYW55IGdsb2JhbCBET00gZXZlbnRzIChvbiBwYXJ0cyBvZiB0aGUgYXBwIHRoYXQgZG9lc24ndCBiZWxvbmcgdG8gdGhpcyBwbHVnaW4pXG5cdFx0Ly8gVXNpbmcgdGhpcyBmdW5jdGlvbiB3aWxsIGF1dG9tYXRpY2FsbHkgcmVtb3ZlIHRoZSBldmVudCBsaXN0ZW5lciB3aGVuIHRoaXMgcGx1Z2luIGlzIGRpc2FibGVkLlxuXHRcdHRoaXMucmVnaXN0ZXJEb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJywgKGV2dDogTW91c2VFdmVudCkgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coJ2NsaWNrJywgZXZ0KTtcblx0XHR9KTtcblxuXHRcdC8vIFdoZW4gcmVnaXN0ZXJpbmcgaW50ZXJ2YWxzLCB0aGlzIGZ1bmN0aW9uIHdpbGwgYXV0b21hdGljYWxseSBjbGVhciB0aGUgaW50ZXJ2YWwgd2hlbiB0aGUgcGx1Z2luIGlzIGRpc2FibGVkLlxuXHRcdHRoaXMucmVnaXN0ZXJJbnRlcnZhbCh3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4gY29uc29sZS5sb2coJ3NldEludGVydmFsJyksIDUgKiA2MCAqIDEwMDApKTtcblx0fVxuXG5cdG9udW5sb2FkKCkge1xuXG5cdH1cblxuXHRhc3luYyBsb2FkU2V0dGluZ3MoKSB7XG5cdFx0dGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfU0VUVElOR1MsIGF3YWl0IHRoaXMubG9hZERhdGEoKSk7XG5cdH1cblxuXHRhc3luYyBzYXZlU2V0dGluZ3MoKSB7XG5cdFx0YXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcblx0fVxufVxuXG5jbGFzcyBTYW1wbGVNb2RhbCBleHRlbmRzIE1vZGFsIHtcblx0Y29uc3RydWN0b3IoYXBwOiBBcHApIHtcblx0XHRzdXBlcihhcHApO1xuXHR9XG5cblx0b25PcGVuKCkge1xuXHRcdGNvbnN0IHtjb250ZW50RWx9ID0gdGhpcztcblx0XHRjb250ZW50RWwuc2V0VGV4dCgnV29haCEnKTtcblx0fVxuXG5cdG9uQ2xvc2UoKSB7XG5cdFx0Y29uc3Qge2NvbnRlbnRFbH0gPSB0aGlzO1xuXHRcdGNvbnRlbnRFbC5lbXB0eSgpO1xuXHR9XG59XG5cbmNsYXNzIFNhbXBsZVNldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcblx0cGx1Z2luOiBNeVBsdWdpbjtcblxuXHRjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBNeVBsdWdpbikge1xuXHRcdHN1cGVyKGFwcCwgcGx1Z2luKTtcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcblx0fVxuXG5cdGRpc3BsYXkoKTogdm9pZCB7XG5cdFx0Y29uc3Qge2NvbnRhaW5lckVsfSA9IHRoaXM7XG5cblx0XHRjb250YWluZXJFbC5lbXB0eSgpO1xuXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHQuc2V0TmFtZSgnU2V0dGluZyAjMScpXG5cdFx0XHQuc2V0RGVzYygnSXRcXCdzIGEgc2VjcmV0Jylcblx0XHRcdC5hZGRUZXh0KHRleHQgPT4gdGV4dFxuXHRcdFx0XHQuc2V0UGxhY2Vob2xkZXIoJ0VudGVyIHlvdXIgc2VjcmV0Jylcblx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLm15U2V0dGluZylcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLm15U2V0dGluZyA9IHZhbHVlO1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHR9KSk7XG5cdH1cbn1cbiIsICJpbXBvcnQgeyBBcHAgLFZhdWx0LE1ldGFkYXRhQ2FjaGV9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5leHBvcnQgY29uc3QgcGFyc2VGcm9udG1hdHRlciA9IGFzeW5jIChhcHA6QXBwKT0+e1xuICAgIGNvbnN0IGZpbGVzID0gYXBwLnZhdWx0LmdldEZpbGVzKClcbiAgICAvLyBjb25zb2xlLmxvZyhmaWxlcylcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHsgIFxuICAgICAgIGlmKGZpbGUuZXh0ZW5zaW9uPT0nbWQnKXtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZmlsZS5leHRlbnNpb24pXG4gICAgICAgIGNvbnN0IGNhY2hlID0gYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKGZpbGUpOyAgXG4gICAgICAgIGNvbnN0IGZyb250bWF0dGVyID0gY2FjaGU/LmZyb250bWF0dGVyOyAgXG4gICAgICAgIGNvbnNvbGUubG9nKGZyb250bWF0dGVyKTsgIFxuICAgIFxuICAgICAgICBpZiAodHlwZW9mIGZyb250bWF0dGVyID09PSBcInVuZGVmaW5lZFwiKSB7ICBcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBhcHAudmF1bHQucmVhZChmaWxlKTsgIFxuICAgICAgICAgICAgY29uc3QgbmV3Q29udGVudCA9IFwiLS0tXFxudGFnczpcXG4tLS1cXG5cIiArIGNvbnRlbnQ7IC8vIFx1NkNFOFx1NjEwRlx1NkRGQlx1NTJBMFx1NjM2Mlx1ODg0Q1x1N0IyNiAgXG4gICAgICAgICAgICBhd2FpdCBhcHAudmF1bHQubW9kaWZ5KGZpbGUsIG5ld0NvbnRlbnQpOyAgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgQWRkZWQgdGFnIGZyb250bWF0dGVyIHRvICR7ZmlsZS5uYW1lfWApOyAgXG4gICAgICAgIH0gZWxzZSB7ICBcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBhcHAudmF1bHQucmVhZChmaWxlKTsgIFxuICAgICAgICAgICAgY29uc3QgZnJvbnRtYXR0ZXJNYXRjaCA9IGNvbnRlbnQubWF0Y2goL14tLS1cXG4oW1xcc1xcU10qPylcXG4tLS0vKTsgIFxuICAgICAgICAgICAgaWYgKGZyb250bWF0dGVyTWF0Y2gpIHsgIFxuICAgICAgICAgICAgICAgIGNvbnN0IGZyb250bWF0dGVyU3RyaW5nID0gZnJvbnRtYXR0ZXJNYXRjaFswXTsgIFxuICAgICAgICAgICAgICAgIGNvbnN0IGZyb250bWF0dGVyT2JqID0gZGV0ZWN0KGZyb250bWF0dGVyU3RyaW5nKTsgIFxuICAgIFxuICAgICAgICAgICAgICAgIC8vIGRldGVjdCBcInRhZ3NcIiBrZXkgIFxuICAgICAgICAgICAgICAgIGlmICgndGFncycgaW4gZnJvbnRtYXR0ZXJPYmopIHsgIFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhmcm9udG1hdHRlci50YWdzKVxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgVGhlIGZpbGUgJHtmcm9udG1hdHRlci50YWdzfSBoYXMgXCJ0YWdzXCIgaW4gZnJvbnRtYXR0ZXIuYCk7ICBcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAgXG4gICAgICAgICAgICAgICAgICAgIGFwcC5maWxlTWFuYWdlci5wcm9jZXNzRnJvbnRNYXR0ZXIoZmlsZSwoZnJvbnRtYXR0ZXIpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9udG1hdHRlclsndGFncyddID0gW11cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYFRoZSBmaWxlICR7ZmlsZS5uYW1lfSBkb2VzIG5vdCBoYXZlIFwidGFnc1wiIGluIGZyb250bWF0dGVyLmApOyAgXG4gICAgICAgICAgICAgICAgfSAgXG4gICAgICAgICAgICB9ICBcbiAgICAgICAgfSAgXG5cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBhcHAudmF1bHQucmVhZChmaWxlKTsgIFxuICAgICAgICBcbiAgICAgICAgY29uc3QgbmV3Q29udGVudCA9ICBybUZyb250bWF0dGVyKGNvbnRlbnQpXG4gICAgICAgIGNvbnN0IGZpcnN0bGluZSA9IG5ld0NvbnRlbnQuc3BsaXQoJ1xcbicpWzBdXG4gICAgICAgIGNvbnN0IHRhZ3MgPSBnZXRGaXJzdExpbmVUYWdzKGZpcnN0bGluZSlcbiAgICAgICAgaWYodGFncyE9bnVsbCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgZmluZCBmaXJzdC1saW5lIHRhZ3MgaW4gJHtmaWxlLm5hbWV9OiAke3RhZ3N9YClcbiAgICAgICAgICAgIGNvbnN0IHJjb250ZW50ID0gY29udGVudC5yZXBsYWNlKGZpcnN0bGluZSxcIlwiKVxuICAgICAgICAgICAgYXdhaXQgYXBwLnZhdWx0Lm1vZGlmeShmaWxlLHJjb250ZW50KVxuICAgICAgICAgICAgbGV0IHRnbDogc3RyaW5nW10gPSBbXVxuICAgICAgICAgICAgaWYodHlwZW9mIGZyb250bWF0dGVyICE9XCJ1bmRlZmluZWRcIil7XG4gICAgICAgICAgICAgICAgdGdsID0gZnJvbnRtYXR0ZXJbJ3RhZ3MnXVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGdsID0gW11cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFwcC5maWxlTWFuYWdlci5wcm9jZXNzRnJvbnRNYXR0ZXIoZmlsZSwoZnJvbnRtYXR0ZXIpPT57XG4gICAgICAgICAgICAgICAgaWYoZnJvbnRtYXR0ZXJbJ3RhZ3MnXSE9bnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIHRhZ3MuZm9yRWFjaCh0YWcgPT57XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIShmcm9udG1hdHRlclsndGFncyddLmluY2x1ZGVzKHRhZykpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRnbC5wdXNoKHRhZykgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGdsID0gdGFnc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRhZ2V0XCIsdGdsKVxuICAgICAgICAgICAgICAgIGZyb250bWF0dGVyWyd0YWdzJ10gPSB0Z2xcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiBcblxuICAgICAgIH1cbiAgICB9XG59XG5cbmNvbnN0IGRldGVjdCA9IChmcm9udG1hdHRlcjogc3RyaW5nKSA9PnsgIFxuICAgIGNvbnN0IGxpbmVzID0gZnJvbnRtYXR0ZXIuc3BsaXQoJ1xcbicpOyAgXG4gICAgY29uc3Qgb2JqOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge307ICBcbiAgICBmb3IgKGNvbnN0IGxpbmUgb2YgbGluZXMpIHsgIFxuICAgICAgICBjb25zdCBba2V5LCB2YWx1ZV0gPSBsaW5lLnNwbGl0KCc6JykubWFwKHBhcnQgPT4gcGFydC50cmltKCkpOyAgXG4gICAgICAgIGlmIChrZXkpIHsgIFxuICAgICAgICAgICAgb2JqW2tleV0gPSB2YWx1ZSB8fCB0cnVlOyAvLyBcdTU5ODJcdTY3OUNcdTZDQTFcdTY3MDlcdTUwM0NcdUZGMENcdThCQkVcdTdGNkVcdTRFM0EgdHJ1ZSAgXG4gICAgICAgIH0gIFxuICAgIH0gIFxuICAgIHJldHVybiBvYmo7ICBcbn0gIFxuXG5jb25zdCBybUZyb250bWF0dGVyID0gKGNvbnRlbnQ6c3RyaW5nKT0+e1xuICAgIGNvbnN0IHJlZ2V4ID0gL14tLS1cXG4oW1xcc1xcU10qPylcXG4tLS1cXG4qL2c7ICBcbiAgICByZXR1cm4oY29udGVudC5yZXBsYWNlKHJlZ2V4LFwiXCIpKVxufVxuXG5jb25zdCBnZXRGaXJzdExpbmVUYWdzID0gKGNvbnRlbnQ6c3RyaW5nKT0+e1xuICAgIGNvbnN0IHJlZ2V4ID0gLyNcXHcrL2c7IC8vIFxcdysgXHU1MzM5XHU5MTREXHU0RTAwXHU0RTJBXHU2MjE2XHU1OTFBXHU0RTJBXHU1QjU3XHU2QkNEXHUzMDAxXHU2NTcwXHU1QjU3XHU2MjE2XHU0RTBCXHU1MjEyXHU3RUJGICBcblxuICAgIC8vIFx1NEY3Rlx1NzUyOCBtYXRjaCBcdTY1QjlcdTZDRDVcdTYyN0VcdTUxRkFcdTYyNDBcdTY3MDlcdTdCMjZcdTU0MDhcdTY3NjFcdTRFRjZcdTc2ODRcdTdFRDNcdTY3OUMgIFxuICAgIGNvbnN0IG1hdGNoZXMgPSBjb250ZW50Lm1hdGNoKHJlZ2V4KTsgIFxuICAgIGxldCByZXM6IHN0cmluZ1tdID0gW11cbiAgICBpZiAobWF0Y2hlcykgeyAgXG4gICAgICAgIG1hdGNoZXMuZm9yRWFjaChtYXQgPT57XG4gICAgICAgICAgICByZXMucHVzaChtYXQucmVwbGFjZShcIiNcIixcIlwiKSlcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuKHJlcyk7IC8vIFx1OEY5M1x1NTFGQTogWyAnI2RpcycsICcjYWJzJywgJyNsa2InIF0gIFxuICAgIH0gZWxzZSB7ICBcbiAgICAgICAgcmV0dXJuKG51bGwpOyAgXG4gICAgfSAgXG59XG5cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxzQkFBNEY7OztBQ0VyRixJQUFNLG1CQUFtQixPQUFPLFFBQVU7QUFDN0MsUUFBTSxRQUFRLElBQUksTUFBTSxTQUFTO0FBRWpDLGFBQVcsUUFBUSxPQUFPO0FBQ3ZCLFFBQUcsS0FBSyxhQUFXLE1BQUs7QUFFdkIsWUFBTSxRQUFRLElBQUksY0FBYyxhQUFhLElBQUk7QUFDakQsWUFBTSxjQUFjLCtCQUFPO0FBQzNCLGNBQVEsSUFBSSxXQUFXO0FBRXZCLFVBQUksT0FBTyxnQkFBZ0IsYUFBYTtBQUNwQyxjQUFNQSxXQUFVLE1BQU0sSUFBSSxNQUFNLEtBQUssSUFBSTtBQUN6QyxjQUFNQyxjQUFhLHNCQUFzQkQ7QUFDekMsY0FBTSxJQUFJLE1BQU0sT0FBTyxNQUFNQyxXQUFVO0FBQ3ZDLGdCQUFRLElBQUksNEJBQTRCLEtBQUssTUFBTTtBQUFBLE1BQ3ZELE9BQU87QUFDSCxjQUFNRCxXQUFVLE1BQU0sSUFBSSxNQUFNLEtBQUssSUFBSTtBQUN6QyxjQUFNLG1CQUFtQkEsU0FBUSxNQUFN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aUI7QUFDOUMsb0JBQWdCLFFBQVEsaUJBQWlCO0FBR3pDLFNBQUssV0FBVztBQUFBLE1BQ2YsSUFBSTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sVUFBVSxNQUFNO0FBQ2YseUJBQWlCLEtBQUssR0FBRztBQUFBLE1BQzFCO0FBQUEsSUFDRCxDQUFDO0FBRUQsU0FBSyxXQUFXO0FBQUEsTUFDZixJQUFJO0FBQUEsTUFDSixNQUFNO0FBQUEsTUFDTixnQkFBZ0IsQ0FBQyxRQUFnQixTQUF1QjtBQUN2RCxnQkFBUSxJQUFJLE9BQU8sYUFBYSxDQUFDO0FBQ2pDLGVBQU8saUJBQWlCLHVCQUF1QjtBQUFBLE1BQ2hEO0FBQUEsSUFDRCxDQUFDO0FBR0QsU0FBSyxjQUFjLElBQUksaUJBQWlCLEtBQUssS0FBSyxJQUFJLENBQUM7QUFJdkQsU0FBSyxpQkFBaUIsVUFBVSxTQUFTLENBQUMsUUFBb0I7QUFDN0QsY0FBUSxJQUFJLFNBQVMsR0FBRztBQUFBLElBQ3pCLENBQUM7QUFHRCxTQUFLLGlCQUFpQixPQUFPLFlBQVksTUFBTSxRQUFRLElBQUksYUFBYSxHQUFHLElBQUksS0FBSyxHQUFJLENBQUM7QUFBQSxFQUMxRjtBQUFBLEVBRUEsV0FBVztBQUFBLEVBRVg7QUFBQSxFQUVBLE1BQU0sZUFBZTtBQUNwQixTQUFLLFdBQVcsT0FBTyxPQUFPLENBQUMsR0FBRyxrQkFBa0IsTUFBTSxLQUFLLFNBQVMsQ0FBQztBQUFBLEVBQzFFO0FBQUEsRUFFQSxNQUFNLGVBQWU7QUFDcEIsVUFBTSxLQUFLLFNBQVMsS0FBSyxRQUFRO0FBQUEsRUFDbEM7QUFDRDtBQWtCQSxJQUFNLG1CQUFOLGNBQStCLGlDQUFpQjtBQUFBLEVBRy9DLFlBQVksS0FBVSxRQUFrQjtBQUN2QyxVQUFNLEtBQUssTUFBTTtBQUNqQixTQUFLLFNBQVM7QUFBQSxFQUNmO0FBQUEsRUFFQSxVQUFnQjtBQUNmLFVBQU0sRUFBQyxZQUFXLElBQUk7QUFFdEIsZ0JBQVksTUFBTTtBQUVsQixRQUFJLHdCQUFRLFdBQVcsRUFDckIsUUFBUSxZQUFZLEVBQ3BCLFFBQVEsZUFBZ0IsRUFDeEIsUUFBUSxVQUFRLEtBQ2YsZUFBZSxtQkFBbUIsRUFDbEMsU0FBUyxLQUFLLE9BQU8sU0FBUyxTQUFTLEVBQ3ZDLFNBQVMsT0FBTyxVQUFVO0FBQzFCLFdBQUssT0FBTyxTQUFTLFlBQVk7QUFDakMsWUFBTSxLQUFLLE9BQU8sYUFBYTtBQUFBLElBQ2hDLENBQUMsQ0FBQztBQUFBLEVBQ0w7QUFDRDsiLAogICJuYW1lcyI6IFsiY29udGVudCIsICJuZXdDb250ZW50IiwgImZyb250bWF0dGVyIl0KfQo=
