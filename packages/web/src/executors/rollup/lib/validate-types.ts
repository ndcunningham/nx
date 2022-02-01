import { printDiagnostics, validateAndGenerateTypes } from '@nrwl/js';
import { join } from 'path';

export async function validateTypes(opts: {
  workspaceRoot: string;
  projectRoot: string;
  tsconfig: string;
  outputPath: string;
}): Promise<void> {
  const result = await validateAndGenerateTypes({
    workspaceRoot: opts.workspaceRoot,
    tsConfigPath: join(opts.workspaceRoot, opts.tsconfig),
    mode: 'emitDeclarationOnly',
    outDir: opts.outputPath,
  });

  await printDiagnostics(result.errors, result.warnings);

  if (result.errors.length > 0) {
    throw new Error('Found type errors. See above.');
  }
}
