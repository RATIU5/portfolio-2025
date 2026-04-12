import 'node:path';
import { S as StudioCMSRoutes } from './routeMap_Dx-D39YV.mjs';

const providers = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null
}, Symbol.toStringTag, { value: 'Module' }));

const oAuthEndpoints = [];

						const oAuthButtons = [];

						oAuthEndpoints.map(({ safeName, enabled }) => ({
							safeName,
							enabled,
							initSession: providers[safeName + '_initSession'] || null,
							initCallback: providers[safeName + '_initCallback'] || null,
						}));

const providerData = oAuthButtons.map(
  ({ enabled, image, label, safeName }) => ({
    enabled,
    href: StudioCMSRoutes.authLinks.oAuthIndex(safeName),
    label,
    image
  })
);
const showOAuth = providerData.some((provider) => provider.enabled);

export { providerData as p, showOAuth as s };
