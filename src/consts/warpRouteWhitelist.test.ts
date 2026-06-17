import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  GithubRegistry,
  warpRouteConfigs as publishedWarpRouteConfigs,
} from '@hyperlane-xyz/registry';
import { WarpCoreConfig } from '@hyperlane-xyz/sdk';
import { objKeys } from '@hyperlane-xyz/utils';
import { parse as parseYaml } from 'yaml';
import { assert, test } from 'vitest';

import { config } from './config';
import { warpRouteWhitelist } from './warpRouteWhitelist';

test('warpRouteWhitelist', async () => {
  if (!warpRouteWhitelist) return;

  const registry = new GithubRegistry({
    uri: config.registryUrl,
    branch: config.registryBranch,
    proxyUrl: config.registryProxyUrl,
  });
  let warpRouteConfigs: Record<string, WarpCoreConfig>;

  try {
    warpRouteConfigs = await registry.getWarpRoutes();
  } catch {
    warpRouteConfigs = publishedWarpRouteConfigs;
  }

  const localYamlPath = join(dirname(fileURLToPath(import.meta.url)), 'warpRoutes.yaml');
  const localYaml = parseYaml(readFileSync(localYamlPath, 'utf8')) as { tokens?: unknown[] };
  const hasLocalRoute = Array.isArray(localYaml.tokens) && localYaml.tokens.length > 0;

  const uppercaseConfigKeys = new Set(objKeys(warpRouteConfigs).map((key) => key.toUpperCase()));
  for (const id of warpRouteWhitelist) {
    const inRegistry = uppercaseConfigKeys.has(id.toUpperCase());
    const inLocalConfig = hasLocalRoute && warpRouteWhitelist.includes(id);
    assert(
      inRegistry || inLocalConfig,
      `No route with id ${id} found in registry or local warp route config.`,
    );
  }
});
