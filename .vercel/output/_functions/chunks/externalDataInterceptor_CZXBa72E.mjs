import { t as tokenIntercept } from './getSSOTokenFromFile_DRPskDtc.mjs';
import { g as fileIntercept } from './_.._DIlKm_GA.mjs';

const externalDataInterceptor = {
    getFileRecord() {
        return fileIntercept;
    },
    interceptFile(path, contents) {
        fileIntercept[path] = Promise.resolve(contents);
    },
    getTokenRecord() {
        return tokenIntercept;
    },
    interceptToken(id, contents) {
        tokenIntercept[id] = contents;
    },
};

export { externalDataInterceptor as e };
