const studiocmsBlobsDark = new Proxy({"src":"/_astro/studiocms-blobs-dark.DLhZ9A6i.webp","width":1920,"height":1080,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/dist/virtuals/auth/validImages/studiocms-blobs-dark.webp";
							}
							
							return target[name];
						}
					});

const studiocmsBlobsLight = new Proxy({"src":"/_astro/studiocms-blobs-light.CnUQCLrv.webp","width":1920,"height":1080,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/dist/virtuals/auth/validImages/studiocms-blobs-light.webp";
							}
							
							return target[name];
						}
					});

const studiocmsBlocksDark = new Proxy({"src":"/_astro/studiocms-blocks-dark.CtzeA85P.webp","width":1920,"height":1080,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/dist/virtuals/auth/validImages/studiocms-blocks-dark.webp";
							}
							
							return target[name];
						}
					});

const studiocmsBlocksLight = new Proxy({"src":"/_astro/studiocms-blocks-light.CgLLsfQ3.webp","width":1920,"height":1080,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/dist/virtuals/auth/validImages/studiocms-blocks-light.webp";
							}
							
							return target[name];
						}
					});

const studiocmsCurvesDark = new Proxy({"src":"/_astro/studiocms-curves-dark.Cv2WMXOB.webp","width":1920,"height":1080,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/dist/virtuals/auth/validImages/studiocms-curves-dark.webp";
							}
							
							return target[name];
						}
					});

const studiocmsCurvesLight = new Proxy({"src":"/_astro/studiocms-curves-light.Cp2S8hIN.webp","width":1920,"height":1080,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/dist/virtuals/auth/validImages/studiocms-curves-light.webp";
							}
							
							return target[name];
						}
					});

const validImages = [
  {
    name: "studiocms-blobs",
    label: "Blobs",
    format: "local",
    light: studiocmsBlobsLight,
    dark: studiocmsBlobsDark
  },
  {
    name: "studiocms-blocks",
    label: "Blocks",
    format: "local",
    light: studiocmsBlocksLight,
    dark: studiocmsBlocksDark
  },
  {
    name: "studiocms-curves",
    label: "Curves",
    format: "local",
    light: studiocmsCurvesLight,
    dark: studiocmsCurvesDark
  },
  {
    name: "custom",
    label: "Custom",
    format: "web",
    light: null,
    dark: null
  }
];

export { validImages as v };
