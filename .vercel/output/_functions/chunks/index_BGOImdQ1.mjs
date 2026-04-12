import { l as logger } from './_studiocms_logger_DedMAODS.mjs';
import { a as SDKCore, S as SDKCoreJs } from './index_DmoCs122.mjs';
import { S as getDefaultExportFromCjs } from './astro/server_D64VbtqW.mjs';
import require$$0$5 from 'node:events';
import require$$0$1 from 'node:url';
import require$$0$4 from 'node:util';
import NFS from 'node:fs';
import Http from 'node:http';
import Https from 'node:https';
import require$$0__default from 'node:zlib';
import require$$0$2 from 'node:stream';
import require$$0$3 from 'node:net';
import require$$1$1 from 'node:dns';
import require$$1 from 'node:os';
import path from 'node:path';
import crypto__default from 'node:crypto';
import require$$4 from 'node:tls';
import ChildProcess from 'node:child_process';
import require$$0$6 from 'node:buffer';
import { Effect, Brand, Data, Context, Layer } from 'effect';
import { g as genLogger, p as pipeLogger } from './logger_bcCLNlRx.mjs';

var nodemailer = {};

var shared = {exports: {}};

var fetch = {exports: {}};

var cookies;
var hasRequiredCookies;

function requireCookies () {
	if (hasRequiredCookies) return cookies;
	hasRequiredCookies = 1;

	// module to handle cookies

	const urllib = require$$0$1;

	const SESSION_TIMEOUT = 1800; // 30 min

	/**
	 * Creates a biskviit cookie jar for managing cookie values in memory
	 *
	 * @constructor
	 * @param {Object} [options] Optional options object
	 */
	class Cookies {
	    constructor(options) {
	        this.options = options || {};
	        this.cookies = [];
	    }

	    /**
	     * Stores a cookie string to the cookie storage
	     *
	     * @param {String} cookieStr Value from the 'Set-Cookie:' header
	     * @param {String} url Current URL
	     */
	    set(cookieStr, url) {
	        let urlparts = urllib.parse(url || '');
	        let cookie = this.parse(cookieStr);
	        let domain;

	        if (cookie.domain) {
	            domain = cookie.domain.replace(/^\./, '');

	            // do not allow cross origin cookies
	            if (
	                // can't be valid if the requested domain is shorter than current hostname
	                urlparts.hostname.length < domain.length ||
	                // prefix domains with dot to be sure that partial matches are not used
	                ('.' + urlparts.hostname).substr(-domain.length + 1) !== '.' + domain
	            ) {
	                cookie.domain = urlparts.hostname;
	            }
	        } else {
	            cookie.domain = urlparts.hostname;
	        }

	        if (!cookie.path) {
	            cookie.path = this.getPath(urlparts.pathname);
	        }

	        // if no expire date, then use sessionTimeout value
	        if (!cookie.expires) {
	            cookie.expires = new Date(Date.now() + (Number(this.options.sessionTimeout || SESSION_TIMEOUT) || SESSION_TIMEOUT) * 1000);
	        }

	        return this.add(cookie);
	    }

	    /**
	     * Returns cookie string for the 'Cookie:' header.
	     *
	     * @param {String} url URL to check for
	     * @returns {String} Cookie header or empty string if no matches were found
	     */
	    get(url) {
	        return this.list(url)
	            .map(cookie => cookie.name + '=' + cookie.value)
	            .join('; ');
	    }

	    /**
	     * Lists all valied cookie objects for the specified URL
	     *
	     * @param {String} url URL to check for
	     * @returns {Array} An array of cookie objects
	     */
	    list(url) {
	        let result = [];
	        let i;
	        let cookie;

	        for (i = this.cookies.length - 1; i >= 0; i--) {
	            cookie = this.cookies[i];

	            if (this.isExpired(cookie)) {
	                this.cookies.splice(i, i);
	                continue;
	            }

	            if (this.match(cookie, url)) {
	                result.unshift(cookie);
	            }
	        }

	        return result;
	    }

	    /**
	     * Parses cookie string from the 'Set-Cookie:' header
	     *
	     * @param {String} cookieStr String from the 'Set-Cookie:' header
	     * @returns {Object} Cookie object
	     */
	    parse(cookieStr) {
	        let cookie = {};

	        (cookieStr || '')
	            .toString()
	            .split(';')
	            .forEach(cookiePart => {
	                let valueParts = cookiePart.split('=');
	                let key = valueParts.shift().trim().toLowerCase();
	                let value = valueParts.join('=').trim();
	                let domain;

	                if (!key) {
	                    // skip empty parts
	                    return;
	                }

	                switch (key) {
	                    case 'expires':
	                        value = new Date(value);
	                        // ignore date if can not parse it
	                        if (value.toString() !== 'Invalid Date') {
	                            cookie.expires = value;
	                        }
	                        break;

	                    case 'path':
	                        cookie.path = value;
	                        break;

	                    case 'domain':
	                        domain = value.toLowerCase();
	                        if (domain.length && domain.charAt(0) !== '.') {
	                            domain = '.' + domain; // ensure preceeding dot for user set domains
	                        }
	                        cookie.domain = domain;
	                        break;

	                    case 'max-age':
	                        cookie.expires = new Date(Date.now() + (Number(value) || 0) * 1000);
	                        break;

	                    case 'secure':
	                        cookie.secure = true;
	                        break;

	                    case 'httponly':
	                        cookie.httponly = true;
	                        break;

	                    default:
	                        if (!cookie.name) {
	                            cookie.name = key;
	                            cookie.value = value;
	                        }
	                }
	            });

	        return cookie;
	    }

	    /**
	     * Checks if a cookie object is valid for a specified URL
	     *
	     * @param {Object} cookie Cookie object
	     * @param {String} url URL to check for
	     * @returns {Boolean} true if cookie is valid for specifiec URL
	     */
	    match(cookie, url) {
	        let urlparts = urllib.parse(url || '');

	        // check if hostname matches
	        // .foo.com also matches subdomains, foo.com does not
	        if (
	            urlparts.hostname !== cookie.domain &&
	            (cookie.domain.charAt(0) !== '.' || ('.' + urlparts.hostname).substr(-cookie.domain.length) !== cookie.domain)
	        ) {
	            return false;
	        }

	        // check if path matches
	        let path = this.getPath(urlparts.pathname);
	        if (path.substr(0, cookie.path.length) !== cookie.path) {
	            return false;
	        }

	        // check secure argument
	        if (cookie.secure && urlparts.protocol !== 'https:') {
	            return false;
	        }

	        return true;
	    }

	    /**
	     * Adds (or updates/removes if needed) a cookie object to the cookie storage
	     *
	     * @param {Object} cookie Cookie value to be stored
	     */
	    add(cookie) {
	        let i;
	        let len;

	        // nothing to do here
	        if (!cookie || !cookie.name) {
	            return false;
	        }

	        // overwrite if has same params
	        for (i = 0, len = this.cookies.length; i < len; i++) {
	            if (this.compare(this.cookies[i], cookie)) {
	                // check if the cookie needs to be removed instead
	                if (this.isExpired(cookie)) {
	                    this.cookies.splice(i, 1); // remove expired/unset cookie
	                    return false;
	                }

	                this.cookies[i] = cookie;
	                return true;
	            }
	        }

	        // add as new if not already expired
	        if (!this.isExpired(cookie)) {
	            this.cookies.push(cookie);
	        }

	        return true;
	    }

	    /**
	     * Checks if two cookie objects are the same
	     *
	     * @param {Object} a Cookie to check against
	     * @param {Object} b Cookie to check against
	     * @returns {Boolean} True, if the cookies are the same
	     */
	    compare(a, b) {
	        return a.name === b.name && a.path === b.path && a.domain === b.domain && a.secure === b.secure && a.httponly === a.httponly;
	    }

	    /**
	     * Checks if a cookie is expired
	     *
	     * @param {Object} cookie Cookie object to check against
	     * @returns {Boolean} True, if the cookie is expired
	     */
	    isExpired(cookie) {
	        return (cookie.expires && cookie.expires < new Date()) || !cookie.value;
	    }

	    /**
	     * Returns normalized cookie path for an URL path argument
	     *
	     * @param {String} pathname
	     * @returns {String} Normalized path
	     */
	    getPath(pathname) {
	        let path = (pathname || '/').split('/');
	        path.pop(); // remove filename part
	        path = path.join('/').trim();

	        // ensure path prefix /
	        if (path.charAt(0) !== '/') {
	            path = '/' + path;
	        }

	        // ensure path suffix /
	        if (path.substr(-1) !== '/') {
	            path += '/';
	        }

	        return path;
	    }
	}

	cookies = Cookies;
	return cookies;
}

const name = "nodemailer";
const version = "7.0.13";
const homepage = "https://nodemailer.com/";
const require$$9 = {
  name,
  version,
  homepage};

var hasRequiredFetch;

function requireFetch () {
	if (hasRequiredFetch) return fetch.exports;
	hasRequiredFetch = 1;

	const http = Http;
	const https = Https;
	const urllib = require$$0$1;
	const zlib = require$$0__default;
	const PassThrough = require$$0$2.PassThrough;
	const Cookies = requireCookies();
	const packageData = require$$9;
	const net = require$$0$3;

	const MAX_REDIRECTS = 5;

	fetch.exports = function (url, options) {
	    return nmfetch(url, options);
	};

	fetch.exports.Cookies = Cookies;

	function nmfetch(url, options) {
	    options = options || {};

	    options.fetchRes = options.fetchRes || new PassThrough();
	    options.cookies = options.cookies || new Cookies();
	    options.redirects = options.redirects || 0;
	    options.maxRedirects = isNaN(options.maxRedirects) ? MAX_REDIRECTS : options.maxRedirects;

	    if (options.cookie) {
	        [].concat(options.cookie || []).forEach(cookie => {
	            options.cookies.set(cookie, url);
	        });
	        options.cookie = false;
	    }

	    let fetchRes = options.fetchRes;
	    let parsed = urllib.parse(url);
	    let method = (options.method || '').toString().trim().toUpperCase() || 'GET';
	    let finished = false;
	    let cookies;
	    let body;

	    let handler = parsed.protocol === 'https:' ? https : http;

	    let headers = {
	        'accept-encoding': 'gzip,deflate',
	        'user-agent': 'nodemailer/' + packageData.version
	    };

	    Object.keys(options.headers || {}).forEach(key => {
	        headers[key.toLowerCase().trim()] = options.headers[key];
	    });

	    if (options.userAgent) {
	        headers['user-agent'] = options.userAgent;
	    }

	    if (parsed.auth) {
	        headers.Authorization = 'Basic ' + Buffer.from(parsed.auth).toString('base64');
	    }

	    if ((cookies = options.cookies.get(url))) {
	        headers.cookie = cookies;
	    }

	    if (options.body) {
	        if (options.contentType !== false) {
	            headers['Content-Type'] = options.contentType || 'application/x-www-form-urlencoded';
	        }

	        if (typeof options.body.pipe === 'function') {
	            // it's a stream
	            headers['Transfer-Encoding'] = 'chunked';
	            body = options.body;
	            body.on('error', err => {
	                if (finished) {
	                    return;
	                }
	                finished = true;
	                err.type = 'FETCH';
	                err.sourceUrl = url;
	                fetchRes.emit('error', err);
	            });
	        } else {
	            if (options.body instanceof Buffer) {
	                body = options.body;
	            } else if (typeof options.body === 'object') {
	                try {
	                    // encodeURIComponent can fail on invalid input (partial emoji etc.)
	                    body = Buffer.from(
	                        Object.keys(options.body)
	                            .map(key => {
	                                let value = options.body[key].toString().trim();
	                                return encodeURIComponent(key) + '=' + encodeURIComponent(value);
	                            })
	                            .join('&')
	                    );
	                } catch (E) {
	                    if (finished) {
	                        return;
	                    }
	                    finished = true;
	                    E.type = 'FETCH';
	                    E.sourceUrl = url;
	                    fetchRes.emit('error', E);
	                    return;
	                }
	            } else {
	                body = Buffer.from(options.body.toString().trim());
	            }

	            headers['Content-Type'] = options.contentType || 'application/x-www-form-urlencoded';
	            headers['Content-Length'] = body.length;
	        }
	        // if method is not provided, use POST instead of GET
	        method = (options.method || '').toString().trim().toUpperCase() || 'POST';
	    }

	    let req;
	    let reqOptions = {
	        method,
	        host: parsed.hostname,
	        path: parsed.path,
	        port: parsed.port ? parsed.port : parsed.protocol === 'https:' ? 443 : 80,
	        headers,
	        rejectUnauthorized: false,
	        agent: false
	    };

	    if (options.tls) {
	        Object.keys(options.tls).forEach(key => {
	            reqOptions[key] = options.tls[key];
	        });
	    }

	    if (
	        parsed.protocol === 'https:' &&
	        parsed.hostname &&
	        parsed.hostname !== reqOptions.host &&
	        !net.isIP(parsed.hostname) &&
	        !reqOptions.servername
	    ) {
	        reqOptions.servername = parsed.hostname;
	    }

	    try {
	        req = handler.request(reqOptions);
	    } catch (E) {
	        finished = true;
	        setImmediate(() => {
	            E.type = 'FETCH';
	            E.sourceUrl = url;
	            fetchRes.emit('error', E);
	        });
	        return fetchRes;
	    }

	    if (options.timeout) {
	        req.setTimeout(options.timeout, () => {
	            if (finished) {
	                return;
	            }
	            finished = true;
	            req.abort();
	            let err = new Error('Request Timeout');
	            err.type = 'FETCH';
	            err.sourceUrl = url;
	            fetchRes.emit('error', err);
	        });
	    }

	    req.on('error', err => {
	        if (finished) {
	            return;
	        }
	        finished = true;
	        err.type = 'FETCH';
	        err.sourceUrl = url;
	        fetchRes.emit('error', err);
	    });

	    req.on('response', res => {
	        let inflate;

	        if (finished) {
	            return;
	        }

	        switch (res.headers['content-encoding']) {
	            case 'gzip':
	            case 'deflate':
	                inflate = zlib.createUnzip();
	                break;
	        }

	        if (res.headers['set-cookie']) {
	            [].concat(res.headers['set-cookie'] || []).forEach(cookie => {
	                options.cookies.set(cookie, url);
	            });
	        }

	        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
	            // redirect
	            options.redirects++;
	            if (options.redirects > options.maxRedirects) {
	                finished = true;
	                let err = new Error('Maximum redirect count exceeded');
	                err.type = 'FETCH';
	                err.sourceUrl = url;
	                fetchRes.emit('error', err);
	                req.abort();
	                return;
	            }
	            // redirect does not include POST body
	            options.method = 'GET';
	            options.body = false;
	            return nmfetch(urllib.resolve(url, res.headers.location), options);
	        }

	        fetchRes.statusCode = res.statusCode;
	        fetchRes.headers = res.headers;

	        if (res.statusCode >= 300 && !options.allowErrorResponse) {
	            finished = true;
	            let err = new Error('Invalid status code ' + res.statusCode);
	            err.type = 'FETCH';
	            err.sourceUrl = url;
	            fetchRes.emit('error', err);
	            req.abort();
	            return;
	        }

	        res.on('error', err => {
	            if (finished) {
	                return;
	            }
	            finished = true;
	            err.type = 'FETCH';
	            err.sourceUrl = url;
	            fetchRes.emit('error', err);
	            req.abort();
	        });

	        if (inflate) {
	            res.pipe(inflate).pipe(fetchRes);
	            inflate.on('error', err => {
	                if (finished) {
	                    return;
	                }
	                finished = true;
	                err.type = 'FETCH';
	                err.sourceUrl = url;
	                fetchRes.emit('error', err);
	                req.abort();
	            });
	        } else {
	            res.pipe(fetchRes);
	        }
	    });

	    setImmediate(() => {
	        if (body) {
	            try {
	                if (typeof body.pipe === 'function') {
	                    return body.pipe(req);
	                } else {
	                    req.write(body);
	                }
	            } catch (err) {
	                finished = true;
	                err.type = 'FETCH';
	                err.sourceUrl = url;
	                fetchRes.emit('error', err);
	                return;
	            }
	        }
	        req.end();
	    });

	    return fetchRes;
	}
	return fetch.exports;
}

/* eslint no-console: 0 */

var hasRequiredShared;

function requireShared () {
	if (hasRequiredShared) return shared.exports;
	hasRequiredShared = 1;
	(function (module) {

		const urllib = require$$0$1;
		const util = require$$0$4;
		const fs = NFS;
		const nmfetch = requireFetch();
		const dns = require$$1$1;
		const net = require$$0$3;
		const os = require$$1;

		const DNS_TTL = 5 * 60 * 1000;
		const CACHE_CLEANUP_INTERVAL = 30 * 1000; // Minimum 30 seconds between cleanups
		const MAX_CACHE_SIZE = 1000; // Maximum number of entries in cache

		let lastCacheCleanup = 0;
		module.exports._lastCacheCleanup = () => lastCacheCleanup;
		module.exports._resetCacheCleanup = () => {
		    lastCacheCleanup = 0;
		};

		let networkInterfaces;
		try {
		    networkInterfaces = os.networkInterfaces();
		} catch (_err) {
		    // fails on some systems
		}

		module.exports.networkInterfaces = networkInterfaces;

		const isFamilySupported = (family, allowInternal) => {
		    let networkInterfaces = module.exports.networkInterfaces;
		    if (!networkInterfaces) {
		        // hope for the best
		        return true;
		    }

		    const familySupported =
		        // crux that replaces Object.values(networkInterfaces) as Object.values is not supported in nodejs v6
		        Object.keys(networkInterfaces)
		            .map(key => networkInterfaces[key])
		            // crux that replaces .flat() as it is not supported in older Node versions (v10 and older)
		            .reduce((acc, val) => acc.concat(val), [])
		            .filter(i => !i.internal || allowInternal)
		            .filter(i => i.family === 'IPv' + family || i.family === family).length > 0;

		    return familySupported;
		};

		const resolver = (family, hostname, options, callback) => {
		    options = options || {};
		    const familySupported = isFamilySupported(family, options.allowInternalNetworkInterfaces);

		    if (!familySupported) {
		        return callback(null, []);
		    }

		    const resolver = dns.Resolver ? new dns.Resolver(options) : dns;
		    resolver['resolve' + family](hostname, (err, addresses) => {
		        if (err) {
		            switch (err.code) {
		                case dns.NODATA:
		                case dns.NOTFOUND:
		                case dns.NOTIMP:
		                case dns.SERVFAIL:
		                case dns.CONNREFUSED:
		                case dns.REFUSED:
		                case 'EAI_AGAIN':
		                    return callback(null, []);
		            }
		            return callback(err);
		        }
		        return callback(null, Array.isArray(addresses) ? addresses : [].concat(addresses || []));
		    });
		};

		const dnsCache = (module.exports.dnsCache = new Map());

		const formatDNSValue = (value, extra) => {
		    if (!value) {
		        return Object.assign({}, extra || {});
		    }

		    return Object.assign(
		        {
		            servername: value.servername,
		            host:
		                !value.addresses || !value.addresses.length
		                    ? null
		                    : value.addresses.length === 1
		                      ? value.addresses[0]
		                      : value.addresses[Math.floor(Math.random() * value.addresses.length)]
		        },
		        extra || {}
		    );
		};

		module.exports.resolveHostname = (options, callback) => {
		    options = options || {};

		    if (!options.host && options.servername) {
		        options.host = options.servername;
		    }

		    if (!options.host || net.isIP(options.host)) {
		        // nothing to do here
		        let value = {
		            addresses: [options.host],
		            servername: options.servername || false
		        };
		        return callback(
		            null,
		            formatDNSValue(value, {
		                cached: false
		            })
		        );
		    }

		    let cached;
		    if (dnsCache.has(options.host)) {
		        cached = dnsCache.get(options.host);

		        // Lazy cleanup with time throttling
		        const now = Date.now();
		        if (now - lastCacheCleanup > CACHE_CLEANUP_INTERVAL) {
		            lastCacheCleanup = now;

		            // Clean up expired entries
		            for (const [host, entry] of dnsCache.entries()) {
		                if (entry.expires && entry.expires < now) {
		                    dnsCache.delete(host);
		                }
		            }

		            // If cache is still too large, remove oldest entries
		            if (dnsCache.size > MAX_CACHE_SIZE) {
		                const toDelete = Math.floor(MAX_CACHE_SIZE * 0.1); // Remove 10% of entries
		                const keys = Array.from(dnsCache.keys()).slice(0, toDelete);
		                keys.forEach(key => dnsCache.delete(key));
		            }
		        }

		        if (!cached.expires || cached.expires >= now) {
		            return callback(
		                null,
		                formatDNSValue(cached.value, {
		                    cached: true
		                })
		            );
		        }
		    }

		    resolver(4, options.host, options, (err, addresses) => {
		        if (err) {
		            if (cached) {
		                dnsCache.set(options.host, {
		                    value: cached.value,
		                    expires: Date.now() + (options.dnsTtl || DNS_TTL)
		                });

		                return callback(
		                    null,
		                    formatDNSValue(cached.value, {
		                        cached: true,
		                        error: err
		                    })
		                );
		            }
		            return callback(err);
		        }

		        if (addresses && addresses.length) {
		            let value = {
		                addresses,
		                servername: options.servername || options.host
		            };

		            dnsCache.set(options.host, {
		                value,
		                expires: Date.now() + (options.dnsTtl || DNS_TTL)
		            });

		            return callback(
		                null,
		                formatDNSValue(value, {
		                    cached: false
		                })
		            );
		        }

		        resolver(6, options.host, options, (err, addresses) => {
		            if (err) {
		                if (cached) {
		                    dnsCache.set(options.host, {
		                        value: cached.value,
		                        expires: Date.now() + (options.dnsTtl || DNS_TTL)
		                    });

		                    return callback(
		                        null,
		                        formatDNSValue(cached.value, {
		                            cached: true,
		                            error: err
		                        })
		                    );
		                }
		                return callback(err);
		            }

		            if (addresses && addresses.length) {
		                let value = {
		                    addresses,
		                    servername: options.servername || options.host
		                };

		                dnsCache.set(options.host, {
		                    value,
		                    expires: Date.now() + (options.dnsTtl || DNS_TTL)
		                });

		                return callback(
		                    null,
		                    formatDNSValue(value, {
		                        cached: false
		                    })
		                );
		            }

		            try {
		                dns.lookup(options.host, { all: true }, (err, addresses) => {
		                    if (err) {
		                        if (cached) {
		                            dnsCache.set(options.host, {
		                                value: cached.value,
		                                expires: Date.now() + (options.dnsTtl || DNS_TTL)
		                            });

		                            return callback(
		                                null,
		                                formatDNSValue(cached.value, {
		                                    cached: true,
		                                    error: err
		                                })
		                            );
		                        }
		                        return callback(err);
		                    }

		                    let address = addresses
		                        ? addresses
		                              .filter(addr => isFamilySupported(addr.family))
		                              .map(addr => addr.address)
		                              .shift()
		                        : false;

		                    if (addresses && addresses.length && !address) {
		                        // there are addresses but none can be used
		                        console.warn(`Failed to resolve IPv${addresses[0].family} addresses with current network`);
		                    }

		                    if (!address && cached) {
		                        // nothing was found, fallback to cached value
		                        return callback(
		                            null,
		                            formatDNSValue(cached.value, {
		                                cached: true
		                            })
		                        );
		                    }

		                    let value = {
		                        addresses: address ? [address] : [options.host],
		                        servername: options.servername || options.host
		                    };

		                    dnsCache.set(options.host, {
		                        value,
		                        expires: Date.now() + (options.dnsTtl || DNS_TTL)
		                    });

		                    return callback(
		                        null,
		                        formatDNSValue(value, {
		                            cached: false
		                        })
		                    );
		                });
		            } catch (_err) {
		                if (cached) {
		                    dnsCache.set(options.host, {
		                        value: cached.value,
		                        expires: Date.now() + (options.dnsTtl || DNS_TTL)
		                    });

		                    return callback(
		                        null,
		                        formatDNSValue(cached.value, {
		                            cached: true,
		                            error: err
		                        })
		                    );
		                }
		                return callback(err);
		            }
		        });
		    });
		};
		/**
		 * Parses connection url to a structured configuration object
		 *
		 * @param {String} str Connection url
		 * @return {Object} Configuration object
		 */
		module.exports.parseConnectionUrl = str => {
		    str = str || '';
		    let options = {};

		    [urllib.parse(str, true)].forEach(url => {
		        let auth;

		        switch (url.protocol) {
		            case 'smtp:':
		                options.secure = false;
		                break;
		            case 'smtps:':
		                options.secure = true;
		                break;
		            case 'direct:':
		                options.direct = true;
		                break;
		        }

		        if (!isNaN(url.port) && Number(url.port)) {
		            options.port = Number(url.port);
		        }

		        if (url.hostname) {
		            options.host = url.hostname;
		        }

		        if (url.auth) {
		            auth = url.auth.split(':');

		            if (!options.auth) {
		                options.auth = {};
		            }

		            options.auth.user = auth.shift();
		            options.auth.pass = auth.join(':');
		        }

		        Object.keys(url.query || {}).forEach(key => {
		            let obj = options;
		            let lKey = key;
		            let value = url.query[key];

		            if (!isNaN(value)) {
		                value = Number(value);
		            }

		            switch (value) {
		                case 'true':
		                    value = true;
		                    break;
		                case 'false':
		                    value = false;
		                    break;
		            }

		            // tls is nested object
		            if (key.indexOf('tls.') === 0) {
		                lKey = key.substr(4);
		                if (!options.tls) {
		                    options.tls = {};
		                }
		                obj = options.tls;
		            } else if (key.indexOf('.') >= 0) {
		                // ignore nested properties besides tls
		                return;
		            }

		            if (!(lKey in obj)) {
		                obj[lKey] = value;
		            }
		        });
		    });

		    return options;
		};

		module.exports._logFunc = (logger, level, defaults, data, message, ...args) => {
		    let entry = {};

		    Object.keys(defaults || {}).forEach(key => {
		        if (key !== 'level') {
		            entry[key] = defaults[key];
		        }
		    });

		    Object.keys(data || {}).forEach(key => {
		        if (key !== 'level') {
		            entry[key] = data[key];
		        }
		    });

		    logger[level](entry, message, ...args);
		};

		/**
		 * Returns a bunyan-compatible logger interface. Uses either provided logger or
		 * creates a default console logger
		 *
		 * @param {Object} [options] Options object that might include 'logger' value
		 * @return {Object} bunyan compatible logger
		 */
		module.exports.getLogger = (options, defaults) => {
		    options = options || {};

		    let response = {};
		    let levels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];

		    if (!options.logger) {
		        // use vanity logger
		        levels.forEach(level => {
		            response[level] = () => false;
		        });
		        return response;
		    }

		    let logger = options.logger;

		    if (options.logger === true) {
		        // create console logger
		        logger = createDefaultLogger(levels);
		    }

		    levels.forEach(level => {
		        response[level] = (data, message, ...args) => {
		            module.exports._logFunc(logger, level, defaults, data, message, ...args);
		        };
		    });

		    return response;
		};

		/**
		 * Wrapper for creating a callback that either resolves or rejects a promise
		 * based on input
		 *
		 * @param {Function} resolve Function to run if callback is called
		 * @param {Function} reject Function to run if callback ends with an error
		 */
		module.exports.callbackPromise = (resolve, reject) =>
		    function () {
		        let args = Array.from(arguments);
		        let err = args.shift();
		        if (err) {
		            reject(err);
		        } else {
		            resolve(...args);
		        }
		    };

		module.exports.parseDataURI = uri => {
		    if (typeof uri !== 'string') {
		        return null;
		    }

		    // Early return for non-data URIs to avoid unnecessary processing
		    if (!uri.startsWith('data:')) {
		        return null;
		    }

		    // Find the first comma safely - this prevents ReDoS
		    const commaPos = uri.indexOf(',');
		    if (commaPos === -1) {
		        return null;
		    }

		    const data = uri.substring(commaPos + 1);
		    const metaStr = uri.substring('data:'.length, commaPos);

		    let encoding;
		    const metaEntries = metaStr.split(';');

		    if (metaEntries.length > 0) {
		        const lastEntry = metaEntries[metaEntries.length - 1].toLowerCase().trim();
		        // Only recognize valid encoding types to prevent manipulation
		        if (['base64', 'utf8', 'utf-8'].includes(lastEntry) && lastEntry.indexOf('=') === -1) {
		            encoding = lastEntry;
		            metaEntries.pop();
		        }
		    }

		    const contentType = metaEntries.length > 0 ? metaEntries.shift() : 'application/octet-stream';
		    const params = {};

		    for (let i = 0; i < metaEntries.length; i++) {
		        const entry = metaEntries[i];
		        const sepPos = entry.indexOf('=');
		        if (sepPos > 0) {
		            // Ensure there's a key before the '='
		            const key = entry.substring(0, sepPos).trim();
		            const value = entry.substring(sepPos + 1).trim();
		            if (key) {
		                params[key] = value;
		            }
		        }
		    }

		    // Decode data based on encoding with proper error handling
		    let bufferData;
		    try {
		        if (encoding === 'base64') {
		            bufferData = Buffer.from(data, 'base64');
		        } else {
		            try {
		                bufferData = Buffer.from(decodeURIComponent(data));
		            } catch (_decodeError) {
		                bufferData = Buffer.from(data);
		            }
		        }
		    } catch (_bufferError) {
		        bufferData = Buffer.alloc(0);
		    }

		    return {
		        data: bufferData,
		        encoding: encoding || null,
		        contentType: contentType || 'application/octet-stream',
		        params
		    };
		};

		/**
		 * Resolves a String or a Buffer value for content value. Useful if the value
		 * is a Stream or a file or an URL. If the value is a Stream, overwrites
		 * the stream object with the resolved value (you can't stream a value twice).
		 *
		 * This is useful when you want to create a plugin that needs a content value,
		 * for example the `html` or `text` value as a String or a Buffer but not as
		 * a file path or an URL.
		 *
		 * @param {Object} data An object or an Array you want to resolve an element for
		 * @param {String|Number} key Property name or an Array index
		 * @param {Function} callback Callback function with (err, value)
		 */
		module.exports.resolveContent = (data, key, callback) => {
		    let promise;

		    if (!callback) {
		        promise = new Promise((resolve, reject) => {
		            callback = module.exports.callbackPromise(resolve, reject);
		        });
		    }

		    let content = (data && data[key] && data[key].content) || data[key];
		    let contentStream;
		    let encoding = ((typeof data[key] === 'object' && data[key].encoding) || 'utf8')
		        .toString()
		        .toLowerCase()
		        .replace(/[-_\s]/g, '');

		    if (!content) {
		        return callback(null, content);
		    }

		    if (typeof content === 'object') {
		        if (typeof content.pipe === 'function') {
		            return resolveStream(content, (err, value) => {
		                if (err) {
		                    return callback(err);
		                }
		                // we can't stream twice the same content, so we need
		                // to replace the stream object with the streaming result
		                if (data[key].content) {
		                    data[key].content = value;
		                } else {
		                    data[key] = value;
		                }
		                callback(null, value);
		            });
		        } else if (/^https?:\/\//i.test(content.path || content.href)) {
		            contentStream = nmfetch(content.path || content.href);
		            return resolveStream(contentStream, callback);
		        } else if (/^data:/i.test(content.path || content.href)) {
		            let parsedDataUri = module.exports.parseDataURI(content.path || content.href);

		            if (!parsedDataUri || !parsedDataUri.data) {
		                return callback(null, Buffer.from(0));
		            }
		            return callback(null, parsedDataUri.data);
		        } else if (content.path) {
		            return resolveStream(fs.createReadStream(content.path), callback);
		        }
		    }

		    if (typeof data[key].content === 'string' && !['utf8', 'usascii', 'ascii'].includes(encoding)) {
		        content = Buffer.from(data[key].content, encoding);
		    }

		    // default action, return as is
		    setImmediate(() => callback(null, content));

		    return promise;
		};

		/**
		 * Copies properties from source objects to target objects
		 */
		module.exports.assign = function (/* target, ... sources */) {
		    let args = Array.from(arguments);
		    let target = args.shift() || {};

		    args.forEach(source => {
		        Object.keys(source || {}).forEach(key => {
		            if (['tls', 'auth'].includes(key) && source[key] && typeof source[key] === 'object') {
		                // tls and auth are special keys that need to be enumerated separately
		                // other objects are passed as is
		                if (!target[key]) {
		                    // ensure that target has this key
		                    target[key] = {};
		                }
		                Object.keys(source[key]).forEach(subKey => {
		                    target[key][subKey] = source[key][subKey];
		                });
		            } else {
		                target[key] = source[key];
		            }
		        });
		    });
		    return target;
		};

		module.exports.encodeXText = str => {
		    // ! 0x21
		    // + 0x2B
		    // = 0x3D
		    // ~ 0x7E
		    if (!/[^\x21-\x2A\x2C-\x3C\x3E-\x7E]/.test(str)) {
		        return str;
		    }
		    let buf = Buffer.from(str);
		    let result = '';
		    for (let i = 0, len = buf.length; i < len; i++) {
		        let c = buf[i];
		        if (c < 0x21 || c > 0x7e || c === 0x2b || c === 0x3d) {
		            result += '+' + (c < 0x10 ? '0' : '') + c.toString(16).toUpperCase();
		        } else {
		            result += String.fromCharCode(c);
		        }
		    }
		    return result;
		};

		/**
		 * Streams a stream value into a Buffer
		 *
		 * @param {Object} stream Readable stream
		 * @param {Function} callback Callback function with (err, value)
		 */
		function resolveStream(stream, callback) {
		    let responded = false;
		    let chunks = [];
		    let chunklen = 0;

		    stream.on('error', err => {
		        if (responded) {
		            return;
		        }

		        responded = true;
		        callback(err);
		    });

		    stream.on('readable', () => {
		        let chunk;
		        while ((chunk = stream.read()) !== null) {
		            chunks.push(chunk);
		            chunklen += chunk.length;
		        }
		    });

		    stream.on('end', () => {
		        if (responded) {
		            return;
		        }
		        responded = true;

		        let value;

		        try {
		            value = Buffer.concat(chunks, chunklen);
		        } catch (E) {
		            return callback(E);
		        }
		        callback(null, value);
		    });
		}

		/**
		 * Generates a bunyan-like logger that prints to console
		 *
		 * @returns {Object} Bunyan logger instance
		 */
		function createDefaultLogger(levels) {
		    let levelMaxLen = 0;
		    let levelNames = new Map();
		    levels.forEach(level => {
		        if (level.length > levelMaxLen) {
		            levelMaxLen = level.length;
		        }
		    });

		    levels.forEach(level => {
		        let levelName = level.toUpperCase();
		        if (levelName.length < levelMaxLen) {
		            levelName += ' '.repeat(levelMaxLen - levelName.length);
		        }
		        levelNames.set(level, levelName);
		    });

		    let print = (level, entry, message, ...args) => {
		        let prefix = '';
		        if (entry) {
		            if (entry.tnx === 'server') {
		                prefix = 'S: ';
		            } else if (entry.tnx === 'client') {
		                prefix = 'C: ';
		            }

		            if (entry.sid) {
		                prefix = '[' + entry.sid + '] ' + prefix;
		            }

		            if (entry.cid) {
		                prefix = '[#' + entry.cid + '] ' + prefix;
		            }
		        }

		        message = util.format(message, ...args);
		        message.split(/\r?\n/).forEach(line => {
		            console.log('[%s] %s %s', new Date().toISOString().substr(0, 19).replace(/T/, ' '), levelNames.get(level), prefix + line);
		        });
		    };

		    let logger = {};
		    levels.forEach(level => {
		        logger[level] = print.bind(null, level);
		    });

		    return logger;
		} 
	} (shared));
	return shared.exports;
}

/* eslint quote-props: 0 */

var mimeTypes_1;
var hasRequiredMimeTypes;

function requireMimeTypes () {
	if (hasRequiredMimeTypes) return mimeTypes_1;
	hasRequiredMimeTypes = 1;

	const path$1 = path;

	const defaultMimeType = 'application/octet-stream';
	const defaultExtension = 'bin';

	const mimeTypes = new Map([
	    ['application/acad', 'dwg'],
	    ['application/applixware', 'aw'],
	    ['application/arj', 'arj'],
	    ['application/atom+xml', 'xml'],
	    ['application/atomcat+xml', 'atomcat'],
	    ['application/atomsvc+xml', 'atomsvc'],
	    ['application/base64', ['mm', 'mme']],
	    ['application/binhex', 'hqx'],
	    ['application/binhex4', 'hqx'],
	    ['application/book', ['book', 'boo']],
	    ['application/ccxml+xml,', 'ccxml'],
	    ['application/cdf', 'cdf'],
	    ['application/cdmi-capability', 'cdmia'],
	    ['application/cdmi-container', 'cdmic'],
	    ['application/cdmi-domain', 'cdmid'],
	    ['application/cdmi-object', 'cdmio'],
	    ['application/cdmi-queue', 'cdmiq'],
	    ['application/clariscad', 'ccad'],
	    ['application/commonground', 'dp'],
	    ['application/cu-seeme', 'cu'],
	    ['application/davmount+xml', 'davmount'],
	    ['application/drafting', 'drw'],
	    ['application/dsptype', 'tsp'],
	    ['application/dssc+der', 'dssc'],
	    ['application/dssc+xml', 'xdssc'],
	    ['application/dxf', 'dxf'],
	    ['application/ecmascript', ['js', 'es']],
	    ['application/emma+xml', 'emma'],
	    ['application/envoy', 'evy'],
	    ['application/epub+zip', 'epub'],
	    ['application/excel', ['xls', 'xl', 'xla', 'xlb', 'xlc', 'xld', 'xlk', 'xll', 'xlm', 'xlt', 'xlv', 'xlw']],
	    ['application/exi', 'exi'],
	    ['application/font-tdpfr', 'pfr'],
	    ['application/fractals', 'fif'],
	    ['application/freeloader', 'frl'],
	    ['application/futuresplash', 'spl'],
	    ['application/geo+json', 'geojson'],
	    ['application/gnutar', 'tgz'],
	    ['application/groupwise', 'vew'],
	    ['application/hlp', 'hlp'],
	    ['application/hta', 'hta'],
	    ['application/hyperstudio', 'stk'],
	    ['application/i-deas', 'unv'],
	    ['application/iges', ['iges', 'igs']],
	    ['application/inf', 'inf'],
	    ['application/internet-property-stream', 'acx'],
	    ['application/ipfix', 'ipfix'],
	    ['application/java', 'class'],
	    ['application/java-archive', 'jar'],
	    ['application/java-byte-code', 'class'],
	    ['application/java-serialized-object', 'ser'],
	    ['application/java-vm', 'class'],
	    ['application/javascript', 'js'],
	    ['application/json', 'json'],
	    ['application/lha', 'lha'],
	    ['application/lzx', 'lzx'],
	    ['application/mac-binary', 'bin'],
	    ['application/mac-binhex', 'hqx'],
	    ['application/mac-binhex40', 'hqx'],
	    ['application/mac-compactpro', 'cpt'],
	    ['application/macbinary', 'bin'],
	    ['application/mads+xml', 'mads'],
	    ['application/marc', 'mrc'],
	    ['application/marcxml+xml', 'mrcx'],
	    ['application/mathematica', 'ma'],
	    ['application/mathml+xml', 'mathml'],
	    ['application/mbedlet', 'mbd'],
	    ['application/mbox', 'mbox'],
	    ['application/mcad', 'mcd'],
	    ['application/mediaservercontrol+xml', 'mscml'],
	    ['application/metalink4+xml', 'meta4'],
	    ['application/mets+xml', 'mets'],
	    ['application/mime', 'aps'],
	    ['application/mods+xml', 'mods'],
	    ['application/mp21', 'm21'],
	    ['application/mp4', 'mp4'],
	    ['application/mspowerpoint', ['ppt', 'pot', 'pps', 'ppz']],
	    ['application/msword', ['doc', 'dot', 'w6w', 'wiz', 'word']],
	    ['application/mswrite', 'wri'],
	    ['application/mxf', 'mxf'],
	    ['application/netmc', 'mcp'],
	    ['application/octet-stream', ['*']],
	    ['application/oda', 'oda'],
	    ['application/oebps-package+xml', 'opf'],
	    ['application/ogg', 'ogx'],
	    ['application/olescript', 'axs'],
	    ['application/onenote', 'onetoc'],
	    ['application/patch-ops-error+xml', 'xer'],
	    ['application/pdf', 'pdf'],
	    ['application/pgp-encrypted', 'asc'],
	    ['application/pgp-signature', 'pgp'],
	    ['application/pics-rules', 'prf'],
	    ['application/pkcs-12', 'p12'],
	    ['application/pkcs-crl', 'crl'],
	    ['application/pkcs10', 'p10'],
	    ['application/pkcs7-mime', ['p7c', 'p7m']],
	    ['application/pkcs7-signature', 'p7s'],
	    ['application/pkcs8', 'p8'],
	    ['application/pkix-attr-cert', 'ac'],
	    ['application/pkix-cert', ['cer', 'crt']],
	    ['application/pkix-crl', 'crl'],
	    ['application/pkix-pkipath', 'pkipath'],
	    ['application/pkixcmp', 'pki'],
	    ['application/plain', 'text'],
	    ['application/pls+xml', 'pls'],
	    ['application/postscript', ['ps', 'ai', 'eps']],
	    ['application/powerpoint', 'ppt'],
	    ['application/pro_eng', ['part', 'prt']],
	    ['application/prs.cww', 'cww'],
	    ['application/pskc+xml', 'pskcxml'],
	    ['application/rdf+xml', 'rdf'],
	    ['application/reginfo+xml', 'rif'],
	    ['application/relax-ng-compact-syntax', 'rnc'],
	    ['application/resource-lists+xml', 'rl'],
	    ['application/resource-lists-diff+xml', 'rld'],
	    ['application/ringing-tones', 'rng'],
	    ['application/rls-services+xml', 'rs'],
	    ['application/rsd+xml', 'rsd'],
	    ['application/rss+xml', 'xml'],
	    ['application/rtf', ['rtf', 'rtx']],
	    ['application/sbml+xml', 'sbml'],
	    ['application/scvp-cv-request', 'scq'],
	    ['application/scvp-cv-response', 'scs'],
	    ['application/scvp-vp-request', 'spq'],
	    ['application/scvp-vp-response', 'spp'],
	    ['application/sdp', 'sdp'],
	    ['application/sea', 'sea'],
	    ['application/set', 'set'],
	    ['application/set-payment-initiation', 'setpay'],
	    ['application/set-registration-initiation', 'setreg'],
	    ['application/shf+xml', 'shf'],
	    ['application/sla', 'stl'],
	    ['application/smil', ['smi', 'smil']],
	    ['application/smil+xml', 'smi'],
	    ['application/solids', 'sol'],
	    ['application/sounder', 'sdr'],
	    ['application/sparql-query', 'rq'],
	    ['application/sparql-results+xml', 'srx'],
	    ['application/srgs', 'gram'],
	    ['application/srgs+xml', 'grxml'],
	    ['application/sru+xml', 'sru'],
	    ['application/ssml+xml', 'ssml'],
	    ['application/step', ['step', 'stp']],
	    ['application/streamingmedia', 'ssm'],
	    ['application/tei+xml', 'tei'],
	    ['application/thraud+xml', 'tfi'],
	    ['application/timestamped-data', 'tsd'],
	    ['application/toolbook', 'tbk'],
	    ['application/vda', 'vda'],
	    ['application/vnd.3gpp.pic-bw-large', 'plb'],
	    ['application/vnd.3gpp.pic-bw-small', 'psb'],
	    ['application/vnd.3gpp.pic-bw-var', 'pvb'],
	    ['application/vnd.3gpp2.tcap', 'tcap'],
	    ['application/vnd.3m.post-it-notes', 'pwn'],
	    ['application/vnd.accpac.simply.aso', 'aso'],
	    ['application/vnd.accpac.simply.imp', 'imp'],
	    ['application/vnd.acucobol', 'acu'],
	    ['application/vnd.acucorp', 'atc'],
	    ['application/vnd.adobe.air-application-installer-package+zip', 'air'],
	    ['application/vnd.adobe.fxp', 'fxp'],
	    ['application/vnd.adobe.xdp+xml', 'xdp'],
	    ['application/vnd.adobe.xfdf', 'xfdf'],
	    ['application/vnd.ahead.space', 'ahead'],
	    ['application/vnd.airzip.filesecure.azf', 'azf'],
	    ['application/vnd.airzip.filesecure.azs', 'azs'],
	    ['application/vnd.amazon.ebook', 'azw'],
	    ['application/vnd.americandynamics.acc', 'acc'],
	    ['application/vnd.amiga.ami', 'ami'],
	    ['application/vnd.android.package-archive', 'apk'],
	    ['application/vnd.anser-web-certificate-issue-initiation', 'cii'],
	    ['application/vnd.anser-web-funds-transfer-initiation', 'fti'],
	    ['application/vnd.antix.game-component', 'atx'],
	    ['application/vnd.apple.installer+xml', 'mpkg'],
	    ['application/vnd.apple.mpegurl', 'm3u8'],
	    ['application/vnd.aristanetworks.swi', 'swi'],
	    ['application/vnd.audiograph', 'aep'],
	    ['application/vnd.blueice.multipass', 'mpm'],
	    ['application/vnd.bmi', 'bmi'],
	    ['application/vnd.businessobjects', 'rep'],
	    ['application/vnd.chemdraw+xml', 'cdxml'],
	    ['application/vnd.chipnuts.karaoke-mmd', 'mmd'],
	    ['application/vnd.cinderella', 'cdy'],
	    ['application/vnd.claymore', 'cla'],
	    ['application/vnd.cloanto.rp9', 'rp9'],
	    ['application/vnd.clonk.c4group', 'c4g'],
	    ['application/vnd.cluetrust.cartomobile-config', 'c11amc'],
	    ['application/vnd.cluetrust.cartomobile-config-pkg', 'c11amz'],
	    ['application/vnd.commonspace', 'csp'],
	    ['application/vnd.contact.cmsg', 'cdbcmsg'],
	    ['application/vnd.cosmocaller', 'cmc'],
	    ['application/vnd.crick.clicker', 'clkx'],
	    ['application/vnd.crick.clicker.keyboard', 'clkk'],
	    ['application/vnd.crick.clicker.palette', 'clkp'],
	    ['application/vnd.crick.clicker.template', 'clkt'],
	    ['application/vnd.crick.clicker.wordbank', 'clkw'],
	    ['application/vnd.criticaltools.wbs+xml', 'wbs'],
	    ['application/vnd.ctc-posml', 'pml'],
	    ['application/vnd.cups-ppd', 'ppd'],
	    ['application/vnd.curl.car', 'car'],
	    ['application/vnd.curl.pcurl', 'pcurl'],
	    ['application/vnd.data-vision.rdz', 'rdz'],
	    ['application/vnd.denovo.fcselayout-link', 'fe_launch'],
	    ['application/vnd.dna', 'dna'],
	    ['application/vnd.dolby.mlp', 'mlp'],
	    ['application/vnd.dpgraph', 'dpg'],
	    ['application/vnd.dreamfactory', 'dfac'],
	    ['application/vnd.dvb.ait', 'ait'],
	    ['application/vnd.dvb.service', 'svc'],
	    ['application/vnd.dynageo', 'geo'],
	    ['application/vnd.ecowin.chart', 'mag'],
	    ['application/vnd.enliven', 'nml'],
	    ['application/vnd.epson.esf', 'esf'],
	    ['application/vnd.epson.msf', 'msf'],
	    ['application/vnd.epson.quickanime', 'qam'],
	    ['application/vnd.epson.salt', 'slt'],
	    ['application/vnd.epson.ssf', 'ssf'],
	    ['application/vnd.eszigno3+xml', 'es3'],
	    ['application/vnd.ezpix-album', 'ez2'],
	    ['application/vnd.ezpix-package', 'ez3'],
	    ['application/vnd.fdf', 'fdf'],
	    ['application/vnd.fdsn.seed', 'seed'],
	    ['application/vnd.flographit', 'gph'],
	    ['application/vnd.fluxtime.clip', 'ftc'],
	    ['application/vnd.framemaker', 'fm'],
	    ['application/vnd.frogans.fnc', 'fnc'],
	    ['application/vnd.frogans.ltf', 'ltf'],
	    ['application/vnd.fsc.weblaunch', 'fsc'],
	    ['application/vnd.fujitsu.oasys', 'oas'],
	    ['application/vnd.fujitsu.oasys2', 'oa2'],
	    ['application/vnd.fujitsu.oasys3', 'oa3'],
	    ['application/vnd.fujitsu.oasysgp', 'fg5'],
	    ['application/vnd.fujitsu.oasysprs', 'bh2'],
	    ['application/vnd.fujixerox.ddd', 'ddd'],
	    ['application/vnd.fujixerox.docuworks', 'xdw'],
	    ['application/vnd.fujixerox.docuworks.binder', 'xbd'],
	    ['application/vnd.fuzzysheet', 'fzs'],
	    ['application/vnd.genomatix.tuxedo', 'txd'],
	    ['application/vnd.geogebra.file', 'ggb'],
	    ['application/vnd.geogebra.tool', 'ggt'],
	    ['application/vnd.geometry-explorer', 'gex'],
	    ['application/vnd.geonext', 'gxt'],
	    ['application/vnd.geoplan', 'g2w'],
	    ['application/vnd.geospace', 'g3w'],
	    ['application/vnd.gmx', 'gmx'],
	    ['application/vnd.google-earth.kml+xml', 'kml'],
	    ['application/vnd.google-earth.kmz', 'kmz'],
	    ['application/vnd.grafeq', 'gqf'],
	    ['application/vnd.groove-account', 'gac'],
	    ['application/vnd.groove-help', 'ghf'],
	    ['application/vnd.groove-identity-message', 'gim'],
	    ['application/vnd.groove-injector', 'grv'],
	    ['application/vnd.groove-tool-message', 'gtm'],
	    ['application/vnd.groove-tool-template', 'tpl'],
	    ['application/vnd.groove-vcard', 'vcg'],
	    ['application/vnd.hal+xml', 'hal'],
	    ['application/vnd.handheld-entertainment+xml', 'zmm'],
	    ['application/vnd.hbci', 'hbci'],
	    ['application/vnd.hhe.lesson-player', 'les'],
	    ['application/vnd.hp-hpgl', ['hgl', 'hpg', 'hpgl']],
	    ['application/vnd.hp-hpid', 'hpid'],
	    ['application/vnd.hp-hps', 'hps'],
	    ['application/vnd.hp-jlyt', 'jlt'],
	    ['application/vnd.hp-pcl', 'pcl'],
	    ['application/vnd.hp-pclxl', 'pclxl'],
	    ['application/vnd.hydrostatix.sof-data', 'sfd-hdstx'],
	    ['application/vnd.hzn-3d-crossword', 'x3d'],
	    ['application/vnd.ibm.minipay', 'mpy'],
	    ['application/vnd.ibm.modcap', 'afp'],
	    ['application/vnd.ibm.rights-management', 'irm'],
	    ['application/vnd.ibm.secure-container', 'sc'],
	    ['application/vnd.iccprofile', 'icc'],
	    ['application/vnd.igloader', 'igl'],
	    ['application/vnd.immervision-ivp', 'ivp'],
	    ['application/vnd.immervision-ivu', 'ivu'],
	    ['application/vnd.insors.igm', 'igm'],
	    ['application/vnd.intercon.formnet', 'xpw'],
	    ['application/vnd.intergeo', 'i2g'],
	    ['application/vnd.intu.qbo', 'qbo'],
	    ['application/vnd.intu.qfx', 'qfx'],
	    ['application/vnd.ipunplugged.rcprofile', 'rcprofile'],
	    ['application/vnd.irepository.package+xml', 'irp'],
	    ['application/vnd.is-xpr', 'xpr'],
	    ['application/vnd.isac.fcs', 'fcs'],
	    ['application/vnd.jam', 'jam'],
	    ['application/vnd.jcp.javame.midlet-rms', 'rms'],
	    ['application/vnd.jisp', 'jisp'],
	    ['application/vnd.joost.joda-archive', 'joda'],
	    ['application/vnd.kahootz', 'ktz'],
	    ['application/vnd.kde.karbon', 'karbon'],
	    ['application/vnd.kde.kchart', 'chrt'],
	    ['application/vnd.kde.kformula', 'kfo'],
	    ['application/vnd.kde.kivio', 'flw'],
	    ['application/vnd.kde.kontour', 'kon'],
	    ['application/vnd.kde.kpresenter', 'kpr'],
	    ['application/vnd.kde.kspread', 'ksp'],
	    ['application/vnd.kde.kword', 'kwd'],
	    ['application/vnd.kenameaapp', 'htke'],
	    ['application/vnd.kidspiration', 'kia'],
	    ['application/vnd.kinar', 'kne'],
	    ['application/vnd.koan', 'skp'],
	    ['application/vnd.kodak-descriptor', 'sse'],
	    ['application/vnd.las.las+xml', 'lasxml'],
	    ['application/vnd.llamagraphics.life-balance.desktop', 'lbd'],
	    ['application/vnd.llamagraphics.life-balance.exchange+xml', 'lbe'],
	    ['application/vnd.lotus-1-2-3', '123'],
	    ['application/vnd.lotus-approach', 'apr'],
	    ['application/vnd.lotus-freelance', 'pre'],
	    ['application/vnd.lotus-notes', 'nsf'],
	    ['application/vnd.lotus-organizer', 'org'],
	    ['application/vnd.lotus-screencam', 'scm'],
	    ['application/vnd.lotus-wordpro', 'lwp'],
	    ['application/vnd.macports.portpkg', 'portpkg'],
	    ['application/vnd.mcd', 'mcd'],
	    ['application/vnd.medcalcdata', 'mc1'],
	    ['application/vnd.mediastation.cdkey', 'cdkey'],
	    ['application/vnd.mfer', 'mwf'],
	    ['application/vnd.mfmp', 'mfm'],
	    ['application/vnd.micrografx.flo', 'flo'],
	    ['application/vnd.micrografx.igx', 'igx'],
	    ['application/vnd.mif', 'mif'],
	    ['application/vnd.mobius.daf', 'daf'],
	    ['application/vnd.mobius.dis', 'dis'],
	    ['application/vnd.mobius.mbk', 'mbk'],
	    ['application/vnd.mobius.mqy', 'mqy'],
	    ['application/vnd.mobius.msl', 'msl'],
	    ['application/vnd.mobius.plc', 'plc'],
	    ['application/vnd.mobius.txf', 'txf'],
	    ['application/vnd.mophun.application', 'mpn'],
	    ['application/vnd.mophun.certificate', 'mpc'],
	    ['application/vnd.mozilla.xul+xml', 'xul'],
	    ['application/vnd.ms-artgalry', 'cil'],
	    ['application/vnd.ms-cab-compressed', 'cab'],
	    ['application/vnd.ms-excel', ['xls', 'xla', 'xlc', 'xlm', 'xlt', 'xlw', 'xlb', 'xll']],
	    ['application/vnd.ms-excel.addin.macroenabled.12', 'xlam'],
	    ['application/vnd.ms-excel.sheet.binary.macroenabled.12', 'xlsb'],
	    ['application/vnd.ms-excel.sheet.macroenabled.12', 'xlsm'],
	    ['application/vnd.ms-excel.template.macroenabled.12', 'xltm'],
	    ['application/vnd.ms-fontobject', 'eot'],
	    ['application/vnd.ms-htmlhelp', 'chm'],
	    ['application/vnd.ms-ims', 'ims'],
	    ['application/vnd.ms-lrm', 'lrm'],
	    ['application/vnd.ms-officetheme', 'thmx'],
	    ['application/vnd.ms-outlook', 'msg'],
	    ['application/vnd.ms-pki.certstore', 'sst'],
	    ['application/vnd.ms-pki.pko', 'pko'],
	    ['application/vnd.ms-pki.seccat', 'cat'],
	    ['application/vnd.ms-pki.stl', 'stl'],
	    ['application/vnd.ms-pkicertstore', 'sst'],
	    ['application/vnd.ms-pkiseccat', 'cat'],
	    ['application/vnd.ms-pkistl', 'stl'],
	    ['application/vnd.ms-powerpoint', ['ppt', 'pot', 'pps', 'ppa', 'pwz']],
	    ['application/vnd.ms-powerpoint.addin.macroenabled.12', 'ppam'],
	    ['application/vnd.ms-powerpoint.presentation.macroenabled.12', 'pptm'],
	    ['application/vnd.ms-powerpoint.slide.macroenabled.12', 'sldm'],
	    ['application/vnd.ms-powerpoint.slideshow.macroenabled.12', 'ppsm'],
	    ['application/vnd.ms-powerpoint.template.macroenabled.12', 'potm'],
	    ['application/vnd.ms-project', 'mpp'],
	    ['application/vnd.ms-word.document.macroenabled.12', 'docm'],
	    ['application/vnd.ms-word.template.macroenabled.12', 'dotm'],
	    ['application/vnd.ms-works', ['wks', 'wcm', 'wdb', 'wps']],
	    ['application/vnd.ms-wpl', 'wpl'],
	    ['application/vnd.ms-xpsdocument', 'xps'],
	    ['application/vnd.mseq', 'mseq'],
	    ['application/vnd.musician', 'mus'],
	    ['application/vnd.muvee.style', 'msty'],
	    ['application/vnd.neurolanguage.nlu', 'nlu'],
	    ['application/vnd.noblenet-directory', 'nnd'],
	    ['application/vnd.noblenet-sealer', 'nns'],
	    ['application/vnd.noblenet-web', 'nnw'],
	    ['application/vnd.nokia.configuration-message', 'ncm'],
	    ['application/vnd.nokia.n-gage.data', 'ngdat'],
	    ['application/vnd.nokia.n-gage.symbian.install', 'n-gage'],
	    ['application/vnd.nokia.radio-preset', 'rpst'],
	    ['application/vnd.nokia.radio-presets', 'rpss'],
	    ['application/vnd.nokia.ringing-tone', 'rng'],
	    ['application/vnd.novadigm.edm', 'edm'],
	    ['application/vnd.novadigm.edx', 'edx'],
	    ['application/vnd.novadigm.ext', 'ext'],
	    ['application/vnd.oasis.opendocument.chart', 'odc'],
	    ['application/vnd.oasis.opendocument.chart-template', 'otc'],
	    ['application/vnd.oasis.opendocument.database', 'odb'],
	    ['application/vnd.oasis.opendocument.formula', 'odf'],
	    ['application/vnd.oasis.opendocument.formula-template', 'odft'],
	    ['application/vnd.oasis.opendocument.graphics', 'odg'],
	    ['application/vnd.oasis.opendocument.graphics-template', 'otg'],
	    ['application/vnd.oasis.opendocument.image', 'odi'],
	    ['application/vnd.oasis.opendocument.image-template', 'oti'],
	    ['application/vnd.oasis.opendocument.presentation', 'odp'],
	    ['application/vnd.oasis.opendocument.presentation-template', 'otp'],
	    ['application/vnd.oasis.opendocument.spreadsheet', 'ods'],
	    ['application/vnd.oasis.opendocument.spreadsheet-template', 'ots'],
	    ['application/vnd.oasis.opendocument.text', 'odt'],
	    ['application/vnd.oasis.opendocument.text-master', 'odm'],
	    ['application/vnd.oasis.opendocument.text-template', 'ott'],
	    ['application/vnd.oasis.opendocument.text-web', 'oth'],
	    ['application/vnd.olpc-sugar', 'xo'],
	    ['application/vnd.oma.dd2+xml', 'dd2'],
	    ['application/vnd.openofficeorg.extension', 'oxt'],
	    ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'pptx'],
	    ['application/vnd.openxmlformats-officedocument.presentationml.slide', 'sldx'],
	    ['application/vnd.openxmlformats-officedocument.presentationml.slideshow', 'ppsx'],
	    ['application/vnd.openxmlformats-officedocument.presentationml.template', 'potx'],
	    ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'xlsx'],
	    ['application/vnd.openxmlformats-officedocument.spreadsheetml.template', 'xltx'],
	    ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'docx'],
	    ['application/vnd.openxmlformats-officedocument.wordprocessingml.template', 'dotx'],
	    ['application/vnd.osgeo.mapguide.package', 'mgp'],
	    ['application/vnd.osgi.dp', 'dp'],
	    ['application/vnd.palm', 'pdb'],
	    ['application/vnd.pawaafile', 'paw'],
	    ['application/vnd.pg.format', 'str'],
	    ['application/vnd.pg.osasli', 'ei6'],
	    ['application/vnd.picsel', 'efif'],
	    ['application/vnd.pmi.widget', 'wg'],
	    ['application/vnd.pocketlearn', 'plf'],
	    ['application/vnd.powerbuilder6', 'pbd'],
	    ['application/vnd.previewsystems.box', 'box'],
	    ['application/vnd.proteus.magazine', 'mgz'],
	    ['application/vnd.publishare-delta-tree', 'qps'],
	    ['application/vnd.pvi.ptid1', 'ptid'],
	    ['application/vnd.quark.quarkxpress', 'qxd'],
	    ['application/vnd.realvnc.bed', 'bed'],
	    ['application/vnd.recordare.musicxml', 'mxl'],
	    ['application/vnd.recordare.musicxml+xml', 'musicxml'],
	    ['application/vnd.rig.cryptonote', 'cryptonote'],
	    ['application/vnd.rim.cod', 'cod'],
	    ['application/vnd.rn-realmedia', 'rm'],
	    ['application/vnd.rn-realplayer', 'rnx'],
	    ['application/vnd.route66.link66+xml', 'link66'],
	    ['application/vnd.sailingtracker.track', 'st'],
	    ['application/vnd.seemail', 'see'],
	    ['application/vnd.sema', 'sema'],
	    ['application/vnd.semd', 'semd'],
	    ['application/vnd.semf', 'semf'],
	    ['application/vnd.shana.informed.formdata', 'ifm'],
	    ['application/vnd.shana.informed.formtemplate', 'itp'],
	    ['application/vnd.shana.informed.interchange', 'iif'],
	    ['application/vnd.shana.informed.package', 'ipk'],
	    ['application/vnd.simtech-mindmapper', 'twd'],
	    ['application/vnd.smaf', 'mmf'],
	    ['application/vnd.smart.teacher', 'teacher'],
	    ['application/vnd.solent.sdkm+xml', 'sdkm'],
	    ['application/vnd.spotfire.dxp', 'dxp'],
	    ['application/vnd.spotfire.sfs', 'sfs'],
	    ['application/vnd.stardivision.calc', 'sdc'],
	    ['application/vnd.stardivision.draw', 'sda'],
	    ['application/vnd.stardivision.impress', 'sdd'],
	    ['application/vnd.stardivision.math', 'smf'],
	    ['application/vnd.stardivision.writer', 'sdw'],
	    ['application/vnd.stardivision.writer-global', 'sgl'],
	    ['application/vnd.stepmania.stepchart', 'sm'],
	    ['application/vnd.sun.xml.calc', 'sxc'],
	    ['application/vnd.sun.xml.calc.template', 'stc'],
	    ['application/vnd.sun.xml.draw', 'sxd'],
	    ['application/vnd.sun.xml.draw.template', 'std'],
	    ['application/vnd.sun.xml.impress', 'sxi'],
	    ['application/vnd.sun.xml.impress.template', 'sti'],
	    ['application/vnd.sun.xml.math', 'sxm'],
	    ['application/vnd.sun.xml.writer', 'sxw'],
	    ['application/vnd.sun.xml.writer.global', 'sxg'],
	    ['application/vnd.sun.xml.writer.template', 'stw'],
	    ['application/vnd.sus-calendar', 'sus'],
	    ['application/vnd.svd', 'svd'],
	    ['application/vnd.symbian.install', 'sis'],
	    ['application/vnd.syncml+xml', 'xsm'],
	    ['application/vnd.syncml.dm+wbxml', 'bdm'],
	    ['application/vnd.syncml.dm+xml', 'xdm'],
	    ['application/vnd.tao.intent-module-archive', 'tao'],
	    ['application/vnd.tmobile-livetv', 'tmo'],
	    ['application/vnd.trid.tpt', 'tpt'],
	    ['application/vnd.triscape.mxs', 'mxs'],
	    ['application/vnd.trueapp', 'tra'],
	    ['application/vnd.ufdl', 'ufd'],
	    ['application/vnd.uiq.theme', 'utz'],
	    ['application/vnd.umajin', 'umj'],
	    ['application/vnd.unity', 'unityweb'],
	    ['application/vnd.uoml+xml', 'uoml'],
	    ['application/vnd.vcx', 'vcx'],
	    ['application/vnd.visio', 'vsd'],
	    ['application/vnd.visionary', 'vis'],
	    ['application/vnd.vsf', 'vsf'],
	    ['application/vnd.wap.wbxml', 'wbxml'],
	    ['application/vnd.wap.wmlc', 'wmlc'],
	    ['application/vnd.wap.wmlscriptc', 'wmlsc'],
	    ['application/vnd.webturbo', 'wtb'],
	    ['application/vnd.wolfram.player', 'nbp'],
	    ['application/vnd.wordperfect', 'wpd'],
	    ['application/vnd.wqd', 'wqd'],
	    ['application/vnd.wt.stf', 'stf'],
	    ['application/vnd.xara', ['web', 'xar']],
	    ['application/vnd.xfdl', 'xfdl'],
	    ['application/vnd.yamaha.hv-dic', 'hvd'],
	    ['application/vnd.yamaha.hv-script', 'hvs'],
	    ['application/vnd.yamaha.hv-voice', 'hvp'],
	    ['application/vnd.yamaha.openscoreformat', 'osf'],
	    ['application/vnd.yamaha.openscoreformat.osfpvg+xml', 'osfpvg'],
	    ['application/vnd.yamaha.smaf-audio', 'saf'],
	    ['application/vnd.yamaha.smaf-phrase', 'spf'],
	    ['application/vnd.yellowriver-custom-menu', 'cmp'],
	    ['application/vnd.zul', 'zir'],
	    ['application/vnd.zzazz.deck+xml', 'zaz'],
	    ['application/vocaltec-media-desc', 'vmd'],
	    ['application/vocaltec-media-file', 'vmf'],
	    ['application/voicexml+xml', 'vxml'],
	    ['application/widget', 'wgt'],
	    ['application/winhlp', 'hlp'],
	    ['application/wordperfect', ['wp', 'wp5', 'wp6', 'wpd']],
	    ['application/wordperfect6.0', ['w60', 'wp5']],
	    ['application/wordperfect6.1', 'w61'],
	    ['application/wsdl+xml', 'wsdl'],
	    ['application/wspolicy+xml', 'wspolicy'],
	    ['application/x-123', 'wk1'],
	    ['application/x-7z-compressed', '7z'],
	    ['application/x-abiword', 'abw'],
	    ['application/x-ace-compressed', 'ace'],
	    ['application/x-aim', 'aim'],
	    ['application/x-authorware-bin', 'aab'],
	    ['application/x-authorware-map', 'aam'],
	    ['application/x-authorware-seg', 'aas'],
	    ['application/x-bcpio', 'bcpio'],
	    ['application/x-binary', 'bin'],
	    ['application/x-binhex40', 'hqx'],
	    ['application/x-bittorrent', 'torrent'],
	    ['application/x-bsh', ['bsh', 'sh', 'shar']],
	    ['application/x-bytecode.elisp', 'elc'],
	    ['application/x-bytecode.python', 'pyc'],
	    ['application/x-bzip', 'bz'],
	    ['application/x-bzip2', ['boz', 'bz2']],
	    ['application/x-cdf', 'cdf'],
	    ['application/x-cdlink', 'vcd'],
	    ['application/x-chat', ['cha', 'chat']],
	    ['application/x-chess-pgn', 'pgn'],
	    ['application/x-cmu-raster', 'ras'],
	    ['application/x-cocoa', 'cco'],
	    ['application/x-compactpro', 'cpt'],
	    ['application/x-compress', 'z'],
	    ['application/x-compressed', ['tgz', 'gz', 'z', 'zip']],
	    ['application/x-conference', 'nsc'],
	    ['application/x-cpio', 'cpio'],
	    ['application/x-cpt', 'cpt'],
	    ['application/x-csh', 'csh'],
	    ['application/x-debian-package', 'deb'],
	    ['application/x-deepv', 'deepv'],
	    ['application/x-director', ['dir', 'dcr', 'dxr']],
	    ['application/x-doom', 'wad'],
	    ['application/x-dtbncx+xml', 'ncx'],
	    ['application/x-dtbook+xml', 'dtb'],
	    ['application/x-dtbresource+xml', 'res'],
	    ['application/x-dvi', 'dvi'],
	    ['application/x-elc', 'elc'],
	    ['application/x-envoy', ['env', 'evy']],
	    ['application/x-esrehber', 'es'],
	    ['application/x-excel', ['xls', 'xla', 'xlb', 'xlc', 'xld', 'xlk', 'xll', 'xlm', 'xlt', 'xlv', 'xlw']],
	    ['application/x-font-bdf', 'bdf'],
	    ['application/x-font-ghostscript', 'gsf'],
	    ['application/x-font-linux-psf', 'psf'],
	    ['application/x-font-otf', 'otf'],
	    ['application/x-font-pcf', 'pcf'],
	    ['application/x-font-snf', 'snf'],
	    ['application/x-font-ttf', 'ttf'],
	    ['application/x-font-type1', 'pfa'],
	    ['application/x-font-woff', 'woff'],
	    ['application/x-frame', 'mif'],
	    ['application/x-freelance', 'pre'],
	    ['application/x-futuresplash', 'spl'],
	    ['application/x-gnumeric', 'gnumeric'],
	    ['application/x-gsp', 'gsp'],
	    ['application/x-gss', 'gss'],
	    ['application/x-gtar', 'gtar'],
	    ['application/x-gzip', ['gz', 'gzip']],
	    ['application/x-hdf', 'hdf'],
	    ['application/x-helpfile', ['help', 'hlp']],
	    ['application/x-httpd-imap', 'imap'],
	    ['application/x-ima', 'ima'],
	    ['application/x-internet-signup', ['ins', 'isp']],
	    ['application/x-internett-signup', 'ins'],
	    ['application/x-inventor', 'iv'],
	    ['application/x-ip2', 'ip'],
	    ['application/x-iphone', 'iii'],
	    ['application/x-java-class', 'class'],
	    ['application/x-java-commerce', 'jcm'],
	    ['application/x-java-jnlp-file', 'jnlp'],
	    ['application/x-javascript', 'js'],
	    ['application/x-koan', ['skd', 'skm', 'skp', 'skt']],
	    ['application/x-ksh', 'ksh'],
	    ['application/x-latex', ['latex', 'ltx']],
	    ['application/x-lha', 'lha'],
	    ['application/x-lisp', 'lsp'],
	    ['application/x-livescreen', 'ivy'],
	    ['application/x-lotus', 'wq1'],
	    ['application/x-lotusscreencam', 'scm'],
	    ['application/x-lzh', 'lzh'],
	    ['application/x-lzx', 'lzx'],
	    ['application/x-mac-binhex40', 'hqx'],
	    ['application/x-macbinary', 'bin'],
	    ['application/x-magic-cap-package-1.0', 'mc$'],
	    ['application/x-mathcad', 'mcd'],
	    ['application/x-meme', 'mm'],
	    ['application/x-midi', ['mid', 'midi']],
	    ['application/x-mif', 'mif'],
	    ['application/x-mix-transfer', 'nix'],
	    ['application/x-mobipocket-ebook', 'prc'],
	    ['application/x-mplayer2', 'asx'],
	    ['application/x-ms-application', 'application'],
	    ['application/x-ms-wmd', 'wmd'],
	    ['application/x-ms-wmz', 'wmz'],
	    ['application/x-ms-xbap', 'xbap'],
	    ['application/x-msaccess', 'mdb'],
	    ['application/x-msbinder', 'obd'],
	    ['application/x-mscardfile', 'crd'],
	    ['application/x-msclip', 'clp'],
	    ['application/x-msdownload', ['exe', 'dll']],
	    ['application/x-msexcel', ['xls', 'xla', 'xlw']],
	    ['application/x-msmediaview', ['mvb', 'm13', 'm14']],
	    ['application/x-msmetafile', 'wmf'],
	    ['application/x-msmoney', 'mny'],
	    ['application/x-mspowerpoint', 'ppt'],
	    ['application/x-mspublisher', 'pub'],
	    ['application/x-msschedule', 'scd'],
	    ['application/x-msterminal', 'trm'],
	    ['application/x-mswrite', 'wri'],
	    ['application/x-navi-animation', 'ani'],
	    ['application/x-navidoc', 'nvd'],
	    ['application/x-navimap', 'map'],
	    ['application/x-navistyle', 'stl'],
	    ['application/x-netcdf', ['cdf', 'nc']],
	    ['application/x-newton-compatible-pkg', 'pkg'],
	    ['application/x-nokia-9000-communicator-add-on-software', 'aos'],
	    ['application/x-omc', 'omc'],
	    ['application/x-omcdatamaker', 'omcd'],
	    ['application/x-omcregerator', 'omcr'],
	    ['application/x-pagemaker', ['pm4', 'pm5']],
	    ['application/x-pcl', 'pcl'],
	    ['application/x-perfmon', ['pma', 'pmc', 'pml', 'pmr', 'pmw']],
	    ['application/x-pixclscript', 'plx'],
	    ['application/x-pkcs10', 'p10'],
	    ['application/x-pkcs12', ['p12', 'pfx']],
	    ['application/x-pkcs7-certificates', ['p7b', 'spc']],
	    ['application/x-pkcs7-certreqresp', 'p7r'],
	    ['application/x-pkcs7-mime', ['p7m', 'p7c']],
	    ['application/x-pkcs7-signature', ['p7s', 'p7a']],
	    ['application/x-pointplus', 'css'],
	    ['application/x-portable-anymap', 'pnm'],
	    ['application/x-project', ['mpc', 'mpt', 'mpv', 'mpx']],
	    ['application/x-qpro', 'wb1'],
	    ['application/x-rar-compressed', 'rar'],
	    ['application/x-rtf', 'rtf'],
	    ['application/x-sdp', 'sdp'],
	    ['application/x-sea', 'sea'],
	    ['application/x-seelogo', 'sl'],
	    ['application/x-sh', 'sh'],
	    ['application/x-shar', ['shar', 'sh']],
	    ['application/x-shockwave-flash', 'swf'],
	    ['application/x-silverlight-app', 'xap'],
	    ['application/x-sit', 'sit'],
	    ['application/x-sprite', ['spr', 'sprite']],
	    ['application/x-stuffit', 'sit'],
	    ['application/x-stuffitx', 'sitx'],
	    ['application/x-sv4cpio', 'sv4cpio'],
	    ['application/x-sv4crc', 'sv4crc'],
	    ['application/x-tar', 'tar'],
	    ['application/x-tbook', ['sbk', 'tbk']],
	    ['application/x-tcl', 'tcl'],
	    ['application/x-tex', 'tex'],
	    ['application/x-tex-tfm', 'tfm'],
	    ['application/x-texinfo', ['texi', 'texinfo']],
	    ['application/x-troff', ['roff', 't', 'tr']],
	    ['application/x-troff-man', 'man'],
	    ['application/x-troff-me', 'me'],
	    ['application/x-troff-ms', 'ms'],
	    ['application/x-troff-msvideo', 'avi'],
	    ['application/x-ustar', 'ustar'],
	    ['application/x-visio', ['vsd', 'vst', 'vsw']],
	    ['application/x-vnd.audioexplosion.mzz', 'mzz'],
	    ['application/x-vnd.ls-xpix', 'xpix'],
	    ['application/x-vrml', 'vrml'],
	    ['application/x-wais-source', ['src', 'wsrc']],
	    ['application/x-winhelp', 'hlp'],
	    ['application/x-wintalk', 'wtk'],
	    ['application/x-world', ['wrl', 'svr']],
	    ['application/x-wpwin', 'wpd'],
	    ['application/x-wri', 'wri'],
	    ['application/x-x509-ca-cert', ['cer', 'crt', 'der']],
	    ['application/x-x509-user-cert', 'crt'],
	    ['application/x-xfig', 'fig'],
	    ['application/x-xpinstall', 'xpi'],
	    ['application/x-zip-compressed', 'zip'],
	    ['application/xcap-diff+xml', 'xdf'],
	    ['application/xenc+xml', 'xenc'],
	    ['application/xhtml+xml', 'xhtml'],
	    ['application/xml', 'xml'],
	    ['application/xml-dtd', 'dtd'],
	    ['application/xop+xml', 'xop'],
	    ['application/xslt+xml', 'xslt'],
	    ['application/xspf+xml', 'xspf'],
	    ['application/xv+xml', 'mxml'],
	    ['application/yang', 'yang'],
	    ['application/yin+xml', 'yin'],
	    ['application/ynd.ms-pkipko', 'pko'],
	    ['application/zip', 'zip'],
	    ['audio/adpcm', 'adp'],
	    ['audio/aiff', ['aiff', 'aif', 'aifc']],
	    ['audio/basic', ['snd', 'au']],
	    ['audio/it', 'it'],
	    ['audio/make', ['funk', 'my', 'pfunk']],
	    ['audio/make.my.funk', 'pfunk'],
	    ['audio/mid', ['mid', 'rmi']],
	    ['audio/midi', ['midi', 'kar', 'mid']],
	    ['audio/mod', 'mod'],
	    ['audio/mp4', 'mp4a'],
	    ['audio/mpeg', ['mpga', 'mp3', 'm2a', 'mp2', 'mpa', 'mpg']],
	    ['audio/mpeg3', 'mp3'],
	    ['audio/nspaudio', ['la', 'lma']],
	    ['audio/ogg', 'oga'],
	    ['audio/s3m', 's3m'],
	    ['audio/tsp-audio', 'tsi'],
	    ['audio/tsplayer', 'tsp'],
	    ['audio/vnd.dece.audio', 'uva'],
	    ['audio/vnd.digital-winds', 'eol'],
	    ['audio/vnd.dra', 'dra'],
	    ['audio/vnd.dts', 'dts'],
	    ['audio/vnd.dts.hd', 'dtshd'],
	    ['audio/vnd.lucent.voice', 'lvp'],
	    ['audio/vnd.ms-playready.media.pya', 'pya'],
	    ['audio/vnd.nuera.ecelp4800', 'ecelp4800'],
	    ['audio/vnd.nuera.ecelp7470', 'ecelp7470'],
	    ['audio/vnd.nuera.ecelp9600', 'ecelp9600'],
	    ['audio/vnd.qcelp', 'qcp'],
	    ['audio/vnd.rip', 'rip'],
	    ['audio/voc', 'voc'],
	    ['audio/voxware', 'vox'],
	    ['audio/wav', 'wav'],
	    ['audio/webm', 'weba'],
	    ['audio/x-aac', 'aac'],
	    ['audio/x-adpcm', 'snd'],
	    ['audio/x-aiff', ['aiff', 'aif', 'aifc']],
	    ['audio/x-au', 'au'],
	    ['audio/x-gsm', ['gsd', 'gsm']],
	    ['audio/x-jam', 'jam'],
	    ['audio/x-liveaudio', 'lam'],
	    ['audio/x-mid', ['mid', 'midi']],
	    ['audio/x-midi', ['midi', 'mid']],
	    ['audio/x-mod', 'mod'],
	    ['audio/x-mpeg', 'mp2'],
	    ['audio/x-mpeg-3', 'mp3'],
	    ['audio/x-mpegurl', 'm3u'],
	    ['audio/x-mpequrl', 'm3u'],
	    ['audio/x-ms-wax', 'wax'],
	    ['audio/x-ms-wma', 'wma'],
	    ['audio/x-nspaudio', ['la', 'lma']],
	    ['audio/x-pn-realaudio', ['ra', 'ram', 'rm', 'rmm', 'rmp']],
	    ['audio/x-pn-realaudio-plugin', ['ra', 'rmp', 'rpm']],
	    ['audio/x-psid', 'sid'],
	    ['audio/x-realaudio', 'ra'],
	    ['audio/x-twinvq', 'vqf'],
	    ['audio/x-twinvq-plugin', ['vqe', 'vql']],
	    ['audio/x-vnd.audioexplosion.mjuicemediafile', 'mjf'],
	    ['audio/x-voc', 'voc'],
	    ['audio/x-wav', 'wav'],
	    ['audio/xm', 'xm'],
	    ['chemical/x-cdx', 'cdx'],
	    ['chemical/x-cif', 'cif'],
	    ['chemical/x-cmdf', 'cmdf'],
	    ['chemical/x-cml', 'cml'],
	    ['chemical/x-csml', 'csml'],
	    ['chemical/x-pdb', ['pdb', 'xyz']],
	    ['chemical/x-xyz', 'xyz'],
	    ['drawing/x-dwf', 'dwf'],
	    ['i-world/i-vrml', 'ivr'],
	    ['image/bmp', ['bmp', 'bm']],
	    ['image/cgm', 'cgm'],
	    ['image/cis-cod', 'cod'],
	    ['image/cmu-raster', ['ras', 'rast']],
	    ['image/fif', 'fif'],
	    ['image/florian', ['flo', 'turbot']],
	    ['image/g3fax', 'g3'],
	    ['image/gif', 'gif'],
	    ['image/ief', ['ief', 'iefs']],
	    ['image/jpeg', ['jpeg', 'jpe', 'jpg', 'jfif', 'jfif-tbnl']],
	    ['image/jutvision', 'jut'],
	    ['image/ktx', 'ktx'],
	    ['image/naplps', ['nap', 'naplps']],
	    ['image/pict', ['pic', 'pict']],
	    ['image/pipeg', 'jfif'],
	    ['image/pjpeg', ['jfif', 'jpe', 'jpeg', 'jpg']],
	    ['image/png', ['png', 'x-png']],
	    ['image/prs.btif', 'btif'],
	    ['image/svg+xml', 'svg'],
	    ['image/tiff', ['tif', 'tiff']],
	    ['image/vasa', 'mcf'],
	    ['image/vnd.adobe.photoshop', 'psd'],
	    ['image/vnd.dece.graphic', 'uvi'],
	    ['image/vnd.djvu', 'djvu'],
	    ['image/vnd.dvb.subtitle', 'sub'],
	    ['image/vnd.dwg', ['dwg', 'dxf', 'svf']],
	    ['image/vnd.dxf', 'dxf'],
	    ['image/vnd.fastbidsheet', 'fbs'],
	    ['image/vnd.fpx', 'fpx'],
	    ['image/vnd.fst', 'fst'],
	    ['image/vnd.fujixerox.edmics-mmr', 'mmr'],
	    ['image/vnd.fujixerox.edmics-rlc', 'rlc'],
	    ['image/vnd.ms-modi', 'mdi'],
	    ['image/vnd.net-fpx', ['fpx', 'npx']],
	    ['image/vnd.rn-realflash', 'rf'],
	    ['image/vnd.rn-realpix', 'rp'],
	    ['image/vnd.wap.wbmp', 'wbmp'],
	    ['image/vnd.xiff', 'xif'],
	    ['image/webp', 'webp'],
	    ['image/x-cmu-raster', 'ras'],
	    ['image/x-cmx', 'cmx'],
	    ['image/x-dwg', ['dwg', 'dxf', 'svf']],
	    ['image/x-freehand', 'fh'],
	    ['image/x-icon', 'ico'],
	    ['image/x-jg', 'art'],
	    ['image/x-jps', 'jps'],
	    ['image/x-niff', ['niff', 'nif']],
	    ['image/x-pcx', 'pcx'],
	    ['image/x-pict', ['pct', 'pic']],
	    ['image/x-portable-anymap', 'pnm'],
	    ['image/x-portable-bitmap', 'pbm'],
	    ['image/x-portable-graymap', 'pgm'],
	    ['image/x-portable-greymap', 'pgm'],
	    ['image/x-portable-pixmap', 'ppm'],
	    ['image/x-quicktime', ['qif', 'qti', 'qtif']],
	    ['image/x-rgb', 'rgb'],
	    ['image/x-tiff', ['tif', 'tiff']],
	    ['image/x-windows-bmp', 'bmp'],
	    ['image/x-xbitmap', 'xbm'],
	    ['image/x-xbm', 'xbm'],
	    ['image/x-xpixmap', ['xpm', 'pm']],
	    ['image/x-xwd', 'xwd'],
	    ['image/x-xwindowdump', 'xwd'],
	    ['image/xbm', 'xbm'],
	    ['image/xpm', 'xpm'],
	    ['message/rfc822', ['eml', 'mht', 'mhtml', 'nws', 'mime']],
	    ['model/iges', ['iges', 'igs']],
	    ['model/mesh', 'msh'],
	    ['model/vnd.collada+xml', 'dae'],
	    ['model/vnd.dwf', 'dwf'],
	    ['model/vnd.gdl', 'gdl'],
	    ['model/vnd.gtw', 'gtw'],
	    ['model/vnd.mts', 'mts'],
	    ['model/vnd.vtu', 'vtu'],
	    ['model/vrml', ['vrml', 'wrl', 'wrz']],
	    ['model/x-pov', 'pov'],
	    ['multipart/x-gzip', 'gzip'],
	    ['multipart/x-ustar', 'ustar'],
	    ['multipart/x-zip', 'zip'],
	    ['music/crescendo', ['mid', 'midi']],
	    ['music/x-karaoke', 'kar'],
	    ['paleovu/x-pv', 'pvu'],
	    ['text/asp', 'asp'],
	    ['text/calendar', 'ics'],
	    ['text/css', 'css'],
	    ['text/csv', 'csv'],
	    ['text/ecmascript', 'js'],
	    ['text/h323', '323'],
	    ['text/html', ['html', 'htm', 'stm', 'acgi', 'htmls', 'htx', 'shtml']],
	    ['text/iuls', 'uls'],
	    ['text/javascript', 'js'],
	    ['text/mcf', 'mcf'],
	    ['text/n3', 'n3'],
	    ['text/pascal', 'pas'],
	    [
	        'text/plain',
	        [
	            'txt',
	            'bas',
	            'c',
	            'h',
	            'c++',
	            'cc',
	            'com',
	            'conf',
	            'cxx',
	            'def',
	            'f',
	            'f90',
	            'for',
	            'g',
	            'hh',
	            'idc',
	            'jav',
	            'java',
	            'list',
	            'log',
	            'lst',
	            'm',
	            'mar',
	            'pl',
	            'sdml',
	            'text'
	        ]
	    ],
	    ['text/plain-bas', 'par'],
	    ['text/prs.lines.tag', 'dsc'],
	    ['text/richtext', ['rtx', 'rt', 'rtf']],
	    ['text/scriplet', 'wsc'],
	    ['text/scriptlet', 'sct'],
	    ['text/sgml', ['sgm', 'sgml']],
	    ['text/tab-separated-values', 'tsv'],
	    ['text/troff', 't'],
	    ['text/turtle', 'ttl'],
	    ['text/uri-list', ['uni', 'unis', 'uri', 'uris']],
	    ['text/vnd.abc', 'abc'],
	    ['text/vnd.curl', 'curl'],
	    ['text/vnd.curl.dcurl', 'dcurl'],
	    ['text/vnd.curl.mcurl', 'mcurl'],
	    ['text/vnd.curl.scurl', 'scurl'],
	    ['text/vnd.fly', 'fly'],
	    ['text/vnd.fmi.flexstor', 'flx'],
	    ['text/vnd.graphviz', 'gv'],
	    ['text/vnd.in3d.3dml', '3dml'],
	    ['text/vnd.in3d.spot', 'spot'],
	    ['text/vnd.rn-realtext', 'rt'],
	    ['text/vnd.sun.j2me.app-descriptor', 'jad'],
	    ['text/vnd.wap.wml', 'wml'],
	    ['text/vnd.wap.wmlscript', 'wmls'],
	    ['text/webviewhtml', 'htt'],
	    ['text/x-asm', ['asm', 's']],
	    ['text/x-audiosoft-intra', 'aip'],
	    ['text/x-c', ['c', 'cc', 'cpp']],
	    ['text/x-component', 'htc'],
	    ['text/x-fortran', ['for', 'f', 'f77', 'f90']],
	    ['text/x-h', ['h', 'hh']],
	    ['text/x-java-source', ['java', 'jav']],
	    ['text/x-java-source,java', 'java'],
	    ['text/x-la-asf', 'lsx'],
	    ['text/x-m', 'm'],
	    ['text/x-pascal', 'p'],
	    ['text/x-script', 'hlb'],
	    ['text/x-script.csh', 'csh'],
	    ['text/x-script.elisp', 'el'],
	    ['text/x-script.guile', 'scm'],
	    ['text/x-script.ksh', 'ksh'],
	    ['text/x-script.lisp', 'lsp'],
	    ['text/x-script.perl', 'pl'],
	    ['text/x-script.perl-module', 'pm'],
	    ['text/x-script.phyton', 'py'],
	    ['text/x-script.rexx', 'rexx'],
	    ['text/x-script.scheme', 'scm'],
	    ['text/x-script.sh', 'sh'],
	    ['text/x-script.tcl', 'tcl'],
	    ['text/x-script.tcsh', 'tcsh'],
	    ['text/x-script.zsh', 'zsh'],
	    ['text/x-server-parsed-html', ['shtml', 'ssi']],
	    ['text/x-setext', 'etx'],
	    ['text/x-sgml', ['sgm', 'sgml']],
	    ['text/x-speech', ['spc', 'talk']],
	    ['text/x-uil', 'uil'],
	    ['text/x-uuencode', ['uu', 'uue']],
	    ['text/x-vcalendar', 'vcs'],
	    ['text/x-vcard', 'vcf'],
	    ['text/xml', 'xml'],
	    ['video/3gpp', '3gp'],
	    ['video/3gpp2', '3g2'],
	    ['video/animaflex', 'afl'],
	    ['video/avi', 'avi'],
	    ['video/avs-video', 'avs'],
	    ['video/dl', 'dl'],
	    ['video/fli', 'fli'],
	    ['video/gl', 'gl'],
	    ['video/h261', 'h261'],
	    ['video/h263', 'h263'],
	    ['video/h264', 'h264'],
	    ['video/jpeg', 'jpgv'],
	    ['video/jpm', 'jpm'],
	    ['video/mj2', 'mj2'],
	    ['video/mp4', 'mp4'],
	    ['video/mpeg', ['mpeg', 'mp2', 'mpa', 'mpe', 'mpg', 'mpv2', 'm1v', 'm2v', 'mp3']],
	    ['video/msvideo', 'avi'],
	    ['video/ogg', 'ogv'],
	    ['video/quicktime', ['mov', 'qt', 'moov']],
	    ['video/vdo', 'vdo'],
	    ['video/vivo', ['viv', 'vivo']],
	    ['video/vnd.dece.hd', 'uvh'],
	    ['video/vnd.dece.mobile', 'uvm'],
	    ['video/vnd.dece.pd', 'uvp'],
	    ['video/vnd.dece.sd', 'uvs'],
	    ['video/vnd.dece.video', 'uvv'],
	    ['video/vnd.fvt', 'fvt'],
	    ['video/vnd.mpegurl', 'mxu'],
	    ['video/vnd.ms-playready.media.pyv', 'pyv'],
	    ['video/vnd.rn-realvideo', 'rv'],
	    ['video/vnd.uvvu.mp4', 'uvu'],
	    ['video/vnd.vivo', ['viv', 'vivo']],
	    ['video/vosaic', 'vos'],
	    ['video/webm', 'webm'],
	    ['video/x-amt-demorun', 'xdr'],
	    ['video/x-amt-showrun', 'xsr'],
	    ['video/x-atomic3d-feature', 'fmf'],
	    ['video/x-dl', 'dl'],
	    ['video/x-dv', ['dif', 'dv']],
	    ['video/x-f4v', 'f4v'],
	    ['video/x-fli', 'fli'],
	    ['video/x-flv', 'flv'],
	    ['video/x-gl', 'gl'],
	    ['video/x-isvideo', 'isu'],
	    ['video/x-la-asf', ['lsf', 'lsx']],
	    ['video/x-m4v', 'm4v'],
	    ['video/x-motion-jpeg', 'mjpg'],
	    ['video/x-mpeg', ['mp3', 'mp2']],
	    ['video/x-mpeq2a', 'mp2'],
	    ['video/x-ms-asf', ['asf', 'asr', 'asx']],
	    ['video/x-ms-asf-plugin', 'asx'],
	    ['video/x-ms-wm', 'wm'],
	    ['video/x-ms-wmv', 'wmv'],
	    ['video/x-ms-wmx', 'wmx'],
	    ['video/x-ms-wvx', 'wvx'],
	    ['video/x-msvideo', 'avi'],
	    ['video/x-qtc', 'qtc'],
	    ['video/x-scm', 'scm'],
	    ['video/x-sgi-movie', ['movie', 'mv']],
	    ['windows/metafile', 'wmf'],
	    ['www/mime', 'mime'],
	    ['x-conference/x-cooltalk', 'ice'],
	    ['x-music/x-midi', ['mid', 'midi']],
	    ['x-world/x-3dmf', ['3dm', '3dmf', 'qd3', 'qd3d']],
	    ['x-world/x-svr', 'svr'],
	    ['x-world/x-vrml', ['flr', 'vrml', 'wrl', 'wrz', 'xaf', 'xof']],
	    ['x-world/x-vrt', 'vrt'],
	    ['xgl/drawing', 'xgz'],
	    ['xgl/movie', 'xmz']
	]);
	const extensions = new Map([
	    ['123', 'application/vnd.lotus-1-2-3'],
	    ['323', 'text/h323'],
	    ['*', 'application/octet-stream'],
	    ['3dm', 'x-world/x-3dmf'],
	    ['3dmf', 'x-world/x-3dmf'],
	    ['3dml', 'text/vnd.in3d.3dml'],
	    ['3g2', 'video/3gpp2'],
	    ['3gp', 'video/3gpp'],
	    ['7z', 'application/x-7z-compressed'],
	    ['a', 'application/octet-stream'],
	    ['aab', 'application/x-authorware-bin'],
	    ['aac', 'audio/x-aac'],
	    ['aam', 'application/x-authorware-map'],
	    ['aas', 'application/x-authorware-seg'],
	    ['abc', 'text/vnd.abc'],
	    ['abw', 'application/x-abiword'],
	    ['ac', 'application/pkix-attr-cert'],
	    ['acc', 'application/vnd.americandynamics.acc'],
	    ['ace', 'application/x-ace-compressed'],
	    ['acgi', 'text/html'],
	    ['acu', 'application/vnd.acucobol'],
	    ['acx', 'application/internet-property-stream'],
	    ['adp', 'audio/adpcm'],
	    ['aep', 'application/vnd.audiograph'],
	    ['afl', 'video/animaflex'],
	    ['afp', 'application/vnd.ibm.modcap'],
	    ['ahead', 'application/vnd.ahead.space'],
	    ['ai', 'application/postscript'],
	    ['aif', ['audio/aiff', 'audio/x-aiff']],
	    ['aifc', ['audio/aiff', 'audio/x-aiff']],
	    ['aiff', ['audio/aiff', 'audio/x-aiff']],
	    ['aim', 'application/x-aim'],
	    ['aip', 'text/x-audiosoft-intra'],
	    ['air', 'application/vnd.adobe.air-application-installer-package+zip'],
	    ['ait', 'application/vnd.dvb.ait'],
	    ['ami', 'application/vnd.amiga.ami'],
	    ['ani', 'application/x-navi-animation'],
	    ['aos', 'application/x-nokia-9000-communicator-add-on-software'],
	    ['apk', 'application/vnd.android.package-archive'],
	    ['application', 'application/x-ms-application'],
	    ['apr', 'application/vnd.lotus-approach'],
	    ['aps', 'application/mime'],
	    ['arc', 'application/octet-stream'],
	    ['arj', ['application/arj', 'application/octet-stream']],
	    ['art', 'image/x-jg'],
	    ['asf', 'video/x-ms-asf'],
	    ['asm', 'text/x-asm'],
	    ['aso', 'application/vnd.accpac.simply.aso'],
	    ['asp', 'text/asp'],
	    ['asr', 'video/x-ms-asf'],
	    ['asx', ['video/x-ms-asf', 'application/x-mplayer2', 'video/x-ms-asf-plugin']],
	    ['atc', 'application/vnd.acucorp'],
	    ['atomcat', 'application/atomcat+xml'],
	    ['atomsvc', 'application/atomsvc+xml'],
	    ['atx', 'application/vnd.antix.game-component'],
	    ['au', ['audio/basic', 'audio/x-au']],
	    ['avi', ['video/avi', 'video/msvideo', 'application/x-troff-msvideo', 'video/x-msvideo']],
	    ['avs', 'video/avs-video'],
	    ['aw', 'application/applixware'],
	    ['axs', 'application/olescript'],
	    ['azf', 'application/vnd.airzip.filesecure.azf'],
	    ['azs', 'application/vnd.airzip.filesecure.azs'],
	    ['azw', 'application/vnd.amazon.ebook'],
	    ['bas', 'text/plain'],
	    ['bcpio', 'application/x-bcpio'],
	    ['bdf', 'application/x-font-bdf'],
	    ['bdm', 'application/vnd.syncml.dm+wbxml'],
	    ['bed', 'application/vnd.realvnc.bed'],
	    ['bh2', 'application/vnd.fujitsu.oasysprs'],
	    [
	        'bin',
	        ['application/octet-stream', 'application/mac-binary', 'application/macbinary', 'application/x-macbinary', 'application/x-binary']
	    ],
	    ['bm', 'image/bmp'],
	    ['bmi', 'application/vnd.bmi'],
	    ['bmp', ['image/bmp', 'image/x-windows-bmp']],
	    ['boo', 'application/book'],
	    ['book', 'application/book'],
	    ['box', 'application/vnd.previewsystems.box'],
	    ['boz', 'application/x-bzip2'],
	    ['bsh', 'application/x-bsh'],
	    ['btif', 'image/prs.btif'],
	    ['bz', 'application/x-bzip'],
	    ['bz2', 'application/x-bzip2'],
	    ['c', ['text/plain', 'text/x-c']],
	    ['c++', 'text/plain'],
	    ['c11amc', 'application/vnd.cluetrust.cartomobile-config'],
	    ['c11amz', 'application/vnd.cluetrust.cartomobile-config-pkg'],
	    ['c4g', 'application/vnd.clonk.c4group'],
	    ['cab', 'application/vnd.ms-cab-compressed'],
	    ['car', 'application/vnd.curl.car'],
	    ['cat', ['application/vnd.ms-pkiseccat', 'application/vnd.ms-pki.seccat']],
	    ['cc', ['text/plain', 'text/x-c']],
	    ['ccad', 'application/clariscad'],
	    ['cco', 'application/x-cocoa'],
	    ['ccxml', 'application/ccxml+xml,'],
	    ['cdbcmsg', 'application/vnd.contact.cmsg'],
	    ['cdf', ['application/cdf', 'application/x-cdf', 'application/x-netcdf']],
	    ['cdkey', 'application/vnd.mediastation.cdkey'],
	    ['cdmia', 'application/cdmi-capability'],
	    ['cdmic', 'application/cdmi-container'],
	    ['cdmid', 'application/cdmi-domain'],
	    ['cdmio', 'application/cdmi-object'],
	    ['cdmiq', 'application/cdmi-queue'],
	    ['cdx', 'chemical/x-cdx'],
	    ['cdxml', 'application/vnd.chemdraw+xml'],
	    ['cdy', 'application/vnd.cinderella'],
	    ['cer', ['application/pkix-cert', 'application/x-x509-ca-cert']],
	    ['cgm', 'image/cgm'],
	    ['cha', 'application/x-chat'],
	    ['chat', 'application/x-chat'],
	    ['chm', 'application/vnd.ms-htmlhelp'],
	    ['chrt', 'application/vnd.kde.kchart'],
	    ['cif', 'chemical/x-cif'],
	    ['cii', 'application/vnd.anser-web-certificate-issue-initiation'],
	    ['cil', 'application/vnd.ms-artgalry'],
	    ['cla', 'application/vnd.claymore'],
	    [
	        'class',
	        ['application/octet-stream', 'application/java', 'application/java-byte-code', 'application/java-vm', 'application/x-java-class']
	    ],
	    ['clkk', 'application/vnd.crick.clicker.keyboard'],
	    ['clkp', 'application/vnd.crick.clicker.palette'],
	    ['clkt', 'application/vnd.crick.clicker.template'],
	    ['clkw', 'application/vnd.crick.clicker.wordbank'],
	    ['clkx', 'application/vnd.crick.clicker'],
	    ['clp', 'application/x-msclip'],
	    ['cmc', 'application/vnd.cosmocaller'],
	    ['cmdf', 'chemical/x-cmdf'],
	    ['cml', 'chemical/x-cml'],
	    ['cmp', 'application/vnd.yellowriver-custom-menu'],
	    ['cmx', 'image/x-cmx'],
	    ['cod', ['image/cis-cod', 'application/vnd.rim.cod']],
	    ['com', ['application/octet-stream', 'text/plain']],
	    ['conf', 'text/plain'],
	    ['cpio', 'application/x-cpio'],
	    ['cpp', 'text/x-c'],
	    ['cpt', ['application/mac-compactpro', 'application/x-compactpro', 'application/x-cpt']],
	    ['crd', 'application/x-mscardfile'],
	    ['crl', ['application/pkix-crl', 'application/pkcs-crl']],
	    ['crt', ['application/pkix-cert', 'application/x-x509-user-cert', 'application/x-x509-ca-cert']],
	    ['cryptonote', 'application/vnd.rig.cryptonote'],
	    ['csh', ['text/x-script.csh', 'application/x-csh']],
	    ['csml', 'chemical/x-csml'],
	    ['csp', 'application/vnd.commonspace'],
	    ['css', ['text/css', 'application/x-pointplus']],
	    ['csv', 'text/csv'],
	    ['cu', 'application/cu-seeme'],
	    ['curl', 'text/vnd.curl'],
	    ['cww', 'application/prs.cww'],
	    ['cxx', 'text/plain'],
	    ['dae', 'model/vnd.collada+xml'],
	    ['daf', 'application/vnd.mobius.daf'],
	    ['davmount', 'application/davmount+xml'],
	    ['dcr', 'application/x-director'],
	    ['dcurl', 'text/vnd.curl.dcurl'],
	    ['dd2', 'application/vnd.oma.dd2+xml'],
	    ['ddd', 'application/vnd.fujixerox.ddd'],
	    ['deb', 'application/x-debian-package'],
	    ['deepv', 'application/x-deepv'],
	    ['def', 'text/plain'],
	    ['der', 'application/x-x509-ca-cert'],
	    ['dfac', 'application/vnd.dreamfactory'],
	    ['dif', 'video/x-dv'],
	    ['dir', 'application/x-director'],
	    ['dis', 'application/vnd.mobius.dis'],
	    ['djvu', 'image/vnd.djvu'],
	    ['dl', ['video/dl', 'video/x-dl']],
	    ['dll', 'application/x-msdownload'],
	    ['dms', 'application/octet-stream'],
	    ['dna', 'application/vnd.dna'],
	    ['doc', 'application/msword'],
	    ['docm', 'application/vnd.ms-word.document.macroenabled.12'],
	    ['docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
	    ['dot', 'application/msword'],
	    ['dotm', 'application/vnd.ms-word.template.macroenabled.12'],
	    ['dotx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.template'],
	    ['dp', ['application/commonground', 'application/vnd.osgi.dp']],
	    ['dpg', 'application/vnd.dpgraph'],
	    ['dra', 'audio/vnd.dra'],
	    ['drw', 'application/drafting'],
	    ['dsc', 'text/prs.lines.tag'],
	    ['dssc', 'application/dssc+der'],
	    ['dtb', 'application/x-dtbook+xml'],
	    ['dtd', 'application/xml-dtd'],
	    ['dts', 'audio/vnd.dts'],
	    ['dtshd', 'audio/vnd.dts.hd'],
	    ['dump', 'application/octet-stream'],
	    ['dv', 'video/x-dv'],
	    ['dvi', 'application/x-dvi'],
	    ['dwf', ['model/vnd.dwf', 'drawing/x-dwf']],
	    ['dwg', ['application/acad', 'image/vnd.dwg', 'image/x-dwg']],
	    ['dxf', ['application/dxf', 'image/vnd.dwg', 'image/vnd.dxf', 'image/x-dwg']],
	    ['dxp', 'application/vnd.spotfire.dxp'],
	    ['dxr', 'application/x-director'],
	    ['ecelp4800', 'audio/vnd.nuera.ecelp4800'],
	    ['ecelp7470', 'audio/vnd.nuera.ecelp7470'],
	    ['ecelp9600', 'audio/vnd.nuera.ecelp9600'],
	    ['edm', 'application/vnd.novadigm.edm'],
	    ['edx', 'application/vnd.novadigm.edx'],
	    ['efif', 'application/vnd.picsel'],
	    ['ei6', 'application/vnd.pg.osasli'],
	    ['el', 'text/x-script.elisp'],
	    ['elc', ['application/x-elc', 'application/x-bytecode.elisp']],
	    ['eml', 'message/rfc822'],
	    ['emma', 'application/emma+xml'],
	    ['env', 'application/x-envoy'],
	    ['eol', 'audio/vnd.digital-winds'],
	    ['eot', 'application/vnd.ms-fontobject'],
	    ['eps', 'application/postscript'],
	    ['epub', 'application/epub+zip'],
	    ['es', ['application/ecmascript', 'application/x-esrehber']],
	    ['es3', 'application/vnd.eszigno3+xml'],
	    ['esf', 'application/vnd.epson.esf'],
	    ['etx', 'text/x-setext'],
	    ['evy', ['application/envoy', 'application/x-envoy']],
	    ['exe', ['application/octet-stream', 'application/x-msdownload']],
	    ['exi', 'application/exi'],
	    ['ext', 'application/vnd.novadigm.ext'],
	    ['ez2', 'application/vnd.ezpix-album'],
	    ['ez3', 'application/vnd.ezpix-package'],
	    ['f', ['text/plain', 'text/x-fortran']],
	    ['f4v', 'video/x-f4v'],
	    ['f77', 'text/x-fortran'],
	    ['f90', ['text/plain', 'text/x-fortran']],
	    ['fbs', 'image/vnd.fastbidsheet'],
	    ['fcs', 'application/vnd.isac.fcs'],
	    ['fdf', 'application/vnd.fdf'],
	    ['fe_launch', 'application/vnd.denovo.fcselayout-link'],
	    ['fg5', 'application/vnd.fujitsu.oasysgp'],
	    ['fh', 'image/x-freehand'],
	    ['fif', ['application/fractals', 'image/fif']],
	    ['fig', 'application/x-xfig'],
	    ['fli', ['video/fli', 'video/x-fli']],
	    ['flo', ['image/florian', 'application/vnd.micrografx.flo']],
	    ['flr', 'x-world/x-vrml'],
	    ['flv', 'video/x-flv'],
	    ['flw', 'application/vnd.kde.kivio'],
	    ['flx', 'text/vnd.fmi.flexstor'],
	    ['fly', 'text/vnd.fly'],
	    ['fm', 'application/vnd.framemaker'],
	    ['fmf', 'video/x-atomic3d-feature'],
	    ['fnc', 'application/vnd.frogans.fnc'],
	    ['for', ['text/plain', 'text/x-fortran']],
	    ['fpx', ['image/vnd.fpx', 'image/vnd.net-fpx']],
	    ['frl', 'application/freeloader'],
	    ['fsc', 'application/vnd.fsc.weblaunch'],
	    ['fst', 'image/vnd.fst'],
	    ['ftc', 'application/vnd.fluxtime.clip'],
	    ['fti', 'application/vnd.anser-web-funds-transfer-initiation'],
	    ['funk', 'audio/make'],
	    ['fvt', 'video/vnd.fvt'],
	    ['fxp', 'application/vnd.adobe.fxp'],
	    ['fzs', 'application/vnd.fuzzysheet'],
	    ['g', 'text/plain'],
	    ['g2w', 'application/vnd.geoplan'],
	    ['g3', 'image/g3fax'],
	    ['g3w', 'application/vnd.geospace'],
	    ['gac', 'application/vnd.groove-account'],
	    ['gdl', 'model/vnd.gdl'],
	    ['geo', 'application/vnd.dynageo'],
	    ['geojson', 'application/geo+json'],
	    ['gex', 'application/vnd.geometry-explorer'],
	    ['ggb', 'application/vnd.geogebra.file'],
	    ['ggt', 'application/vnd.geogebra.tool'],
	    ['ghf', 'application/vnd.groove-help'],
	    ['gif', 'image/gif'],
	    ['gim', 'application/vnd.groove-identity-message'],
	    ['gl', ['video/gl', 'video/x-gl']],
	    ['gmx', 'application/vnd.gmx'],
	    ['gnumeric', 'application/x-gnumeric'],
	    ['gph', 'application/vnd.flographit'],
	    ['gqf', 'application/vnd.grafeq'],
	    ['gram', 'application/srgs'],
	    ['grv', 'application/vnd.groove-injector'],
	    ['grxml', 'application/srgs+xml'],
	    ['gsd', 'audio/x-gsm'],
	    ['gsf', 'application/x-font-ghostscript'],
	    ['gsm', 'audio/x-gsm'],
	    ['gsp', 'application/x-gsp'],
	    ['gss', 'application/x-gss'],
	    ['gtar', 'application/x-gtar'],
	    ['gtm', 'application/vnd.groove-tool-message'],
	    ['gtw', 'model/vnd.gtw'],
	    ['gv', 'text/vnd.graphviz'],
	    ['gxt', 'application/vnd.geonext'],
	    ['gz', ['application/x-gzip', 'application/x-compressed']],
	    ['gzip', ['multipart/x-gzip', 'application/x-gzip']],
	    ['h', ['text/plain', 'text/x-h']],
	    ['h261', 'video/h261'],
	    ['h263', 'video/h263'],
	    ['h264', 'video/h264'],
	    ['hal', 'application/vnd.hal+xml'],
	    ['hbci', 'application/vnd.hbci'],
	    ['hdf', 'application/x-hdf'],
	    ['help', 'application/x-helpfile'],
	    ['hgl', 'application/vnd.hp-hpgl'],
	    ['hh', ['text/plain', 'text/x-h']],
	    ['hlb', 'text/x-script'],
	    ['hlp', ['application/winhlp', 'application/hlp', 'application/x-helpfile', 'application/x-winhelp']],
	    ['hpg', 'application/vnd.hp-hpgl'],
	    ['hpgl', 'application/vnd.hp-hpgl'],
	    ['hpid', 'application/vnd.hp-hpid'],
	    ['hps', 'application/vnd.hp-hps'],
	    [
	        'hqx',
	        [
	            'application/mac-binhex40',
	            'application/binhex',
	            'application/binhex4',
	            'application/mac-binhex',
	            'application/x-binhex40',
	            'application/x-mac-binhex40'
	        ]
	    ],
	    ['hta', 'application/hta'],
	    ['htc', 'text/x-component'],
	    ['htke', 'application/vnd.kenameaapp'],
	    ['htm', 'text/html'],
	    ['html', 'text/html'],
	    ['htmls', 'text/html'],
	    ['htt', 'text/webviewhtml'],
	    ['htx', 'text/html'],
	    ['hvd', 'application/vnd.yamaha.hv-dic'],
	    ['hvp', 'application/vnd.yamaha.hv-voice'],
	    ['hvs', 'application/vnd.yamaha.hv-script'],
	    ['i2g', 'application/vnd.intergeo'],
	    ['icc', 'application/vnd.iccprofile'],
	    ['ice', 'x-conference/x-cooltalk'],
	    ['ico', 'image/x-icon'],
	    ['ics', 'text/calendar'],
	    ['idc', 'text/plain'],
	    ['ief', 'image/ief'],
	    ['iefs', 'image/ief'],
	    ['ifm', 'application/vnd.shana.informed.formdata'],
	    ['iges', ['application/iges', 'model/iges']],
	    ['igl', 'application/vnd.igloader'],
	    ['igm', 'application/vnd.insors.igm'],
	    ['igs', ['application/iges', 'model/iges']],
	    ['igx', 'application/vnd.micrografx.igx'],
	    ['iif', 'application/vnd.shana.informed.interchange'],
	    ['iii', 'application/x-iphone'],
	    ['ima', 'application/x-ima'],
	    ['imap', 'application/x-httpd-imap'],
	    ['imp', 'application/vnd.accpac.simply.imp'],
	    ['ims', 'application/vnd.ms-ims'],
	    ['inf', 'application/inf'],
	    ['ins', ['application/x-internet-signup', 'application/x-internett-signup']],
	    ['ip', 'application/x-ip2'],
	    ['ipfix', 'application/ipfix'],
	    ['ipk', 'application/vnd.shana.informed.package'],
	    ['irm', 'application/vnd.ibm.rights-management'],
	    ['irp', 'application/vnd.irepository.package+xml'],
	    ['isp', 'application/x-internet-signup'],
	    ['isu', 'video/x-isvideo'],
	    ['it', 'audio/it'],
	    ['itp', 'application/vnd.shana.informed.formtemplate'],
	    ['iv', 'application/x-inventor'],
	    ['ivp', 'application/vnd.immervision-ivp'],
	    ['ivr', 'i-world/i-vrml'],
	    ['ivu', 'application/vnd.immervision-ivu'],
	    ['ivy', 'application/x-livescreen'],
	    ['jad', 'text/vnd.sun.j2me.app-descriptor'],
	    ['jam', ['application/vnd.jam', 'audio/x-jam']],
	    ['jar', 'application/java-archive'],
	    ['jav', ['text/plain', 'text/x-java-source']],
	    ['java', ['text/plain', 'text/x-java-source,java', 'text/x-java-source']],
	    ['jcm', 'application/x-java-commerce'],
	    ['jfif', ['image/pipeg', 'image/jpeg', 'image/pjpeg']],
	    ['jfif-tbnl', 'image/jpeg'],
	    ['jisp', 'application/vnd.jisp'],
	    ['jlt', 'application/vnd.hp-jlyt'],
	    ['jnlp', 'application/x-java-jnlp-file'],
	    ['joda', 'application/vnd.joost.joda-archive'],
	    ['jpe', ['image/jpeg', 'image/pjpeg']],
	    ['jpeg', ['image/jpeg', 'image/pjpeg']],
	    ['jpg', ['image/jpeg', 'image/pjpeg']],
	    ['jpgv', 'video/jpeg'],
	    ['jpm', 'video/jpm'],
	    ['jps', 'image/x-jps'],
	    ['js', ['application/javascript', 'application/ecmascript', 'text/javascript', 'text/ecmascript', 'application/x-javascript']],
	    ['json', 'application/json'],
	    ['jut', 'image/jutvision'],
	    ['kar', ['audio/midi', 'music/x-karaoke']],
	    ['karbon', 'application/vnd.kde.karbon'],
	    ['kfo', 'application/vnd.kde.kformula'],
	    ['kia', 'application/vnd.kidspiration'],
	    ['kml', 'application/vnd.google-earth.kml+xml'],
	    ['kmz', 'application/vnd.google-earth.kmz'],
	    ['kne', 'application/vnd.kinar'],
	    ['kon', 'application/vnd.kde.kontour'],
	    ['kpr', 'application/vnd.kde.kpresenter'],
	    ['ksh', ['application/x-ksh', 'text/x-script.ksh']],
	    ['ksp', 'application/vnd.kde.kspread'],
	    ['ktx', 'image/ktx'],
	    ['ktz', 'application/vnd.kahootz'],
	    ['kwd', 'application/vnd.kde.kword'],
	    ['la', ['audio/nspaudio', 'audio/x-nspaudio']],
	    ['lam', 'audio/x-liveaudio'],
	    ['lasxml', 'application/vnd.las.las+xml'],
	    ['latex', 'application/x-latex'],
	    ['lbd', 'application/vnd.llamagraphics.life-balance.desktop'],
	    ['lbe', 'application/vnd.llamagraphics.life-balance.exchange+xml'],
	    ['les', 'application/vnd.hhe.lesson-player'],
	    ['lha', ['application/octet-stream', 'application/lha', 'application/x-lha']],
	    ['lhx', 'application/octet-stream'],
	    ['link66', 'application/vnd.route66.link66+xml'],
	    ['list', 'text/plain'],
	    ['lma', ['audio/nspaudio', 'audio/x-nspaudio']],
	    ['log', 'text/plain'],
	    ['lrm', 'application/vnd.ms-lrm'],
	    ['lsf', 'video/x-la-asf'],
	    ['lsp', ['application/x-lisp', 'text/x-script.lisp']],
	    ['lst', 'text/plain'],
	    ['lsx', ['video/x-la-asf', 'text/x-la-asf']],
	    ['ltf', 'application/vnd.frogans.ltf'],
	    ['ltx', 'application/x-latex'],
	    ['lvp', 'audio/vnd.lucent.voice'],
	    ['lwp', 'application/vnd.lotus-wordpro'],
	    ['lzh', ['application/octet-stream', 'application/x-lzh']],
	    ['lzx', ['application/lzx', 'application/octet-stream', 'application/x-lzx']],
	    ['m', ['text/plain', 'text/x-m']],
	    ['m13', 'application/x-msmediaview'],
	    ['m14', 'application/x-msmediaview'],
	    ['m1v', 'video/mpeg'],
	    ['m21', 'application/mp21'],
	    ['m2a', 'audio/mpeg'],
	    ['m2v', 'video/mpeg'],
	    ['m3u', ['audio/x-mpegurl', 'audio/x-mpequrl']],
	    ['m3u8', 'application/vnd.apple.mpegurl'],
	    ['m4v', 'video/x-m4v'],
	    ['ma', 'application/mathematica'],
	    ['mads', 'application/mads+xml'],
	    ['mag', 'application/vnd.ecowin.chart'],
	    ['man', 'application/x-troff-man'],
	    ['map', 'application/x-navimap'],
	    ['mar', 'text/plain'],
	    ['mathml', 'application/mathml+xml'],
	    ['mbd', 'application/mbedlet'],
	    ['mbk', 'application/vnd.mobius.mbk'],
	    ['mbox', 'application/mbox'],
	    ['mc$', 'application/x-magic-cap-package-1.0'],
	    ['mc1', 'application/vnd.medcalcdata'],
	    ['mcd', ['application/mcad', 'application/vnd.mcd', 'application/x-mathcad']],
	    ['mcf', ['image/vasa', 'text/mcf']],
	    ['mcp', 'application/netmc'],
	    ['mcurl', 'text/vnd.curl.mcurl'],
	    ['mdb', 'application/x-msaccess'],
	    ['mdi', 'image/vnd.ms-modi'],
	    ['me', 'application/x-troff-me'],
	    ['meta4', 'application/metalink4+xml'],
	    ['mets', 'application/mets+xml'],
	    ['mfm', 'application/vnd.mfmp'],
	    ['mgp', 'application/vnd.osgeo.mapguide.package'],
	    ['mgz', 'application/vnd.proteus.magazine'],
	    ['mht', 'message/rfc822'],
	    ['mhtml', 'message/rfc822'],
	    ['mid', ['audio/mid', 'audio/midi', 'music/crescendo', 'x-music/x-midi', 'audio/x-midi', 'application/x-midi', 'audio/x-mid']],
	    ['midi', ['audio/midi', 'music/crescendo', 'x-music/x-midi', 'audio/x-midi', 'application/x-midi', 'audio/x-mid']],
	    ['mif', ['application/vnd.mif', 'application/x-mif', 'application/x-frame']],
	    ['mime', ['message/rfc822', 'www/mime']],
	    ['mj2', 'video/mj2'],
	    ['mjf', 'audio/x-vnd.audioexplosion.mjuicemediafile'],
	    ['mjpg', 'video/x-motion-jpeg'],
	    ['mlp', 'application/vnd.dolby.mlp'],
	    ['mm', ['application/base64', 'application/x-meme']],
	    ['mmd', 'application/vnd.chipnuts.karaoke-mmd'],
	    ['mme', 'application/base64'],
	    ['mmf', 'application/vnd.smaf'],
	    ['mmr', 'image/vnd.fujixerox.edmics-mmr'],
	    ['mny', 'application/x-msmoney'],
	    ['mod', ['audio/mod', 'audio/x-mod']],
	    ['mods', 'application/mods+xml'],
	    ['moov', 'video/quicktime'],
	    ['mov', 'video/quicktime'],
	    ['movie', 'video/x-sgi-movie'],
	    ['mp2', ['video/mpeg', 'audio/mpeg', 'video/x-mpeg', 'audio/x-mpeg', 'video/x-mpeq2a']],
	    ['mp3', ['audio/mpeg', 'audio/mpeg3', 'video/mpeg', 'audio/x-mpeg-3', 'video/x-mpeg']],
	    ['mp4', ['video/mp4', 'application/mp4']],
	    ['mp4a', 'audio/mp4'],
	    ['mpa', ['video/mpeg', 'audio/mpeg']],
	    ['mpc', ['application/vnd.mophun.certificate', 'application/x-project']],
	    ['mpe', 'video/mpeg'],
	    ['mpeg', 'video/mpeg'],
	    ['mpg', ['video/mpeg', 'audio/mpeg']],
	    ['mpga', 'audio/mpeg'],
	    ['mpkg', 'application/vnd.apple.installer+xml'],
	    ['mpm', 'application/vnd.blueice.multipass'],
	    ['mpn', 'application/vnd.mophun.application'],
	    ['mpp', 'application/vnd.ms-project'],
	    ['mpt', 'application/x-project'],
	    ['mpv', 'application/x-project'],
	    ['mpv2', 'video/mpeg'],
	    ['mpx', 'application/x-project'],
	    ['mpy', 'application/vnd.ibm.minipay'],
	    ['mqy', 'application/vnd.mobius.mqy'],
	    ['mrc', 'application/marc'],
	    ['mrcx', 'application/marcxml+xml'],
	    ['ms', 'application/x-troff-ms'],
	    ['mscml', 'application/mediaservercontrol+xml'],
	    ['mseq', 'application/vnd.mseq'],
	    ['msf', 'application/vnd.epson.msf'],
	    ['msg', 'application/vnd.ms-outlook'],
	    ['msh', 'model/mesh'],
	    ['msl', 'application/vnd.mobius.msl'],
	    ['msty', 'application/vnd.muvee.style'],
	    ['mts', 'model/vnd.mts'],
	    ['mus', 'application/vnd.musician'],
	    ['musicxml', 'application/vnd.recordare.musicxml+xml'],
	    ['mv', 'video/x-sgi-movie'],
	    ['mvb', 'application/x-msmediaview'],
	    ['mwf', 'application/vnd.mfer'],
	    ['mxf', 'application/mxf'],
	    ['mxl', 'application/vnd.recordare.musicxml'],
	    ['mxml', 'application/xv+xml'],
	    ['mxs', 'application/vnd.triscape.mxs'],
	    ['mxu', 'video/vnd.mpegurl'],
	    ['my', 'audio/make'],
	    ['mzz', 'application/x-vnd.audioexplosion.mzz'],
	    ['n-gage', 'application/vnd.nokia.n-gage.symbian.install'],
	    ['n3', 'text/n3'],
	    ['nap', 'image/naplps'],
	    ['naplps', 'image/naplps'],
	    ['nbp', 'application/vnd.wolfram.player'],
	    ['nc', 'application/x-netcdf'],
	    ['ncm', 'application/vnd.nokia.configuration-message'],
	    ['ncx', 'application/x-dtbncx+xml'],
	    ['ngdat', 'application/vnd.nokia.n-gage.data'],
	    ['nif', 'image/x-niff'],
	    ['niff', 'image/x-niff'],
	    ['nix', 'application/x-mix-transfer'],
	    ['nlu', 'application/vnd.neurolanguage.nlu'],
	    ['nml', 'application/vnd.enliven'],
	    ['nnd', 'application/vnd.noblenet-directory'],
	    ['nns', 'application/vnd.noblenet-sealer'],
	    ['nnw', 'application/vnd.noblenet-web'],
	    ['npx', 'image/vnd.net-fpx'],
	    ['nsc', 'application/x-conference'],
	    ['nsf', 'application/vnd.lotus-notes'],
	    ['nvd', 'application/x-navidoc'],
	    ['nws', 'message/rfc822'],
	    ['o', 'application/octet-stream'],
	    ['oa2', 'application/vnd.fujitsu.oasys2'],
	    ['oa3', 'application/vnd.fujitsu.oasys3'],
	    ['oas', 'application/vnd.fujitsu.oasys'],
	    ['obd', 'application/x-msbinder'],
	    ['oda', 'application/oda'],
	    ['odb', 'application/vnd.oasis.opendocument.database'],
	    ['odc', 'application/vnd.oasis.opendocument.chart'],
	    ['odf', 'application/vnd.oasis.opendocument.formula'],
	    ['odft', 'application/vnd.oasis.opendocument.formula-template'],
	    ['odg', 'application/vnd.oasis.opendocument.graphics'],
	    ['odi', 'application/vnd.oasis.opendocument.image'],
	    ['odm', 'application/vnd.oasis.opendocument.text-master'],
	    ['odp', 'application/vnd.oasis.opendocument.presentation'],
	    ['ods', 'application/vnd.oasis.opendocument.spreadsheet'],
	    ['odt', 'application/vnd.oasis.opendocument.text'],
	    ['oga', 'audio/ogg'],
	    ['ogv', 'video/ogg'],
	    ['ogx', 'application/ogg'],
	    ['omc', 'application/x-omc'],
	    ['omcd', 'application/x-omcdatamaker'],
	    ['omcr', 'application/x-omcregerator'],
	    ['onetoc', 'application/onenote'],
	    ['opf', 'application/oebps-package+xml'],
	    ['org', 'application/vnd.lotus-organizer'],
	    ['osf', 'application/vnd.yamaha.openscoreformat'],
	    ['osfpvg', 'application/vnd.yamaha.openscoreformat.osfpvg+xml'],
	    ['otc', 'application/vnd.oasis.opendocument.chart-template'],
	    ['otf', 'application/x-font-otf'],
	    ['otg', 'application/vnd.oasis.opendocument.graphics-template'],
	    ['oth', 'application/vnd.oasis.opendocument.text-web'],
	    ['oti', 'application/vnd.oasis.opendocument.image-template'],
	    ['otp', 'application/vnd.oasis.opendocument.presentation-template'],
	    ['ots', 'application/vnd.oasis.opendocument.spreadsheet-template'],
	    ['ott', 'application/vnd.oasis.opendocument.text-template'],
	    ['oxt', 'application/vnd.openofficeorg.extension'],
	    ['p', 'text/x-pascal'],
	    ['p10', ['application/pkcs10', 'application/x-pkcs10']],
	    ['p12', ['application/pkcs-12', 'application/x-pkcs12']],
	    ['p7a', 'application/x-pkcs7-signature'],
	    ['p7b', 'application/x-pkcs7-certificates'],
	    ['p7c', ['application/pkcs7-mime', 'application/x-pkcs7-mime']],
	    ['p7m', ['application/pkcs7-mime', 'application/x-pkcs7-mime']],
	    ['p7r', 'application/x-pkcs7-certreqresp'],
	    ['p7s', ['application/pkcs7-signature', 'application/x-pkcs7-signature']],
	    ['p8', 'application/pkcs8'],
	    ['par', 'text/plain-bas'],
	    ['part', 'application/pro_eng'],
	    ['pas', 'text/pascal'],
	    ['paw', 'application/vnd.pawaafile'],
	    ['pbd', 'application/vnd.powerbuilder6'],
	    ['pbm', 'image/x-portable-bitmap'],
	    ['pcf', 'application/x-font-pcf'],
	    ['pcl', ['application/vnd.hp-pcl', 'application/x-pcl']],
	    ['pclxl', 'application/vnd.hp-pclxl'],
	    ['pct', 'image/x-pict'],
	    ['pcurl', 'application/vnd.curl.pcurl'],
	    ['pcx', 'image/x-pcx'],
	    ['pdb', ['application/vnd.palm', 'chemical/x-pdb']],
	    ['pdf', 'application/pdf'],
	    ['pfa', 'application/x-font-type1'],
	    ['pfr', 'application/font-tdpfr'],
	    ['pfunk', ['audio/make', 'audio/make.my.funk']],
	    ['pfx', 'application/x-pkcs12'],
	    ['pgm', ['image/x-portable-graymap', 'image/x-portable-greymap']],
	    ['pgn', 'application/x-chess-pgn'],
	    ['pgp', 'application/pgp-signature'],
	    ['pic', ['image/pict', 'image/x-pict']],
	    ['pict', 'image/pict'],
	    ['pkg', 'application/x-newton-compatible-pkg'],
	    ['pki', 'application/pkixcmp'],
	    ['pkipath', 'application/pkix-pkipath'],
	    ['pko', ['application/ynd.ms-pkipko', 'application/vnd.ms-pki.pko']],
	    ['pl', ['text/plain', 'text/x-script.perl']],
	    ['plb', 'application/vnd.3gpp.pic-bw-large'],
	    ['plc', 'application/vnd.mobius.plc'],
	    ['plf', 'application/vnd.pocketlearn'],
	    ['pls', 'application/pls+xml'],
	    ['plx', 'application/x-pixclscript'],
	    ['pm', ['text/x-script.perl-module', 'image/x-xpixmap']],
	    ['pm4', 'application/x-pagemaker'],
	    ['pm5', 'application/x-pagemaker'],
	    ['pma', 'application/x-perfmon'],
	    ['pmc', 'application/x-perfmon'],
	    ['pml', ['application/vnd.ctc-posml', 'application/x-perfmon']],
	    ['pmr', 'application/x-perfmon'],
	    ['pmw', 'application/x-perfmon'],
	    ['png', 'image/png'],
	    ['pnm', ['application/x-portable-anymap', 'image/x-portable-anymap']],
	    ['portpkg', 'application/vnd.macports.portpkg'],
	    ['pot', ['application/vnd.ms-powerpoint', 'application/mspowerpoint']],
	    ['potm', 'application/vnd.ms-powerpoint.template.macroenabled.12'],
	    ['potx', 'application/vnd.openxmlformats-officedocument.presentationml.template'],
	    ['pov', 'model/x-pov'],
	    ['ppa', 'application/vnd.ms-powerpoint'],
	    ['ppam', 'application/vnd.ms-powerpoint.addin.macroenabled.12'],
	    ['ppd', 'application/vnd.cups-ppd'],
	    ['ppm', 'image/x-portable-pixmap'],
	    ['pps', ['application/vnd.ms-powerpoint', 'application/mspowerpoint']],
	    ['ppsm', 'application/vnd.ms-powerpoint.slideshow.macroenabled.12'],
	    ['ppsx', 'application/vnd.openxmlformats-officedocument.presentationml.slideshow'],
	    ['ppt', ['application/vnd.ms-powerpoint', 'application/mspowerpoint', 'application/powerpoint', 'application/x-mspowerpoint']],
	    ['pptm', 'application/vnd.ms-powerpoint.presentation.macroenabled.12'],
	    ['pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
	    ['ppz', 'application/mspowerpoint'],
	    ['prc', 'application/x-mobipocket-ebook'],
	    ['pre', ['application/vnd.lotus-freelance', 'application/x-freelance']],
	    ['prf', 'application/pics-rules'],
	    ['prt', 'application/pro_eng'],
	    ['ps', 'application/postscript'],
	    ['psb', 'application/vnd.3gpp.pic-bw-small'],
	    ['psd', ['application/octet-stream', 'image/vnd.adobe.photoshop']],
	    ['psf', 'application/x-font-linux-psf'],
	    ['pskcxml', 'application/pskc+xml'],
	    ['ptid', 'application/vnd.pvi.ptid1'],
	    ['pub', 'application/x-mspublisher'],
	    ['pvb', 'application/vnd.3gpp.pic-bw-var'],
	    ['pvu', 'paleovu/x-pv'],
	    ['pwn', 'application/vnd.3m.post-it-notes'],
	    ['pwz', 'application/vnd.ms-powerpoint'],
	    ['py', 'text/x-script.phyton'],
	    ['pya', 'audio/vnd.ms-playready.media.pya'],
	    ['pyc', 'application/x-bytecode.python'],
	    ['pyv', 'video/vnd.ms-playready.media.pyv'],
	    ['qam', 'application/vnd.epson.quickanime'],
	    ['qbo', 'application/vnd.intu.qbo'],
	    ['qcp', 'audio/vnd.qcelp'],
	    ['qd3', 'x-world/x-3dmf'],
	    ['qd3d', 'x-world/x-3dmf'],
	    ['qfx', 'application/vnd.intu.qfx'],
	    ['qif', 'image/x-quicktime'],
	    ['qps', 'application/vnd.publishare-delta-tree'],
	    ['qt', 'video/quicktime'],
	    ['qtc', 'video/x-qtc'],
	    ['qti', 'image/x-quicktime'],
	    ['qtif', 'image/x-quicktime'],
	    ['qxd', 'application/vnd.quark.quarkxpress'],
	    ['ra', ['audio/x-realaudio', 'audio/x-pn-realaudio', 'audio/x-pn-realaudio-plugin']],
	    ['ram', 'audio/x-pn-realaudio'],
	    ['rar', 'application/x-rar-compressed'],
	    ['ras', ['image/cmu-raster', 'application/x-cmu-raster', 'image/x-cmu-raster']],
	    ['rast', 'image/cmu-raster'],
	    ['rcprofile', 'application/vnd.ipunplugged.rcprofile'],
	    ['rdf', 'application/rdf+xml'],
	    ['rdz', 'application/vnd.data-vision.rdz'],
	    ['rep', 'application/vnd.businessobjects'],
	    ['res', 'application/x-dtbresource+xml'],
	    ['rexx', 'text/x-script.rexx'],
	    ['rf', 'image/vnd.rn-realflash'],
	    ['rgb', 'image/x-rgb'],
	    ['rif', 'application/reginfo+xml'],
	    ['rip', 'audio/vnd.rip'],
	    ['rl', 'application/resource-lists+xml'],
	    ['rlc', 'image/vnd.fujixerox.edmics-rlc'],
	    ['rld', 'application/resource-lists-diff+xml'],
	    ['rm', ['application/vnd.rn-realmedia', 'audio/x-pn-realaudio']],
	    ['rmi', 'audio/mid'],
	    ['rmm', 'audio/x-pn-realaudio'],
	    ['rmp', ['audio/x-pn-realaudio-plugin', 'audio/x-pn-realaudio']],
	    ['rms', 'application/vnd.jcp.javame.midlet-rms'],
	    ['rnc', 'application/relax-ng-compact-syntax'],
	    ['rng', ['application/ringing-tones', 'application/vnd.nokia.ringing-tone']],
	    ['rnx', 'application/vnd.rn-realplayer'],
	    ['roff', 'application/x-troff'],
	    ['rp', 'image/vnd.rn-realpix'],
	    ['rp9', 'application/vnd.cloanto.rp9'],
	    ['rpm', 'audio/x-pn-realaudio-plugin'],
	    ['rpss', 'application/vnd.nokia.radio-presets'],
	    ['rpst', 'application/vnd.nokia.radio-preset'],
	    ['rq', 'application/sparql-query'],
	    ['rs', 'application/rls-services+xml'],
	    ['rsd', 'application/rsd+xml'],
	    ['rt', ['text/richtext', 'text/vnd.rn-realtext']],
	    ['rtf', ['application/rtf', 'text/richtext', 'application/x-rtf']],
	    ['rtx', ['text/richtext', 'application/rtf']],
	    ['rv', 'video/vnd.rn-realvideo'],
	    ['s', 'text/x-asm'],
	    ['s3m', 'audio/s3m'],
	    ['saf', 'application/vnd.yamaha.smaf-audio'],
	    ['saveme', 'application/octet-stream'],
	    ['sbk', 'application/x-tbook'],
	    ['sbml', 'application/sbml+xml'],
	    ['sc', 'application/vnd.ibm.secure-container'],
	    ['scd', 'application/x-msschedule'],
	    [
	        'scm',
	        ['application/vnd.lotus-screencam', 'video/x-scm', 'text/x-script.guile', 'application/x-lotusscreencam', 'text/x-script.scheme']
	    ],
	    ['scq', 'application/scvp-cv-request'],
	    ['scs', 'application/scvp-cv-response'],
	    ['sct', 'text/scriptlet'],
	    ['scurl', 'text/vnd.curl.scurl'],
	    ['sda', 'application/vnd.stardivision.draw'],
	    ['sdc', 'application/vnd.stardivision.calc'],
	    ['sdd', 'application/vnd.stardivision.impress'],
	    ['sdkm', 'application/vnd.solent.sdkm+xml'],
	    ['sdml', 'text/plain'],
	    ['sdp', ['application/sdp', 'application/x-sdp']],
	    ['sdr', 'application/sounder'],
	    ['sdw', 'application/vnd.stardivision.writer'],
	    ['sea', ['application/sea', 'application/x-sea']],
	    ['see', 'application/vnd.seemail'],
	    ['seed', 'application/vnd.fdsn.seed'],
	    ['sema', 'application/vnd.sema'],
	    ['semd', 'application/vnd.semd'],
	    ['semf', 'application/vnd.semf'],
	    ['ser', 'application/java-serialized-object'],
	    ['set', 'application/set'],
	    ['setpay', 'application/set-payment-initiation'],
	    ['setreg', 'application/set-registration-initiation'],
	    ['sfd-hdstx', 'application/vnd.hydrostatix.sof-data'],
	    ['sfs', 'application/vnd.spotfire.sfs'],
	    ['sgl', 'application/vnd.stardivision.writer-global'],
	    ['sgm', ['text/sgml', 'text/x-sgml']],
	    ['sgml', ['text/sgml', 'text/x-sgml']],
	    ['sh', ['application/x-shar', 'application/x-bsh', 'application/x-sh', 'text/x-script.sh']],
	    ['shar', ['application/x-bsh', 'application/x-shar']],
	    ['shf', 'application/shf+xml'],
	    ['shtml', ['text/html', 'text/x-server-parsed-html']],
	    ['sid', 'audio/x-psid'],
	    ['sis', 'application/vnd.symbian.install'],
	    ['sit', ['application/x-stuffit', 'application/x-sit']],
	    ['sitx', 'application/x-stuffitx'],
	    ['skd', 'application/x-koan'],
	    ['skm', 'application/x-koan'],
	    ['skp', ['application/vnd.koan', 'application/x-koan']],
	    ['skt', 'application/x-koan'],
	    ['sl', 'application/x-seelogo'],
	    ['sldm', 'application/vnd.ms-powerpoint.slide.macroenabled.12'],
	    ['sldx', 'application/vnd.openxmlformats-officedocument.presentationml.slide'],
	    ['slt', 'application/vnd.epson.salt'],
	    ['sm', 'application/vnd.stepmania.stepchart'],
	    ['smf', 'application/vnd.stardivision.math'],
	    ['smi', ['application/smil', 'application/smil+xml']],
	    ['smil', 'application/smil'],
	    ['snd', ['audio/basic', 'audio/x-adpcm']],
	    ['snf', 'application/x-font-snf'],
	    ['sol', 'application/solids'],
	    ['spc', ['text/x-speech', 'application/x-pkcs7-certificates']],
	    ['spf', 'application/vnd.yamaha.smaf-phrase'],
	    ['spl', ['application/futuresplash', 'application/x-futuresplash']],
	    ['spot', 'text/vnd.in3d.spot'],
	    ['spp', 'application/scvp-vp-response'],
	    ['spq', 'application/scvp-vp-request'],
	    ['spr', 'application/x-sprite'],
	    ['sprite', 'application/x-sprite'],
	    ['src', 'application/x-wais-source'],
	    ['sru', 'application/sru+xml'],
	    ['srx', 'application/sparql-results+xml'],
	    ['sse', 'application/vnd.kodak-descriptor'],
	    ['ssf', 'application/vnd.epson.ssf'],
	    ['ssi', 'text/x-server-parsed-html'],
	    ['ssm', 'application/streamingmedia'],
	    ['ssml', 'application/ssml+xml'],
	    ['sst', ['application/vnd.ms-pkicertstore', 'application/vnd.ms-pki.certstore']],
	    ['st', 'application/vnd.sailingtracker.track'],
	    ['stc', 'application/vnd.sun.xml.calc.template'],
	    ['std', 'application/vnd.sun.xml.draw.template'],
	    ['step', 'application/step'],
	    ['stf', 'application/vnd.wt.stf'],
	    ['sti', 'application/vnd.sun.xml.impress.template'],
	    ['stk', 'application/hyperstudio'],
	    ['stl', ['application/vnd.ms-pkistl', 'application/sla', 'application/vnd.ms-pki.stl', 'application/x-navistyle']],
	    ['stm', 'text/html'],
	    ['stp', 'application/step'],
	    ['str', 'application/vnd.pg.format'],
	    ['stw', 'application/vnd.sun.xml.writer.template'],
	    ['sub', 'image/vnd.dvb.subtitle'],
	    ['sus', 'application/vnd.sus-calendar'],
	    ['sv4cpio', 'application/x-sv4cpio'],
	    ['sv4crc', 'application/x-sv4crc'],
	    ['svc', 'application/vnd.dvb.service'],
	    ['svd', 'application/vnd.svd'],
	    ['svf', ['image/vnd.dwg', 'image/x-dwg']],
	    ['svg', 'image/svg+xml'],
	    ['svr', ['x-world/x-svr', 'application/x-world']],
	    ['swf', 'application/x-shockwave-flash'],
	    ['swi', 'application/vnd.aristanetworks.swi'],
	    ['sxc', 'application/vnd.sun.xml.calc'],
	    ['sxd', 'application/vnd.sun.xml.draw'],
	    ['sxg', 'application/vnd.sun.xml.writer.global'],
	    ['sxi', 'application/vnd.sun.xml.impress'],
	    ['sxm', 'application/vnd.sun.xml.math'],
	    ['sxw', 'application/vnd.sun.xml.writer'],
	    ['t', ['text/troff', 'application/x-troff']],
	    ['talk', 'text/x-speech'],
	    ['tao', 'application/vnd.tao.intent-module-archive'],
	    ['tar', 'application/x-tar'],
	    ['tbk', ['application/toolbook', 'application/x-tbook']],
	    ['tcap', 'application/vnd.3gpp2.tcap'],
	    ['tcl', ['text/x-script.tcl', 'application/x-tcl']],
	    ['tcsh', 'text/x-script.tcsh'],
	    ['teacher', 'application/vnd.smart.teacher'],
	    ['tei', 'application/tei+xml'],
	    ['tex', 'application/x-tex'],
	    ['texi', 'application/x-texinfo'],
	    ['texinfo', 'application/x-texinfo'],
	    ['text', ['application/plain', 'text/plain']],
	    ['tfi', 'application/thraud+xml'],
	    ['tfm', 'application/x-tex-tfm'],
	    ['tgz', ['application/gnutar', 'application/x-compressed']],
	    ['thmx', 'application/vnd.ms-officetheme'],
	    ['tif', ['image/tiff', 'image/x-tiff']],
	    ['tiff', ['image/tiff', 'image/x-tiff']],
	    ['tmo', 'application/vnd.tmobile-livetv'],
	    ['torrent', 'application/x-bittorrent'],
	    ['tpl', 'application/vnd.groove-tool-template'],
	    ['tpt', 'application/vnd.trid.tpt'],
	    ['tr', 'application/x-troff'],
	    ['tra', 'application/vnd.trueapp'],
	    ['trm', 'application/x-msterminal'],
	    ['tsd', 'application/timestamped-data'],
	    ['tsi', 'audio/tsp-audio'],
	    ['tsp', ['application/dsptype', 'audio/tsplayer']],
	    ['tsv', 'text/tab-separated-values'],
	    ['ttf', 'application/x-font-ttf'],
	    ['ttl', 'text/turtle'],
	    ['turbot', 'image/florian'],
	    ['twd', 'application/vnd.simtech-mindmapper'],
	    ['txd', 'application/vnd.genomatix.tuxedo'],
	    ['txf', 'application/vnd.mobius.txf'],
	    ['txt', 'text/plain'],
	    ['ufd', 'application/vnd.ufdl'],
	    ['uil', 'text/x-uil'],
	    ['uls', 'text/iuls'],
	    ['umj', 'application/vnd.umajin'],
	    ['uni', 'text/uri-list'],
	    ['unis', 'text/uri-list'],
	    ['unityweb', 'application/vnd.unity'],
	    ['unv', 'application/i-deas'],
	    ['uoml', 'application/vnd.uoml+xml'],
	    ['uri', 'text/uri-list'],
	    ['uris', 'text/uri-list'],
	    ['ustar', ['application/x-ustar', 'multipart/x-ustar']],
	    ['utz', 'application/vnd.uiq.theme'],
	    ['uu', ['application/octet-stream', 'text/x-uuencode']],
	    ['uue', 'text/x-uuencode'],
	    ['uva', 'audio/vnd.dece.audio'],
	    ['uvh', 'video/vnd.dece.hd'],
	    ['uvi', 'image/vnd.dece.graphic'],
	    ['uvm', 'video/vnd.dece.mobile'],
	    ['uvp', 'video/vnd.dece.pd'],
	    ['uvs', 'video/vnd.dece.sd'],
	    ['uvu', 'video/vnd.uvvu.mp4'],
	    ['uvv', 'video/vnd.dece.video'],
	    ['vcd', 'application/x-cdlink'],
	    ['vcf', 'text/x-vcard'],
	    ['vcg', 'application/vnd.groove-vcard'],
	    ['vcs', 'text/x-vcalendar'],
	    ['vcx', 'application/vnd.vcx'],
	    ['vda', 'application/vda'],
	    ['vdo', 'video/vdo'],
	    ['vew', 'application/groupwise'],
	    ['vis', 'application/vnd.visionary'],
	    ['viv', ['video/vivo', 'video/vnd.vivo']],
	    ['vivo', ['video/vivo', 'video/vnd.vivo']],
	    ['vmd', 'application/vocaltec-media-desc'],
	    ['vmf', 'application/vocaltec-media-file'],
	    ['voc', ['audio/voc', 'audio/x-voc']],
	    ['vos', 'video/vosaic'],
	    ['vox', 'audio/voxware'],
	    ['vqe', 'audio/x-twinvq-plugin'],
	    ['vqf', 'audio/x-twinvq'],
	    ['vql', 'audio/x-twinvq-plugin'],
	    ['vrml', ['model/vrml', 'x-world/x-vrml', 'application/x-vrml']],
	    ['vrt', 'x-world/x-vrt'],
	    ['vsd', ['application/vnd.visio', 'application/x-visio']],
	    ['vsf', 'application/vnd.vsf'],
	    ['vst', 'application/x-visio'],
	    ['vsw', 'application/x-visio'],
	    ['vtu', 'model/vnd.vtu'],
	    ['vxml', 'application/voicexml+xml'],
	    ['w60', 'application/wordperfect6.0'],
	    ['w61', 'application/wordperfect6.1'],
	    ['w6w', 'application/msword'],
	    ['wad', 'application/x-doom'],
	    ['wav', ['audio/wav', 'audio/x-wav']],
	    ['wax', 'audio/x-ms-wax'],
	    ['wb1', 'application/x-qpro'],
	    ['wbmp', 'image/vnd.wap.wbmp'],
	    ['wbs', 'application/vnd.criticaltools.wbs+xml'],
	    ['wbxml', 'application/vnd.wap.wbxml'],
	    ['wcm', 'application/vnd.ms-works'],
	    ['wdb', 'application/vnd.ms-works'],
	    ['web', 'application/vnd.xara'],
	    ['weba', 'audio/webm'],
	    ['webm', 'video/webm'],
	    ['webp', 'image/webp'],
	    ['wg', 'application/vnd.pmi.widget'],
	    ['wgt', 'application/widget'],
	    ['wiz', 'application/msword'],
	    ['wk1', 'application/x-123'],
	    ['wks', 'application/vnd.ms-works'],
	    ['wm', 'video/x-ms-wm'],
	    ['wma', 'audio/x-ms-wma'],
	    ['wmd', 'application/x-ms-wmd'],
	    ['wmf', ['windows/metafile', 'application/x-msmetafile']],
	    ['wml', 'text/vnd.wap.wml'],
	    ['wmlc', 'application/vnd.wap.wmlc'],
	    ['wmls', 'text/vnd.wap.wmlscript'],
	    ['wmlsc', 'application/vnd.wap.wmlscriptc'],
	    ['wmv', 'video/x-ms-wmv'],
	    ['wmx', 'video/x-ms-wmx'],
	    ['wmz', 'application/x-ms-wmz'],
	    ['woff', 'application/x-font-woff'],
	    ['word', 'application/msword'],
	    ['wp', 'application/wordperfect'],
	    ['wp5', ['application/wordperfect', 'application/wordperfect6.0']],
	    ['wp6', 'application/wordperfect'],
	    ['wpd', ['application/wordperfect', 'application/vnd.wordperfect', 'application/x-wpwin']],
	    ['wpl', 'application/vnd.ms-wpl'],
	    ['wps', 'application/vnd.ms-works'],
	    ['wq1', 'application/x-lotus'],
	    ['wqd', 'application/vnd.wqd'],
	    ['wri', ['application/mswrite', 'application/x-wri', 'application/x-mswrite']],
	    ['wrl', ['model/vrml', 'x-world/x-vrml', 'application/x-world']],
	    ['wrz', ['model/vrml', 'x-world/x-vrml']],
	    ['wsc', 'text/scriplet'],
	    ['wsdl', 'application/wsdl+xml'],
	    ['wspolicy', 'application/wspolicy+xml'],
	    ['wsrc', 'application/x-wais-source'],
	    ['wtb', 'application/vnd.webturbo'],
	    ['wtk', 'application/x-wintalk'],
	    ['wvx', 'video/x-ms-wvx'],
	    ['x-png', 'image/png'],
	    ['x3d', 'application/vnd.hzn-3d-crossword'],
	    ['xaf', 'x-world/x-vrml'],
	    ['xap', 'application/x-silverlight-app'],
	    ['xar', 'application/vnd.xara'],
	    ['xbap', 'application/x-ms-xbap'],
	    ['xbd', 'application/vnd.fujixerox.docuworks.binder'],
	    ['xbm', ['image/xbm', 'image/x-xbm', 'image/x-xbitmap']],
	    ['xdf', 'application/xcap-diff+xml'],
	    ['xdm', 'application/vnd.syncml.dm+xml'],
	    ['xdp', 'application/vnd.adobe.xdp+xml'],
	    ['xdr', 'video/x-amt-demorun'],
	    ['xdssc', 'application/dssc+xml'],
	    ['xdw', 'application/vnd.fujixerox.docuworks'],
	    ['xenc', 'application/xenc+xml'],
	    ['xer', 'application/patch-ops-error+xml'],
	    ['xfdf', 'application/vnd.adobe.xfdf'],
	    ['xfdl', 'application/vnd.xfdl'],
	    ['xgz', 'xgl/drawing'],
	    ['xhtml', 'application/xhtml+xml'],
	    ['xif', 'image/vnd.xiff'],
	    ['xl', 'application/excel'],
	    ['xla', ['application/vnd.ms-excel', 'application/excel', 'application/x-msexcel', 'application/x-excel']],
	    ['xlam', 'application/vnd.ms-excel.addin.macroenabled.12'],
	    ['xlb', ['application/excel', 'application/vnd.ms-excel', 'application/x-excel']],
	    ['xlc', ['application/vnd.ms-excel', 'application/excel', 'application/x-excel']],
	    ['xld', ['application/excel', 'application/x-excel']],
	    ['xlk', ['application/excel', 'application/x-excel']],
	    ['xll', ['application/excel', 'application/vnd.ms-excel', 'application/x-excel']],
	    ['xlm', ['application/vnd.ms-excel', 'application/excel', 'application/x-excel']],
	    ['xls', ['application/vnd.ms-excel', 'application/excel', 'application/x-msexcel', 'application/x-excel']],
	    ['xlsb', 'application/vnd.ms-excel.sheet.binary.macroenabled.12'],
	    ['xlsm', 'application/vnd.ms-excel.sheet.macroenabled.12'],
	    ['xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
	    ['xlt', ['application/vnd.ms-excel', 'application/excel', 'application/x-excel']],
	    ['xltm', 'application/vnd.ms-excel.template.macroenabled.12'],
	    ['xltx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.template'],
	    ['xlv', ['application/excel', 'application/x-excel']],
	    ['xlw', ['application/vnd.ms-excel', 'application/excel', 'application/x-msexcel', 'application/x-excel']],
	    ['xm', 'audio/xm'],
	    ['xml', ['application/xml', 'text/xml', 'application/atom+xml', 'application/rss+xml']],
	    ['xmz', 'xgl/movie'],
	    ['xo', 'application/vnd.olpc-sugar'],
	    ['xof', 'x-world/x-vrml'],
	    ['xop', 'application/xop+xml'],
	    ['xpi', 'application/x-xpinstall'],
	    ['xpix', 'application/x-vnd.ls-xpix'],
	    ['xpm', ['image/xpm', 'image/x-xpixmap']],
	    ['xpr', 'application/vnd.is-xpr'],
	    ['xps', 'application/vnd.ms-xpsdocument'],
	    ['xpw', 'application/vnd.intercon.formnet'],
	    ['xslt', 'application/xslt+xml'],
	    ['xsm', 'application/vnd.syncml+xml'],
	    ['xspf', 'application/xspf+xml'],
	    ['xsr', 'video/x-amt-showrun'],
	    ['xul', 'application/vnd.mozilla.xul+xml'],
	    ['xwd', ['image/x-xwd', 'image/x-xwindowdump']],
	    ['xyz', ['chemical/x-xyz', 'chemical/x-pdb']],
	    ['yang', 'application/yang'],
	    ['yin', 'application/yin+xml'],
	    ['z', ['application/x-compressed', 'application/x-compress']],
	    ['zaz', 'application/vnd.zzazz.deck+xml'],
	    ['zip', ['application/zip', 'multipart/x-zip', 'application/x-zip-compressed', 'application/x-compressed']],
	    ['zir', 'application/vnd.zul'],
	    ['zmm', 'application/vnd.handheld-entertainment+xml'],
	    ['zoo', 'application/octet-stream'],
	    ['zsh', 'text/x-script.zsh']
	]);

	mimeTypes_1 = {
	    detectMimeType(filename) {
	        if (!filename) {
	            return defaultMimeType;
	        }

	        let parsed = path$1.parse(filename);
	        let extension = (parsed.ext.substr(1) || parsed.name || '').split('?').shift().trim().toLowerCase();
	        let value = defaultMimeType;

	        if (extensions.has(extension)) {
	            value = extensions.get(extension);
	        }

	        if (Array.isArray(value)) {
	            return value[0];
	        }
	        return value;
	    },

	    detectExtension(mimeType) {
	        if (!mimeType) {
	            return defaultExtension;
	        }
	        let parts = (mimeType || '').toLowerCase().trim().split('/');
	        let rootType = parts.shift().trim();
	        let subType = parts.join('/').trim();

	        if (mimeTypes.has(rootType + '/' + subType)) {
	            let value = mimeTypes.get(rootType + '/' + subType);
	            if (Array.isArray(value)) {
	                return value[0];
	            }
	            return value;
	        }

	        switch (rootType) {
	            case 'text':
	                return 'txt';
	            default:
	                return 'bin';
	        }
	    }
	};
	return mimeTypes_1;
}

/*

Copied from https://github.com/mathiasbynens/punycode.js/blob/ef3505c8abb5143a00d53ce59077c9f7f4b2ac47/punycode.js

Copyright Mathias Bynens <https://mathiasbynens.be/>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

var punycode_1;
var hasRequiredPunycode;

function requirePunycode () {
	if (hasRequiredPunycode) return punycode_1;
	hasRequiredPunycode = 1;

	/** Highest positive signed 32-bit float value */
	const maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	const base = 36;
	const tMin = 1;
	const tMax = 26;
	const skew = 38;
	const damp = 700;
	const initialBias = 72;
	const initialN = 128; // 0x80
	const delimiter = '-'; // '\x2D'

	/** Regular expressions */
	const regexPunycode = /^xn--/;
	const regexNonASCII = /[^\0-\x7F]/; // Note: U+007F DEL is excluded too.
	const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

	/** Error messages */
	const errors = {
	    overflow: 'Overflow: input needs wider integers to process',
	    'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
	    'invalid-input': 'Invalid input'
	};

	/** Convenience shortcuts */
	const baseMinusTMin = base - tMin;
	const floor = Math.floor;
	const stringFromCharCode = String.fromCharCode;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
	    throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, callback) {
	    const result = [];
	    let length = array.length;
	    while (length--) {
	        result[length] = callback(array[length]);
	    }
	    return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {String} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(domain, callback) {
	    const parts = domain.split('@');
	    let result = '';
	    if (parts.length > 1) {
	        // In email addresses, only the domain name should be punycoded. Leave
	        // the local part (i.e. everything up to `@`) intact.
	        result = parts[0] + '@';
	        domain = parts[1];
	    }
	    // Avoid `split(regex)` for IE8 compatibility. See #17.
	    domain = domain.replace(regexSeparators, '\x2E');
	    const labels = domain.split('.');
	    const encoded = map(labels, callback).join('.');
	    return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
	    const output = [];
	    let counter = 0;
	    const length = string.length;
	    while (counter < length) {
	        const value = string.charCodeAt(counter++);
	        if (value >= 0xd800 && value <= 0xdbff && counter < length) {
	            // It's a high surrogate, and there is a next character.
	            const extra = string.charCodeAt(counter++);
	            if ((extra & 0xfc00) == 0xdc00) {
	                // Low surrogate.
	                output.push(((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000);
	            } else {
	                // It's an unmatched surrogate; only append this code unit, in case the
	                // next code unit is the high surrogate of a surrogate pair.
	                output.push(value);
	                counter--;
	            }
	        } else {
	            output.push(value);
	        }
	    }
	    return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	const ucs2encode = codePoints => String.fromCodePoint(...codePoints);

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	const basicToDigit = function (codePoint) {
	    if (codePoint >= 0x30 && codePoint < 0x3a) {
	        return 26 + (codePoint - 0x30);
	    }
	    if (codePoint >= 0x41 && codePoint < 0x5b) {
	        return codePoint - 0x41;
	    }
	    if (codePoint >= 0x61 && codePoint < 0x7b) {
	        return codePoint - 0x61;
	    }
	    return base;
	};

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	const digitToBasic = function (digit, flag) {
	    //  0..25 map to ASCII a..z or A..Z
	    // 26..35 map to ASCII 0..9
	    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	};

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	const adapt = function (delta, numPoints, firstTime) {
	    let k = 0;
	    delta = firstTime ? floor(delta / damp) : delta >> 1;
	    delta += floor(delta / numPoints);
	    for (; /* no initialization */ delta > (baseMinusTMin * tMax) >> 1; k += base) {
	        delta = floor(delta / baseMinusTMin);
	    }
	    return floor(k + ((baseMinusTMin + 1) * delta) / (delta + skew));
	};

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	const decode = function (input) {
	    // Don't use UCS-2.
	    const output = [];
	    const inputLength = input.length;
	    let i = 0;
	    let n = initialN;
	    let bias = initialBias;

	    // Handle the basic code points: let `basic` be the number of input code
	    // points before the last delimiter, or `0` if there is none, then copy
	    // the first basic code points to the output.

	    let basic = input.lastIndexOf(delimiter);
	    if (basic < 0) {
	        basic = 0;
	    }

	    for (let j = 0; j < basic; ++j) {
	        // if it's not a basic code point
	        if (input.charCodeAt(j) >= 0x80) {
	            error('not-basic');
	        }
	        output.push(input.charCodeAt(j));
	    }

	    // Main decoding loop: start just after the last delimiter if any basic code
	    // points were copied; start at the beginning otherwise.

	    for (let index = basic > 0 ? basic + 1 : 0; index < inputLength /* no final expression */; ) {
	        // `index` is the index of the next character to be consumed.
	        // Decode a generalized variable-length integer into `delta`,
	        // which gets added to `i`. The overflow checking is easier
	        // if we increase `i` as we go, then subtract off its starting
	        // value at the end to obtain `delta`.
	        const oldi = i;
	        for (let w = 1, k = base /* no condition */; ; k += base) {
	            if (index >= inputLength) {
	                error('invalid-input');
	            }

	            const digit = basicToDigit(input.charCodeAt(index++));

	            if (digit >= base) {
	                error('invalid-input');
	            }
	            if (digit > floor((maxInt - i) / w)) {
	                error('overflow');
	            }

	            i += digit * w;
	            const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

	            if (digit < t) {
	                break;
	            }

	            const baseMinusT = base - t;
	            if (w > floor(maxInt / baseMinusT)) {
	                error('overflow');
	            }

	            w *= baseMinusT;
	        }

	        const out = output.length + 1;
	        bias = adapt(i - oldi, out, oldi == 0);

	        // `i` was supposed to wrap around from `out` to `0`,
	        // incrementing `n` each time, so we'll fix that now:
	        if (floor(i / out) > maxInt - n) {
	            error('overflow');
	        }

	        n += floor(i / out);
	        i %= out;

	        // Insert `n` at position `i` of the output.
	        output.splice(i++, 0, n);
	    }

	    return String.fromCodePoint(...output);
	};

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	const encode = function (input) {
	    const output = [];

	    // Convert the input in UCS-2 to an array of Unicode code points.
	    input = ucs2decode(input);

	    // Cache the length.
	    const inputLength = input.length;

	    // Initialize the state.
	    let n = initialN;
	    let delta = 0;
	    let bias = initialBias;

	    // Handle the basic code points.
	    for (const currentValue of input) {
	        if (currentValue < 0x80) {
	            output.push(stringFromCharCode(currentValue));
	        }
	    }

	    const basicLength = output.length;
	    let handledCPCount = basicLength;

	    // `handledCPCount` is the number of code points that have been handled;
	    // `basicLength` is the number of basic code points.

	    // Finish the basic string with a delimiter unless it's empty.
	    if (basicLength) {
	        output.push(delimiter);
	    }

	    // Main encoding loop:
	    while (handledCPCount < inputLength) {
	        // All non-basic code points < n have been handled already. Find the next
	        // larger one:
	        let m = maxInt;
	        for (const currentValue of input) {
	            if (currentValue >= n && currentValue < m) {
	                m = currentValue;
	            }
	        }

	        // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
	        // but guard against overflow.
	        const handledCPCountPlusOne = handledCPCount + 1;
	        if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
	            error('overflow');
	        }

	        delta += (m - n) * handledCPCountPlusOne;
	        n = m;

	        for (const currentValue of input) {
	            if (currentValue < n && ++delta > maxInt) {
	                error('overflow');
	            }
	            if (currentValue === n) {
	                // Represent delta as a generalized variable-length integer.
	                let q = delta;
	                for (let k = base /* no condition */; ; k += base) {
	                    const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
	                    if (q < t) {
	                        break;
	                    }
	                    const qMinusT = q - t;
	                    const baseMinusT = base - t;
	                    output.push(stringFromCharCode(digitToBasic(t + (qMinusT % baseMinusT), 0)));
	                    q = floor(qMinusT / baseMinusT);
	                }

	                output.push(stringFromCharCode(digitToBasic(q, 0)));
	                bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
	                delta = 0;
	                ++handledCPCount;
	            }
	        }

	        ++delta;
	        ++n;
	    }
	    return output.join('');
	};

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	const toUnicode = function (input) {
	    return mapDomain(input, function (string) {
	        return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
	    });
	};

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	const toASCII = function (input) {
	    return mapDomain(input, function (string) {
	        return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
	    });
	};

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	const punycode = {
	    /**
	     * A string representing the current Punycode.js version number.
	     * @memberOf punycode
	     * @type String
	     */
	    version: '2.3.1',
	    /**
	     * An object of methods to convert from JavaScript's internal character
	     * representation (UCS-2) to Unicode code points, and back.
	     * @see <https://mathiasbynens.be/notes/javascript-encoding>
	     * @memberOf punycode
	     * @type Object
	     */
	    ucs2: {
	        decode: ucs2decode,
	        encode: ucs2encode
	    },
	    decode: decode,
	    encode: encode,
	    toASCII: toASCII,
	    toUnicode: toUnicode
	};

	punycode_1 = punycode;
	return punycode_1;
}

var base64;
var hasRequiredBase64;

function requireBase64 () {
	if (hasRequiredBase64) return base64;
	hasRequiredBase64 = 1;

	const Transform = require$$0$2.Transform;

	/**
	 * Encodes a Buffer into a base64 encoded string
	 *
	 * @param {Buffer} buffer Buffer to convert
	 * @returns {String} base64 encoded string
	 */
	function encode(buffer) {
	    if (typeof buffer === 'string') {
	        buffer = Buffer.from(buffer, 'utf-8');
	    }

	    return buffer.toString('base64');
	}

	/**
	 * Adds soft line breaks to a base64 string
	 *
	 * @param {String} str base64 encoded string that might need line wrapping
	 * @param {Number} [lineLength=76] Maximum allowed length for a line
	 * @returns {String} Soft-wrapped base64 encoded string
	 */
	function wrap(str, lineLength) {
	    str = (str || '').toString();
	    lineLength = lineLength || 76;

	    if (str.length <= lineLength) {
	        return str;
	    }

	    let result = [];
	    let pos = 0;
	    let chunkLength = lineLength * 1024;
	    while (pos < str.length) {
	        let wrappedLines = str.substr(pos, chunkLength).replace(new RegExp('.{' + lineLength + '}', 'g'), '$&\r\n');
	        result.push(wrappedLines);
	        pos += chunkLength;
	    }

	    return result.join('');
	}

	/**
	 * Creates a transform stream for encoding data to base64 encoding
	 *
	 * @constructor
	 * @param {Object} options Stream options
	 * @param {Number} [options.lineLength=76] Maximum length for lines, set to false to disable wrapping
	 */
	class Encoder extends Transform {
	    constructor(options) {
	        super();
	        this.options = options || {};

	        if (this.options.lineLength !== false) {
	            this.options.lineLength = this.options.lineLength || 76;
	        }

	        this._curLine = '';
	        this._remainingBytes = false;

	        this.inputBytes = 0;
	        this.outputBytes = 0;
	    }

	    _transform(chunk, encoding, done) {
	        if (encoding !== 'buffer') {
	            chunk = Buffer.from(chunk, encoding);
	        }

	        if (!chunk || !chunk.length) {
	            return setImmediate(done);
	        }

	        this.inputBytes += chunk.length;

	        if (this._remainingBytes && this._remainingBytes.length) {
	            chunk = Buffer.concat([this._remainingBytes, chunk], this._remainingBytes.length + chunk.length);
	            this._remainingBytes = false;
	        }

	        if (chunk.length % 3) {
	            this._remainingBytes = chunk.slice(chunk.length - (chunk.length % 3));
	            chunk = chunk.slice(0, chunk.length - (chunk.length % 3));
	        } else {
	            this._remainingBytes = false;
	        }

	        let b64 = this._curLine + encode(chunk);

	        if (this.options.lineLength) {
	            b64 = wrap(b64, this.options.lineLength);

	            let lastLF = b64.lastIndexOf('\n');
	            if (lastLF < 0) {
	                this._curLine = b64;
	                b64 = '';
	            } else {
	                this._curLine = b64.substring(lastLF + 1);
	                b64 = b64.substring(0, lastLF + 1);

	                if (b64 && !b64.endsWith('\r\n')) {
	                    b64 += '\r\n';
	                }
	            }
	        } else {
	            this._curLine = '';
	        }

	        if (b64) {
	            this.outputBytes += b64.length;
	            this.push(Buffer.from(b64, 'ascii'));
	        }

	        setImmediate(done);
	    }

	    _flush(done) {
	        if (this._remainingBytes && this._remainingBytes.length) {
	            this._curLine += encode(this._remainingBytes);
	        }

	        if (this._curLine) {
	            this.outputBytes += this._curLine.length;
	            this.push(Buffer.from(this._curLine, 'ascii'));
	            this._curLine = '';
	        }
	        done();
	    }
	}

	base64 = {
	    encode,
	    wrap,
	    Encoder
	};
	return base64;
}

var qp;
var hasRequiredQp;

function requireQp () {
	if (hasRequiredQp) return qp;
	hasRequiredQp = 1;

	const Transform = require$$0$2.Transform;

	/**
	 * Encodes a Buffer into a Quoted-Printable encoded string
	 *
	 * @param {Buffer} buffer Buffer to convert
	 * @returns {String} Quoted-Printable encoded string
	 */
	function encode(buffer) {
	    if (typeof buffer === 'string') {
	        buffer = Buffer.from(buffer, 'utf-8');
	    }

	    // usable characters that do not need encoding
	    let ranges = [
	        // https://tools.ietf.org/html/rfc2045#section-6.7
	        [0x09], // <TAB>
	        [0x0a], // <LF>
	        [0x0d], // <CR>
	        [0x20, 0x3c], // <SP>!"#$%&'()*+,-./0123456789:;
	        [0x3e, 0x7e] // >?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}
	    ];
	    let result = '';
	    let ord;

	    for (let i = 0, len = buffer.length; i < len; i++) {
	        ord = buffer[i];
	        // if the char is in allowed range, then keep as is, unless it is a WS in the end of a line
	        if (
	            checkRanges(ord, ranges) &&
	            !((ord === 0x20 || ord === 0x09) && (i === len - 1 || buffer[i + 1] === 0x0a || buffer[i + 1] === 0x0d))
	        ) {
	            result += String.fromCharCode(ord);
	            continue;
	        }
	        result += '=' + (ord < 0x10 ? '0' : '') + ord.toString(16).toUpperCase();
	    }

	    return result;
	}

	/**
	 * Adds soft line breaks to a Quoted-Printable string
	 *
	 * @param {String} str Quoted-Printable encoded string that might need line wrapping
	 * @param {Number} [lineLength=76] Maximum allowed length for a line
	 * @returns {String} Soft-wrapped Quoted-Printable encoded string
	 */
	function wrap(str, lineLength) {
	    str = (str || '').toString();
	    lineLength = lineLength || 76;

	    if (str.length <= lineLength) {
	        return str;
	    }

	    let pos = 0;
	    let len = str.length;
	    let match, code, line;
	    let lineMargin = Math.floor(lineLength / 3);
	    let result = '';

	    // insert soft linebreaks where needed
	    while (pos < len) {
	        line = str.substr(pos, lineLength);
	        if ((match = line.match(/\r\n/))) {
	            line = line.substr(0, match.index + match[0].length);
	            result += line;
	            pos += line.length;
	            continue;
	        }

	        if (line.substr(-1) === '\n') {
	            // nothing to change here
	            result += line;
	            pos += line.length;
	            continue;
	        } else if ((match = line.substr(-lineMargin).match(/\n.*?$/))) {
	            // truncate to nearest line break
	            line = line.substr(0, line.length - (match[0].length - 1));
	            result += line;
	            pos += line.length;
	            continue;
	        } else if (line.length > lineLength - lineMargin && (match = line.substr(-lineMargin).match(/[ \t.,!?][^ \t.,!?]*$/))) {
	            // truncate to nearest space
	            line = line.substr(0, line.length - (match[0].length - 1));
	        } else if (line.match(/[=][\da-f]{0,2}$/i)) {
	            // push incomplete encoding sequences to the next line
	            if ((match = line.match(/[=][\da-f]{0,1}$/i))) {
	                line = line.substr(0, line.length - match[0].length);
	            }

	            // ensure that utf-8 sequences are not split
	            while (
	                line.length > 3 &&
	                line.length < len - pos &&
	                !line.match(/^(?:=[\da-f]{2}){1,4}$/i) &&
	                (match = line.match(/[=][\da-f]{2}$/gi))
	            ) {
	                code = parseInt(match[0].substr(1, 2), 16);
	                if (code < 128) {
	                    break;
	                }

	                line = line.substr(0, line.length - 3);

	                if (code >= 0xc0) {
	                    break;
	                }
	            }
	        }

	        if (pos + line.length < len && line.substr(-1) !== '\n') {
	            if (line.length === lineLength && line.match(/[=][\da-f]{2}$/i)) {
	                line = line.substr(0, line.length - 3);
	            } else if (line.length === lineLength) {
	                line = line.substr(0, line.length - 1);
	            }
	            pos += line.length;
	            line += '=\r\n';
	        } else {
	            pos += line.length;
	        }

	        result += line;
	    }

	    return result;
	}

	/**
	 * Helper function to check if a number is inside provided ranges
	 *
	 * @param {Number} nr Number to check for
	 * @param {Array} ranges An Array of allowed values
	 * @returns {Boolean} True if the value was found inside allowed ranges, false otherwise
	 */
	function checkRanges(nr, ranges) {
	    for (let i = ranges.length - 1; i >= 0; i--) {
	        if (!ranges[i].length) {
	            continue;
	        }
	        if (ranges[i].length === 1 && nr === ranges[i][0]) {
	            return true;
	        }
	        if (ranges[i].length === 2 && nr >= ranges[i][0] && nr <= ranges[i][1]) {
	            return true;
	        }
	    }
	    return false;
	}

	/**
	 * Creates a transform stream for encoding data to Quoted-Printable encoding
	 *
	 * @constructor
	 * @param {Object} options Stream options
	 * @param {Number} [options.lineLength=76] Maximum length for lines, set to false to disable wrapping
	 */
	class Encoder extends Transform {
	    constructor(options) {
	        super();

	        // init Transform
	        this.options = options || {};

	        if (this.options.lineLength !== false) {
	            this.options.lineLength = this.options.lineLength || 76;
	        }

	        this._curLine = '';

	        this.inputBytes = 0;
	        this.outputBytes = 0;
	    }

	    _transform(chunk, encoding, done) {
	        let qp;

	        if (encoding !== 'buffer') {
	            chunk = Buffer.from(chunk, encoding);
	        }

	        if (!chunk || !chunk.length) {
	            return done();
	        }

	        this.inputBytes += chunk.length;

	        if (this.options.lineLength) {
	            qp = this._curLine + encode(chunk);
	            qp = wrap(qp, this.options.lineLength);
	            qp = qp.replace(/(^|\n)([^\n]*)$/, (match, lineBreak, lastLine) => {
	                this._curLine = lastLine;
	                return lineBreak;
	            });

	            if (qp) {
	                this.outputBytes += qp.length;
	                this.push(qp);
	            }
	        } else {
	            qp = encode(chunk);
	            this.outputBytes += qp.length;
	            this.push(qp, 'ascii');
	        }

	        done();
	    }

	    _flush(done) {
	        if (this._curLine) {
	            this.outputBytes += this._curLine.length;
	            this.push(this._curLine, 'ascii');
	        }
	        done();
	    }
	}

	// expose to the world
	qp = {
	    encode,
	    wrap,
	    Encoder
	};
	return qp;
}

/* eslint no-control-regex:0 */

var mimeFuncs;
var hasRequiredMimeFuncs;

function requireMimeFuncs () {
	if (hasRequiredMimeFuncs) return mimeFuncs;
	hasRequiredMimeFuncs = 1;

	const base64 = requireBase64();
	const qp = requireQp();
	const mimeTypes = requireMimeTypes();

	mimeFuncs = {
	    /**
	     * Checks if a value is plaintext string (uses only printable 7bit chars)
	     *
	     * @param {String} value String to be tested
	     * @returns {Boolean} true if it is a plaintext string
	     */
	    isPlainText(value, isParam) {
	        const re = isParam ? /[\x00-\x08\x0b\x0c\x0e-\x1f"\u0080-\uFFFF]/ : /[\x00-\x08\x0b\x0c\x0e-\x1f\u0080-\uFFFF]/;
	        if (typeof value !== 'string' || re.test(value)) {
	            return false;
	        } else {
	            return true;
	        }
	    },

	    /**
	     * Checks if a multi line string containes lines longer than the selected value.
	     *
	     * Useful when detecting if a mail message needs any processing at all –
	     * if only plaintext characters are used and lines are short, then there is
	     * no need to encode the values in any way. If the value is plaintext but has
	     * longer lines then allowed, then use format=flowed
	     *
	     * @param {Number} lineLength Max line length to check for
	     * @returns {Boolean} Returns true if there is at least one line longer than lineLength chars
	     */
	    hasLongerLines(str, lineLength) {
	        if (str.length > 128 * 1024) {
	            // do not test strings longer than 128kB
	            return true;
	        }
	        return new RegExp('^.{' + (lineLength + 1) + ',}', 'm').test(str);
	    },

	    /**
	     * Encodes a string or an Buffer to an UTF-8 MIME Word (rfc2047)
	     *
	     * @param {String|Buffer} data String to be encoded
	     * @param {String} mimeWordEncoding='Q' Encoding for the mime word, either Q or B
	     * @param {Number} [maxLength=0] If set, split mime words into several chunks if needed
	     * @return {String} Single or several mime words joined together
	     */
	    encodeWord(data, mimeWordEncoding, maxLength) {
	        mimeWordEncoding = (mimeWordEncoding || 'Q').toString().toUpperCase().trim().charAt(0);
	        maxLength = maxLength || 0;

	        let encodedStr;
	        let toCharset = 'UTF-8';

	        if (maxLength && maxLength > 7 + toCharset.length) {
	            maxLength -= 7 + toCharset.length;
	        }

	        if (mimeWordEncoding === 'Q') {
	            // https://tools.ietf.org/html/rfc2047#section-5 rule (3)
	            encodedStr = qp.encode(data).replace(/[^a-z0-9!*+\-/=]/gi, chr => {
	                let ord = chr.charCodeAt(0).toString(16).toUpperCase();
	                if (chr === ' ') {
	                    return '_';
	                } else {
	                    return '=' + (ord.length === 1 ? '0' + ord : ord);
	                }
	            });
	        } else if (mimeWordEncoding === 'B') {
	            encodedStr = typeof data === 'string' ? data : base64.encode(data);
	            maxLength = maxLength ? Math.max(3, ((maxLength - (maxLength % 4)) / 4) * 3) : 0;
	        }

	        if (maxLength && (mimeWordEncoding !== 'B' ? encodedStr : base64.encode(data)).length > maxLength) {
	            if (mimeWordEncoding === 'Q') {
	                encodedStr = this.splitMimeEncodedString(encodedStr, maxLength).join('?= =?' + toCharset + '?' + mimeWordEncoding + '?');
	            } else {
	                // RFC2047 6.3 (2) states that encoded-word must include an integral number of characters, so no chopping unicode sequences
	                let parts = [];
	                let lpart = '';
	                for (let i = 0, len = encodedStr.length; i < len; i++) {
	                    let chr = encodedStr.charAt(i);

	                    if (/[\ud83c\ud83d\ud83e]/.test(chr) && i < len - 1) {
	                        // composite emoji byte, so add the next byte as well
	                        chr += encodedStr.charAt(++i);
	                    }

	                    // check if we can add this character to the existing string
	                    // without breaking byte length limit
	                    if (Buffer.byteLength(lpart + chr) <= maxLength || i === 0) {
	                        lpart += chr;
	                    } else {
	                        // we hit the length limit, so push the existing string and start over
	                        parts.push(base64.encode(lpart));
	                        lpart = chr;
	                    }
	                }
	                if (lpart) {
	                    parts.push(base64.encode(lpart));
	                }

	                if (parts.length > 1) {
	                    encodedStr = parts.join('?= =?' + toCharset + '?' + mimeWordEncoding + '?');
	                } else {
	                    encodedStr = parts.join('');
	                }
	            }
	        } else if (mimeWordEncoding === 'B') {
	            encodedStr = base64.encode(data);
	        }

	        return '=?' + toCharset + '?' + mimeWordEncoding + '?' + encodedStr + (encodedStr.substr(-2) === '?=' ? '' : '?=');
	    },

	    /**
	     * Finds word sequences with non ascii text and converts these to mime words
	     *
	     * @param {String} value String to be encoded
	     * @param {String} mimeWordEncoding='Q' Encoding for the mime word, either Q or B
	     * @param {Number} [maxLength=0] If set, split mime words into several chunks if needed
	     * @param {Boolean} [encodeAll=false] If true and the value needs encoding then encodes entire string, not just the smallest match
	     * @return {String} String with possible mime words
	     */
	    encodeWords(value, mimeWordEncoding, maxLength, encodeAll) {
	        maxLength = maxLength || 0;

	        let encodedValue;

	        // find first word with a non-printable ascii or special symbol in it
	        let firstMatch = value.match(/(?:^|\s)([^\s]*["\u0080-\uFFFF])/);
	        if (!firstMatch) {
	            return value;
	        }

	        if (encodeAll) {
	            // if it is requested to encode everything or the string contains something that resebles encoded word, then encode everything

	            return this.encodeWord(value, mimeWordEncoding, maxLength);
	        }

	        // find the last word with a non-printable ascii in it
	        let lastMatch = value.match(/(["\u0080-\uFFFF][^\s]*)[^"\u0080-\uFFFF]*$/);
	        if (!lastMatch) {
	            // should not happen
	            return value;
	        }

	        let startIndex =
	            firstMatch.index +
	            (
	                firstMatch[0].match(/[^\s]/) || {
	                    index: 0
	                }
	            ).index;
	        let endIndex = lastMatch.index + (lastMatch[1] || '').length;

	        encodedValue =
	            (startIndex ? value.substr(0, startIndex) : '') +
	            this.encodeWord(value.substring(startIndex, endIndex), mimeWordEncoding || 'Q', maxLength) +
	            (endIndex < value.length ? value.substr(endIndex) : '');

	        return encodedValue;
	    },

	    /**
	     * Joins parsed header value together as 'value; param1=value1; param2=value2'
	     * PS: We are following RFC 822 for the list of special characters that we need to keep in quotes.
	     *      Refer: https://www.w3.org/Protocols/rfc1341/4_Content-Type.html
	     * @param {Object} structured Parsed header value
	     * @return {String} joined header value
	     */
	    buildHeaderValue(structured) {
	        let paramsArray = [];

	        Object.keys(structured.params || {}).forEach(param => {
	            // filename might include unicode characters so it is a special case
	            // other values probably do not
	            let value = structured.params[param];
	            if (!this.isPlainText(value, true) || value.length >= 75) {
	                this.buildHeaderParam(param, value, 50).forEach(encodedParam => {
	                    if (!/[\s"\\;:/=(),<>@[\]?]|^[-']|'$/.test(encodedParam.value) || encodedParam.key.substr(-1) === '*') {
	                        paramsArray.push(encodedParam.key + '=' + encodedParam.value);
	                    } else {
	                        paramsArray.push(encodedParam.key + '=' + JSON.stringify(encodedParam.value));
	                    }
	                });
	            } else if (/[\s'"\\;:/=(),<>@[\]?]|^-/.test(value)) {
	                paramsArray.push(param + '=' + JSON.stringify(value));
	            } else {
	                paramsArray.push(param + '=' + value);
	            }
	        });

	        return structured.value + (paramsArray.length ? '; ' + paramsArray.join('; ') : '');
	    },

	    /**
	     * Encodes a string or an Buffer to an UTF-8 Parameter Value Continuation encoding (rfc2231)
	     * Useful for splitting long parameter values.
	     *
	     * For example
	     *      title="unicode string"
	     * becomes
	     *     title*0*=utf-8''unicode
	     *     title*1*=%20string
	     *
	     * @param {String|Buffer} data String to be encoded
	     * @param {Number} [maxLength=50] Max length for generated chunks
	     * @param {String} [fromCharset='UTF-8'] Source sharacter set
	     * @return {Array} A list of encoded keys and headers
	     */
	    buildHeaderParam(key, data, maxLength) {
	        let list = [];
	        let encodedStr = typeof data === 'string' ? data : (data || '').toString();
	        let encodedStrArr;
	        let chr, ord;
	        let line;
	        let startPos = 0;
	        let i, len;

	        maxLength = maxLength || 50;

	        // process ascii only text
	        if (this.isPlainText(data, true)) {
	            // check if conversion is even needed
	            if (encodedStr.length <= maxLength) {
	                return [
	                    {
	                        key,
	                        value: encodedStr
	                    }
	                ];
	            }

	            encodedStr = encodedStr.replace(new RegExp('.{' + maxLength + '}', 'g'), str => {
	                list.push({
	                    line: str
	                });
	                return '';
	            });

	            if (encodedStr) {
	                list.push({
	                    line: encodedStr
	                });
	            }
	        } else {
	            if (/[\uD800-\uDBFF]/.test(encodedStr)) {
	                // string containts surrogate pairs, so normalize it to an array of bytes
	                encodedStrArr = [];
	                for (i = 0, len = encodedStr.length; i < len; i++) {
	                    chr = encodedStr.charAt(i);
	                    ord = chr.charCodeAt(0);
	                    if (ord >= 0xd800 && ord <= 0xdbff && i < len - 1) {
	                        chr += encodedStr.charAt(i + 1);
	                        encodedStrArr.push(chr);
	                        i++;
	                    } else {
	                        encodedStrArr.push(chr);
	                    }
	                }
	                encodedStr = encodedStrArr;
	            }

	            // first line includes the charset and language info and needs to be encoded
	            // even if it does not contain any unicode characters
	            line = "utf-8''";
	            let encoded = true;
	            startPos = 0;

	            // process text with unicode or special chars
	            for (i = 0, len = encodedStr.length; i < len; i++) {
	                chr = encodedStr[i];

	                if (encoded) {
	                    chr = this.safeEncodeURIComponent(chr);
	                } else {
	                    // try to urlencode current char
	                    chr = chr === ' ' ? chr : this.safeEncodeURIComponent(chr);
	                    // By default it is not required to encode a line, the need
	                    // only appears when the string contains unicode or special chars
	                    // in this case we start processing the line over and encode all chars
	                    if (chr !== encodedStr[i]) {
	                        // Check if it is even possible to add the encoded char to the line
	                        // If not, there is no reason to use this line, just push it to the list
	                        // and start a new line with the char that needs encoding
	                        if ((this.safeEncodeURIComponent(line) + chr).length >= maxLength) {
	                            list.push({
	                                line,
	                                encoded
	                            });
	                            line = '';
	                            startPos = i - 1;
	                        } else {
	                            encoded = true;
	                            i = startPos;
	                            line = '';
	                            continue;
	                        }
	                    }
	                }

	                // if the line is already too long, push it to the list and start a new one
	                if ((line + chr).length >= maxLength) {
	                    list.push({
	                        line,
	                        encoded
	                    });
	                    line = chr = encodedStr[i] === ' ' ? ' ' : this.safeEncodeURIComponent(encodedStr[i]);
	                    if (chr === encodedStr[i]) {
	                        encoded = false;
	                        startPos = i - 1;
	                    } else {
	                        encoded = true;
	                    }
	                } else {
	                    line += chr;
	                }
	            }

	            if (line) {
	                list.push({
	                    line,
	                    encoded
	                });
	            }
	        }

	        return list.map((item, i) => ({
	            // encoded lines: {name}*{part}*
	            // unencoded lines: {name}*{part}
	            // if any line needs to be encoded then the first line (part==0) is always encoded
	            key: key + '*' + i + (item.encoded ? '*' : ''),
	            value: item.line
	        }));
	    },

	    /**
	     * Parses a header value with key=value arguments into a structured
	     * object.
	     *
	     *   parseHeaderValue('content-type: text/plain; CHARSET='UTF-8'') ->
	     *   {
	     *     'value': 'text/plain',
	     *     'params': {
	     *       'charset': 'UTF-8'
	     *     }
	     *   }
	     *
	     * @param {String} str Header value
	     * @return {Object} Header value as a parsed structure
	     */
	    parseHeaderValue(str) {
	        let response = {
	            value: false,
	            params: {}
	        };
	        let key = false;
	        let value = '';
	        let type = 'value';
	        let quote = false;
	        let escaped = false;
	        let chr;

	        for (let i = 0, len = str.length; i < len; i++) {
	            chr = str.charAt(i);
	            if (type === 'key') {
	                if (chr === '=') {
	                    key = value.trim().toLowerCase();
	                    type = 'value';
	                    value = '';
	                    continue;
	                }
	                value += chr;
	            } else {
	                if (escaped) {
	                    value += chr;
	                } else if (chr === '\\') {
	                    escaped = true;
	                    continue;
	                } else if (quote && chr === quote) {
	                    quote = false;
	                } else if (!quote && chr === '"') {
	                    quote = chr;
	                } else if (!quote && chr === ';') {
	                    if (key === false) {
	                        response.value = value.trim();
	                    } else {
	                        response.params[key] = value.trim();
	                    }
	                    type = 'key';
	                    value = '';
	                } else {
	                    value += chr;
	                }
	                escaped = false;
	            }
	        }

	        if (type === 'value') {
	            if (key === false) {
	                response.value = value.trim();
	            } else {
	                response.params[key] = value.trim();
	            }
	        } else if (value.trim()) {
	            response.params[value.trim().toLowerCase()] = '';
	        }

	        // handle parameter value continuations
	        // https://tools.ietf.org/html/rfc2231#section-3

	        // preprocess values
	        Object.keys(response.params).forEach(key => {
	            let actualKey, nr, match, value;
	            if ((match = key.match(/(\*(\d+)|\*(\d+)\*|\*)$/))) {
	                actualKey = key.substr(0, match.index);
	                nr = Number(match[2] || match[3]) || 0;

	                if (!response.params[actualKey] || typeof response.params[actualKey] !== 'object') {
	                    response.params[actualKey] = {
	                        charset: false,
	                        values: []
	                    };
	                }

	                value = response.params[key];

	                if (nr === 0 && match[0].substr(-1) === '*' && (match = value.match(/^([^']*)'[^']*'(.*)$/))) {
	                    response.params[actualKey].charset = match[1] || 'iso-8859-1';
	                    value = match[2];
	                }

	                response.params[actualKey].values[nr] = value;

	                // remove the old reference
	                delete response.params[key];
	            }
	        });

	        // concatenate split rfc2231 strings and convert encoded strings to mime encoded words
	        Object.keys(response.params).forEach(key => {
	            let value;
	            if (response.params[key] && Array.isArray(response.params[key].values)) {
	                value = response.params[key].values.map(val => val || '').join('');

	                if (response.params[key].charset) {
	                    // convert "%AB" to "=?charset?Q?=AB?="
	                    response.params[key] =
	                        '=?' +
	                        response.params[key].charset +
	                        '?Q?' +
	                        value
	                            // fix invalidly encoded chars
	                            .replace(/[=?_\s]/g, s => {
	                                let c = s.charCodeAt(0).toString(16);
	                                if (s === ' ') {
	                                    return '_';
	                                } else {
	                                    return '%' + (c.length < 2 ? '0' : '') + c;
	                                }
	                            })
	                            // change from urlencoding to percent encoding
	                            .replace(/%/g, '=') +
	                        '?=';
	                } else {
	                    response.params[key] = value;
	                }
	            }
	        });

	        return response;
	    },

	    /**
	     * Returns file extension for a content type string. If no suitable extensions
	     * are found, 'bin' is used as the default extension
	     *
	     * @param {String} mimeType Content type to be checked for
	     * @return {String} File extension
	     */
	    detectExtension: mimeType => mimeTypes.detectExtension(mimeType),

	    /**
	     * Returns content type for a file extension. If no suitable content types
	     * are found, 'application/octet-stream' is used as the default content type
	     *
	     * @param {String} extension Extension to be checked for
	     * @return {String} File extension
	     */
	    detectMimeType: extension => mimeTypes.detectMimeType(extension),

	    /**
	     * Folds long lines, useful for folding header lines (afterSpace=false) and
	     * flowed text (afterSpace=true)
	     *
	     * @param {String} str String to be folded
	     * @param {Number} [lineLength=76] Maximum length of a line
	     * @param {Boolean} afterSpace If true, leave a space in th end of a line
	     * @return {String} String with folded lines
	     */
	    foldLines(str, lineLength, afterSpace) {
	        str = (str || '').toString();
	        lineLength = lineLength || 76;

	        let pos = 0,
	            len = str.length,
	            result = '',
	            line,
	            match;

	        while (pos < len) {
	            line = str.substr(pos, lineLength);
	            if (line.length < lineLength) {
	                result += line;
	                break;
	            }
	            if ((match = line.match(/^[^\n\r]*(\r?\n|\r)/))) {
	                line = match[0];
	                result += line;
	                pos += line.length;
	                continue;
	            } else if ((match = line.match(/(\s+)[^\s]*$/)) && match[0].length - (afterSpace ? (match[1] || '').length : 0) < line.length) {
	                line = line.substr(0, line.length - (match[0].length - (afterSpace ? (match[1] || '').length : 0)));
	            } else if ((match = str.substr(pos + line.length).match(/^[^\s]+(\s*)/))) {
	                line = line + match[0].substr(0, match[0].length - (!afterSpace ? (match[1] || '').length : 0));
	            }

	            result += line;
	            pos += line.length;
	            if (pos < len) {
	                result += '\r\n';
	            }
	        }

	        return result;
	    },

	    /**
	     * Splits a mime encoded string. Needed for dividing mime words into smaller chunks
	     *
	     * @param {String} str Mime encoded string to be split up
	     * @param {Number} maxlen Maximum length of characters for one part (minimum 12)
	     * @return {Array} Split string
	     */
	    splitMimeEncodedString: (str, maxlen) => {
	        let curLine,
	            match,
	            chr,
	            done,
	            lines = [];

	        // require at least 12 symbols to fit possible 4 octet UTF-8 sequences
	        maxlen = Math.max(maxlen || 0, 12);

	        while (str.length) {
	            curLine = str.substr(0, maxlen);

	            // move incomplete escaped char back to main
	            if ((match = curLine.match(/[=][0-9A-F]?$/i))) {
	                curLine = curLine.substr(0, match.index);
	            }

	            done = false;
	            while (!done) {
	                done = true;
	                // check if not middle of a unicode char sequence
	                if ((match = str.substr(curLine.length).match(/^[=]([0-9A-F]{2})/i))) {
	                    chr = parseInt(match[1], 16);
	                    // invalid sequence, move one char back anc recheck
	                    if (chr < 0xc2 && chr > 0x7f) {
	                        curLine = curLine.substr(0, curLine.length - 3);
	                        done = false;
	                    }
	                }
	            }

	            if (curLine.length) {
	                lines.push(curLine);
	            }
	            str = str.substr(curLine.length);
	        }

	        return lines;
	    },

	    encodeURICharComponent: chr => {
	        let res = '';
	        let ord = chr.charCodeAt(0).toString(16).toUpperCase();

	        if (ord.length % 2) {
	            ord = '0' + ord;
	        }

	        if (ord.length > 2) {
	            for (let i = 0, len = ord.length / 2; i < len; i++) {
	                res += '%' + ord.substr(i, 2);
	            }
	        } else {
	            res += '%' + ord;
	        }

	        return res;
	    },

	    safeEncodeURIComponent(str) {
	        str = (str || '').toString();

	        try {
	            // might throw if we try to encode invalid sequences, eg. partial emoji
	            str = encodeURIComponent(str);
	        } catch (_E) {
	            // should never run
	            return str.replace(/[^\x00-\x1F *'()<>@,;:\\"[\]?=\u007F-\uFFFF]+/g, '');
	        }

	        // ensure chars that are not handled by encodeURICompent are converted as well
	        return str.replace(/[\x00-\x1F *'()<>@,;:\\"[\]?=\u007F-\uFFFF]/g, chr => this.encodeURICharComponent(chr));
	    }
	};
	return mimeFuncs;
}

var addressparser_1;
var hasRequiredAddressparser;

function requireAddressparser () {
	if (hasRequiredAddressparser) return addressparser_1;
	hasRequiredAddressparser = 1;

	/**
	 * Converts tokens for a single address into an address object
	 *
	 * @param {Array} tokens Tokens object
	 * @param {Number} depth Current recursion depth for nested group protection
	 * @return {Object} Address object
	 */
	function _handleAddress(tokens, depth) {
	    let isGroup = false;
	    let state = 'text';
	    let address;
	    let addresses = [];
	    let data = {
	        address: [],
	        comment: [],
	        group: [],
	        text: [],
	        textWasQuoted: [] // Track which text tokens came from inside quotes
	    };
	    let i;
	    let len;
	    let insideQuotes = false; // Track if we're currently inside a quoted string

	    // Filter out <addresses>, (comments) and regular text
	    for (i = 0, len = tokens.length; i < len; i++) {
	        let token = tokens[i];
	        let prevToken = i ? tokens[i - 1] : null;
	        if (token.type === 'operator') {
	            switch (token.value) {
	                case '<':
	                    state = 'address';
	                    insideQuotes = false;
	                    break;
	                case '(':
	                    state = 'comment';
	                    insideQuotes = false;
	                    break;
	                case ':':
	                    state = 'group';
	                    isGroup = true;
	                    insideQuotes = false;
	                    break;
	                case '"':
	                    // Track quote state for text tokens
	                    insideQuotes = !insideQuotes;
	                    state = 'text';
	                    break;
	                default:
	                    state = 'text';
	                    insideQuotes = false;
	                    break;
	            }
	        } else if (token.value) {
	            if (state === 'address') {
	                // handle use case where unquoted name includes a "<"
	                // Apple Mail truncates everything between an unexpected < and an address
	                // and so will we
	                token.value = token.value.replace(/^[^<]*<\s*/, '');
	            }

	            if (prevToken && prevToken.noBreak && data[state].length) {
	                // join values
	                data[state][data[state].length - 1] += token.value;
	                if (state === 'text' && insideQuotes) {
	                    data.textWasQuoted[data.textWasQuoted.length - 1] = true;
	                }
	            } else {
	                data[state].push(token.value);
	                if (state === 'text') {
	                    data.textWasQuoted.push(insideQuotes);
	                }
	            }
	        }
	    }

	    // If there is no text but a comment, replace the two
	    if (!data.text.length && data.comment.length) {
	        data.text = data.comment;
	        data.comment = [];
	    }

	    if (isGroup) {
	        // http://tools.ietf.org/html/rfc2822#appendix-A.1.3
	        data.text = data.text.join(' ');

	        // Parse group members, but flatten any nested groups (RFC 5322 doesn't allow nesting)
	        let groupMembers = [];
	        if (data.group.length) {
	            let parsedGroup = addressparser(data.group.join(','), { _depth: depth + 1 });
	            // Flatten: if any member is itself a group, extract its members into the sequence
	            parsedGroup.forEach(member => {
	                if (member.group) {
	                    // Nested group detected - flatten it by adding its members directly
	                    groupMembers = groupMembers.concat(member.group);
	                } else {
	                    groupMembers.push(member);
	                }
	            });
	        }

	        addresses.push({
	            name: data.text || (address && address.name),
	            group: groupMembers
	        });
	    } else {
	        // If no address was found, try to detect one from regular text
	        if (!data.address.length && data.text.length) {
	            for (i = data.text.length - 1; i >= 0; i--) {
	                // Security fix: Do not extract email addresses from quoted strings
	                // RFC 5321 allows @ inside quoted local-parts like "user@domain"@example.com
	                // Extracting emails from quoted text leads to misrouting vulnerabilities
	                if (!data.textWasQuoted[i] && data.text[i].match(/^[^@\s]+@[^@\s]+$/)) {
	                    data.address = data.text.splice(i, 1);
	                    data.textWasQuoted.splice(i, 1);
	                    break;
	                }
	            }

	            let _regexHandler = function (address) {
	                if (!data.address.length) {
	                    data.address = [address.trim()];
	                    return ' ';
	                } else {
	                    return address;
	                }
	            };

	            // still no address
	            if (!data.address.length) {
	                for (i = data.text.length - 1; i >= 0; i--) {
	                    // Security fix: Do not extract email addresses from quoted strings
	                    if (!data.textWasQuoted[i]) {
	                        // fixed the regex to parse email address correctly when email address has more than one @
	                        data.text[i] = data.text[i].replace(/\s*\b[^@\s]+@[^\s]+\b\s*/, _regexHandler).trim();
	                        if (data.address.length) {
	                            break;
	                        }
	                    }
	                }
	            }
	        }

	        // If there's still is no text but a comment exixts, replace the two
	        if (!data.text.length && data.comment.length) {
	            data.text = data.comment;
	            data.comment = [];
	        }

	        // Keep only the first address occurence, push others to regular text
	        if (data.address.length > 1) {
	            data.text = data.text.concat(data.address.splice(1));
	        }

	        // Join values with spaces
	        data.text = data.text.join(' ');
	        data.address = data.address.join(' ');

	        if (!data.address && isGroup) {
	            return [];
	        } else {
	            address = {
	                address: data.address || data.text || '',
	                name: data.text || data.address || ''
	            };

	            if (address.address === address.name) {
	                if ((address.address || '').match(/@/)) {
	                    address.name = '';
	                } else {
	                    address.address = '';
	                }
	            }

	            addresses.push(address);
	        }
	    }

	    return addresses;
	}

	/**
	 * Creates a Tokenizer object for tokenizing address field strings
	 *
	 * @constructor
	 * @param {String} str Address field string
	 */
	class Tokenizer {
	    constructor(str) {
	        this.str = (str || '').toString();
	        this.operatorCurrent = '';
	        this.operatorExpecting = '';
	        this.node = null;
	        this.escaped = false;

	        this.list = [];
	        /**
	         * Operator tokens and which tokens are expected to end the sequence
	         */
	        this.operators = {
	            '"': '"',
	            '(': ')',
	            '<': '>',
	            ',': '',
	            ':': ';',
	            // Semicolons are not a legal delimiter per the RFC2822 grammar other
	            // than for terminating a group, but they are also not valid for any
	            // other use in this context.  Given that some mail clients have
	            // historically allowed the semicolon as a delimiter equivalent to the
	            // comma in their UI, it makes sense to treat them the same as a comma
	            // when used outside of a group.
	            ';': ''
	        };
	    }

	    /**
	     * Tokenizes the original input string
	     *
	     * @return {Array} An array of operator|text tokens
	     */
	    tokenize() {
	        let list = [];

	        for (let i = 0, len = this.str.length; i < len; i++) {
	            let chr = this.str.charAt(i);
	            let nextChr = i < len - 1 ? this.str.charAt(i + 1) : null;
	            this.checkChar(chr, nextChr);
	        }

	        this.list.forEach(node => {
	            node.value = (node.value || '').toString().trim();
	            if (node.value) {
	                list.push(node);
	            }
	        });

	        return list;
	    }

	    /**
	     * Checks if a character is an operator or text and acts accordingly
	     *
	     * @param {String} chr Character from the address field
	     */
	    checkChar(chr, nextChr) {
	        if (this.escaped) ; else if (chr === this.operatorExpecting) {
	            this.node = {
	                type: 'operator',
	                value: chr
	            };

	            if (nextChr && ![' ', '\t', '\r', '\n', ',', ';'].includes(nextChr)) {
	                this.node.noBreak = true;
	            }

	            this.list.push(this.node);
	            this.node = null;
	            this.operatorExpecting = '';
	            this.escaped = false;

	            return;
	        } else if (!this.operatorExpecting && chr in this.operators) {
	            this.node = {
	                type: 'operator',
	                value: chr
	            };
	            this.list.push(this.node);
	            this.node = null;
	            this.operatorExpecting = this.operators[chr];
	            this.escaped = false;
	            return;
	        } else if (['"', "'"].includes(this.operatorExpecting) && chr === '\\') {
	            this.escaped = true;
	            return;
	        }

	        if (!this.node) {
	            this.node = {
	                type: 'text',
	                value: ''
	            };
	            this.list.push(this.node);
	        }

	        if (chr === '\n') {
	            // Convert newlines to spaces. Carriage return is ignored as \r and \n usually
	            // go together anyway and there already is a WS for \n. Lone \r means something is fishy.
	            chr = ' ';
	        }

	        if (chr.charCodeAt(0) >= 0x21 || [' ', '\t'].includes(chr)) {
	            // skip command bytes
	            this.node.value += chr;
	        }

	        this.escaped = false;
	    }
	}

	/**
	 * Maximum recursion depth for parsing nested groups.
	 * RFC 5322 doesn't allow nested groups, so this is a safeguard against
	 * malicious input that could cause stack overflow.
	 */
	const MAX_NESTED_GROUP_DEPTH = 50;

	/**
	 * Parses structured e-mail addresses from an address field
	 *
	 * Example:
	 *
	 *    'Name <address@domain>'
	 *
	 * will be converted to
	 *
	 *     [{name: 'Name', address: 'address@domain'}]
	 *
	 * @param {String} str Address field
	 * @param {Object} options Optional options object
	 * @param {Number} options._depth Internal recursion depth counter (do not set manually)
	 * @return {Array} An array of address objects
	 */
	function addressparser(str, options) {
	    options = options || {};
	    let depth = options._depth || 0;

	    // Prevent stack overflow from deeply nested groups (DoS protection)
	    if (depth > MAX_NESTED_GROUP_DEPTH) {
	        return [];
	    }

	    let tokenizer = new Tokenizer(str);
	    let tokens = tokenizer.tokenize();

	    let addresses = [];
	    let address = [];
	    let parsedAddresses = [];

	    tokens.forEach(token => {
	        if (token.type === 'operator' && (token.value === ',' || token.value === ';')) {
	            if (address.length) {
	                addresses.push(address);
	            }
	            address = [];
	        } else {
	            address.push(token);
	        }
	    });

	    if (address.length) {
	        addresses.push(address);
	    }

	    addresses.forEach(address => {
	        address = _handleAddress(address, depth);
	        if (address.length) {
	            parsedAddresses = parsedAddresses.concat(address);
	        }
	    });

	    if (options.flatten) {
	        let addresses = [];
	        let walkAddressList = list => {
	            list.forEach(address => {
	                if (address.group) {
	                    return walkAddressList(address.group);
	                } else {
	                    addresses.push(address);
	                }
	            });
	        };
	        walkAddressList(parsedAddresses);
	        return addresses;
	    }

	    return parsedAddresses;
	}

	// expose to the world
	addressparser_1 = addressparser;
	return addressparser_1;
}

var lastNewline;
var hasRequiredLastNewline;

function requireLastNewline () {
	if (hasRequiredLastNewline) return lastNewline;
	hasRequiredLastNewline = 1;

	const Transform = require$$0$2.Transform;

	class LastNewline extends Transform {
	    constructor() {
	        super();
	        this.lastByte = false;
	    }

	    _transform(chunk, encoding, done) {
	        if (chunk.length) {
	            this.lastByte = chunk[chunk.length - 1];
	        }

	        this.push(chunk);
	        done();
	    }

	    _flush(done) {
	        if (this.lastByte === 0x0a) {
	            return done();
	        }
	        if (this.lastByte === 0x0d) {
	            this.push(Buffer.from('\n'));
	            return done();
	        }
	        this.push(Buffer.from('\r\n'));
	        return done();
	    }
	}

	lastNewline = LastNewline;
	return lastNewline;
}

var leWindows;
var hasRequiredLeWindows;

function requireLeWindows () {
	if (hasRequiredLeWindows) return leWindows;
	hasRequiredLeWindows = 1;

	const stream = require$$0$2;
	const Transform = stream.Transform;

	/**
	 * Ensures that only <CR><LF> sequences are used for linebreaks
	 *
	 * @param {Object} options Stream options
	 */
	class LeWindows extends Transform {
	    constructor(options) {
	        super(options);
	        // init Transform
	        this.options = options || {};
	        this.lastByte = false;
	    }

	    /**
	     * Escapes dots
	     */
	    _transform(chunk, encoding, done) {
	        let buf;
	        let lastPos = 0;

	        for (let i = 0, len = chunk.length; i < len; i++) {
	            if (chunk[i] === 0x0a) {
	                // \n
	                if ((i && chunk[i - 1] !== 0x0d) || (!i && this.lastByte !== 0x0d)) {
	                    if (i > lastPos) {
	                        buf = chunk.slice(lastPos, i);
	                        this.push(buf);
	                    }
	                    this.push(Buffer.from('\r\n'));
	                    lastPos = i + 1;
	                }
	            }
	        }

	        if (lastPos && lastPos < chunk.length) {
	            buf = chunk.slice(lastPos);
	            this.push(buf);
	        } else if (!lastPos) {
	            this.push(chunk);
	        }

	        this.lastByte = chunk[chunk.length - 1];
	        done();
	    }
	}

	leWindows = LeWindows;
	return leWindows;
}

var leUnix;
var hasRequiredLeUnix;

function requireLeUnix () {
	if (hasRequiredLeUnix) return leUnix;
	hasRequiredLeUnix = 1;

	const stream = require$$0$2;
	const Transform = stream.Transform;

	/**
	 * Ensures that only <LF> is used for linebreaks
	 *
	 * @param {Object} options Stream options
	 */
	class LeWindows extends Transform {
	    constructor(options) {
	        super(options);
	        // init Transform
	        this.options = options || {};
	    }

	    /**
	     * Escapes dots
	     */
	    _transform(chunk, encoding, done) {
	        let buf;
	        let lastPos = 0;

	        for (let i = 0, len = chunk.length; i < len; i++) {
	            if (chunk[i] === 0x0d) {
	                // \n
	                buf = chunk.slice(lastPos, i);
	                lastPos = i + 1;
	                this.push(buf);
	            }
	        }
	        if (lastPos && lastPos < chunk.length) {
	            buf = chunk.slice(lastPos);
	            this.push(buf);
	        } else if (!lastPos) {
	            this.push(chunk);
	        }
	        done();
	    }
	}

	leUnix = LeWindows;
	return leUnix;
}

/* eslint no-undefined: 0, prefer-spread: 0, no-control-regex: 0 */

var mimeNode;
var hasRequiredMimeNode;

function requireMimeNode () {
	if (hasRequiredMimeNode) return mimeNode;
	hasRequiredMimeNode = 1;

	const crypto = crypto__default;
	const fs = NFS;
	const punycode = requirePunycode();
	const PassThrough = require$$0$2.PassThrough;
	const shared = requireShared();

	const mimeFuncs = requireMimeFuncs();
	const qp = requireQp();
	const base64 = requireBase64();
	const addressparser = requireAddressparser();
	const nmfetch = requireFetch();
	const LastNewline = requireLastNewline();

	const LeWindows = requireLeWindows();
	const LeUnix = requireLeUnix();

	/**
	 * Creates a new mime tree node. Assumes 'multipart/*' as the content type
	 * if it is a branch, anything else counts as leaf. If rootNode is missing from
	 * the options, assumes this is the root.
	 *
	 * @param {String} contentType Define the content type for the node. Can be left blank for attachments (derived from filename)
	 * @param {Object} [options] optional options
	 * @param {Object} [options.rootNode] root node for this tree
	 * @param {Object} [options.parentNode] immediate parent for this node
	 * @param {Object} [options.filename] filename for an attachment node
	 * @param {String} [options.baseBoundary] shared part of the unique multipart boundary
	 * @param {Boolean} [options.keepBcc] If true, do not exclude Bcc from the generated headers
	 * @param {Function} [options.normalizeHeaderKey] method to normalize header keys for custom caseing
	 * @param {String} [options.textEncoding] either 'Q' (the default) or 'B'
	 */
	class MimeNode {
	    constructor(contentType, options) {
	        this.nodeCounter = 0;

	        options = options || {};

	        /**
	         * shared part of the unique multipart boundary
	         */
	        this.baseBoundary = options.baseBoundary || crypto.randomBytes(8).toString('hex');
	        this.boundaryPrefix = options.boundaryPrefix || '--_NmP';

	        this.disableFileAccess = !!options.disableFileAccess;
	        this.disableUrlAccess = !!options.disableUrlAccess;

	        this.normalizeHeaderKey = options.normalizeHeaderKey;

	        /**
	         * If date headers is missing and current node is the root, this value is used instead
	         */
	        this.date = new Date();

	        /**
	         * Root node for current mime tree
	         */
	        this.rootNode = options.rootNode || this;

	        /**
	         * If true include Bcc in generated headers (if available)
	         */
	        this.keepBcc = !!options.keepBcc;

	        /**
	         * If filename is specified but contentType is not (probably an attachment)
	         * detect the content type from filename extension
	         */
	        if (options.filename) {
	            /**
	             * Filename for this node. Useful with attachments
	             */
	            this.filename = options.filename;
	            if (!contentType) {
	                contentType = mimeFuncs.detectMimeType(this.filename.split('.').pop());
	            }
	        }

	        /**
	         * Indicates which encoding should be used for header strings: "Q" or "B"
	         */
	        this.textEncoding = (options.textEncoding || '').toString().trim().charAt(0).toUpperCase();

	        /**
	         * Immediate parent for this node (or undefined if not set)
	         */
	        this.parentNode = options.parentNode;

	        /**
	         * Hostname for default message-id values
	         */
	        this.hostname = options.hostname;

	        /**
	         * If set to 'win' then uses \r\n, if 'linux' then \n. If not set (or `raw` is used) then newlines are kept as is.
	         */
	        this.newline = options.newline;

	        /**
	         * An array for possible child nodes
	         */
	        this.childNodes = [];

	        /**
	         * Used for generating unique boundaries (prepended to the shared base)
	         */
	        this._nodeId = ++this.rootNode.nodeCounter;

	        /**
	         * A list of header values for this node in the form of [{key:'', value:''}]
	         */
	        this._headers = [];

	        /**
	         * True if the content only uses ASCII printable characters
	         * @type {Boolean}
	         */
	        this._isPlainText = false;

	        /**
	         * True if the content is plain text but has longer lines than allowed
	         * @type {Boolean}
	         */
	        this._hasLongLines = false;

	        /**
	         * If set, use instead this value for envelopes instead of generating one
	         * @type {Boolean}
	         */
	        this._envelope = false;

	        /**
	         * If set then use this value as the stream content instead of building it
	         * @type {String|Buffer|Stream}
	         */
	        this._raw = false;

	        /**
	         * Additional transform streams that the message will be piped before
	         * exposing by createReadStream
	         * @type {Array}
	         */
	        this._transforms = [];

	        /**
	         * Additional process functions that the message will be piped through before
	         * exposing by createReadStream. These functions are run after transforms
	         * @type {Array}
	         */
	        this._processFuncs = [];

	        /**
	         * If content type is set (or derived from the filename) add it to headers
	         */
	        if (contentType) {
	            this.setHeader('Content-Type', contentType);
	        }
	    }

	    /////// PUBLIC METHODS

	    /**
	     * Creates and appends a child node.Arguments provided are passed to MimeNode constructor
	     *
	     * @param {String} [contentType] Optional content type
	     * @param {Object} [options] Optional options object
	     * @return {Object} Created node object
	     */
	    createChild(contentType, options) {
	        if (!options && typeof contentType === 'object') {
	            options = contentType;
	            contentType = undefined;
	        }
	        let node = new MimeNode(contentType, options);
	        this.appendChild(node);
	        return node;
	    }

	    /**
	     * Appends an existing node to the mime tree. Removes the node from an existing
	     * tree if needed
	     *
	     * @param {Object} childNode node to be appended
	     * @return {Object} Appended node object
	     */
	    appendChild(childNode) {
	        if (childNode.rootNode !== this.rootNode) {
	            childNode.rootNode = this.rootNode;
	            childNode._nodeId = ++this.rootNode.nodeCounter;
	        }

	        childNode.parentNode = this;

	        this.childNodes.push(childNode);
	        return childNode;
	    }

	    /**
	     * Replaces current node with another node
	     *
	     * @param {Object} node Replacement node
	     * @return {Object} Replacement node
	     */
	    replace(node) {
	        if (node === this) {
	            return this;
	        }

	        this.parentNode.childNodes.forEach((childNode, i) => {
	            if (childNode === this) {
	                node.rootNode = this.rootNode;
	                node.parentNode = this.parentNode;
	                node._nodeId = this._nodeId;

	                this.rootNode = this;
	                this.parentNode = undefined;

	                node.parentNode.childNodes[i] = node;
	            }
	        });

	        return node;
	    }

	    /**
	     * Removes current node from the mime tree
	     *
	     * @return {Object} removed node
	     */
	    remove() {
	        if (!this.parentNode) {
	            return this;
	        }

	        for (let i = this.parentNode.childNodes.length - 1; i >= 0; i--) {
	            if (this.parentNode.childNodes[i] === this) {
	                this.parentNode.childNodes.splice(i, 1);
	                this.parentNode = undefined;
	                this.rootNode = this;
	                return this;
	            }
	        }
	    }

	    /**
	     * Sets a header value. If the value for selected key exists, it is overwritten.
	     * You can set multiple values as well by using [{key:'', value:''}] or
	     * {key: 'value'} as the first argument.
	     *
	     * @param {String|Array|Object} key Header key or a list of key value pairs
	     * @param {String} value Header value
	     * @return {Object} current node
	     */
	    setHeader(key, value) {
	        let added = false,
	            headerValue;

	        // Allow setting multiple headers at once
	        if (!value && key && typeof key === 'object') {
	            // allow {key:'content-type', value: 'text/plain'}
	            if (key.key && 'value' in key) {
	                this.setHeader(key.key, key.value);
	            } else if (Array.isArray(key)) {
	                // allow [{key:'content-type', value: 'text/plain'}]
	                key.forEach(i => {
	                    this.setHeader(i.key, i.value);
	                });
	            } else {
	                // allow {'content-type': 'text/plain'}
	                Object.keys(key).forEach(i => {
	                    this.setHeader(i, key[i]);
	                });
	            }
	            return this;
	        }

	        key = this._normalizeHeaderKey(key);

	        headerValue = {
	            key,
	            value
	        };

	        // Check if the value exists and overwrite
	        for (let i = 0, len = this._headers.length; i < len; i++) {
	            if (this._headers[i].key === key) {
	                if (!added) {
	                    // replace the first match
	                    this._headers[i] = headerValue;
	                    added = true;
	                } else {
	                    // remove following matches
	                    this._headers.splice(i, 1);
	                    i--;
	                    len--;
	                }
	            }
	        }

	        // match not found, append the value
	        if (!added) {
	            this._headers.push(headerValue);
	        }

	        return this;
	    }

	    /**
	     * Adds a header value. If the value for selected key exists, the value is appended
	     * as a new field and old one is not touched.
	     * You can set multiple values as well by using [{key:'', value:''}] or
	     * {key: 'value'} as the first argument.
	     *
	     * @param {String|Array|Object} key Header key or a list of key value pairs
	     * @param {String} value Header value
	     * @return {Object} current node
	     */
	    addHeader(key, value) {
	        // Allow setting multiple headers at once
	        if (!value && key && typeof key === 'object') {
	            // allow {key:'content-type', value: 'text/plain'}
	            if (key.key && key.value) {
	                this.addHeader(key.key, key.value);
	            } else if (Array.isArray(key)) {
	                // allow [{key:'content-type', value: 'text/plain'}]
	                key.forEach(i => {
	                    this.addHeader(i.key, i.value);
	                });
	            } else {
	                // allow {'content-type': 'text/plain'}
	                Object.keys(key).forEach(i => {
	                    this.addHeader(i, key[i]);
	                });
	            }
	            return this;
	        } else if (Array.isArray(value)) {
	            value.forEach(val => {
	                this.addHeader(key, val);
	            });
	            return this;
	        }

	        this._headers.push({
	            key: this._normalizeHeaderKey(key),
	            value
	        });

	        return this;
	    }

	    /**
	     * Retrieves the first mathcing value of a selected key
	     *
	     * @param {String} key Key to search for
	     * @retun {String} Value for the key
	     */
	    getHeader(key) {
	        key = this._normalizeHeaderKey(key);
	        for (let i = 0, len = this._headers.length; i < len; i++) {
	            if (this._headers[i].key === key) {
	                return this._headers[i].value;
	            }
	        }
	    }

	    /**
	     * Sets body content for current node. If the value is a string, charset is added automatically
	     * to Content-Type (if it is text/*). If the value is a Buffer, you need to specify
	     * the charset yourself
	     *
	     * @param (String|Buffer) content Body content
	     * @return {Object} current node
	     */
	    setContent(content) {
	        this.content = content;
	        if (typeof this.content.pipe === 'function') {
	            // pre-stream handler. might be triggered if a stream is set as content
	            // and 'error' fires before anything is done with this stream
	            this._contentErrorHandler = err => {
	                this.content.removeListener('error', this._contentErrorHandler);
	                this.content = err;
	            };
	            this.content.once('error', this._contentErrorHandler);
	        } else if (typeof this.content === 'string') {
	            this._isPlainText = mimeFuncs.isPlainText(this.content);
	            if (this._isPlainText && mimeFuncs.hasLongerLines(this.content, 76)) {
	                // If there are lines longer than 76 symbols/bytes do not use 7bit
	                this._hasLongLines = true;
	            }
	        }
	        return this;
	    }

	    build(callback) {
	        let promise;

	        if (!callback) {
	            promise = new Promise((resolve, reject) => {
	                callback = shared.callbackPromise(resolve, reject);
	            });
	        }

	        let stream = this.createReadStream();
	        let buf = [];
	        let buflen = 0;
	        let returned = false;

	        stream.on('readable', () => {
	            let chunk;

	            while ((chunk = stream.read()) !== null) {
	                buf.push(chunk);
	                buflen += chunk.length;
	            }
	        });

	        stream.once('error', err => {
	            if (returned) {
	                return;
	            }
	            returned = true;

	            return callback(err);
	        });

	        stream.once('end', chunk => {
	            if (returned) {
	                return;
	            }
	            returned = true;

	            if (chunk && chunk.length) {
	                buf.push(chunk);
	                buflen += chunk.length;
	            }
	            return callback(null, Buffer.concat(buf, buflen));
	        });

	        return promise;
	    }

	    getTransferEncoding() {
	        let transferEncoding = false;
	        let contentType = (this.getHeader('Content-Type') || '').toString().toLowerCase().trim();

	        if (this.content) {
	            transferEncoding = (this.getHeader('Content-Transfer-Encoding') || '').toString().toLowerCase().trim();
	            if (!transferEncoding || !['base64', 'quoted-printable'].includes(transferEncoding)) {
	                if (/^text\//i.test(contentType)) {
	                    // If there are no special symbols, no need to modify the text
	                    if (this._isPlainText && !this._hasLongLines) {
	                        transferEncoding = '7bit';
	                    } else if (typeof this.content === 'string' || this.content instanceof Buffer) {
	                        // detect preferred encoding for string value
	                        transferEncoding = this._getTextEncoding(this.content) === 'Q' ? 'quoted-printable' : 'base64';
	                    } else {
	                        // we can not check content for a stream, so either use preferred encoding or fallback to QP
	                        transferEncoding = this.textEncoding === 'B' ? 'base64' : 'quoted-printable';
	                    }
	                } else if (!/^(multipart|message)\//i.test(contentType)) {
	                    transferEncoding = transferEncoding || 'base64';
	                }
	            }
	        }
	        return transferEncoding;
	    }

	    /**
	     * Builds the header block for the mime node. Append \r\n\r\n before writing the content
	     *
	     * @returns {String} Headers
	     */
	    buildHeaders() {
	        let transferEncoding = this.getTransferEncoding();
	        let headers = [];

	        if (transferEncoding) {
	            this.setHeader('Content-Transfer-Encoding', transferEncoding);
	        }

	        if (this.filename && !this.getHeader('Content-Disposition')) {
	            this.setHeader('Content-Disposition', 'attachment');
	        }

	        // Ensure mandatory header fields
	        if (this.rootNode === this) {
	            if (!this.getHeader('Date')) {
	                this.setHeader('Date', this.date.toUTCString().replace(/GMT/, '+0000'));
	            }

	            // ensure that Message-Id is present
	            this.messageId();

	            if (!this.getHeader('MIME-Version')) {
	                this.setHeader('MIME-Version', '1.0');
	            }

	            // Ensure that Content-Type is the last header for the root node
	            for (let i = this._headers.length - 2; i >= 0; i--) {
	                let header = this._headers[i];
	                if (header.key === 'Content-Type') {
	                    this._headers.splice(i, 1);
	                    this._headers.push(header);
	                }
	            }
	        }

	        this._headers.forEach(header => {
	            let key = header.key;
	            let value = header.value;
	            let structured;
	            let param;
	            let options = {};
	            let formattedHeaders = ['From', 'Sender', 'To', 'Cc', 'Bcc', 'Reply-To', 'Date', 'References'];

	            if (value && typeof value === 'object' && !formattedHeaders.includes(key)) {
	                Object.keys(value).forEach(key => {
	                    if (key !== 'value') {
	                        options[key] = value[key];
	                    }
	                });
	                value = (value.value || '').toString();
	                if (!value.trim()) {
	                    return;
	                }
	            }

	            if (options.prepared) {
	                // header value is
	                if (options.foldLines) {
	                    headers.push(mimeFuncs.foldLines(key + ': ' + value));
	                } else {
	                    headers.push(key + ': ' + value);
	                }
	                return;
	            }

	            switch (header.key) {
	                case 'Content-Disposition':
	                    structured = mimeFuncs.parseHeaderValue(value);
	                    if (this.filename) {
	                        structured.params.filename = this.filename;
	                    }
	                    value = mimeFuncs.buildHeaderValue(structured);
	                    break;

	                case 'Content-Type':
	                    structured = mimeFuncs.parseHeaderValue(value);

	                    this._handleContentType(structured);

	                    if (
	                        structured.value.match(/^text\/plain\b/) &&
	                        typeof this.content === 'string' &&
	                        /[\u0080-\uFFFF]/.test(this.content)
	                    ) {
	                        structured.params.charset = 'utf-8';
	                    }

	                    value = mimeFuncs.buildHeaderValue(structured);

	                    if (this.filename) {
	                        // add support for non-compliant clients like QQ webmail
	                        // we can't build the value with buildHeaderValue as the value is non standard and
	                        // would be converted to parameter continuation encoding that we do not want
	                        param = this._encodeWords(this.filename);

	                        if (param !== this.filename || /[\s'"\\;:/=(),<>@[\]?]|^-/.test(param)) {
	                            // include value in quotes if needed
	                            param = '"' + param + '"';
	                        }
	                        value += '; name=' + param;
	                    }
	                    break;

	                case 'Bcc':
	                    if (!this.keepBcc) {
	                        // skip BCC values
	                        return;
	                    }
	                    break;
	            }

	            value = this._encodeHeaderValue(key, value);

	            // skip empty lines
	            if (!(value || '').toString().trim()) {
	                return;
	            }

	            if (typeof this.normalizeHeaderKey === 'function') {
	                let normalized = this.normalizeHeaderKey(key, value);
	                if (normalized && typeof normalized === 'string' && normalized.length) {
	                    key = normalized;
	                }
	            }

	            headers.push(mimeFuncs.foldLines(key + ': ' + value, 76));
	        });

	        return headers.join('\r\n');
	    }

	    /**
	     * Streams the rfc2822 message from the current node. If this is a root node,
	     * mandatory header fields are set if missing (Date, Message-Id, MIME-Version)
	     *
	     * @return {String} Compiled message
	     */
	    createReadStream(options) {
	        options = options || {};

	        let stream = new PassThrough(options);
	        let outputStream = stream;
	        let transform;

	        this.stream(stream, options, err => {
	            if (err) {
	                outputStream.emit('error', err);
	                return;
	            }
	            stream.end();
	        });

	        for (let i = 0, len = this._transforms.length; i < len; i++) {
	            transform = typeof this._transforms[i] === 'function' ? this._transforms[i]() : this._transforms[i];
	            outputStream.once('error', err => {
	                transform.emit('error', err);
	            });
	            outputStream = outputStream.pipe(transform);
	        }

	        // ensure terminating newline after possible user transforms
	        transform = new LastNewline();
	        outputStream.once('error', err => {
	            transform.emit('error', err);
	        });
	        outputStream = outputStream.pipe(transform);

	        // dkim and stuff
	        for (let i = 0, len = this._processFuncs.length; i < len; i++) {
	            transform = this._processFuncs[i];
	            outputStream = transform(outputStream);
	        }

	        if (this.newline) {
	            const winbreak = ['win', 'windows', 'dos', '\r\n'].includes(this.newline.toString().toLowerCase());
	            const newlineTransform = winbreak ? new LeWindows() : new LeUnix();

	            const stream = outputStream.pipe(newlineTransform);
	            outputStream.on('error', err => stream.emit('error', err));
	            return stream;
	        }

	        return outputStream;
	    }

	    /**
	     * Appends a transform stream object to the transforms list. Final output
	     * is passed through this stream before exposing
	     *
	     * @param {Object} transform Read-Write stream
	     */
	    transform(transform) {
	        this._transforms.push(transform);
	    }

	    /**
	     * Appends a post process function. The functon is run after transforms and
	     * uses the following syntax
	     *
	     *   processFunc(input) -> outputStream
	     *
	     * @param {Object} processFunc Read-Write stream
	     */
	    processFunc(processFunc) {
	        this._processFuncs.push(processFunc);
	    }

	    stream(outputStream, options, done) {
	        let transferEncoding = this.getTransferEncoding();
	        let contentStream;
	        let localStream;

	        // protect actual callback against multiple triggering
	        let returned = false;
	        let callback = err => {
	            if (returned) {
	                return;
	            }
	            returned = true;
	            done(err);
	        };

	        // for multipart nodes, push child nodes
	        // for content nodes end the stream
	        let finalize = () => {
	            let childId = 0;
	            let processChildNode = () => {
	                if (childId >= this.childNodes.length) {
	                    outputStream.write('\r\n--' + this.boundary + '--\r\n');
	                    return callback();
	                }
	                let child = this.childNodes[childId++];
	                outputStream.write((childId > 1 ? '\r\n' : '') + '--' + this.boundary + '\r\n');
	                child.stream(outputStream, options, err => {
	                    if (err) {
	                        return callback(err);
	                    }
	                    setImmediate(processChildNode);
	                });
	            };

	            if (this.multipart) {
	                setImmediate(processChildNode);
	            } else {
	                return callback();
	            }
	        };

	        // pushes node content
	        let sendContent = () => {
	            if (this.content) {
	                if (Object.prototype.toString.call(this.content) === '[object Error]') {
	                    // content is already errored
	                    return callback(this.content);
	                }

	                if (typeof this.content.pipe === 'function') {
	                    this.content.removeListener('error', this._contentErrorHandler);
	                    this._contentErrorHandler = err => callback(err);
	                    this.content.once('error', this._contentErrorHandler);
	                }

	                let createStream = () => {
	                    if (['quoted-printable', 'base64'].includes(transferEncoding)) {
	                        contentStream = new (transferEncoding === 'base64' ? base64 : qp).Encoder(options);

	                        contentStream.pipe(outputStream, {
	                            end: false
	                        });
	                        contentStream.once('end', finalize);
	                        contentStream.once('error', err => callback(err));

	                        localStream = this._getStream(this.content);
	                        localStream.pipe(contentStream);
	                    } else {
	                        // anything that is not QP or Base54 passes as-is
	                        localStream = this._getStream(this.content);
	                        localStream.pipe(outputStream, {
	                            end: false
	                        });
	                        localStream.once('end', finalize);
	                    }

	                    localStream.once('error', err => callback(err));
	                };

	                if (this.content._resolve) {
	                    let chunks = [];
	                    let chunklen = 0;
	                    let returned = false;
	                    let sourceStream = this._getStream(this.content);
	                    sourceStream.on('error', err => {
	                        if (returned) {
	                            return;
	                        }
	                        returned = true;
	                        callback(err);
	                    });
	                    sourceStream.on('readable', () => {
	                        let chunk;
	                        while ((chunk = sourceStream.read()) !== null) {
	                            chunks.push(chunk);
	                            chunklen += chunk.length;
	                        }
	                    });
	                    sourceStream.on('end', () => {
	                        if (returned) {
	                            return;
	                        }
	                        returned = true;
	                        this.content._resolve = false;
	                        this.content._resolvedValue = Buffer.concat(chunks, chunklen);
	                        setImmediate(createStream);
	                    });
	                } else {
	                    setImmediate(createStream);
	                }
	                return;
	            } else {
	                return setImmediate(finalize);
	            }
	        };

	        if (this._raw) {
	            setImmediate(() => {
	                if (Object.prototype.toString.call(this._raw) === '[object Error]') {
	                    // content is already errored
	                    return callback(this._raw);
	                }

	                // remove default error handler (if set)
	                if (typeof this._raw.pipe === 'function') {
	                    this._raw.removeListener('error', this._contentErrorHandler);
	                }

	                let raw = this._getStream(this._raw);
	                raw.pipe(outputStream, {
	                    end: false
	                });
	                raw.on('error', err => outputStream.emit('error', err));
	                raw.on('end', finalize);
	            });
	        } else {
	            outputStream.write(this.buildHeaders() + '\r\n\r\n');
	            setImmediate(sendContent);
	        }
	    }

	    /**
	     * Sets envelope to be used instead of the generated one
	     *
	     * @return {Object} SMTP envelope in the form of {from: 'from@example.com', to: ['to@example.com']}
	     */
	    setEnvelope(envelope) {
	        let list;

	        this._envelope = {
	            from: false,
	            to: []
	        };

	        if (envelope.from) {
	            list = [];
	            this._convertAddresses(this._parseAddresses(envelope.from), list);
	            list = list.filter(address => address && address.address);
	            if (list.length && list[0]) {
	                this._envelope.from = list[0].address;
	            }
	        }
	        ['to', 'cc', 'bcc'].forEach(key => {
	            if (envelope[key]) {
	                this._convertAddresses(this._parseAddresses(envelope[key]), this._envelope.to);
	            }
	        });

	        this._envelope.to = this._envelope.to.map(to => to.address).filter(address => address);

	        let standardFields = ['to', 'cc', 'bcc', 'from'];
	        Object.keys(envelope).forEach(key => {
	            if (!standardFields.includes(key)) {
	                this._envelope[key] = envelope[key];
	            }
	        });

	        return this;
	    }

	    /**
	     * Generates and returns an object with parsed address fields
	     *
	     * @return {Object} Address object
	     */
	    getAddresses() {
	        let addresses = {};

	        this._headers.forEach(header => {
	            let key = header.key.toLowerCase();
	            if (['from', 'sender', 'reply-to', 'to', 'cc', 'bcc'].includes(key)) {
	                if (!Array.isArray(addresses[key])) {
	                    addresses[key] = [];
	                }

	                this._convertAddresses(this._parseAddresses(header.value), addresses[key]);
	            }
	        });

	        return addresses;
	    }

	    /**
	     * Generates and returns SMTP envelope with the sender address and a list of recipients addresses
	     *
	     * @return {Object} SMTP envelope in the form of {from: 'from@example.com', to: ['to@example.com']}
	     */
	    getEnvelope() {
	        if (this._envelope) {
	            return this._envelope;
	        }

	        let envelope = {
	            from: false,
	            to: []
	        };
	        this._headers.forEach(header => {
	            let list = [];
	            if (header.key === 'From' || (!envelope.from && ['Reply-To', 'Sender'].includes(header.key))) {
	                this._convertAddresses(this._parseAddresses(header.value), list);
	                if (list.length && list[0]) {
	                    envelope.from = list[0].address;
	                }
	            } else if (['To', 'Cc', 'Bcc'].includes(header.key)) {
	                this._convertAddresses(this._parseAddresses(header.value), envelope.to);
	            }
	        });

	        envelope.to = envelope.to.map(to => to.address);

	        return envelope;
	    }

	    /**
	     * Returns Message-Id value. If it does not exist, then creates one
	     *
	     * @return {String} Message-Id value
	     */
	    messageId() {
	        let messageId = this.getHeader('Message-ID');
	        // You really should define your own Message-Id field!
	        if (!messageId) {
	            messageId = this._generateMessageId();
	            this.setHeader('Message-ID', messageId);
	        }
	        return messageId;
	    }

	    /**
	     * Sets pregenerated content that will be used as the output of this node
	     *
	     * @param {String|Buffer|Stream} Raw MIME contents
	     */
	    setRaw(raw) {
	        this._raw = raw;

	        if (this._raw && typeof this._raw.pipe === 'function') {
	            // pre-stream handler. might be triggered if a stream is set as content
	            // and 'error' fires before anything is done with this stream
	            this._contentErrorHandler = err => {
	                this._raw.removeListener('error', this._contentErrorHandler);
	                this._raw = err;
	            };
	            this._raw.once('error', this._contentErrorHandler);
	        }

	        return this;
	    }

	    /////// PRIVATE METHODS

	    /**
	     * Detects and returns handle to a stream related with the content.
	     *
	     * @param {Mixed} content Node content
	     * @returns {Object} Stream object
	     */
	    _getStream(content) {
	        let contentStream;

	        if (content._resolvedValue) {
	            // pass string or buffer content as a stream
	            contentStream = new PassThrough();

	            setImmediate(() => {
	                try {
	                    contentStream.end(content._resolvedValue);
	                } catch (_err) {
	                    contentStream.emit('error', _err);
	                }
	            });

	            return contentStream;
	        } else if (typeof content.pipe === 'function') {
	            // assume as stream
	            return content;
	        } else if (content && typeof content.path === 'string' && !content.href) {
	            if (this.disableFileAccess) {
	                contentStream = new PassThrough();
	                setImmediate(() => contentStream.emit('error', new Error('File access rejected for ' + content.path)));
	                return contentStream;
	            }
	            // read file
	            return fs.createReadStream(content.path);
	        } else if (content && typeof content.href === 'string') {
	            if (this.disableUrlAccess) {
	                contentStream = new PassThrough();
	                setImmediate(() => contentStream.emit('error', new Error('Url access rejected for ' + content.href)));
	                return contentStream;
	            }
	            // fetch URL
	            return nmfetch(content.href, { headers: content.httpHeaders });
	        } else {
	            // pass string or buffer content as a stream
	            contentStream = new PassThrough();

	            setImmediate(() => {
	                try {
	                    contentStream.end(content || '');
	                } catch (_err) {
	                    contentStream.emit('error', _err);
	                }
	            });
	            return contentStream;
	        }
	    }

	    /**
	     * Parses addresses. Takes in a single address or an array or an
	     * array of address arrays (eg. To: [[first group], [second group],...])
	     *
	     * @param {Mixed} addresses Addresses to be parsed
	     * @return {Array} An array of address objects
	     */
	    _parseAddresses(addresses) {
	        return [].concat.apply(
	            [],
	            [].concat(addresses).map(address => {
	                if (address && address.address) {
	                    address.address = this._normalizeAddress(address.address);
	                    address.name = address.name || '';
	                    return [address];
	                }
	                return addressparser(address);
	            })
	        );
	    }

	    /**
	     * Normalizes a header key, uses Camel-Case form, except for uppercase MIME-
	     *
	     * @param {String} key Key to be normalized
	     * @return {String} key in Camel-Case form
	     */
	    _normalizeHeaderKey(key) {
	        key = (key || '')
	            .toString()
	            // no newlines in keys
	            .replace(/\r?\n|\r/g, ' ')
	            .trim()
	            .toLowerCase()
	            // use uppercase words, except MIME
	            .replace(/^X-SMTPAPI$|^(MIME|DKIM|ARC|BIMI)\b|^[a-z]|-(SPF|FBL|ID|MD5)$|-[a-z]/gi, c => c.toUpperCase())
	            // special case
	            .replace(/^Content-Features$/i, 'Content-features');

	        return key;
	    }

	    /**
	     * Checks if the content type is multipart and defines boundary if needed.
	     * Doesn't return anything, modifies object argument instead.
	     *
	     * @param {Object} structured Parsed header value for 'Content-Type' key
	     */
	    _handleContentType(structured) {
	        this.contentType = structured.value.trim().toLowerCase();

	        this.multipart = /^multipart\//i.test(this.contentType) ? this.contentType.substr(this.contentType.indexOf('/') + 1) : false;

	        if (this.multipart) {
	            this.boundary = structured.params.boundary = structured.params.boundary || this.boundary || this._generateBoundary();
	        } else {
	            this.boundary = false;
	        }
	    }

	    /**
	     * Generates a multipart boundary value
	     *
	     * @return {String} boundary value
	     */
	    _generateBoundary() {
	        return this.rootNode.boundaryPrefix + '-' + this.rootNode.baseBoundary + '-Part_' + this._nodeId;
	    }

	    /**
	     * Encodes a header value for use in the generated rfc2822 email.
	     *
	     * @param {String} key Header key
	     * @param {String} value Header value
	     */
	    _encodeHeaderValue(key, value) {
	        key = this._normalizeHeaderKey(key);

	        switch (key) {
	            // Structured headers
	            case 'From':
	            case 'Sender':
	            case 'To':
	            case 'Cc':
	            case 'Bcc':
	            case 'Reply-To':
	                return this._convertAddresses(this._parseAddresses(value));

	            // values enclosed in <>
	            case 'Message-ID':
	            case 'In-Reply-To':
	            case 'Content-Id':
	                value = (value || '').toString().replace(/\r?\n|\r/g, ' ');

	                if (value.charAt(0) !== '<') {
	                    value = '<' + value;
	                }

	                if (value.charAt(value.length - 1) !== '>') {
	                    value = value + '>';
	                }
	                return value;

	            // space separated list of values enclosed in <>
	            case 'References':
	                value = [].concat
	                    .apply(
	                        [],
	                        [].concat(value || '').map(elm => {
	                            elm = (elm || '')
	                                .toString()
	                                .replace(/\r?\n|\r/g, ' ')
	                                .trim();
	                            return elm.replace(/<[^>]*>/g, str => str.replace(/\s/g, '')).split(/\s+/);
	                        })
	                    )
	                    .map(elm => {
	                        if (elm.charAt(0) !== '<') {
	                            elm = '<' + elm;
	                        }
	                        if (elm.charAt(elm.length - 1) !== '>') {
	                            elm = elm + '>';
	                        }
	                        return elm;
	                    });

	                return value.join(' ').trim();

	            case 'Date':
	                if (Object.prototype.toString.call(value) === '[object Date]') {
	                    return value.toUTCString().replace(/GMT/, '+0000');
	                }

	                value = (value || '').toString().replace(/\r?\n|\r/g, ' ');
	                return this._encodeWords(value);

	            case 'Content-Type':
	            case 'Content-Disposition':
	                // if it includes a filename then it is already encoded
	                return (value || '').toString().replace(/\r?\n|\r/g, ' ');

	            default:
	                value = (value || '').toString().replace(/\r?\n|\r/g, ' ');
	                // encodeWords only encodes if needed, otherwise the original string is returned
	                return this._encodeWords(value);
	        }
	    }

	    /**
	     * Rebuilds address object using punycode and other adjustments
	     *
	     * @param {Array} addresses An array of address objects
	     * @param {Array} [uniqueList] An array to be populated with addresses
	     * @return {String} address string
	     */
	    _convertAddresses(addresses, uniqueList) {
	        let values = [];

	        uniqueList = uniqueList || [];

	        [].concat(addresses || []).forEach(address => {
	            if (address.address) {
	                address.address = this._normalizeAddress(address.address);

	                if (!address.name) {
	                    values.push(address.address.indexOf(' ') >= 0 ? `<${address.address}>` : `${address.address}`);
	                } else if (address.name) {
	                    values.push(`${this._encodeAddressName(address.name)} <${address.address}>`);
	                }

	                if (address.address) {
	                    if (!uniqueList.filter(a => a.address === address.address).length) {
	                        uniqueList.push(address);
	                    }
	                }
	            } else if (address.group) {
	                let groupListAddresses = (address.group.length ? this._convertAddresses(address.group, uniqueList) : '').trim();
	                values.push(`${this._encodeAddressName(address.name)}:${groupListAddresses};`);
	            }
	        });

	        return values.join(', ');
	    }

	    /**
	     * Normalizes an email address
	     *
	     * @param {Array} address An array of address objects
	     * @return {String} address string
	     */
	    _normalizeAddress(address) {
	        address = (address || '')
	            .toString()
	            .replace(/[\x00-\x1F<>]+/g, ' ') // remove unallowed characters
	            .trim();

	        let lastAt = address.lastIndexOf('@');
	        if (lastAt < 0) {
	            // Bare username
	            return address;
	        }

	        let user = address.substr(0, lastAt);
	        let domain = address.substr(lastAt + 1);

	        // Usernames are not touched and are kept as is even if these include unicode
	        // Domains are punycoded by default
	        // 'jõgeva.ee' will be converted to 'xn--jgeva-dua.ee'
	        // non-unicode domains are left as is

	        let encodedDomain;

	        try {
	            encodedDomain = punycode.toASCII(domain.toLowerCase());
	        } catch (_err) {
	            // keep as is?
	        }

	        if (user.indexOf(' ') >= 0) {
	            if (user.charAt(0) !== '"') {
	                user = '"' + user;
	            }
	            if (user.substr(-1) !== '"') {
	                user = user + '"';
	            }
	        }

	        return `${user}@${encodedDomain}`;
	    }

	    /**
	     * If needed, mime encodes the name part
	     *
	     * @param {String} name Name part of an address
	     * @returns {String} Mime word encoded string if needed
	     */
	    _encodeAddressName(name) {
	        if (!/^[\w ]*$/.test(name)) {
	            if (/^[\x20-\x7e]*$/.test(name)) {
	                return '"' + name.replace(/([\\"])/g, '\\$1') + '"';
	            } else {
	                return mimeFuncs.encodeWord(name, this._getTextEncoding(name), 52);
	            }
	        }
	        return name;
	    }

	    /**
	     * If needed, mime encodes the name part
	     *
	     * @param {String} name Name part of an address
	     * @returns {String} Mime word encoded string if needed
	     */
	    _encodeWords(value) {
	        // set encodeAll parameter to true even though it is against the recommendation of RFC2047,
	        // by default only words that include non-ascii should be converted into encoded words
	        // but some clients (eg. Zimbra) do not handle it properly and remove surrounding whitespace
	        return mimeFuncs.encodeWords(value, this._getTextEncoding(value), 52, true);
	    }

	    /**
	     * Detects best mime encoding for a text value
	     *
	     * @param {String} value Value to check for
	     * @return {String} either 'Q' or 'B'
	     */
	    _getTextEncoding(value) {
	        value = (value || '').toString();

	        let encoding = this.textEncoding;
	        let latinLen;
	        let nonLatinLen;

	        if (!encoding) {
	            // count latin alphabet symbols and 8-bit range symbols + control symbols
	            // if there are more latin characters, then use quoted-printable
	            // encoding, otherwise use base64
	            nonLatinLen = (value.match(/[\x00-\x08\x0B\x0C\x0E-\x1F\u0080-\uFFFF]/g) || []).length;
	            latinLen = (value.match(/[a-z]/gi) || []).length;
	            // if there are more latin symbols than binary/unicode, then prefer Q, otherwise B
	            encoding = nonLatinLen < latinLen ? 'Q' : 'B';
	        }
	        return encoding;
	    }

	    /**
	     * Generates a message id
	     *
	     * @return {String} Random Message-ID value
	     */
	    _generateMessageId() {
	        return (
	            '<' +
	            [2, 2, 2, 6].reduce(
	                // crux to generate UUID-like random strings
	                (prev, len) => prev + '-' + crypto.randomBytes(len).toString('hex'),
	                crypto.randomBytes(4).toString('hex')
	            ) +
	            '@' +
	            // try to use the domain of the FROM address or fallback to server hostname
	            (this.getEnvelope().from || this.hostname || 'localhost').split('@').pop() +
	            '>'
	        );
	    }
	}

	mimeNode = MimeNode;
	return mimeNode;
}

/* eslint no-undefined: 0 */

var mailComposer;
var hasRequiredMailComposer;

function requireMailComposer () {
	if (hasRequiredMailComposer) return mailComposer;
	hasRequiredMailComposer = 1;

	const MimeNode = requireMimeNode();
	const mimeFuncs = requireMimeFuncs();
	const parseDataURI = requireShared().parseDataURI;

	/**
	 * Creates the object for composing a MimeNode instance out from the mail options
	 *
	 * @constructor
	 * @param {Object} mail Mail options
	 */
	class MailComposer {
	    constructor(mail) {
	        this.mail = mail || {};
	        this.message = false;
	    }

	    /**
	     * Builds MimeNode instance
	     */
	    compile() {
	        this._alternatives = this.getAlternatives();
	        this._htmlNode = this._alternatives.filter(alternative => /^text\/html\b/i.test(alternative.contentType)).pop();
	        this._attachments = this.getAttachments(!!this._htmlNode);

	        this._useRelated = !!(this._htmlNode && this._attachments.related.length);
	        this._useAlternative = this._alternatives.length > 1;
	        this._useMixed = this._attachments.attached.length > 1 || (this._alternatives.length && this._attachments.attached.length === 1);

	        // Compose MIME tree
	        if (this.mail.raw) {
	            this.message = new MimeNode('message/rfc822', { newline: this.mail.newline }).setRaw(this.mail.raw);
	        } else if (this._useMixed) {
	            this.message = this._createMixed();
	        } else if (this._useAlternative) {
	            this.message = this._createAlternative();
	        } else if (this._useRelated) {
	            this.message = this._createRelated();
	        } else {
	            this.message = this._createContentNode(
	                false,
	                []
	                    .concat(this._alternatives || [])
	                    .concat(this._attachments.attached || [])
	                    .shift() || {
	                    contentType: 'text/plain',
	                    content: ''
	                }
	            );
	        }

	        // Add custom headers
	        if (this.mail.headers) {
	            this.message.addHeader(this.mail.headers);
	        }

	        // Add headers to the root node, always overrides custom headers
	        ['from', 'sender', 'to', 'cc', 'bcc', 'reply-to', 'in-reply-to', 'references', 'subject', 'message-id', 'date'].forEach(header => {
	            let key = header.replace(/-(\w)/g, (o, c) => c.toUpperCase());
	            if (this.mail[key]) {
	                this.message.setHeader(header, this.mail[key]);
	            }
	        });

	        // Sets custom envelope
	        if (this.mail.envelope) {
	            this.message.setEnvelope(this.mail.envelope);
	        }

	        // ensure Message-Id value
	        this.message.messageId();

	        return this.message;
	    }

	    /**
	     * List all attachments. Resulting attachment objects can be used as input for MimeNode nodes
	     *
	     * @param {Boolean} findRelated If true separate related attachments from attached ones
	     * @returns {Object} An object of arrays (`related` and `attached`)
	     */
	    getAttachments(findRelated) {
	        let icalEvent, eventObject;
	        let attachments = [].concat(this.mail.attachments || []).map((attachment, i) => {
	            let data;

	            if (/^data:/i.test(attachment.path || attachment.href)) {
	                attachment = this._processDataUrl(attachment);
	            }

	            let contentType =
	                attachment.contentType || mimeFuncs.detectMimeType(attachment.filename || attachment.path || attachment.href || 'bin');

	            let isImage = /^image\//i.test(contentType);
	            let isMessageNode = /^message\//i.test(contentType);

	            let contentDisposition =
	                attachment.contentDisposition || (isMessageNode || (isImage && attachment.cid) ? 'inline' : 'attachment');

	            let contentTransferEncoding;
	            if ('contentTransferEncoding' in attachment) {
	                // also contains `false`, to set
	                contentTransferEncoding = attachment.contentTransferEncoding;
	            } else if (isMessageNode) {
	                // the content might include non-ASCII bytes but at this point we do not know it yet
	                contentTransferEncoding = '8bit';
	            } else {
	                contentTransferEncoding = 'base64'; // the default
	            }

	            data = {
	                contentType,
	                contentDisposition,
	                contentTransferEncoding
	            };

	            if (attachment.filename) {
	                data.filename = attachment.filename;
	            } else if (!isMessageNode && attachment.filename !== false) {
	                data.filename = (attachment.path || attachment.href || '').split('/').pop().split('?').shift() || 'attachment-' + (i + 1);
	                if (data.filename.indexOf('.') < 0) {
	                    data.filename += '.' + mimeFuncs.detectExtension(data.contentType);
	                }
	            }

	            if (/^https?:\/\//i.test(attachment.path)) {
	                attachment.href = attachment.path;
	                attachment.path = undefined;
	            }

	            if (attachment.cid) {
	                data.cid = attachment.cid;
	            }

	            if (attachment.raw) {
	                data.raw = attachment.raw;
	            } else if (attachment.path) {
	                data.content = {
	                    path: attachment.path
	                };
	            } else if (attachment.href) {
	                data.content = {
	                    href: attachment.href,
	                    httpHeaders: attachment.httpHeaders
	                };
	            } else {
	                data.content = attachment.content || '';
	            }

	            if (attachment.encoding) {
	                data.encoding = attachment.encoding;
	            }

	            if (attachment.headers) {
	                data.headers = attachment.headers;
	            }

	            return data;
	        });

	        if (this.mail.icalEvent) {
	            if (
	                typeof this.mail.icalEvent === 'object' &&
	                (this.mail.icalEvent.content || this.mail.icalEvent.path || this.mail.icalEvent.href || this.mail.icalEvent.raw)
	            ) {
	                icalEvent = this.mail.icalEvent;
	            } else {
	                icalEvent = {
	                    content: this.mail.icalEvent
	                };
	            }

	            eventObject = {};
	            Object.keys(icalEvent).forEach(key => {
	                eventObject[key] = icalEvent[key];
	            });

	            eventObject.contentType = 'application/ics';
	            if (!eventObject.headers) {
	                eventObject.headers = {};
	            }
	            eventObject.filename = eventObject.filename || 'invite.ics';
	            eventObject.headers['Content-Disposition'] = 'attachment';
	            eventObject.headers['Content-Transfer-Encoding'] = 'base64';
	        }

	        if (!findRelated) {
	            return {
	                attached: attachments.concat(eventObject || []),
	                related: []
	            };
	        } else {
	            return {
	                attached: attachments.filter(attachment => !attachment.cid).concat(eventObject || []),
	                related: attachments.filter(attachment => !!attachment.cid)
	            };
	        }
	    }

	    /**
	     * List alternatives. Resulting objects can be used as input for MimeNode nodes
	     *
	     * @returns {Array} An array of alternative elements. Includes the `text` and `html` values as well
	     */
	    getAlternatives() {
	        let alternatives = [],
	            text,
	            html,
	            watchHtml,
	            amp,
	            icalEvent,
	            eventObject;

	        if (this.mail.text) {
	            if (
	                typeof this.mail.text === 'object' &&
	                (this.mail.text.content || this.mail.text.path || this.mail.text.href || this.mail.text.raw)
	            ) {
	                text = this.mail.text;
	            } else {
	                text = {
	                    content: this.mail.text
	                };
	            }
	            text.contentType = 'text/plain; charset=utf-8';
	        }

	        if (this.mail.watchHtml) {
	            if (
	                typeof this.mail.watchHtml === 'object' &&
	                (this.mail.watchHtml.content || this.mail.watchHtml.path || this.mail.watchHtml.href || this.mail.watchHtml.raw)
	            ) {
	                watchHtml = this.mail.watchHtml;
	            } else {
	                watchHtml = {
	                    content: this.mail.watchHtml
	                };
	            }
	            watchHtml.contentType = 'text/watch-html; charset=utf-8';
	        }

	        if (this.mail.amp) {
	            if (
	                typeof this.mail.amp === 'object' &&
	                (this.mail.amp.content || this.mail.amp.path || this.mail.amp.href || this.mail.amp.raw)
	            ) {
	                amp = this.mail.amp;
	            } else {
	                amp = {
	                    content: this.mail.amp
	                };
	            }
	            amp.contentType = 'text/x-amp-html; charset=utf-8';
	        }

	        // NB! when including attachments with a calendar alternative you might end up in a blank screen on some clients
	        if (this.mail.icalEvent) {
	            if (
	                typeof this.mail.icalEvent === 'object' &&
	                (this.mail.icalEvent.content || this.mail.icalEvent.path || this.mail.icalEvent.href || this.mail.icalEvent.raw)
	            ) {
	                icalEvent = this.mail.icalEvent;
	            } else {
	                icalEvent = {
	                    content: this.mail.icalEvent
	                };
	            }

	            eventObject = {};
	            Object.keys(icalEvent).forEach(key => {
	                eventObject[key] = icalEvent[key];
	            });

	            if (eventObject.content && typeof eventObject.content === 'object') {
	                // we are going to have the same attachment twice, so mark this to be
	                // resolved just once
	                eventObject.content._resolve = true;
	            }

	            eventObject.filename = false;
	            eventObject.contentType =
	                'text/calendar; charset=utf-8; method=' + (eventObject.method || 'PUBLISH').toString().trim().toUpperCase();
	            if (!eventObject.headers) {
	                eventObject.headers = {};
	            }
	        }

	        if (this.mail.html) {
	            if (
	                typeof this.mail.html === 'object' &&
	                (this.mail.html.content || this.mail.html.path || this.mail.html.href || this.mail.html.raw)
	            ) {
	                html = this.mail.html;
	            } else {
	                html = {
	                    content: this.mail.html
	                };
	            }
	            html.contentType = 'text/html; charset=utf-8';
	        }

	        []
	            .concat(text || [])
	            .concat(watchHtml || [])
	            .concat(amp || [])
	            .concat(html || [])
	            .concat(eventObject || [])
	            .concat(this.mail.alternatives || [])
	            .forEach(alternative => {
	                let data;

	                if (/^data:/i.test(alternative.path || alternative.href)) {
	                    alternative = this._processDataUrl(alternative);
	                }

	                data = {
	                    contentType:
	                        alternative.contentType ||
	                        mimeFuncs.detectMimeType(alternative.filename || alternative.path || alternative.href || 'txt'),
	                    contentTransferEncoding: alternative.contentTransferEncoding
	                };

	                if (alternative.filename) {
	                    data.filename = alternative.filename;
	                }

	                if (/^https?:\/\//i.test(alternative.path)) {
	                    alternative.href = alternative.path;
	                    alternative.path = undefined;
	                }

	                if (alternative.raw) {
	                    data.raw = alternative.raw;
	                } else if (alternative.path) {
	                    data.content = {
	                        path: alternative.path
	                    };
	                } else if (alternative.href) {
	                    data.content = {
	                        href: alternative.href
	                    };
	                } else {
	                    data.content = alternative.content || '';
	                }

	                if (alternative.encoding) {
	                    data.encoding = alternative.encoding;
	                }

	                if (alternative.headers) {
	                    data.headers = alternative.headers;
	                }

	                alternatives.push(data);
	            });

	        return alternatives;
	    }

	    /**
	     * Builds multipart/mixed node. It should always contain different type of elements on the same level
	     * eg. text + attachments
	     *
	     * @param {Object} parentNode Parent for this note. If it does not exist, a root node is created
	     * @returns {Object} MimeNode node element
	     */
	    _createMixed(parentNode) {
	        let node;

	        if (!parentNode) {
	            node = new MimeNode('multipart/mixed', {
	                baseBoundary: this.mail.baseBoundary,
	                textEncoding: this.mail.textEncoding,
	                boundaryPrefix: this.mail.boundaryPrefix,
	                disableUrlAccess: this.mail.disableUrlAccess,
	                disableFileAccess: this.mail.disableFileAccess,
	                normalizeHeaderKey: this.mail.normalizeHeaderKey,
	                newline: this.mail.newline
	            });
	        } else {
	            node = parentNode.createChild('multipart/mixed', {
	                disableUrlAccess: this.mail.disableUrlAccess,
	                disableFileAccess: this.mail.disableFileAccess,
	                normalizeHeaderKey: this.mail.normalizeHeaderKey,
	                newline: this.mail.newline
	            });
	        }

	        if (this._useAlternative) {
	            this._createAlternative(node);
	        } else if (this._useRelated) {
	            this._createRelated(node);
	        }

	        []
	            .concat((!this._useAlternative && this._alternatives) || [])
	            .concat(this._attachments.attached || [])
	            .forEach(element => {
	                // if the element is a html node from related subpart then ignore it
	                if (!this._useRelated || element !== this._htmlNode) {
	                    this._createContentNode(node, element);
	                }
	            });

	        return node;
	    }

	    /**
	     * Builds multipart/alternative node. It should always contain same type of elements on the same level
	     * eg. text + html view of the same data
	     *
	     * @param {Object} parentNode Parent for this note. If it does not exist, a root node is created
	     * @returns {Object} MimeNode node element
	     */
	    _createAlternative(parentNode) {
	        let node;

	        if (!parentNode) {
	            node = new MimeNode('multipart/alternative', {
	                baseBoundary: this.mail.baseBoundary,
	                textEncoding: this.mail.textEncoding,
	                boundaryPrefix: this.mail.boundaryPrefix,
	                disableUrlAccess: this.mail.disableUrlAccess,
	                disableFileAccess: this.mail.disableFileAccess,
	                normalizeHeaderKey: this.mail.normalizeHeaderKey,
	                newline: this.mail.newline
	            });
	        } else {
	            node = parentNode.createChild('multipart/alternative', {
	                disableUrlAccess: this.mail.disableUrlAccess,
	                disableFileAccess: this.mail.disableFileAccess,
	                normalizeHeaderKey: this.mail.normalizeHeaderKey,
	                newline: this.mail.newline
	            });
	        }

	        this._alternatives.forEach(alternative => {
	            if (this._useRelated && this._htmlNode === alternative) {
	                this._createRelated(node);
	            } else {
	                this._createContentNode(node, alternative);
	            }
	        });

	        return node;
	    }

	    /**
	     * Builds multipart/related node. It should always contain html node with related attachments
	     *
	     * @param {Object} parentNode Parent for this note. If it does not exist, a root node is created
	     * @returns {Object} MimeNode node element
	     */
	    _createRelated(parentNode) {
	        let node;

	        if (!parentNode) {
	            node = new MimeNode('multipart/related; type="text/html"', {
	                baseBoundary: this.mail.baseBoundary,
	                textEncoding: this.mail.textEncoding,
	                boundaryPrefix: this.mail.boundaryPrefix,
	                disableUrlAccess: this.mail.disableUrlAccess,
	                disableFileAccess: this.mail.disableFileAccess,
	                normalizeHeaderKey: this.mail.normalizeHeaderKey,
	                newline: this.mail.newline
	            });
	        } else {
	            node = parentNode.createChild('multipart/related; type="text/html"', {
	                disableUrlAccess: this.mail.disableUrlAccess,
	                disableFileAccess: this.mail.disableFileAccess,
	                normalizeHeaderKey: this.mail.normalizeHeaderKey,
	                newline: this.mail.newline
	            });
	        }

	        this._createContentNode(node, this._htmlNode);

	        this._attachments.related.forEach(alternative => this._createContentNode(node, alternative));

	        return node;
	    }

	    /**
	     * Creates a regular node with contents
	     *
	     * @param {Object} parentNode Parent for this note. If it does not exist, a root node is created
	     * @param {Object} element Node data
	     * @returns {Object} MimeNode node element
	     */
	    _createContentNode(parentNode, element) {
	        element = element || {};
	        element.content = element.content || '';

	        let node;
	        let encoding = (element.encoding || 'utf8')
	            .toString()
	            .toLowerCase()
	            .replace(/[-_\s]/g, '');

	        if (!parentNode) {
	            node = new MimeNode(element.contentType, {
	                filename: element.filename,
	                baseBoundary: this.mail.baseBoundary,
	                textEncoding: this.mail.textEncoding,
	                boundaryPrefix: this.mail.boundaryPrefix,
	                disableUrlAccess: this.mail.disableUrlAccess,
	                disableFileAccess: this.mail.disableFileAccess,
	                normalizeHeaderKey: this.mail.normalizeHeaderKey,
	                newline: this.mail.newline
	            });
	        } else {
	            node = parentNode.createChild(element.contentType, {
	                filename: element.filename,
	                textEncoding: this.mail.textEncoding,
	                disableUrlAccess: this.mail.disableUrlAccess,
	                disableFileAccess: this.mail.disableFileAccess,
	                normalizeHeaderKey: this.mail.normalizeHeaderKey,
	                newline: this.mail.newline
	            });
	        }

	        // add custom headers
	        if (element.headers) {
	            node.addHeader(element.headers);
	        }

	        if (element.cid) {
	            node.setHeader('Content-Id', '<' + element.cid.replace(/[<>]/g, '') + '>');
	        }

	        if (element.contentTransferEncoding) {
	            node.setHeader('Content-Transfer-Encoding', element.contentTransferEncoding);
	        } else if (this.mail.encoding && /^text\//i.test(element.contentType)) {
	            node.setHeader('Content-Transfer-Encoding', this.mail.encoding);
	        }

	        if (!/^text\//i.test(element.contentType) || element.contentDisposition) {
	            node.setHeader(
	                'Content-Disposition',
	                element.contentDisposition || (element.cid && /^image\//i.test(element.contentType) ? 'inline' : 'attachment')
	            );
	        }

	        if (typeof element.content === 'string' && !['utf8', 'usascii', 'ascii'].includes(encoding)) {
	            element.content = Buffer.from(element.content, encoding);
	        }

	        // prefer pregenerated raw content
	        if (element.raw) {
	            node.setRaw(element.raw);
	        } else {
	            node.setContent(element.content);
	        }

	        return node;
	    }

	    /**
	     * Parses data uri and converts it to a Buffer
	     *
	     * @param {Object} element Content element
	     * @return {Object} Parsed element
	     */
	    _processDataUrl(element) {
	        const dataUrl = element.path || element.href;

	        // Early validation to prevent ReDoS
	        if (!dataUrl || typeof dataUrl !== 'string') {
	            return element;
	        }

	        if (!dataUrl.startsWith('data:')) {
	            return element;
	        }

	        if (dataUrl.length > 52428800) {
	            // 52428800 chars = 50MB limit for data URL string (~37.5MB decoded image)
	            // Extract content type before rejecting to preserve MIME type
	            let detectedType = 'application/octet-stream';
	            const commaPos = dataUrl.indexOf(',');

	            if (commaPos > 0 && commaPos < 200) {
	                // Parse header safely with size limit
	                const header = dataUrl.substring(5, commaPos); // skip 'data:'
	                const parts = header.split(';');
	                if (parts[0] && parts[0].includes('/')) {
	                    detectedType = parts[0].trim();
	                }
	            }

	            // Return empty content for excessively long data URLs
	            return Object.assign({}, element, {
	                path: false,
	                href: false,
	                content: Buffer.alloc(0),
	                contentType: element.contentType || detectedType
	            });
	        }

	        let parsedDataUri;
	        try {
	            parsedDataUri = parseDataURI(dataUrl);
	        } catch (_err) {
	            return element;
	        }

	        if (!parsedDataUri) {
	            return element;
	        }

	        element.content = parsedDataUri.data;
	        element.contentType = element.contentType || parsedDataUri.contentType;

	        if ('path' in element) {
	            element.path = false;
	        }

	        if ('href' in element) {
	            element.href = false;
	        }

	        return element;
	    }
	}

	mailComposer = MailComposer;
	return mailComposer;
}

var messageParser;
var hasRequiredMessageParser;

function requireMessageParser () {
	if (hasRequiredMessageParser) return messageParser;
	hasRequiredMessageParser = 1;

	const Transform = require$$0$2.Transform;

	/**
	 * MessageParser instance is a transform stream that separates message headers
	 * from the rest of the body. Headers are emitted with the 'headers' event. Message
	 * body is passed on as the resulting stream.
	 */
	class MessageParser extends Transform {
	    constructor(options) {
	        super(options);
	        this.lastBytes = Buffer.alloc(4);
	        this.headersParsed = false;
	        this.headerBytes = 0;
	        this.headerChunks = [];
	        this.rawHeaders = false;
	        this.bodySize = 0;
	    }

	    /**
	     * Keeps count of the last 4 bytes in order to detect line breaks on chunk boundaries
	     *
	     * @param {Buffer} data Next data chunk from the stream
	     */
	    updateLastBytes(data) {
	        let lblen = this.lastBytes.length;
	        let nblen = Math.min(data.length, lblen);

	        // shift existing bytes
	        for (let i = 0, len = lblen - nblen; i < len; i++) {
	            this.lastBytes[i] = this.lastBytes[i + nblen];
	        }

	        // add new bytes
	        for (let i = 1; i <= nblen; i++) {
	            this.lastBytes[lblen - i] = data[data.length - i];
	        }
	    }

	    /**
	     * Finds and removes message headers from the remaining body. We want to keep
	     * headers separated until final delivery to be able to modify these
	     *
	     * @param {Buffer} data Next chunk of data
	     * @return {Boolean} Returns true if headers are already found or false otherwise
	     */
	    checkHeaders(data) {
	        if (this.headersParsed) {
	            return true;
	        }

	        let lblen = this.lastBytes.length;
	        let headerPos = 0;
	        this.curLinePos = 0;
	        for (let i = 0, len = this.lastBytes.length + data.length; i < len; i++) {
	            let chr;
	            if (i < lblen) {
	                chr = this.lastBytes[i];
	            } else {
	                chr = data[i - lblen];
	            }
	            if (chr === 0x0a && i) {
	                let pr1 = i - 1 < lblen ? this.lastBytes[i - 1] : data[i - 1 - lblen];
	                let pr2 = i > 1 ? (i - 2 < lblen ? this.lastBytes[i - 2] : data[i - 2 - lblen]) : false;
	                if (pr1 === 0x0a) {
	                    this.headersParsed = true;
	                    headerPos = i - lblen + 1;
	                    this.headerBytes += headerPos;
	                    break;
	                } else if (pr1 === 0x0d && pr2 === 0x0a) {
	                    this.headersParsed = true;
	                    headerPos = i - lblen + 1;
	                    this.headerBytes += headerPos;
	                    break;
	                }
	            }
	        }

	        if (this.headersParsed) {
	            this.headerChunks.push(data.slice(0, headerPos));
	            this.rawHeaders = Buffer.concat(this.headerChunks, this.headerBytes);
	            this.headerChunks = null;
	            this.emit('headers', this.parseHeaders());
	            if (data.length - 1 > headerPos) {
	                let chunk = data.slice(headerPos);
	                this.bodySize += chunk.length;
	                // this would be the first chunk of data sent downstream
	                setImmediate(() => this.push(chunk));
	            }
	            return false;
	        } else {
	            this.headerBytes += data.length;
	            this.headerChunks.push(data);
	        }

	        // store last 4 bytes to catch header break
	        this.updateLastBytes(data);

	        return false;
	    }

	    _transform(chunk, encoding, callback) {
	        if (!chunk || !chunk.length) {
	            return callback();
	        }

	        if (typeof chunk === 'string') {
	            chunk = Buffer.from(chunk, encoding);
	        }

	        let headersFound;

	        try {
	            headersFound = this.checkHeaders(chunk);
	        } catch (E) {
	            return callback(E);
	        }

	        if (headersFound) {
	            this.bodySize += chunk.length;
	            this.push(chunk);
	        }

	        setImmediate(callback);
	    }

	    _flush(callback) {
	        if (this.headerChunks) {
	            let chunk = Buffer.concat(this.headerChunks, this.headerBytes);
	            this.bodySize += chunk.length;
	            this.push(chunk);
	            this.headerChunks = null;
	        }
	        callback();
	    }

	    parseHeaders() {
	        let lines = (this.rawHeaders || '').toString().split(/\r?\n/);
	        for (let i = lines.length - 1; i > 0; i--) {
	            if (/^\s/.test(lines[i])) {
	                lines[i - 1] += '\n' + lines[i];
	                lines.splice(i, 1);
	            }
	        }
	        return lines
	            .filter(line => line.trim())
	            .map(line => ({
	                key: line.substr(0, line.indexOf(':')).trim().toLowerCase(),
	                line
	            }));
	    }
	}

	messageParser = MessageParser;
	return messageParser;
}

var relaxedBody;
var hasRequiredRelaxedBody;

function requireRelaxedBody () {
	if (hasRequiredRelaxedBody) return relaxedBody;
	hasRequiredRelaxedBody = 1;

	// streams through a message body and calculates relaxed body hash

	const Transform = require$$0$2.Transform;
	const crypto = crypto__default;

	class RelaxedBody extends Transform {
	    constructor(options) {
	        super();
	        options = options || {};
	        this.chunkBuffer = [];
	        this.chunkBufferLen = 0;
	        this.bodyHash = crypto.createHash(options.hashAlgo || 'sha1');
	        this.remainder = '';
	        this.byteLength = 0;

	        this.debug = options.debug;
	        this._debugBody = options.debug ? [] : false;
	    }

	    updateHash(chunk) {
	        let bodyStr;

	        // find next remainder
	        let nextRemainder = '';

	        // This crux finds and removes the spaces from the last line and the newline characters after the last non-empty line
	        // If we get another chunk that does not match this description then we can restore the previously processed data
	        let state = 'file';
	        for (let i = chunk.length - 1; i >= 0; i--) {
	            let c = chunk[i];

	            if (state === 'file' && (c === 0x0a || c === 0x0d)) ; else if (state === 'file' && (c === 0x09 || c === 0x20)) {
	                // switch to line ending mode, this is the last non-empty line
	                state = 'line';
	            } else if (state === 'line' && (c === 0x09 || c === 0x20)) ; else if (state === 'file' || state === 'line') {
	                // non line/file ending character found, switch to body mode
	                state = 'body';
	                if (i === chunk.length - 1) {
	                    // final char is not part of line end or file end, so do nothing
	                    break;
	                }
	            }

	            if (i === 0) {
	                // reached to the beginning of the chunk, check if it is still about the ending
	                // and if the remainder also matches
	                if (
	                    (state === 'file' && (!this.remainder || /[\r\n]$/.test(this.remainder))) ||
	                    (state === 'line' && (!this.remainder || /[ \t]$/.test(this.remainder)))
	                ) {
	                    // keep everything
	                    this.remainder += chunk.toString('binary');
	                    return;
	                } else if (state === 'line' || state === 'file') {
	                    // process existing remainder as normal line but store the current chunk
	                    nextRemainder = chunk.toString('binary');
	                    chunk = false;
	                    break;
	                }
	            }

	            if (state !== 'body') {
	                continue;
	            }

	            // reached first non ending byte
	            nextRemainder = chunk.slice(i + 1).toString('binary');
	            chunk = chunk.slice(0, i + 1);
	            break;
	        }

	        let needsFixing = !!this.remainder;
	        if (chunk && !needsFixing) {
	            // check if we even need to change anything
	            for (let i = 0, len = chunk.length; i < len; i++) {
	                if (i && chunk[i] === 0x0a && chunk[i - 1] !== 0x0d) {
	                    // missing \r before \n
	                    needsFixing = true;
	                    break;
	                } else if (i && chunk[i] === 0x0d && chunk[i - 1] === 0x20) {
	                    // trailing WSP found
	                    needsFixing = true;
	                    break;
	                } else if (i && chunk[i] === 0x20 && chunk[i - 1] === 0x20) {
	                    // multiple spaces found, needs to be replaced with just one
	                    needsFixing = true;
	                    break;
	                } else if (chunk[i] === 0x09) {
	                    // TAB found, needs to be replaced with a space
	                    needsFixing = true;
	                    break;
	                }
	            }
	        }

	        if (needsFixing) {
	            bodyStr = this.remainder + (chunk ? chunk.toString('binary') : '');
	            this.remainder = nextRemainder;
	            bodyStr = bodyStr
	                .replace(/\r?\n/g, '\n') // use js line endings
	                .replace(/[ \t]*$/gm, '') // remove line endings, rtrim
	                .replace(/[ \t]+/gm, ' ') // single spaces
	                .replace(/\n/g, '\r\n'); // restore rfc822 line endings
	            chunk = Buffer.from(bodyStr, 'binary');
	        } else if (nextRemainder) {
	            this.remainder = nextRemainder;
	        }

	        if (this.debug) {
	            this._debugBody.push(chunk);
	        }
	        this.bodyHash.update(chunk);
	    }

	    _transform(chunk, encoding, callback) {
	        if (!chunk || !chunk.length) {
	            return callback();
	        }

	        if (typeof chunk === 'string') {
	            chunk = Buffer.from(chunk, encoding);
	        }

	        this.updateHash(chunk);

	        this.byteLength += chunk.length;
	        this.push(chunk);
	        callback();
	    }

	    _flush(callback) {
	        // generate final hash and emit it
	        if (/[\r\n]$/.test(this.remainder) && this.byteLength > 2) {
	            // add terminating line end
	            this.bodyHash.update(Buffer.from('\r\n'));
	        }
	        if (!this.byteLength) {
	            // emit empty line buffer to keep the stream flowing
	            this.push(Buffer.from('\r\n'));
	            // this.bodyHash.update(Buffer.from('\r\n'));
	        }

	        this.emit('hash', this.bodyHash.digest('base64'), this.debug ? Buffer.concat(this._debugBody) : false);
	        callback();
	    }
	}

	relaxedBody = RelaxedBody;
	return relaxedBody;
}

var sign = {exports: {}};

var hasRequiredSign;

function requireSign () {
	if (hasRequiredSign) return sign.exports;
	hasRequiredSign = 1;

	const punycode = requirePunycode();
	const mimeFuncs = requireMimeFuncs();
	const crypto = crypto__default;

	/**
	 * Returns DKIM signature header line
	 *
	 * @param {Object} headers Parsed headers object from MessageParser
	 * @param {String} bodyHash Base64 encoded hash of the message
	 * @param {Object} options DKIM options
	 * @param {String} options.domainName Domain name to be signed for
	 * @param {String} options.keySelector DKIM key selector to use
	 * @param {String} options.privateKey DKIM private key to use
	 * @return {String} Complete header line
	 */

	sign.exports = (headers, hashAlgo, bodyHash, options) => {
	    options = options || {};

	    // all listed fields from RFC4871 #5.5
	    let defaultFieldNames =
	        'From:Sender:Reply-To:Subject:Date:Message-ID:To:' +
	        'Cc:MIME-Version:Content-Type:Content-Transfer-Encoding:Content-ID:' +
	        'Content-Description:Resent-Date:Resent-From:Resent-Sender:' +
	        'Resent-To:Resent-Cc:Resent-Message-ID:In-Reply-To:References:' +
	        'List-Id:List-Help:List-Unsubscribe:List-Subscribe:List-Post:' +
	        'List-Owner:List-Archive';

	    let fieldNames = options.headerFieldNames || defaultFieldNames;

	    let canonicalizedHeaderData = relaxedHeaders(headers, fieldNames, options.skipFields);
	    let dkimHeader = generateDKIMHeader(options.domainName, options.keySelector, canonicalizedHeaderData.fieldNames, hashAlgo, bodyHash);

	    let signer, signature;

	    canonicalizedHeaderData.headers += 'dkim-signature:' + relaxedHeaderLine(dkimHeader);

	    signer = crypto.createSign(('rsa-' + hashAlgo).toUpperCase());
	    signer.update(canonicalizedHeaderData.headers);
	    try {
	        signature = signer.sign(options.privateKey, 'base64');
	    } catch (_E) {
	        return false;
	    }

	    return dkimHeader + signature.replace(/(^.{73}|.{75}(?!\r?\n|\r))/g, '$&\r\n ').trim();
	};

	sign.exports.relaxedHeaders = relaxedHeaders;

	function generateDKIMHeader(domainName, keySelector, fieldNames, hashAlgo, bodyHash) {
	    let dkim = [
	        'v=1',
	        'a=rsa-' + hashAlgo,
	        'c=relaxed/relaxed',
	        'd=' + punycode.toASCII(domainName),
	        'q=dns/txt',
	        's=' + keySelector,
	        'bh=' + bodyHash,
	        'h=' + fieldNames
	    ].join('; ');

	    return mimeFuncs.foldLines('DKIM-Signature: ' + dkim, 76) + ';\r\n b=';
	}

	function relaxedHeaders(headers, fieldNames, skipFields) {
	    let includedFields = new Set();
	    let skip = new Set();
	    let headerFields = new Map();

	    (skipFields || '')
	        .toLowerCase()
	        .split(':')
	        .forEach(field => {
	            skip.add(field.trim());
	        });

	    (fieldNames || '')
	        .toLowerCase()
	        .split(':')
	        .filter(field => !skip.has(field.trim()))
	        .forEach(field => {
	            includedFields.add(field.trim());
	        });

	    for (let i = headers.length - 1; i >= 0; i--) {
	        let line = headers[i];
	        // only include the first value from bottom to top
	        if (includedFields.has(line.key) && !headerFields.has(line.key)) {
	            headerFields.set(line.key, relaxedHeaderLine(line.line));
	        }
	    }

	    let headersList = [];
	    let fields = [];
	    includedFields.forEach(field => {
	        if (headerFields.has(field)) {
	            fields.push(field);
	            headersList.push(field + ':' + headerFields.get(field));
	        }
	    });

	    return {
	        headers: headersList.join('\r\n') + '\r\n',
	        fieldNames: fields.join(':')
	    };
	}

	function relaxedHeaderLine(line) {
	    return line
	        .substr(line.indexOf(':') + 1)
	        .replace(/\r?\n/g, '')
	        .replace(/\s+/g, ' ')
	        .trim();
	}
	return sign.exports;
}

var dkim;
var hasRequiredDkim;

function requireDkim () {
	if (hasRequiredDkim) return dkim;
	hasRequiredDkim = 1;

	// FIXME:
	// replace this Transform mess with a method that pipes input argument to output argument

	const MessageParser = requireMessageParser();
	const RelaxedBody = requireRelaxedBody();
	const sign = requireSign();
	const PassThrough = require$$0$2.PassThrough;
	const fs = NFS;
	const path$1 = path;
	const crypto = crypto__default;

	const DKIM_ALGO = 'sha256';
	const MAX_MESSAGE_SIZE = 2 * 1024 * 1024; // buffer messages larger than this to disk

	/*
	// Usage:

	let dkim = new DKIM({
	    domainName: 'example.com',
	    keySelector: 'key-selector',
	    privateKey,
	    cacheDir: '/tmp'
	});
	dkim.sign(input).pipe(process.stdout);

	// Where inputStream is a rfc822 message (either a stream, string or Buffer)
	// and outputStream is a DKIM signed rfc822 message
	*/

	class DKIMSigner {
	    constructor(options, keys, input, output) {
	        this.options = options || {};
	        this.keys = keys;

	        this.cacheTreshold = Number(this.options.cacheTreshold) || MAX_MESSAGE_SIZE;
	        this.hashAlgo = this.options.hashAlgo || DKIM_ALGO;

	        this.cacheDir = this.options.cacheDir || false;

	        this.chunks = [];
	        this.chunklen = 0;
	        this.readPos = 0;
	        this.cachePath = this.cacheDir
	            ? path$1.join(this.cacheDir, 'message.' + Date.now() + '-' + crypto.randomBytes(14).toString('hex'))
	            : false;
	        this.cache = false;

	        this.headers = false;
	        this.bodyHash = false;
	        this.parser = false;
	        this.relaxedBody = false;

	        this.input = input;
	        this.output = output;
	        this.output.usingCache = false;

	        this.hasErrored = false;

	        this.input.on('error', err => {
	            this.hasErrored = true;
	            this.cleanup();
	            output.emit('error', err);
	        });
	    }

	    cleanup() {
	        if (!this.cache || !this.cachePath) {
	            return;
	        }
	        fs.unlink(this.cachePath, () => false);
	    }

	    createReadCache() {
	        // pipe remainings to cache file
	        this.cache = fs.createReadStream(this.cachePath);
	        this.cache.once('error', err => {
	            this.cleanup();
	            this.output.emit('error', err);
	        });
	        this.cache.once('close', () => {
	            this.cleanup();
	        });
	        this.cache.pipe(this.output);
	    }

	    sendNextChunk() {
	        if (this.hasErrored) {
	            return;
	        }

	        if (this.readPos >= this.chunks.length) {
	            if (!this.cache) {
	                return this.output.end();
	            }
	            return this.createReadCache();
	        }
	        let chunk = this.chunks[this.readPos++];
	        if (this.output.write(chunk) === false) {
	            return this.output.once('drain', () => {
	                this.sendNextChunk();
	            });
	        }
	        setImmediate(() => this.sendNextChunk());
	    }

	    sendSignedOutput() {
	        let keyPos = 0;
	        let signNextKey = () => {
	            if (keyPos >= this.keys.length) {
	                this.output.write(this.parser.rawHeaders);
	                return setImmediate(() => this.sendNextChunk());
	            }
	            let key = this.keys[keyPos++];
	            let dkimField = sign(this.headers, this.hashAlgo, this.bodyHash, {
	                domainName: key.domainName,
	                keySelector: key.keySelector,
	                privateKey: key.privateKey,
	                headerFieldNames: this.options.headerFieldNames,
	                skipFields: this.options.skipFields
	            });
	            if (dkimField) {
	                this.output.write(Buffer.from(dkimField + '\r\n'));
	            }
	            return setImmediate(signNextKey);
	        };

	        if (this.bodyHash && this.headers) {
	            return signNextKey();
	        }

	        this.output.write(this.parser.rawHeaders);
	        this.sendNextChunk();
	    }

	    createWriteCache() {
	        this.output.usingCache = true;
	        // pipe remainings to cache file
	        this.cache = fs.createWriteStream(this.cachePath);
	        this.cache.once('error', err => {
	            this.cleanup();
	            // drain input
	            this.relaxedBody.unpipe(this.cache);
	            this.relaxedBody.on('readable', () => {
	                while (this.relaxedBody.read() !== null) {
	                    // do nothing
	                }
	            });
	            this.hasErrored = true;
	            // emit error
	            this.output.emit('error', err);
	        });
	        this.cache.once('close', () => {
	            this.sendSignedOutput();
	        });
	        this.relaxedBody.removeAllListeners('readable');
	        this.relaxedBody.pipe(this.cache);
	    }

	    signStream() {
	        this.parser = new MessageParser();
	        this.relaxedBody = new RelaxedBody({
	            hashAlgo: this.hashAlgo
	        });

	        this.parser.on('headers', value => {
	            this.headers = value;
	        });

	        this.relaxedBody.on('hash', value => {
	            this.bodyHash = value;
	        });

	        this.relaxedBody.on('readable', () => {
	            let chunk;
	            if (this.cache) {
	                return;
	            }
	            while ((chunk = this.relaxedBody.read()) !== null) {
	                this.chunks.push(chunk);
	                this.chunklen += chunk.length;
	                if (this.chunklen >= this.cacheTreshold && this.cachePath) {
	                    return this.createWriteCache();
	                }
	            }
	        });

	        this.relaxedBody.on('end', () => {
	            if (this.cache) {
	                return;
	            }
	            this.sendSignedOutput();
	        });

	        this.parser.pipe(this.relaxedBody);
	        setImmediate(() => this.input.pipe(this.parser));
	    }
	}

	class DKIM {
	    constructor(options) {
	        this.options = options || {};
	        this.keys = [].concat(
	            this.options.keys || {
	                domainName: options.domainName,
	                keySelector: options.keySelector,
	                privateKey: options.privateKey
	            }
	        );
	    }

	    sign(input, extraOptions) {
	        let output = new PassThrough();
	        let inputStream = input;
	        let writeValue = false;

	        if (Buffer.isBuffer(input)) {
	            writeValue = input;
	            inputStream = new PassThrough();
	        } else if (typeof input === 'string') {
	            writeValue = Buffer.from(input);
	            inputStream = new PassThrough();
	        }

	        let options = this.options;
	        if (extraOptions && Object.keys(extraOptions).length) {
	            options = {};
	            Object.keys(this.options || {}).forEach(key => {
	                options[key] = this.options[key];
	            });
	            Object.keys(extraOptions || {}).forEach(key => {
	                if (!(key in options)) {
	                    options[key] = extraOptions[key];
	                }
	            });
	        }

	        let signer = new DKIMSigner(options, this.keys, inputStream, output);
	        setImmediate(() => {
	            signer.signStream();
	            if (writeValue) {
	                setImmediate(() => {
	                    inputStream.end(writeValue);
	                });
	            }
	        });

	        return output;
	    }
	}

	dkim = DKIM;
	return dkim;
}

var httpProxyClient_1;
var hasRequiredHttpProxyClient;

function requireHttpProxyClient () {
	if (hasRequiredHttpProxyClient) return httpProxyClient_1;
	hasRequiredHttpProxyClient = 1;

	/**
	 * Minimal HTTP/S proxy client
	 */

	const net = require$$0$3;
	const tls = require$$4;
	const urllib = require$$0$1;

	/**
	 * Establishes proxied connection to destinationPort
	 *
	 * httpProxyClient("http://localhost:3128/", 80, "google.com", function(err, socket){
	 *     socket.write("GET / HTTP/1.0\r\n\r\n");
	 * });
	 *
	 * @param {String} proxyUrl proxy configuration, etg "http://proxy.host:3128/"
	 * @param {Number} destinationPort Port to open in destination host
	 * @param {String} destinationHost Destination hostname
	 * @param {Function} callback Callback to run with the rocket object once connection is established
	 */
	function httpProxyClient(proxyUrl, destinationPort, destinationHost, callback) {
	    let proxy = urllib.parse(proxyUrl);

	    // create a socket connection to the proxy server
	    let options;
	    let connect;
	    let socket;

	    options = {
	        host: proxy.hostname,
	        port: Number(proxy.port) ? Number(proxy.port) : proxy.protocol === 'https:' ? 443 : 80
	    };

	    if (proxy.protocol === 'https:') {
	        // we can use untrusted proxies as long as we verify actual SMTP certificates
	        options.rejectUnauthorized = false;
	        connect = tls.connect.bind(tls);
	    } else {
	        connect = net.connect.bind(net);
	    }

	    // Error harness for initial connection. Once connection is established, the responsibility
	    // to handle errors is passed to whoever uses this socket
	    let finished = false;
	    let tempSocketErr = err => {
	        if (finished) {
	            return;
	        }
	        finished = true;
	        try {
	            socket.destroy();
	        } catch (_E) {
	            // ignore
	        }
	        callback(err);
	    };

	    let timeoutErr = () => {
	        let err = new Error('Proxy socket timed out');
	        err.code = 'ETIMEDOUT';
	        tempSocketErr(err);
	    };

	    socket = connect(options, () => {
	        if (finished) {
	            return;
	        }

	        let reqHeaders = {
	            Host: destinationHost + ':' + destinationPort,
	            Connection: 'close'
	        };
	        if (proxy.auth) {
	            reqHeaders['Proxy-Authorization'] = 'Basic ' + Buffer.from(proxy.auth).toString('base64');
	        }

	        socket.write(
	            // HTTP method
	            'CONNECT ' +
	                destinationHost +
	                ':' +
	                destinationPort +
	                ' HTTP/1.1\r\n' +
	                // HTTP request headers
	                Object.keys(reqHeaders)
	                    .map(key => key + ': ' + reqHeaders[key])
	                    .join('\r\n') +
	                // End request
	                '\r\n\r\n'
	        );

	        let headers = '';
	        let onSocketData = chunk => {
	            let match;
	            let remainder;

	            if (finished) {
	                return;
	            }

	            headers += chunk.toString('binary');
	            if ((match = headers.match(/\r\n\r\n/))) {
	                socket.removeListener('data', onSocketData);

	                remainder = headers.substr(match.index + match[0].length);
	                headers = headers.substr(0, match.index);
	                if (remainder) {
	                    socket.unshift(Buffer.from(remainder, 'binary'));
	                }

	                // proxy connection is now established
	                finished = true;

	                // check response code
	                match = headers.match(/^HTTP\/\d+\.\d+ (\d+)/i);
	                if (!match || (match[1] || '').charAt(0) !== '2') {
	                    try {
	                        socket.destroy();
	                    } catch (_E) {
	                        // ignore
	                    }
	                    return callback(new Error('Invalid response from proxy' + ((match && ': ' + match[1]) || '')));
	                }

	                socket.removeListener('error', tempSocketErr);
	                socket.removeListener('timeout', timeoutErr);
	                socket.setTimeout(0);

	                return callback(null, socket);
	            }
	        };
	        socket.on('data', onSocketData);
	    });

	    socket.setTimeout(httpProxyClient.timeout || 30 * 1000);
	    socket.on('timeout', timeoutErr);

	    socket.once('error', tempSocketErr);
	}

	httpProxyClient_1 = httpProxyClient;
	return httpProxyClient_1;
}

var mailMessage;
var hasRequiredMailMessage;

function requireMailMessage () {
	if (hasRequiredMailMessage) return mailMessage;
	hasRequiredMailMessage = 1;

	const shared = requireShared();
	const MimeNode = requireMimeNode();
	const mimeFuncs = requireMimeFuncs();

	class MailMessage {
	    constructor(mailer, data) {
	        this.mailer = mailer;
	        this.data = {};
	        this.message = null;

	        data = data || {};
	        let options = mailer.options || {};
	        let defaults = mailer._defaults || {};

	        Object.keys(data).forEach(key => {
	            this.data[key] = data[key];
	        });

	        this.data.headers = this.data.headers || {};

	        // apply defaults
	        Object.keys(defaults).forEach(key => {
	            if (!(key in this.data)) {
	                this.data[key] = defaults[key];
	            } else if (key === 'headers') {
	                // headers is a special case. Allow setting individual default headers
	                Object.keys(defaults.headers).forEach(key => {
	                    if (!(key in this.data.headers)) {
	                        this.data.headers[key] = defaults.headers[key];
	                    }
	                });
	            }
	        });

	        // force specific keys from transporter options
	        ['disableFileAccess', 'disableUrlAccess', 'normalizeHeaderKey'].forEach(key => {
	            if (key in options) {
	                this.data[key] = options[key];
	            }
	        });
	    }

	    resolveContent(...args) {
	        return shared.resolveContent(...args);
	    }

	    resolveAll(callback) {
	        let keys = [
	            [this.data, 'html'],
	            [this.data, 'text'],
	            [this.data, 'watchHtml'],
	            [this.data, 'amp'],
	            [this.data, 'icalEvent']
	        ];

	        if (this.data.alternatives && this.data.alternatives.length) {
	            this.data.alternatives.forEach((alternative, i) => {
	                keys.push([this.data.alternatives, i]);
	            });
	        }

	        if (this.data.attachments && this.data.attachments.length) {
	            this.data.attachments.forEach((attachment, i) => {
	                if (!attachment.filename) {
	                    attachment.filename =
	                        (attachment.path || attachment.href || '').split('/').pop().split('?').shift() || 'attachment-' + (i + 1);
	                    if (attachment.filename.indexOf('.') < 0) {
	                        attachment.filename += '.' + mimeFuncs.detectExtension(attachment.contentType);
	                    }
	                }

	                if (!attachment.contentType) {
	                    attachment.contentType = mimeFuncs.detectMimeType(attachment.filename || attachment.path || attachment.href || 'bin');
	                }

	                keys.push([this.data.attachments, i]);
	            });
	        }

	        let mimeNode = new MimeNode();

	        let addressKeys = ['from', 'to', 'cc', 'bcc', 'sender', 'replyTo'];

	        addressKeys.forEach(address => {
	            let value;
	            if (this.message) {
	                value = [].concat(mimeNode._parseAddresses(this.message.getHeader(address === 'replyTo' ? 'reply-to' : address)) || []);
	            } else if (this.data[address]) {
	                value = [].concat(mimeNode._parseAddresses(this.data[address]) || []);
	            }
	            if (value && value.length) {
	                this.data[address] = value;
	            } else if (address in this.data) {
	                this.data[address] = null;
	            }
	        });

	        let singleKeys = ['from', 'sender'];
	        singleKeys.forEach(address => {
	            if (this.data[address]) {
	                this.data[address] = this.data[address].shift();
	            }
	        });

	        let pos = 0;
	        let resolveNext = () => {
	            if (pos >= keys.length) {
	                return callback(null, this.data);
	            }
	            let args = keys[pos++];
	            if (!args[0] || !args[0][args[1]]) {
	                return resolveNext();
	            }
	            shared.resolveContent(...args, (err, value) => {
	                if (err) {
	                    return callback(err);
	                }

	                let node = {
	                    content: value
	                };
	                if (args[0][args[1]] && typeof args[0][args[1]] === 'object' && !Buffer.isBuffer(args[0][args[1]])) {
	                    Object.keys(args[0][args[1]]).forEach(key => {
	                        if (!(key in node) && !['content', 'path', 'href', 'raw'].includes(key)) {
	                            node[key] = args[0][args[1]][key];
	                        }
	                    });
	                }

	                args[0][args[1]] = node;
	                resolveNext();
	            });
	        };

	        setImmediate(() => resolveNext());
	    }

	    normalize(callback) {
	        let envelope = this.data.envelope || this.message.getEnvelope();
	        let messageId = this.message.messageId();

	        this.resolveAll((err, data) => {
	            if (err) {
	                return callback(err);
	            }

	            data.envelope = envelope;
	            data.messageId = messageId;

	            ['html', 'text', 'watchHtml', 'amp'].forEach(key => {
	                if (data[key] && data[key].content) {
	                    if (typeof data[key].content === 'string') {
	                        data[key] = data[key].content;
	                    } else if (Buffer.isBuffer(data[key].content)) {
	                        data[key] = data[key].content.toString();
	                    }
	                }
	            });

	            if (data.icalEvent && Buffer.isBuffer(data.icalEvent.content)) {
	                data.icalEvent.content = data.icalEvent.content.toString('base64');
	                data.icalEvent.encoding = 'base64';
	            }

	            if (data.alternatives && data.alternatives.length) {
	                data.alternatives.forEach(alternative => {
	                    if (alternative && alternative.content && Buffer.isBuffer(alternative.content)) {
	                        alternative.content = alternative.content.toString('base64');
	                        alternative.encoding = 'base64';
	                    }
	                });
	            }

	            if (data.attachments && data.attachments.length) {
	                data.attachments.forEach(attachment => {
	                    if (attachment && attachment.content && Buffer.isBuffer(attachment.content)) {
	                        attachment.content = attachment.content.toString('base64');
	                        attachment.encoding = 'base64';
	                    }
	                });
	            }

	            data.normalizedHeaders = {};
	            Object.keys(data.headers || {}).forEach(key => {
	                let value = [].concat(data.headers[key] || []).shift();
	                value = (value && value.value) || value;
	                if (value) {
	                    if (['references', 'in-reply-to', 'message-id', 'content-id'].includes(key)) {
	                        value = this.message._encodeHeaderValue(key, value);
	                    }
	                    data.normalizedHeaders[key] = value;
	                }
	            });

	            if (data.list && typeof data.list === 'object') {
	                let listHeaders = this._getListHeaders(data.list);
	                listHeaders.forEach(entry => {
	                    data.normalizedHeaders[entry.key] = entry.value.map(val => (val && val.value) || val).join(', ');
	                });
	            }

	            if (data.references) {
	                data.normalizedHeaders.references = this.message._encodeHeaderValue('references', data.references);
	            }

	            if (data.inReplyTo) {
	                data.normalizedHeaders['in-reply-to'] = this.message._encodeHeaderValue('in-reply-to', data.inReplyTo);
	            }

	            return callback(null, data);
	        });
	    }

	    setMailerHeader() {
	        if (!this.message || !this.data.xMailer) {
	            return;
	        }
	        this.message.setHeader('X-Mailer', this.data.xMailer);
	    }

	    setPriorityHeaders() {
	        if (!this.message || !this.data.priority) {
	            return;
	        }
	        switch ((this.data.priority || '').toString().toLowerCase()) {
	            case 'high':
	                this.message.setHeader('X-Priority', '1 (Highest)');
	                this.message.setHeader('X-MSMail-Priority', 'High');
	                this.message.setHeader('Importance', 'High');
	                break;
	            case 'low':
	                this.message.setHeader('X-Priority', '5 (Lowest)');
	                this.message.setHeader('X-MSMail-Priority', 'Low');
	                this.message.setHeader('Importance', 'Low');
	                break;
	            // do not add anything, since all messages are 'Normal' by default
	        }
	    }

	    setListHeaders() {
	        if (!this.message || !this.data.list || typeof this.data.list !== 'object') {
	            return;
	        }
	        // add optional List-* headers
	        if (this.data.list && typeof this.data.list === 'object') {
	            this._getListHeaders(this.data.list).forEach(listHeader => {
	                listHeader.value.forEach(value => {
	                    this.message.addHeader(listHeader.key, value);
	                });
	            });
	        }
	    }

	    _getListHeaders(listData) {
	        // make sure an url looks like <protocol:url>
	        return Object.keys(listData).map(key => ({
	            key: 'list-' + key.toLowerCase().trim(),
	            value: [].concat(listData[key] || []).map(value => ({
	                prepared: true,
	                foldLines: true,
	                value: []
	                    .concat(value || [])
	                    .map(value => {
	                        if (typeof value === 'string') {
	                            value = {
	                                url: value
	                            };
	                        }

	                        if (value && value.url) {
	                            if (key.toLowerCase().trim() === 'id') {
	                                // List-ID: "comment" <domain>
	                                let comment = value.comment || '';
	                                if (mimeFuncs.isPlainText(comment)) {
	                                    comment = '"' + comment + '"';
	                                } else {
	                                    comment = mimeFuncs.encodeWord(comment);
	                                }

	                                return (value.comment ? comment + ' ' : '') + this._formatListUrl(value.url).replace(/^<[^:]+\/{,2}/, '');
	                            }

	                            // List-*: <http://domain> (comment)
	                            let comment = value.comment || '';
	                            if (!mimeFuncs.isPlainText(comment)) {
	                                comment = mimeFuncs.encodeWord(comment);
	                            }

	                            return this._formatListUrl(value.url) + (value.comment ? ' (' + comment + ')' : '');
	                        }

	                        return '';
	                    })
	                    .filter(value => value)
	                    .join(', ')
	            }))
	        }));
	    }

	    _formatListUrl(url) {
	        url = url.replace(/[\s<]+|[\s>]+/g, '');
	        if (/^(https?|mailto|ftp):/.test(url)) {
	            return '<' + url + '>';
	        }
	        if (/^[^@]+@[^@]+$/.test(url)) {
	            return '<mailto:' + url + '>';
	        }

	        return '<http://' + url + '>';
	    }
	}

	mailMessage = MailMessage;
	return mailMessage;
}

var mailer;
var hasRequiredMailer;

function requireMailer () {
	if (hasRequiredMailer) return mailer;
	hasRequiredMailer = 1;

	const EventEmitter = require$$0$5;
	const shared = requireShared();
	const mimeTypes = requireMimeTypes();
	const MailComposer = requireMailComposer();
	const DKIM = requireDkim();
	const httpProxyClient = requireHttpProxyClient();
	const util = require$$0$4;
	const urllib = require$$0$1;
	const packageData = require$$9;
	const MailMessage = requireMailMessage();
	const net = require$$0$3;
	const dns = require$$1$1;
	const crypto = crypto__default;

	/**
	 * Creates an object for exposing the Mail API
	 *
	 * @constructor
	 * @param {Object} transporter Transport object instance to pass the mails to
	 */
	class Mail extends EventEmitter {
	    constructor(transporter, options, defaults) {
	        super();

	        this.options = options || {};
	        this._defaults = defaults || {};

	        this._defaultPlugins = {
	            compile: [(...args) => this._convertDataImages(...args)],
	            stream: []
	        };

	        this._userPlugins = {
	            compile: [],
	            stream: []
	        };

	        this.meta = new Map();

	        this.dkim = this.options.dkim ? new DKIM(this.options.dkim) : false;

	        this.transporter = transporter;
	        this.transporter.mailer = this;

	        this.logger = shared.getLogger(this.options, {
	            component: this.options.component || 'mail'
	        });

	        this.logger.debug(
	            {
	                tnx: 'create'
	            },
	            'Creating transport: %s',
	            this.getVersionString()
	        );

	        // setup emit handlers for the transporter
	        if (typeof this.transporter.on === 'function') {
	            // deprecated log interface
	            this.transporter.on('log', log => {
	                this.logger.debug(
	                    {
	                        tnx: 'transport'
	                    },
	                    '%s: %s',
	                    log.type,
	                    log.message
	                );
	            });

	            // transporter errors
	            this.transporter.on('error', err => {
	                this.logger.error(
	                    {
	                        err,
	                        tnx: 'transport'
	                    },
	                    'Transport Error: %s',
	                    err.message
	                );
	                this.emit('error', err);
	            });

	            // indicates if the sender has became idle
	            this.transporter.on('idle', (...args) => {
	                this.emit('idle', ...args);
	            });

	            // indicates if the sender has became idle and all connections are terminated
	            this.transporter.on('clear', (...args) => {
	                this.emit('clear', ...args);
	            });
	        }

	        /**
	         * Optional methods passed to the underlying transport object
	         */
	        ['close', 'isIdle', 'verify'].forEach(method => {
	            this[method] = (...args) => {
	                if (typeof this.transporter[method] === 'function') {
	                    if (method === 'verify' && typeof this.getSocket === 'function') {
	                        this.transporter.getSocket = this.getSocket;
	                        this.getSocket = false;
	                    }
	                    return this.transporter[method](...args);
	                } else {
	                    this.logger.warn(
	                        {
	                            tnx: 'transport',
	                            methodName: method
	                        },
	                        'Non existing method %s called for transport',
	                        method
	                    );
	                    return false;
	                }
	            };
	        });

	        // setup proxy handling
	        if (this.options.proxy && typeof this.options.proxy === 'string') {
	            this.setupProxy(this.options.proxy);
	        }
	    }

	    use(step, plugin) {
	        step = (step || '').toString();
	        if (!this._userPlugins.hasOwnProperty(step)) {
	            this._userPlugins[step] = [plugin];
	        } else {
	            this._userPlugins[step].push(plugin);
	        }

	        return this;
	    }

	    /**
	     * Sends an email using the preselected transport object
	     *
	     * @param {Object} data E-data description
	     * @param {Function?} callback Callback to run once the sending succeeded or failed
	     */
	    sendMail(data, callback = null) {
	        let promise;

	        if (!callback) {
	            promise = new Promise((resolve, reject) => {
	                callback = shared.callbackPromise(resolve, reject);
	            });
	        }

	        if (typeof this.getSocket === 'function') {
	            this.transporter.getSocket = this.getSocket;
	            this.getSocket = false;
	        }

	        let mail = new MailMessage(this, data);

	        this.logger.debug(
	            {
	                tnx: 'transport',
	                name: this.transporter.name,
	                version: this.transporter.version,
	                action: 'send'
	            },
	            'Sending mail using %s/%s',
	            this.transporter.name,
	            this.transporter.version
	        );

	        this._processPlugins('compile', mail, err => {
	            if (err) {
	                this.logger.error(
	                    {
	                        err,
	                        tnx: 'plugin',
	                        action: 'compile'
	                    },
	                    'PluginCompile Error: %s',
	                    err.message
	                );
	                return callback(err);
	            }

	            mail.message = new MailComposer(mail.data).compile();

	            mail.setMailerHeader();
	            mail.setPriorityHeaders();
	            mail.setListHeaders();

	            this._processPlugins('stream', mail, err => {
	                if (err) {
	                    this.logger.error(
	                        {
	                            err,
	                            tnx: 'plugin',
	                            action: 'stream'
	                        },
	                        'PluginStream Error: %s',
	                        err.message
	                    );
	                    return callback(err);
	                }

	                if (mail.data.dkim || this.dkim) {
	                    mail.message.processFunc(input => {
	                        let dkim = mail.data.dkim ? new DKIM(mail.data.dkim) : this.dkim;
	                        this.logger.debug(
	                            {
	                                tnx: 'DKIM',
	                                messageId: mail.message.messageId(),
	                                dkimDomains: dkim.keys.map(key => key.keySelector + '.' + key.domainName).join(', ')
	                            },
	                            'Signing outgoing message with %s keys',
	                            dkim.keys.length
	                        );
	                        return dkim.sign(input, mail.data._dkim);
	                    });
	                }

	                this.transporter.send(mail, (...args) => {
	                    if (args[0]) {
	                        this.logger.error(
	                            {
	                                err: args[0],
	                                tnx: 'transport',
	                                action: 'send'
	                            },
	                            'Send Error: %s',
	                            args[0].message
	                        );
	                    }
	                    callback(...args);
	                });
	            });
	        });

	        return promise;
	    }

	    getVersionString() {
	        return util.format(
	            '%s (%s; +%s; %s/%s)',
	            packageData.name,
	            packageData.version,
	            packageData.homepage,
	            this.transporter.name,
	            this.transporter.version
	        );
	    }

	    _processPlugins(step, mail, callback) {
	        step = (step || '').toString();

	        if (!this._userPlugins.hasOwnProperty(step)) {
	            return callback();
	        }

	        let userPlugins = this._userPlugins[step] || [];
	        let defaultPlugins = this._defaultPlugins[step] || [];

	        if (userPlugins.length) {
	            this.logger.debug(
	                {
	                    tnx: 'transaction',
	                    pluginCount: userPlugins.length,
	                    step
	                },
	                'Using %s plugins for %s',
	                userPlugins.length,
	                step
	            );
	        }

	        if (userPlugins.length + defaultPlugins.length === 0) {
	            return callback();
	        }

	        let pos = 0;
	        let block = 'default';
	        let processPlugins = () => {
	            let curplugins = block === 'default' ? defaultPlugins : userPlugins;
	            if (pos >= curplugins.length) {
	                if (block === 'default' && userPlugins.length) {
	                    block = 'user';
	                    pos = 0;
	                    curplugins = userPlugins;
	                } else {
	                    return callback();
	                }
	            }
	            let plugin = curplugins[pos++];
	            plugin(mail, err => {
	                if (err) {
	                    return callback(err);
	                }
	                processPlugins();
	            });
	        };

	        processPlugins();
	    }

	    /**
	     * Sets up proxy handler for a Nodemailer object
	     *
	     * @param {String} proxyUrl Proxy configuration url
	     */
	    setupProxy(proxyUrl) {
	        let proxy = urllib.parse(proxyUrl);

	        // setup socket handler for the mailer object
	        this.getSocket = (options, callback) => {
	            let protocol = proxy.protocol.replace(/:$/, '').toLowerCase();

	            if (this.meta.has('proxy_handler_' + protocol)) {
	                return this.meta.get('proxy_handler_' + protocol)(proxy, options, callback);
	            }

	            switch (protocol) {
	                // Connect using a HTTP CONNECT method
	                case 'http':
	                case 'https':
	                    httpProxyClient(proxy.href, options.port, options.host, (err, socket) => {
	                        if (err) {
	                            return callback(err);
	                        }
	                        return callback(null, {
	                            connection: socket
	                        });
	                    });
	                    return;
	                case 'socks':
	                case 'socks5':
	                case 'socks4':
	                case 'socks4a': {
	                    if (!this.meta.has('proxy_socks_module')) {
	                        return callback(new Error('Socks module not loaded'));
	                    }
	                    let connect = ipaddress => {
	                        let proxyV2 = !!this.meta.get('proxy_socks_module').SocksClient;
	                        let socksClient = proxyV2 ? this.meta.get('proxy_socks_module').SocksClient : this.meta.get('proxy_socks_module');
	                        let proxyType = Number(proxy.protocol.replace(/\D/g, '')) || 5;
	                        let connectionOpts = {
	                            proxy: {
	                                ipaddress,
	                                port: Number(proxy.port),
	                                type: proxyType
	                            },
	                            [proxyV2 ? 'destination' : 'target']: {
	                                host: options.host,
	                                port: options.port
	                            },
	                            command: 'connect'
	                        };

	                        if (proxy.auth) {
	                            let username = decodeURIComponent(proxy.auth.split(':').shift());
	                            let password = decodeURIComponent(proxy.auth.split(':').pop());
	                            if (proxyV2) {
	                                connectionOpts.proxy.userId = username;
	                                connectionOpts.proxy.password = password;
	                            } else if (proxyType === 4) {
	                                connectionOpts.userid = username;
	                            } else {
	                                connectionOpts.authentication = {
	                                    username,
	                                    password
	                                };
	                            }
	                        }

	                        socksClient.createConnection(connectionOpts, (err, info) => {
	                            if (err) {
	                                return callback(err);
	                            }
	                            return callback(null, {
	                                connection: info.socket || info
	                            });
	                        });
	                    };

	                    if (net.isIP(proxy.hostname)) {
	                        return connect(proxy.hostname);
	                    }

	                    return dns.resolve(proxy.hostname, (err, address) => {
	                        if (err) {
	                            return callback(err);
	                        }
	                        connect(Array.isArray(address) ? address[0] : address);
	                    });
	                }
	            }
	            callback(new Error('Unknown proxy configuration'));
	        };
	    }

	    _convertDataImages(mail, callback) {
	        if ((!this.options.attachDataUrls && !mail.data.attachDataUrls) || !mail.data.html) {
	            return callback();
	        }
	        mail.resolveContent(mail.data, 'html', (err, html) => {
	            if (err) {
	                return callback(err);
	            }
	            let cidCounter = 0;
	            html = (html || '')
	                .toString()
	                .replace(/(<img\b[^<>]{0,1024} src\s{0,20}=[\s"']{0,20})(data:([^;]+);[^"'>\s]+)/gi, (match, prefix, dataUri, mimeType) => {
	                    let cid = crypto.randomBytes(10).toString('hex') + '@localhost';
	                    if (!mail.data.attachments) {
	                        mail.data.attachments = [];
	                    }
	                    if (!Array.isArray(mail.data.attachments)) {
	                        mail.data.attachments = [].concat(mail.data.attachments || []);
	                    }
	                    mail.data.attachments.push({
	                        path: dataUri,
	                        cid,
	                        filename: 'image-' + ++cidCounter + '.' + mimeTypes.detectExtension(mimeType)
	                    });
	                    return prefix + 'cid:' + cid;
	                });
	            mail.data.html = html;
	            callback();
	        });
	    }

	    set(key, value) {
	        return this.meta.set(key, value);
	    }

	    get(key) {
	        return this.meta.get(key);
	    }
	}

	mailer = Mail;
	return mailer;
}

var dataStream;
var hasRequiredDataStream;

function requireDataStream () {
	if (hasRequiredDataStream) return dataStream;
	hasRequiredDataStream = 1;

	const stream = require$$0$2;
	const Transform = stream.Transform;

	/**
	 * Escapes dots in the beginning of lines. Ends the stream with <CR><LF>.<CR><LF>
	 * Also makes sure that only <CR><LF> sequences are used for linebreaks
	 *
	 * @param {Object} options Stream options
	 */
	class DataStream extends Transform {
	    constructor(options) {
	        super(options);
	        // init Transform
	        this.options = options || {};
	        this._curLine = '';

	        this.inByteCount = 0;
	        this.outByteCount = 0;
	        this.lastByte = false;
	    }

	    /**
	     * Escapes dots
	     */
	    _transform(chunk, encoding, done) {
	        let chunks = [];
	        let chunklen = 0;
	        let i,
	            len,
	            lastPos = 0;
	        let buf;

	        if (!chunk || !chunk.length) {
	            return done();
	        }

	        if (typeof chunk === 'string') {
	            chunk = Buffer.from(chunk);
	        }

	        this.inByteCount += chunk.length;

	        for (i = 0, len = chunk.length; i < len; i++) {
	            if (chunk[i] === 0x2e) {
	                // .
	                if ((i && chunk[i - 1] === 0x0a) || (!i && (!this.lastByte || this.lastByte === 0x0a))) {
	                    buf = chunk.slice(lastPos, i + 1);
	                    chunks.push(buf);
	                    chunks.push(Buffer.from('.'));
	                    chunklen += buf.length + 1;
	                    lastPos = i + 1;
	                }
	            } else if (chunk[i] === 0x0a) {
	                // .
	                if ((i && chunk[i - 1] !== 0x0d) || (!i && this.lastByte !== 0x0d)) {
	                    if (i > lastPos) {
	                        buf = chunk.slice(lastPos, i);
	                        chunks.push(buf);
	                        chunklen += buf.length + 2;
	                    } else {
	                        chunklen += 2;
	                    }
	                    chunks.push(Buffer.from('\r\n'));
	                    lastPos = i + 1;
	                }
	            }
	        }

	        if (chunklen) {
	            // add last piece
	            if (lastPos < chunk.length) {
	                buf = chunk.slice(lastPos);
	                chunks.push(buf);
	                chunklen += buf.length;
	            }

	            this.outByteCount += chunklen;
	            this.push(Buffer.concat(chunks, chunklen));
	        } else {
	            this.outByteCount += chunk.length;
	            this.push(chunk);
	        }

	        this.lastByte = chunk[chunk.length - 1];
	        done();
	    }

	    /**
	     * Finalizes the stream with a dot on a single line
	     */
	    _flush(done) {
	        let buf;
	        if (this.lastByte === 0x0a) {
	            buf = Buffer.from('.\r\n');
	        } else if (this.lastByte === 0x0d) {
	            buf = Buffer.from('\n.\r\n');
	        } else {
	            buf = Buffer.from('\r\n.\r\n');
	        }
	        this.outByteCount += buf.length;
	        this.push(buf);
	        done();
	    }
	}

	dataStream = DataStream;
	return dataStream;
}

var smtpConnection;
var hasRequiredSmtpConnection;

function requireSmtpConnection () {
	if (hasRequiredSmtpConnection) return smtpConnection;
	hasRequiredSmtpConnection = 1;

	const packageInfo = require$$9;
	const EventEmitter = require$$0$5.EventEmitter;
	const net = require$$0$3;
	const tls = require$$4;
	const os = require$$1;
	const crypto = crypto__default;
	const DataStream = requireDataStream();
	const PassThrough = require$$0$2.PassThrough;
	const shared = requireShared();

	// default timeout values in ms
	const CONNECTION_TIMEOUT = 2 * 60 * 1000; // how much to wait for the connection to be established
	const SOCKET_TIMEOUT = 10 * 60 * 1000; // how much to wait for socket inactivity before disconnecting the client
	const GREETING_TIMEOUT = 30 * 1000; // how much to wait after connection is established but SMTP greeting is not receieved
	const DNS_TIMEOUT = 30 * 1000; // how much to wait for resolveHostname

	/**
	 * Generates a SMTP connection object
	 *
	 * Optional options object takes the following possible properties:
	 *
	 *  * **port** - is the port to connect to (defaults to 587 or 465)
	 *  * **host** - is the hostname or IP address to connect to (defaults to 'localhost')
	 *  * **secure** - use SSL
	 *  * **ignoreTLS** - ignore server support for STARTTLS
	 *  * **requireTLS** - forces the client to use STARTTLS
	 *  * **name** - the name of the client server
	 *  * **localAddress** - outbound address to bind to (see: http://nodejs.org/api/net.html#net_net_connect_options_connectionlistener)
	 *  * **greetingTimeout** - Time to wait in ms until greeting message is received from the server (defaults to 10000)
	 *  * **connectionTimeout** - how many milliseconds to wait for the connection to establish
	 *  * **socketTimeout** - Time of inactivity until the connection is closed (defaults to 1 hour)
	 *  * **dnsTimeout** - Time to wait in ms for the DNS requests to be resolved (defaults to 30 seconds)
	 *  * **lmtp** - if true, uses LMTP instead of SMTP protocol
	 *  * **logger** - bunyan compatible logger interface
	 *  * **debug** - if true pass SMTP traffic to the logger
	 *  * **tls** - options for createCredentials
	 *  * **socket** - existing socket to use instead of creating a new one (see: http://nodejs.org/api/net.html#net_class_net_socket)
	 *  * **secured** - boolean indicates that the provided socket has already been upgraded to tls
	 *
	 * @constructor
	 * @namespace SMTP Client module
	 * @param {Object} [options] Option properties
	 */
	class SMTPConnection extends EventEmitter {
	    constructor(options) {
	        super(options);

	        this.id = crypto.randomBytes(8).toString('base64').replace(/\W/g, '');
	        this.stage = 'init';

	        this.options = options || {};

	        this.secureConnection = !!this.options.secure;
	        this.alreadySecured = !!this.options.secured;

	        this.port = Number(this.options.port) || (this.secureConnection ? 465 : 587);
	        this.host = this.options.host || 'localhost';

	        this.servername = this.options.servername ? this.options.servername : !net.isIP(this.host) ? this.host : false;

	        this.allowInternalNetworkInterfaces = this.options.allowInternalNetworkInterfaces || false;

	        if (typeof this.options.secure === 'undefined' && this.port === 465) {
	            // if secure option is not set but port is 465, then default to secure
	            this.secureConnection = true;
	        }

	        this.name = this.options.name || this._getHostname();

	        this.logger = shared.getLogger(this.options, {
	            component: this.options.component || 'smtp-connection',
	            sid: this.id
	        });

	        this.customAuth = new Map();
	        Object.keys(this.options.customAuth || {}).forEach(key => {
	            let mapKey = (key || '').toString().trim().toUpperCase();
	            if (!mapKey) {
	                return;
	            }
	            this.customAuth.set(mapKey, this.options.customAuth[key]);
	        });

	        /**
	         * Expose version nr, just for the reference
	         * @type {String}
	         */
	        this.version = packageInfo.version;

	        /**
	         * If true, then the user is authenticated
	         * @type {Boolean}
	         */
	        this.authenticated = false;

	        /**
	         * If set to true, this instance is no longer active
	         * @private
	         */
	        this.destroyed = false;

	        /**
	         * Defines if the current connection is secure or not. If not,
	         * STARTTLS can be used if available
	         * @private
	         */
	        this.secure = !!this.secureConnection;

	        /**
	         * Store incomplete messages coming from the server
	         * @private
	         */
	        this._remainder = '';

	        /**
	         * Unprocessed responses from the server
	         * @type {Array}
	         */
	        this._responseQueue = [];

	        this.lastServerResponse = false;

	        /**
	         * The socket connecting to the server
	         * @public
	         */
	        this._socket = false;

	        /**
	         * Lists supported auth mechanisms
	         * @private
	         */
	        this._supportedAuth = [];

	        /**
	         * Set to true, if EHLO response includes "AUTH".
	         * If false then authentication is not tried
	         */
	        this.allowsAuth = false;

	        /**
	         * Includes current envelope (from, to)
	         * @private
	         */
	        this._envelope = false;

	        /**
	         * Lists supported extensions
	         * @private
	         */
	        this._supportedExtensions = [];

	        /**
	         * Defines the maximum allowed size for a single message
	         * @private
	         */
	        this._maxAllowedSize = 0;

	        /**
	         * Function queue to run if a data chunk comes from the server
	         * @private
	         */
	        this._responseActions = [];
	        this._recipientQueue = [];

	        /**
	         * Timeout variable for waiting the greeting
	         * @private
	         */
	        this._greetingTimeout = false;

	        /**
	         * Timeout variable for waiting the connection to start
	         * @private
	         */
	        this._connectionTimeout = false;

	        /**
	         * If the socket is deemed already closed
	         * @private
	         */
	        this._destroyed = false;

	        /**
	         * If the socket is already being closed
	         * @private
	         */
	        this._closing = false;

	        /**
	         * Callbacks for socket's listeners
	         */
	        this._onSocketData = chunk => this._onData(chunk);
	        this._onSocketError = error => this._onError(error, 'ESOCKET', false, 'CONN');
	        this._onSocketClose = () => this._onClose();
	        this._onSocketEnd = () => this._onEnd();
	        this._onSocketTimeout = () => this._onTimeout();
	    }

	    /**
	     * Creates a connection to a SMTP server and sets up connection
	     * listener
	     */
	    connect(connectCallback) {
	        if (typeof connectCallback === 'function') {
	            this.once('connect', () => {
	                this.logger.debug(
	                    {
	                        tnx: 'smtp'
	                    },
	                    'SMTP handshake finished'
	                );
	                connectCallback();
	            });

	            const isDestroyedMessage = this._isDestroyedMessage('connect');
	            if (isDestroyedMessage) {
	                return connectCallback(this._formatError(isDestroyedMessage, 'ECONNECTION', false, 'CONN'));
	            }
	        }

	        let opts = {
	            port: this.port,
	            host: this.host,
	            allowInternalNetworkInterfaces: this.allowInternalNetworkInterfaces,
	            timeout: this.options.dnsTimeout || DNS_TIMEOUT
	        };

	        if (this.options.localAddress) {
	            opts.localAddress = this.options.localAddress;
	        }

	        let setupConnectionHandlers = () => {
	            this._connectionTimeout = setTimeout(() => {
	                this._onError('Connection timeout', 'ETIMEDOUT', false, 'CONN');
	            }, this.options.connectionTimeout || CONNECTION_TIMEOUT);

	            this._socket.on('error', this._onSocketError);
	        };

	        if (this.options.connection) {
	            // connection is already opened
	            this._socket = this.options.connection;
	            setupConnectionHandlers();

	            if (this.secureConnection && !this.alreadySecured) {
	                setImmediate(() =>
	                    this._upgradeConnection(err => {
	                        if (err) {
	                            this._onError(new Error('Error initiating TLS - ' + (err.message || err)), 'ETLS', false, 'CONN');
	                            return;
	                        }
	                        this._onConnect();
	                    })
	                );
	            } else {
	                setImmediate(() => this._onConnect());
	            }
	            return;
	        } else if (this.options.socket) {
	            // socket object is set up but not yet connected
	            this._socket = this.options.socket;
	            return shared.resolveHostname(opts, (err, resolved) => {
	                if (err) {
	                    return setImmediate(() => this._onError(err, 'EDNS', false, 'CONN'));
	                }
	                this.logger.debug(
	                    {
	                        tnx: 'dns',
	                        source: opts.host,
	                        resolved: resolved.host,
	                        cached: !!resolved.cached
	                    },
	                    'Resolved %s as %s [cache %s]',
	                    opts.host,
	                    resolved.host,
	                    resolved.cached ? 'hit' : 'miss'
	                );
	                Object.keys(resolved).forEach(key => {
	                    if (key.charAt(0) !== '_' && resolved[key]) {
	                        opts[key] = resolved[key];
	                    }
	                });
	                try {
	                    this._socket.connect(this.port, this.host, () => {
	                        this._socket.setKeepAlive(true);
	                        this._onConnect();
	                    });
	                    setupConnectionHandlers();
	                } catch (E) {
	                    return setImmediate(() => this._onError(E, 'ECONNECTION', false, 'CONN'));
	                }
	            });
	        } else if (this.secureConnection) {
	            // connect using tls
	            if (this.options.tls) {
	                Object.keys(this.options.tls).forEach(key => {
	                    opts[key] = this.options.tls[key];
	                });
	            }

	            // ensure servername for SNI
	            if (this.servername && !opts.servername) {
	                opts.servername = this.servername;
	            }

	            return shared.resolveHostname(opts, (err, resolved) => {
	                if (err) {
	                    return setImmediate(() => this._onError(err, 'EDNS', false, 'CONN'));
	                }
	                this.logger.debug(
	                    {
	                        tnx: 'dns',
	                        source: opts.host,
	                        resolved: resolved.host,
	                        cached: !!resolved.cached
	                    },
	                    'Resolved %s as %s [cache %s]',
	                    opts.host,
	                    resolved.host,
	                    resolved.cached ? 'hit' : 'miss'
	                );
	                Object.keys(resolved).forEach(key => {
	                    if (key.charAt(0) !== '_' && resolved[key]) {
	                        opts[key] = resolved[key];
	                    }
	                });
	                try {
	                    this._socket = tls.connect(opts, () => {
	                        this._socket.setKeepAlive(true);
	                        this._onConnect();
	                    });
	                    setupConnectionHandlers();
	                } catch (E) {
	                    return setImmediate(() => this._onError(E, 'ECONNECTION', false, 'CONN'));
	                }
	            });
	        } else {
	            // connect using plaintext
	            return shared.resolveHostname(opts, (err, resolved) => {
	                if (err) {
	                    return setImmediate(() => this._onError(err, 'EDNS', false, 'CONN'));
	                }
	                this.logger.debug(
	                    {
	                        tnx: 'dns',
	                        source: opts.host,
	                        resolved: resolved.host,
	                        cached: !!resolved.cached
	                    },
	                    'Resolved %s as %s [cache %s]',
	                    opts.host,
	                    resolved.host,
	                    resolved.cached ? 'hit' : 'miss'
	                );
	                Object.keys(resolved).forEach(key => {
	                    if (key.charAt(0) !== '_' && resolved[key]) {
	                        opts[key] = resolved[key];
	                    }
	                });
	                try {
	                    this._socket = net.connect(opts, () => {
	                        this._socket.setKeepAlive(true);
	                        this._onConnect();
	                    });
	                    setupConnectionHandlers();
	                } catch (E) {
	                    return setImmediate(() => this._onError(E, 'ECONNECTION', false, 'CONN'));
	                }
	            });
	        }
	    }

	    /**
	     * Sends QUIT
	     */
	    quit() {
	        this._sendCommand('QUIT');
	        this._responseActions.push(this.close);
	    }

	    /**
	     * Closes the connection to the server
	     */
	    close() {
	        clearTimeout(this._connectionTimeout);
	        clearTimeout(this._greetingTimeout);
	        this._responseActions = [];

	        // allow to run this function only once
	        if (this._closing) {
	            return;
	        }
	        this._closing = true;

	        let closeMethod = 'end';

	        if (this.stage === 'init') {
	            // Close the socket immediately when connection timed out
	            closeMethod = 'destroy';
	        }

	        this.logger.debug(
	            {
	                tnx: 'smtp'
	            },
	            'Closing connection to the server using "%s"',
	            closeMethod
	        );

	        let socket = (this._socket && this._socket.socket) || this._socket;

	        if (socket && !socket.destroyed) {
	            try {
	                socket[closeMethod]();
	            } catch (_E) {
	                // just ignore
	            }
	        }

	        this._destroy();
	    }

	    /**
	     * Authenticate user
	     */
	    login(authData, callback) {
	        const isDestroyedMessage = this._isDestroyedMessage('login');
	        if (isDestroyedMessage) {
	            return callback(this._formatError(isDestroyedMessage, 'ECONNECTION', false, 'API'));
	        }

	        this._auth = authData || {};
	        // Select SASL authentication method
	        this._authMethod = (this._auth.method || '').toString().trim().toUpperCase() || false;

	        if (!this._authMethod && this._auth.oauth2 && !this._auth.credentials) {
	            this._authMethod = 'XOAUTH2';
	        } else if (!this._authMethod || (this._authMethod === 'XOAUTH2' && !this._auth.oauth2)) {
	            // use first supported
	            this._authMethod = (this._supportedAuth[0] || 'PLAIN').toUpperCase().trim();
	        }

	        if (this._authMethod !== 'XOAUTH2' && (!this._auth.credentials || !this._auth.credentials.user || !this._auth.credentials.pass)) {
	            if ((this._auth.user && this._auth.pass) || this.customAuth.has(this._authMethod)) {
	                this._auth.credentials = {
	                    user: this._auth.user,
	                    pass: this._auth.pass,
	                    options: this._auth.options
	                };
	            } else {
	                return callback(this._formatError('Missing credentials for "' + this._authMethod + '"', 'EAUTH', false, 'API'));
	            }
	        }

	        if (this.customAuth.has(this._authMethod)) {
	            let handler = this.customAuth.get(this._authMethod);
	            let lastResponse;
	            let returned = false;

	            let resolve = () => {
	                if (returned) {
	                    return;
	                }
	                returned = true;
	                this.logger.info(
	                    {
	                        tnx: 'smtp',
	                        username: this._auth.user,
	                        action: 'authenticated',
	                        method: this._authMethod
	                    },
	                    'User %s authenticated',
	                    JSON.stringify(this._auth.user)
	                );
	                this.authenticated = true;
	                callback(null, true);
	            };

	            let reject = err => {
	                if (returned) {
	                    return;
	                }
	                returned = true;
	                callback(this._formatError(err, 'EAUTH', lastResponse, 'AUTH ' + this._authMethod));
	            };

	            let handlerResponse = handler({
	                auth: this._auth,
	                method: this._authMethod,

	                extensions: [].concat(this._supportedExtensions),
	                authMethods: [].concat(this._supportedAuth),
	                maxAllowedSize: this._maxAllowedSize || false,

	                sendCommand: (cmd, done) => {
	                    let promise;

	                    if (!done) {
	                        promise = new Promise((resolve, reject) => {
	                            done = shared.callbackPromise(resolve, reject);
	                        });
	                    }

	                    this._responseActions.push(str => {
	                        lastResponse = str;

	                        let codes = str.match(/^(\d+)(?:\s(\d+\.\d+\.\d+))?\s/);
	                        let data = {
	                            command: cmd,
	                            response: str
	                        };
	                        if (codes) {
	                            data.status = Number(codes[1]) || 0;
	                            if (codes[2]) {
	                                data.code = codes[2];
	                            }
	                            data.text = str.substr(codes[0].length);
	                        } else {
	                            data.text = str;
	                            data.status = 0; // just in case we need to perform numeric comparisons
	                        }
	                        done(null, data);
	                    });
	                    setImmediate(() => this._sendCommand(cmd));

	                    return promise;
	                },

	                resolve,
	                reject
	            });

	            if (handlerResponse && typeof handlerResponse.catch === 'function') {
	                // a promise was returned
	                handlerResponse.then(resolve).catch(reject);
	            }

	            return;
	        }

	        switch (this._authMethod) {
	            case 'XOAUTH2':
	                this._handleXOauth2Token(false, callback);
	                return;
	            case 'LOGIN':
	                this._responseActions.push(str => {
	                    this._actionAUTH_LOGIN_USER(str, callback);
	                });
	                this._sendCommand('AUTH LOGIN');
	                return;
	            case 'PLAIN':
	                this._responseActions.push(str => {
	                    this._actionAUTHComplete(str, callback);
	                });
	                this._sendCommand(
	                    'AUTH PLAIN ' +
	                        Buffer.from(
	                            //this._auth.user+'\u0000'+
	                            '\u0000' + // skip authorization identity as it causes problems with some servers
	                                this._auth.credentials.user +
	                                '\u0000' +
	                                this._auth.credentials.pass,
	                            'utf-8'
	                        ).toString('base64'),
	                    // log entry without passwords
	                    'AUTH PLAIN ' +
	                        Buffer.from(
	                            //this._auth.user+'\u0000'+
	                            '\u0000' + // skip authorization identity as it causes problems with some servers
	                                this._auth.credentials.user +
	                                '\u0000' +
	                                '/* secret */',
	                            'utf-8'
	                        ).toString('base64')
	                );
	                return;
	            case 'CRAM-MD5':
	                this._responseActions.push(str => {
	                    this._actionAUTH_CRAM_MD5(str, callback);
	                });
	                this._sendCommand('AUTH CRAM-MD5');
	                return;
	        }

	        return callback(this._formatError('Unknown authentication method "' + this._authMethod + '"', 'EAUTH', false, 'API'));
	    }

	    /**
	     * Sends a message
	     *
	     * @param {Object} envelope Envelope object, {from: addr, to: [addr]}
	     * @param {Object} message String, Buffer or a Stream
	     * @param {Function} callback Callback to return once sending is completed
	     */
	    send(envelope, message, done) {
	        if (!message) {
	            return done(this._formatError('Empty message', 'EMESSAGE', false, 'API'));
	        }

	        const isDestroyedMessage = this._isDestroyedMessage('send message');
	        if (isDestroyedMessage) {
	            return done(this._formatError(isDestroyedMessage, 'ECONNECTION', false, 'API'));
	        }

	        // reject larger messages than allowed
	        if (this._maxAllowedSize && envelope.size > this._maxAllowedSize) {
	            return setImmediate(() => {
	                done(this._formatError('Message size larger than allowed ' + this._maxAllowedSize, 'EMESSAGE', false, 'MAIL FROM'));
	            });
	        }

	        // ensure that callback is only called once
	        let returned = false;
	        let callback = function () {
	            if (returned) {
	                return;
	            }
	            returned = true;

	            done(...arguments);
	        };

	        if (typeof message.on === 'function') {
	            message.on('error', err => callback(this._formatError(err, 'ESTREAM', false, 'API')));
	        }

	        let startTime = Date.now();
	        this._setEnvelope(envelope, (err, info) => {
	            if (err) {
	                // create passthrough stream to consume to prevent OOM
	                let stream = new PassThrough();
	                if (typeof message.pipe === 'function') {
	                    message.pipe(stream);
	                } else {
	                    stream.write(message);
	                    stream.end();
	                }

	                return callback(err);
	            }
	            let envelopeTime = Date.now();
	            let stream = this._createSendStream((err, str) => {
	                if (err) {
	                    return callback(err);
	                }

	                info.envelopeTime = envelopeTime - startTime;
	                info.messageTime = Date.now() - envelopeTime;
	                info.messageSize = stream.outByteCount;
	                info.response = str;

	                return callback(null, info);
	            });
	            if (typeof message.pipe === 'function') {
	                message.pipe(stream);
	            } else {
	                stream.write(message);
	                stream.end();
	            }
	        });
	    }

	    /**
	     * Resets connection state
	     *
	     * @param {Function} callback Callback to return once connection is reset
	     */
	    reset(callback) {
	        this._sendCommand('RSET');
	        this._responseActions.push(str => {
	            if (str.charAt(0) !== '2') {
	                return callback(this._formatError('Could not reset session state. response=' + str, 'EPROTOCOL', str, 'RSET'));
	            }
	            this._envelope = false;
	            return callback(null, true);
	        });
	    }

	    /**
	     * Connection listener that is run when the connection to
	     * the server is opened
	     *
	     * @event
	     */
	    _onConnect() {
	        clearTimeout(this._connectionTimeout);

	        this.logger.info(
	            {
	                tnx: 'network',
	                localAddress: this._socket.localAddress,
	                localPort: this._socket.localPort,
	                remoteAddress: this._socket.remoteAddress,
	                remotePort: this._socket.remotePort
	            },
	            '%s established to %s:%s',
	            this.secure ? 'Secure connection' : 'Connection',
	            this._socket.remoteAddress,
	            this._socket.remotePort
	        );

	        if (this._destroyed) {
	            // Connection was established after we already had canceled it
	            this.close();
	            return;
	        }

	        this.stage = 'connected';

	        // clear existing listeners for the socket
	        this._socket.removeListener('data', this._onSocketData);
	        this._socket.removeListener('timeout', this._onSocketTimeout);
	        this._socket.removeListener('close', this._onSocketClose);
	        this._socket.removeListener('end', this._onSocketEnd);

	        this._socket.on('data', this._onSocketData);
	        this._socket.once('close', this._onSocketClose);
	        this._socket.once('end', this._onSocketEnd);

	        this._socket.setTimeout(this.options.socketTimeout || SOCKET_TIMEOUT);
	        this._socket.on('timeout', this._onSocketTimeout);

	        this._greetingTimeout = setTimeout(() => {
	            // if still waiting for greeting, give up
	            if (this._socket && !this._destroyed && this._responseActions[0] === this._actionGreeting) {
	                this._onError('Greeting never received', 'ETIMEDOUT', false, 'CONN');
	            }
	        }, this.options.greetingTimeout || GREETING_TIMEOUT);

	        this._responseActions.push(this._actionGreeting);

	        // we have a 'data' listener set up so resume socket if it was paused
	        this._socket.resume();
	    }

	    /**
	     * 'data' listener for data coming from the server
	     *
	     * @event
	     * @param {Buffer} chunk Data chunk coming from the server
	     */
	    _onData(chunk) {
	        if (this._destroyed || !chunk || !chunk.length) {
	            return;
	        }

	        let data = (chunk || '').toString('binary');
	        let lines = (this._remainder + data).split(/\r?\n/);
	        let lastline;

	        this._remainder = lines.pop();

	        for (let i = 0, len = lines.length; i < len; i++) {
	            if (this._responseQueue.length) {
	                lastline = this._responseQueue[this._responseQueue.length - 1];
	                if (/^\d+-/.test(lastline.split('\n').pop())) {
	                    this._responseQueue[this._responseQueue.length - 1] += '\n' + lines[i];
	                    continue;
	                }
	            }
	            this._responseQueue.push(lines[i]);
	        }

	        if (this._responseQueue.length) {
	            lastline = this._responseQueue[this._responseQueue.length - 1];
	            if (/^\d+-/.test(lastline.split('\n').pop())) {
	                return;
	            }
	        }

	        this._processResponse();
	    }

	    /**
	     * 'error' listener for the socket
	     *
	     * @event
	     * @param {Error} err Error object
	     * @param {String} type Error name
	     */
	    _onError(err, type, data, command) {
	        clearTimeout(this._connectionTimeout);
	        clearTimeout(this._greetingTimeout);

	        if (this._destroyed) {
	            // just ignore, already closed
	            // this might happen when a socket is canceled because of reached timeout
	            // but the socket timeout error itself receives only after
	            return;
	        }

	        err = this._formatError(err, type, data, command);

	        const transientCodes = ['ETIMEDOUT', 'ESOCKET', 'ECONNECTION'];
	        if (transientCodes.includes(err.code)) {
	            this.logger.warn(data, err.message);
	        } else {
	            this.logger.error(data, err.message);
	        }

	        this.emit('error', err);
	        this.close();
	    }

	    _formatError(message, type, response, command) {
	        let err;

	        if (/Error\]$/i.test(Object.prototype.toString.call(message))) {
	            err = message;
	        } else {
	            err = new Error(message);
	        }

	        if (type && type !== 'Error') {
	            err.code = type;
	        }

	        if (response) {
	            err.response = response;
	            err.message += ': ' + response;
	        }

	        let responseCode = (typeof response === 'string' && Number((response.match(/^\d+/) || [])[0])) || false;
	        if (responseCode) {
	            err.responseCode = responseCode;
	        }

	        if (command) {
	            err.command = command;
	        }

	        return err;
	    }

	    /**
	     * 'close' listener for the socket
	     *
	     * @event
	     */
	    _onClose() {
	        let serverResponse = false;

	        if (this._remainder && this._remainder.trim()) {
	            if (this.options.debug || this.options.transactionLog) {
	                this.logger.debug(
	                    {
	                        tnx: 'server'
	                    },
	                    this._remainder.replace(/\r?\n$/, '')
	                );
	            }
	            this.lastServerResponse = serverResponse = this._remainder.trim();
	        }

	        this.logger.info(
	            {
	                tnx: 'network'
	            },
	            'Connection closed'
	        );

	        if (this.upgrading && !this._destroyed) {
	            return this._onError(new Error('Connection closed unexpectedly'), 'ETLS', serverResponse, 'CONN');
	        } else if (![this._actionGreeting, this.close].includes(this._responseActions[0]) && !this._destroyed) {
	            return this._onError(new Error('Connection closed unexpectedly'), 'ECONNECTION', serverResponse, 'CONN');
	        } else if (/^[45]\d{2}\b/.test(serverResponse)) {
	            return this._onError(new Error('Connection closed unexpectedly'), 'ECONNECTION', serverResponse, 'CONN');
	        }

	        this._destroy();
	    }

	    /**
	     * 'end' listener for the socket
	     *
	     * @event
	     */
	    _onEnd() {
	        if (this._socket && !this._socket.destroyed) {
	            this._socket.destroy();
	        }
	    }

	    /**
	     * 'timeout' listener for the socket
	     *
	     * @event
	     */
	    _onTimeout() {
	        return this._onError(new Error('Timeout'), 'ETIMEDOUT', false, 'CONN');
	    }

	    /**
	     * Destroys the client, emits 'end'
	     */
	    _destroy() {
	        if (this._destroyed) {
	            return;
	        }
	        this._destroyed = true;
	        this.emit('end');
	    }

	    /**
	     * Upgrades the connection to TLS
	     *
	     * @param {Function} callback Callback function to run when the connection
	     *        has been secured
	     */
	    _upgradeConnection(callback) {
	        // do not remove all listeners or it breaks node v0.10 as there's
	        // apparently a 'finish' event set that would be cleared as well

	        // we can safely keep 'error', 'end', 'close' etc. events
	        this._socket.removeListener('data', this._onSocketData); // incoming data is going to be gibberish from this point onwards
	        this._socket.removeListener('timeout', this._onSocketTimeout); // timeout will be re-set for the new socket object

	        let socketPlain = this._socket;
	        let opts = {
	            socket: this._socket,
	            host: this.host
	        };

	        Object.keys(this.options.tls || {}).forEach(key => {
	            opts[key] = this.options.tls[key];
	        });

	        // ensure servername for SNI
	        if (this.servername && !opts.servername) {
	            opts.servername = this.servername;
	        }

	        this.upgrading = true;
	        // tls.connect is not an asynchronous function however it may still throw errors and requires to be wrapped with try/catch
	        try {
	            this._socket = tls.connect(opts, () => {
	                this.secure = true;
	                this.upgrading = false;
	                this._socket.on('data', this._onSocketData);

	                socketPlain.removeListener('close', this._onSocketClose);
	                socketPlain.removeListener('end', this._onSocketEnd);

	                return callback(null, true);
	            });
	        } catch (err) {
	            return callback(err);
	        }

	        this._socket.on('error', this._onSocketError);
	        this._socket.once('close', this._onSocketClose);
	        this._socket.once('end', this._onSocketEnd);

	        this._socket.setTimeout(this.options.socketTimeout || SOCKET_TIMEOUT); // 10 min.
	        this._socket.on('timeout', this._onSocketTimeout);

	        // resume in case the socket was paused
	        socketPlain.resume();
	    }

	    /**
	     * Processes queued responses from the server
	     *
	     * @param {Boolean} force If true, ignores _processing flag
	     */
	    _processResponse() {
	        if (!this._responseQueue.length) {
	            return false;
	        }

	        let str = (this.lastServerResponse = (this._responseQueue.shift() || '').toString());

	        if (/^\d+-/.test(str.split('\n').pop())) {
	            // keep waiting for the final part of multiline response
	            return;
	        }

	        if (this.options.debug || this.options.transactionLog) {
	            this.logger.debug(
	                {
	                    tnx: 'server'
	                },
	                str.replace(/\r?\n$/, '')
	            );
	        }

	        if (!str.trim()) {
	            // skip unexpected empty lines
	            setImmediate(() => this._processResponse());
	        }

	        let action = this._responseActions.shift();

	        if (typeof action === 'function') {
	            action.call(this, str);
	            setImmediate(() => this._processResponse());
	        } else {
	            return this._onError(new Error('Unexpected Response'), 'EPROTOCOL', str, 'CONN');
	        }
	    }

	    /**
	     * Send a command to the server, append \r\n
	     *
	     * @param {String} str String to be sent to the server
	     * @param {String} logStr Optional string to be used for logging instead of the actual string
	     */
	    _sendCommand(str, logStr) {
	        if (this._destroyed) {
	            // Connection already closed, can't send any more data
	            return;
	        }

	        if (this._socket.destroyed) {
	            return this.close();
	        }

	        if (this.options.debug || this.options.transactionLog) {
	            this.logger.debug(
	                {
	                    tnx: 'client'
	                },
	                (logStr || str || '').toString().replace(/\r?\n$/, '')
	            );
	        }

	        this._socket.write(Buffer.from(str + '\r\n', 'utf-8'));
	    }

	    /**
	     * Initiates a new message by submitting envelope data, starting with
	     * MAIL FROM: command
	     *
	     * @param {Object} envelope Envelope object in the form of
	     *        {from:'...', to:['...']}
	     *        or
	     *        {from:{address:'...',name:'...'}, to:[address:'...',name:'...']}
	     */
	    _setEnvelope(envelope, callback) {
	        let args = [];
	        let useSmtpUtf8 = false;

	        this._envelope = envelope || {};
	        this._envelope.from = ((this._envelope.from && this._envelope.from.address) || this._envelope.from || '').toString().trim();

	        this._envelope.to = [].concat(this._envelope.to || []).map(to => ((to && to.address) || to || '').toString().trim());

	        if (!this._envelope.to.length) {
	            return callback(this._formatError('No recipients defined', 'EENVELOPE', false, 'API'));
	        }

	        if (this._envelope.from && /[\r\n<>]/.test(this._envelope.from)) {
	            return callback(this._formatError('Invalid sender ' + JSON.stringify(this._envelope.from), 'EENVELOPE', false, 'API'));
	        }

	        // check if the sender address uses only ASCII characters,
	        // otherwise require usage of SMTPUTF8 extension
	        if (/[\x80-\uFFFF]/.test(this._envelope.from)) {
	            useSmtpUtf8 = true;
	        }

	        for (let i = 0, len = this._envelope.to.length; i < len; i++) {
	            if (!this._envelope.to[i] || /[\r\n<>]/.test(this._envelope.to[i])) {
	                return callback(this._formatError('Invalid recipient ' + JSON.stringify(this._envelope.to[i]), 'EENVELOPE', false, 'API'));
	            }

	            // check if the recipients addresses use only ASCII characters,
	            // otherwise require usage of SMTPUTF8 extension
	            if (/[\x80-\uFFFF]/.test(this._envelope.to[i])) {
	                useSmtpUtf8 = true;
	            }
	        }

	        // clone the recipients array for latter manipulation
	        this._envelope.rcptQueue = JSON.parse(JSON.stringify(this._envelope.to || []));
	        this._envelope.rejected = [];
	        this._envelope.rejectedErrors = [];
	        this._envelope.accepted = [];

	        if (this._envelope.dsn) {
	            try {
	                this._envelope.dsn = this._setDsnEnvelope(this._envelope.dsn);
	            } catch (err) {
	                return callback(this._formatError('Invalid DSN ' + err.message, 'EENVELOPE', false, 'API'));
	            }
	        }

	        this._responseActions.push(str => {
	            this._actionMAIL(str, callback);
	        });

	        // If the server supports SMTPUTF8 and the envelope includes an internationalized
	        // email address then append SMTPUTF8 keyword to the MAIL FROM command
	        if (useSmtpUtf8 && this._supportedExtensions.includes('SMTPUTF8')) {
	            args.push('SMTPUTF8');
	            this._usingSmtpUtf8 = true;
	        }

	        // If the server supports 8BITMIME and the message might contain non-ascii bytes
	        // then append the 8BITMIME keyword to the MAIL FROM command
	        if (this._envelope.use8BitMime && this._supportedExtensions.includes('8BITMIME')) {
	            args.push('BODY=8BITMIME');
	            this._using8BitMime = true;
	        }

	        if (this._envelope.size && this._supportedExtensions.includes('SIZE')) {
	            args.push('SIZE=' + this._envelope.size);
	        }

	        // If the server supports DSN and the envelope includes an DSN prop
	        // then append DSN params to the MAIL FROM command
	        if (this._envelope.dsn && this._supportedExtensions.includes('DSN')) {
	            if (this._envelope.dsn.ret) {
	                args.push('RET=' + shared.encodeXText(this._envelope.dsn.ret));
	            }
	            if (this._envelope.dsn.envid) {
	                args.push('ENVID=' + shared.encodeXText(this._envelope.dsn.envid));
	            }
	        }

	        // RFC 8689: If the envelope requests REQUIRETLS extension
	        // then append REQUIRETLS keyword to the MAIL FROM command
	        // Note: REQUIRETLS can only be used over TLS connections and requires server support
	        if (this._envelope.requireTLSExtensionEnabled) {
	            if (!this.secure) {
	                return callback(
	                    this._formatError('REQUIRETLS can only be used over TLS connections (RFC 8689)', 'EREQUIRETLS', false, 'MAIL FROM')
	                );
	            }
	            if (!this._supportedExtensions.includes('REQUIRETLS')) {
	                return callback(
	                    this._formatError('Server does not support REQUIRETLS extension (RFC 8689)', 'EREQUIRETLS', false, 'MAIL FROM')
	                );
	            }
	            args.push('REQUIRETLS');
	        }

	        this._sendCommand('MAIL FROM:<' + this._envelope.from + '>' + (args.length ? ' ' + args.join(' ') : ''));
	    }

	    _setDsnEnvelope(params) {
	        let ret = (params.ret || params.return || '').toString().toUpperCase() || null;
	        if (ret) {
	            switch (ret) {
	                case 'HDRS':
	                case 'HEADERS':
	                    ret = 'HDRS';
	                    break;
	                case 'FULL':
	                case 'BODY':
	                    ret = 'FULL';
	                    break;
	            }
	        }

	        if (ret && !['FULL', 'HDRS'].includes(ret)) {
	            throw new Error('ret: ' + JSON.stringify(ret));
	        }

	        let envid = (params.envid || params.id || '').toString() || null;

	        let notify = params.notify || null;
	        if (notify) {
	            if (typeof notify === 'string') {
	                notify = notify.split(',');
	            }
	            notify = notify.map(n => n.trim().toUpperCase());
	            let validNotify = ['NEVER', 'SUCCESS', 'FAILURE', 'DELAY'];
	            let invalidNotify = notify.filter(n => !validNotify.includes(n));
	            if (invalidNotify.length || (notify.length > 1 && notify.includes('NEVER'))) {
	                throw new Error('notify: ' + JSON.stringify(notify.join(',')));
	            }
	            notify = notify.join(',');
	        }

	        let orcpt = (params.recipient || params.orcpt || '').toString() || null;
	        if (orcpt && orcpt.indexOf(';') < 0) {
	            orcpt = 'rfc822;' + orcpt;
	        }

	        return {
	            ret,
	            envid,
	            notify,
	            orcpt
	        };
	    }

	    _getDsnRcptToArgs() {
	        let args = [];
	        // If the server supports DSN and the envelope includes an DSN prop
	        // then append DSN params to the RCPT TO command
	        if (this._envelope.dsn && this._supportedExtensions.includes('DSN')) {
	            if (this._envelope.dsn.notify) {
	                args.push('NOTIFY=' + shared.encodeXText(this._envelope.dsn.notify));
	            }
	            if (this._envelope.dsn.orcpt) {
	                args.push('ORCPT=' + shared.encodeXText(this._envelope.dsn.orcpt));
	            }
	        }
	        return args.length ? ' ' + args.join(' ') : '';
	    }

	    _createSendStream(callback) {
	        let dataStream = new DataStream();
	        let logStream;

	        if (this.options.lmtp) {
	            this._envelope.accepted.forEach((recipient, i) => {
	                let final = i === this._envelope.accepted.length - 1;
	                this._responseActions.push(str => {
	                    this._actionLMTPStream(recipient, final, str, callback);
	                });
	            });
	        } else {
	            this._responseActions.push(str => {
	                this._actionSMTPStream(str, callback);
	            });
	        }

	        dataStream.pipe(this._socket, {
	            end: false
	        });

	        if (this.options.debug) {
	            logStream = new PassThrough();
	            logStream.on('readable', () => {
	                let chunk;
	                while ((chunk = logStream.read())) {
	                    this.logger.debug(
	                        {
	                            tnx: 'message'
	                        },
	                        chunk.toString('binary').replace(/\r?\n$/, '')
	                    );
	                }
	            });
	            dataStream.pipe(logStream);
	        }

	        dataStream.once('end', () => {
	            this.logger.info(
	                {
	                    tnx: 'message',
	                    inByteCount: dataStream.inByteCount,
	                    outByteCount: dataStream.outByteCount
	                },
	                '<%s bytes encoded mime message (source size %s bytes)>',
	                dataStream.outByteCount,
	                dataStream.inByteCount
	            );
	        });

	        return dataStream;
	    }

	    /** ACTIONS **/

	    /**
	     * Will be run after the connection is created and the server sends
	     * a greeting. If the incoming message starts with 220 initiate
	     * SMTP session by sending EHLO command
	     *
	     * @param {String} str Message from the server
	     */
	    _actionGreeting(str) {
	        clearTimeout(this._greetingTimeout);

	        if (str.substr(0, 3) !== '220') {
	            this._onError(new Error('Invalid greeting. response=' + str), 'EPROTOCOL', str, 'CONN');
	            return;
	        }

	        if (this.options.lmtp) {
	            this._responseActions.push(this._actionLHLO);
	            this._sendCommand('LHLO ' + this.name);
	        } else {
	            this._responseActions.push(this._actionEHLO);
	            this._sendCommand('EHLO ' + this.name);
	        }
	    }

	    /**
	     * Handles server response for LHLO command. If it yielded in
	     * error, emit 'error', otherwise treat this as an EHLO response
	     *
	     * @param {String} str Message from the server
	     */
	    _actionLHLO(str) {
	        if (str.charAt(0) !== '2') {
	            this._onError(new Error('Invalid LHLO. response=' + str), 'EPROTOCOL', str, 'LHLO');
	            return;
	        }

	        this._actionEHLO(str);
	    }

	    /**
	     * Handles server response for EHLO command. If it yielded in
	     * error, try HELO instead, otherwise initiate TLS negotiation
	     * if STARTTLS is supported by the server or move into the
	     * authentication phase.
	     *
	     * @param {String} str Message from the server
	     */
	    _actionEHLO(str) {
	        let match;

	        if (str.substr(0, 3) === '421') {
	            this._onError(new Error('Server terminates connection. response=' + str), 'ECONNECTION', str, 'EHLO');
	            return;
	        }

	        if (str.charAt(0) !== '2') {
	            if (this.options.requireTLS) {
	                this._onError(
	                    new Error('EHLO failed but HELO does not support required STARTTLS. response=' + str),
	                    'ECONNECTION',
	                    str,
	                    'EHLO'
	                );
	                return;
	            }

	            // Try HELO instead
	            this._responseActions.push(this._actionHELO);
	            this._sendCommand('HELO ' + this.name);
	            return;
	        }

	        this._ehloLines = str
	            .split(/\r?\n/)
	            .map(line => line.replace(/^\d+[ -]/, '').trim())
	            .filter(line => line)
	            .slice(1);

	        // Detect if the server supports STARTTLS
	        if (!this.secure && !this.options.ignoreTLS && (/[ -]STARTTLS\b/im.test(str) || this.options.requireTLS)) {
	            this._sendCommand('STARTTLS');
	            this._responseActions.push(this._actionSTARTTLS);
	            return;
	        }

	        // Detect if the server supports SMTPUTF8
	        if (/[ -]SMTPUTF8\b/im.test(str)) {
	            this._supportedExtensions.push('SMTPUTF8');
	        }

	        // Detect if the server supports DSN
	        if (/[ -]DSN\b/im.test(str)) {
	            this._supportedExtensions.push('DSN');
	        }

	        // Detect if the server supports 8BITMIME
	        if (/[ -]8BITMIME\b/im.test(str)) {
	            this._supportedExtensions.push('8BITMIME');
	        }

	        // Detect if the server supports REQUIRETLS (RFC 8689)
	        if (/[ -]REQUIRETLS\b/im.test(str)) {
	            this._supportedExtensions.push('REQUIRETLS');
	        }

	        // Detect if the server supports PIPELINING
	        if (/[ -]PIPELINING\b/im.test(str)) {
	            this._supportedExtensions.push('PIPELINING');
	        }

	        // Detect if the server supports AUTH
	        if (/[ -]AUTH\b/i.test(str)) {
	            this.allowsAuth = true;
	        }

	        // Detect if the server supports PLAIN auth
	        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)PLAIN/i.test(str)) {
	            this._supportedAuth.push('PLAIN');
	        }

	        // Detect if the server supports LOGIN auth
	        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)LOGIN/i.test(str)) {
	            this._supportedAuth.push('LOGIN');
	        }

	        // Detect if the server supports CRAM-MD5 auth
	        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)CRAM-MD5/i.test(str)) {
	            this._supportedAuth.push('CRAM-MD5');
	        }

	        // Detect if the server supports XOAUTH2 auth
	        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)XOAUTH2/i.test(str)) {
	            this._supportedAuth.push('XOAUTH2');
	        }

	        // Detect if the server supports SIZE extensions (and the max allowed size)
	        if ((match = str.match(/[ -]SIZE(?:[ \t]+(\d+))?/im))) {
	            this._supportedExtensions.push('SIZE');
	            this._maxAllowedSize = Number(match[1]) || 0;
	        }

	        this.emit('connect');
	    }

	    /**
	     * Handles server response for HELO command. If it yielded in
	     * error, emit 'error', otherwise move into the authentication phase.
	     *
	     * @param {String} str Message from the server
	     */
	    _actionHELO(str) {
	        if (str.charAt(0) !== '2') {
	            this._onError(new Error('Invalid HELO. response=' + str), 'EPROTOCOL', str, 'HELO');
	            return;
	        }

	        // assume that authentication is enabled (most probably is not though)
	        this.allowsAuth = true;

	        this.emit('connect');
	    }

	    /**
	     * Handles server response for STARTTLS command. If there's an error
	     * try HELO instead, otherwise initiate TLS upgrade. If the upgrade
	     * succeedes restart the EHLO
	     *
	     * @param {String} str Message from the server
	     */
	    _actionSTARTTLS(str) {
	        if (str.charAt(0) !== '2') {
	            if (this.options.opportunisticTLS) {
	                this.logger.info(
	                    {
	                        tnx: 'smtp'
	                    },
	                    'Failed STARTTLS upgrade, continuing unencrypted'
	                );
	                return this.emit('connect');
	            }
	            this._onError(new Error('Error upgrading connection with STARTTLS'), 'ETLS', str, 'STARTTLS');
	            return;
	        }

	        this._upgradeConnection((err, secured) => {
	            if (err) {
	                this._onError(new Error('Error initiating TLS - ' + (err.message || err)), 'ETLS', false, 'STARTTLS');
	                return;
	            }

	            this.logger.info(
	                {
	                    tnx: 'smtp'
	                },
	                'Connection upgraded with STARTTLS'
	            );

	            if (secured) {
	                // restart session
	                if (this.options.lmtp) {
	                    this._responseActions.push(this._actionLHLO);
	                    this._sendCommand('LHLO ' + this.name);
	                } else {
	                    this._responseActions.push(this._actionEHLO);
	                    this._sendCommand('EHLO ' + this.name);
	                }
	            } else {
	                this.emit('connect');
	            }
	        });
	    }

	    /**
	     * Handle the response for AUTH LOGIN command. We are expecting
	     * '334 VXNlcm5hbWU6' (base64 for 'Username:'). Data to be sent as
	     * response needs to be base64 encoded username. We do not need
	     * exact match but settle with 334 response in general as some
	     * hosts invalidly use a longer message than VXNlcm5hbWU6
	     *
	     * @param {String} str Message from the server
	     */
	    _actionAUTH_LOGIN_USER(str, callback) {
	        if (!/^334[ -]/.test(str)) {
	            // expecting '334 VXNlcm5hbWU6'
	            callback(this._formatError('Invalid login sequence while waiting for "334 VXNlcm5hbWU6"', 'EAUTH', str, 'AUTH LOGIN'));
	            return;
	        }

	        this._responseActions.push(str => {
	            this._actionAUTH_LOGIN_PASS(str, callback);
	        });

	        this._sendCommand(Buffer.from(this._auth.credentials.user + '', 'utf-8').toString('base64'));
	    }

	    /**
	     * Handle the response for AUTH CRAM-MD5 command. We are expecting
	     * '334 <challenge string>'. Data to be sent as response needs to be
	     * base64 decoded challenge string, MD5 hashed using the password as
	     * a HMAC key, prefixed by the username and a space, and finally all
	     * base64 encoded again.
	     *
	     * @param {String} str Message from the server
	     */
	    _actionAUTH_CRAM_MD5(str, callback) {
	        let challengeMatch = str.match(/^334\s+(.+)$/);
	        let challengeString = '';

	        if (!challengeMatch) {
	            return callback(
	                this._formatError('Invalid login sequence while waiting for server challenge string', 'EAUTH', str, 'AUTH CRAM-MD5')
	            );
	        } else {
	            challengeString = challengeMatch[1];
	        }

	        // Decode from base64
	        let base64decoded = Buffer.from(challengeString, 'base64').toString('ascii'),
	            hmacMD5 = crypto.createHmac('md5', this._auth.credentials.pass);

	        hmacMD5.update(base64decoded);

	        let prepended = this._auth.credentials.user + ' ' + hmacMD5.digest('hex');

	        this._responseActions.push(str => {
	            this._actionAUTH_CRAM_MD5_PASS(str, callback);
	        });

	        this._sendCommand(
	            Buffer.from(prepended).toString('base64'),
	            // hidden hash for logs
	            Buffer.from(this._auth.credentials.user + ' /* secret */').toString('base64')
	        );
	    }

	    /**
	     * Handles the response to CRAM-MD5 authentication, if there's no error,
	     * the user can be considered logged in. Start waiting for a message to send
	     *
	     * @param {String} str Message from the server
	     */
	    _actionAUTH_CRAM_MD5_PASS(str, callback) {
	        if (!str.match(/^235\s+/)) {
	            return callback(this._formatError('Invalid login sequence while waiting for "235"', 'EAUTH', str, 'AUTH CRAM-MD5'));
	        }

	        this.logger.info(
	            {
	                tnx: 'smtp',
	                username: this._auth.user,
	                action: 'authenticated',
	                method: this._authMethod
	            },
	            'User %s authenticated',
	            JSON.stringify(this._auth.user)
	        );
	        this.authenticated = true;
	        callback(null, true);
	    }

	    /**
	     * Handle the response for AUTH LOGIN command. We are expecting
	     * '334 UGFzc3dvcmQ6' (base64 for 'Password:'). Data to be sent as
	     * response needs to be base64 encoded password.
	     *
	     * @param {String} str Message from the server
	     */
	    _actionAUTH_LOGIN_PASS(str, callback) {
	        if (!/^334[ -]/.test(str)) {
	            // expecting '334 UGFzc3dvcmQ6'
	            return callback(this._formatError('Invalid login sequence while waiting for "334 UGFzc3dvcmQ6"', 'EAUTH', str, 'AUTH LOGIN'));
	        }

	        this._responseActions.push(str => {
	            this._actionAUTHComplete(str, callback);
	        });

	        this._sendCommand(
	            Buffer.from((this._auth.credentials.pass || '').toString(), 'utf-8').toString('base64'),
	            // Hidden pass for logs
	            Buffer.from('/* secret */', 'utf-8').toString('base64')
	        );
	    }

	    /**
	     * Handles the response for authentication, if there's no error,
	     * the user can be considered logged in. Start waiting for a message to send
	     *
	     * @param {String} str Message from the server
	     */
	    _actionAUTHComplete(str, isRetry, callback) {
	        if (!callback && typeof isRetry === 'function') {
	            callback = isRetry;
	            isRetry = false;
	        }

	        if (str.substr(0, 3) === '334') {
	            this._responseActions.push(str => {
	                if (isRetry || this._authMethod !== 'XOAUTH2') {
	                    this._actionAUTHComplete(str, true, callback);
	                } else {
	                    // fetch a new OAuth2 access token
	                    setImmediate(() => this._handleXOauth2Token(true, callback));
	                }
	            });
	            this._sendCommand('');
	            return;
	        }

	        if (str.charAt(0) !== '2') {
	            this.logger.info(
	                {
	                    tnx: 'smtp',
	                    username: this._auth.user,
	                    action: 'authfail',
	                    method: this._authMethod
	                },
	                'User %s failed to authenticate',
	                JSON.stringify(this._auth.user)
	            );
	            return callback(this._formatError('Invalid login', 'EAUTH', str, 'AUTH ' + this._authMethod));
	        }

	        this.logger.info(
	            {
	                tnx: 'smtp',
	                username: this._auth.user,
	                action: 'authenticated',
	                method: this._authMethod
	            },
	            'User %s authenticated',
	            JSON.stringify(this._auth.user)
	        );
	        this.authenticated = true;
	        callback(null, true);
	    }

	    /**
	     * Handle response for a MAIL FROM: command
	     *
	     * @param {String} str Message from the server
	     */
	    _actionMAIL(str, callback) {
	        let message, curRecipient;
	        if (Number(str.charAt(0)) !== 2) {
	            if (this._usingSmtpUtf8 && /^550 /.test(str) && /[\x80-\uFFFF]/.test(this._envelope.from)) {
	                message = 'Internationalized mailbox name not allowed';
	            } else {
	                message = 'Mail command failed';
	            }
	            return callback(this._formatError(message, 'EENVELOPE', str, 'MAIL FROM'));
	        }

	        if (!this._envelope.rcptQueue.length) {
	            return callback(this._formatError("Can't send mail - no recipients defined", 'EENVELOPE', false, 'API'));
	        } else {
	            this._recipientQueue = [];

	            if (this._supportedExtensions.includes('PIPELINING')) {
	                while (this._envelope.rcptQueue.length) {
	                    curRecipient = this._envelope.rcptQueue.shift();
	                    this._recipientQueue.push(curRecipient);
	                    this._responseActions.push(str => {
	                        this._actionRCPT(str, callback);
	                    });
	                    this._sendCommand('RCPT TO:<' + curRecipient + '>' + this._getDsnRcptToArgs());
	                }
	            } else {
	                curRecipient = this._envelope.rcptQueue.shift();
	                this._recipientQueue.push(curRecipient);
	                this._responseActions.push(str => {
	                    this._actionRCPT(str, callback);
	                });
	                this._sendCommand('RCPT TO:<' + curRecipient + '>' + this._getDsnRcptToArgs());
	            }
	        }
	    }

	    /**
	     * Handle response for a RCPT TO: command
	     *
	     * @param {String} str Message from the server
	     */
	    _actionRCPT(str, callback) {
	        let message,
	            err,
	            curRecipient = this._recipientQueue.shift();
	        if (Number(str.charAt(0)) !== 2) {
	            // this is a soft error
	            if (this._usingSmtpUtf8 && /^553 /.test(str) && /[\x80-\uFFFF]/.test(curRecipient)) {
	                message = 'Internationalized mailbox name not allowed';
	            } else {
	                message = 'Recipient command failed';
	            }
	            this._envelope.rejected.push(curRecipient);
	            // store error for the failed recipient
	            err = this._formatError(message, 'EENVELOPE', str, 'RCPT TO');
	            err.recipient = curRecipient;
	            this._envelope.rejectedErrors.push(err);
	        } else {
	            this._envelope.accepted.push(curRecipient);
	        }

	        if (!this._envelope.rcptQueue.length && !this._recipientQueue.length) {
	            if (this._envelope.rejected.length < this._envelope.to.length) {
	                this._responseActions.push(str => {
	                    this._actionDATA(str, callback);
	                });
	                this._sendCommand('DATA');
	            } else {
	                err = this._formatError("Can't send mail - all recipients were rejected", 'EENVELOPE', str, 'RCPT TO');
	                err.rejected = this._envelope.rejected;
	                err.rejectedErrors = this._envelope.rejectedErrors;
	                return callback(err);
	            }
	        } else if (this._envelope.rcptQueue.length) {
	            curRecipient = this._envelope.rcptQueue.shift();
	            this._recipientQueue.push(curRecipient);
	            this._responseActions.push(str => {
	                this._actionRCPT(str, callback);
	            });
	            this._sendCommand('RCPT TO:<' + curRecipient + '>' + this._getDsnRcptToArgs());
	        }
	    }

	    /**
	     * Handle response for a DATA command
	     *
	     * @param {String} str Message from the server
	     */
	    _actionDATA(str, callback) {
	        // response should be 354 but according to this issue https://github.com/eleith/emailjs/issues/24
	        // some servers might use 250 instead, so lets check for 2 or 3 as the first digit
	        if (!/^[23]/.test(str)) {
	            return callback(this._formatError('Data command failed', 'EENVELOPE', str, 'DATA'));
	        }

	        let response = {
	            accepted: this._envelope.accepted,
	            rejected: this._envelope.rejected
	        };

	        if (this._ehloLines && this._ehloLines.length) {
	            response.ehlo = this._ehloLines;
	        }

	        if (this._envelope.rejectedErrors.length) {
	            response.rejectedErrors = this._envelope.rejectedErrors;
	        }

	        callback(null, response);
	    }

	    /**
	     * Handle response for a DATA stream when using SMTP
	     * We expect a single response that defines if the sending succeeded or failed
	     *
	     * @param {String} str Message from the server
	     */
	    _actionSMTPStream(str, callback) {
	        if (Number(str.charAt(0)) !== 2) {
	            // Message failed
	            return callback(this._formatError('Message failed', 'EMESSAGE', str, 'DATA'));
	        } else {
	            // Message sent succesfully
	            return callback(null, str);
	        }
	    }

	    /**
	     * Handle response for a DATA stream
	     * We expect a separate response for every recipient. All recipients can either
	     * succeed or fail separately
	     *
	     * @param {String} recipient The recipient this response applies to
	     * @param {Boolean} final Is this the final recipient?
	     * @param {String} str Message from the server
	     */
	    _actionLMTPStream(recipient, final, str, callback) {
	        let err;
	        if (Number(str.charAt(0)) !== 2) {
	            // Message failed
	            err = this._formatError('Message failed for recipient ' + recipient, 'EMESSAGE', str, 'DATA');
	            err.recipient = recipient;
	            this._envelope.rejected.push(recipient);
	            this._envelope.rejectedErrors.push(err);
	            for (let i = 0, len = this._envelope.accepted.length; i < len; i++) {
	                if (this._envelope.accepted[i] === recipient) {
	                    this._envelope.accepted.splice(i, 1);
	                }
	            }
	        }
	        if (final) {
	            return callback(null, str);
	        }
	    }

	    _handleXOauth2Token(isRetry, callback) {
	        this._auth.oauth2.getToken(isRetry, (err, accessToken) => {
	            if (err) {
	                this.logger.info(
	                    {
	                        tnx: 'smtp',
	                        username: this._auth.user,
	                        action: 'authfail',
	                        method: this._authMethod
	                    },
	                    'User %s failed to authenticate',
	                    JSON.stringify(this._auth.user)
	                );
	                return callback(this._formatError(err, 'EAUTH', false, 'AUTH XOAUTH2'));
	            }
	            this._responseActions.push(str => {
	                this._actionAUTHComplete(str, isRetry, callback);
	            });
	            this._sendCommand(
	                'AUTH XOAUTH2 ' + this._auth.oauth2.buildXOAuth2Token(accessToken),
	                //  Hidden for logs
	                'AUTH XOAUTH2 ' + this._auth.oauth2.buildXOAuth2Token('/* secret */')
	            );
	        });
	    }

	    /**
	     *
	     * @param {string} command
	     * @private
	     */
	    _isDestroyedMessage(command) {
	        if (this._destroyed) {
	            return 'Cannot ' + command + ' - smtp connection is already destroyed.';
	        }

	        if (this._socket) {
	            if (this._socket.destroyed) {
	                return 'Cannot ' + command + ' - smtp connection socket is already destroyed.';
	            }

	            if (!this._socket.writable) {
	                return 'Cannot ' + command + ' - smtp connection socket is already half-closed.';
	            }
	        }
	    }

	    _getHostname() {
	        // defaul hostname is machine hostname or [IP]
	        let defaultHostname;
	        try {
	            defaultHostname = os.hostname() || '';
	        } catch (_err) {
	            // fails on windows 7
	            defaultHostname = 'localhost';
	        }

	        // ignore if not FQDN
	        if (!defaultHostname || defaultHostname.indexOf('.') < 0) {
	            defaultHostname = '[127.0.0.1]';
	        }

	        // IP should be enclosed in []
	        if (defaultHostname.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
	            defaultHostname = '[' + defaultHostname + ']';
	        }

	        return defaultHostname;
	    }
	}

	smtpConnection = SMTPConnection;
	return smtpConnection;
}

var xoauth2;
var hasRequiredXoauth2;

function requireXoauth2 () {
	if (hasRequiredXoauth2) return xoauth2;
	hasRequiredXoauth2 = 1;

	const Stream = require$$0$2.Stream;
	const nmfetch = requireFetch();
	const crypto = crypto__default;
	const shared = requireShared();

	/**
	 * XOAUTH2 access_token generator for Gmail.
	 * Create client ID for web applications in Google API console to use it.
	 * See Offline Access for receiving the needed refreshToken for an user
	 * https://developers.google.com/accounts/docs/OAuth2WebServer#offline
	 *
	 * Usage for generating access tokens with a custom method using provisionCallback:
	 * provisionCallback(user, renew, callback)
	 *   * user is the username to get the token for
	 *   * renew is a boolean that if true indicates that existing token failed and needs to be renewed
	 *   * callback is the callback to run with (error, accessToken [, expires])
	 *     * accessToken is a string
	 *     * expires is an optional expire time in milliseconds
	 * If provisionCallback is used, then Nodemailer does not try to attempt generating the token by itself
	 *
	 * @constructor
	 * @param {Object} options Client information for token generation
	 * @param {String} options.user User e-mail address
	 * @param {String} options.clientId Client ID value
	 * @param {String} options.clientSecret Client secret value
	 * @param {String} options.refreshToken Refresh token for an user
	 * @param {String} options.accessUrl Endpoint for token generation, defaults to 'https://accounts.google.com/o/oauth2/token'
	 * @param {String} options.accessToken An existing valid accessToken
	 * @param {String} options.privateKey Private key for JSW
	 * @param {Number} options.expires Optional Access Token expire time in ms
	 * @param {Number} options.timeout Optional TTL for Access Token in seconds
	 * @param {Function} options.provisionCallback Function to run when a new access token is required
	 */
	class XOAuth2 extends Stream {
	    constructor(options, logger) {
	        super();

	        this.options = options || {};

	        if (options && options.serviceClient) {
	            if (!options.privateKey || !options.user) {
	                setImmediate(() => this.emit('error', new Error('Options "privateKey" and "user" are required for service account!')));
	                return;
	            }

	            let serviceRequestTimeout = Math.min(Math.max(Number(this.options.serviceRequestTimeout) || 0, 0), 3600);
	            this.options.serviceRequestTimeout = serviceRequestTimeout || 5 * 60;
	        }

	        this.logger = shared.getLogger(
	            {
	                logger
	            },
	            {
	                component: this.options.component || 'OAuth2'
	            }
	        );

	        this.provisionCallback = typeof this.options.provisionCallback === 'function' ? this.options.provisionCallback : false;

	        this.options.accessUrl = this.options.accessUrl || 'https://accounts.google.com/o/oauth2/token';
	        this.options.customHeaders = this.options.customHeaders || {};
	        this.options.customParams = this.options.customParams || {};

	        this.accessToken = this.options.accessToken || false;

	        if (this.options.expires && Number(this.options.expires)) {
	            this.expires = this.options.expires;
	        } else {
	            let timeout = Math.max(Number(this.options.timeout) || 0, 0);
	            this.expires = (timeout && Date.now() + timeout * 1000) || 0;
	        }

	        this.renewing = false; // Track if renewal is in progress
	        this.renewalQueue = []; // Queue for pending requests during renewal
	    }

	    /**
	     * Returns or generates (if previous has expired) a XOAuth2 token
	     *
	     * @param {Boolean} renew If false then use cached access token (if available)
	     * @param {Function} callback Callback function with error object and token string
	     */
	    getToken(renew, callback) {
	        if (!renew && this.accessToken && (!this.expires || this.expires > Date.now())) {
	            this.logger.debug(
	                {
	                    tnx: 'OAUTH2',
	                    user: this.options.user,
	                    action: 'reuse'
	                },
	                'Reusing existing access token for %s',
	                this.options.user
	            );
	            return callback(null, this.accessToken);
	        }

	        // check if it is possible to renew, if not, return the current token or error
	        if (!this.provisionCallback && !this.options.refreshToken && !this.options.serviceClient) {
	            if (this.accessToken) {
	                this.logger.debug(
	                    {
	                        tnx: 'OAUTH2',
	                        user: this.options.user,
	                        action: 'reuse'
	                    },
	                    'Reusing existing access token (no refresh capability) for %s',
	                    this.options.user
	                );
	                return callback(null, this.accessToken);
	            }
	            this.logger.error(
	                {
	                    tnx: 'OAUTH2',
	                    user: this.options.user,
	                    action: 'renew'
	                },
	                'Cannot renew access token for %s: No refresh mechanism available',
	                this.options.user
	            );
	            return callback(new Error("Can't create new access token for user"));
	        }

	        // If renewal already in progress, queue this request instead of starting another
	        if (this.renewing) {
	            return this.renewalQueue.push({ renew, callback });
	        }

	        this.renewing = true;

	        // Handles token renewal completion - processes queued requests and cleans up
	        const generateCallback = (err, accessToken) => {
	            this.renewalQueue.forEach(item => item.callback(err, accessToken));
	            this.renewalQueue = [];
	            this.renewing = false;

	            if (err) {
	                this.logger.error(
	                    {
	                        err,
	                        tnx: 'OAUTH2',
	                        user: this.options.user,
	                        action: 'renew'
	                    },
	                    'Failed generating new Access Token for %s',
	                    this.options.user
	                );
	            } else {
	                this.logger.info(
	                    {
	                        tnx: 'OAUTH2',
	                        user: this.options.user,
	                        action: 'renew'
	                    },
	                    'Generated new Access Token for %s',
	                    this.options.user
	                );
	            }
	            // Complete original request
	            callback(err, accessToken);
	        };

	        if (this.provisionCallback) {
	            this.provisionCallback(this.options.user, !!renew, (err, accessToken, expires) => {
	                if (!err && accessToken) {
	                    this.accessToken = accessToken;
	                    this.expires = expires || 0;
	                }
	                generateCallback(err, accessToken);
	            });
	        } else {
	            this.generateToken(generateCallback);
	        }
	    }

	    /**
	     * Updates token values
	     *
	     * @param {String} accessToken New access token
	     * @param {Number} timeout Access token lifetime in seconds
	     *
	     * Emits 'token': { user: User email-address, accessToken: the new accessToken, timeout: TTL in seconds}
	     */
	    updateToken(accessToken, timeout) {
	        this.accessToken = accessToken;
	        timeout = Math.max(Number(timeout) || 0, 0);
	        this.expires = (timeout && Date.now() + timeout * 1000) || 0;

	        this.emit('token', {
	            user: this.options.user,
	            accessToken: accessToken || '',
	            expires: this.expires
	        });
	    }

	    /**
	     * Generates a new XOAuth2 token with the credentials provided at initialization
	     *
	     * @param {Function} callback Callback function with error object and token string
	     */
	    generateToken(callback) {
	        let urlOptions;
	        let loggedUrlOptions;
	        if (this.options.serviceClient) {
	            // service account - https://developers.google.com/identity/protocols/OAuth2ServiceAccount
	            let iat = Math.floor(Date.now() / 1000); // unix time
	            let tokenData = {
	                iss: this.options.serviceClient,
	                scope: this.options.scope || 'https://mail.google.com/',
	                sub: this.options.user,
	                aud: this.options.accessUrl,
	                iat,
	                exp: iat + this.options.serviceRequestTimeout
	            };
	            let token;
	            try {
	                token = this.jwtSignRS256(tokenData);
	            } catch (_err) {
	                return callback(new Error("Can't generate token. Check your auth options"));
	            }

	            urlOptions = {
	                grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
	                assertion: token
	            };

	            loggedUrlOptions = {
	                grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
	                assertion: tokenData
	            };
	        } else {
	            if (!this.options.refreshToken) {
	                return callback(new Error("Can't create new access token for user"));
	            }

	            // web app - https://developers.google.com/identity/protocols/OAuth2WebServer
	            urlOptions = {
	                client_id: this.options.clientId || '',
	                client_secret: this.options.clientSecret || '',
	                refresh_token: this.options.refreshToken,
	                grant_type: 'refresh_token'
	            };

	            loggedUrlOptions = {
	                client_id: this.options.clientId || '',
	                client_secret: (this.options.clientSecret || '').substr(0, 6) + '...',
	                refresh_token: (this.options.refreshToken || '').substr(0, 6) + '...',
	                grant_type: 'refresh_token'
	            };
	        }

	        Object.keys(this.options.customParams).forEach(key => {
	            urlOptions[key] = this.options.customParams[key];
	            loggedUrlOptions[key] = this.options.customParams[key];
	        });

	        this.logger.debug(
	            {
	                tnx: 'OAUTH2',
	                user: this.options.user,
	                action: 'generate'
	            },
	            'Requesting token using: %s',
	            JSON.stringify(loggedUrlOptions)
	        );

	        this.postRequest(this.options.accessUrl, urlOptions, this.options, (error, body) => {
	            let data;

	            if (error) {
	                return callback(error);
	            }

	            try {
	                data = JSON.parse(body.toString());
	            } catch (E) {
	                return callback(E);
	            }

	            if (!data || typeof data !== 'object') {
	                this.logger.debug(
	                    {
	                        tnx: 'OAUTH2',
	                        user: this.options.user,
	                        action: 'post'
	                    },
	                    'Response: %s',
	                    (body || '').toString()
	                );
	                return callback(new Error('Invalid authentication response'));
	            }

	            let logData = {};
	            Object.keys(data).forEach(key => {
	                if (key !== 'access_token') {
	                    logData[key] = data[key];
	                } else {
	                    logData[key] = (data[key] || '').toString().substr(0, 6) + '...';
	                }
	            });

	            this.logger.debug(
	                {
	                    tnx: 'OAUTH2',
	                    user: this.options.user,
	                    action: 'post'
	                },
	                'Response: %s',
	                JSON.stringify(logData)
	            );

	            if (data.error) {
	                // Error Response : https://tools.ietf.org/html/rfc6749#section-5.2
	                let errorMessage = data.error;
	                if (data.error_description) {
	                    errorMessage += ': ' + data.error_description;
	                }
	                if (data.error_uri) {
	                    errorMessage += ' (' + data.error_uri + ')';
	                }
	                return callback(new Error(errorMessage));
	            }

	            if (data.access_token) {
	                this.updateToken(data.access_token, data.expires_in);
	                return callback(null, this.accessToken);
	            }

	            return callback(new Error('No access token'));
	        });
	    }

	    /**
	     * Converts an access_token and user id into a base64 encoded XOAuth2 token
	     *
	     * @param {String} [accessToken] Access token string
	     * @return {String} Base64 encoded token for IMAP or SMTP login
	     */
	    buildXOAuth2Token(accessToken) {
	        let authData = ['user=' + (this.options.user || ''), 'auth=Bearer ' + (accessToken || this.accessToken), '', ''];
	        return Buffer.from(authData.join('\x01'), 'utf-8').toString('base64');
	    }

	    /**
	     * Custom POST request handler.
	     * This is only needed to keep paths short in Windows – usually this module
	     * is a dependency of a dependency and if it tries to require something
	     * like the request module the paths get way too long to handle for Windows.
	     * As we do only a simple POST request we do not actually require complicated
	     * logic support (no redirects, no nothing) anyway.
	     *
	     * @param {String} url Url to POST to
	     * @param {String|Buffer} payload Payload to POST
	     * @param {Function} callback Callback function with (err, buff)
	     */
	    postRequest(url, payload, params, callback) {
	        let returned = false;

	        let chunks = [];
	        let chunklen = 0;

	        let req = nmfetch(url, {
	            method: 'post',
	            headers: params.customHeaders,
	            body: payload,
	            allowErrorResponse: true
	        });

	        req.on('readable', () => {
	            let chunk;
	            while ((chunk = req.read()) !== null) {
	                chunks.push(chunk);
	                chunklen += chunk.length;
	            }
	        });

	        req.once('error', err => {
	            if (returned) {
	                return;
	            }
	            returned = true;
	            return callback(err);
	        });

	        req.once('end', () => {
	            if (returned) {
	                return;
	            }
	            returned = true;
	            return callback(null, Buffer.concat(chunks, chunklen));
	        });
	    }

	    /**
	     * Encodes a buffer or a string into Base64url format
	     *
	     * @param {Buffer|String} data The data to convert
	     * @return {String} The encoded string
	     */
	    toBase64URL(data) {
	        if (typeof data === 'string') {
	            data = Buffer.from(data);
	        }

	        return data
	            .toString('base64')
	            .replace(/[=]+/g, '') // remove '='s
	            .replace(/\+/g, '-') // '+' → '-'
	            .replace(/\//g, '_'); // '/' → '_'
	    }

	    /**
	     * Creates a JSON Web Token signed with RS256 (SHA256 + RSA)
	     *
	     * @param {Object} payload The payload to include in the generated token
	     * @return {String} The generated and signed token
	     */
	    jwtSignRS256(payload) {
	        payload = ['{"alg":"RS256","typ":"JWT"}', JSON.stringify(payload)].map(val => this.toBase64URL(val)).join('.');
	        let signature = crypto.createSign('RSA-SHA256').update(payload).sign(this.options.privateKey);
	        return payload + '.' + this.toBase64URL(signature);
	    }
	}

	xoauth2 = XOAuth2;
	return xoauth2;
}

var poolResource;
var hasRequiredPoolResource;

function requirePoolResource () {
	if (hasRequiredPoolResource) return poolResource;
	hasRequiredPoolResource = 1;

	const SMTPConnection = requireSmtpConnection();
	const assign = requireShared().assign;
	const XOAuth2 = requireXoauth2();
	const EventEmitter = require$$0$5;

	/**
	 * Creates an element for the pool
	 *
	 * @constructor
	 * @param {Object} options SMTPPool instance
	 */
	class PoolResource extends EventEmitter {
	    constructor(pool) {
	        super();

	        this.pool = pool;
	        this.options = pool.options;
	        this.logger = this.pool.logger;

	        if (this.options.auth) {
	            switch ((this.options.auth.type || '').toString().toUpperCase()) {
	                case 'OAUTH2': {
	                    let oauth2 = new XOAuth2(this.options.auth, this.logger);
	                    oauth2.provisionCallback =
	                        (this.pool.mailer && this.pool.mailer.get('oauth2_provision_cb')) || oauth2.provisionCallback;
	                    this.auth = {
	                        type: 'OAUTH2',
	                        user: this.options.auth.user,
	                        oauth2,
	                        method: 'XOAUTH2'
	                    };
	                    oauth2.on('token', token => this.pool.mailer.emit('token', token));
	                    oauth2.on('error', err => this.emit('error', err));
	                    break;
	                }
	                default:
	                    if (!this.options.auth.user && !this.options.auth.pass) {
	                        break;
	                    }
	                    this.auth = {
	                        type: (this.options.auth.type || '').toString().toUpperCase() || 'LOGIN',
	                        user: this.options.auth.user,
	                        credentials: {
	                            user: this.options.auth.user || '',
	                            pass: this.options.auth.pass,
	                            options: this.options.auth.options
	                        },
	                        method: (this.options.auth.method || '').trim().toUpperCase() || this.options.authMethod || false
	                    };
	            }
	        }

	        this._connection = false;
	        this._connected = false;

	        this.messages = 0;
	        this.available = true;
	    }

	    /**
	     * Initiates a connection to the SMTP server
	     *
	     * @param {Function} callback Callback function to run once the connection is established or failed
	     */
	    connect(callback) {
	        this.pool.getSocket(this.options, (err, socketOptions) => {
	            if (err) {
	                return callback(err);
	            }

	            let returned = false;
	            let options = this.options;
	            if (socketOptions && socketOptions.connection) {
	                this.logger.info(
	                    {
	                        tnx: 'proxy',
	                        remoteAddress: socketOptions.connection.remoteAddress,
	                        remotePort: socketOptions.connection.remotePort,
	                        destHost: options.host || '',
	                        destPort: options.port || '',
	                        action: 'connected'
	                    },
	                    'Using proxied socket from %s:%s to %s:%s',
	                    socketOptions.connection.remoteAddress,
	                    socketOptions.connection.remotePort,
	                    options.host || '',
	                    options.port || ''
	                );

	                options = assign(false, options);
	                Object.keys(socketOptions).forEach(key => {
	                    options[key] = socketOptions[key];
	                });
	            }

	            this.connection = new SMTPConnection(options);

	            this.connection.once('error', err => {
	                this.emit('error', err);
	                if (returned) {
	                    return;
	                }
	                returned = true;
	                return callback(err);
	            });

	            this.connection.once('end', () => {
	                this.close();
	                if (returned) {
	                    return;
	                }
	                returned = true;

	                let timer = setTimeout(() => {
	                    if (returned) {
	                        return;
	                    }
	                    // still have not returned, this means we have an unexpected connection close
	                    let err = new Error('Unexpected socket close');
	                    if (this.connection && this.connection._socket && this.connection._socket.upgrading) {
	                        // starttls connection errors
	                        err.code = 'ETLS';
	                    }
	                    callback(err);
	                }, 1000);

	                try {
	                    timer.unref();
	                } catch (_E) {
	                    // Ignore. Happens on envs with non-node timer implementation
	                }
	            });

	            this.connection.connect(() => {
	                if (returned) {
	                    return;
	                }

	                if (this.auth && (this.connection.allowsAuth || options.forceAuth)) {
	                    this.connection.login(this.auth, err => {
	                        if (returned) {
	                            return;
	                        }
	                        returned = true;

	                        if (err) {
	                            this.connection.close();
	                            this.emit('error', err);
	                            return callback(err);
	                        }

	                        this._connected = true;
	                        callback(null, true);
	                    });
	                } else {
	                    returned = true;
	                    this._connected = true;
	                    return callback(null, true);
	                }
	            });
	        });
	    }

	    /**
	     * Sends an e-mail to be sent using the selected settings
	     *
	     * @param {Object} mail Mail object
	     * @param {Function} callback Callback function
	     */
	    send(mail, callback) {
	        if (!this._connected) {
	            return this.connect(err => {
	                if (err) {
	                    return callback(err);
	                }
	                return this.send(mail, callback);
	            });
	        }

	        let envelope = mail.message.getEnvelope();
	        let messageId = mail.message.messageId();

	        let recipients = [].concat(envelope.to || []);
	        if (recipients.length > 3) {
	            recipients.push('...and ' + recipients.splice(2).length + ' more');
	        }
	        this.logger.info(
	            {
	                tnx: 'send',
	                messageId,
	                cid: this.id
	            },
	            'Sending message %s using #%s to <%s>',
	            messageId,
	            this.id,
	            recipients.join(', ')
	        );

	        if (mail.data.dsn) {
	            envelope.dsn = mail.data.dsn;
	        }

	        // RFC 8689: Pass requireTLSExtensionEnabled to envelope for MAIL FROM parameter
	        if (mail.data.requireTLSExtensionEnabled) {
	            envelope.requireTLSExtensionEnabled = mail.data.requireTLSExtensionEnabled;
	        }

	        this.connection.send(envelope, mail.message.createReadStream(), (err, info) => {
	            this.messages++;

	            if (err) {
	                this.connection.close();
	                this.emit('error', err);
	                return callback(err);
	            }

	            info.envelope = {
	                from: envelope.from,
	                to: envelope.to
	            };
	            info.messageId = messageId;

	            setImmediate(() => {
	                let err;
	                if (this.messages >= this.options.maxMessages) {
	                    err = new Error('Resource exhausted');
	                    err.code = 'EMAXLIMIT';
	                    this.connection.close();
	                    this.emit('error', err);
	                } else {
	                    this.pool._checkRateLimit(() => {
	                        this.available = true;
	                        this.emit('available');
	                    });
	                }
	            });

	            callback(null, info);
	        });
	    }

	    /**
	     * Closes the connection
	     */
	    close() {
	        this._connected = false;
	        if (this.auth && this.auth.oauth2) {
	            this.auth.oauth2.removeAllListeners();
	        }
	        if (this.connection) {
	            this.connection.close();
	        }
	        this.emit('close');
	    }
	}

	poolResource = PoolResource;
	return poolResource;
}

const Aliyun = {"description":"Alibaba Cloud Mail","domains":["aliyun.com"],"host":"smtp.aliyun.com","port":465,"secure":true};
const AliyunQiye = {"description":"Alibaba Cloud Enterprise Mail","host":"smtp.qiye.aliyun.com","port":465,"secure":true};
const AOL = {"description":"AOL Mail","domains":["aol.com"],"host":"smtp.aol.com","port":587};
const Aruba = {"description":"Aruba PEC (Italian email provider)","domains":["aruba.it","pec.aruba.it"],"aliases":["Aruba PEC"],"host":"smtps.aruba.it","port":465,"secure":true,"authMethod":"LOGIN"};
const Bluewin = {"description":"Bluewin (Swiss email provider)","host":"smtpauths.bluewin.ch","domains":["bluewin.ch"],"port":465};
const BOL = {"description":"BOL Mail (Brazilian provider)","domains":["bol.com.br"],"host":"smtp.bol.com.br","port":587,"requireTLS":true};
const DebugMail = {"description":"DebugMail (email testing service)","host":"debugmail.io","port":25};
const Disroot = {"description":"Disroot (privacy-focused provider)","domains":["disroot.org"],"host":"disroot.org","port":587,"secure":false,"authMethod":"LOGIN"};
const DynectEmail = {"description":"Dyn Email Delivery","aliases":["Dynect"],"host":"smtp.dynect.net","port":25};
const ElasticEmail = {"description":"Elastic Email","aliases":["Elastic Email"],"host":"smtp.elasticemail.com","port":465,"secure":true};
const Ethereal = {"description":"Ethereal Email (email testing service)","aliases":["ethereal.email"],"host":"smtp.ethereal.email","port":587};
const FastMail = {"description":"FastMail","domains":["fastmail.fm"],"host":"smtp.fastmail.com","port":465,"secure":true};
const GandiMail = {"description":"Gandi Mail","aliases":["Gandi","Gandi Mail"],"host":"mail.gandi.net","port":587};
const Gmail = {"description":"Gmail","aliases":["Google Mail"],"domains":["gmail.com","googlemail.com"],"host":"smtp.gmail.com","port":465,"secure":true};
const GMX = {"description":"GMX Mail","domains":["gmx.com","gmx.net","gmx.de"],"host":"mail.gmx.com","port":587};
const Godaddy = {"description":"GoDaddy Email (US)","host":"smtpout.secureserver.net","port":25};
const GodaddyAsia = {"description":"GoDaddy Email (Asia)","host":"smtp.asia.secureserver.net","port":25};
const GodaddyEurope = {"description":"GoDaddy Email (Europe)","host":"smtp.europe.secureserver.net","port":25};
const Hotmail = {"description":"Outlook.com / Hotmail","aliases":["Outlook","Outlook.com","Hotmail.com"],"domains":["hotmail.com","outlook.com"],"host":"smtp-mail.outlook.com","port":587};
const iCloud = {"description":"iCloud Mail","aliases":["Me","Mac"],"domains":["me.com","mac.com"],"host":"smtp.mail.me.com","port":587};
const Infomaniak = {"description":"Infomaniak Mail (Swiss hosting provider)","host":"mail.infomaniak.com","domains":["ik.me","ikmail.com","etik.com"],"port":587};
const KolabNow = {"description":"KolabNow (secure email service)","domains":["kolabnow.com"],"aliases":["Kolab"],"host":"smtp.kolabnow.com","port":465,"secure":true,"authMethod":"LOGIN"};
const Loopia = {"description":"Loopia (Swedish hosting provider)","host":"mailcluster.loopia.se","port":465};
const Loops = {"description":"Loops","host":"smtp.loops.so","port":587};
const Maildev = {"description":"MailDev (local email testing)","port":1025,"ignoreTLS":true};
const MailerSend = {"description":"MailerSend","host":"smtp.mailersend.net","port":587};
const Mailgun = {"description":"Mailgun","host":"smtp.mailgun.org","port":465,"secure":true};
const Mailjet = {"description":"Mailjet","host":"in.mailjet.com","port":587};
const Mailosaur = {"description":"Mailosaur (email testing service)","host":"mailosaur.io","port":25};
const Mailtrap = {"description":"Mailtrap","host":"live.smtp.mailtrap.io","port":587};
const Mandrill = {"description":"Mandrill (by Mailchimp)","host":"smtp.mandrillapp.com","port":587};
const Naver = {"description":"Naver Mail (Korean email provider)","host":"smtp.naver.com","port":587};
const OhMySMTP = {"description":"OhMySMTP (email delivery service)","host":"smtp.ohmysmtp.com","port":587,"secure":false};
const One = {"description":"One.com Email","host":"send.one.com","port":465,"secure":true};
const OpenMailBox = {"description":"OpenMailBox","aliases":["OMB","openmailbox.org"],"host":"smtp.openmailbox.org","port":465,"secure":true};
const Outlook365 = {"description":"Microsoft 365 / Office 365","host":"smtp.office365.com","port":587,"secure":false};
const Postmark = {"description":"Postmark","aliases":["PostmarkApp"],"host":"smtp.postmarkapp.com","port":2525};
const Proton = {"description":"Proton Mail","aliases":["ProtonMail","Proton.me","Protonmail.com","Protonmail.ch"],"domains":["proton.me","protonmail.com","pm.me","protonmail.ch"],"host":"smtp.protonmail.ch","port":587,"requireTLS":true};
const QQ = {"description":"QQ Mail","domains":["qq.com"],"host":"smtp.qq.com","port":465,"secure":true};
const QQex = {"description":"QQ Enterprise Mail","aliases":["QQ Enterprise"],"domains":["exmail.qq.com"],"host":"smtp.exmail.qq.com","port":465,"secure":true};
const Resend = {"description":"Resend","host":"smtp.resend.com","port":465,"secure":true};
const Runbox = {"description":"Runbox (Norwegian email provider)","domains":["runbox.com"],"host":"smtp.runbox.com","port":465,"secure":true};
const SendCloud = {"description":"SendCloud (Chinese email delivery)","host":"smtp.sendcloud.net","port":2525};
const SendGrid = {"description":"SendGrid","host":"smtp.sendgrid.net","port":587};
const SendinBlue = {"description":"Brevo (formerly Sendinblue)","aliases":["Brevo"],"host":"smtp-relay.brevo.com","port":587};
const SendPulse = {"description":"SendPulse","host":"smtp-pulse.com","port":465,"secure":true};
const SES = {"description":"AWS SES US East (N. Virginia)","host":"email-smtp.us-east-1.amazonaws.com","port":465,"secure":true};
const Seznam = {"description":"Seznam Email (Czech email provider)","aliases":["Seznam Email"],"domains":["seznam.cz","email.cz","post.cz","spoluzaci.cz"],"host":"smtp.seznam.cz","port":465,"secure":true};
const SMTP2GO = {"description":"SMTP2GO","host":"mail.smtp2go.com","port":2525};
const Sparkpost = {"description":"SparkPost","aliases":["SparkPost","SparkPost Mail"],"domains":["sparkpost.com"],"host":"smtp.sparkpostmail.com","port":587,"secure":false};
const Tipimail = {"description":"Tipimail (email delivery service)","host":"smtp.tipimail.com","port":587};
const Tutanota = {"description":"Tutanota (Tuta Mail)","domains":["tutanota.com","tuta.com","tutanota.de","tuta.io"],"host":"smtp.tutanota.com","port":465,"secure":true};
const Yahoo = {"description":"Yahoo Mail","domains":["yahoo.com"],"host":"smtp.mail.yahoo.com","port":465,"secure":true};
const Yandex = {"description":"Yandex Mail","domains":["yandex.ru"],"host":"smtp.yandex.ru","port":465,"secure":true};
const Zimbra = {"description":"Zimbra Mail Server","aliases":["Zimbra Collaboration"],"host":"smtp.zimbra.com","port":587,"requireTLS":true};
const Zoho = {"description":"Zoho Mail","host":"smtp.zoho.com","port":465,"secure":true,"authMethod":"LOGIN"};
const require$$0 = {
  "126": {"description":"126 Mail (NetEase)","host":"smtp.126.com","port":465,"secure":true},
  "163": {"description":"163 Mail (NetEase)","host":"smtp.163.com","port":465,"secure":true},
  "1und1": {"description":"1&1 Mail (German hosting provider)","host":"smtp.1und1.de","port":465,"secure":true,"authMethod":"LOGIN"},
  Aliyun,
  AliyunQiye,
  AOL,
  Aruba,
  Bluewin,
  BOL,
  DebugMail,
  Disroot,
  DynectEmail,
  ElasticEmail,
  Ethereal,
  FastMail,
  "Feishu Mail": {"description":"Feishu Mail (Lark)","aliases":["Feishu","FeishuMail"],"domains":["www.feishu.cn"],"host":"smtp.feishu.cn","port":465,"secure":true},
  "Forward Email": {"description":"Forward Email (email forwarding service)","aliases":["FE","ForwardEmail"],"domains":["forwardemail.net"],"host":"smtp.forwardemail.net","port":465,"secure":true},
  GandiMail,
  Gmail,
  GMX,
  Godaddy,
  GodaddyAsia,
  GodaddyEurope,
  "hot.ee": {"description":"Hot.ee (Estonian email provider)","host":"mail.hot.ee"},
  Hotmail,
  iCloud,
  Infomaniak,
  KolabNow,
  Loopia,
  Loops,
  "mail.ee": {"description":"Mail.ee (Estonian email provider)","host":"smtp.mail.ee"},
  "Mail.ru": {"description":"Mail.ru","host":"smtp.mail.ru","port":465,"secure":true},
  "Mailcatch.app": {"description":"Mailcatch (email testing service)","host":"sandbox-smtp.mailcatch.app","port":2525},
  Maildev,
  MailerSend,
  Mailgun,
  Mailjet,
  Mailosaur,
  Mailtrap,
  Mandrill,
  Naver,
  OhMySMTP,
  One,
  OpenMailBox,
  Outlook365,
  Postmark,
  Proton,
  "qiye.aliyun": {"description":"Alibaba Mail Enterprise Edition","host":"smtp.mxhichina.com","port":"465","secure":true},
  QQ,
  QQex,
  Resend,
  Runbox,
  SendCloud,
  SendGrid,
  SendinBlue,
  SendPulse,
  SES,
  "SES-AP-NORTHEAST-1": {"description":"AWS SES Asia Pacific (Tokyo)","host":"email-smtp.ap-northeast-1.amazonaws.com","port":465,"secure":true},
  "SES-AP-NORTHEAST-2": {"description":"AWS SES Asia Pacific (Seoul)","host":"email-smtp.ap-northeast-2.amazonaws.com","port":465,"secure":true},
  "SES-AP-NORTHEAST-3": {"description":"AWS SES Asia Pacific (Osaka)","host":"email-smtp.ap-northeast-3.amazonaws.com","port":465,"secure":true},
  "SES-AP-SOUTH-1": {"description":"AWS SES Asia Pacific (Mumbai)","host":"email-smtp.ap-south-1.amazonaws.com","port":465,"secure":true},
  "SES-AP-SOUTHEAST-1": {"description":"AWS SES Asia Pacific (Singapore)","host":"email-smtp.ap-southeast-1.amazonaws.com","port":465,"secure":true},
  "SES-AP-SOUTHEAST-2": {"description":"AWS SES Asia Pacific (Sydney)","host":"email-smtp.ap-southeast-2.amazonaws.com","port":465,"secure":true},
  "SES-CA-CENTRAL-1": {"description":"AWS SES Canada (Central)","host":"email-smtp.ca-central-1.amazonaws.com","port":465,"secure":true},
  "SES-EU-CENTRAL-1": {"description":"AWS SES Europe (Frankfurt)","host":"email-smtp.eu-central-1.amazonaws.com","port":465,"secure":true},
  "SES-EU-NORTH-1": {"description":"AWS SES Europe (Stockholm)","host":"email-smtp.eu-north-1.amazonaws.com","port":465,"secure":true},
  "SES-EU-WEST-1": {"description":"AWS SES Europe (Ireland)","host":"email-smtp.eu-west-1.amazonaws.com","port":465,"secure":true},
  "SES-EU-WEST-2": {"description":"AWS SES Europe (London)","host":"email-smtp.eu-west-2.amazonaws.com","port":465,"secure":true},
  "SES-EU-WEST-3": {"description":"AWS SES Europe (Paris)","host":"email-smtp.eu-west-3.amazonaws.com","port":465,"secure":true},
  "SES-SA-EAST-1": {"description":"AWS SES South America (São Paulo)","host":"email-smtp.sa-east-1.amazonaws.com","port":465,"secure":true},
  "SES-US-EAST-1": {"description":"AWS SES US East (N. Virginia)","host":"email-smtp.us-east-1.amazonaws.com","port":465,"secure":true},
  "SES-US-EAST-2": {"description":"AWS SES US East (Ohio)","host":"email-smtp.us-east-2.amazonaws.com","port":465,"secure":true},
  "SES-US-GOV-EAST-1": {"description":"AWS SES GovCloud (US-East)","host":"email-smtp.us-gov-east-1.amazonaws.com","port":465,"secure":true},
  "SES-US-GOV-WEST-1": {"description":"AWS SES GovCloud (US-West)","host":"email-smtp.us-gov-west-1.amazonaws.com","port":465,"secure":true},
  "SES-US-WEST-1": {"description":"AWS SES US West (N. California)","host":"email-smtp.us-west-1.amazonaws.com","port":465,"secure":true},
  "SES-US-WEST-2": {"description":"AWS SES US West (Oregon)","host":"email-smtp.us-west-2.amazonaws.com","port":465,"secure":true},
  Seznam,
  SMTP2GO,
  Sparkpost,
  Tipimail,
  Tutanota,
  Yahoo,
  Yandex,
  Zimbra,
  Zoho,
};

var wellKnown;
var hasRequiredWellKnown;

function requireWellKnown () {
	if (hasRequiredWellKnown) return wellKnown;
	hasRequiredWellKnown = 1;

	const services = require$$0;
	const normalized = {};

	Object.keys(services).forEach(key => {
	    let service = services[key];

	    normalized[normalizeKey(key)] = normalizeService(service);

	    [].concat(service.aliases || []).forEach(alias => {
	        normalized[normalizeKey(alias)] = normalizeService(service);
	    });

	    [].concat(service.domains || []).forEach(domain => {
	        normalized[normalizeKey(domain)] = normalizeService(service);
	    });
	});

	function normalizeKey(key) {
	    return key.replace(/[^a-zA-Z0-9.-]/g, '').toLowerCase();
	}

	function normalizeService(service) {
	    let filter = ['domains', 'aliases'];
	    let response = {};

	    Object.keys(service).forEach(key => {
	        if (filter.indexOf(key) < 0) {
	            response[key] = service[key];
	        }
	    });

	    return response;
	}

	/**
	 * Resolves SMTP config for given key. Key can be a name (like 'Gmail'), alias (like 'Google Mail') or
	 * an email address (like 'test@googlemail.com').
	 *
	 * @param {String} key [description]
	 * @returns {Object} SMTP config or false if not found
	 */
	wellKnown = function (key) {
	    key = normalizeKey(key.split('@').pop());
	    return normalized[key] || false;
	};
	return wellKnown;
}

var smtpPool;
var hasRequiredSmtpPool;

function requireSmtpPool () {
	if (hasRequiredSmtpPool) return smtpPool;
	hasRequiredSmtpPool = 1;

	const EventEmitter = require$$0$5;
	const PoolResource = requirePoolResource();
	const SMTPConnection = requireSmtpConnection();
	const wellKnown = requireWellKnown();
	const shared = requireShared();
	const packageData = require$$9;

	/**
	 * Creates a SMTP pool transport object for Nodemailer
	 *
	 * @constructor
	 * @param {Object} options SMTP Connection options
	 */
	class SMTPPool extends EventEmitter {
	    constructor(options) {
	        super();

	        options = options || {};
	        if (typeof options === 'string') {
	            options = {
	                url: options
	            };
	        }

	        let urlData;
	        let service = options.service;

	        if (typeof options.getSocket === 'function') {
	            this.getSocket = options.getSocket;
	        }

	        if (options.url) {
	            urlData = shared.parseConnectionUrl(options.url);
	            service = service || urlData.service;
	        }

	        this.options = shared.assign(
	            false, // create new object
	            options, // regular options
	            urlData, // url options
	            service && wellKnown(service) // wellknown options
	        );

	        this.options.maxConnections = this.options.maxConnections || 5;
	        this.options.maxMessages = this.options.maxMessages || 100;

	        this.logger = shared.getLogger(this.options, {
	            component: this.options.component || 'smtp-pool'
	        });

	        // temporary object
	        let connection = new SMTPConnection(this.options);

	        this.name = 'SMTP (pool)';
	        this.version = packageData.version + '[client:' + connection.version + ']';

	        this._rateLimit = {
	            counter: 0,
	            timeout: null,
	            waiting: [],
	            checkpoint: false,
	            delta: Number(this.options.rateDelta) || 1000,
	            limit: Number(this.options.rateLimit) || 0
	        };
	        this._closed = false;
	        this._queue = [];
	        this._connections = [];
	        this._connectionCounter = 0;

	        this.idling = true;

	        setImmediate(() => {
	            if (this.idling) {
	                this.emit('idle');
	            }
	        });
	    }

	    /**
	     * Placeholder function for creating proxy sockets. This method immediatelly returns
	     * without a socket
	     *
	     * @param {Object} options Connection options
	     * @param {Function} callback Callback function to run with the socket keys
	     */
	    getSocket(options, callback) {
	        // return immediatelly
	        return setImmediate(() => callback(null, false));
	    }

	    /**
	     * Queues an e-mail to be sent using the selected settings
	     *
	     * @param {Object} mail Mail object
	     * @param {Function} callback Callback function
	     */
	    send(mail, callback) {
	        if (this._closed) {
	            return false;
	        }

	        this._queue.push({
	            mail,
	            requeueAttempts: 0,
	            callback
	        });

	        if (this.idling && this._queue.length >= this.options.maxConnections) {
	            this.idling = false;
	        }

	        setImmediate(() => this._processMessages());

	        return true;
	    }

	    /**
	     * Closes all connections in the pool. If there is a message being sent, the connection
	     * is closed later
	     */
	    close() {
	        let connection;
	        let len = this._connections.length;
	        this._closed = true;

	        // clear rate limit timer if it exists
	        clearTimeout(this._rateLimit.timeout);

	        if (!len && !this._queue.length) {
	            return;
	        }

	        // remove all available connections
	        for (let i = len - 1; i >= 0; i--) {
	            if (this._connections[i] && this._connections[i].available) {
	                connection = this._connections[i];
	                connection.close();
	                this.logger.info(
	                    {
	                        tnx: 'connection',
	                        cid: connection.id,
	                        action: 'removed'
	                    },
	                    'Connection #%s removed',
	                    connection.id
	                );
	            }
	        }

	        if (len && !this._connections.length) {
	            this.logger.debug(
	                {
	                    tnx: 'connection'
	                },
	                'All connections removed'
	            );
	        }

	        if (!this._queue.length) {
	            return;
	        }

	        // make sure that entire queue would be cleaned
	        let invokeCallbacks = () => {
	            if (!this._queue.length) {
	                this.logger.debug(
	                    {
	                        tnx: 'connection'
	                    },
	                    'Pending queue entries cleared'
	                );
	                return;
	            }
	            let entry = this._queue.shift();
	            if (entry && typeof entry.callback === 'function') {
	                try {
	                    entry.callback(new Error('Connection pool was closed'));
	                } catch (E) {
	                    this.logger.error(
	                        {
	                            err: E,
	                            tnx: 'callback',
	                            cid: connection.id
	                        },
	                        'Callback error for #%s: %s',
	                        connection.id,
	                        E.message
	                    );
	                }
	            }
	            setImmediate(invokeCallbacks);
	        };
	        setImmediate(invokeCallbacks);
	    }

	    /**
	     * Check the queue and available connections. If there is a message to be sent and there is
	     * an available connection, then use this connection to send the mail
	     */
	    _processMessages() {
	        let connection;
	        let i, len;

	        // do nothing if already closed
	        if (this._closed) {
	            return;
	        }

	        // do nothing if queue is empty
	        if (!this._queue.length) {
	            if (!this.idling) {
	                // no pending jobs
	                this.idling = true;
	                this.emit('idle');
	            }
	            return;
	        }

	        // find first available connection
	        for (i = 0, len = this._connections.length; i < len; i++) {
	            if (this._connections[i].available) {
	                connection = this._connections[i];
	                break;
	            }
	        }

	        if (!connection && this._connections.length < this.options.maxConnections) {
	            connection = this._createConnection();
	        }

	        if (!connection) {
	            // no more free connection slots available
	            this.idling = false;
	            return;
	        }

	        // check if there is free space in the processing queue
	        if (!this.idling && this._queue.length < this.options.maxConnections) {
	            this.idling = true;
	            this.emit('idle');
	        }

	        let entry = (connection.queueEntry = this._queue.shift());
	        entry.messageId = (connection.queueEntry.mail.message.getHeader('message-id') || '').replace(/[<>\s]/g, '');

	        connection.available = false;

	        this.logger.debug(
	            {
	                tnx: 'pool',
	                cid: connection.id,
	                messageId: entry.messageId,
	                action: 'assign'
	            },
	            'Assigned message <%s> to #%s (%s)',
	            entry.messageId,
	            connection.id,
	            connection.messages + 1
	        );

	        if (this._rateLimit.limit) {
	            this._rateLimit.counter++;
	            if (!this._rateLimit.checkpoint) {
	                this._rateLimit.checkpoint = Date.now();
	            }
	        }

	        connection.send(entry.mail, (err, info) => {
	            // only process callback if current handler is not changed
	            if (entry === connection.queueEntry) {
	                try {
	                    entry.callback(err, info);
	                } catch (E) {
	                    this.logger.error(
	                        {
	                            err: E,
	                            tnx: 'callback',
	                            cid: connection.id
	                        },
	                        'Callback error for #%s: %s',
	                        connection.id,
	                        E.message
	                    );
	                }
	                connection.queueEntry = false;
	            }
	        });
	    }

	    /**
	     * Creates a new pool resource
	     */
	    _createConnection() {
	        let connection = new PoolResource(this);

	        connection.id = ++this._connectionCounter;

	        this.logger.info(
	            {
	                tnx: 'pool',
	                cid: connection.id,
	                action: 'conection'
	            },
	            'Created new pool resource #%s',
	            connection.id
	        );

	        // resource comes available
	        connection.on('available', () => {
	            this.logger.debug(
	                {
	                    tnx: 'connection',
	                    cid: connection.id,
	                    action: 'available'
	                },
	                'Connection #%s became available',
	                connection.id
	            );

	            if (this._closed) {
	                // if already closed run close() that will remove this connections from connections list
	                this.close();
	            } else {
	                // check if there's anything else to send
	                this._processMessages();
	            }
	        });

	        // resource is terminated with an error
	        connection.once('error', err => {
	            if (err.code !== 'EMAXLIMIT') {
	                this.logger.warn(
	                    {
	                        err,
	                        tnx: 'pool',
	                        cid: connection.id
	                    },
	                    'Pool Error for #%s: %s',
	                    connection.id,
	                    err.message
	                );
	            } else {
	                this.logger.debug(
	                    {
	                        tnx: 'pool',
	                        cid: connection.id,
	                        action: 'maxlimit'
	                    },
	                    'Max messages limit exchausted for #%s',
	                    connection.id
	                );
	            }

	            if (connection.queueEntry) {
	                try {
	                    connection.queueEntry.callback(err);
	                } catch (E) {
	                    this.logger.error(
	                        {
	                            err: E,
	                            tnx: 'callback',
	                            cid: connection.id
	                        },
	                        'Callback error for #%s: %s',
	                        connection.id,
	                        E.message
	                    );
	                }
	                connection.queueEntry = false;
	            }

	            // remove the erroneus connection from connections list
	            this._removeConnection(connection);

	            this._continueProcessing();
	        });

	        connection.once('close', () => {
	            this.logger.info(
	                {
	                    tnx: 'connection',
	                    cid: connection.id,
	                    action: 'closed'
	                },
	                'Connection #%s was closed',
	                connection.id
	            );

	            this._removeConnection(connection);

	            if (connection.queueEntry) {
	                // If the connection closed when sending, add the message to the queue again
	                // if max number of requeues is not reached yet
	                // Note that we must wait a bit.. because the callback of the 'error' handler might be called
	                // in the next event loop
	                setTimeout(() => {
	                    if (connection.queueEntry) {
	                        if (this._shouldRequeuOnConnectionClose(connection.queueEntry)) {
	                            this._requeueEntryOnConnectionClose(connection);
	                        } else {
	                            this._failDeliveryOnConnectionClose(connection);
	                        }
	                    }
	                    this._continueProcessing();
	                }, 50);
	            } else {
	                if (!this._closed && this.idling && !this._connections.length) {
	                    this.emit('clear');
	                }

	                this._continueProcessing();
	            }
	        });

	        this._connections.push(connection);

	        return connection;
	    }

	    _shouldRequeuOnConnectionClose(queueEntry) {
	        if (this.options.maxRequeues === undefined || this.options.maxRequeues < 0) {
	            return true;
	        }

	        return queueEntry.requeueAttempts < this.options.maxRequeues;
	    }

	    _failDeliveryOnConnectionClose(connection) {
	        if (connection.queueEntry && connection.queueEntry.callback) {
	            try {
	                connection.queueEntry.callback(new Error('Reached maximum number of retries after connection was closed'));
	            } catch (E) {
	                this.logger.error(
	                    {
	                        err: E,
	                        tnx: 'callback',
	                        messageId: connection.queueEntry.messageId,
	                        cid: connection.id
	                    },
	                    'Callback error for #%s: %s',
	                    connection.id,
	                    E.message
	                );
	            }
	            connection.queueEntry = false;
	        }
	    }

	    _requeueEntryOnConnectionClose(connection) {
	        connection.queueEntry.requeueAttempts = connection.queueEntry.requeueAttempts + 1;
	        this.logger.debug(
	            {
	                tnx: 'pool',
	                cid: connection.id,
	                messageId: connection.queueEntry.messageId,
	                action: 'requeue'
	            },
	            'Re-queued message <%s> for #%s. Attempt: #%s',
	            connection.queueEntry.messageId,
	            connection.id,
	            connection.queueEntry.requeueAttempts
	        );
	        this._queue.unshift(connection.queueEntry);
	        connection.queueEntry = false;
	    }

	    /**
	     * Continue to process message if the pool hasn't closed
	     */
	    _continueProcessing() {
	        if (this._closed) {
	            this.close();
	        } else {
	            setTimeout(() => this._processMessages(), 100);
	        }
	    }

	    /**
	     * Remove resource from pool
	     *
	     * @param {Object} connection The PoolResource to remove
	     */
	    _removeConnection(connection) {
	        let index = this._connections.indexOf(connection);

	        if (index !== -1) {
	            this._connections.splice(index, 1);
	        }
	    }

	    /**
	     * Checks if connections have hit current rate limit and if so, queues the availability callback
	     *
	     * @param {Function} callback Callback function to run once rate limiter has been cleared
	     */
	    _checkRateLimit(callback) {
	        if (!this._rateLimit.limit) {
	            return callback();
	        }

	        let now = Date.now();

	        if (this._rateLimit.counter < this._rateLimit.limit) {
	            return callback();
	        }

	        this._rateLimit.waiting.push(callback);

	        if (this._rateLimit.checkpoint <= now - this._rateLimit.delta) {
	            return this._clearRateLimit();
	        } else if (!this._rateLimit.timeout) {
	            this._rateLimit.timeout = setTimeout(() => this._clearRateLimit(), this._rateLimit.delta - (now - this._rateLimit.checkpoint));
	            this._rateLimit.checkpoint = now;
	        }
	    }

	    /**
	     * Clears current rate limit limitation and runs paused callback
	     */
	    _clearRateLimit() {
	        clearTimeout(this._rateLimit.timeout);
	        this._rateLimit.timeout = null;
	        this._rateLimit.counter = 0;
	        this._rateLimit.checkpoint = false;

	        // resume all paused connections
	        while (this._rateLimit.waiting.length) {
	            let cb = this._rateLimit.waiting.shift();
	            setImmediate(cb);
	        }
	    }

	    /**
	     * Returns true if there are free slots in the queue
	     */
	    isIdle() {
	        return this.idling;
	    }

	    /**
	     * Verifies SMTP configuration
	     *
	     * @param {Function} callback Callback function
	     */
	    verify(callback) {
	        let promise;

	        if (!callback) {
	            promise = new Promise((resolve, reject) => {
	                callback = shared.callbackPromise(resolve, reject);
	            });
	        }

	        let auth = new PoolResource(this).auth;

	        this.getSocket(this.options, (err, socketOptions) => {
	            if (err) {
	                return callback(err);
	            }

	            let options = this.options;
	            if (socketOptions && socketOptions.connection) {
	                this.logger.info(
	                    {
	                        tnx: 'proxy',
	                        remoteAddress: socketOptions.connection.remoteAddress,
	                        remotePort: socketOptions.connection.remotePort,
	                        destHost: options.host || '',
	                        destPort: options.port || '',
	                        action: 'connected'
	                    },
	                    'Using proxied socket from %s:%s to %s:%s',
	                    socketOptions.connection.remoteAddress,
	                    socketOptions.connection.remotePort,
	                    options.host || '',
	                    options.port || ''
	                );
	                options = shared.assign(false, options);
	                Object.keys(socketOptions).forEach(key => {
	                    options[key] = socketOptions[key];
	                });
	            }

	            let connection = new SMTPConnection(options);
	            let returned = false;

	            connection.once('error', err => {
	                if (returned) {
	                    return;
	                }
	                returned = true;
	                connection.close();
	                return callback(err);
	            });

	            connection.once('end', () => {
	                if (returned) {
	                    return;
	                }
	                returned = true;
	                return callback(new Error('Connection closed'));
	            });

	            let finalize = () => {
	                if (returned) {
	                    return;
	                }
	                returned = true;
	                connection.quit();
	                return callback(null, true);
	            };

	            connection.connect(() => {
	                if (returned) {
	                    return;
	                }

	                if (auth && (connection.allowsAuth || options.forceAuth)) {
	                    connection.login(auth, err => {
	                        if (returned) {
	                            return;
	                        }

	                        if (err) {
	                            returned = true;
	                            connection.close();
	                            return callback(err);
	                        }

	                        finalize();
	                    });
	                } else if (!auth && connection.allowsAuth && options.forceAuth) {
	                    let err = new Error('Authentication info was not provided');
	                    err.code = 'NoAuth';

	                    returned = true;
	                    connection.close();
	                    return callback(err);
	                } else {
	                    finalize();
	                }
	            });
	        });

	        return promise;
	    }
	}

	// expose to the world
	smtpPool = SMTPPool;
	return smtpPool;
}

var smtpTransport;
var hasRequiredSmtpTransport;

function requireSmtpTransport () {
	if (hasRequiredSmtpTransport) return smtpTransport;
	hasRequiredSmtpTransport = 1;

	const EventEmitter = require$$0$5;
	const SMTPConnection = requireSmtpConnection();
	const wellKnown = requireWellKnown();
	const shared = requireShared();
	const XOAuth2 = requireXoauth2();
	const packageData = require$$9;

	/**
	 * Creates a SMTP transport object for Nodemailer
	 *
	 * @constructor
	 * @param {Object} options Connection options
	 */
	class SMTPTransport extends EventEmitter {
	    constructor(options) {
	        super();

	        options = options || {};

	        if (typeof options === 'string') {
	            options = {
	                url: options
	            };
	        }

	        let urlData;
	        let service = options.service;

	        if (typeof options.getSocket === 'function') {
	            this.getSocket = options.getSocket;
	        }

	        if (options.url) {
	            urlData = shared.parseConnectionUrl(options.url);
	            service = service || urlData.service;
	        }

	        this.options = shared.assign(
	            false, // create new object
	            options, // regular options
	            urlData, // url options
	            service && wellKnown(service) // wellknown options
	        );

	        this.logger = shared.getLogger(this.options, {
	            component: this.options.component || 'smtp-transport'
	        });

	        // temporary object
	        let connection = new SMTPConnection(this.options);

	        this.name = 'SMTP';
	        this.version = packageData.version + '[client:' + connection.version + ']';

	        if (this.options.auth) {
	            this.auth = this.getAuth({});
	        }
	    }

	    /**
	     * Placeholder function for creating proxy sockets. This method immediatelly returns
	     * without a socket
	     *
	     * @param {Object} options Connection options
	     * @param {Function} callback Callback function to run with the socket keys
	     */
	    getSocket(options, callback) {
	        // return immediatelly
	        return setImmediate(() => callback(null, false));
	    }

	    getAuth(authOpts) {
	        if (!authOpts) {
	            return this.auth;
	        }

	        let hasAuth = false;
	        let authData = {};

	        if (this.options.auth && typeof this.options.auth === 'object') {
	            Object.keys(this.options.auth).forEach(key => {
	                hasAuth = true;
	                authData[key] = this.options.auth[key];
	            });
	        }

	        if (authOpts && typeof authOpts === 'object') {
	            Object.keys(authOpts).forEach(key => {
	                hasAuth = true;
	                authData[key] = authOpts[key];
	            });
	        }

	        if (!hasAuth) {
	            return false;
	        }

	        switch ((authData.type || '').toString().toUpperCase()) {
	            case 'OAUTH2': {
	                if (!authData.service && !authData.user) {
	                    return false;
	                }
	                let oauth2 = new XOAuth2(authData, this.logger);
	                oauth2.provisionCallback = (this.mailer && this.mailer.get('oauth2_provision_cb')) || oauth2.provisionCallback;
	                oauth2.on('token', token => this.mailer.emit('token', token));
	                oauth2.on('error', err => this.emit('error', err));
	                return {
	                    type: 'OAUTH2',
	                    user: authData.user,
	                    oauth2,
	                    method: 'XOAUTH2'
	                };
	            }
	            default:
	                return {
	                    type: (authData.type || '').toString().toUpperCase() || 'LOGIN',
	                    user: authData.user,
	                    credentials: {
	                        user: authData.user || '',
	                        pass: authData.pass,
	                        options: authData.options
	                    },
	                    method: (authData.method || '').trim().toUpperCase() || this.options.authMethod || false
	                };
	        }
	    }

	    /**
	     * Sends an e-mail using the selected settings
	     *
	     * @param {Object} mail Mail object
	     * @param {Function} callback Callback function
	     */
	    send(mail, callback) {
	        this.getSocket(this.options, (err, socketOptions) => {
	            if (err) {
	                return callback(err);
	            }

	            let returned = false;
	            let options = this.options;
	            if (socketOptions && socketOptions.connection) {
	                this.logger.info(
	                    {
	                        tnx: 'proxy',
	                        remoteAddress: socketOptions.connection.remoteAddress,
	                        remotePort: socketOptions.connection.remotePort,
	                        destHost: options.host || '',
	                        destPort: options.port || '',
	                        action: 'connected'
	                    },
	                    'Using proxied socket from %s:%s to %s:%s',
	                    socketOptions.connection.remoteAddress,
	                    socketOptions.connection.remotePort,
	                    options.host || '',
	                    options.port || ''
	                );

	                // only copy options if we need to modify it
	                options = shared.assign(false, options);
	                Object.keys(socketOptions).forEach(key => {
	                    options[key] = socketOptions[key];
	                });
	            }

	            let connection = new SMTPConnection(options);

	            connection.once('error', err => {
	                if (returned) {
	                    return;
	                }
	                returned = true;
	                connection.close();
	                return callback(err);
	            });

	            connection.once('end', () => {
	                if (returned) {
	                    return;
	                }

	                let timer = setTimeout(() => {
	                    if (returned) {
	                        return;
	                    }
	                    returned = true;
	                    // still have not returned, this means we have an unexpected connection close
	                    let err = new Error('Unexpected socket close');
	                    if (connection && connection._socket && connection._socket.upgrading) {
	                        // starttls connection errors
	                        err.code = 'ETLS';
	                    }
	                    callback(err);
	                }, 1000);

	                try {
	                    timer.unref();
	                } catch (_E) {
	                    // Ignore. Happens on envs with non-node timer implementation
	                }
	            });

	            let sendMessage = () => {
	                let envelope = mail.message.getEnvelope();
	                let messageId = mail.message.messageId();

	                let recipients = [].concat(envelope.to || []);
	                if (recipients.length > 3) {
	                    recipients.push('...and ' + recipients.splice(2).length + ' more');
	                }

	                if (mail.data.dsn) {
	                    envelope.dsn = mail.data.dsn;
	                }

	                // RFC 8689: Pass requireTLSExtensionEnabled to envelope for MAIL FROM parameter
	                if (mail.data.requireTLSExtensionEnabled) {
	                    envelope.requireTLSExtensionEnabled = mail.data.requireTLSExtensionEnabled;
	                }

	                this.logger.info(
	                    {
	                        tnx: 'send',
	                        messageId
	                    },
	                    'Sending message %s to <%s>',
	                    messageId,
	                    recipients.join(', ')
	                );

	                connection.send(envelope, mail.message.createReadStream(), (err, info) => {
	                    returned = true;
	                    connection.close();
	                    if (err) {
	                        this.logger.error(
	                            {
	                                err,
	                                tnx: 'send'
	                            },
	                            'Send error for %s: %s',
	                            messageId,
	                            err.message
	                        );
	                        return callback(err);
	                    }
	                    info.envelope = {
	                        from: envelope.from,
	                        to: envelope.to
	                    };
	                    info.messageId = messageId;
	                    try {
	                        return callback(null, info);
	                    } catch (E) {
	                        this.logger.error(
	                            {
	                                err: E,
	                                tnx: 'callback'
	                            },
	                            'Callback error for %s: %s',
	                            messageId,
	                            E.message
	                        );
	                    }
	                });
	            };

	            connection.connect(() => {
	                if (returned) {
	                    return;
	                }

	                let auth = this.getAuth(mail.data.auth);

	                if (auth && (connection.allowsAuth || options.forceAuth)) {
	                    connection.login(auth, err => {
	                        if (auth && auth !== this.auth && auth.oauth2) {
	                            auth.oauth2.removeAllListeners();
	                        }
	                        if (returned) {
	                            return;
	                        }

	                        if (err) {
	                            returned = true;
	                            connection.close();
	                            return callback(err);
	                        }

	                        sendMessage();
	                    });
	                } else {
	                    sendMessage();
	                }
	            });
	        });
	    }

	    /**
	     * Verifies SMTP configuration
	     *
	     * @param {Function} callback Callback function
	     */
	    verify(callback) {
	        let promise;

	        if (!callback) {
	            promise = new Promise((resolve, reject) => {
	                callback = shared.callbackPromise(resolve, reject);
	            });
	        }

	        this.getSocket(this.options, (err, socketOptions) => {
	            if (err) {
	                return callback(err);
	            }

	            let options = this.options;
	            if (socketOptions && socketOptions.connection) {
	                this.logger.info(
	                    {
	                        tnx: 'proxy',
	                        remoteAddress: socketOptions.connection.remoteAddress,
	                        remotePort: socketOptions.connection.remotePort,
	                        destHost: options.host || '',
	                        destPort: options.port || '',
	                        action: 'connected'
	                    },
	                    'Using proxied socket from %s:%s to %s:%s',
	                    socketOptions.connection.remoteAddress,
	                    socketOptions.connection.remotePort,
	                    options.host || '',
	                    options.port || ''
	                );

	                options = shared.assign(false, options);
	                Object.keys(socketOptions).forEach(key => {
	                    options[key] = socketOptions[key];
	                });
	            }

	            let connection = new SMTPConnection(options);
	            let returned = false;

	            connection.once('error', err => {
	                if (returned) {
	                    return;
	                }
	                returned = true;
	                connection.close();
	                return callback(err);
	            });

	            connection.once('end', () => {
	                if (returned) {
	                    return;
	                }
	                returned = true;
	                return callback(new Error('Connection closed'));
	            });

	            let finalize = () => {
	                if (returned) {
	                    return;
	                }
	                returned = true;
	                connection.quit();
	                return callback(null, true);
	            };

	            connection.connect(() => {
	                if (returned) {
	                    return;
	                }

	                let authData = this.getAuth({});

	                if (authData && (connection.allowsAuth || options.forceAuth)) {
	                    connection.login(authData, err => {
	                        if (returned) {
	                            return;
	                        }

	                        if (err) {
	                            returned = true;
	                            connection.close();
	                            return callback(err);
	                        }

	                        finalize();
	                    });
	                } else if (!authData && connection.allowsAuth && options.forceAuth) {
	                    let err = new Error('Authentication info was not provided');
	                    err.code = 'NoAuth';

	                    returned = true;
	                    connection.close();
	                    return callback(err);
	                } else {
	                    finalize();
	                }
	            });
	        });

	        return promise;
	    }

	    /**
	     * Releases resources
	     */
	    close() {
	        if (this.auth && this.auth.oauth2) {
	            this.auth.oauth2.removeAllListeners();
	        }
	        this.emit('close');
	    }
	}

	// expose to the world
	smtpTransport = SMTPTransport;
	return smtpTransport;
}

var sendmailTransport;
var hasRequiredSendmailTransport;

function requireSendmailTransport () {
	if (hasRequiredSendmailTransport) return sendmailTransport;
	hasRequiredSendmailTransport = 1;

	const spawn = ChildProcess.spawn;
	const packageData = require$$9;
	const shared = requireShared();

	/**
	 * Generates a Transport object for Sendmail
	 *
	 * Possible options can be the following:
	 *
	 *  * **path** optional path to sendmail binary
	 *  * **newline** either 'windows' or 'unix'
	 *  * **args** an array of arguments for the sendmail binary
	 *
	 * @constructor
	 * @param {Object} optional config parameter for Sendmail
	 */
	class SendmailTransport {
	    constructor(options) {
	        options = options || {};

	        // use a reference to spawn for mocking purposes
	        this._spawn = spawn;

	        this.options = options || {};

	        this.name = 'Sendmail';
	        this.version = packageData.version;

	        this.path = 'sendmail';
	        this.args = false;
	        this.winbreak = false;

	        this.logger = shared.getLogger(this.options, {
	            component: this.options.component || 'sendmail'
	        });

	        if (options) {
	            if (typeof options === 'string') {
	                this.path = options;
	            } else if (typeof options === 'object') {
	                if (options.path) {
	                    this.path = options.path;
	                }
	                if (Array.isArray(options.args)) {
	                    this.args = options.args;
	                }
	                this.winbreak = ['win', 'windows', 'dos', '\r\n'].includes((options.newline || '').toString().toLowerCase());
	            }
	        }
	    }

	    /**
	     * <p>Compiles a mailcomposer message and forwards it to handler that sends it.</p>
	     *
	     * @param {Object} emailMessage MailComposer object
	     * @param {Function} callback Callback function to run when the sending is completed
	     */
	    send(mail, done) {
	        // Sendmail strips this header line by itself
	        mail.message.keepBcc = true;

	        let envelope = mail.data.envelope || mail.message.getEnvelope();
	        let messageId = mail.message.messageId();
	        let args;
	        let sendmail;
	        let returned;

	        const hasInvalidAddresses = []
	            .concat(envelope.from || [])
	            .concat(envelope.to || [])
	            .some(addr => /^-/.test(addr));
	        if (hasInvalidAddresses) {
	            return done(new Error('Can not send mail. Invalid envelope addresses.'));
	        }

	        if (this.args) {
	            // force -i to keep single dots
	            args = ['-i'].concat(this.args).concat(envelope.to);
	        } else {
	            args = ['-i'].concat(envelope.from ? ['-f', envelope.from] : []).concat(envelope.to);
	        }

	        let callback = err => {
	            if (returned) {
	                // ignore any additional responses, already done
	                return;
	            }
	            returned = true;
	            if (typeof done === 'function') {
	                if (err) {
	                    return done(err);
	                } else {
	                    return done(null, {
	                        envelope: mail.data.envelope || mail.message.getEnvelope(),
	                        messageId,
	                        response: 'Messages queued for delivery'
	                    });
	                }
	            }
	        };

	        try {
	            sendmail = this._spawn(this.path, args);
	        } catch (E) {
	            this.logger.error(
	                {
	                    err: E,
	                    tnx: 'spawn',
	                    messageId
	                },
	                'Error occurred while spawning sendmail. %s',
	                E.message
	            );
	            return callback(E);
	        }

	        if (sendmail) {
	            sendmail.on('error', err => {
	                this.logger.error(
	                    {
	                        err,
	                        tnx: 'spawn',
	                        messageId
	                    },
	                    'Error occurred when sending message %s. %s',
	                    messageId,
	                    err.message
	                );
	                callback(err);
	            });

	            sendmail.once('exit', code => {
	                if (!code) {
	                    return callback();
	                }
	                let err;
	                if (code === 127) {
	                    err = new Error('Sendmail command not found, process exited with code ' + code);
	                } else {
	                    err = new Error('Sendmail exited with code ' + code);
	                }

	                this.logger.error(
	                    {
	                        err,
	                        tnx: 'stdin',
	                        messageId
	                    },
	                    'Error sending message %s to sendmail. %s',
	                    messageId,
	                    err.message
	                );
	                callback(err);
	            });
	            sendmail.once('close', callback);

	            sendmail.stdin.on('error', err => {
	                this.logger.error(
	                    {
	                        err,
	                        tnx: 'stdin',
	                        messageId
	                    },
	                    'Error occurred when piping message %s to sendmail. %s',
	                    messageId,
	                    err.message
	                );
	                callback(err);
	            });

	            let recipients = [].concat(envelope.to || []);
	            if (recipients.length > 3) {
	                recipients.push('...and ' + recipients.splice(2).length + ' more');
	            }
	            this.logger.info(
	                {
	                    tnx: 'send',
	                    messageId
	                },
	                'Sending message %s to <%s>',
	                messageId,
	                recipients.join(', ')
	            );

	            let sourceStream = mail.message.createReadStream();
	            sourceStream.once('error', err => {
	                this.logger.error(
	                    {
	                        err,
	                        tnx: 'stdin',
	                        messageId
	                    },
	                    'Error occurred when generating message %s. %s',
	                    messageId,
	                    err.message
	                );
	                sendmail.kill('SIGINT'); // do not deliver the message
	                callback(err);
	            });

	            sourceStream.pipe(sendmail.stdin);
	        } else {
	            return callback(new Error('sendmail was not found'));
	        }
	    }
	}

	sendmailTransport = SendmailTransport;
	return sendmailTransport;
}

var streamTransport;
var hasRequiredStreamTransport;

function requireStreamTransport () {
	if (hasRequiredStreamTransport) return streamTransport;
	hasRequiredStreamTransport = 1;

	const packageData = require$$9;
	const shared = requireShared();

	/**
	 * Generates a Transport object for streaming
	 *
	 * Possible options can be the following:
	 *
	 *  * **buffer** if true, then returns the message as a Buffer object instead of a stream
	 *  * **newline** either 'windows' or 'unix'
	 *
	 * @constructor
	 * @param {Object} optional config parameter
	 */
	class StreamTransport {
	    constructor(options) {
	        options = options || {};

	        this.options = options || {};

	        this.name = 'StreamTransport';
	        this.version = packageData.version;

	        this.logger = shared.getLogger(this.options, {
	            component: this.options.component || 'stream-transport'
	        });

	        this.winbreak = ['win', 'windows', 'dos', '\r\n'].includes((options.newline || '').toString().toLowerCase());
	    }

	    /**
	     * Compiles a mailcomposer message and forwards it to handler that sends it
	     *
	     * @param {Object} emailMessage MailComposer object
	     * @param {Function} callback Callback function to run when the sending is completed
	     */
	    send(mail, done) {
	        // We probably need this in the output
	        mail.message.keepBcc = true;

	        let envelope = mail.data.envelope || mail.message.getEnvelope();
	        let messageId = mail.message.messageId();

	        let recipients = [].concat(envelope.to || []);
	        if (recipients.length > 3) {
	            recipients.push('...and ' + recipients.splice(2).length + ' more');
	        }
	        this.logger.info(
	            {
	                tnx: 'send',
	                messageId
	            },
	            'Sending message %s to <%s> using %s line breaks',
	            messageId,
	            recipients.join(', '),
	            this.winbreak ? '<CR><LF>' : '<LF>'
	        );

	        setImmediate(() => {
	            let stream;

	            try {
	                stream = mail.message.createReadStream();
	            } catch (E) {
	                this.logger.error(
	                    {
	                        err: E,
	                        tnx: 'send',
	                        messageId
	                    },
	                    'Creating send stream failed for %s. %s',
	                    messageId,
	                    E.message
	                );
	                return done(E);
	            }

	            if (!this.options.buffer) {
	                stream.once('error', err => {
	                    this.logger.error(
	                        {
	                            err,
	                            tnx: 'send',
	                            messageId
	                        },
	                        'Failed creating message for %s. %s',
	                        messageId,
	                        err.message
	                    );
	                });
	                return done(null, {
	                    envelope: mail.data.envelope || mail.message.getEnvelope(),
	                    messageId,
	                    message: stream
	                });
	            }

	            let chunks = [];
	            let chunklen = 0;
	            stream.on('readable', () => {
	                let chunk;
	                while ((chunk = stream.read()) !== null) {
	                    chunks.push(chunk);
	                    chunklen += chunk.length;
	                }
	            });

	            stream.once('error', err => {
	                this.logger.error(
	                    {
	                        err,
	                        tnx: 'send',
	                        messageId
	                    },
	                    'Failed creating message for %s. %s',
	                    messageId,
	                    err.message
	                );
	                return done(err);
	            });

	            stream.on('end', () =>
	                done(null, {
	                    envelope: mail.data.envelope || mail.message.getEnvelope(),
	                    messageId,
	                    message: Buffer.concat(chunks, chunklen)
	                })
	            );
	        });
	    }
	}

	streamTransport = StreamTransport;
	return streamTransport;
}

var jsonTransport;
var hasRequiredJsonTransport;

function requireJsonTransport () {
	if (hasRequiredJsonTransport) return jsonTransport;
	hasRequiredJsonTransport = 1;

	const packageData = require$$9;
	const shared = requireShared();

	/**
	 * Generates a Transport object to generate JSON output
	 *
	 * @constructor
	 * @param {Object} optional config parameter
	 */
	class JSONTransport {
	    constructor(options) {
	        options = options || {};

	        this.options = options || {};

	        this.name = 'JSONTransport';
	        this.version = packageData.version;

	        this.logger = shared.getLogger(this.options, {
	            component: this.options.component || 'json-transport'
	        });
	    }

	    /**
	     * <p>Compiles a mailcomposer message and forwards it to handler that sends it.</p>
	     *
	     * @param {Object} emailMessage MailComposer object
	     * @param {Function} callback Callback function to run when the sending is completed
	     */
	    send(mail, done) {
	        // Sendmail strips this header line by itself
	        mail.message.keepBcc = true;

	        let envelope = mail.data.envelope || mail.message.getEnvelope();
	        let messageId = mail.message.messageId();

	        let recipients = [].concat(envelope.to || []);
	        if (recipients.length > 3) {
	            recipients.push('...and ' + recipients.splice(2).length + ' more');
	        }
	        this.logger.info(
	            {
	                tnx: 'send',
	                messageId
	            },
	            'Composing JSON structure of %s to <%s>',
	            messageId,
	            recipients.join(', ')
	        );

	        setImmediate(() => {
	            mail.normalize((err, data) => {
	                if (err) {
	                    this.logger.error(
	                        {
	                            err,
	                            tnx: 'send',
	                            messageId
	                        },
	                        'Failed building JSON structure for %s. %s',
	                        messageId,
	                        err.message
	                    );
	                    return done(err);
	                }

	                delete data.envelope;
	                delete data.normalizedHeaders;

	                return done(null, {
	                    envelope,
	                    messageId,
	                    message: this.options.skipEncoding ? data : JSON.stringify(data)
	                });
	            });
	        });
	    }
	}

	jsonTransport = JSONTransport;
	return jsonTransport;
}

var sesTransport;
var hasRequiredSesTransport;

function requireSesTransport () {
	if (hasRequiredSesTransport) return sesTransport;
	hasRequiredSesTransport = 1;

	const EventEmitter = require$$0$5;
	const packageData = require$$9;
	const shared = requireShared();
	const LeWindows = requireLeWindows();
	const MimeNode = requireMimeNode();

	/**
	 * Generates a Transport object for AWS SES
	 *
	 * @constructor
	 * @param {Object} optional config parameter
	 */
	class SESTransport extends EventEmitter {
	    constructor(options) {
	        super();
	        options = options || {};

	        this.options = options || {};
	        this.ses = this.options.SES;

	        this.name = 'SESTransport';
	        this.version = packageData.version;

	        this.logger = shared.getLogger(this.options, {
	            component: this.options.component || 'ses-transport'
	        });
	    }

	    getRegion(cb) {
	        if (this.ses.sesClient.config && typeof this.ses.sesClient.config.region === 'function') {
	            // promise
	            return this.ses.sesClient.config
	                .region()
	                .then(region => cb(null, region))
	                .catch(err => cb(err));
	        }
	        return cb(null, false);
	    }

	    /**
	     * Compiles a mailcomposer message and forwards it to SES
	     *
	     * @param {Object} emailMessage MailComposer object
	     * @param {Function} callback Callback function to run when the sending is completed
	     */
	    send(mail, callback) {

	        let fromHeader = mail.message._headers.find(header => /^from$/i.test(header.key));
	        if (fromHeader) {
	            let mimeNode = new MimeNode('text/plain');
	            fromHeader = mimeNode._convertAddresses(mimeNode._parseAddresses(fromHeader.value));
	        }

	        let envelope = mail.data.envelope || mail.message.getEnvelope();
	        let messageId = mail.message.messageId();

	        let recipients = [].concat(envelope.to || []);
	        if (recipients.length > 3) {
	            recipients.push('...and ' + recipients.splice(2).length + ' more');
	        }
	        this.logger.info(
	            {
	                tnx: 'send',
	                messageId
	            },
	            'Sending message %s to <%s>',
	            messageId,
	            recipients.join(', ')
	        );

	        let getRawMessage = next => {
	            // do not use Message-ID and Date in DKIM signature
	            if (!mail.data._dkim) {
	                mail.data._dkim = {};
	            }
	            if (mail.data._dkim.skipFields && typeof mail.data._dkim.skipFields === 'string') {
	                mail.data._dkim.skipFields += ':date:message-id';
	            } else {
	                mail.data._dkim.skipFields = 'date:message-id';
	            }

	            let sourceStream = mail.message.createReadStream();
	            let stream = sourceStream.pipe(new LeWindows());
	            let chunks = [];
	            let chunklen = 0;

	            stream.on('readable', () => {
	                let chunk;
	                while ((chunk = stream.read()) !== null) {
	                    chunks.push(chunk);
	                    chunklen += chunk.length;
	                }
	            });

	            sourceStream.once('error', err => stream.emit('error', err));

	            stream.once('error', err => {
	                next(err);
	            });

	            stream.once('end', () => next(null, Buffer.concat(chunks, chunklen)));
	        };

	        setImmediate(() =>
	            getRawMessage((err, raw) => {
	                if (err) {
	                    this.logger.error(
	                        {
	                            err,
	                            tnx: 'send',
	                            messageId
	                        },
	                        'Failed creating message for %s. %s',
	                        messageId,
	                        err.message
	                    );
	                    return callback(err);
	                }

	                let sesMessage = {
	                    Content: {
	                        Raw: {
	                            // required
	                            Data: raw // required
	                        }
	                    },
	                    FromEmailAddress: fromHeader ? fromHeader : envelope.from,
	                    Destination: {
	                        ToAddresses: envelope.to
	                    }
	                };

	                Object.keys(mail.data.ses || {}).forEach(key => {
	                    sesMessage[key] = mail.data.ses[key];
	                });

	                this.getRegion((err, region) => {
	                    if (err || !region) {
	                        region = 'us-east-1';
	                    }

	                    const command = new this.ses.SendEmailCommand(sesMessage);
	                    const sendPromise = this.ses.sesClient.send(command);

	                    sendPromise
	                        .then(data => {
	                            if (region === 'us-east-1') {
	                                region = 'email';
	                            }
	                            callback(null, {
	                                envelope: {
	                                    from: envelope.from,
	                                    to: envelope.to
	                                },
	                                messageId: '<' + data.MessageId + (!/@/.test(data.MessageId) ? '@' + region + '.amazonses.com' : '') + '>',
	                                response: data.MessageId,
	                                raw
	                            });
	                        })
	                        .catch(err => {
	                            this.logger.error(
	                                {
	                                    err,
	                                    tnx: 'send'
	                                },
	                                'Send error for %s: %s',
	                                messageId,
	                                err.message
	                            );
	                            callback(err);
	                        });
	                });
	            })
	        );
	    }

	    /**
	     * Verifies SES configuration
	     *
	     * @param {Function} callback Callback function
	     */
	    verify(callback) {
	        let promise;
	        if (!callback) {
	            promise = new Promise((resolve, reject) => {
	                callback = shared.callbackPromise(resolve, reject);
	            });
	        }

	        const cb = err => {
	            if (err && !['InvalidParameterValue', 'MessageRejected'].includes(err.code || err.Code || err.name)) {
	                return callback(err);
	            }
	            return callback(null, true);
	        };

	        const sesMessage = {
	            Content: {
	                Raw: {
	                    Data: Buffer.from('From: <invalid@invalid>\r\nTo: <invalid@invalid>\r\n Subject: Invalid\r\n\r\nInvalid')
	                }
	            },
	            FromEmailAddress: 'invalid@invalid',
	            Destination: {
	                ToAddresses: ['invalid@invalid']
	            }
	        };

	        this.getRegion((err, region) => {

	            const command = new this.ses.SendEmailCommand(sesMessage);
	            const sendPromise = this.ses.sesClient.send(command);

	            sendPromise.then(data => cb(null)).catch(err => cb(err));
	        });

	        return promise;
	    }
	}

	sesTransport = SESTransport;
	return sesTransport;
}

var hasRequiredNodemailer;

function requireNodemailer () {
	if (hasRequiredNodemailer) return nodemailer;
	hasRequiredNodemailer = 1;

	const Mailer = requireMailer();
	const shared = requireShared();
	const SMTPPool = requireSmtpPool();
	const SMTPTransport = requireSmtpTransport();
	const SendmailTransport = requireSendmailTransport();
	const StreamTransport = requireStreamTransport();
	const JSONTransport = requireJsonTransport();
	const SESTransport = requireSesTransport();
	const nmfetch = requireFetch();
	const packageData = require$$9;

	const ETHEREAL_API = (process.env.ETHEREAL_API || 'https://api.nodemailer.com').replace(/\/+$/, '');
	const ETHEREAL_WEB = (process.env.ETHEREAL_WEB || 'https://ethereal.email').replace(/\/+$/, '');
	const ETHEREAL_API_KEY = (process.env.ETHEREAL_API_KEY || '').replace(/\s*/g, '') || null;
	const ETHEREAL_CACHE = ['true', 'yes', 'y', '1'].includes((process.env.ETHEREAL_CACHE || 'yes').toString().trim().toLowerCase());

	let testAccount = false;

	nodemailer.createTransport = function (transporter, defaults) {
	    let urlConfig;
	    let options;
	    let mailer;

	    if (
	        // provided transporter is a configuration object, not transporter plugin
	        (typeof transporter === 'object' && typeof transporter.send !== 'function') ||
	        // provided transporter looks like a connection url
	        (typeof transporter === 'string' && /^(smtps?|direct):/i.test(transporter))
	    ) {
	        if ((urlConfig = typeof transporter === 'string' ? transporter : transporter.url)) {
	            // parse a configuration URL into configuration options
	            options = shared.parseConnectionUrl(urlConfig);
	        } else {
	            options = transporter;
	        }

	        if (options.pool) {
	            transporter = new SMTPPool(options);
	        } else if (options.sendmail) {
	            transporter = new SendmailTransport(options);
	        } else if (options.streamTransport) {
	            transporter = new StreamTransport(options);
	        } else if (options.jsonTransport) {
	            transporter = new JSONTransport(options);
	        } else if (options.SES) {
	            if (options.SES.ses && options.SES.aws) {
	                let error = new Error(
	                    'Using legacy SES configuration, expecting @aws-sdk/client-sesv2, see https://nodemailer.com/transports/ses/'
	                );
	                error.code = 'LegacyConfig';
	                throw error;
	            }
	            transporter = new SESTransport(options);
	        } else {
	            transporter = new SMTPTransport(options);
	        }
	    }

	    mailer = new Mailer(transporter, options, defaults);

	    return mailer;
	};

	nodemailer.createTestAccount = function (apiUrl, callback) {
	    let promise;

	    if (!callback && typeof apiUrl === 'function') {
	        callback = apiUrl;
	        apiUrl = false;
	    }

	    if (!callback) {
	        promise = new Promise((resolve, reject) => {
	            callback = shared.callbackPromise(resolve, reject);
	        });
	    }

	    if (ETHEREAL_CACHE && testAccount) {
	        setImmediate(() => callback(null, testAccount));
	        return promise;
	    }

	    apiUrl = apiUrl || ETHEREAL_API;

	    let chunks = [];
	    let chunklen = 0;

	    let requestHeaders = {};
	    let requestBody = {
	        requestor: packageData.name,
	        version: packageData.version
	    };

	    if (ETHEREAL_API_KEY) {
	        requestHeaders.Authorization = 'Bearer ' + ETHEREAL_API_KEY;
	    }

	    let req = nmfetch(apiUrl + '/user', {
	        contentType: 'application/json',
	        method: 'POST',
	        headers: requestHeaders,
	        body: Buffer.from(JSON.stringify(requestBody))
	    });

	    req.on('readable', () => {
	        let chunk;
	        while ((chunk = req.read()) !== null) {
	            chunks.push(chunk);
	            chunklen += chunk.length;
	        }
	    });

	    req.once('error', err => callback(err));

	    req.once('end', () => {
	        let res = Buffer.concat(chunks, chunklen);
	        let data;
	        let err;
	        try {
	            data = JSON.parse(res.toString());
	        } catch (E) {
	            err = E;
	        }
	        if (err) {
	            return callback(err);
	        }
	        if (data.status !== 'success' || data.error) {
	            return callback(new Error(data.error || 'Request failed'));
	        }
	        delete data.status;
	        testAccount = data;
	        callback(null, testAccount);
	    });

	    return promise;
	};

	nodemailer.getTestMessageUrl = function (info) {
	    if (!info || !info.response) {
	        return false;
	    }

	    let infoProps = new Map();
	    info.response.replace(/\[([^\]]+)\]$/, (m, props) => {
	        props.replace(/\b([A-Z0-9]+)=([^\s]+)/g, (m, key, value) => {
	            infoProps.set(key, value);
	        });
	    });

	    if (infoProps.has('STATUS') && infoProps.has('MSGID')) {
	        return (testAccount.web || ETHEREAL_WEB) + '/message/' + infoProps.get('MSGID');
	    }

	    return false;
	};
	return nodemailer;
}

var nodemailerExports = requireNodemailer();
const _nodemailer = /*@__PURE__*/getDefaultExportFromCjs(nodemailerExports);

var build = {};

var socksclient = {};

var smartbuffer = {};

var utils = {};

var hasRequiredUtils;

function requireUtils () {
	if (hasRequiredUtils) return utils;
	hasRequiredUtils = 1;
	Object.defineProperty(utils, "__esModule", { value: true });
	const buffer_1 = require$$0$6;
	/**
	 * Error strings
	 */
	const ERRORS = {
	    INVALID_ENCODING: 'Invalid encoding provided. Please specify a valid encoding the internal Node.js Buffer supports.',
	    INVALID_SMARTBUFFER_SIZE: 'Invalid size provided. Size must be a valid integer greater than zero.',
	    INVALID_SMARTBUFFER_BUFFER: 'Invalid Buffer provided in SmartBufferOptions.',
	    INVALID_SMARTBUFFER_OBJECT: 'Invalid SmartBufferOptions object supplied to SmartBuffer constructor or factory methods.',
	    INVALID_OFFSET: 'An invalid offset value was provided.',
	    INVALID_OFFSET_NON_NUMBER: 'An invalid offset value was provided. A numeric value is required.',
	    INVALID_LENGTH: 'An invalid length value was provided.',
	    INVALID_LENGTH_NON_NUMBER: 'An invalid length value was provived. A numeric value is required.',
	    INVALID_TARGET_OFFSET: 'Target offset is beyond the bounds of the internal SmartBuffer data.',
	    INVALID_TARGET_LENGTH: 'Specified length value moves cursor beyong the bounds of the internal SmartBuffer data.',
	    INVALID_READ_BEYOND_BOUNDS: 'Attempted to read beyond the bounds of the managed data.',
	    INVALID_WRITE_BEYOND_BOUNDS: 'Attempted to write beyond the bounds of the managed data.'
	};
	utils.ERRORS = ERRORS;
	/**
	 * Checks if a given encoding is a valid Buffer encoding. (Throws an exception if check fails)
	 *
	 * @param { String } encoding The encoding string to check.
	 */
	function checkEncoding(encoding) {
	    if (!buffer_1.Buffer.isEncoding(encoding)) {
	        throw new Error(ERRORS.INVALID_ENCODING);
	    }
	}
	utils.checkEncoding = checkEncoding;
	/**
	 * Checks if a given number is a finite integer. (Throws an exception if check fails)
	 *
	 * @param { Number } value The number value to check.
	 */
	function isFiniteInteger(value) {
	    return typeof value === 'number' && isFinite(value) && isInteger(value);
	}
	utils.isFiniteInteger = isFiniteInteger;
	/**
	 * Checks if an offset/length value is valid. (Throws an exception if check fails)
	 *
	 * @param value The value to check.
	 * @param offset True if checking an offset, false if checking a length.
	 */
	function checkOffsetOrLengthValue(value, offset) {
	    if (typeof value === 'number') {
	        // Check for non finite/non integers
	        if (!isFiniteInteger(value) || value < 0) {
	            throw new Error(offset ? ERRORS.INVALID_OFFSET : ERRORS.INVALID_LENGTH);
	        }
	    }
	    else {
	        throw new Error(offset ? ERRORS.INVALID_OFFSET_NON_NUMBER : ERRORS.INVALID_LENGTH_NON_NUMBER);
	    }
	}
	/**
	 * Checks if a length value is valid. (Throws an exception if check fails)
	 *
	 * @param { Number } length The value to check.
	 */
	function checkLengthValue(length) {
	    checkOffsetOrLengthValue(length, false);
	}
	utils.checkLengthValue = checkLengthValue;
	/**
	 * Checks if a offset value is valid. (Throws an exception if check fails)
	 *
	 * @param { Number } offset The value to check.
	 */
	function checkOffsetValue(offset) {
	    checkOffsetOrLengthValue(offset, true);
	}
	utils.checkOffsetValue = checkOffsetValue;
	/**
	 * Checks if a target offset value is out of bounds. (Throws an exception if check fails)
	 *
	 * @param { Number } offset The offset value to check.
	 * @param { SmartBuffer } buff The SmartBuffer instance to check against.
	 */
	function checkTargetOffset(offset, buff) {
	    if (offset < 0 || offset > buff.length) {
	        throw new Error(ERRORS.INVALID_TARGET_OFFSET);
	    }
	}
	utils.checkTargetOffset = checkTargetOffset;
	/**
	 * Determines whether a given number is a integer.
	 * @param value The number to check.
	 */
	function isInteger(value) {
	    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
	}
	/**
	 * Throws if Node.js version is too low to support bigint
	 */
	function bigIntAndBufferInt64Check(bufferMethod) {
	    if (typeof BigInt === 'undefined') {
	        throw new Error('Platform does not support JS BigInt type.');
	    }
	    if (typeof buffer_1.Buffer.prototype[bufferMethod] === 'undefined') {
	        throw new Error(`Platform does not support Buffer.prototype.${bufferMethod}.`);
	    }
	}
	utils.bigIntAndBufferInt64Check = bigIntAndBufferInt64Check;
	
	return utils;
}

var hasRequiredSmartbuffer;

function requireSmartbuffer () {
	if (hasRequiredSmartbuffer) return smartbuffer;
	hasRequiredSmartbuffer = 1;
	Object.defineProperty(smartbuffer, "__esModule", { value: true });
	const utils_1 = requireUtils();
	// The default Buffer size if one is not provided.
	const DEFAULT_SMARTBUFFER_SIZE = 4096;
	// The default string encoding to use for reading/writing strings.
	const DEFAULT_SMARTBUFFER_ENCODING = 'utf8';
	class SmartBuffer {
	    /**
	     * Creates a new SmartBuffer instance.
	     *
	     * @param options { SmartBufferOptions } The SmartBufferOptions to apply to this instance.
	     */
	    constructor(options) {
	        this.length = 0;
	        this._encoding = DEFAULT_SMARTBUFFER_ENCODING;
	        this._writeOffset = 0;
	        this._readOffset = 0;
	        if (SmartBuffer.isSmartBufferOptions(options)) {
	            // Checks for encoding
	            if (options.encoding) {
	                utils_1.checkEncoding(options.encoding);
	                this._encoding = options.encoding;
	            }
	            // Checks for initial size length
	            if (options.size) {
	                if (utils_1.isFiniteInteger(options.size) && options.size > 0) {
	                    this._buff = Buffer.allocUnsafe(options.size);
	                }
	                else {
	                    throw new Error(utils_1.ERRORS.INVALID_SMARTBUFFER_SIZE);
	                }
	                // Check for initial Buffer
	            }
	            else if (options.buff) {
	                if (Buffer.isBuffer(options.buff)) {
	                    this._buff = options.buff;
	                    this.length = options.buff.length;
	                }
	                else {
	                    throw new Error(utils_1.ERRORS.INVALID_SMARTBUFFER_BUFFER);
	                }
	            }
	            else {
	                this._buff = Buffer.allocUnsafe(DEFAULT_SMARTBUFFER_SIZE);
	            }
	        }
	        else {
	            // If something was passed but it's not a SmartBufferOptions object
	            if (typeof options !== 'undefined') {
	                throw new Error(utils_1.ERRORS.INVALID_SMARTBUFFER_OBJECT);
	            }
	            // Otherwise default to sane options
	            this._buff = Buffer.allocUnsafe(DEFAULT_SMARTBUFFER_SIZE);
	        }
	    }
	    /**
	     * Creates a new SmartBuffer instance with the provided internal Buffer size and optional encoding.
	     *
	     * @param size { Number } The size of the internal Buffer.
	     * @param encoding { String } The BufferEncoding to use for strings.
	     *
	     * @return { SmartBuffer }
	     */
	    static fromSize(size, encoding) {
	        return new this({
	            size: size,
	            encoding: encoding
	        });
	    }
	    /**
	     * Creates a new SmartBuffer instance with the provided Buffer and optional encoding.
	     *
	     * @param buffer { Buffer } The Buffer to use as the internal Buffer value.
	     * @param encoding { String } The BufferEncoding to use for strings.
	     *
	     * @return { SmartBuffer }
	     */
	    static fromBuffer(buff, encoding) {
	        return new this({
	            buff: buff,
	            encoding: encoding
	        });
	    }
	    /**
	     * Creates a new SmartBuffer instance with the provided SmartBufferOptions options.
	     *
	     * @param options { SmartBufferOptions } The options to use when creating the SmartBuffer instance.
	     */
	    static fromOptions(options) {
	        return new this(options);
	    }
	    /**
	     * Type checking function that determines if an object is a SmartBufferOptions object.
	     */
	    static isSmartBufferOptions(options) {
	        const castOptions = options;
	        return (castOptions &&
	            (castOptions.encoding !== undefined || castOptions.size !== undefined || castOptions.buff !== undefined));
	    }
	    // Signed integers
	    /**
	     * Reads an Int8 value from the current read position or an optionally provided offset.
	     *
	     * @param offset { Number } The offset to read data from (optional)
	     * @return { Number }
	     */
	    readInt8(offset) {
	        return this._readNumberValue(Buffer.prototype.readInt8, 1, offset);
	    }
	    /**
	     * Reads an Int16BE value from the current read position or an optionally provided offset.
	     *
	     * @param offset { Number } The offset to read data from (optional)
	     * @return { Number }
	     */
	    readInt16BE(offset) {
	        return this._readNumberValue(Buffer.prototype.readInt16BE, 2, offset);
	    }
	    /**
	     * Reads an Int16LE value from the current read position or an optionally provided offset.
	     *
	     * @param offset { Number } The offset to read data from (optional)
	     * @return { Number }
	     */
	    readInt16LE(offset) {
	        return this._readNumberValue(Buffer.prototype.readInt16LE, 2, offset);
	    }
	    /**
	     * Reads an Int32BE value from the current read position or an optionally provided offset.
	     *
	     * @param offset { Number } The offset to read data from (optional)
	     * @return { Number }
	     */
	    readInt32BE(offset) {
	        return this._readNumberValue(Buffer.prototype.readInt32BE, 4, offset);
	    }
	    /**
	     * Reads an Int32LE value from the current read position or an optionally provided offset.
	     *
	     * @param offset { Number } The offset to read data from (optional)
	     * @return { Number }
	     */
	    readInt32LE(offset) {
	        return this._readNumberValue(Buffer.prototype.readInt32LE, 4, offset);
	    }
	    /**
	     * Reads a BigInt64BE value from the current read position or an optionally provided offset.
	     *
	     * @param offset { Number } The offset to read data from (optional)
	     * @return { BigInt }
	     */
	    readBigInt64BE(offset) {
	        utils_1.bigIntAndBufferInt64Check('readBigInt64BE');
	        return this._readNumberValue(Buffer.prototype.readBigInt64BE, 8, offset);
	    }
	    /**
	     * Reads a BigInt64LE value from the current read position or an optionally provided offset.
	     *
	     * @param offset { Number } The offset to read data from (optional)
	     * @return { BigInt }
	     */
	    readBigInt64LE(offset) {
	        utils_1.bigIntAndBufferInt64Check('readBigInt64LE');
	        return this._readNumberValue(Buffer.prototype.readBigInt64LE, 8, offset);
	    }
	    /**
	     * Writes an Int8 value to the current write position (or at optional offset).
	     *
	     * @param value { Number } The value to write.
	     * @param offset { Number } The offset to write the value at.
	     *
	     * @return this
	     */
	    writeInt8(value, offset) {
	        this._writeNumberValue(Buffer.prototype.writeInt8, 1, value, offset);
	        return this;
	    }
	    /**
	     * Inserts an Int8 value at the given offset value.
	     *
	     * @param value { Number } The value to insert.
	     * @param offset { Number } The offset to insert the value at.
	     *
	     * @return this
	     */
	    insertInt8(value, offset) {
	        return this._insertNumberValue(Buffer.prototype.writeInt8, 1, value, offset);
	    }
	    /**
	     * Writes an Int16BE value to the current write position (or at optional offset).
	     *
	     * @param value { Number } The value to write.
	     * @param offset { Number } The offset to write the value at.
	     *
	     * @return this
	     */
	    writeInt16BE(value, offset) {
	        return this._writeNumberValue(Buffer.prototype.writeInt16BE, 2, value, offset);
	    }
	    /**
	     * Inserts an Int16BE value at the given offset value.
	     *
	     * @param value { Number } The value to insert.
	     * @param offset { Number } The offset to insert the value at.
	     *
	     * @return this
	     */
	    insertInt16BE(value, offset) {
	        return this._insertNumberValue(Buffer.prototype.writeInt16BE, 2, value, offset);
	    }
	    /**
	     * Writes an Int16LE value to the current write position (or at optional offset).
	     *
	     * @param value { Number } The value to write.
	     * @param offset { Number } The offset to write the value at.
	     *
	     * @return this
	     */
	    writeInt16LE(value, offset) {
	        return this._writeNumberValue(Buffer.prototype.writeInt16LE, 2, value, offset);
	    }
	    /**
	     * Inserts an Int16LE value at the given offset value.
	     *
	     * @param value { Number } The value to insert.
	     * @param offset { Number } The offset to insert the value at.
	     *
	     * @return this
	     */
	    insertInt16LE(value, offset) {
	        return this._insertNumberValue(Buffer.prototype.writeInt16LE, 2, value, offset);
	    }
	    /**
	     * Writes an Int32BE value to the current write position (or at optional offset).
	     *
	     * @param value { Number } The value to write.
	     * @param offset { Number } The offset to write the value at.
	     *
	     * @return this
	     */
	    writeInt32BE(value, offset) {
	        return this._writeNumberValue(Buffer.prototype.writeInt32BE, 4, value, offset);
	    }
	    /**
	     * Inserts an Int32BE value at the given offset value.
	     *
	     * @param value { Number } The value to insert.
	     * @param offset { Number } The offset to insert the value at.
	     *
	     * @return this
	     */
	    insertInt32BE(value, offset) {
	        return this._insertNumberValue(Buffer.prototype.writeInt32BE, 4, value, offset);
	    }
	    /**
	     * Writes an Int32LE value to the current write position (or at optional offset).
	     *
	     * @param value { Number } The value to write.
	     * @param offset { Number } The offset to write the value at.
	     *
	     * @return this
	     */
	    writeInt32LE(value, offset) {
	        return this._writeNumberValue(Buffer.prototype.writeInt32LE, 4, value, offset);
	    }
	    /**
	     * Inserts an Int32LE value at the given offset value.
	     *
	     * @param value { Number } The value to insert.
	     * @param offset { Number } The offset to insert the value at.
	     *
	     * @return this
	     */
	    insertInt32LE(value, offset) {
	        return this._insertNumberValue(Buffer.prototype.writeInt32LE, 4, value, offset);
	    }
	    /**
	     * Writes a BigInt64BE value to the current write position (or at optional offset).
	     *
	     * @param value { BigInt } The value to write.
	     * @param offset { Number } The offset to write the value at.
	     *
	     * @return this
	     */
	    writeBigInt64BE(value, offset) {
	        utils_1.bigIntAndBufferInt64Check('writeBigInt64BE');
	        return this._writeNumberValue(Buffer.prototype.writeBigInt64BE, 8, value, offset);
	    }
	    /**
	     * Inserts a BigInt64BE value at the given offset value.
	     *
	     * @param value { BigInt } The value to insert.
	     * @param offset { Number } The offset to insert the value at.
	     *
	     * @return this
	     */
	    insertBigInt64BE(value, offset) {
	        utils_1.bigIntAndBufferInt64Check('writeBigInt64BE');
	        return this._insertNumberValue(Buffer.prototype.writeBigInt64BE, 8, value, offset);
	    }
	    /**
	     * Writes a BigInt64LE value to the current write position (or at optional offset).
	     *
	     * @param value { BigInt } The value to write.
	     * @param offset { Number } The offset to write the value at.
	     *
	     * @return this
	     */
	    writeBigInt64LE(value, offset) {
	        utils_1.bigIntAndBufferInt64Check('writeBigInt64LE');
	        return this._writeNumberValue(Buffer.prototype.writeBigInt64LE, 8, value, offset);
	    }
	    /**
	     * Inserts a Int64LE value at the given offset value.
	     *
	     * @param value { BigInt } The value to insert.
	     * @param offset { Number } The offset to insert the value at.
	     *
	     * @return this
	     */
	    insertBigInt64LE(value, offset) {
	        utils_1.bigIntAndBufferInt64Check('writeBigInt64LE');
	        return this._insertNumberValue(Buffer.prototype.writeBigInt64LE, 8, value, offset);
	    }
	    // Unsigned Integers
	    /**
	     * Reads an UInt8 value from the current read position or an optionally provided offset.
	     *
	     * @param offset { Number } The offset to read data from (optional)
	     * @return { Number }
	     */
	    readUInt8(offset) {
	        return this._readNumberValue(Buffer.prototype.readUInt8, 1, offset);
	    }
	    /**
	     * Reads an UInt16BE value from the current read position or an optionally provided offset.
	     *
	     * @param offset { Number } The offset to read data from (optional)
	     * @return { Number }
	     */
	    readUInt16BE(offset) {
	        return this._readNumberValue(Buffer.prototype.readUInt16BE, 2, offset);
	    }
	    /**
	     * Reads an UInt16LE value from the current read position or an optionally provided offset.
	     *
	     * @param offset { Number } The offset to read data from (optional)
	     * @return { Number }
	     */
	    readUInt16LE(offset) {
	        return this._readNumberValue(Buffer.prototype.readUInt16LE, 2, offset);
	    }
	    /**
	     * Reads an UInt32BE value from the current read position or an optionally provided offset.
	     *
	     * @param offset { Number } The offset to read data from (optional)
	     * @return { Number }
	     */
	    readUInt32BE(offset) {
	        return this._readNumberValue(Buffer.prototype.readUInt32BE, 4, offset);
	    }
	    /**
	     * Reads an UInt32LE value from the current read position or an optionally provided offset.
	     *
	     * @param offset { Number } The offset to read data from (optional)
	     * @return { Number }
	     */
	    readUInt32LE(offset) {
	        return this._readNumberValue(Buffer.prototype.readUInt32LE, 4, offset);
	    }
	    /**
	     * Reads a BigUInt64BE value from the current read position or an optionally provided offset.
	     *
	     * @param offset { Number } The offset to read data from (optional)
	     * @return { BigInt }
	     */
	    readBigUInt64BE(offset) {
	        utils_1.bigIntAndBufferInt64Check('readBigUInt64BE');
	        return this._readNumberValue(Buffer.prototype.readBigUInt64BE, 8, offset);
	    }
	    /**
	     * Reads a BigUInt64LE value from the current read position or an optionally provided offset.
	     *
	     * @param offset { Number } The offset to read data from (optional)
	     * @return { BigInt }
	     */
	    readBigUInt64LE(offset) {
	        utils_1.bigIntAndBufferInt64Check('readBigUInt64LE');
	        return this._readNumberValue(Buffer.prototype.readBigUInt64LE, 8, offset);
	    }
	    /**
	     * Writes an UInt8 value to the current write position (or at optional offset).
	     *
	     * @param value { Number } The value to write.
	     * @param offset { Number } The offset to write the value at.
	     *
	     * @return this
	     */
	    writeUInt8(value, offset) {
	        return this._writeNumberValue(Buffer.prototype.writeUInt8, 1, value, offset);
	    }
	    /**
	     * Inserts an UInt8 value at the given offset value.
	     *
	     * @param value { Number } The value to insert.
	     * @param offset { Number } The offset to insert the value at.
	     *
	     * @return this
	     */
	    insertUInt8(value, offset) {
	        return this._insertNumberValue(Buffer.prototype.writeUInt8, 1, value, offset);
	    }
	    /**
	     * Writes an UInt16BE value to the current write position (or at optional offset).
	     *
	     * @param value { Number } The value to write.
	     * @param offset { Number } The offset to write the value at.
	     *
	     * @return this
	     */
	    writeUInt16BE(value, offset) {
	        return this._writeNumberValue(Buffer.prototype.writeUInt16BE, 2, value, offset);
	    }
	    /**
	     * Inserts an UInt16BE value at the given offset value.
	     *
	     * @param value { Number } The value to insert.
	     * @param offset { Number } The offset to insert the value at.
	     *
	     * @return this
	     */
	    insertUInt16BE(value, offset) {
	        return this._insertNumberValue(Buffer.prototype.writeUInt16BE, 2, value, offset);
	    }
	    /**
	     * Writes an UInt16LE value to the current write position (or at optional offset).
	     *
	     * @param value { Number } The value to write.
	     * @param offset { Number } The offset to write the value at.
	     *
	     * @return this
	     */
	    writeUInt16LE(value, offset) {
	        return this._writeNumberValue(Buffer.prototype.writeUInt16LE, 2, value, offset);
	    }
	    /**
	     * Inserts an UInt16LE value at the given offset value.
	     *
	     * @param value { Number } The value to insert.
	     * @param offset { Number } The offset to insert the value at.
	     *
	     * @return this
	     */
	    insertUInt16LE(value, offset) {
	        return this._insertNumberValue(Buffer.prototype.writeUInt16LE, 2, value, offset);
	    }
	    /**
	     * Writes an UInt32BE value to the current write position (or at optional offset).
	     *
	     * @param value { Number } The value to write.
	     * @param offset { Number } The offset to write the value at.
	     *
	     * @return this
	     */
	    writeUInt32BE(value, offset) {
	        return this._writeNumberValue(Buffer.prototype.writeUInt32BE, 4, value, offset);
	    }
	    /**
	     * Inserts an UInt32BE value at the given offset value.
	     *
	     * @param value { Number } The value to insert.
	     * @param offset { Number } The offset to insert the value at.
	     *
	     * @return this
	     */
	    insertUInt32BE(value, offset) {
	        return this._insertNumberValue(Buffer.prototype.writeUInt32BE, 4, value, offset);
	    }
	    /**
	     * Writes an UInt32LE value to the current write position (or at optional offset).
	     *
	     * @param value { Number } The value to write.
	     * @param offset { Number } The offset to write the value at.
	     *
	     * @return this
	     */
	    writeUInt32LE(value, offset) {
	        return this._writeNumberValue(Buffer.prototype.writeUInt32LE, 4, value, offset);
	    }
	    /**
	     * Inserts an UInt32LE value at the given offset value.
	     *
	     * @param value { Number } The value to insert.
	     * @param offset { Number } The offset to insert the value at.
	     *
	     * @return this
	     */
	    insertUInt32LE(value, offset) {
	        return this._insertNumberValue(Buffer.prototype.writeUInt32LE, 4, value, offset);
	    }
	    /**
	     * Writes a BigUInt64BE value to the current write position (or at optional offset).
	     *
	     * @param value { Number } The value to write.
	     * @param offset { Number } The offset to write the value at.
	     *
	     * @return this
	     */
	    writeBigUInt64BE(value, offset) {
	        utils_1.bigIntAndBufferInt64Check('writeBigUInt64BE');
	        return this._writeNumberValue(Buffer.prototype.writeBigUInt64BE, 8, value, offset);
	    }
	    /**
	     * Inserts a BigUInt64BE value at the given offset value.
	     *
	     * @param value { Number } The value to insert.
	     * @param offset { Number } The offset to insert the value at.
	     *
	     * @return this
	     */
	    insertBigUInt64BE(value, offset) {
	        utils_1.bigIntAndBufferInt64Check('writeBigUInt64BE');
	        return this._insertNumberValue(Buffer.prototype.writeBigUInt64BE, 8, value, offset);
	    }
	    /**
	     * Writes a BigUInt64LE value to the current write position (or at optional offset).
	     *
	     * @param value { Number } The value to write.
	     * @param offset { Number } The offset to write the value at.
	     *
	     * @return this
	     */
	    writeBigUInt64LE(value, offset) {
	        utils_1.bigIntAndBufferInt64Check('writeBigUInt64LE');
	        return this._writeNumberValue(Buffer.prototype.writeBigUInt64LE, 8, value, offset);
	    }
	    /**
	     * Inserts a BigUInt64LE value at the given offset value.
	     *
	     * @param value { Number } The value to insert.
	     * @param offset { Number } The offset to insert the value at.
	     *
	     * @return this
	     */
	    insertBigUInt64LE(value, offset) {
	        utils_1.bigIntAndBufferInt64Check('writeBigUInt64LE');
	        return this._insertNumberValue(Buffer.prototype.writeBigUInt64LE, 8, value, offset);
	    }
	    // Floating Point
	    /**
	     * Reads an FloatBE value from the current read position or an optionally provided offset.
	     *
	     * @param offset { Number } The offset to read data from (optional)
	     * @return { Number }
	     */
	    readFloatBE(offset) {
	        return this._readNumberValue(Buffer.prototype.readFloatBE, 4, offset);
	    }
	    /**
	     * Reads an FloatLE value from the current read position or an optionally provided offset.
	     *
	     * @param offset { Number } The offset to read data from (optional)
	     * @return { Number }
	     */
	    readFloatLE(offset) {
	        return this._readNumberValue(Buffer.prototype.readFloatLE, 4, offset);
	    }
	    /**
	     * Writes a FloatBE value to the current write position (or at optional offset).
	     *
	     * @param value { Number } The value to write.
	     * @param offset { Number } The offset to write the value at.
	     *
	     * @return this
	     */
	    writeFloatBE(value, offset) {
	        return this._writeNumberValue(Buffer.prototype.writeFloatBE, 4, value, offset);
	    }
	    /**
	     * Inserts a FloatBE value at the given offset value.
	     *
	     * @param value { Number } The value to insert.
	     * @param offset { Number } The offset to insert the value at.
	     *
	     * @return this
	     */
	    insertFloatBE(value, offset) {
	        return this._insertNumberValue(Buffer.prototype.writeFloatBE, 4, value, offset);
	    }
	    /**
	     * Writes a FloatLE value to the current write position (or at optional offset).
	     *
	     * @param value { Number } The value to write.
	     * @param offset { Number } The offset to write the value at.
	     *
	     * @return this
	     */
	    writeFloatLE(value, offset) {
	        return this._writeNumberValue(Buffer.prototype.writeFloatLE, 4, value, offset);
	    }
	    /**
	     * Inserts a FloatLE value at the given offset value.
	     *
	     * @param value { Number } The value to insert.
	     * @param offset { Number } The offset to insert the value at.
	     *
	     * @return this
	     */
	    insertFloatLE(value, offset) {
	        return this._insertNumberValue(Buffer.prototype.writeFloatLE, 4, value, offset);
	    }
	    // Double Floating Point
	    /**
	     * Reads an DoublEBE value from the current read position or an optionally provided offset.
	     *
	     * @param offset { Number } The offset to read data from (optional)
	     * @return { Number }
	     */
	    readDoubleBE(offset) {
	        return this._readNumberValue(Buffer.prototype.readDoubleBE, 8, offset);
	    }
	    /**
	     * Reads an DoubleLE value from the current read position or an optionally provided offset.
	     *
	     * @param offset { Number } The offset to read data from (optional)
	     * @return { Number }
	     */
	    readDoubleLE(offset) {
	        return this._readNumberValue(Buffer.prototype.readDoubleLE, 8, offset);
	    }
	    /**
	     * Writes a DoubleBE value to the current write position (or at optional offset).
	     *
	     * @param value { Number } The value to write.
	     * @param offset { Number } The offset to write the value at.
	     *
	     * @return this
	     */
	    writeDoubleBE(value, offset) {
	        return this._writeNumberValue(Buffer.prototype.writeDoubleBE, 8, value, offset);
	    }
	    /**
	     * Inserts a DoubleBE value at the given offset value.
	     *
	     * @param value { Number } The value to insert.
	     * @param offset { Number } The offset to insert the value at.
	     *
	     * @return this
	     */
	    insertDoubleBE(value, offset) {
	        return this._insertNumberValue(Buffer.prototype.writeDoubleBE, 8, value, offset);
	    }
	    /**
	     * Writes a DoubleLE value to the current write position (or at optional offset).
	     *
	     * @param value { Number } The value to write.
	     * @param offset { Number } The offset to write the value at.
	     *
	     * @return this
	     */
	    writeDoubleLE(value, offset) {
	        return this._writeNumberValue(Buffer.prototype.writeDoubleLE, 8, value, offset);
	    }
	    /**
	     * Inserts a DoubleLE value at the given offset value.
	     *
	     * @param value { Number } The value to insert.
	     * @param offset { Number } The offset to insert the value at.
	     *
	     * @return this
	     */
	    insertDoubleLE(value, offset) {
	        return this._insertNumberValue(Buffer.prototype.writeDoubleLE, 8, value, offset);
	    }
	    // Strings
	    /**
	     * Reads a String from the current read position.
	     *
	     * @param arg1 { Number | String } The number of bytes to read as a String, or the BufferEncoding to use for
	     *             the string (Defaults to instance level encoding).
	     * @param encoding { String } The BufferEncoding to use for the string (Defaults to instance level encoding).
	     *
	     * @return { String }
	     */
	    readString(arg1, encoding) {
	        let lengthVal;
	        // Length provided
	        if (typeof arg1 === 'number') {
	            utils_1.checkLengthValue(arg1);
	            lengthVal = Math.min(arg1, this.length - this._readOffset);
	        }
	        else {
	            encoding = arg1;
	            lengthVal = this.length - this._readOffset;
	        }
	        // Check encoding
	        if (typeof encoding !== 'undefined') {
	            utils_1.checkEncoding(encoding);
	        }
	        const value = this._buff.slice(this._readOffset, this._readOffset + lengthVal).toString(encoding || this._encoding);
	        this._readOffset += lengthVal;
	        return value;
	    }
	    /**
	     * Inserts a String
	     *
	     * @param value { String } The String value to insert.
	     * @param offset { Number } The offset to insert the string at.
	     * @param encoding { String } The BufferEncoding to use for writing strings (defaults to instance encoding).
	     *
	     * @return this
	     */
	    insertString(value, offset, encoding) {
	        utils_1.checkOffsetValue(offset);
	        return this._handleString(value, true, offset, encoding);
	    }
	    /**
	     * Writes a String
	     *
	     * @param value { String } The String value to write.
	     * @param arg2 { Number | String } The offset to write the string at, or the BufferEncoding to use.
	     * @param encoding { String } The BufferEncoding to use for writing strings (defaults to instance encoding).
	     *
	     * @return this
	     */
	    writeString(value, arg2, encoding) {
	        return this._handleString(value, false, arg2, encoding);
	    }
	    /**
	     * Reads a null-terminated String from the current read position.
	     *
	     * @param encoding { String } The BufferEncoding to use for the string (Defaults to instance level encoding).
	     *
	     * @return { String }
	     */
	    readStringNT(encoding) {
	        if (typeof encoding !== 'undefined') {
	            utils_1.checkEncoding(encoding);
	        }
	        // Set null character position to the end SmartBuffer instance.
	        let nullPos = this.length;
	        // Find next null character (if one is not found, default from above is used)
	        for (let i = this._readOffset; i < this.length; i++) {
	            if (this._buff[i] === 0x00) {
	                nullPos = i;
	                break;
	            }
	        }
	        // Read string value
	        const value = this._buff.slice(this._readOffset, nullPos);
	        // Increment internal Buffer read offset
	        this._readOffset = nullPos + 1;
	        return value.toString(encoding || this._encoding);
	    }
	    /**
	     * Inserts a null-terminated String.
	     *
	     * @param value { String } The String value to write.
	     * @param arg2 { Number | String } The offset to write the string to, or the BufferEncoding to use.
	     * @param encoding { String } The BufferEncoding to use for writing strings (defaults to instance encoding).
	     *
	     * @return this
	     */
	    insertStringNT(value, offset, encoding) {
	        utils_1.checkOffsetValue(offset);
	        // Write Values
	        this.insertString(value, offset, encoding);
	        this.insertUInt8(0x00, offset + value.length);
	        return this;
	    }
	    /**
	     * Writes a null-terminated String.
	     *
	     * @param value { String } The String value to write.
	     * @param arg2 { Number | String } The offset to write the string to, or the BufferEncoding to use.
	     * @param encoding { String } The BufferEncoding to use for writing strings (defaults to instance encoding).
	     *
	     * @return this
	     */
	    writeStringNT(value, arg2, encoding) {
	        // Write Values
	        this.writeString(value, arg2, encoding);
	        this.writeUInt8(0x00, typeof arg2 === 'number' ? arg2 + value.length : this.writeOffset);
	        return this;
	    }
	    // Buffers
	    /**
	     * Reads a Buffer from the internal read position.
	     *
	     * @param length { Number } The length of data to read as a Buffer.
	     *
	     * @return { Buffer }
	     */
	    readBuffer(length) {
	        if (typeof length !== 'undefined') {
	            utils_1.checkLengthValue(length);
	        }
	        const lengthVal = typeof length === 'number' ? length : this.length;
	        const endPoint = Math.min(this.length, this._readOffset + lengthVal);
	        // Read buffer value
	        const value = this._buff.slice(this._readOffset, endPoint);
	        // Increment internal Buffer read offset
	        this._readOffset = endPoint;
	        return value;
	    }
	    /**
	     * Writes a Buffer to the current write position.
	     *
	     * @param value { Buffer } The Buffer to write.
	     * @param offset { Number } The offset to write the Buffer to.
	     *
	     * @return this
	     */
	    insertBuffer(value, offset) {
	        utils_1.checkOffsetValue(offset);
	        return this._handleBuffer(value, true, offset);
	    }
	    /**
	     * Writes a Buffer to the current write position.
	     *
	     * @param value { Buffer } The Buffer to write.
	     * @param offset { Number } The offset to write the Buffer to.
	     *
	     * @return this
	     */
	    writeBuffer(value, offset) {
	        return this._handleBuffer(value, false, offset);
	    }
	    /**
	     * Reads a null-terminated Buffer from the current read poisiton.
	     *
	     * @return { Buffer }
	     */
	    readBufferNT() {
	        // Set null character position to the end SmartBuffer instance.
	        let nullPos = this.length;
	        // Find next null character (if one is not found, default from above is used)
	        for (let i = this._readOffset; i < this.length; i++) {
	            if (this._buff[i] === 0x00) {
	                nullPos = i;
	                break;
	            }
	        }
	        // Read value
	        const value = this._buff.slice(this._readOffset, nullPos);
	        // Increment internal Buffer read offset
	        this._readOffset = nullPos + 1;
	        return value;
	    }
	    /**
	     * Inserts a null-terminated Buffer.
	     *
	     * @param value { Buffer } The Buffer to write.
	     * @param offset { Number } The offset to write the Buffer to.
	     *
	     * @return this
	     */
	    insertBufferNT(value, offset) {
	        utils_1.checkOffsetValue(offset);
	        // Write Values
	        this.insertBuffer(value, offset);
	        this.insertUInt8(0x00, offset + value.length);
	        return this;
	    }
	    /**
	     * Writes a null-terminated Buffer.
	     *
	     * @param value { Buffer } The Buffer to write.
	     * @param offset { Number } The offset to write the Buffer to.
	     *
	     * @return this
	     */
	    writeBufferNT(value, offset) {
	        // Checks for valid numberic value;
	        if (typeof offset !== 'undefined') {
	            utils_1.checkOffsetValue(offset);
	        }
	        // Write Values
	        this.writeBuffer(value, offset);
	        this.writeUInt8(0x00, typeof offset === 'number' ? offset + value.length : this._writeOffset);
	        return this;
	    }
	    /**
	     * Clears the SmartBuffer instance to its original empty state.
	     */
	    clear() {
	        this._writeOffset = 0;
	        this._readOffset = 0;
	        this.length = 0;
	        return this;
	    }
	    /**
	     * Gets the remaining data left to be read from the SmartBuffer instance.
	     *
	     * @return { Number }
	     */
	    remaining() {
	        return this.length - this._readOffset;
	    }
	    /**
	     * Gets the current read offset value of the SmartBuffer instance.
	     *
	     * @return { Number }
	     */
	    get readOffset() {
	        return this._readOffset;
	    }
	    /**
	     * Sets the read offset value of the SmartBuffer instance.
	     *
	     * @param offset { Number } - The offset value to set.
	     */
	    set readOffset(offset) {
	        utils_1.checkOffsetValue(offset);
	        // Check for bounds.
	        utils_1.checkTargetOffset(offset, this);
	        this._readOffset = offset;
	    }
	    /**
	     * Gets the current write offset value of the SmartBuffer instance.
	     *
	     * @return { Number }
	     */
	    get writeOffset() {
	        return this._writeOffset;
	    }
	    /**
	     * Sets the write offset value of the SmartBuffer instance.
	     *
	     * @param offset { Number } - The offset value to set.
	     */
	    set writeOffset(offset) {
	        utils_1.checkOffsetValue(offset);
	        // Check for bounds.
	        utils_1.checkTargetOffset(offset, this);
	        this._writeOffset = offset;
	    }
	    /**
	     * Gets the currently set string encoding of the SmartBuffer instance.
	     *
	     * @return { BufferEncoding } The string Buffer encoding currently set.
	     */
	    get encoding() {
	        return this._encoding;
	    }
	    /**
	     * Sets the string encoding of the SmartBuffer instance.
	     *
	     * @param encoding { BufferEncoding } The string Buffer encoding to set.
	     */
	    set encoding(encoding) {
	        utils_1.checkEncoding(encoding);
	        this._encoding = encoding;
	    }
	    /**
	     * Gets the underlying internal Buffer. (This includes unmanaged data in the Buffer)
	     *
	     * @return { Buffer } The Buffer value.
	     */
	    get internalBuffer() {
	        return this._buff;
	    }
	    /**
	     * Gets the value of the internal managed Buffer (Includes managed data only)
	     *
	     * @param { Buffer }
	     */
	    toBuffer() {
	        return this._buff.slice(0, this.length);
	    }
	    /**
	     * Gets the String value of the internal managed Buffer
	     *
	     * @param encoding { String } The BufferEncoding to display the Buffer as (defaults to instance level encoding).
	     */
	    toString(encoding) {
	        const encodingVal = typeof encoding === 'string' ? encoding : this._encoding;
	        // Check for invalid encoding.
	        utils_1.checkEncoding(encodingVal);
	        return this._buff.toString(encodingVal, 0, this.length);
	    }
	    /**
	     * Destroys the SmartBuffer instance.
	     */
	    destroy() {
	        this.clear();
	        return this;
	    }
	    /**
	     * Handles inserting and writing strings.
	     *
	     * @param value { String } The String value to insert.
	     * @param isInsert { Boolean } True if inserting a string, false if writing.
	     * @param arg2 { Number | String } The offset to insert the string at, or the BufferEncoding to use.
	     * @param encoding { String } The BufferEncoding to use for writing strings (defaults to instance encoding).
	     */
	    _handleString(value, isInsert, arg3, encoding) {
	        let offsetVal = this._writeOffset;
	        let encodingVal = this._encoding;
	        // Check for offset
	        if (typeof arg3 === 'number') {
	            offsetVal = arg3;
	            // Check for encoding
	        }
	        else if (typeof arg3 === 'string') {
	            utils_1.checkEncoding(arg3);
	            encodingVal = arg3;
	        }
	        // Check for encoding (third param)
	        if (typeof encoding === 'string') {
	            utils_1.checkEncoding(encoding);
	            encodingVal = encoding;
	        }
	        // Calculate bytelength of string.
	        const byteLength = Buffer.byteLength(value, encodingVal);
	        // Ensure there is enough internal Buffer capacity.
	        if (isInsert) {
	            this.ensureInsertable(byteLength, offsetVal);
	        }
	        else {
	            this._ensureWriteable(byteLength, offsetVal);
	        }
	        // Write value
	        this._buff.write(value, offsetVal, byteLength, encodingVal);
	        // Increment internal Buffer write offset;
	        if (isInsert) {
	            this._writeOffset += byteLength;
	        }
	        else {
	            // If an offset was given, check to see if we wrote beyond the current writeOffset.
	            if (typeof arg3 === 'number') {
	                this._writeOffset = Math.max(this._writeOffset, offsetVal + byteLength);
	            }
	            else {
	                // If no offset was given, we wrote to the end of the SmartBuffer so increment writeOffset.
	                this._writeOffset += byteLength;
	            }
	        }
	        return this;
	    }
	    /**
	     * Handles writing or insert of a Buffer.
	     *
	     * @param value { Buffer } The Buffer to write.
	     * @param offset { Number } The offset to write the Buffer to.
	     */
	    _handleBuffer(value, isInsert, offset) {
	        const offsetVal = typeof offset === 'number' ? offset : this._writeOffset;
	        // Ensure there is enough internal Buffer capacity.
	        if (isInsert) {
	            this.ensureInsertable(value.length, offsetVal);
	        }
	        else {
	            this._ensureWriteable(value.length, offsetVal);
	        }
	        // Write buffer value
	        value.copy(this._buff, offsetVal);
	        // Increment internal Buffer write offset;
	        if (isInsert) {
	            this._writeOffset += value.length;
	        }
	        else {
	            // If an offset was given, check to see if we wrote beyond the current writeOffset.
	            if (typeof offset === 'number') {
	                this._writeOffset = Math.max(this._writeOffset, offsetVal + value.length);
	            }
	            else {
	                // If no offset was given, we wrote to the end of the SmartBuffer so increment writeOffset.
	                this._writeOffset += value.length;
	            }
	        }
	        return this;
	    }
	    /**
	     * Ensures that the internal Buffer is large enough to read data.
	     *
	     * @param length { Number } The length of the data that needs to be read.
	     * @param offset { Number } The offset of the data that needs to be read.
	     */
	    ensureReadable(length, offset) {
	        // Offset value defaults to managed read offset.
	        let offsetVal = this._readOffset;
	        // If an offset was provided, use it.
	        if (typeof offset !== 'undefined') {
	            // Checks for valid numberic value;
	            utils_1.checkOffsetValue(offset);
	            // Overide with custom offset.
	            offsetVal = offset;
	        }
	        // Checks if offset is below zero, or the offset+length offset is beyond the total length of the managed data.
	        if (offsetVal < 0 || offsetVal + length > this.length) {
	            throw new Error(utils_1.ERRORS.INVALID_READ_BEYOND_BOUNDS);
	        }
	    }
	    /**
	     * Ensures that the internal Buffer is large enough to insert data.
	     *
	     * @param dataLength { Number } The length of the data that needs to be written.
	     * @param offset { Number } The offset of the data to be written.
	     */
	    ensureInsertable(dataLength, offset) {
	        // Checks for valid numberic value;
	        utils_1.checkOffsetValue(offset);
	        // Ensure there is enough internal Buffer capacity.
	        this._ensureCapacity(this.length + dataLength);
	        // If an offset was provided and its not the very end of the buffer, copy data into appropriate location in regards to the offset.
	        if (offset < this.length) {
	            this._buff.copy(this._buff, offset + dataLength, offset, this._buff.length);
	        }
	        // Adjust tracked smart buffer length
	        if (offset + dataLength > this.length) {
	            this.length = offset + dataLength;
	        }
	        else {
	            this.length += dataLength;
	        }
	    }
	    /**
	     * Ensures that the internal Buffer is large enough to write data.
	     *
	     * @param dataLength { Number } The length of the data that needs to be written.
	     * @param offset { Number } The offset of the data to be written (defaults to writeOffset).
	     */
	    _ensureWriteable(dataLength, offset) {
	        const offsetVal = typeof offset === 'number' ? offset : this._writeOffset;
	        // Ensure enough capacity to write data.
	        this._ensureCapacity(offsetVal + dataLength);
	        // Adjust SmartBuffer length (if offset + length is larger than managed length, adjust length)
	        if (offsetVal + dataLength > this.length) {
	            this.length = offsetVal + dataLength;
	        }
	    }
	    /**
	     * Ensures that the internal Buffer is large enough to write at least the given amount of data.
	     *
	     * @param minLength { Number } The minimum length of the data needs to be written.
	     */
	    _ensureCapacity(minLength) {
	        const oldLength = this._buff.length;
	        if (minLength > oldLength) {
	            let data = this._buff;
	            let newLength = (oldLength * 3) / 2 + 1;
	            if (newLength < minLength) {
	                newLength = minLength;
	            }
	            this._buff = Buffer.allocUnsafe(newLength);
	            data.copy(this._buff, 0, 0, oldLength);
	        }
	    }
	    /**
	     * Reads a numeric number value using the provided function.
	     *
	     * @typeparam T { number | bigint } The type of the value to be read
	     *
	     * @param func { Function(offset: number) => number } The function to read data on the internal Buffer with.
	     * @param byteSize { Number } The number of bytes read.
	     * @param offset { Number } The offset to read from (optional). When this is not provided, the managed readOffset is used instead.
	     *
	     * @returns { T } the number value
	     */
	    _readNumberValue(func, byteSize, offset) {
	        this.ensureReadable(byteSize, offset);
	        // Call Buffer.readXXXX();
	        const value = func.call(this._buff, typeof offset === 'number' ? offset : this._readOffset);
	        // Adjust internal read offset if an optional read offset was not provided.
	        if (typeof offset === 'undefined') {
	            this._readOffset += byteSize;
	        }
	        return value;
	    }
	    /**
	     * Inserts a numeric number value based on the given offset and value.
	     *
	     * @typeparam T { number | bigint } The type of the value to be written
	     *
	     * @param func { Function(offset: T, offset?) => number} The function to write data on the internal Buffer with.
	     * @param byteSize { Number } The number of bytes written.
	     * @param value { T } The number value to write.
	     * @param offset { Number } the offset to write the number at (REQUIRED).
	     *
	     * @returns SmartBuffer this buffer
	     */
	    _insertNumberValue(func, byteSize, value, offset) {
	        // Check for invalid offset values.
	        utils_1.checkOffsetValue(offset);
	        // Ensure there is enough internal Buffer capacity. (raw offset is passed)
	        this.ensureInsertable(byteSize, offset);
	        // Call buffer.writeXXXX();
	        func.call(this._buff, value, offset);
	        // Adjusts internally managed write offset.
	        this._writeOffset += byteSize;
	        return this;
	    }
	    /**
	     * Writes a numeric number value based on the given offset and value.
	     *
	     * @typeparam T { number | bigint } The type of the value to be written
	     *
	     * @param func { Function(offset: T, offset?) => number} The function to write data on the internal Buffer with.
	     * @param byteSize { Number } The number of bytes written.
	     * @param value { T } The number value to write.
	     * @param offset { Number } the offset to write the number at (REQUIRED).
	     *
	     * @returns SmartBuffer this buffer
	     */
	    _writeNumberValue(func, byteSize, value, offset) {
	        // If an offset was provided, validate it.
	        if (typeof offset === 'number') {
	            // Check if we're writing beyond the bounds of the managed data.
	            if (offset < 0) {
	                throw new Error(utils_1.ERRORS.INVALID_WRITE_BEYOND_BOUNDS);
	            }
	            utils_1.checkOffsetValue(offset);
	        }
	        // Default to writeOffset if no offset value was given.
	        const offsetVal = typeof offset === 'number' ? offset : this._writeOffset;
	        // Ensure there is enough internal Buffer capacity. (raw offset is passed)
	        this._ensureWriteable(byteSize, offsetVal);
	        func.call(this._buff, value, offsetVal);
	        // If an offset was given, check to see if we wrote beyond the current writeOffset.
	        if (typeof offset === 'number') {
	            this._writeOffset = Math.max(this._writeOffset, offsetVal + byteSize);
	        }
	        else {
	            // If no numeric offset was given, we wrote to the end of the SmartBuffer so increment writeOffset.
	            this._writeOffset += byteSize;
	        }
	        return this;
	    }
	}
	smartbuffer.SmartBuffer = SmartBuffer;
	
	return smartbuffer;
}

var constants$2 = {};

var hasRequiredConstants$2;

function requireConstants$2 () {
	if (hasRequiredConstants$2) return constants$2;
	hasRequiredConstants$2 = 1;
	Object.defineProperty(constants$2, "__esModule", { value: true });
	constants$2.SOCKS5_NO_ACCEPTABLE_AUTH = constants$2.SOCKS5_CUSTOM_AUTH_END = constants$2.SOCKS5_CUSTOM_AUTH_START = constants$2.SOCKS_INCOMING_PACKET_SIZES = constants$2.SocksClientState = constants$2.Socks5Response = constants$2.Socks5HostType = constants$2.Socks5Auth = constants$2.Socks4Response = constants$2.SocksCommand = constants$2.ERRORS = constants$2.DEFAULT_TIMEOUT = void 0;
	const DEFAULT_TIMEOUT = 30000;
	constants$2.DEFAULT_TIMEOUT = DEFAULT_TIMEOUT;
	// prettier-ignore
	const ERRORS = {
	    InvalidSocksCommand: 'An invalid SOCKS command was provided. Valid options are connect, bind, and associate.',
	    InvalidSocksCommandForOperation: 'An invalid SOCKS command was provided. Only a subset of commands are supported for this operation.',
	    InvalidSocksCommandChain: 'An invalid SOCKS command was provided. Chaining currently only supports the connect command.',
	    InvalidSocksClientOptionsDestination: 'An invalid destination host was provided.',
	    InvalidSocksClientOptionsExistingSocket: 'An invalid existing socket was provided. This should be an instance of stream.Duplex.',
	    InvalidSocksClientOptionsProxy: 'Invalid SOCKS proxy details were provided.',
	    InvalidSocksClientOptionsTimeout: 'An invalid timeout value was provided. Please enter a value above 0 (in ms).',
	    InvalidSocksClientOptionsProxiesLength: 'At least two socks proxies must be provided for chaining.',
	    InvalidSocksClientOptionsCustomAuthRange: 'Custom auth must be a value between 0x80 and 0xFE.',
	    InvalidSocksClientOptionsCustomAuthOptions: 'When a custom_auth_method is provided, custom_auth_request_handler, custom_auth_response_size, and custom_auth_response_handler must also be provided and valid.',
	    NegotiationError: 'Negotiation error',
	    SocketClosed: 'Socket closed',
	    ProxyConnectionTimedOut: 'Proxy connection timed out',
	    InternalError: 'SocksClient internal error (this should not happen)',
	    InvalidSocks4HandshakeResponse: 'Received invalid Socks4 handshake response',
	    Socks4ProxyRejectedConnection: 'Socks4 Proxy rejected connection',
	    InvalidSocks4IncomingConnectionResponse: 'Socks4 invalid incoming connection response',
	    Socks4ProxyRejectedIncomingBoundConnection: 'Socks4 Proxy rejected incoming bound connection',
	    InvalidSocks5InitialHandshakeResponse: 'Received invalid Socks5 initial handshake response',
	    InvalidSocks5IntiailHandshakeSocksVersion: 'Received invalid Socks5 initial handshake (invalid socks version)',
	    InvalidSocks5InitialHandshakeNoAcceptedAuthType: 'Received invalid Socks5 initial handshake (no accepted authentication type)',
	    InvalidSocks5InitialHandshakeUnknownAuthType: 'Received invalid Socks5 initial handshake (unknown authentication type)',
	    Socks5AuthenticationFailed: 'Socks5 Authentication failed',
	    InvalidSocks5FinalHandshake: 'Received invalid Socks5 final handshake response',
	    InvalidSocks5FinalHandshakeRejected: 'Socks5 proxy rejected connection',
	    InvalidSocks5IncomingConnectionResponse: 'Received invalid Socks5 incoming connection response',
	    Socks5ProxyRejectedIncomingBoundConnection: 'Socks5 Proxy rejected incoming bound connection',
	};
	constants$2.ERRORS = ERRORS;
	const SOCKS_INCOMING_PACKET_SIZES = {
	    Socks5InitialHandshakeResponse: 2,
	    Socks5UserPassAuthenticationResponse: 2,
	    // Command response + incoming connection (bind)
	    Socks5ResponseHeader: 5, // We need at least 5 to read the hostname length, then we wait for the address+port information.
	    Socks5ResponseIPv4: 10, // 4 header + 4 ip + 2 port
	    Socks5ResponseIPv6: 22, // 4 header + 16 ip + 2 port
	    Socks5ResponseHostname: (hostNameLength) => hostNameLength + 7, // 4 header + 1 host length + host + 2 port
	    // Command response + incoming connection (bind)
	    Socks4Response: 8, // 2 header + 2 port + 4 ip
	};
	constants$2.SOCKS_INCOMING_PACKET_SIZES = SOCKS_INCOMING_PACKET_SIZES;
	var SocksCommand;
	(function (SocksCommand) {
	    SocksCommand[SocksCommand["connect"] = 1] = "connect";
	    SocksCommand[SocksCommand["bind"] = 2] = "bind";
	    SocksCommand[SocksCommand["associate"] = 3] = "associate";
	})(SocksCommand || (constants$2.SocksCommand = SocksCommand = {}));
	var Socks4Response;
	(function (Socks4Response) {
	    Socks4Response[Socks4Response["Granted"] = 90] = "Granted";
	    Socks4Response[Socks4Response["Failed"] = 91] = "Failed";
	    Socks4Response[Socks4Response["Rejected"] = 92] = "Rejected";
	    Socks4Response[Socks4Response["RejectedIdent"] = 93] = "RejectedIdent";
	})(Socks4Response || (constants$2.Socks4Response = Socks4Response = {}));
	var Socks5Auth;
	(function (Socks5Auth) {
	    Socks5Auth[Socks5Auth["NoAuth"] = 0] = "NoAuth";
	    Socks5Auth[Socks5Auth["GSSApi"] = 1] = "GSSApi";
	    Socks5Auth[Socks5Auth["UserPass"] = 2] = "UserPass";
	})(Socks5Auth || (constants$2.Socks5Auth = Socks5Auth = {}));
	const SOCKS5_CUSTOM_AUTH_START = 0x80;
	constants$2.SOCKS5_CUSTOM_AUTH_START = SOCKS5_CUSTOM_AUTH_START;
	const SOCKS5_CUSTOM_AUTH_END = 0xfe;
	constants$2.SOCKS5_CUSTOM_AUTH_END = SOCKS5_CUSTOM_AUTH_END;
	const SOCKS5_NO_ACCEPTABLE_AUTH = 0xff;
	constants$2.SOCKS5_NO_ACCEPTABLE_AUTH = SOCKS5_NO_ACCEPTABLE_AUTH;
	var Socks5Response;
	(function (Socks5Response) {
	    Socks5Response[Socks5Response["Granted"] = 0] = "Granted";
	    Socks5Response[Socks5Response["Failure"] = 1] = "Failure";
	    Socks5Response[Socks5Response["NotAllowed"] = 2] = "NotAllowed";
	    Socks5Response[Socks5Response["NetworkUnreachable"] = 3] = "NetworkUnreachable";
	    Socks5Response[Socks5Response["HostUnreachable"] = 4] = "HostUnreachable";
	    Socks5Response[Socks5Response["ConnectionRefused"] = 5] = "ConnectionRefused";
	    Socks5Response[Socks5Response["TTLExpired"] = 6] = "TTLExpired";
	    Socks5Response[Socks5Response["CommandNotSupported"] = 7] = "CommandNotSupported";
	    Socks5Response[Socks5Response["AddressNotSupported"] = 8] = "AddressNotSupported";
	})(Socks5Response || (constants$2.Socks5Response = Socks5Response = {}));
	var Socks5HostType;
	(function (Socks5HostType) {
	    Socks5HostType[Socks5HostType["IPv4"] = 1] = "IPv4";
	    Socks5HostType[Socks5HostType["Hostname"] = 3] = "Hostname";
	    Socks5HostType[Socks5HostType["IPv6"] = 4] = "IPv6";
	})(Socks5HostType || (constants$2.Socks5HostType = Socks5HostType = {}));
	var SocksClientState;
	(function (SocksClientState) {
	    SocksClientState[SocksClientState["Created"] = 0] = "Created";
	    SocksClientState[SocksClientState["Connecting"] = 1] = "Connecting";
	    SocksClientState[SocksClientState["Connected"] = 2] = "Connected";
	    SocksClientState[SocksClientState["SentInitialHandshake"] = 3] = "SentInitialHandshake";
	    SocksClientState[SocksClientState["ReceivedInitialHandshakeResponse"] = 4] = "ReceivedInitialHandshakeResponse";
	    SocksClientState[SocksClientState["SentAuthentication"] = 5] = "SentAuthentication";
	    SocksClientState[SocksClientState["ReceivedAuthenticationResponse"] = 6] = "ReceivedAuthenticationResponse";
	    SocksClientState[SocksClientState["SentFinalHandshake"] = 7] = "SentFinalHandshake";
	    SocksClientState[SocksClientState["ReceivedFinalResponse"] = 8] = "ReceivedFinalResponse";
	    SocksClientState[SocksClientState["BoundWaitingForConnection"] = 9] = "BoundWaitingForConnection";
	    SocksClientState[SocksClientState["Established"] = 10] = "Established";
	    SocksClientState[SocksClientState["Disconnected"] = 11] = "Disconnected";
	    SocksClientState[SocksClientState["Error"] = 99] = "Error";
	})(SocksClientState || (constants$2.SocksClientState = SocksClientState = {}));
	
	return constants$2;
}

var helpers$1 = {};

var util = {};

var hasRequiredUtil;

function requireUtil () {
	if (hasRequiredUtil) return util;
	hasRequiredUtil = 1;
	Object.defineProperty(util, "__esModule", { value: true });
	util.shuffleArray = util.SocksClientError = void 0;
	/**
	 * Error wrapper for SocksClient
	 */
	class SocksClientError extends Error {
	    constructor(message, options) {
	        super(message);
	        this.options = options;
	    }
	}
	util.SocksClientError = SocksClientError;
	/**
	 * Shuffles a given array.
	 * @param array The array to shuffle.
	 */
	function shuffleArray(array) {
	    for (let i = array.length - 1; i > 0; i--) {
	        const j = Math.floor(Math.random() * (i + 1));
	        [array[i], array[j]] = [array[j], array[i]];
	    }
	}
	util.shuffleArray = shuffleArray;
	
	return util;
}

var ipAddress = {};

var ipv4 = {};

var common = {};

var hasRequiredCommon;

function requireCommon () {
	if (hasRequiredCommon) return common;
	hasRequiredCommon = 1;
	Object.defineProperty(common, "__esModule", { value: true });
	common.isInSubnet = isInSubnet;
	common.isCorrect = isCorrect;
	common.numberToPaddedHex = numberToPaddedHex;
	common.stringToPaddedHex = stringToPaddedHex;
	common.testBit = testBit;
	function isInSubnet(address) {
	    if (this.subnetMask < address.subnetMask) {
	        return false;
	    }
	    if (this.mask(address.subnetMask) === address.mask()) {
	        return true;
	    }
	    return false;
	}
	function isCorrect(defaultBits) {
	    return function () {
	        if (this.addressMinusSuffix !== this.correctForm()) {
	            return false;
	        }
	        if (this.subnetMask === defaultBits && !this.parsedSubnet) {
	            return true;
	        }
	        return this.parsedSubnet === String(this.subnetMask);
	    };
	}
	function numberToPaddedHex(number) {
	    return number.toString(16).padStart(2, '0');
	}
	function stringToPaddedHex(numberString) {
	    return numberToPaddedHex(parseInt(numberString, 10));
	}
	/**
	 * @param binaryValue Binary representation of a value (e.g. `10`)
	 * @param position Byte position, where 0 is the least significant bit
	 */
	function testBit(binaryValue, position) {
	    const { length } = binaryValue;
	    if (position > length) {
	        return false;
	    }
	    const positionInString = length - position;
	    return binaryValue.substring(positionInString, positionInString + 1) === '1';
	}
	
	return common;
}

var constants$1 = {};

var hasRequiredConstants$1;

function requireConstants$1 () {
	if (hasRequiredConstants$1) return constants$1;
	hasRequiredConstants$1 = 1;
	Object.defineProperty(constants$1, "__esModule", { value: true });
	constants$1.RE_SUBNET_STRING = constants$1.RE_ADDRESS = constants$1.GROUPS = constants$1.BITS = void 0;
	constants$1.BITS = 32;
	constants$1.GROUPS = 4;
	constants$1.RE_ADDRESS = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g;
	constants$1.RE_SUBNET_STRING = /\/\d{1,2}$/;
	
	return constants$1;
}

var addressError = {};

var hasRequiredAddressError;

function requireAddressError () {
	if (hasRequiredAddressError) return addressError;
	hasRequiredAddressError = 1;
	Object.defineProperty(addressError, "__esModule", { value: true });
	addressError.AddressError = void 0;
	class AddressError extends Error {
	    constructor(message, parseMessage) {
	        super(message);
	        this.name = 'AddressError';
	        this.parseMessage = parseMessage;
	    }
	}
	addressError.AddressError = AddressError;
	
	return addressError;
}

var hasRequiredIpv4;

function requireIpv4 () {
	if (hasRequiredIpv4) return ipv4;
	hasRequiredIpv4 = 1;
	/* eslint-disable no-param-reassign */
	var __createBinding = (ipv4 && ipv4.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (ipv4 && ipv4.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (ipv4 && ipv4.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(ipv4, "__esModule", { value: true });
	ipv4.Address4 = void 0;
	const common = __importStar(requireCommon());
	const constants = __importStar(requireConstants$1());
	const address_error_1 = requireAddressError();
	/**
	 * Represents an IPv4 address
	 * @class Address4
	 * @param {string} address - An IPv4 address string
	 */
	class Address4 {
	    constructor(address) {
	        this.groups = constants.GROUPS;
	        this.parsedAddress = [];
	        this.parsedSubnet = '';
	        this.subnet = '/32';
	        this.subnetMask = 32;
	        this.v4 = true;
	        /**
	         * Returns true if the address is correct, false otherwise
	         * @memberof Address4
	         * @instance
	         * @returns {Boolean}
	         */
	        this.isCorrect = common.isCorrect(constants.BITS);
	        /**
	         * Returns true if the given address is in the subnet of the current address
	         * @memberof Address4
	         * @instance
	         * @returns {boolean}
	         */
	        this.isInSubnet = common.isInSubnet;
	        this.address = address;
	        const subnet = constants.RE_SUBNET_STRING.exec(address);
	        if (subnet) {
	            this.parsedSubnet = subnet[0].replace('/', '');
	            this.subnetMask = parseInt(this.parsedSubnet, 10);
	            this.subnet = `/${this.subnetMask}`;
	            if (this.subnetMask < 0 || this.subnetMask > constants.BITS) {
	                throw new address_error_1.AddressError('Invalid subnet mask.');
	            }
	            address = address.replace(constants.RE_SUBNET_STRING, '');
	        }
	        this.addressMinusSuffix = address;
	        this.parsedAddress = this.parse(address);
	    }
	    static isValid(address) {
	        try {
	            // eslint-disable-next-line no-new
	            new Address4(address);
	            return true;
	        }
	        catch (e) {
	            return false;
	        }
	    }
	    /*
	     * Parses a v4 address
	     */
	    parse(address) {
	        const groups = address.split('.');
	        if (!address.match(constants.RE_ADDRESS)) {
	            throw new address_error_1.AddressError('Invalid IPv4 address.');
	        }
	        return groups;
	    }
	    /**
	     * Returns the correct form of an address
	     * @memberof Address4
	     * @instance
	     * @returns {String}
	     */
	    correctForm() {
	        return this.parsedAddress.map((part) => parseInt(part, 10)).join('.');
	    }
	    /**
	     * Converts a hex string to an IPv4 address object
	     * @memberof Address4
	     * @static
	     * @param {string} hex - a hex string to convert
	     * @returns {Address4}
	     */
	    static fromHex(hex) {
	        const padded = hex.replace(/:/g, '').padStart(8, '0');
	        const groups = [];
	        let i;
	        for (i = 0; i < 8; i += 2) {
	            const h = padded.slice(i, i + 2);
	            groups.push(parseInt(h, 16));
	        }
	        return new Address4(groups.join('.'));
	    }
	    /**
	     * Converts an integer into a IPv4 address object
	     * @memberof Address4
	     * @static
	     * @param {integer} integer - a number to convert
	     * @returns {Address4}
	     */
	    static fromInteger(integer) {
	        return Address4.fromHex(integer.toString(16));
	    }
	    /**
	     * Return an address from in-addr.arpa form
	     * @memberof Address4
	     * @static
	     * @param {string} arpaFormAddress - an 'in-addr.arpa' form ipv4 address
	     * @returns {Adress4}
	     * @example
	     * var address = Address4.fromArpa(42.2.0.192.in-addr.arpa.)
	     * address.correctForm(); // '192.0.2.42'
	     */
	    static fromArpa(arpaFormAddress) {
	        // remove ending ".in-addr.arpa." or just "."
	        const leader = arpaFormAddress.replace(/(\.in-addr\.arpa)?\.$/, '');
	        const address = leader.split('.').reverse().join('.');
	        return new Address4(address);
	    }
	    /**
	     * Converts an IPv4 address object to a hex string
	     * @memberof Address4
	     * @instance
	     * @returns {String}
	     */
	    toHex() {
	        return this.parsedAddress.map((part) => common.stringToPaddedHex(part)).join(':');
	    }
	    /**
	     * Converts an IPv4 address object to an array of bytes
	     * @memberof Address4
	     * @instance
	     * @returns {Array}
	     */
	    toArray() {
	        return this.parsedAddress.map((part) => parseInt(part, 10));
	    }
	    /**
	     * Converts an IPv4 address object to an IPv6 address group
	     * @memberof Address4
	     * @instance
	     * @returns {String}
	     */
	    toGroup6() {
	        const output = [];
	        let i;
	        for (i = 0; i < constants.GROUPS; i += 2) {
	            output.push(`${common.stringToPaddedHex(this.parsedAddress[i])}${common.stringToPaddedHex(this.parsedAddress[i + 1])}`);
	        }
	        return output.join(':');
	    }
	    /**
	     * Returns the address as a `bigint`
	     * @memberof Address4
	     * @instance
	     * @returns {bigint}
	     */
	    bigInt() {
	        return BigInt(`0x${this.parsedAddress.map((n) => common.stringToPaddedHex(n)).join('')}`);
	    }
	    /**
	     * Helper function getting start address.
	     * @memberof Address4
	     * @instance
	     * @returns {bigint}
	     */
	    _startAddress() {
	        return BigInt(`0b${this.mask() + '0'.repeat(constants.BITS - this.subnetMask)}`);
	    }
	    /**
	     * The first address in the range given by this address' subnet.
	     * Often referred to as the Network Address.
	     * @memberof Address4
	     * @instance
	     * @returns {Address4}
	     */
	    startAddress() {
	        return Address4.fromBigInt(this._startAddress());
	    }
	    /**
	     * The first host address in the range given by this address's subnet ie
	     * the first address after the Network Address
	     * @memberof Address4
	     * @instance
	     * @returns {Address4}
	     */
	    startAddressExclusive() {
	        const adjust = BigInt('1');
	        return Address4.fromBigInt(this._startAddress() + adjust);
	    }
	    /**
	     * Helper function getting end address.
	     * @memberof Address4
	     * @instance
	     * @returns {bigint}
	     */
	    _endAddress() {
	        return BigInt(`0b${this.mask() + '1'.repeat(constants.BITS - this.subnetMask)}`);
	    }
	    /**
	     * The last address in the range given by this address' subnet
	     * Often referred to as the Broadcast
	     * @memberof Address4
	     * @instance
	     * @returns {Address4}
	     */
	    endAddress() {
	        return Address4.fromBigInt(this._endAddress());
	    }
	    /**
	     * The last host address in the range given by this address's subnet ie
	     * the last address prior to the Broadcast Address
	     * @memberof Address4
	     * @instance
	     * @returns {Address4}
	     */
	    endAddressExclusive() {
	        const adjust = BigInt('1');
	        return Address4.fromBigInt(this._endAddress() - adjust);
	    }
	    /**
	     * Converts a BigInt to a v4 address object
	     * @memberof Address4
	     * @static
	     * @param {bigint} bigInt - a BigInt to convert
	     * @returns {Address4}
	     */
	    static fromBigInt(bigInt) {
	        return Address4.fromHex(bigInt.toString(16));
	    }
	    /**
	     * Convert a byte array to an Address4 object
	     * @memberof Address4
	     * @static
	     * @param {Array<number>} bytes - an array of 4 bytes (0-255)
	     * @returns {Address4}
	     */
	    static fromByteArray(bytes) {
	        if (bytes.length !== 4) {
	            throw new address_error_1.AddressError('IPv4 addresses require exactly 4 bytes');
	        }
	        // Validate that all bytes are within valid range (0-255)
	        for (let i = 0; i < bytes.length; i++) {
	            if (!Number.isInteger(bytes[i]) || bytes[i] < 0 || bytes[i] > 255) {
	                throw new address_error_1.AddressError('All bytes must be integers between 0 and 255');
	            }
	        }
	        return this.fromUnsignedByteArray(bytes);
	    }
	    /**
	     * Convert an unsigned byte array to an Address4 object
	     * @memberof Address4
	     * @static
	     * @param {Array<number>} bytes - an array of 4 unsigned bytes (0-255)
	     * @returns {Address4}
	     */
	    static fromUnsignedByteArray(bytes) {
	        if (bytes.length !== 4) {
	            throw new address_error_1.AddressError('IPv4 addresses require exactly 4 bytes');
	        }
	        const address = bytes.join('.');
	        return new Address4(address);
	    }
	    /**
	     * Returns the first n bits of the address, defaulting to the
	     * subnet mask
	     * @memberof Address4
	     * @instance
	     * @returns {String}
	     */
	    mask(mask) {
	        if (mask === undefined) {
	            mask = this.subnetMask;
	        }
	        return this.getBitsBase2(0, mask);
	    }
	    /**
	     * Returns the bits in the given range as a base-2 string
	     * @memberof Address4
	     * @instance
	     * @returns {string}
	     */
	    getBitsBase2(start, end) {
	        return this.binaryZeroPad().slice(start, end);
	    }
	    /**
	     * Return the reversed ip6.arpa form of the address
	     * @memberof Address4
	     * @param {Object} options
	     * @param {boolean} options.omitSuffix - omit the "in-addr.arpa" suffix
	     * @instance
	     * @returns {String}
	     */
	    reverseForm(options) {
	        if (!options) {
	            options = {};
	        }
	        const reversed = this.correctForm().split('.').reverse().join('.');
	        if (options.omitSuffix) {
	            return reversed;
	        }
	        return `${reversed}.in-addr.arpa.`;
	    }
	    /**
	     * Returns true if the given address is a multicast address
	     * @memberof Address4
	     * @instance
	     * @returns {boolean}
	     */
	    isMulticast() {
	        return this.isInSubnet(new Address4('224.0.0.0/4'));
	    }
	    /**
	     * Returns a zero-padded base-2 string representation of the address
	     * @memberof Address4
	     * @instance
	     * @returns {string}
	     */
	    binaryZeroPad() {
	        return this.bigInt().toString(2).padStart(constants.BITS, '0');
	    }
	    /**
	     * Groups an IPv4 address for inclusion at the end of an IPv6 address
	     * @returns {String}
	     */
	    groupForV6() {
	        const segments = this.parsedAddress;
	        return this.address.replace(constants.RE_ADDRESS, `<span class="hover-group group-v4 group-6">${segments
	            .slice(0, 2)
	            .join('.')}</span>.<span class="hover-group group-v4 group-7">${segments
	            .slice(2, 4)
	            .join('.')}</span>`);
	    }
	}
	ipv4.Address4 = Address4;
	
	return ipv4;
}

var ipv6 = {};

var constants = {};

var hasRequiredConstants;

function requireConstants () {
	if (hasRequiredConstants) return constants;
	hasRequiredConstants = 1;
	Object.defineProperty(constants, "__esModule", { value: true });
	constants.RE_URL_WITH_PORT = constants.RE_URL = constants.RE_ZONE_STRING = constants.RE_SUBNET_STRING = constants.RE_BAD_ADDRESS = constants.RE_BAD_CHARACTERS = constants.TYPES = constants.SCOPES = constants.GROUPS = constants.BITS = void 0;
	constants.BITS = 128;
	constants.GROUPS = 8;
	/**
	 * Represents IPv6 address scopes
	 * @memberof Address6
	 * @static
	 */
	constants.SCOPES = {
	    0: 'Reserved',
	    1: 'Interface local',
	    2: 'Link local',
	    4: 'Admin local',
	    5: 'Site local',
	    8: 'Organization local',
	    14: 'Global',
	    15: 'Reserved',
	};
	/**
	 * Represents IPv6 address types
	 * @memberof Address6
	 * @static
	 */
	constants.TYPES = {
	    'ff01::1/128': 'Multicast (All nodes on this interface)',
	    'ff01::2/128': 'Multicast (All routers on this interface)',
	    'ff02::1/128': 'Multicast (All nodes on this link)',
	    'ff02::2/128': 'Multicast (All routers on this link)',
	    'ff05::2/128': 'Multicast (All routers in this site)',
	    'ff02::5/128': 'Multicast (OSPFv3 AllSPF routers)',
	    'ff02::6/128': 'Multicast (OSPFv3 AllDR routers)',
	    'ff02::9/128': 'Multicast (RIP routers)',
	    'ff02::a/128': 'Multicast (EIGRP routers)',
	    'ff02::d/128': 'Multicast (PIM routers)',
	    'ff02::16/128': 'Multicast (MLDv2 reports)',
	    'ff01::fb/128': 'Multicast (mDNSv6)',
	    'ff02::fb/128': 'Multicast (mDNSv6)',
	    'ff05::fb/128': 'Multicast (mDNSv6)',
	    'ff02::1:2/128': 'Multicast (All DHCP servers and relay agents on this link)',
	    'ff05::1:2/128': 'Multicast (All DHCP servers and relay agents in this site)',
	    'ff02::1:3/128': 'Multicast (All DHCP servers on this link)',
	    'ff05::1:3/128': 'Multicast (All DHCP servers in this site)',
	    '::/128': 'Unspecified',
	    '::1/128': 'Loopback',
	    'ff00::/8': 'Multicast',
	    'fe80::/10': 'Link-local unicast',
	};
	/**
	 * A regular expression that matches bad characters in an IPv6 address
	 * @memberof Address6
	 * @static
	 */
	constants.RE_BAD_CHARACTERS = /([^0-9a-f:/%])/gi;
	/**
	 * A regular expression that matches an incorrect IPv6 address
	 * @memberof Address6
	 * @static
	 */
	constants.RE_BAD_ADDRESS = /([0-9a-f]{5,}|:{3,}|[^:]:$|^:[^:]|\/$)/gi;
	/**
	 * A regular expression that matches an IPv6 subnet
	 * @memberof Address6
	 * @static
	 */
	constants.RE_SUBNET_STRING = /\/\d{1,3}(?=%|$)/;
	/**
	 * A regular expression that matches an IPv6 zone
	 * @memberof Address6
	 * @static
	 */
	constants.RE_ZONE_STRING = /%.*$/;
	constants.RE_URL = /^\[{0,1}([0-9a-f:]+)\]{0,1}/;
	constants.RE_URL_WITH_PORT = /\[([0-9a-f:]+)\]:([0-9]{1,5})/;
	
	return constants;
}

var helpers = {};

var hasRequiredHelpers$1;

function requireHelpers$1 () {
	if (hasRequiredHelpers$1) return helpers;
	hasRequiredHelpers$1 = 1;
	Object.defineProperty(helpers, "__esModule", { value: true });
	helpers.spanAllZeroes = spanAllZeroes;
	helpers.spanAll = spanAll;
	helpers.spanLeadingZeroes = spanLeadingZeroes;
	helpers.simpleGroup = simpleGroup;
	/**
	 * @returns {String} the string with all zeroes contained in a <span>
	 */
	function spanAllZeroes(s) {
	    return s.replace(/(0+)/g, '<span class="zero">$1</span>');
	}
	/**
	 * @returns {String} the string with each character contained in a <span>
	 */
	function spanAll(s, offset = 0) {
	    const letters = s.split('');
	    return letters
	        .map((n, i) => `<span class="digit value-${n} position-${i + offset}">${spanAllZeroes(n)}</span>`)
	        .join('');
	}
	function spanLeadingZeroesSimple(group) {
	    return group.replace(/^(0+)/, '<span class="zero">$1</span>');
	}
	/**
	 * @returns {String} the string with leading zeroes contained in a <span>
	 */
	function spanLeadingZeroes(address) {
	    const groups = address.split(':');
	    return groups.map((g) => spanLeadingZeroesSimple(g)).join(':');
	}
	/**
	 * Groups an address
	 * @returns {String} a grouped address
	 */
	function simpleGroup(addressString, offset = 0) {
	    const groups = addressString.split(':');
	    return groups.map((g, i) => {
	        if (/group-v4/.test(g)) {
	            return g;
	        }
	        return `<span class="hover-group group-${i + offset}">${spanLeadingZeroesSimple(g)}</span>`;
	    });
	}
	
	return helpers;
}

var regularExpressions = {};

var hasRequiredRegularExpressions;

function requireRegularExpressions () {
	if (hasRequiredRegularExpressions) return regularExpressions;
	hasRequiredRegularExpressions = 1;
	var __createBinding = (regularExpressions && regularExpressions.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (regularExpressions && regularExpressions.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (regularExpressions && regularExpressions.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(regularExpressions, "__esModule", { value: true });
	regularExpressions.ADDRESS_BOUNDARY = void 0;
	regularExpressions.groupPossibilities = groupPossibilities;
	regularExpressions.padGroup = padGroup;
	regularExpressions.simpleRegularExpression = simpleRegularExpression;
	regularExpressions.possibleElisions = possibleElisions;
	const v6 = __importStar(requireConstants());
	function groupPossibilities(possibilities) {
	    return `(${possibilities.join('|')})`;
	}
	function padGroup(group) {
	    if (group.length < 4) {
	        return `0{0,${4 - group.length}}${group}`;
	    }
	    return group;
	}
	regularExpressions.ADDRESS_BOUNDARY = '[^A-Fa-f0-9:]';
	function simpleRegularExpression(groups) {
	    const zeroIndexes = [];
	    groups.forEach((group, i) => {
	        const groupInteger = parseInt(group, 16);
	        if (groupInteger === 0) {
	            zeroIndexes.push(i);
	        }
	    });
	    // You can technically elide a single 0, this creates the regular expressions
	    // to match that eventuality
	    const possibilities = zeroIndexes.map((zeroIndex) => groups
	        .map((group, i) => {
	        if (i === zeroIndex) {
	            const elision = i === 0 || i === v6.GROUPS - 1 ? ':' : '';
	            return groupPossibilities([padGroup(group), elision]);
	        }
	        return padGroup(group);
	    })
	        .join(':'));
	    // The simplest case
	    possibilities.push(groups.map(padGroup).join(':'));
	    return groupPossibilities(possibilities);
	}
	function possibleElisions(elidedGroups, moreLeft, moreRight) {
	    const left = moreLeft ? '' : ':';
	    const right = moreRight ? '' : ':';
	    const possibilities = [];
	    // 1. elision of everything (::)
	    if (!moreLeft && !moreRight) {
	        possibilities.push('::');
	    }
	    // 2. complete elision of the middle
	    if (moreLeft && moreRight) {
	        possibilities.push('');
	    }
	    if ((moreRight && !moreLeft) || (!moreRight && moreLeft)) {
	        // 3. complete elision of one side
	        possibilities.push(':');
	    }
	    // 4. elision from the left side
	    possibilities.push(`${left}(:0{1,4}){1,${elidedGroups - 1}}`);
	    // 5. elision from the right side
	    possibilities.push(`(0{1,4}:){1,${elidedGroups - 1}}${right}`);
	    // 6. no elision
	    possibilities.push(`(0{1,4}:){${elidedGroups - 1}}0{1,4}`);
	    // 7. elision (including sloppy elision) from the middle
	    for (let groups = 1; groups < elidedGroups - 1; groups++) {
	        for (let position = 1; position < elidedGroups - groups; position++) {
	            possibilities.push(`(0{1,4}:){${position}}:(0{1,4}:){${elidedGroups - position - groups - 1}}0{1,4}`);
	        }
	    }
	    return groupPossibilities(possibilities);
	}
	
	return regularExpressions;
}

var hasRequiredIpv6;

function requireIpv6 () {
	if (hasRequiredIpv6) return ipv6;
	hasRequiredIpv6 = 1;
	/* eslint-disable prefer-destructuring */
	/* eslint-disable no-param-reassign */
	var __createBinding = (ipv6 && ipv6.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (ipv6 && ipv6.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (ipv6 && ipv6.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(ipv6, "__esModule", { value: true });
	ipv6.Address6 = void 0;
	const common = __importStar(requireCommon());
	const constants4 = __importStar(requireConstants$1());
	const constants6 = __importStar(requireConstants());
	const helpers = __importStar(requireHelpers$1());
	const ipv4_1 = requireIpv4();
	const regular_expressions_1 = requireRegularExpressions();
	const address_error_1 = requireAddressError();
	const common_1 = requireCommon();
	function assert(condition) {
	    if (!condition) {
	        throw new Error('Assertion failed.');
	    }
	}
	function addCommas(number) {
	    const r = /(\d+)(\d{3})/;
	    while (r.test(number)) {
	        number = number.replace(r, '$1,$2');
	    }
	    return number;
	}
	function spanLeadingZeroes4(n) {
	    n = n.replace(/^(0{1,})([1-9]+)$/, '<span class="parse-error">$1</span>$2');
	    n = n.replace(/^(0{1,})(0)$/, '<span class="parse-error">$1</span>$2');
	    return n;
	}
	/*
	 * A helper function to compact an array
	 */
	function compact(address, slice) {
	    const s1 = [];
	    const s2 = [];
	    let i;
	    for (i = 0; i < address.length; i++) {
	        if (i < slice[0]) {
	            s1.push(address[i]);
	        }
	        else if (i > slice[1]) {
	            s2.push(address[i]);
	        }
	    }
	    return s1.concat(['compact']).concat(s2);
	}
	function paddedHex(octet) {
	    return parseInt(octet, 16).toString(16).padStart(4, '0');
	}
	function unsignByte(b) {
	    // eslint-disable-next-line no-bitwise
	    return b & 0xff;
	}
	/**
	 * Represents an IPv6 address
	 * @class Address6
	 * @param {string} address - An IPv6 address string
	 * @param {number} [groups=8] - How many octets to parse
	 * @example
	 * var address = new Address6('2001::/32');
	 */
	class Address6 {
	    constructor(address, optionalGroups) {
	        this.addressMinusSuffix = '';
	        this.parsedSubnet = '';
	        this.subnet = '/128';
	        this.subnetMask = 128;
	        this.v4 = false;
	        this.zone = '';
	        // #region Attributes
	        /**
	         * Returns true if the given address is in the subnet of the current address
	         * @memberof Address6
	         * @instance
	         * @returns {boolean}
	         */
	        this.isInSubnet = common.isInSubnet;
	        /**
	         * Returns true if the address is correct, false otherwise
	         * @memberof Address6
	         * @instance
	         * @returns {boolean}
	         */
	        this.isCorrect = common.isCorrect(constants6.BITS);
	        if (optionalGroups === undefined) {
	            this.groups = constants6.GROUPS;
	        }
	        else {
	            this.groups = optionalGroups;
	        }
	        this.address = address;
	        const subnet = constants6.RE_SUBNET_STRING.exec(address);
	        if (subnet) {
	            this.parsedSubnet = subnet[0].replace('/', '');
	            this.subnetMask = parseInt(this.parsedSubnet, 10);
	            this.subnet = `/${this.subnetMask}`;
	            if (Number.isNaN(this.subnetMask) ||
	                this.subnetMask < 0 ||
	                this.subnetMask > constants6.BITS) {
	                throw new address_error_1.AddressError('Invalid subnet mask.');
	            }
	            address = address.replace(constants6.RE_SUBNET_STRING, '');
	        }
	        else if (/\//.test(address)) {
	            throw new address_error_1.AddressError('Invalid subnet mask.');
	        }
	        const zone = constants6.RE_ZONE_STRING.exec(address);
	        if (zone) {
	            this.zone = zone[0];
	            address = address.replace(constants6.RE_ZONE_STRING, '');
	        }
	        this.addressMinusSuffix = address;
	        this.parsedAddress = this.parse(this.addressMinusSuffix);
	    }
	    static isValid(address) {
	        try {
	            // eslint-disable-next-line no-new
	            new Address6(address);
	            return true;
	        }
	        catch (e) {
	            return false;
	        }
	    }
	    /**
	     * Convert a BigInt to a v6 address object
	     * @memberof Address6
	     * @static
	     * @param {bigint} bigInt - a BigInt to convert
	     * @returns {Address6}
	     * @example
	     * var bigInt = BigInt('1000000000000');
	     * var address = Address6.fromBigInt(bigInt);
	     * address.correctForm(); // '::e8:d4a5:1000'
	     */
	    static fromBigInt(bigInt) {
	        const hex = bigInt.toString(16).padStart(32, '0');
	        const groups = [];
	        let i;
	        for (i = 0; i < constants6.GROUPS; i++) {
	            groups.push(hex.slice(i * 4, (i + 1) * 4));
	        }
	        return new Address6(groups.join(':'));
	    }
	    /**
	     * Convert a URL (with optional port number) to an address object
	     * @memberof Address6
	     * @static
	     * @param {string} url - a URL with optional port number
	     * @example
	     * var addressAndPort = Address6.fromURL('http://[ffff::]:8080/foo/');
	     * addressAndPort.address.correctForm(); // 'ffff::'
	     * addressAndPort.port; // 8080
	     */
	    static fromURL(url) {
	        let host;
	        let port = null;
	        let result;
	        // If we have brackets parse them and find a port
	        if (url.indexOf('[') !== -1 && url.indexOf(']:') !== -1) {
	            result = constants6.RE_URL_WITH_PORT.exec(url);
	            if (result === null) {
	                return {
	                    error: 'failed to parse address with port',
	                    address: null,
	                    port: null,
	                };
	            }
	            host = result[1];
	            port = result[2];
	            // If there's a URL extract the address
	        }
	        else if (url.indexOf('/') !== -1) {
	            // Remove the protocol prefix
	            url = url.replace(/^[a-z0-9]+:\/\//, '');
	            // Parse the address
	            result = constants6.RE_URL.exec(url);
	            if (result === null) {
	                return {
	                    error: 'failed to parse address from URL',
	                    address: null,
	                    port: null,
	                };
	            }
	            host = result[1];
	            // Otherwise just assign the URL to the host and let the library parse it
	        }
	        else {
	            host = url;
	        }
	        // If there's a port convert it to an integer
	        if (port) {
	            port = parseInt(port, 10);
	            // squelch out of range ports
	            if (port < 0 || port > 65536) {
	                port = null;
	            }
	        }
	        else {
	            // Standardize `undefined` to `null`
	            port = null;
	        }
	        return {
	            address: new Address6(host),
	            port,
	        };
	    }
	    /**
	     * Create an IPv6-mapped address given an IPv4 address
	     * @memberof Address6
	     * @static
	     * @param {string} address - An IPv4 address string
	     * @returns {Address6}
	     * @example
	     * var address = Address6.fromAddress4('192.168.0.1');
	     * address.correctForm(); // '::ffff:c0a8:1'
	     * address.to4in6(); // '::ffff:192.168.0.1'
	     */
	    static fromAddress4(address) {
	        const address4 = new ipv4_1.Address4(address);
	        const mask6 = constants6.BITS - (constants4.BITS - address4.subnetMask);
	        return new Address6(`::ffff:${address4.correctForm()}/${mask6}`);
	    }
	    /**
	     * Return an address from ip6.arpa form
	     * @memberof Address6
	     * @static
	     * @param {string} arpaFormAddress - an 'ip6.arpa' form address
	     * @returns {Adress6}
	     * @example
	     * var address = Address6.fromArpa(e.f.f.f.3.c.2.6.f.f.f.e.6.6.8.e.1.0.6.7.9.4.e.c.0.0.0.0.1.0.0.2.ip6.arpa.)
	     * address.correctForm(); // '2001:0:ce49:7601:e866:efff:62c3:fffe'
	     */
	    static fromArpa(arpaFormAddress) {
	        // remove ending ".ip6.arpa." or just "."
	        let address = arpaFormAddress.replace(/(\.ip6\.arpa)?\.$/, '');
	        const semicolonAmount = 7;
	        // correct ip6.arpa form with ending removed will be 63 characters
	        if (address.length !== 63) {
	            throw new address_error_1.AddressError("Invalid 'ip6.arpa' form.");
	        }
	        const parts = address.split('.').reverse();
	        for (let i = semicolonAmount; i > 0; i--) {
	            const insertIndex = i * 4;
	            parts.splice(insertIndex, 0, ':');
	        }
	        address = parts.join('');
	        return new Address6(address);
	    }
	    /**
	     * Return the Microsoft UNC transcription of the address
	     * @memberof Address6
	     * @instance
	     * @returns {String} the Microsoft UNC transcription of the address
	     */
	    microsoftTranscription() {
	        return `${this.correctForm().replace(/:/g, '-')}.ipv6-literal.net`;
	    }
	    /**
	     * Return the first n bits of the address, defaulting to the subnet mask
	     * @memberof Address6
	     * @instance
	     * @param {number} [mask=subnet] - the number of bits to mask
	     * @returns {String} the first n bits of the address as a string
	     */
	    mask(mask = this.subnetMask) {
	        return this.getBitsBase2(0, mask);
	    }
	    /**
	     * Return the number of possible subnets of a given size in the address
	     * @memberof Address6
	     * @instance
	     * @param {number} [subnetSize=128] - the subnet size
	     * @returns {String}
	     */
	    // TODO: probably useful to have a numeric version of this too
	    possibleSubnets(subnetSize = 128) {
	        const availableBits = constants6.BITS - this.subnetMask;
	        const subnetBits = Math.abs(subnetSize - constants6.BITS);
	        const subnetPowers = availableBits - subnetBits;
	        if (subnetPowers < 0) {
	            return '0';
	        }
	        return addCommas((BigInt('2') ** BigInt(subnetPowers)).toString(10));
	    }
	    /**
	     * Helper function getting start address.
	     * @memberof Address6
	     * @instance
	     * @returns {bigint}
	     */
	    _startAddress() {
	        return BigInt(`0b${this.mask() + '0'.repeat(constants6.BITS - this.subnetMask)}`);
	    }
	    /**
	     * The first address in the range given by this address' subnet
	     * Often referred to as the Network Address.
	     * @memberof Address6
	     * @instance
	     * @returns {Address6}
	     */
	    startAddress() {
	        return Address6.fromBigInt(this._startAddress());
	    }
	    /**
	     * The first host address in the range given by this address's subnet ie
	     * the first address after the Network Address
	     * @memberof Address6
	     * @instance
	     * @returns {Address6}
	     */
	    startAddressExclusive() {
	        const adjust = BigInt('1');
	        return Address6.fromBigInt(this._startAddress() + adjust);
	    }
	    /**
	     * Helper function getting end address.
	     * @memberof Address6
	     * @instance
	     * @returns {bigint}
	     */
	    _endAddress() {
	        return BigInt(`0b${this.mask() + '1'.repeat(constants6.BITS - this.subnetMask)}`);
	    }
	    /**
	     * The last address in the range given by this address' subnet
	     * Often referred to as the Broadcast
	     * @memberof Address6
	     * @instance
	     * @returns {Address6}
	     */
	    endAddress() {
	        return Address6.fromBigInt(this._endAddress());
	    }
	    /**
	     * The last host address in the range given by this address's subnet ie
	     * the last address prior to the Broadcast Address
	     * @memberof Address6
	     * @instance
	     * @returns {Address6}
	     */
	    endAddressExclusive() {
	        const adjust = BigInt('1');
	        return Address6.fromBigInt(this._endAddress() - adjust);
	    }
	    /**
	     * Return the scope of the address
	     * @memberof Address6
	     * @instance
	     * @returns {String}
	     */
	    getScope() {
	        let scope = constants6.SCOPES[parseInt(this.getBits(12, 16).toString(10), 10)];
	        if (this.getType() === 'Global unicast' && scope !== 'Link local') {
	            scope = 'Global';
	        }
	        return scope || 'Unknown';
	    }
	    /**
	     * Return the type of the address
	     * @memberof Address6
	     * @instance
	     * @returns {String}
	     */
	    getType() {
	        for (const subnet of Object.keys(constants6.TYPES)) {
	            if (this.isInSubnet(new Address6(subnet))) {
	                return constants6.TYPES[subnet];
	            }
	        }
	        return 'Global unicast';
	    }
	    /**
	     * Return the bits in the given range as a BigInt
	     * @memberof Address6
	     * @instance
	     * @returns {bigint}
	     */
	    getBits(start, end) {
	        return BigInt(`0b${this.getBitsBase2(start, end)}`);
	    }
	    /**
	     * Return the bits in the given range as a base-2 string
	     * @memberof Address6
	     * @instance
	     * @returns {String}
	     */
	    getBitsBase2(start, end) {
	        return this.binaryZeroPad().slice(start, end);
	    }
	    /**
	     * Return the bits in the given range as a base-16 string
	     * @memberof Address6
	     * @instance
	     * @returns {String}
	     */
	    getBitsBase16(start, end) {
	        const length = end - start;
	        if (length % 4 !== 0) {
	            throw new Error('Length of bits to retrieve must be divisible by four');
	        }
	        return this.getBits(start, end)
	            .toString(16)
	            .padStart(length / 4, '0');
	    }
	    /**
	     * Return the bits that are set past the subnet mask length
	     * @memberof Address6
	     * @instance
	     * @returns {String}
	     */
	    getBitsPastSubnet() {
	        return this.getBitsBase2(this.subnetMask, constants6.BITS);
	    }
	    /**
	     * Return the reversed ip6.arpa form of the address
	     * @memberof Address6
	     * @param {Object} options
	     * @param {boolean} options.omitSuffix - omit the "ip6.arpa" suffix
	     * @instance
	     * @returns {String}
	     */
	    reverseForm(options) {
	        if (!options) {
	            options = {};
	        }
	        const characters = Math.floor(this.subnetMask / 4);
	        const reversed = this.canonicalForm()
	            .replace(/:/g, '')
	            .split('')
	            .slice(0, characters)
	            .reverse()
	            .join('.');
	        if (characters > 0) {
	            if (options.omitSuffix) {
	                return reversed;
	            }
	            return `${reversed}.ip6.arpa.`;
	        }
	        if (options.omitSuffix) {
	            return '';
	        }
	        return 'ip6.arpa.';
	    }
	    /**
	     * Return the correct form of the address
	     * @memberof Address6
	     * @instance
	     * @returns {String}
	     */
	    correctForm() {
	        let i;
	        let groups = [];
	        let zeroCounter = 0;
	        const zeroes = [];
	        for (i = 0; i < this.parsedAddress.length; i++) {
	            const value = parseInt(this.parsedAddress[i], 16);
	            if (value === 0) {
	                zeroCounter++;
	            }
	            if (value !== 0 && zeroCounter > 0) {
	                if (zeroCounter > 1) {
	                    zeroes.push([i - zeroCounter, i - 1]);
	                }
	                zeroCounter = 0;
	            }
	        }
	        // Do we end with a string of zeroes?
	        if (zeroCounter > 1) {
	            zeroes.push([this.parsedAddress.length - zeroCounter, this.parsedAddress.length - 1]);
	        }
	        const zeroLengths = zeroes.map((n) => n[1] - n[0] + 1);
	        if (zeroes.length > 0) {
	            const index = zeroLengths.indexOf(Math.max(...zeroLengths));
	            groups = compact(this.parsedAddress, zeroes[index]);
	        }
	        else {
	            groups = this.parsedAddress;
	        }
	        for (i = 0; i < groups.length; i++) {
	            if (groups[i] !== 'compact') {
	                groups[i] = parseInt(groups[i], 16).toString(16);
	            }
	        }
	        let correct = groups.join(':');
	        correct = correct.replace(/^compact$/, '::');
	        correct = correct.replace(/(^compact)|(compact$)/, ':');
	        correct = correct.replace(/compact/, '');
	        return correct;
	    }
	    /**
	     * Return a zero-padded base-2 string representation of the address
	     * @memberof Address6
	     * @instance
	     * @returns {String}
	     * @example
	     * var address = new Address6('2001:4860:4001:803::1011');
	     * address.binaryZeroPad();
	     * // '0010000000000001010010000110000001000000000000010000100000000011
	     * //  0000000000000000000000000000000000000000000000000001000000010001'
	     */
	    binaryZeroPad() {
	        return this.bigInt().toString(2).padStart(constants6.BITS, '0');
	    }
	    // TODO: Improve the semantics of this helper function
	    parse4in6(address) {
	        const groups = address.split(':');
	        const lastGroup = groups.slice(-1)[0];
	        const address4 = lastGroup.match(constants4.RE_ADDRESS);
	        if (address4) {
	            this.parsedAddress4 = address4[0];
	            this.address4 = new ipv4_1.Address4(this.parsedAddress4);
	            for (let i = 0; i < this.address4.groups; i++) {
	                if (/^0[0-9]+/.test(this.address4.parsedAddress[i])) {
	                    throw new address_error_1.AddressError("IPv4 addresses can't have leading zeroes.", address.replace(constants4.RE_ADDRESS, this.address4.parsedAddress.map(spanLeadingZeroes4).join('.')));
	                }
	            }
	            this.v4 = true;
	            groups[groups.length - 1] = this.address4.toGroup6();
	            address = groups.join(':');
	        }
	        return address;
	    }
	    // TODO: Make private?
	    parse(address) {
	        address = this.parse4in6(address);
	        const badCharacters = address.match(constants6.RE_BAD_CHARACTERS);
	        if (badCharacters) {
	            throw new address_error_1.AddressError(`Bad character${badCharacters.length > 1 ? 's' : ''} detected in address: ${badCharacters.join('')}`, address.replace(constants6.RE_BAD_CHARACTERS, '<span class="parse-error">$1</span>'));
	        }
	        const badAddress = address.match(constants6.RE_BAD_ADDRESS);
	        if (badAddress) {
	            throw new address_error_1.AddressError(`Address failed regex: ${badAddress.join('')}`, address.replace(constants6.RE_BAD_ADDRESS, '<span class="parse-error">$1</span>'));
	        }
	        let groups = [];
	        const halves = address.split('::');
	        if (halves.length === 2) {
	            let first = halves[0].split(':');
	            let last = halves[1].split(':');
	            if (first.length === 1 && first[0] === '') {
	                first = [];
	            }
	            if (last.length === 1 && last[0] === '') {
	                last = [];
	            }
	            const remaining = this.groups - (first.length + last.length);
	            if (!remaining) {
	                throw new address_error_1.AddressError('Error parsing groups');
	            }
	            this.elidedGroups = remaining;
	            this.elisionBegin = first.length;
	            this.elisionEnd = first.length + this.elidedGroups;
	            groups = groups.concat(first);
	            for (let i = 0; i < remaining; i++) {
	                groups.push('0');
	            }
	            groups = groups.concat(last);
	        }
	        else if (halves.length === 1) {
	            groups = address.split(':');
	            this.elidedGroups = 0;
	        }
	        else {
	            throw new address_error_1.AddressError('Too many :: groups found');
	        }
	        groups = groups.map((group) => parseInt(group, 16).toString(16));
	        if (groups.length !== this.groups) {
	            throw new address_error_1.AddressError('Incorrect number of groups found');
	        }
	        return groups;
	    }
	    /**
	     * Return the canonical form of the address
	     * @memberof Address6
	     * @instance
	     * @returns {String}
	     */
	    canonicalForm() {
	        return this.parsedAddress.map(paddedHex).join(':');
	    }
	    /**
	     * Return the decimal form of the address
	     * @memberof Address6
	     * @instance
	     * @returns {String}
	     */
	    decimal() {
	        return this.parsedAddress.map((n) => parseInt(n, 16).toString(10).padStart(5, '0')).join(':');
	    }
	    /**
	     * Return the address as a BigInt
	     * @memberof Address6
	     * @instance
	     * @returns {bigint}
	     */
	    bigInt() {
	        return BigInt(`0x${this.parsedAddress.map(paddedHex).join('')}`);
	    }
	    /**
	     * Return the last two groups of this address as an IPv4 address string
	     * @memberof Address6
	     * @instance
	     * @returns {Address4}
	     * @example
	     * var address = new Address6('2001:4860:4001::1825:bf11');
	     * address.to4().correctForm(); // '24.37.191.17'
	     */
	    to4() {
	        const binary = this.binaryZeroPad().split('');
	        return ipv4_1.Address4.fromHex(BigInt(`0b${binary.slice(96, 128).join('')}`).toString(16));
	    }
	    /**
	     * Return the v4-in-v6 form of the address
	     * @memberof Address6
	     * @instance
	     * @returns {String}
	     */
	    to4in6() {
	        const address4 = this.to4();
	        const address6 = new Address6(this.parsedAddress.slice(0, 6).join(':'), 6);
	        const correct = address6.correctForm();
	        let infix = '';
	        if (!/:$/.test(correct)) {
	            infix = ':';
	        }
	        return correct + infix + address4.address;
	    }
	    /**
	     * Return an object containing the Teredo properties of the address
	     * @memberof Address6
	     * @instance
	     * @returns {Object}
	     */
	    inspectTeredo() {
	        /*
	        - Bits 0 to 31 are set to the Teredo prefix (normally 2001:0000::/32).
	        - Bits 32 to 63 embed the primary IPv4 address of the Teredo server that
	          is used.
	        - Bits 64 to 79 can be used to define some flags. Currently only the
	          higher order bit is used; it is set to 1 if the Teredo client is
	          located behind a cone NAT, 0 otherwise. For Microsoft's Windows Vista
	          and Windows Server 2008 implementations, more bits are used. In those
	          implementations, the format for these 16 bits is "CRAAAAUG AAAAAAAA",
	          where "C" remains the "Cone" flag. The "R" bit is reserved for future
	          use. The "U" bit is for the Universal/Local flag (set to 0). The "G" bit
	          is Individual/Group flag (set to 0). The A bits are set to a 12-bit
	          randomly generated number chosen by the Teredo client to introduce
	          additional protection for the Teredo node against IPv6-based scanning
	          attacks.
	        - Bits 80 to 95 contains the obfuscated UDP port number. This is the
	          port number that is mapped by the NAT to the Teredo client with all
	          bits inverted.
	        - Bits 96 to 127 contains the obfuscated IPv4 address. This is the
	          public IPv4 address of the NAT with all bits inverted.
	        */
	        const prefix = this.getBitsBase16(0, 32);
	        const bitsForUdpPort = this.getBits(80, 96);
	        // eslint-disable-next-line no-bitwise
	        const udpPort = (bitsForUdpPort ^ BigInt('0xffff')).toString();
	        const server4 = ipv4_1.Address4.fromHex(this.getBitsBase16(32, 64));
	        const bitsForClient4 = this.getBits(96, 128);
	        // eslint-disable-next-line no-bitwise
	        const client4 = ipv4_1.Address4.fromHex((bitsForClient4 ^ BigInt('0xffffffff')).toString(16));
	        const flagsBase2 = this.getBitsBase2(64, 80);
	        const coneNat = (0, common_1.testBit)(flagsBase2, 15);
	        const reserved = (0, common_1.testBit)(flagsBase2, 14);
	        const groupIndividual = (0, common_1.testBit)(flagsBase2, 8);
	        const universalLocal = (0, common_1.testBit)(flagsBase2, 9);
	        const nonce = BigInt(`0b${flagsBase2.slice(2, 6) + flagsBase2.slice(8, 16)}`).toString(10);
	        return {
	            prefix: `${prefix.slice(0, 4)}:${prefix.slice(4, 8)}`,
	            server4: server4.address,
	            client4: client4.address,
	            flags: flagsBase2,
	            coneNat,
	            microsoft: {
	                reserved,
	                universalLocal,
	                groupIndividual,
	                nonce,
	            },
	            udpPort,
	        };
	    }
	    /**
	     * Return an object containing the 6to4 properties of the address
	     * @memberof Address6
	     * @instance
	     * @returns {Object}
	     */
	    inspect6to4() {
	        /*
	        - Bits 0 to 15 are set to the 6to4 prefix (2002::/16).
	        - Bits 16 to 48 embed the IPv4 address of the 6to4 gateway that is used.
	        */
	        const prefix = this.getBitsBase16(0, 16);
	        const gateway = ipv4_1.Address4.fromHex(this.getBitsBase16(16, 48));
	        return {
	            prefix: prefix.slice(0, 4),
	            gateway: gateway.address,
	        };
	    }
	    /**
	     * Return a v6 6to4 address from a v6 v4inv6 address
	     * @memberof Address6
	     * @instance
	     * @returns {Address6}
	     */
	    to6to4() {
	        if (!this.is4()) {
	            return null;
	        }
	        const addr6to4 = [
	            '2002',
	            this.getBitsBase16(96, 112),
	            this.getBitsBase16(112, 128),
	            '',
	            '/16',
	        ].join(':');
	        return new Address6(addr6to4);
	    }
	    /**
	     * Return a byte array
	     * @memberof Address6
	     * @instance
	     * @returns {Array}
	     */
	    toByteArray() {
	        const valueWithoutPadding = this.bigInt().toString(16);
	        const leadingPad = '0'.repeat(valueWithoutPadding.length % 2);
	        const value = `${leadingPad}${valueWithoutPadding}`;
	        const bytes = [];
	        for (let i = 0, length = value.length; i < length; i += 2) {
	            bytes.push(parseInt(value.substring(i, i + 2), 16));
	        }
	        return bytes;
	    }
	    /**
	     * Return an unsigned byte array
	     * @memberof Address6
	     * @instance
	     * @returns {Array}
	     */
	    toUnsignedByteArray() {
	        return this.toByteArray().map(unsignByte);
	    }
	    /**
	     * Convert a byte array to an Address6 object
	     * @memberof Address6
	     * @static
	     * @returns {Address6}
	     */
	    static fromByteArray(bytes) {
	        return this.fromUnsignedByteArray(bytes.map(unsignByte));
	    }
	    /**
	     * Convert an unsigned byte array to an Address6 object
	     * @memberof Address6
	     * @static
	     * @returns {Address6}
	     */
	    static fromUnsignedByteArray(bytes) {
	        const BYTE_MAX = BigInt('256');
	        let result = BigInt('0');
	        let multiplier = BigInt('1');
	        for (let i = bytes.length - 1; i >= 0; i--) {
	            result += multiplier * BigInt(bytes[i].toString(10));
	            multiplier *= BYTE_MAX;
	        }
	        return Address6.fromBigInt(result);
	    }
	    /**
	     * Returns true if the address is in the canonical form, false otherwise
	     * @memberof Address6
	     * @instance
	     * @returns {boolean}
	     */
	    isCanonical() {
	        return this.addressMinusSuffix === this.canonicalForm();
	    }
	    /**
	     * Returns true if the address is a link local address, false otherwise
	     * @memberof Address6
	     * @instance
	     * @returns {boolean}
	     */
	    isLinkLocal() {
	        // Zeroes are required, i.e. we can't check isInSubnet with 'fe80::/10'
	        if (this.getBitsBase2(0, 64) ===
	            '1111111010000000000000000000000000000000000000000000000000000000') {
	            return true;
	        }
	        return false;
	    }
	    /**
	     * Returns true if the address is a multicast address, false otherwise
	     * @memberof Address6
	     * @instance
	     * @returns {boolean}
	     */
	    isMulticast() {
	        return this.getType() === 'Multicast';
	    }
	    /**
	     * Returns true if the address is a v4-in-v6 address, false otherwise
	     * @memberof Address6
	     * @instance
	     * @returns {boolean}
	     */
	    is4() {
	        return this.v4;
	    }
	    /**
	     * Returns true if the address is a Teredo address, false otherwise
	     * @memberof Address6
	     * @instance
	     * @returns {boolean}
	     */
	    isTeredo() {
	        return this.isInSubnet(new Address6('2001::/32'));
	    }
	    /**
	     * Returns true if the address is a 6to4 address, false otherwise
	     * @memberof Address6
	     * @instance
	     * @returns {boolean}
	     */
	    is6to4() {
	        return this.isInSubnet(new Address6('2002::/16'));
	    }
	    /**
	     * Returns true if the address is a loopback address, false otherwise
	     * @memberof Address6
	     * @instance
	     * @returns {boolean}
	     */
	    isLoopback() {
	        return this.getType() === 'Loopback';
	    }
	    // #endregion
	    // #region HTML
	    /**
	     * @returns {String} the address in link form with a default port of 80
	     */
	    href(optionalPort) {
	        if (optionalPort === undefined) {
	            optionalPort = '';
	        }
	        else {
	            optionalPort = `:${optionalPort}`;
	        }
	        return `http://[${this.correctForm()}]${optionalPort}/`;
	    }
	    /**
	     * @returns {String} a link suitable for conveying the address via a URL hash
	     */
	    link(options) {
	        if (!options) {
	            options = {};
	        }
	        if (options.className === undefined) {
	            options.className = '';
	        }
	        if (options.prefix === undefined) {
	            options.prefix = '/#address=';
	        }
	        if (options.v4 === undefined) {
	            options.v4 = false;
	        }
	        let formFunction = this.correctForm;
	        if (options.v4) {
	            formFunction = this.to4in6;
	        }
	        const form = formFunction.call(this);
	        if (options.className) {
	            return `<a href="${options.prefix}${form}" class="${options.className}">${form}</a>`;
	        }
	        return `<a href="${options.prefix}${form}">${form}</a>`;
	    }
	    /**
	     * Groups an address
	     * @returns {String}
	     */
	    group() {
	        if (this.elidedGroups === 0) {
	            // The simple case
	            return helpers.simpleGroup(this.address).join(':');
	        }
	        assert(typeof this.elidedGroups === 'number');
	        assert(typeof this.elisionBegin === 'number');
	        // The elided case
	        const output = [];
	        const [left, right] = this.address.split('::');
	        if (left.length) {
	            output.push(...helpers.simpleGroup(left));
	        }
	        else {
	            output.push('');
	        }
	        const classes = ['hover-group'];
	        for (let i = this.elisionBegin; i < this.elisionBegin + this.elidedGroups; i++) {
	            classes.push(`group-${i}`);
	        }
	        output.push(`<span class="${classes.join(' ')}"></span>`);
	        if (right.length) {
	            output.push(...helpers.simpleGroup(right, this.elisionEnd));
	        }
	        else {
	            output.push('');
	        }
	        if (this.is4()) {
	            assert(this.address4 instanceof ipv4_1.Address4);
	            output.pop();
	            output.push(this.address4.groupForV6());
	        }
	        return output.join(':');
	    }
	    // #endregion
	    // #region Regular expressions
	    /**
	     * Generate a regular expression string that can be used to find or validate
	     * all variations of this address
	     * @memberof Address6
	     * @instance
	     * @param {boolean} substringSearch
	     * @returns {string}
	     */
	    regularExpressionString(substringSearch = false) {
	        let output = [];
	        // TODO: revisit why this is necessary
	        const address6 = new Address6(this.correctForm());
	        if (address6.elidedGroups === 0) {
	            // The simple case
	            output.push((0, regular_expressions_1.simpleRegularExpression)(address6.parsedAddress));
	        }
	        else if (address6.elidedGroups === constants6.GROUPS) {
	            // A completely elided address
	            output.push((0, regular_expressions_1.possibleElisions)(constants6.GROUPS));
	        }
	        else {
	            // A partially elided address
	            const halves = address6.address.split('::');
	            if (halves[0].length) {
	                output.push((0, regular_expressions_1.simpleRegularExpression)(halves[0].split(':')));
	            }
	            assert(typeof address6.elidedGroups === 'number');
	            output.push((0, regular_expressions_1.possibleElisions)(address6.elidedGroups, halves[0].length !== 0, halves[1].length !== 0));
	            if (halves[1].length) {
	                output.push((0, regular_expressions_1.simpleRegularExpression)(halves[1].split(':')));
	            }
	            output = [output.join(':')];
	        }
	        if (!substringSearch) {
	            output = [
	                '(?=^|',
	                regular_expressions_1.ADDRESS_BOUNDARY,
	                '|[^\\w\\:])(',
	                ...output,
	                ')(?=[^\\w\\:]|',
	                regular_expressions_1.ADDRESS_BOUNDARY,
	                '|$)',
	            ];
	        }
	        return output.join('');
	    }
	    /**
	     * Generate a regular expression that can be used to find or validate all
	     * variations of this address.
	     * @memberof Address6
	     * @instance
	     * @param {boolean} substringSearch
	     * @returns {RegExp}
	     */
	    regularExpression(substringSearch = false) {
	        return new RegExp(this.regularExpressionString(substringSearch), 'i');
	    }
	}
	ipv6.Address6 = Address6;
	
	return ipv6;
}

var hasRequiredIpAddress;

function requireIpAddress () {
	if (hasRequiredIpAddress) return ipAddress;
	hasRequiredIpAddress = 1;
	(function (exports$1) {
		var __createBinding = (ipAddress && ipAddress.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __setModuleDefault = (ipAddress && ipAddress.__setModuleDefault) || (Object.create ? (function(o, v) {
		    Object.defineProperty(o, "default", { enumerable: true, value: v });
		}) : function(o, v) {
		    o["default"] = v;
		});
		var __importStar = (ipAddress && ipAddress.__importStar) || function (mod) {
		    if (mod && mod.__esModule) return mod;
		    var result = {};
		    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		    __setModuleDefault(result, mod);
		    return result;
		};
		Object.defineProperty(exports$1, "__esModule", { value: true });
		exports$1.v6 = exports$1.AddressError = exports$1.Address6 = exports$1.Address4 = void 0;
		var ipv4_1 = requireIpv4();
		Object.defineProperty(exports$1, "Address4", { enumerable: true, get: function () { return ipv4_1.Address4; } });
		var ipv6_1 = requireIpv6();
		Object.defineProperty(exports$1, "Address6", { enumerable: true, get: function () { return ipv6_1.Address6; } });
		var address_error_1 = requireAddressError();
		Object.defineProperty(exports$1, "AddressError", { enumerable: true, get: function () { return address_error_1.AddressError; } });
		const helpers = __importStar(requireHelpers$1());
		exports$1.v6 = { helpers };
		
	} (ipAddress));
	return ipAddress;
}

var hasRequiredHelpers;

function requireHelpers () {
	if (hasRequiredHelpers) return helpers$1;
	hasRequiredHelpers = 1;
	Object.defineProperty(helpers$1, "__esModule", { value: true });
	helpers$1.ipToBuffer = helpers$1.int32ToIpv4 = helpers$1.ipv4ToInt32 = helpers$1.validateSocksClientChainOptions = helpers$1.validateSocksClientOptions = void 0;
	const util_1 = requireUtil();
	const constants_1 = requireConstants$2();
	const stream = require$$0$2;
	const ip_address_1 = requireIpAddress();
	const net = require$$0$3;
	/**
	 * Validates the provided SocksClientOptions
	 * @param options { SocksClientOptions }
	 * @param acceptedCommands { string[] } A list of accepted SocksProxy commands.
	 */
	function validateSocksClientOptions(options, acceptedCommands = ['connect', 'bind', 'associate']) {
	    // Check SOCKs command option.
	    if (!constants_1.SocksCommand[options.command]) {
	        throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksCommand, options);
	    }
	    // Check SocksCommand for acceptable command.
	    if (acceptedCommands.indexOf(options.command) === -1) {
	        throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksCommandForOperation, options);
	    }
	    // Check destination
	    if (!isValidSocksRemoteHost(options.destination)) {
	        throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsDestination, options);
	    }
	    // Check SOCKS proxy to use
	    if (!isValidSocksProxy(options.proxy)) {
	        throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsProxy, options);
	    }
	    // Validate custom auth (if set)
	    validateCustomProxyAuth(options.proxy, options);
	    // Check timeout
	    if (options.timeout && !isValidTimeoutValue(options.timeout)) {
	        throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsTimeout, options);
	    }
	    // Check existing_socket (if provided)
	    if (options.existing_socket &&
	        !(options.existing_socket instanceof stream.Duplex)) {
	        throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsExistingSocket, options);
	    }
	}
	helpers$1.validateSocksClientOptions = validateSocksClientOptions;
	/**
	 * Validates the SocksClientChainOptions
	 * @param options { SocksClientChainOptions }
	 */
	function validateSocksClientChainOptions(options) {
	    // Only connect is supported when chaining.
	    if (options.command !== 'connect') {
	        throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksCommandChain, options);
	    }
	    // Check destination
	    if (!isValidSocksRemoteHost(options.destination)) {
	        throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsDestination, options);
	    }
	    // Validate proxies (length)
	    if (!(options.proxies &&
	        Array.isArray(options.proxies) &&
	        options.proxies.length >= 2)) {
	        throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsProxiesLength, options);
	    }
	    // Validate proxies
	    options.proxies.forEach((proxy) => {
	        if (!isValidSocksProxy(proxy)) {
	            throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsProxy, options);
	        }
	        // Validate custom auth (if set)
	        validateCustomProxyAuth(proxy, options);
	    });
	    // Check timeout
	    if (options.timeout && !isValidTimeoutValue(options.timeout)) {
	        throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsTimeout, options);
	    }
	}
	helpers$1.validateSocksClientChainOptions = validateSocksClientChainOptions;
	function validateCustomProxyAuth(proxy, options) {
	    if (proxy.custom_auth_method !== undefined) {
	        // Invalid auth method range
	        if (proxy.custom_auth_method < constants_1.SOCKS5_CUSTOM_AUTH_START ||
	            proxy.custom_auth_method > constants_1.SOCKS5_CUSTOM_AUTH_END) {
	            throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsCustomAuthRange, options);
	        }
	        // Missing custom_auth_request_handler
	        if (proxy.custom_auth_request_handler === undefined ||
	            typeof proxy.custom_auth_request_handler !== 'function') {
	            throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsCustomAuthOptions, options);
	        }
	        // Missing custom_auth_response_size
	        if (proxy.custom_auth_response_size === undefined) {
	            throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsCustomAuthOptions, options);
	        }
	        // Missing/invalid custom_auth_response_handler
	        if (proxy.custom_auth_response_handler === undefined ||
	            typeof proxy.custom_auth_response_handler !== 'function') {
	            throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsCustomAuthOptions, options);
	        }
	    }
	}
	/**
	 * Validates a SocksRemoteHost
	 * @param remoteHost { SocksRemoteHost }
	 */
	function isValidSocksRemoteHost(remoteHost) {
	    return (remoteHost &&
	        typeof remoteHost.host === 'string' &&
	        Buffer.byteLength(remoteHost.host) < 256 &&
	        typeof remoteHost.port === 'number' &&
	        remoteHost.port >= 0 &&
	        remoteHost.port <= 65535);
	}
	/**
	 * Validates a SocksProxy
	 * @param proxy { SocksProxy }
	 */
	function isValidSocksProxy(proxy) {
	    return (proxy &&
	        (typeof proxy.host === 'string' || typeof proxy.ipaddress === 'string') &&
	        typeof proxy.port === 'number' &&
	        proxy.port >= 0 &&
	        proxy.port <= 65535 &&
	        (proxy.type === 4 || proxy.type === 5));
	}
	/**
	 * Validates a timeout value.
	 * @param value { Number }
	 */
	function isValidTimeoutValue(value) {
	    return typeof value === 'number' && value > 0;
	}
	function ipv4ToInt32(ip) {
	    const address = new ip_address_1.Address4(ip);
	    // Convert the IPv4 address parts to an integer
	    return address.toArray().reduce((acc, part) => (acc << 8) + part, 0) >>> 0;
	}
	helpers$1.ipv4ToInt32 = ipv4ToInt32;
	function int32ToIpv4(int32) {
	    // Extract each byte (octet) from the 32-bit integer
	    const octet1 = (int32 >>> 24) & 0xff;
	    const octet2 = (int32 >>> 16) & 0xff;
	    const octet3 = (int32 >>> 8) & 0xff;
	    const octet4 = int32 & 0xff;
	    // Combine the octets into a string in IPv4 format
	    return [octet1, octet2, octet3, octet4].join('.');
	}
	helpers$1.int32ToIpv4 = int32ToIpv4;
	function ipToBuffer(ip) {
	    if (net.isIPv4(ip)) {
	        // Handle IPv4 addresses
	        const address = new ip_address_1.Address4(ip);
	        return Buffer.from(address.toArray());
	    }
	    else if (net.isIPv6(ip)) {
	        // Handle IPv6 addresses
	        const address = new ip_address_1.Address6(ip);
	        return Buffer.from(address
	            .canonicalForm()
	            .split(':')
	            .map((segment) => segment.padStart(4, '0'))
	            .join(''), 'hex');
	    }
	    else {
	        throw new Error('Invalid IP address format');
	    }
	}
	helpers$1.ipToBuffer = ipToBuffer;
	
	return helpers$1;
}

var receivebuffer = {};

var hasRequiredReceivebuffer;

function requireReceivebuffer () {
	if (hasRequiredReceivebuffer) return receivebuffer;
	hasRequiredReceivebuffer = 1;
	Object.defineProperty(receivebuffer, "__esModule", { value: true });
	receivebuffer.ReceiveBuffer = void 0;
	class ReceiveBuffer {
	    constructor(size = 4096) {
	        this.buffer = Buffer.allocUnsafe(size);
	        this.offset = 0;
	        this.originalSize = size;
	    }
	    get length() {
	        return this.offset;
	    }
	    append(data) {
	        if (!Buffer.isBuffer(data)) {
	            throw new Error('Attempted to append a non-buffer instance to ReceiveBuffer.');
	        }
	        if (this.offset + data.length >= this.buffer.length) {
	            const tmp = this.buffer;
	            this.buffer = Buffer.allocUnsafe(Math.max(this.buffer.length + this.originalSize, this.buffer.length + data.length));
	            tmp.copy(this.buffer);
	        }
	        data.copy(this.buffer, this.offset);
	        return (this.offset += data.length);
	    }
	    peek(length) {
	        if (length > this.offset) {
	            throw new Error('Attempted to read beyond the bounds of the managed internal data.');
	        }
	        return this.buffer.slice(0, length);
	    }
	    get(length) {
	        if (length > this.offset) {
	            throw new Error('Attempted to read beyond the bounds of the managed internal data.');
	        }
	        const value = Buffer.allocUnsafe(length);
	        this.buffer.slice(0, length).copy(value);
	        this.buffer.copyWithin(0, length, length + this.offset - length);
	        this.offset -= length;
	        return value;
	    }
	}
	receivebuffer.ReceiveBuffer = ReceiveBuffer;
	
	return receivebuffer;
}

var hasRequiredSocksclient;

function requireSocksclient () {
	if (hasRequiredSocksclient) return socksclient;
	hasRequiredSocksclient = 1;
	(function (exports$1) {
		var __awaiter = (socksclient && socksclient.__awaiter) || function (thisArg, _arguments, P, generator) {
		    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
		    return new (P || (P = Promise))(function (resolve, reject) {
		        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
		        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
		        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
		        step((generator = generator.apply(thisArg, _arguments || [])).next());
		    });
		};
		Object.defineProperty(exports$1, "__esModule", { value: true });
		exports$1.SocksClientError = exports$1.SocksClient = void 0;
		const events_1 = require$$0$5;
		const net = require$$0$3;
		const smart_buffer_1 = requireSmartbuffer();
		const constants_1 = requireConstants$2();
		const helpers_1 = requireHelpers();
		const receivebuffer_1 = requireReceivebuffer();
		const util_1 = requireUtil();
		Object.defineProperty(exports$1, "SocksClientError", { enumerable: true, get: function () { return util_1.SocksClientError; } });
		const ip_address_1 = requireIpAddress();
		class SocksClient extends events_1.EventEmitter {
		    constructor(options) {
		        super();
		        this.options = Object.assign({}, options);
		        // Validate SocksClientOptions
		        (0, helpers_1.validateSocksClientOptions)(options);
		        // Default state
		        this.setState(constants_1.SocksClientState.Created);
		    }
		    /**
		     * Creates a new SOCKS connection.
		     *
		     * Note: Supports callbacks and promises. Only supports the connect command.
		     * @param options { SocksClientOptions } Options.
		     * @param callback { Function } An optional callback function.
		     * @returns { Promise }
		     */
		    static createConnection(options, callback) {
		        return new Promise((resolve, reject) => {
		            // Validate SocksClientOptions
		            try {
		                (0, helpers_1.validateSocksClientOptions)(options, ['connect']);
		            }
		            catch (err) {
		                if (typeof callback === 'function') {
		                    callback(err);
		                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
		                    return resolve(err); // Resolves pending promise (prevents memory leaks).
		                }
		                else {
		                    return reject(err);
		                }
		            }
		            const client = new SocksClient(options);
		            client.connect(options.existing_socket);
		            client.once('established', (info) => {
		                client.removeAllListeners();
		                if (typeof callback === 'function') {
		                    callback(null, info);
		                    resolve(info); // Resolves pending promise (prevents memory leaks).
		                }
		                else {
		                    resolve(info);
		                }
		            });
		            // Error occurred, failed to establish connection.
		            client.once('error', (err) => {
		                client.removeAllListeners();
		                if (typeof callback === 'function') {
		                    callback(err);
		                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
		                    resolve(err); // Resolves pending promise (prevents memory leaks).
		                }
		                else {
		                    reject(err);
		                }
		            });
		        });
		    }
		    /**
		     * Creates a new SOCKS connection chain to a destination host through 2 or more SOCKS proxies.
		     *
		     * Note: Supports callbacks and promises. Only supports the connect method.
		     * Note: Implemented via createConnection() factory function.
		     * @param options { SocksClientChainOptions } Options
		     * @param callback { Function } An optional callback function.
		     * @returns { Promise }
		     */
		    static createConnectionChain(options, callback) {
		        // eslint-disable-next-line no-async-promise-executor
		        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
		            // Validate SocksClientChainOptions
		            try {
		                (0, helpers_1.validateSocksClientChainOptions)(options);
		            }
		            catch (err) {
		                if (typeof callback === 'function') {
		                    callback(err);
		                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
		                    return resolve(err); // Resolves pending promise (prevents memory leaks).
		                }
		                else {
		                    return reject(err);
		                }
		            }
		            // Shuffle proxies
		            if (options.randomizeChain) {
		                (0, util_1.shuffleArray)(options.proxies);
		            }
		            try {
		                let sock;
		                for (let i = 0; i < options.proxies.length; i++) {
		                    const nextProxy = options.proxies[i];
		                    // If we've reached the last proxy in the chain, the destination is the actual destination, otherwise it's the next proxy.
		                    const nextDestination = i === options.proxies.length - 1
		                        ? options.destination
		                        : {
		                            host: options.proxies[i + 1].host ||
		                                options.proxies[i + 1].ipaddress,
		                            port: options.proxies[i + 1].port,
		                        };
		                    // Creates the next connection in the chain.
		                    const result = yield SocksClient.createConnection({
		                        command: 'connect',
		                        proxy: nextProxy,
		                        destination: nextDestination,
		                        existing_socket: sock,
		                    });
		                    // If sock is undefined, assign it here.
		                    sock = sock || result.socket;
		                }
		                if (typeof callback === 'function') {
		                    callback(null, { socket: sock });
		                    resolve({ socket: sock }); // Resolves pending promise (prevents memory leaks).
		                }
		                else {
		                    resolve({ socket: sock });
		                }
		            }
		            catch (err) {
		                if (typeof callback === 'function') {
		                    callback(err);
		                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
		                    resolve(err); // Resolves pending promise (prevents memory leaks).
		                }
		                else {
		                    reject(err);
		                }
		            }
		        }));
		    }
		    /**
		     * Creates a SOCKS UDP Frame.
		     * @param options
		     */
		    static createUDPFrame(options) {
		        const buff = new smart_buffer_1.SmartBuffer();
		        buff.writeUInt16BE(0);
		        buff.writeUInt8(options.frameNumber || 0);
		        // IPv4/IPv6/Hostname
		        if (net.isIPv4(options.remoteHost.host)) {
		            buff.writeUInt8(constants_1.Socks5HostType.IPv4);
		            buff.writeUInt32BE((0, helpers_1.ipv4ToInt32)(options.remoteHost.host));
		        }
		        else if (net.isIPv6(options.remoteHost.host)) {
		            buff.writeUInt8(constants_1.Socks5HostType.IPv6);
		            buff.writeBuffer((0, helpers_1.ipToBuffer)(options.remoteHost.host));
		        }
		        else {
		            buff.writeUInt8(constants_1.Socks5HostType.Hostname);
		            buff.writeUInt8(Buffer.byteLength(options.remoteHost.host));
		            buff.writeString(options.remoteHost.host);
		        }
		        // Port
		        buff.writeUInt16BE(options.remoteHost.port);
		        // Data
		        buff.writeBuffer(options.data);
		        return buff.toBuffer();
		    }
		    /**
		     * Parses a SOCKS UDP frame.
		     * @param data
		     */
		    static parseUDPFrame(data) {
		        const buff = smart_buffer_1.SmartBuffer.fromBuffer(data);
		        buff.readOffset = 2;
		        const frameNumber = buff.readUInt8();
		        const hostType = buff.readUInt8();
		        let remoteHost;
		        if (hostType === constants_1.Socks5HostType.IPv4) {
		            remoteHost = (0, helpers_1.int32ToIpv4)(buff.readUInt32BE());
		        }
		        else if (hostType === constants_1.Socks5HostType.IPv6) {
		            remoteHost = ip_address_1.Address6.fromByteArray(Array.from(buff.readBuffer(16))).canonicalForm();
		        }
		        else {
		            remoteHost = buff.readString(buff.readUInt8());
		        }
		        const remotePort = buff.readUInt16BE();
		        return {
		            frameNumber,
		            remoteHost: {
		                host: remoteHost,
		                port: remotePort,
		            },
		            data: buff.readBuffer(),
		        };
		    }
		    /**
		     * Internal state setter. If the SocksClient is in an error state, it cannot be changed to a non error state.
		     */
		    setState(newState) {
		        if (this.state !== constants_1.SocksClientState.Error) {
		            this.state = newState;
		        }
		    }
		    /**
		     * Starts the connection establishment to the proxy and destination.
		     * @param existingSocket Connected socket to use instead of creating a new one (internal use).
		     */
		    connect(existingSocket) {
		        this.onDataReceived = (data) => this.onDataReceivedHandler(data);
		        this.onClose = () => this.onCloseHandler();
		        this.onError = (err) => this.onErrorHandler(err);
		        this.onConnect = () => this.onConnectHandler();
		        // Start timeout timer (defaults to 30 seconds)
		        const timer = setTimeout(() => this.onEstablishedTimeout(), this.options.timeout || constants_1.DEFAULT_TIMEOUT);
		        // check whether unref is available as it differs from browser to NodeJS (#33)
		        if (timer.unref && typeof timer.unref === 'function') {
		            timer.unref();
		        }
		        // If an existing socket is provided, use it to negotiate SOCKS handshake. Otherwise create a new Socket.
		        if (existingSocket) {
		            this.socket = existingSocket;
		        }
		        else {
		            this.socket = new net.Socket();
		        }
		        // Attach Socket error handlers.
		        this.socket.once('close', this.onClose);
		        this.socket.once('error', this.onError);
		        this.socket.once('connect', this.onConnect);
		        this.socket.on('data', this.onDataReceived);
		        this.setState(constants_1.SocksClientState.Connecting);
		        this.receiveBuffer = new receivebuffer_1.ReceiveBuffer();
		        if (existingSocket) {
		            this.socket.emit('connect');
		        }
		        else {
		            this.socket.connect(this.getSocketOptions());
		            if (this.options.set_tcp_nodelay !== undefined &&
		                this.options.set_tcp_nodelay !== null) {
		                this.socket.setNoDelay(!!this.options.set_tcp_nodelay);
		            }
		        }
		        // Listen for established event so we can re-emit any excess data received during handshakes.
		        this.prependOnceListener('established', (info) => {
		            setImmediate(() => {
		                if (this.receiveBuffer.length > 0) {
		                    const excessData = this.receiveBuffer.get(this.receiveBuffer.length);
		                    info.socket.emit('data', excessData);
		                }
		                info.socket.resume();
		            });
		        });
		    }
		    // Socket options (defaults host/port to options.proxy.host/options.proxy.port)
		    getSocketOptions() {
		        return Object.assign(Object.assign({}, this.options.socket_options), { host: this.options.proxy.host || this.options.proxy.ipaddress, port: this.options.proxy.port });
		    }
		    /**
		     * Handles internal Socks timeout callback.
		     * Note: If the Socks client is not BoundWaitingForConnection or Established, the connection will be closed.
		     */
		    onEstablishedTimeout() {
		        if (this.state !== constants_1.SocksClientState.Established &&
		            this.state !== constants_1.SocksClientState.BoundWaitingForConnection) {
		            this.closeSocket(constants_1.ERRORS.ProxyConnectionTimedOut);
		        }
		    }
		    /**
		     * Handles Socket connect event.
		     */
		    onConnectHandler() {
		        this.setState(constants_1.SocksClientState.Connected);
		        // Send initial handshake.
		        if (this.options.proxy.type === 4) {
		            this.sendSocks4InitialHandshake();
		        }
		        else {
		            this.sendSocks5InitialHandshake();
		        }
		        this.setState(constants_1.SocksClientState.SentInitialHandshake);
		    }
		    /**
		     * Handles Socket data event.
		     * @param data
		     */
		    onDataReceivedHandler(data) {
		        /*
		          All received data is appended to a ReceiveBuffer.
		          This makes sure that all the data we need is received before we attempt to process it.
		        */
		        this.receiveBuffer.append(data);
		        // Process data that we have.
		        this.processData();
		    }
		    /**
		     * Handles processing of the data we have received.
		     */
		    processData() {
		        // If we have enough data to process the next step in the SOCKS handshake, proceed.
		        while (this.state !== constants_1.SocksClientState.Established &&
		            this.state !== constants_1.SocksClientState.Error &&
		            this.receiveBuffer.length >= this.nextRequiredPacketBufferSize) {
		            // Sent initial handshake, waiting for response.
		            if (this.state === constants_1.SocksClientState.SentInitialHandshake) {
		                if (this.options.proxy.type === 4) {
		                    // Socks v4 only has one handshake response.
		                    this.handleSocks4FinalHandshakeResponse();
		                }
		                else {
		                    // Socks v5 has two handshakes, handle initial one here.
		                    this.handleInitialSocks5HandshakeResponse();
		                }
		                // Sent auth request for Socks v5, waiting for response.
		            }
		            else if (this.state === constants_1.SocksClientState.SentAuthentication) {
		                this.handleInitialSocks5AuthenticationHandshakeResponse();
		                // Sent final Socks v5 handshake, waiting for final response.
		            }
		            else if (this.state === constants_1.SocksClientState.SentFinalHandshake) {
		                this.handleSocks5FinalHandshakeResponse();
		                // Socks BIND established. Waiting for remote connection via proxy.
		            }
		            else if (this.state === constants_1.SocksClientState.BoundWaitingForConnection) {
		                if (this.options.proxy.type === 4) {
		                    this.handleSocks4IncomingConnectionResponse();
		                }
		                else {
		                    this.handleSocks5IncomingConnectionResponse();
		                }
		            }
		            else {
		                this.closeSocket(constants_1.ERRORS.InternalError);
		                break;
		            }
		        }
		    }
		    /**
		     * Handles Socket close event.
		     * @param had_error
		     */
		    onCloseHandler() {
		        this.closeSocket(constants_1.ERRORS.SocketClosed);
		    }
		    /**
		     * Handles Socket error event.
		     * @param err
		     */
		    onErrorHandler(err) {
		        this.closeSocket(err.message);
		    }
		    /**
		     * Removes internal event listeners on the underlying Socket.
		     */
		    removeInternalSocketHandlers() {
		        // Pauses data flow of the socket (this is internally resumed after 'established' is emitted)
		        this.socket.pause();
		        this.socket.removeListener('data', this.onDataReceived);
		        this.socket.removeListener('close', this.onClose);
		        this.socket.removeListener('error', this.onError);
		        this.socket.removeListener('connect', this.onConnect);
		    }
		    /**
		     * Closes and destroys the underlying Socket. Emits an error event.
		     * @param err { String } An error string to include in error event.
		     */
		    closeSocket(err) {
		        // Make sure only one 'error' event is fired for the lifetime of this SocksClient instance.
		        if (this.state !== constants_1.SocksClientState.Error) {
		            // Set internal state to Error.
		            this.setState(constants_1.SocksClientState.Error);
		            // Destroy Socket
		            this.socket.destroy();
		            // Remove internal listeners
		            this.removeInternalSocketHandlers();
		            // Fire 'error' event.
		            this.emit('error', new util_1.SocksClientError(err, this.options));
		        }
		    }
		    /**
		     * Sends initial Socks v4 handshake request.
		     */
		    sendSocks4InitialHandshake() {
		        const userId = this.options.proxy.userId || '';
		        const buff = new smart_buffer_1.SmartBuffer();
		        buff.writeUInt8(0x04);
		        buff.writeUInt8(constants_1.SocksCommand[this.options.command]);
		        buff.writeUInt16BE(this.options.destination.port);
		        // Socks 4 (IPv4)
		        if (net.isIPv4(this.options.destination.host)) {
		            buff.writeBuffer((0, helpers_1.ipToBuffer)(this.options.destination.host));
		            buff.writeStringNT(userId);
		            // Socks 4a (hostname)
		        }
		        else {
		            buff.writeUInt8(0x00);
		            buff.writeUInt8(0x00);
		            buff.writeUInt8(0x00);
		            buff.writeUInt8(0x01);
		            buff.writeStringNT(userId);
		            buff.writeStringNT(this.options.destination.host);
		        }
		        this.nextRequiredPacketBufferSize =
		            constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks4Response;
		        this.socket.write(buff.toBuffer());
		    }
		    /**
		     * Handles Socks v4 handshake response.
		     * @param data
		     */
		    handleSocks4FinalHandshakeResponse() {
		        const data = this.receiveBuffer.get(8);
		        if (data[1] !== constants_1.Socks4Response.Granted) {
		            this.closeSocket(`${constants_1.ERRORS.Socks4ProxyRejectedConnection} - (${constants_1.Socks4Response[data[1]]})`);
		        }
		        else {
		            // Bind response
		            if (constants_1.SocksCommand[this.options.command] === constants_1.SocksCommand.bind) {
		                const buff = smart_buffer_1.SmartBuffer.fromBuffer(data);
		                buff.readOffset = 2;
		                const remoteHost = {
		                    port: buff.readUInt16BE(),
		                    host: (0, helpers_1.int32ToIpv4)(buff.readUInt32BE()),
		                };
		                // If host is 0.0.0.0, set to proxy host.
		                if (remoteHost.host === '0.0.0.0') {
		                    remoteHost.host = this.options.proxy.ipaddress;
		                }
		                this.setState(constants_1.SocksClientState.BoundWaitingForConnection);
		                this.emit('bound', { remoteHost, socket: this.socket });
		                // Connect response
		            }
		            else {
		                this.setState(constants_1.SocksClientState.Established);
		                this.removeInternalSocketHandlers();
		                this.emit('established', { socket: this.socket });
		            }
		        }
		    }
		    /**
		     * Handles Socks v4 incoming connection request (BIND)
		     * @param data
		     */
		    handleSocks4IncomingConnectionResponse() {
		        const data = this.receiveBuffer.get(8);
		        if (data[1] !== constants_1.Socks4Response.Granted) {
		            this.closeSocket(`${constants_1.ERRORS.Socks4ProxyRejectedIncomingBoundConnection} - (${constants_1.Socks4Response[data[1]]})`);
		        }
		        else {
		            const buff = smart_buffer_1.SmartBuffer.fromBuffer(data);
		            buff.readOffset = 2;
		            const remoteHost = {
		                port: buff.readUInt16BE(),
		                host: (0, helpers_1.int32ToIpv4)(buff.readUInt32BE()),
		            };
		            this.setState(constants_1.SocksClientState.Established);
		            this.removeInternalSocketHandlers();
		            this.emit('established', { remoteHost, socket: this.socket });
		        }
		    }
		    /**
		     * Sends initial Socks v5 handshake request.
		     */
		    sendSocks5InitialHandshake() {
		        const buff = new smart_buffer_1.SmartBuffer();
		        // By default we always support no auth.
		        const supportedAuthMethods = [constants_1.Socks5Auth.NoAuth];
		        // We should only tell the proxy we support user/pass auth if auth info is actually provided.
		        // Note: As of Tor v0.3.5.7+, if user/pass auth is an option from the client, by default it will always take priority.
		        if (this.options.proxy.userId || this.options.proxy.password) {
		            supportedAuthMethods.push(constants_1.Socks5Auth.UserPass);
		        }
		        // Custom auth method?
		        if (this.options.proxy.custom_auth_method !== undefined) {
		            supportedAuthMethods.push(this.options.proxy.custom_auth_method);
		        }
		        // Build handshake packet
		        buff.writeUInt8(0x05);
		        buff.writeUInt8(supportedAuthMethods.length);
		        for (const authMethod of supportedAuthMethods) {
		            buff.writeUInt8(authMethod);
		        }
		        this.nextRequiredPacketBufferSize =
		            constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5InitialHandshakeResponse;
		        this.socket.write(buff.toBuffer());
		        this.setState(constants_1.SocksClientState.SentInitialHandshake);
		    }
		    /**
		     * Handles initial Socks v5 handshake response.
		     * @param data
		     */
		    handleInitialSocks5HandshakeResponse() {
		        const data = this.receiveBuffer.get(2);
		        if (data[0] !== 0x05) {
		            this.closeSocket(constants_1.ERRORS.InvalidSocks5IntiailHandshakeSocksVersion);
		        }
		        else if (data[1] === constants_1.SOCKS5_NO_ACCEPTABLE_AUTH) {
		            this.closeSocket(constants_1.ERRORS.InvalidSocks5InitialHandshakeNoAcceptedAuthType);
		        }
		        else {
		            // If selected Socks v5 auth method is no auth, send final handshake request.
		            if (data[1] === constants_1.Socks5Auth.NoAuth) {
		                this.socks5ChosenAuthType = constants_1.Socks5Auth.NoAuth;
		                this.sendSocks5CommandRequest();
		                // If selected Socks v5 auth method is user/password, send auth handshake.
		            }
		            else if (data[1] === constants_1.Socks5Auth.UserPass) {
		                this.socks5ChosenAuthType = constants_1.Socks5Auth.UserPass;
		                this.sendSocks5UserPassAuthentication();
		                // If selected Socks v5 auth method is the custom_auth_method, send custom handshake.
		            }
		            else if (data[1] === this.options.proxy.custom_auth_method) {
		                this.socks5ChosenAuthType = this.options.proxy.custom_auth_method;
		                this.sendSocks5CustomAuthentication();
		            }
		            else {
		                this.closeSocket(constants_1.ERRORS.InvalidSocks5InitialHandshakeUnknownAuthType);
		            }
		        }
		    }
		    /**
		     * Sends Socks v5 user & password auth handshake.
		     *
		     * Note: No auth and user/pass are currently supported.
		     */
		    sendSocks5UserPassAuthentication() {
		        const userId = this.options.proxy.userId || '';
		        const password = this.options.proxy.password || '';
		        const buff = new smart_buffer_1.SmartBuffer();
		        buff.writeUInt8(0x01);
		        buff.writeUInt8(Buffer.byteLength(userId));
		        buff.writeString(userId);
		        buff.writeUInt8(Buffer.byteLength(password));
		        buff.writeString(password);
		        this.nextRequiredPacketBufferSize =
		            constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5UserPassAuthenticationResponse;
		        this.socket.write(buff.toBuffer());
		        this.setState(constants_1.SocksClientState.SentAuthentication);
		    }
		    sendSocks5CustomAuthentication() {
		        return __awaiter(this, void 0, void 0, function* () {
		            this.nextRequiredPacketBufferSize =
		                this.options.proxy.custom_auth_response_size;
		            this.socket.write(yield this.options.proxy.custom_auth_request_handler());
		            this.setState(constants_1.SocksClientState.SentAuthentication);
		        });
		    }
		    handleSocks5CustomAuthHandshakeResponse(data) {
		        return __awaiter(this, void 0, void 0, function* () {
		            return yield this.options.proxy.custom_auth_response_handler(data);
		        });
		    }
		    handleSocks5AuthenticationNoAuthHandshakeResponse(data) {
		        return __awaiter(this, void 0, void 0, function* () {
		            return data[1] === 0x00;
		        });
		    }
		    handleSocks5AuthenticationUserPassHandshakeResponse(data) {
		        return __awaiter(this, void 0, void 0, function* () {
		            return data[1] === 0x00;
		        });
		    }
		    /**
		     * Handles Socks v5 auth handshake response.
		     * @param data
		     */
		    handleInitialSocks5AuthenticationHandshakeResponse() {
		        return __awaiter(this, void 0, void 0, function* () {
		            this.setState(constants_1.SocksClientState.ReceivedAuthenticationResponse);
		            let authResult = false;
		            if (this.socks5ChosenAuthType === constants_1.Socks5Auth.NoAuth) {
		                authResult = yield this.handleSocks5AuthenticationNoAuthHandshakeResponse(this.receiveBuffer.get(2));
		            }
		            else if (this.socks5ChosenAuthType === constants_1.Socks5Auth.UserPass) {
		                authResult =
		                    yield this.handleSocks5AuthenticationUserPassHandshakeResponse(this.receiveBuffer.get(2));
		            }
		            else if (this.socks5ChosenAuthType === this.options.proxy.custom_auth_method) {
		                authResult = yield this.handleSocks5CustomAuthHandshakeResponse(this.receiveBuffer.get(this.options.proxy.custom_auth_response_size));
		            }
		            if (!authResult) {
		                this.closeSocket(constants_1.ERRORS.Socks5AuthenticationFailed);
		            }
		            else {
		                this.sendSocks5CommandRequest();
		            }
		        });
		    }
		    /**
		     * Sends Socks v5 final handshake request.
		     */
		    sendSocks5CommandRequest() {
		        const buff = new smart_buffer_1.SmartBuffer();
		        buff.writeUInt8(0x05);
		        buff.writeUInt8(constants_1.SocksCommand[this.options.command]);
		        buff.writeUInt8(0x00);
		        // ipv4, ipv6, domain?
		        if (net.isIPv4(this.options.destination.host)) {
		            buff.writeUInt8(constants_1.Socks5HostType.IPv4);
		            buff.writeBuffer((0, helpers_1.ipToBuffer)(this.options.destination.host));
		        }
		        else if (net.isIPv6(this.options.destination.host)) {
		            buff.writeUInt8(constants_1.Socks5HostType.IPv6);
		            buff.writeBuffer((0, helpers_1.ipToBuffer)(this.options.destination.host));
		        }
		        else {
		            buff.writeUInt8(constants_1.Socks5HostType.Hostname);
		            buff.writeUInt8(this.options.destination.host.length);
		            buff.writeString(this.options.destination.host);
		        }
		        buff.writeUInt16BE(this.options.destination.port);
		        this.nextRequiredPacketBufferSize =
		            constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseHeader;
		        this.socket.write(buff.toBuffer());
		        this.setState(constants_1.SocksClientState.SentFinalHandshake);
		    }
		    /**
		     * Handles Socks v5 final handshake response.
		     * @param data
		     */
		    handleSocks5FinalHandshakeResponse() {
		        // Peek at available data (we need at least 5 bytes to get the hostname length)
		        const header = this.receiveBuffer.peek(5);
		        if (header[0] !== 0x05 || header[1] !== constants_1.Socks5Response.Granted) {
		            this.closeSocket(`${constants_1.ERRORS.InvalidSocks5FinalHandshakeRejected} - ${constants_1.Socks5Response[header[1]]}`);
		        }
		        else {
		            // Read address type
		            const addressType = header[3];
		            let remoteHost;
		            let buff;
		            // IPv4
		            if (addressType === constants_1.Socks5HostType.IPv4) {
		                // Check if data is available.
		                const dataNeeded = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseIPv4;
		                if (this.receiveBuffer.length < dataNeeded) {
		                    this.nextRequiredPacketBufferSize = dataNeeded;
		                    return;
		                }
		                buff = smart_buffer_1.SmartBuffer.fromBuffer(this.receiveBuffer.get(dataNeeded).slice(4));
		                remoteHost = {
		                    host: (0, helpers_1.int32ToIpv4)(buff.readUInt32BE()),
		                    port: buff.readUInt16BE(),
		                };
		                // If given host is 0.0.0.0, assume remote proxy ip instead.
		                if (remoteHost.host === '0.0.0.0') {
		                    remoteHost.host = this.options.proxy.ipaddress;
		                }
		                // Hostname
		            }
		            else if (addressType === constants_1.Socks5HostType.Hostname) {
		                const hostLength = header[4];
		                const dataNeeded = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseHostname(hostLength); // header + host length + host + port
		                // Check if data is available.
		                if (this.receiveBuffer.length < dataNeeded) {
		                    this.nextRequiredPacketBufferSize = dataNeeded;
		                    return;
		                }
		                buff = smart_buffer_1.SmartBuffer.fromBuffer(this.receiveBuffer.get(dataNeeded).slice(5));
		                remoteHost = {
		                    host: buff.readString(hostLength),
		                    port: buff.readUInt16BE(),
		                };
		                // IPv6
		            }
		            else if (addressType === constants_1.Socks5HostType.IPv6) {
		                // Check if data is available.
		                const dataNeeded = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseIPv6;
		                if (this.receiveBuffer.length < dataNeeded) {
		                    this.nextRequiredPacketBufferSize = dataNeeded;
		                    return;
		                }
		                buff = smart_buffer_1.SmartBuffer.fromBuffer(this.receiveBuffer.get(dataNeeded).slice(4));
		                remoteHost = {
		                    host: ip_address_1.Address6.fromByteArray(Array.from(buff.readBuffer(16))).canonicalForm(),
		                    port: buff.readUInt16BE(),
		                };
		            }
		            // We have everything we need
		            this.setState(constants_1.SocksClientState.ReceivedFinalResponse);
		            // If using CONNECT, the client is now in the established state.
		            if (constants_1.SocksCommand[this.options.command] === constants_1.SocksCommand.connect) {
		                this.setState(constants_1.SocksClientState.Established);
		                this.removeInternalSocketHandlers();
		                this.emit('established', { remoteHost, socket: this.socket });
		            }
		            else if (constants_1.SocksCommand[this.options.command] === constants_1.SocksCommand.bind) {
		                /* If using BIND, the Socks client is now in BoundWaitingForConnection state.
		                   This means that the remote proxy server is waiting for a remote connection to the bound port. */
		                this.setState(constants_1.SocksClientState.BoundWaitingForConnection);
		                this.nextRequiredPacketBufferSize =
		                    constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseHeader;
		                this.emit('bound', { remoteHost, socket: this.socket });
		                /*
		                  If using Associate, the Socks client is now Established. And the proxy server is now accepting UDP packets at the
		                  given bound port. This initial Socks TCP connection must remain open for the UDP relay to continue to work.
		                */
		            }
		            else if (constants_1.SocksCommand[this.options.command] === constants_1.SocksCommand.associate) {
		                this.setState(constants_1.SocksClientState.Established);
		                this.removeInternalSocketHandlers();
		                this.emit('established', {
		                    remoteHost,
		                    socket: this.socket,
		                });
		            }
		        }
		    }
		    /**
		     * Handles Socks v5 incoming connection request (BIND).
		     */
		    handleSocks5IncomingConnectionResponse() {
		        // Peek at available data (we need at least 5 bytes to get the hostname length)
		        const header = this.receiveBuffer.peek(5);
		        if (header[0] !== 0x05 || header[1] !== constants_1.Socks5Response.Granted) {
		            this.closeSocket(`${constants_1.ERRORS.Socks5ProxyRejectedIncomingBoundConnection} - ${constants_1.Socks5Response[header[1]]}`);
		        }
		        else {
		            // Read address type
		            const addressType = header[3];
		            let remoteHost;
		            let buff;
		            // IPv4
		            if (addressType === constants_1.Socks5HostType.IPv4) {
		                // Check if data is available.
		                const dataNeeded = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseIPv4;
		                if (this.receiveBuffer.length < dataNeeded) {
		                    this.nextRequiredPacketBufferSize = dataNeeded;
		                    return;
		                }
		                buff = smart_buffer_1.SmartBuffer.fromBuffer(this.receiveBuffer.get(dataNeeded).slice(4));
		                remoteHost = {
		                    host: (0, helpers_1.int32ToIpv4)(buff.readUInt32BE()),
		                    port: buff.readUInt16BE(),
		                };
		                // If given host is 0.0.0.0, assume remote proxy ip instead.
		                if (remoteHost.host === '0.0.0.0') {
		                    remoteHost.host = this.options.proxy.ipaddress;
		                }
		                // Hostname
		            }
		            else if (addressType === constants_1.Socks5HostType.Hostname) {
		                const hostLength = header[4];
		                const dataNeeded = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseHostname(hostLength); // header + host length + port
		                // Check if data is available.
		                if (this.receiveBuffer.length < dataNeeded) {
		                    this.nextRequiredPacketBufferSize = dataNeeded;
		                    return;
		                }
		                buff = smart_buffer_1.SmartBuffer.fromBuffer(this.receiveBuffer.get(dataNeeded).slice(5));
		                remoteHost = {
		                    host: buff.readString(hostLength),
		                    port: buff.readUInt16BE(),
		                };
		                // IPv6
		            }
		            else if (addressType === constants_1.Socks5HostType.IPv6) {
		                // Check if data is available.
		                const dataNeeded = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseIPv6;
		                if (this.receiveBuffer.length < dataNeeded) {
		                    this.nextRequiredPacketBufferSize = dataNeeded;
		                    return;
		                }
		                buff = smart_buffer_1.SmartBuffer.fromBuffer(this.receiveBuffer.get(dataNeeded).slice(4));
		                remoteHost = {
		                    host: ip_address_1.Address6.fromByteArray(Array.from(buff.readBuffer(16))).canonicalForm(),
		                    port: buff.readUInt16BE(),
		                };
		            }
		            this.setState(constants_1.SocksClientState.Established);
		            this.removeInternalSocketHandlers();
		            this.emit('established', { remoteHost, socket: this.socket });
		        }
		    }
		    get socksClientOptions() {
		        return Object.assign({}, this.options);
		    }
		}
		exports$1.SocksClient = SocksClient;
		
	} (socksclient));
	return socksclient;
}

var hasRequiredBuild;

function requireBuild () {
	if (hasRequiredBuild) return build;
	hasRequiredBuild = 1;
	(function (exports$1) {
		var __createBinding = (build && build.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (build && build.__exportStar) || function(m, exports$1) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding(exports$1, m, p);
		};
		Object.defineProperty(exports$1, "__esModule", { value: true });
		__exportStar(requireSocksclient(), exports$1);
		
	} (build));
	return build;
}

var buildExports = requireBuild();
const socks = /*@__PURE__*/getDefaultExportFromCjs(buildExports);

class SMTPError extends Data.TaggedError("SMTPError") {
}
const TransportConfig = Brand.nominal();
const convertTransporterConfig$1 = Effect.fn(
  (config) => Effect.try({
    try: () => {
      const { transport, defaults } = config;
      let transportOptions;
      let proxyConfig;
      if (transport) {
        const { proxy, ...rest } = transport;
        transportOptions = rest;
        proxyConfig = proxy;
      }
      return {
        proxy: proxyConfig,
        transport: transportOptions,
        defaults: defaults || void 0
      };
    },
    catch: (cause) => new SMTPError({
      message: `Failed to convert TransportConfig: ${cause instanceof Error ? cause.message : String(cause)}`,
      cause
    })
  })
);
class SMTPTransportConfig extends Context.Tag("SMTPTransportConfig")() {
  static makeLive(config) {
    return Layer.succeed(SMTPTransportConfig, SMTPTransportConfig.of(TransportConfig(config)));
  }
}
class SMTPService extends Effect.Service()("SMTPService", {
  effect: Effect.gen(function* () {
    const nodemailer = Effect.fn(
      (fn) => Effect.try({
        try: () => fn(_nodemailer),
        // If an error occurs, we throw a new Error with a custom message.
        // This is useful for debugging and understanding where the error originated.
        // The cause is checked to see if it's an instance of Error, and if so,
        // we use its message; otherwise, we convert it to a string.
        catch: (cause) => new SMTPError({
          message: `Failed to run nodemailer function: ${cause instanceof Error ? cause.message : String(cause)}`,
          cause
        })
      })
    );
    const createTransport = Effect.fn(function* (rawMailerConfig2) {
      const { transport, defaults, proxy } = yield* convertTransporterConfig$1(rawMailerConfig2);
      const transportInstance = yield* nodemailer(
        (mailer) => mailer.createTransport(transport, defaults)
      );
      if (proxy?.startsWith("socks")) {
        transportInstance.set("proxy_socks_module", socks);
        transportInstance.setupProxy(proxy);
      }
      return transportInstance;
    });
    const rawMailerConfig = yield* SMTPTransportConfig;
    const _mailer = yield* createTransport(rawMailerConfig);
    const Mailer = Effect.fn(function* (fn) {
      return yield* Effect.tryPromise({
        try: () => Promise.resolve().then(() => fn(_mailer)),
        catch: (cause) => new SMTPError({
          message: `Failed to run Mailer function: ${cause instanceof Error ? cause.message : String(cause)}`,
          cause
        })
      });
    });
    const verifyTransport = Effect.fn(function* () {
      return yield* Effect.tryPromise({
        try: () => _mailer.verify(),
        // If an error occurs during verification, we throw a new Error with a custom message.
        // This helps in debugging SMTP configuration issues.
        catch: (cause) => new SMTPError({
          message: `Failed to verify SMTP transport: ${cause instanceof Error ? cause.message : String(cause)}`,
          cause
        })
      });
    });
    const sendMail = (mailOptions) => Effect.tryPromise({
      try: () => _mailer.sendMail(mailOptions),
      catch: (cause) => new SMTPError({
        message: `Failed to send mail: ${cause instanceof Error ? cause.message : String(cause)}`,
        cause
      })
    });
    const isIdle = Effect.fn(function* () {
      return yield* Effect.try({
        try: () => _mailer.isIdle(),
        catch: (cause) => new SMTPError({
          message: `Failed to check if SMTP transport is idle: ${cause instanceof Error ? cause.message : String(cause)}`,
          cause
        })
      });
    });
    const getVersionString = Effect.fn(function* () {
      return yield* Effect.try({
        try: () => _mailer.getVersionString(),
        catch: (cause) => new SMTPError({
          message: `Failed to get SMTP transport version string: ${cause instanceof Error ? cause.message : String(cause)}`,
          cause
        })
      });
    });
    const close = () => Effect.try({
      try: () => _mailer.close(),
      catch: (cause) => new SMTPError({
        message: `Failed to close SMTP transport: ${cause instanceof Error ? cause.message : String(cause)}`,
        cause
      })
    });
    return {
      Mailer,
      verifyTransport,
      sendMail,
      isIdle,
      getVersionString,
      close
    };
  })
}) {
}

function nullToUndefined(value) {
  return value === null ? void 0 : value;
}
const convertTransporterConfig = (config) => pipeLogger("studiocms/lib/effects/smtp/convertTransporterConfig")(
  Effect.try(() => {
    const {
      host,
      port,
      secure,
      proxy,
      auth_user,
      auth_pass,
      tls_rejectUnauthorized,
      tls_servername,
      default_sender
    } = config.data;
    return TransportConfig({
      transport: {
        host,
        port,
        secure,
        proxy: nullToUndefined(proxy),
        auth: auth_user !== null || auth_pass !== null ? {
          user: nullToUndefined(auth_user),
          pass: nullToUndefined(auth_pass)
        } : void 0,
        tls: tls_rejectUnauthorized !== null || tls_servername !== null ? {
          rejectUnauthorized: nullToUndefined(tls_rejectUnauthorized),
          servername: nullToUndefined(tls_servername)
        } : void 0
      },
      defaults: {
        from: nullToUndefined(default_sender)
      }
    });
  })
);
const buildTransporterConfig = genLogger("studiocms/lib/effects/smtp/buildTransporterConfig")(
  function* () {
    const sdk = yield* SDKCore;
    const configTable = yield* sdk.CONFIG.mailerConfig.get();
    if (!configTable) {
      return TransportConfig({
        transport: {},
        defaults: {}
      });
    }
    return yield* convertTransporterConfig(configTable);
  }
);
const buildProvide = (config) => Effect.provide(Layer.provide(SMTPService.Default, SMTPTransportConfig.makeLive(config)));
class SMTPMailer extends Effect.Service()(
  "studiocms/lib/effects/smtp/SMTPMailer",
  {
    effect: genLogger("studiocms/lib/effects/smtp/SMTPMailer.effect")(function* () {
      const config = yield* buildTransporterConfig;
      const { getVersionString, isIdle, sendMail, verifyTransport } = yield* SMTPService.pipe(buildProvide(config));
      return { verifyTransport, sendMail, isIdle, getVersionString };
    })
  }
) {
}

const forked = logger.fork("studiocms:runtime/mailer");
const makeLogger = Effect.succeed(forked);
class Logger extends Effect.Tag("studiocms/lib/mailer/Logger")() {
  static Live = makeLogger;
  static Layer = Layer.scoped(this, this.Live);
}
class Mailer extends Effect.Service()("studiocms/lib/mailer/Mailer", {
  effect: genLogger("studiocms/lib/mailer/Mailer.effect")(function* () {
    const logger = yield* Logger;
    const SMTP = yield* SMTPMailer;
    const mailerResponse = (data) => {
      if ("error" in data) {
        logger.error(data.error);
        return data;
      }
      return data;
    };
    const getMailerConfigTable = pipeLogger("studiocms/lib/mailer/Mailer.getMailerConfigTable")(
      SDKCoreJs.CONFIG.mailerConfig.get()
    );
    const updateMailerConfigTable = (config) => genLogger("studiocms/lib/mailer/Mailer.updateMailerConfigTable")(function* () {
      yield* SDKCoreJs.CONFIG.mailerConfig.update(config).pipe(
        Effect.catchAll(
          (e) => Effect.succeed(
            mailerResponse({ error: `Error updating mailer configuration: ${String(e)}` })
          )
        )
      );
      return mailerResponse({ message: "Mailer configuration updated successfully" });
    });
    const createMailerConfigTable = (config) => pipeLogger("studiocms/lib/mailer/Mailer.createMailerConfigTable")(
      SDKCoreJs.CONFIG.mailerConfig.init(config)
    );
    const sendMail = ({ subject, ...message }) => genLogger("studiocms/lib/mailer/Mailer.sendMail")(function* () {
      const toSend = { subject };
      toSend.to = Array.isArray(message.to) ? message.to.join(", ") : message.to;
      if (message.text && !message.html) {
        toSend.text = message.text;
      }
      if (message.html) {
        toSend.html = message.html;
      }
      const result = yield* SMTP.sendMail(toSend);
      return mailerResponse({ message: `Message sent: ${result.messageId}` });
    });
    const verifyMailConnection = genLogger("studiocms/lib/mailer/Mailer.verifyMailConnection")(
      function* () {
        const result = yield* SMTP.verifyTransport();
        if (result !== true) {
          return mailerResponse({ error: "Mail connection verification failed" });
        }
        return mailerResponse({ message: "Mail connection verified successfully" });
      }
    );
    const isEnabled = genLogger("studiocms/lib/mailer/Mailer.isEnabled")(function* () {
      const config = yield* SDKCoreJs.GET.siteConfig();
      const status = config?.data?.enableMailer || false;
      return status;
    });
    return {
      getMailerConfigTable,
      updateMailerConfigTable,
      createMailerConfigTable,
      sendMail,
      verifyMailConnection,
      isEnabled
    };
  }),
  dependencies: [Logger.Layer, SMTPMailer.Default],
  accessors: true
}) {
  static Provide = Effect.provide(this.Default);
}

export { Mailer as M };
