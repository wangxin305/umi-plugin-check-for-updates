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
                    content: Joi.array().default(['系统有更新！']),
                    version: Joi.number().default(Date.now()),
                    force: Joi.boolean().default(true),
                    poll: Joi.number().default(1000 * 10 * 60)
                });
            },
        },
        enableBy({userConfig}) {
            return userConfig.checkForUpdates
            // return api.env === 'production' && !!api?.EnableBy.config;
        },
    })
    api.onGenerateFiles(() => {
        api.writeTmpFile({
            content: Mustache.render(tpl, {
                dayjsPath: winPath(dirname(require.resolve('dayjs/package.json'))),
                antdPath: winPath(dirname(require.resolve('antd/package.json'))),
                version: api.userConfig.checkForUpdates.version,
                poll: api.userConfig.checkForUpdates.poll
            }),
            path: `runtime.tsx`,
        })
    })
    api.onBuildComplete((e) => {
        mkdirSync(`${outputPath}/version`);
        const v = {
            version: api.userConfig.checkForUpdates.version,
            content: api.userConfig.checkForUpdates.content,
        };
        writeFileSync(`${outputPath}/version/version.json`, JSON.stringify(v));
    });
    api.addEntryCodeAhead(() => [`import './plugin-${api.plugin.key}/runtime.tsx'`]);
};
