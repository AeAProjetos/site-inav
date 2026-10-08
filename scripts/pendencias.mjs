// Lista todas as marcas <Pending> e <PendingPhoto> do código.
// Sai com erro se houver alguma: a lista precisa estar vazia antes de ir para a main.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = join(import.meta.dirname, "..");
const found = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.tsx?$/.test(name) && !path.endsWith(join("components", "Pending.tsx"))) {
      readFileSync(path, "utf8")
        .split("\n")
        .forEach((line, i) => {
          if (/<Pending(Photo)?\b/.test(line)) found.push(`${relative(root, path)}:${i + 1}  ${line.trim()}`);
        });
    }
  }
}

walk(join(root, "src"));

if (found.length === 0) {
  console.log("Nenhuma pendência.");
} else {
  console.log(`${found.length} pendência(s):\n`);
  console.log(found.join("\n"));
  process.exitCode = 1;
}
