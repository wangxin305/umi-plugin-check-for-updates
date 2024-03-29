import type {IApi} from 'umi';
import {Mustache, winPath} from 'umi/plugin-utils';
import {dirname, join, resolve} from 'path';
import {mkdirSync, readFileSync, writeFileSync} from 'fs'

export default (api: IApi) => {
    // See https://umijs.org/docs/guides/plugins
    const outputPath = resolve(api.userConfig.outputPath || 'dist');
    const tpl = readFileSync(join(__dirname, `./templates/runtime.tpl`), 'utf-8')
    api.describe({
        key: 'checkForUpdates',
        config: {
            schema(Joi) {
                return Joi.object({
                    content: Joi.array(),
                    version: Joi.number(),
                    force: Joi.boolean(),
                    poll: Joi.number(),
                    image: Joi.string(),
                });
            },
            default: {
                version: Date.now(),
                force: true,
                poll: 1000 * 10 * 60,
                content: ['系统有更新！']
            }
        },
        enableBy({userConfig, env}) {
            // return userConfig.checkForUpdates

            return env === 'production' && userConfig.checkForUpdates
        },
    })
    api.onGenerateFiles(() => {
        api.writeTmpFile({
            content: Mustache.render(tpl, {
                dayjsPath: winPath(dirname(require.resolve('dayjs/package.json'))),
                antdPath: winPath(dirname(require.resolve('antd/package.json'))),
                ...api.plugin.config.default,
                ...api.userConfig.checkForUpdates,
            }),
            path: `runtime.tsx`,
        })
    })
    // console.log(api.userConfig.checkForUpdates.version || api.plugin.config.default.version)
    api.onBuildComplete(() => {
        mkdirSync(`${outputPath}/version`);
        const v = {
            image: api.userConfig.checkForUpdates?.image,
            content: api.userConfig.checkForUpdates.content,
            version: api.userConfig.checkForUpdates.version || api.plugin.config.default.version,

        };
        writeFileSync(`${outputPath}/version/version.json`, JSON.stringify(v));
    });
    api.addEntryCodeAhead(() => [`import './plugin-${api.plugin.key}/runtime.tsx'`]);
};
