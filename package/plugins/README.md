# umi-plugin-update-notification

A umi plugin

## Install

```bash
pnpm i umi-plugin-check-for-updates
```

## Usage

Configure in `.umirc.ts`,

```js
export default {
  plugins:['umi-plugin-check-for-updates'],
  checkForUpdates: {
    content: ['更新日志'], //更新日志
    version: '',          //版本     default Date.now()
    force: true,          //更新弹窗  default true
    poll: 1000 * 10 * 60  //轮询时间
  }
}
```

## Options

TODO

## LICENSE

MIT
